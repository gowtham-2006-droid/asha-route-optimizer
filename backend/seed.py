import random
import datetime
from database import engine, SessionLocal, Base
from models import PHC, User, Worker, Patient, RiskScore, EmergencyCase, ResourceItem, Message, Report

def seed_database():
    """Populates 1 PHC, ASHA Workers, Patients, Emergency Cases, Resources, Messages, and Reports on startup."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if database is already seeded
    if db.query(PHC).first():
        print("Database already contains seeded data. Skipping initialization.")
        db.close()
        return

    print("🌱 Seeding Database with PHC, ASHA Workers, Patients, Emergency Cases, Resources, Messages, and Reports...")

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
        {"user_id": "usr_w101", "worker_id": "usr_w101", "name": "Lakshmi Devi", "phone": "+919876543210", "role": "asha_worker", "village": "Habsiguda"},
        {"user_id": "usr_w102", "worker_id": "usr_w102", "name": "Sita Devi", "phone": "+919876543211", "role": "asha_worker", "village": "Uppal"},
        {"user_id": "usr_w103", "worker_id": "usr_w103", "name": "Anitha Reddy", "phone": "+919876543212", "role": "asha_worker", "village": "Pedda Thimmapur"},
        {"user_id": "usr_w104", "worker_id": "usr_w104", "name": "Meena Kumari", "phone": "+919876543213", "role": "asha_worker", "village": "Nacharam"},
        {"user_id": "usr_w105", "worker_id": "usr_w105", "name": "Rani Devi", "phone": "+919876543214", "role": "asha_worker", "village": "Nagole"},
    ]

    for wc in worker_configs:
        user = User(id=wc["user_id"], phone=wc["phone"], name=wc["name"], role=wc["role"], phc_id=phc.id)
        worker = Worker(id=wc["worker_id"], user_id=user.id, assigned_village=wc["village"], daily_max_visits=10, current_latitude=17.3950, current_longitude=78.5300)
        db.add(user)
        db.add(worker)

    # Supervisor User
    sup_user = User(id="usr_sup01", phone="+919876543299", name="Dr. Ramesh Kumar", role="supervisor", phc_id=phc.id)
    db.add(sup_user)

    db.commit()

    # 3. Create Patients
    villages = ["Habsiguda", "Uppal", "Pedda Thimmapur", "Nacharam", "Nagole"]
    patient_names = [
        "Saraswati Devi", "Anitha Reddy", "Meena Kumari", "Rani Lakshmi", "Praveen Kumar",
        "Sunitha Rao", "Priyanka Reddy", "Anitha Kumar", "Deepa Rani", "Kavitha Sharma",
        "Radhika Devi", "Sarita Devi", "Latha Rao", "Lakshmi Bai", "Sita Sharma"
    ]

    for i in range(1, 51):
        pat_id = f"pat_{i:03d}"
        name = random.choice(patient_names) if i > 5 else ["Saraswati Devi", "Anitha Reddy", "Meena Kumari", "Rani Lakshmi", "Praveen Kumar"][i-1]
        village = random.choice(villages)
        worker_id = f"usr_w10{(i % 5) + 1}"

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

    # 4. Create Emergency Cases
    emergencies = [
        EmergencyCase(id="ER-1024", patient_id="pat_001", patient_name="Sita Devi", age=29, gender="Female", village="Pedda Thimmapur", phone="+91 98765 43210", emergency_type="Pregnancy Complication", priority="Critical", status="Active", risk_score=91, reported_time="10 min ago", eta="12 min", assigned_worker_id="usr_w101", nearest_hospital="Gandhi Hospital (4.2 km)", vitals_json={"bp": "160/100 mmHg", "pulse": "108 bpm", "spo2": "91%", "temp": "99.1 °F"}),
        EmergencyCase(id="ER-1025", patient_id="pat_002", patient_name="Ravi Kumar", age=45, gender="Male", village="Uppal", phone="+91 98765 43211", emergency_type="High Fever", priority="High", status="Active", risk_score=82, reported_time="18 min ago", eta="18 min", assigned_worker_id="usr_w104", nearest_hospital="PHC Uppal (1.5 km)", vitals_json={"bp": "130/85 mmHg", "pulse": "98 bpm", "spo2": "96%", "temp": "103.2 °F"}),
        EmergencyCase(id="ER-1026", patient_id="pat_003", patient_name="Meena Kumari", age=32, gender="Female", village="Nagole", phone="+91 98765 43212", emergency_type="Snake Bite", priority="High", status="Active", risk_score=88, reported_time="25 min ago", eta="25 min", assigned_worker_id="usr_w105", nearest_hospital="Ramanthapur General Hospital (3.1 km)", vitals_json={"bp": "110/70 mmHg", "pulse": "115 bpm", "spo2": "94%", "temp": "98.6 °F"}),
    ]
    for em in emergencies:
        db.add(em)

    # 5. Create Resource Items
    resources = [
        ResourceItem(id="res_01", name="ORS Packets", category="Medical Supplies", available_stock=12, unit="Packets", min_stock_level=50, status="Low Stock", expiry_date="--", last_updated="25 May 2026"),
        ResourceItem(id="res_02", name="Iron Tablets", category="Medicines", available_stock=28, unit="Tablets", min_stock_level=100, status="Low Stock", expiry_date="30 Jun 2026", last_updated="25 May 2026"),
        ResourceItem(id="res_03", name="Paracetamol 500mg", category="Medicines", available_stock=15, unit="Strips", min_stock_level=50, status="Low Stock", expiry_date="15 Jul 2026", last_updated="25 May 2026"),
        ResourceItem(id="res_04", name="Amlodipine 5mg", category="Medicines", available_stock=35, unit="Tablets", min_stock_level=80, status="Low Stock", expiry_date="10 Aug 2026", last_updated="25 May 2026"),
        ResourceItem(id="res_05", name="TT Vaccine", category="Vaccines", available_stock=0, unit="Vials", min_stock_level=10, status="Out of Stock", expiry_date="--", last_updated="25 May 2026"),
        ResourceItem(id="res_06", name="BP Monitor", category="Equipment", available_stock=5, unit="Units", min_stock_level=3, status="Good Stock", expiry_date="--", last_updated="25 May 2026"),
    ]
    for r in resources:
        db.add(r)

    # 6. Create Initial Chat Messages
    messages = [
        Message(id="msg_01", sender_id="usr_w101", sender_name="Lakshmi Devi", receiver_id="usr_sup01", text="Good morning Dr. Ramesh. Starting my Habsiguda route now.", timestamp="08:30 AM", is_me=False),
        Message(id="msg_02", sender_id="usr_sup01", sender_name="Dr. Ramesh Kumar", receiver_id="usr_w101", text="Good morning Lakshmi. Please prioritize Saraswati Devi as her BP risk score is elevated.", timestamp="08:35 AM", is_me=True),
        Message(id="msg_03", sender_id="usr_w101", sender_name="Lakshmi Devi", receiver_id="usr_sup01", text="Completed visit for Saraswati Devi. Blood sugar recorded 142 mg/dL.", timestamp="10:24 AM", is_me=False),
    ]
    for msg in messages:
        db.add(msg)

    db.commit()
    db.close()
    print("✅ Seeded Database successfully with real initial data!")

if __name__ == "__main__":
    seed_database()
