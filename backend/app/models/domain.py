import uuid
import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Date, Text, ForeignKey, JSON, Index
from sqlalchemy.orm import relationship
from app.core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    phone = Column(String(20), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    role = Column(String(20), nullable=False) # asha_worker, supervisor, admin
    password_hash = Column(String(255), nullable=True)
    phc_id = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

    worker = relationship("ASHAWorker", back_populates="user", uselist=False)
    notifications = relationship("Notification", back_populates="user")
    sent_messages = relationship("Message", foreign_keys="Message.sender_id", back_populates="sender")
    received_messages = relationship("Message", foreign_keys="Message.receiver_id", back_populates="receiver")

class Village(Base):
    __tablename__ = "villages"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), index=True, nullable=False)
    district = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    population = Column(Integer, default=1000)
    total_households = Column(Integer, default=250)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

    workers = relationship("ASHAWorker", back_populates="assigned_village")
    patients = relationship("Patient", back_populates="village")
    emergencies = relationship("Emergency", back_populates="village")

class ASHAWorker(Base):
    __tablename__ = "asha_workers"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), unique=True, nullable=False)
    assigned_village_id = Column(String(36), ForeignKey("villages.id"), nullable=True)
    daily_max_visits = Column(Integer, default=10)
    current_latitude = Column(Float, nullable=True)
    current_longitude = Column(Float, nullable=True)
    battery_pct = Column(Integer, default=85)
    network_status = Column(String(20), default="Good")
    status = Column(String(20), default="Active")
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

    user = relationship("User", back_populates="worker")
    assigned_village = relationship("Village", back_populates="workers")
    patients = relationship("Patient", back_populates="assigned_worker")
    routes = relationship("Route", back_populates="worker")
    emergencies = relationship("Emergency", back_populates="assigned_worker")

class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(150), index=True, nullable=False)
    district = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    type = Column(String(50), default="General Hospital")
    emergency_phone = Column(String(20), nullable=True)
    total_beds = Column(Integer, default=100)
    available_icu_beds = Column(Integer, default=5)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

    patients = relationship("Patient", back_populates="hospital")
    emergencies = relationship("Emergency", back_populates="hospital")
    medicines = relationship("MedicineInventory", back_populates="hospital")

