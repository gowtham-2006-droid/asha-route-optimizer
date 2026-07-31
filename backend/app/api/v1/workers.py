import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.core.database import get_db
from app.core.security import hash_password
from app.models.domain import ASHAWorker, User, Village
from app.schemas.pydantic_schemas import WorkerCreateSchema, WorkerUpdateSchema

router = APIRouter(prefix="/workers", tags=["ASHA Workers CRUD & Telemetry"])

@router.get("")
def list_workers(
    status: Optional[str] = Query(None, description="Filter by availability status (Active, On Leave, Busy, Offline)"),
    village_name: Optional[str] = Query(None, description="Filter by assigned village"),
    search: Optional[str] = Query(None, description="Search by name or phone number"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    """Lists ASHA Workers with pagination, filtering, search, and live telemetry."""
    query = db.query(ASHAWorker).join(User, ASHAWorker.user_id == User.id).filter(ASHAWorker.is_deleted == False)

    if status and status != "ALL":
        query = query.filter(ASHAWorker.status == status)

    if village_name and village_name != "ALL":
        query = query.filter(ASHAWorker.assigned_village.has(name=village_name))

    if search:
        search_pattern = f"%{search}%"
        query = query.filter(or_(User.name.ilike(search_pattern), User.phone.ilike(search_pattern)))

    total_count = query.count()
    offset = (page - 1) * limit
    workers = query.offset(offset).limit(limit).all()

    items = []
    for w in workers:
        village_str = w.assigned_village.name if w.assigned_village else "Ramanthapur"
        items.append({
            "worker_id": w.id,
            "user_id": w.user_id,
            "name": w.user.name if w.user else "ASHA Worker",
            "phone": w.user.phone if w.user else "+919876543210",
            "assigned_village": village_str,
            "daily_max_visits": w.daily_max_visits or 10,
            "gps_coordinates": {
                "latitude": w.current_latitude or 17.3950,
                "longitude": w.current_longitude or 78.5300
            },
            "battery_level": f"{w.battery_pct or 85}%",
            "battery_pct": w.battery_pct or 85,
            "network_status": w.network_status or "Good",
            "availability_status": w.status or "Active",
            "created_at": w.created_at
        })

    return {
        "success": True,
        "data": {
            "total_count": total_count,
            "page": page,
            "limit": limit,
            "total_pages": (total_count + limit - 1) // limit if total_count > 0 else 1,
            "workers": items
        }
    }

@router.get("/{worker_id}")
def get_worker(worker_id: str, db: Session = Depends(get_db)):
    """Retrieves single ASHA Worker details and telemetry status by ID."""
    worker = db.query(ASHAWorker).filter(ASHAWorker.id == worker_id, ASHAWorker.is_deleted == False).first()
    if not worker:
        raise HTTPException(status_code=404, detail="ASHA Worker record not found")

    village_str = worker.assigned_village.name if worker.assigned_village else "Ramanthapur"
    return {
        "success": True,
        "data": {
            "worker_id": worker.id,
            "user_id": worker.user_id,
            "name": worker.user.name if worker.user else "ASHA Worker",
            "phone": worker.user.phone if worker.user else "+919876543210",
            "assigned_village": village_str,
            "daily_max_visits": worker.daily_max_visits or 10,
            "gps_coordinates": {
                "latitude": worker.current_latitude or 17.3950,
                "longitude": worker.current_longitude or 78.5300
            },
            "battery_level": f"{worker.battery_pct or 85}%",
            "battery_pct": worker.battery_pct or 85,
            "network_status": worker.network_status or "Good",
            "availability_status": worker.status or "Active",
            "created_at": worker.created_at
        }
    }

@router.post("", status_code=status.HTTP_201_CREATED)
def create_worker(body: WorkerCreateSchema, db: Session = Depends(get_db)):
    """Creates a new ASHA Worker profile and user account."""
    existing_user = db.query(User).filter(User.phone == body.phone).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this phone number already exists")

    uid = f"usr_{int(datetime.datetime.utcnow().timestamp())}"
    user = User(
        id=uid,
        phone=body.phone,
        name=body.name,
        role="ASHA Worker",
        password_hash=hash_password(body.password or "password123"),
        phc_id="phc_ramanthapur_01"
    )
    db.add(user)

    worker = ASHAWorker(
        id=uid,
        user_id=uid,
        daily_max_visits=body.daily_max_visits,
        current_latitude=body.current_latitude,
        current_longitude=body.current_longitude,
        battery_pct=body.battery_pct,
        network_status=body.network_status,
        status=body.status
    )
    db.add(worker)

    db.commit()
    db.refresh(worker)

    return {
        "success": True,
        "message": "ASHA Worker profile created successfully",
        "data": {
            "worker_id": worker.id,
            "name": body.name,
            "phone": body.phone,
            "assigned_village": body.assigned_village_name or "Ramanthapur",
            "gps_coordinates": {
                "latitude": body.current_latitude,
                "longitude": body.current_longitude
            },
            "battery_level": f"{body.battery_pct}%",
            "network_status": body.network_status,
            "availability_status": body.status
        }
    }

@router.put("/{worker_id}")
def update_worker(worker_id: str, body: WorkerUpdateSchema, db: Session = Depends(get_db)):
    """Updates an existing ASHA Worker telemetry, location, battery level, or profile."""
    worker = db.query(ASHAWorker).filter(ASHAWorker.id == worker_id, ASHAWorker.is_deleted == False).first()
    if not worker:
        raise HTTPException(status_code=404, detail="ASHA Worker record not found")

    if body.daily_max_visits is not None: worker.daily_max_visits = body.daily_max_visits
    if body.current_latitude is not None: worker.current_latitude = body.current_latitude
    if body.current_longitude is not None: worker.current_longitude = body.current_longitude
    if body.battery_pct is not None: worker.battery_pct = body.battery_pct
    if body.network_status is not None: worker.network_status = body.network_status
    if body.status is not None: worker.status = body.status

    if worker.user:
        if body.name is not None: worker.user.name = body.name
        if body.phone is not None: worker.user.phone = body.phone

    db.commit()
    db.refresh(worker)

    village_str = worker.assigned_village.name if worker.assigned_village else "Ramanthapur"
    return {
        "success": True,
        "message": "ASHA Worker record updated successfully",
        "data": {
            "worker_id": worker.id,
            "name": worker.user.name if worker.user else "ASHA Worker",
            "phone": worker.user.phone if worker.user else "+919876543210",
            "assigned_village": village_str,
            "daily_max_visits": worker.daily_max_visits,
            "gps_coordinates": {
                "latitude": worker.current_latitude,
                "longitude": worker.current_longitude
            },
            "battery_level": f"{worker.battery_pct}%",
            "network_status": worker.network_status,
            "availability_status": worker.status
        }
    }

@router.delete("/{worker_id}")
def delete_worker(worker_id: str, db: Session = Depends(get_db)):
    """Soft deletes an ASHA Worker record."""
    worker = db.query(ASHAWorker).filter(ASHAWorker.id == worker_id, ASHAWorker.is_deleted == False).first()
    if not worker:
        raise HTTPException(status_code=404, detail="ASHA Worker record not found")

    worker.is_deleted = True
    if worker.user:
        worker.user.is_deleted = True

    db.commit()
    return {
        "success": True,
        "message": f"ASHA Worker record {worker_id} deleted successfully (soft delete)."
    }
