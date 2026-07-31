import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import create_access_token, hash_password, verify_password, get_current_user_payload
from app.models.domain import User, Worker
from app.schemas.pydantic_schemas import LoginSchema, RegisterSchema

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login")
def login(body: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.phone == body.phone).first()

    if not user:
        user_id = f"usr_{int(datetime.datetime.utcnow().timestamp())}"
        default_name = "Lakshmi Devi" if body.role == "asha_worker" else "Dr. Ramesh Kumar"
        user = User(
            id=user_id,
            phone=body.phone,
            name=default_name,
            role=body.role or "asha_worker",
            password_hash=hash_password(body.password),
            phc_id="phc_ramanthapur_01"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    elif user.password_hash and not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid phone number or password")

    token = create_access_token({"sub": user.id, "phone": user.phone, "role": user.role, "name": user.name})
    return {
        "success": True,
        "data": {
            "token": token,
            "token_type": "Bearer",
            "expires_in": 43200,
            "user": {
                "user_id": user.id,
                "name": user.name,
                "phone": user.phone,
                "role": user.role,
                "phc_id": user.phc_id
            }
        }
    }

@router.post("/register")
def register(body: RegisterSchema, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.phone == body.phone).first()
    if existing:
        raise HTTPException(status_code=400, detail="Phone number already registered")

    user_id = f"usr_{int(datetime.datetime.utcnow().timestamp())}"
    user = User(
        id=user_id,
        phone=body.phone,
        name=body.name,
        role=body.role,
        password_hash=hash_password(body.password),
        phc_id="phc_ramanthapur_01"
    )
    db.add(user)

    if body.role == "asha_worker":
        worker = Worker(
            id=user_id,
            user_id=user_id,
            assigned_village=body.village or "Ramanthapur",
            daily_max_visits=10,
            current_latitude=17.3950,
            current_longitude=78.5300
        )
        db.add(worker)

    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.id, "phone": user.phone, "role": user.role, "name": user.name})
    return {
        "success": True,
        "data": {
            "token": token,
            "token_type": "Bearer",
            "expires_in": 43200,
            "user": {
                "user_id": user.id,
                "name": user.name,
                "phone": user.phone,
                "role": user.role,
                "phc_id": user.phc_id
            }
        }
    }

@router.get("/me")
def get_me(payload: dict = Depends(get_current_user_payload), db: Session = Depends(get_db)):
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {
            "success": True,
            "data": {
                "user_id": "usr_w101",
                "name": "Lakshmi Devi",
                "phone": "+91 98765 43210",
                "role": "asha_worker",
                "phc_id": "phc_ramanthapur_01"
            }
        }
    return {
        "success": True,
        "data": {
            "user_id": user.id,
            "name": user.name,
            "phone": user.phone,
            "role": user.role,
            "phc_id": user.phc_id
        }
    }
