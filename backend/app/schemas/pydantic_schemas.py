from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict, Field

# Auth & Token Schemas
class LoginSchema(BaseModel):
    phone: str = Field(..., example="+919876543210")
    password: str = Field(..., example="password123")
    role: Optional[str] = "ASHA Worker"

class RegisterSchema(BaseModel):
    name: str = Field(..., example="Lakshmi Devi")
    phone: str = Field(..., example="+919876543210")
    password: str = Field(..., example="password123")
    role: str = Field(..., example="ASHA Worker") # Admin | Medical Officer | ASHA Worker
    village: Optional[str] = "Ramanthapur"

class RefreshTokenRequestSchema(BaseModel):
    refresh_token: str = Field(..., example="eyJhbGciOiJIUzI1Ni...")

class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = 1800
    user: Dict[str, Any]

class UserResponseSchema(BaseModel):
    user_id: str
    name: str
    phone: str
    role: str
    phc_id: Optional[str] = "phc_ramanthapur_01"

    model_config = ConfigDict(from_attributes=True)

# Patient Schemas
class PatientCreateSchema(BaseModel):
    name: str
    age: int
    gender: str = "female"
    village: str
    latitude: float
    longitude: float
    is_pregnant: bool = False
    trimester: int = 0
    high_risk_pregnancy: bool = False
    newborn_age_days: int = 0
    vaccination_status: str = "up_to_date"
    days_overdue: int = 0
    chronic_disease_flags: List[str] = []
    previous_missed_visits: int = 0
    visit_type: str = "anc_checkup"
    assigned_worker_id: Optional[str] = "usr_w101"

class PatientResponseSchema(PatientCreateSchema):
    patient_id: str
    risk_score: int
    risk_band: str

    model_config = ConfigDict(from_attributes=True)

# Emergency Schemas
class EmergencyCreateSchema(BaseModel):
    patient_name: str
    age: int = 30
    gender: str = "Female"
    village: str
    phone: Optional[str] = None
    emergency_type: str
    priority: str = "Critical"

# Message Schemas
class MessageCreateSchema(BaseModel):
    sender_id: str
    sender_name: str
    receiver_id: str
    text: str

# Resource Schemas
class ResourceStockSchema(BaseModel):
    available_stock: int
