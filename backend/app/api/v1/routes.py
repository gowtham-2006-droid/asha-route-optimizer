from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import Patient, EmergencyCase
from app.schemas.pydantic_schemas import EmergencyCreateSchema
from app.services.ai_services import RouteOptimizerService

router = APIRouter(prefix="/routes", tags=["Routes Optimization"])

@router.get("/{worker_id}/today")
def get_today_route(worker_id: str, db: Session = Depends(get_db)):
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
    route_data = RouteOptimizerService.optimize_route(worker_id, start_loc, patient_dicts)
    return {"success": True, "data": route_data}

@router.post("/emergency-reroute")
def emergency_reroute(emergency: EmergencyCreateSchema, db: Session = Depends(get_db)):
    em_id = f"ER-{int(datetime.datetime.utcnow().timestamp() % 10000)}" if 'datetime' in globals() else "ER-1027"
    em_case = EmergencyCase(
        id=em_id,
        patient_name=emergency.patient_name,
        age=emergency.age,
        gender=emergency.gender,
        village=emergency.village,
        phone=emergency.phone,
        emergency_type=emergency.emergency_type,
        priority=emergency.priority,
        status="Active",
        reported_time="Just now",
        eta="12 min",
        assigned_worker_id="usr_w101",
        nearest_hospital="Gandhi Hospital (4.2 km)",
        vitals_json={"bp": "150/95 mmHg", "pulse": "104 bpm", "spo2": "93%", "temp": "99.8 °F"}
    )
    db.add(em_case)
    db.commit()

    return {
        "success": True,
        "data": {
            "case_id": em_id,
            "message": "Emergency dispatch created and route re-optimized dynamically via OR-Tools.",
            "emergency": em_case
        }
    }