class Patient(Base):
    __tablename__ = "patients"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), index=True, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(10), nullable=False)
    phone = Column(String(20), nullable=True)
    village_id = Column(String(36), ForeignKey("villages.id"), nullable=True)
    assigned_worker_id = Column(String(36), ForeignKey("asha_workers.id"), nullable=True)
    hospital_id = Column(String(36), ForeignKey("hospitals.id"), nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    is_pregnant = Column(Boolean, default=False)
    trimester = Column(Integer, default=0)
    high_risk_pregnancy = Column(Boolean, default=False)
    blood_pressure = Column(String(20), default="120/80 mmHg")
    sugar_level = Column(Integer, default=110)
    pulse_rate = Column(Integer, default=72)
    oxygen_level = Column(Integer, default=98)
    medications = Column(JSON, default=list)
    newborn_age_days = Column(Integer, default=0)
    vaccination_status = Column(String(20), default="up_to_date")
    days_overdue = Column(Integer, default=0)
    chronic_disease_flags = Column(JSON, default=list)
    previous_missed_visits = Column(Integer, default=0)
    visit_type = Column(String(30), nullable=False)
    last_visit_days_ago = Column(Integer, default=0)
    risk_score = Column(Integer, default=50, index=True)
    risk_band = Column(String(20), default="Moderate", index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

    village = relationship("Village", back_populates="patients")
    assigned_worker = relationship("ASHAWorker", back_populates="patients")
    hospital = relationship("Hospital", back_populates="patients")
    route_stops = relationship("RouteStop", back_populates="patient")
    emergencies = relationship("Emergency", back_populates="patient")
    predictions = relationship("Prediction", back_populates="patient")

class Route(Base):
    __tablename__ = "routes"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    worker_id = Column(String(36), ForeignKey("asha_workers.id"), nullable=False)
    route_date = Column(Date, nullable=False, index=True)
    total_distance_km = Column(Float, nullable=False)
    total_duration_minutes = Column(Integer, nullable=False)
    status = Column(String(20), default="active")
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

    worker = relationship("ASHAWorker", back_populates="routes")
    stops = relationship("RouteStop", back_populates="route")

class RouteStop(Base):
    __tablename__ = "route_stops"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    route_id = Column(String(36), ForeignKey("routes.id"), nullable=False)
    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=False)
    sequence_number = Column(Integer, nullable=False, index=True)
    estimated_arrival = Column(String(10), nullable=False)
    estimated_departure = Column(String(10), nullable=False)
    travel_time_minutes = Column(Integer, nullable=False)
    distance_km = Column(Float, nullable=False)
    is_emergency = Column(Boolean, default=False)
    status = Column(String(20), default="scheduled")
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

    route = relationship("Route", back_populates="stops")
    patient = relationship("Patient", back_populates="route_stops")

class Emergency(Base):
    __tablename__ = "emergencies"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=True)
    patient_name = Column(String(100), nullable=False)
    age = Column(Integer, default=30)
    gender = Column(String(10), default="Female")
    village_id = Column(String(36), ForeignKey("villages.id"), nullable=True)
    phone = Column(String(20), nullable=True)
    emergency_type = Column(String(100), nullable=False)
    priority = Column(String(20), default="Critical", index=True)
    status = Column(String(20), default="Active", index=True)
    risk_score = Column(Integer, default=90)
    reported_time = Column(String(30), default="Just now")
    eta = Column(String(20), default="15 min")
    assigned_worker_id = Column(String(36), ForeignKey("asha_workers.id"), nullable=True)
    hospital_id = Column(String(36), ForeignKey("hospitals.id"), nullable=True)
    vitals_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

    patient = relationship("Patient", back_populates="emergencies")
    village = relationship("Village", back_populates="emergencies")
    assigned_worker = relationship("ASHAWorker", back_populates="emergencies")
    hospital = relationship("Hospital", back_populates="emergencies")

class Resource(Base):
    __tablename__ = "resources"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), index=True, nullable=False)
    category = Column(String(50), nullable=False)
    available_stock = Column(Integer, nullable=False)
    unit = Column(String(20), nullable=False)
    min_stock_level = Column(Integer, nullable=False)
    status = Column(String(20), default="Good Stock")
    expiry_date = Column(String(30), nullable=True)
    last_updated = Column(String(30), default="Today")
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

class Report(Base):
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(150), nullable=False)
    report_type = Column(String(50), index=True, nullable=False)
    generated_at = Column(String(50), nullable=False)
    file_format = Column(String(10), default="XLSX")
    download_url = Column(String(255), nullable=True)
    metrics_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    title = Column(String(150), nullable=False)
    body = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False, index=True)
    notification_type = Column(String(50), default="info")
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

    user = relationship("User", back_populates="notifications")

class Message(Base):
    __tablename__ = "messages"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    sender_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    receiver_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    text = Column(Text, nullable=False)
    timestamp = Column(String(30), nullable=False)
    is_read = Column(Boolean, default=False, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_messages")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_messages")

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=False)
    model_version = Column(String(50), default="v2.1.0-xgboost")
    predicted_risk_score = Column(Integer, nullable=False)
    predicted_risk_band = Column(String(20), nullable=False)
    confidence_score = Column(Float, default=0.92)
    feature_contributions_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

    patient = relationship("Patient", back_populates="predictions")

class MedicineInventory(Base):
    __tablename__ = "medicine_inventory"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    medicine_name = Column(String(100), index=True, nullable=False)
    category = Column(String(50), nullable=False)
    batch_number = Column(String(50), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit = Column(String(20), nullable=False)
    min_threshold = Column(Integer, nullable=False)
    expiry_date = Column(String(30), nullable=True)
    hospital_id = Column(String(36), ForeignKey("hospitals.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, index=True)

    hospital = relationship("Hospital", back_populates="medicines")
