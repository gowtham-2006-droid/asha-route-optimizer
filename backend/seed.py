import random
from database import engine, SessionLocal, Base
from models import PHC, User, Worker, Patient, RiskScore

def seed_database():
    """Populates 1 PHC, 3 Workers, and 50 Synthetic Patients on startup."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if database is already seeded
    if db.query(PHC).first():
        print("Database already contains seeded data. Skipping initialization.")
        db.close()
        return

    print("🌱 Seeding Database with PHC, ASHA Workers, and Patients...")

    # 1. Create PHC
    phc = PHC(
        id="phc_ramanthapur_01",
        name="PHC Ramanthapur Hub",
        district="Malkajgiri",
        state="Telangana",
        latitude=17.3950,
        longitude=78.5300
    )
    db.add(phc)

    # 2. Create Users & Workers
    worker_configs = [
        {"user_id": "usr_w101", "worker_id": "usr_w101", "name": "Lakshmi Devi", "phone": "+919876543210", "role": "asha_worker", "village": "Ramanthapur Sector 1"},
        {"user_id": "usr_w102", "worker_id": "usr_w102", "name": "Radhika Sharma", "phone": "+919876543211", "role": "asha_worker", "village": "Uppal Main Road"},
        {"user_id": "usr_w103", "worker_id": "usr_w103", "name": "Sunitha Kumar", "phone": "+919876543212", "role": "asha_worker", "village": "Habsiguda Colony"},
    ]

    for wc in worker_configs:
        user = User(id=wc["user_id"], phone=wc["phone"], name=wc["name"], role=wc["role"], phc_id=phc.id)
        worker = Worker(id=wc["worker_id"], user_id=user.id, assigned_village=wc["village"], daily_max_visits=10, current_latitude=17.3950, current_longitude=78.5300)
        db.add(user)
        db.add(worker)

    # Supervisor User
    sup_user = User(id="usr_sup01", phone="+919876543299", name="Dr. Radhika Rao", role="supervisor", phc_id=phc.id)
    db.add(sup_user)

    db.commit()

    # 3. Create 50 Seed Patients
    villages = ["Ramanthapur Sector 1", "Uppal Main Road", "Habsiguda Colony", "Ramanthapur East"]
    patient_names = [
        "Sunitha Rao", "Priyanka Reddy", "Anitha Kumar", "Deepa Rani", "Kavitha Sharma",
        "Radhika Devi", "Meena Kumari", "Sarita Devi", "Latha Rao", "Lakshmi Bai",
        "Sita Sharma", "Gita Reddy", "Kalyani Rani", "Vani Kumar", "Sujatha Rao"
    ]

    for i in range(1, 51):
        pat_id = f"pat_{i:03d}"
        name = random.choice(patient_names) if i > 5 else ["Sunitha Rao", "Priyanka Reddy", "Anitha Kumar", "Deepa Rani", "Kavitha Sharma"][i-1]
        village = random.choice(villages)
        worker_id = "usr_w101" if i <= 20 else ("usr_w102" if i <= 35 else "usr_w103")

        is_preg = random.random() < 0.40
        high_risk = is_preg and (random.random() < 0.30)
        trimester = random.choice([1, 2, 3]) if is_preg else 0
        overdue_days = random.choice([0, 0, 3, 5, 8, 12])
        v_status = "overdue" if overdue_days > 0 else "up_to_date"

        score = 25
        if high_risk: score += 35
        if trimester == 3: score += 25
        if v_status == "overdue": score += 15
        score += min(overdue_days, 30)
        score = min(max(score, 10), 100)

        band = "Critical" if score >= 80 else "High" if score >= 60 else "Moderate" if score >= 35 else "Low"

        patient = Patient(
            id=pat_id,
            name=name,
            age=random.randint(20, 38),
            gender="female",
            phone=f"+9198000{i:05d}",
            village=village,
            latitude=round(17.3950 + random.uniform(-0.02, 0.02), 6),
            longitude=round(78.5380 + random.uniform(-0.02, 0.02), 6),
            is_pregnant=is_preg,
            trimester=trimester,
            high_risk_pregnancy=high_risk,
            newborn_age_days=random.choice([0, 0, 5, 12]),
            vaccination_status=v_status,
            days_overdue=overdue_days,
            chronic_disease_flags=["anemia"] if high_risk else [],
            previous_missed_visits=random.choice([0, 0, 1]),
            visit_type="anc_checkup" if is_preg else "general",
            last_visit_days_ago=random.randint(5, 30),
            risk_score=score,
            risk_band=band,
            assigned_worker_id=worker_id,
            phc_id=phc.id
        )
        db.add(patient)

    db.commit()
    db.close()
    print("✅ Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
