import datetime
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, Depends, HTTPException, Query, Security
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field

from database import engine, get_db, Base
from models import PHC, User, Worker, Patient, RiskScore, Route, RouteStop
from auth import create_access_token, verify_token
from seed import seed_database
from services.ai_gateway import call_predict_risk, call_optimize_routes

# Initialize FastAPI App
app = FastAPI(
    title="ASHA Route Optimizer AI Backend API Gateway",
    description="REST API Gateway for ASHA Route Optimizer AI platform",
    version="1.0.0"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    print("🚀 Initializing FastAPI Backend Server & Database...")
    try:
        seed_database()
    except Exception as e:
        print(f"Database Startup Notice: {e}")

# Pydantic Schemas
class RequestOtpSchema(BaseModel):
    phone: str = Field(..., example="+919876543210")

class VerifyOtpSchema(BaseModel):
    phone: str = Field(..., example="+919876543210")
    otp: str = Field(..., example="123456")
    role: Optional[str] = "asha_worker"

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

class EmergencySchema(BaseModel):
    patient_name: str = "Kavitha Sharma"
    description: str
    severity: int = 98

# --- ROUTES ---

@app.get("/")
def root():
    return {
        "service": "ASHA Route Optimizer AI Backend API Gateway",
        "status": "online",
        "docs": "/docs"
    }

# 1. AUTHENTICATION (`/api/v1/auth`)

@app.post("/api/v1/auth/request-otp")
def request_otp(body: RequestOtpSchema):
    return {
        "success": True,
        "data": {
            "message": "OTP sent successfully to registered mobile number",
            "expires_in_seconds": 300
        }
    }

@app.post("/api/v1/auth/verify-otp")
def verify_otp(body: VerifyOtpSchema, db: Session = Depends(get_db)):
    if body.otp != "123456" and len(body.otp) != 6:
        raise HTTPException(status_code=401, detail="Invalid OTP code")

    user = db.query(User).filter(User.phone == body.phone).first()
    if not user:
        user_id = "usr_w101" if body.role == "asha_worker" else "usr_sup01"
        name = "Lakshmi Devi" if body.role == "asha_worker" else "Dr. Radhika Rao"
        user = User(id=user_id, phone=body.phone, name=name, role=body.role or "asha_worker", phc_id="phc_ramanthapur_01")

    token = create_access_token({"sub": user.id, "phone": user.phone, "role": user.role})
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

# 2. PATIENTS API (`/api/v1/patients`)

@app.get("/api/v1/patients")
def list_patients(
    worker_id: Optional[str] = None,
    risk_band: Optional[str] = None,
    village: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Patient)
    if worker_id:
        query = query.filter(Patient.assigned_worker_id == worker_id)
    if risk_band and risk_band != "ALL":
        query = query.filter(Patient.risk_band == risk_band)
    if village and village != "ALL":
        query = query.filter(Patient.village == village)

    patients = query.all()
    return {
        "success": True,
        "data": {
            "patients": [
                {
                    "patient_id": p.id,
                    "name": p.name,
                    "age": p.age,
                    "gender": p.gender,
                    "village": p.village,
                    "latitude": p.latitude,
                    "longitude": p.longitude,
                    "is_pregnant": p.is_pregnant,
                    "trimester": p.trimester,
                    "high_risk_pregnancy": p.high_risk_pregnancy,
                    "newborn_age_days": p.newborn_age_days,
                    "vaccination_status": p.vaccination_status,
                    "days_overdue": p.days_overdue,
                    "chronic_disease_flags": p.chronic_disease_flags or [],
                    "previous_missed_visits": p.previous_missed_visits,
                    "visit_type": p.visit_type,
                    "last_visit_days_ago": p.last_visit_days_ago,
                    "risk_score": p.risk_score,
                    "risk_band": p.risk_band,
                    "assigned_worker_id": p.assigned_worker_id
                } for p in patients
            ]
        }
    }

@app.get("/api/v1/patients/{patient_id}")
def get_patient(patient_id: str, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return {"success": True, "data": patient}

@app.post("/api/v1/patients")
async def create_patient(body: PatientCreateSchema, db: Session = Depends(get_db)):
    pat_id = f"pat_{int(datetime.datetime.utcnow().timestamp())}"
    
    # Call AI Risk Scoring Gateway
    ai_risk = await call_predict_risk(body.dict())
    
    patient = Patient(
        id=pat_id,
        name=body.name,
        age=body.age,
        gender=body.gender,
        village=body.village,
        latitude=body.latitude,
        longitude=body.longitude,
        is_pregnant=body.is_pregnant,
        trimester=body.trimester,
        high_risk_pregnancy=body.high_risk_pregnancy,
        newborn_age_days=body.newborn_age_days,
        vaccination_status=body.vaccination_status,
        days_overdue=body.days_overdue,
        chronic_disease_flags=body.chronic_disease_flags,
        previous_missed_visits=body.previous_missed_visits,
        visit_type=body.visit_type,
        risk_score=ai_risk.get("risk_score", 50),
        risk_band=ai_risk.get("risk_band", "Moderate"),
        assigned_worker_id=body.assigned_worker_id,
        phc_id="phc_ramanthapur_01"
    )
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return {"success": True, "data": patient}

# 3. ROUTE OPTIMIZATION API (`/api/v1/routes`)

@app.get("/api/v1/routes/{worker_id}/today")
async def get_today_route(worker_id: str, db: Session = Depends(get_db)):
    patients = db.query(Patient).filter(Patient.assigned_worker_id == worker_id).limit(10).all()
    patient_dicts = [
        {
            "patient_id": p.id,
            "name": p.name,
            "village": p.village,
            "latitude": p.latitude,
            "longitude": p.longitude,
            "visit_type": p.visit_type,
            "risk_score": p.risk_score,
            "risk_band": p.risk_band
        } for p in patients
    ]

    start_loc = {"latitude": 17.3950, "longitude": 78.5300}
    route_data = await call_optimize_routes(worker_id, start_loc, patient_dicts)
    return {"success": True, "data": route_data}
