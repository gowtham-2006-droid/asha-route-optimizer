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

# ASHA Worker Schemas
class WorkerCreateSchema(BaseModel):
    name: str = Field(..., example="Lakshmi Devi")
    phone: str = Field(..., example="+919876543210")
    password: Optional[str] = Field("password123", example="password123")
    assigned_village_id: Optional[str] = Field(None, example="vlg_01")
    assigned_village_name: Optional[str] = Field("Ramanthapur", example="Ramanthapur")
    daily_max_visits: int = Field(10, example=10)
    current_latitude: float = Field(17.3950, example=17.3950)
    current_longitude: float = Field(78.5300, example=78.5300)
    battery_pct: int = Field(85, example=85)
    network_status: str = Field("Good", example="Good") # Good | Moderate | Poor
    status: str = Field("Active", example="Active") # Active | On Leave | Busy | Offline

class WorkerUpdateSchema(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    assigned_village_id: Optional[str] = None
    assigned_village_name: Optional[str] = None
    daily_max_visits: Optional[int] = None
    current_latitude: Optional[float] = None
    current_longitude: Optional[float] = None
    battery_pct: Optional[int] = None
    network_status: Optional[str] = None
    status: Optional[str] = None

class WorkerResponseSchema(BaseModel):
    id: str
    user_id: str
    name: str
    phone: str
    assigned_village: str
    daily_max_visits: int
    current_latitude: float
    current_longitude: float
    battery_pct: int
    network_status: str
    status: str
    created_at: Any

    model_config = ConfigDict(from_attributes=True)

# Patient Schemas
class PatientCreateSchema(BaseModel):
    name: str = Field(..., example="Sita Devi")
    age: int = Field(..., example=29)
    gender: str = Field("female", example="female")
    phone: Optional[str] = Field(None, example="+919876543210")
    village: str = Field(..., example="Ramanthapur")
    latitude: float = Field(..., example=17.3950)
    longitude: float = Field(..., example=78.5300)
    is_pregnant: bool = Field(False, example=True)
    trimester: int = Field(0, example=2)
    high_risk_pregnancy: bool = Field(False, example=False)
    blood_pressure: str = Field("120/80 mmHg", example="130/85 mmHg")
    sugar_level: int = Field(110, example=120)
    pulse_rate: int = Field(72, example=78)
    oxygen_level: int = Field(98, example=98)
    medications: List[str] = Field(["Iron Tablets", "Folic Acid"], example=["Iron Tablets", "Folic Acid"])
    newborn_age_days: int = 0
    vaccination_status: str = "up_to_date"
    days_overdue: int = 0
    chronic_disease_flags: List[str] = []
    previous_missed_visits: int = 0
    visit_type: str = "anc_checkup"
    assigned_worker_id: Optional[str] = "usr_w101"

class PatientUpdateSchema(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    village: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    is_pregnant: Optional[bool] = None
    trimester: Optional[int] = None
    high_risk_pregnancy: Optional[bool] = None
    blood_pressure: Optional[str] = None
    sugar_level: Optional[int] = None
    pulse_rate: Optional[int] = None
    oxygen_level: Optional[int] = None
    medications: Optional[List[str]] = None
    vaccination_status: Optional[str] = None
    days_overdue: Optional[int] = None
    chronic_disease_flags: Optional[List[str]] = None
    visit_type: Optional[str] = None
    assigned_worker_id: Optional[str] = None

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
