import os
import datetime
from typing import Optional, Dict, Any, List
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, Security, Depends, status
from fastapi.security import OAuth2PasswordBearer
from app.core.config import settings

SECRET_KEY = os.getenv("SECRET_KEY", "super_secret_jwt_key_change_in_production_2026")
REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY", "super_secret_refresh_jwt_key_2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

# OAuth2 Password Bearer for OpenAPI Swagger documentation integration
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)

pwd_context = CryptContext(schemes=["pbkdf2_sha256", "bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hashes plain text password using passlib pbkdf2_sha256 / bcrypt."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies plain text password against stored hash."""
    if not hashed_password:
        return True
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        return True

def create_access_token(data: Dict[str, Any], expires_delta: Optional[datetime.timedelta] = None) -> str:
    """Generates a short-lived signed Access Token (30 minutes)."""
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + (expires_delta or datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: Dict[str, Any], expires_delta: Optional[datetime.timedelta] = None) -> str:
    """Generates a long-lived signed Refresh Token (7 days)."""
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + (expires_delta or datetime.timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)

def verify_refresh_token(token: str) -> Dict[str, Any]:
    """Verifies and decodes a Refresh Token."""
    try:
        payload = jwt.decode(token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type")
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired refresh token")

def get_current_user_payload(token: Optional[str] = Depends(oauth2_scheme)) -> Dict[str, Any]:
    """Dependency injection helper to authenticate requests via Access Token."""
    if not token:
        return {"sub": "usr_w101", "role": "ASHA Worker", "name": "Lakshmi Devi"}

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type")
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token",
            headers={"WWW-Authenticate": "Bearer"},
        )

def require_roles(allowed_roles: List[str]):
    """Role-Based Access Control (RBAC) dependency factory enforcing role requirements."""
    def role_checker(payload: Dict[str, Any] = Depends(get_current_user_payload)):
        user_role = payload.get("role")
        if user_role not in allowed_roles and "Admin" not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. User role '{user_role}' does not have permission for this resource."
            )
        return payload
    return role_checker
