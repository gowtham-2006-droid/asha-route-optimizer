import os
import httpx

AI_SERVICE_URL = os.getenv("AI_SERVICE_URL", "http://localhost:8001")

async def call_predict_risk(patient_data: dict):
    """Calls AI microservice /predict-risk or provides internal fallback."""
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.post(f"{AI_SERVICE_URL}/predict-risk", json=patient_data)
            if resp.status_code == 200:
                return resp.json()
    except Exception as e:
        print(f"[AI Gateway Notice] AI service at {AI_SERVICE_URL} unreachable ({e}). Using internal risk calculator.")

    # Internal Fallback Formula
    score = 20
    if patient_data.get("high_risk_pregnancy"): score += 30
    if patient_data.get("trimester") == 3: score += 25
    if patient_data.get("vaccination_status") == "overdue": score += 15
    score += min(patient_data.get("days_overdue", 0), 30)
    score = min(max(score, 10), 100)

    band = "Critical" if score >= 80 else "High" if score >= 60 else "Moderate" if score >= 35 else "Low"
    return {
        "patient_id": patient_data.get("patient_id"),
        "risk_score": score,
        "risk_band": band,
        "explanation": f"Patient prioritized as {band} (Score: {score}) based on clinical indicators."
    }

async def call_optimize_routes(worker_id: str, start_loc: dict, patients: list):
    """Calls AI microservice /optimize-routes or provides internal fallback."""
    payload = {
        "worker_id": worker_id,
        "start_location": start_loc,
        "patients": patients
    }
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.post(f"{AI_SERVICE_URL}/optimize-routes", json=payload)
            if resp.status_code == 200:
                return resp.json()
    except Exception as e:
        print(f"[AI Gateway Notice] AI service unreachable ({e}). Returning fallback route.")

    sorted_patients = sorted(patients, key=lambda x: x.get("risk_score", 50), reverse=True)
    stops = []
    for idx, p in enumerate(sorted_patients):
        stops.append({
            "sequence": idx + 1,
            "patient_id": p.get("patient_id"),
            "patient_name": p.get("name", "Patient"),
            "village": p.get("village", "Ramanthapur"),
            "latitude": p.get("latitude", 17.3980),
            "longitude": p.get("longitude", 78.5400),
            "visit_type": p.get("visit_type", "anc_checkup"),
            "estimated_arrival": f"0{9 + idx//2}:{30 if idx%2==0 else 55} AM",
            "estimated_departure": f"0{9 + idx//2}:{55 if idx%2==0 else 20} AM",
            "travel_time_minutes": 10,
            "distance_km": 2.1,
            "risk_score": p.get("risk_score", 50),
            "risk_band": p.get("risk_band", "Moderate"),
            "status": "scheduled"
        })

    return {
        "success": True,
        "data": {
            "route_id": f"rte_fallback_{worker_id}",
            "total_distance_km": round(len(patients) * 2.1, 1),
            "total_duration_minutes": len(patients) * 30,
            "stops": stops
        }
    }
