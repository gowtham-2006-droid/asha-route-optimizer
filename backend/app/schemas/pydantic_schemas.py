from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict, Field

# Auth Schemas
class LoginSchema(BaseModel):
    phone: str = Field(..., example="+919876543210")
    password: str = Field(..., example="password123")
    role: Optional[str] = "asha_worker"

class RegisterSchema(BaseModel):
    name: str = Field(..., example="Lakshmi Devi")
    phone: str = Field(..., example="+919876543210")
    password: str = Field(..., example="password123")
    role: str = Field(..., example="asha_worker")
    village: Optional[str] = "Ramanthapur"

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
