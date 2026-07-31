import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.core.database import get_db
from app.models.domain import Patient
from app.schemas.pydantic_schemas import PatientCreateSchema, PatientUpdateSchema
from app.services.ai_services import RiskScoringService

router = APIRouter(prefix="/patients", tags=["Patient Management & Clinical Vitals"])

@router.get("")
def list_patients(
    worker_id: Optional[str] = Query(None, description="Filter by assigned ASHA worker ID"),
    risk_band: Optional[str] = Query(None, description="Filter by risk band (Critical, High, Moderate, Low)"),
    village: Optional[str] = Query(None, description="Filter by village name"),
    is_pregnant: Optional[bool] = Query(None, description="Filter by pregnancy status"),
    search: Optional[str] = Query(None, description="Search by patient name or phone number"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    """Lists patients with search, multi-field filtering, pagination, and clinical vital signs."""
    query = db.query(Patient).filter(Patient.is_deleted == False)

    if worker_id:
        query = query.filter(Patient.assigned_worker_id == worker_id)

    if risk_band and risk_band != "ALL":
        query = query.filter(Patient.risk_band == risk_band)

    if village and village != "ALL":
        query = query.filter(Patient.village == village)

    if is_pregnant is not None:
        query = query.filter(Patient.is_pregnant == is_pregnant)

    if search:
        search_pattern = f"%{search}%"
        query = query.filter(or_(Patient.name.ilike(search_pattern), Patient.phone.ilike(search_pattern)))

    total_count = query.count()
    offset = (page - 1) * limit
    patients = query.offset(offset).limit(limit).all()

    items = []
    for p in patients:
        items.append({
            "patient_id": p.id,
            "name": p.name,
            "age": p.age,
            "gender": p.gender,
            "phone": p.phone,
            "village": p.village,
            "latitude": p.latitude,
            "longitude": p.longitude,
            "pregnancy_status": "Pregnant" if p.is_pregnant else "Not Pregnant",
            "is_pregnant": p.is_pregnant,
            "trimester": p.trimester,
            "high_risk_pregnancy": p.high_risk_pregnancy,
            "vital_signs": {
                "blood_pressure": p.blood_pressure or "120/80 mmHg",
                "sugar_level": p.sugar_level or 110,
                "sugar": f"{p.sugar_level or 110} mg/dL",
                "pulse_rate": p.pulse_rate or 72,
                "pulse": f"{p.pulse_rate or 72} bpm",
                "oxygen_level": p.oxygen_level or 98,
                "spo2": f"{p.oxygen_level or 98}%"
            },
            "medications": p.medications or ["Iron Tablets", "Folic Acid"],
            "newborn_age_days": p.newborn_age_days,
            "vaccination_status": p.vaccination_status,
            "days_overdue": p.days_overdue,
            "chronic_disease_flags": p.chronic_disease_flags or [],
            "previous_missed_visits": p.previous_missed_visits,
            "visit_type": p.visit_type,
            "last_visit_days_ago": p.last_visit_days_ago,
            "risk_score": p.risk_score,
            "risk_band": p.risk_band,
            "assigned_worker_id": p.assigned_worker_id,
            "created_at": p.created_at
        })

    return {
        "success": True,
        "data": {
            "total_count": total_count,
            "page": page,
            "limit": limit,
            "total_pages": (total_count + limit - 1) // limit if total_count > 0 else 1,
            "patients": items
        }
    }

@router.get("/{patient_id}")
def get_patient(patient_id: str, db: Session = Depends(get_db)):
    """Retrieves full single patient clinical profile and vitals history."""
    patient = db.query(Patient).filter(Patient.id == patient_id, Patient.is_deleted == False).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient record not found")

    return {
        "success": True,
        "data": {
            "patient_id": patient.id,
            "name": patient.name,
            "age": patient.age,
            "gender": patient.gender,
            "phone": patient.phone,
            "village": patient.village,
            "latitude": patient.latitude,
            "longitude": patient.longitude,
            "pregnancy_status": "Pregnant" if patient.is_pregnant else "Not Pregnant",
            "is_pregnant": patient.is_pregnant,
            "trimester": patient.trimester,
            "high_risk_pregnancy": patient.high_risk_pregnancy,
            "vital_signs": {
                "blood_pressure": patient.blood_pressure or "120/80 mmHg",
                "sugar_level": patient.sugar_level or 110,
                "pulse_rate": patient.pulse_rate or 72,
                "oxygen_level": patient.oxygen_level or 98
            },
            "medications": patient.medications or ["Iron Tablets", "Folic Acid"],
            "risk_score": patient.risk_score,
            "risk_band": patient.risk_band,
            "assigned_worker_id": patient.assigned_worker_id,
            "created_at": patient.created_at
        }
    }

@router.post("", status_code=status.HTTP_201_CREATED)
def create_patient(body: PatientCreateSchema, db: Session = Depends(get_db)):
    """Creates a new patient record, stores vitals and medications, and triggers ML risk scoring."""
    pat_id = f"pat_{int(datetime.datetime.utcnow().timestamp())}"
    
    # Calculate ML Risk Score via AI Risk Service
    ai_risk = RiskScoringService.calculate_risk(body.model_dump())

    patient = Patient(
        id=pat_id,
        name=body.name,
        age=body.age,
        gender=body.gender,
        phone=body.phone,
        village=body.village,
        latitude=body.latitude,
        longitude=body.longitude,
        is_pregnant=body.is_pregnant,
        trimester=body.trimester,
        high_risk_pregnancy=body.high_risk_pregnancy,
        blood_pressure=body.blood_pressure,
        sugar_level=body.sugar_level,
        pulse_rate=body.pulse_rate,
        oxygen_level=body.oxygen_level,
        medications=body.medications,
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

    return {
        "success": True,
        "message": "Patient profile and clinical vitals created successfully",
        "data": patient
    }

@router.put("/{patient_id}")
def update_patient(patient_id: str, body: PatientUpdateSchema, db: Session = Depends(get_db)):
    """Updates an existing patient profile, vital signs, medications, or clinical indicators."""
    patient = db.query(Patient).filter(Patient.id == patient_id, Patient.is_deleted == False).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient record not found")

    update_data = body.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        if val is not None:
            setattr(patient, field, val)

    # Recalculate ML Risk Score if clinical factors changed
    scoring_payload = {
        "is_pregnant": patient.is_pregnant,
        "trimester": patient.trimester,
        "high_risk_pregnancy": patient.high_risk_pregnancy,
        "days_overdue": patient.days_overdue,
        "vaccination_status": patient.vaccination_status,
        "chronic_disease_flags": patient.chronic_disease_flags or []
    }
    ai_risk = RiskScoringService.calculate_risk(scoring_payload)
    patient.risk_score = ai_risk["risk_score"]
    patient.risk_band = ai_risk["risk_band"]

    db.commit()
    db.refresh(patient)

    return {
        "success": True,
        "message": f"Patient {patient.name} record updated successfully. Recalculated ML Risk: {patient.risk_score} ({patient.risk_band}).",
        "data": patient
    }

@router.delete("/{patient_id}")
def delete_patient(patient_id: str, db: Session = Depends(get_db)):
    """Soft deletes a patient record."""
    patient = db.query(Patient).filter(Patient.id == patient_id, Patient.is_deleted == False).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient record not found")

    patient.is_deleted = True
    db.commit()

    return {
        "success": True,
        "message": f"Patient record {patient_id} soft-deleted successfully."
    }
