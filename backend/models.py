import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Date, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base

class PHC(Base):
    __tablename__ = "phcs"

    id = Column(String(50), primary_key=True)
    name = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    users = relationship("User", back_populates="phc")
    patients = relationship("Patient", back_populates="phc")

class User(Base):
    __tablename__ = "users"

    id = Column(String(50), primary_key=True)
    phone = Column(String(15), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    role = Column(String(20), nullable=False) # asha_worker, supervisor, admin
    phc_id = Column(String(50), ForeignKey("phcs.id"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    phc = relationship("PHC", back_populates="users")
    worker = relationship("Worker", back_populates="user", uselist=False)

class Worker(Base):
    __tablename__ = "workers"

    id = Column(String(50), primary_key=True)
    user_id = Column(String(50), ForeignKey("users.id"), unique=True)
    assigned_village = Column(String(100), nullable=False)
    daily_max_visits = Column(Integer, default=10)
    current_latitude = Column(Float, nullable=True)
    current_longitude = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="worker")
    patients = relationship("Patient", back_populates="assigned_worker")
    routes = relationship("Route", back_populates="worker")

class Patient(Base):
    __tablename__ = "patients"

    id = Column(String(50), primary_key=True)
    name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(10), nullable=False)
    phone = Column(String(15), nullable=True)
    village = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    is_pregnant = Column(Boolean, default=False)
    trimester = Column(Integer, default=0)
    high_risk_pregnancy = Column(Boolean, default=False)
    newborn_age_days = Column(Integer, default=0)
    vaccination_status = Column(String(20), default="up_to_date")
    days_overdue = Column(Integer, default=0)
    chronic_disease_flags = Column(JSON, default=list)
    previous_missed_visits = Column(Integer, default=0)
    visit_type = Column(String(30), nullable=False)
    last_visit_days_ago = Column(Integer, default=0)
    risk_score = Column(Integer, default=50)
    risk_band = Column(String(20), default="Moderate")
    assigned_worker_id = Column(String(50), ForeignKey("workers.id"))
    phc_id = Column(String(50), ForeignKey("phcs.id"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    phc = relationship("PHC", back_populates="patients")
    assigned_worker = relationship("Worker", back_populates="patients")
    risk_scores = relationship("RiskScore", back_populates="patient")

class RiskScore(Base):
    __tablename__ = "risk_scores"

    id = Column(String(50), primary_key=True)
    patient_id = Column(String(50), ForeignKey("patients.id"))
    risk_score = Column(Integer, nullable=False)
    risk_band = Column(String(20), nullable=False)
    top_contributing_factors = Column(JSON, nullable=True)
    explanation_text = Column(Text, nullable=True)
    calculated_at = Column(DateTime, default=datetime.datetime.utcnow)

    patient = relationship("Patient", back_populates="risk_scores")

class Route(Base):
    __tablename__ = "routes"

    id = Column(String(50), primary_key=True)
    worker_id = Column(String(50), ForeignKey("workers.id"))
    route_date = Column(Date, nullable=False)
    total_distance_km = Column(Float, nullable=False)
    total_duration_minutes = Column(Integer, nullable=False)
    status = Column(String(20), default="active")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    worker = relationship("Worker", back_populates="routes")
    stops = relationship("RouteStop", back_populates="route")

class RouteStop(Base):
    __tablename__ = "route_stops"

    id = Column(String(50), primary_key=True)
    route_id = Column(String(50), ForeignKey("routes.id"))
    patient_id = Column(String(50), ForeignKey("patients.id"))
    sequence_number = Column(Integer, nullable=False)
    estimated_arrival = Column(String(10), nullable=False)
    estimated_departure = Column(String(10), nullable=False)
    travel_time_minutes = Column(Integer, nullable=False)
    distance_km = Column(Float, nullable=False)
    is_emergency = Column(Boolean, default=False)
    status = Column(String(20), default="scheduled")

    route = relationship("Route", back_populates="stops")
