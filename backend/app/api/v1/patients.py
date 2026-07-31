import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import Patient
from app.schemas.pydantic_schemas import PatientCreateSchema
from app.services.ai_services import RiskScoringService

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.get("")
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

@router.get("/{patient_id}")
def get_patient(patient_id: str, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return {"success": True, "data": patient}

@router.post("")
def create_patient(body: PatientCreateSchema, db: Session = Depends(get_db)):
    pat_id = f"pat_{int(datetime.datetime.utcnow().timestamp())}"
    
    # Calculate ML Risk Score via AI Risk Service
    ai_risk = RiskScoringService.calculate_risk(body.model_dump())

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
        risk_score=ai_risk["risk_score"],
        risk_band=ai_risk["risk_band"],
        assigned_worker_id=body.assigned_worker_id,
        phc_id="phc_ramanthapur_01"
    )
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return {"success": True, "data": patient}
