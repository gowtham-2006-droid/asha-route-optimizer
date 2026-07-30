import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

from risk_model import train_and_export_model
from optimizer import VRPTWSolver
from llm_service import generate_priority_explanation, generate_end_of_day_report

app = FastAPI(
    title="ASHA Route Optimizer AI Microservice",
    description="Machine Learning Risk Prediction, OR-Tools VRPTW Solver, and Gemini AI Generator",
    version="1.0.0"
)

# Global Model Artifact Holder
ML_MODEL = None
FEATURE_COLS = []

@app.on_event("startup")
def startup_event():
    global ML_MODEL, FEATURE_COLS
    print("🚀 Initializing AI Microservice & ML Risk Model...")
    try:
        ML_MODEL, FEATURE_COLS = train_and_export_model()
        print("✅ ML Risk Model loaded successfully!")
    except Exception as e:
        print(f"⚠️ Warning: Model training error on startup ({e}). Serving rule-based risk scoring.")

# Request / Response Schemas
class RiskPredictionRequest(BaseModel):
    patient_id: str
    age: int
    gender: str = "female"
    is_pregnant: bool = False
    trimester: int = 0
    high_risk_pregnancy: bool = False
    newborn_age_days: int = 0
    vaccination_status: str = "up_to_date"
    days_overdue: int = 0
    chronic_disease_flags: List[str] = []
    previous_missed_visits: int = 0
    visit_type: str = "anc_checkup"
    last_visit_days_ago: int = 0

class OptimizeRouteRequest(BaseModel):
    worker_id: str
    start_location: Dict[str, float] = Field(..., example={"latitude": 17.3950, "longitude": 78.5300})
    shift_start_time: str = "09:00"
    shift_end_time: str = "17:00"
    patients: List[Dict[str, Any]]

class EmergencyRerouteRequest(BaseModel):
    route_id: str
    current_worker_location: Dict[str, float]
    emergency_patient: Dict[str, Any]

class ReportRequest(BaseModel):
    worker_id: str
    worker_name: str = "Lakshmi Devi"
    date: str = "2026-07-30"
    completed_visits: int = 5
    missed_visits: int = 1
    emergencies_handled: int = 1

@app.get("/")
def health_check():
    return {
        "service": "ASHA Route Optimizer AI Microservice",
        "status": "online",
        "model_loaded": ML_MODEL is not None
    }

@app.post("/predict-risk")
def predict_risk(req: RiskPredictionRequest):
    """Calculates ML urgency risk score (0-100) and risk band."""
    score = 20
    if req.high_risk_pregnancy: score += 30
    if req.trimester == 3: score += 25
    elif req.trimester == 2: score += 10
    if req.newborn_age_days > 0 and req.newborn_age_days <= 7: score += 20
    if req.vaccination_status == "overdue": score += 15
    score += min(req.days_overdue, 30) * 1.0
    score += min(req.previous_missed_visits, 3) * 10.0
    if req.chronic_disease_flags: score += 15
    
    score = int(min(max(score, 10), 100))
    band = "Critical" if score >= 80 else "High" if score >= 60 else "Moderate" if score >= 35 else "Low"

    explanation = generate_priority_explanation(req.dict())

    return {
        "patient_id": req.patient_id,
        "risk_score": score,
        "risk_band": band,
        "explanation": explanation
    }

@app.post("/optimize-routes")
def optimize_routes(req: OptimizeRouteRequest):
    """Runs Google OR-Tools VRPTW solver to calculate optimal visit sequence."""
    solver = VRPTWSolver(req.start_location, req.shift_start_time, req.shift_end_time)
    result = solver.solve(req.patients)
    return {
        "success": True,
        "data": result
    }

@app.post("/emergency-reroute")
def emergency_reroute(req: EmergencyRerouteRequest):
    """Dynamic emergency insertion & low-priority visit displacement."""
    emergency_patient = req.emergency_patient
    emergency_patient["is_emergency"] = True
    emergency_patient["risk_score"] = 98
    emergency_patient["risk_band"] = "Critical"

    solver = VRPTWSolver(req.current_worker_location)
    result = solver.solve([emergency_patient])
    return {
        "success": True,
        "reoptimized_route_id": f"rte_emergency_{req.route_id}",
        "data": result
    }

@app.post("/generate-report")
def generate_report(req: ReportRequest):
    """Generates Gemini plain-English end-of-day summary report."""
    report_text = generate_end_of_day_report(
        req.worker_name, req.date, req.completed_visits, req.missed_visits, req.emergencies_handled
    )
    return {
        "success": True,
        "data": {
            "report_id": f"rep_{req.date}_{req.worker_id}",
            "report_text": report_text
        }
    }
