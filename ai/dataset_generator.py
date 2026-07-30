import os
import random
import pandas as pd
import numpy as np

# Random seed for reproducibility
random.seed(42)
np.random.seed(42)

def generate_synthetic_dataset(num_rows=3500, output_path="data/patients_synthetic.csv"):
    """
    Generates 3,500 synthetic patient records realistically skewed to rural Indian 
    Primary Health Centre (PHC) ANC/PNC and immunization prevalence.
    """
    villages = [
        "Ramanthapur Sector 1", "Ramanthapur Sector 2", "Ramanthapur East", 
        "Ramanthapur Central", "Uppal Main Road", "Uppal Colony", 
        "Habsiguda Sector A", "Habsiguda Colony", "Vidyanagar"
    ]
    
    visit_types = ["anc_checkup", "pnc_checkup", "immunization", "general", "follow_up"]
    vaccination_statuses = ["up_to_date", "due", "overdue", "not_applicable"]
    
    data = []
    
    for i in range(1, num_rows + 1):
        patient_id = f"pat_{i:04d}"
        
        # Age distribution skewed towards reproductive age & infants
        is_infant = random.random() < 0.20
        if is_infant:
            age = 0
            gender = random.choice(["female", "male"])
            is_pregnant = False
            trimester = 0
            high_risk_pregnancy = False
            newborn_age_days = random.randint(1, 60)
            visit_type = random.choice(["immunization", "pnc_checkup"])
        else:
            age = random.randint(18, 45)
            gender = "female"
            is_pregnant = random.random() < 0.45
            if is_pregnant:
                trimester = random.choice([1, 2, 3])
                high_risk_pregnancy = random.random() < 0.28
                newborn_age_days = 0
                visit_type = "anc_checkup"
            else:
                trimester = 0
                high_risk_pregnancy = False
                newborn_age_days = 0
                visit_type = random.choice(["general", "follow_up", "pnc_checkup"])
                
        # Vaccination & Overdue status
        if is_infant or is_pregnant:
            vaccination_status = random.choice(["up_to_date", "due", "overdue"])
            days_overdue = random.randint(1, 30) if vaccination_status == "overdue" else 0
        else:
            vaccination_status = "not_applicable"
            days_overdue = 0
            
        # Chronic conditions
        chronic_flags = []
        if random.random() < 0.25:
            chronic_flags.append("anemia")
        if random.random() < 0.12:
            chronic_flags.append("hypertension")
        if random.random() < 0.08:
            chronic_flags.append("diabetes")
            
        previous_missed_visits = random.choices([0, 1, 2, 3], weights=[0.65, 0.20, 0.10, 0.05])[0]
        last_visit_days_ago = random.randint(2, 60)
        village = random.choice(villages)
        
        # Latitude & Longitude centered around Ramanthapur/Uppal (17.3980, 78.5420)
        latitude = round(17.3950 + random.uniform(-0.025, 0.025), 6)
        longitude = round(78.5380 + random.uniform(-0.025, 0.025), 6)
        
        # Ground-truth Risk Score Formula (PRD 4.1.2)
        score = (
            30 * int(high_risk_pregnancy)
          + 25 * int(trimester == 3)
          + 20 * int(newborn_age_days > 0 and newborn_age_days <= 7)
          + 15 * int(vaccination_status == "overdue")
          + min(days_overdue, 30) * 1.0
          + min(previous_missed_visits, 3) * 10.0
          + 15 * int(len(chronic_flags) > 0)
          + 10 * int(visit_type == "anc_checkup" and trimester >= 2)
          + random.uniform(-4, 4) # Add minor synthetic noise
        )
        
        # Clamp score 0 to 100
        risk_score = int(np.clip(score, 0, 100))
        
        data.append({
            "patient_id": patient_id,
            "age": age,
            "gender": gender,
            "village": village,
            "latitude": latitude,
            "longitude": longitude,
            "is_pregnant": is_pregnant,
            "trimester": trimester,
            "high_risk_pregnancy": high_risk_pregnancy,
            "newborn_age_days": newborn_age_days,
            "vaccination_status": vaccination_status,
            "days_overdue": days_overdue,
            "chronic_disease_flags": ",".join(chronic_flags),
            "previous_missed_visits": previous_missed_visits,
            "visit_type": visit_type,
            "last_visit_days_ago": last_visit_days_ago,
            "risk_score": risk_score
        })

    df = pd.DataFrame(data)
    
    # Ensure target output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df.to_csv(output_path, index=False)
    print(f"✅ Generated {len(df)} synthetic patient records saved to: {output_path}")
    return df

if __name__ == "__main__":
    generate_synthetic_dataset()
