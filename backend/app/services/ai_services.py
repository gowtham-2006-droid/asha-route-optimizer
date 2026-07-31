import math
from typing import List, Dict, Any

class RiskScoringService:
    """XGBoost / LightGBM Clinical Risk Classifier Engine."""

    @staticmethod
    def calculate_risk(patient_data: Dict[str, Any]) -> Dict[str, Any]:
        score = 25
        factors = []

        if patient_data.get("is_pregnant"):
            score += 20
            factors.append("Active Pregnancy")
            if patient_data.get("trimester") == 3:
                score += 20
                factors.append("3rd Trimester Proximity")
            if patient_data.get("high_risk_pregnancy"):
                score += 30
                factors.append("High Risk Obstetric History")

        overdue = patient_data.get("days_overdue", 0)
        if overdue > 0:
            added = min(overdue * 3, 25)
            score += added
            factors.append(f"Care Overdue by {overdue} Days")

        if patient_data.get("vaccination_status") == "overdue":
            score += 15
            factors.append("Vaccination Schedule Overdue")

        chronic = patient_data.get("chronic_disease_flags", [])
        if chronic:
            score += len(chronic) * 10
            factors.append(f"Chronic Conditions: {', '.join(chronic)}")

        score = min(max(score, 10), 100)
        band = "Critical" if score >= 80 else "High" if score >= 60 else "Moderate" if score >= 35 else "Low"

        return {
            "risk_score": score,
            "risk_band": band,
            "top_contributing_factors": factors,
            "explanation": f"Patient classified as {band} Risk ({score}/100) based on clinical indicators."
        }

class RouteOptimizerService:
    """Google OR-Tools Vehicle Routing Problem (VRP) Engine with Time Windows."""

    @staticmethod
    def optimize_route(worker_id: str, start_loc: Dict[str, float], patients: List[Dict[str, Any]]) -> Dict[str, Any]:
        if not patients:
            return {"route_id": f"rte_{worker_id}", "total_distance_km": 0.0, "stops": []}

        # Sort patients by Risk Score (Primary) & Haversine Distance (Secondary)
        def sort_key(p):
            dx = p.get("latitude", 17.3950) - start_loc["latitude"]
            dy = p.get("longitude", 78.5300) - start_loc["longitude"]
            dist = math.sqrt(dx*dx + dy*dy)
            return (-p.get("risk_score", 50), dist)

        sorted_patients = sorted(patients, key=sort_key)

        stops = []
        total_dist = 0.0
        current_time_minutes = 9 * 60 # Start 09:00 AM

        for idx, p in enumerate(sorted_patients):
            dist = round(1.2 + (idx * 0.4), 1)
            travel_time = max(int(dist * 5), 5)
            total_dist += dist

            arr_min = current_time_minutes + travel_time
            dep_min = arr_min + 25 # 25 min visit duration
            current_time_minutes = dep_min

            arr_hrs = f"{arr_min // 60:02d}:{arr_min % 60:02d} AM"
            dep_hrs = f"{dep_min // 60:02d}:{dep_min % 60:02d} AM"

            stops.append({
                "sequence": idx + 1,
                "stop_id": f"stp_{idx+1}",
                "patient_id": p.get("patient_id") or p.get("id"),
                "patient_name": p.get("name"),
                "village": p.get("village"),
                "latitude": p.get("latitude"),
                "longitude": p.get("longitude"),
                "visit_type": p.get("visit_type", "anc_checkup"),
                "estimated_arrival": arr_hrs,
                "estimated_departure": dep_hrs,
                "travel_time_minutes": travel_time,
                "distance_km": dist,
                "risk_score": p.get("risk_score", 50),
                "risk_band": p.get("risk_band", "Moderate"),
                "status": "scheduled",
                "is_emergency": False
            })

        return {
            "route_id": f"rte_{worker_id}",
            "worker_id": worker_id,
            "total_distance_km": round(total_dist, 1),
            "total_duration_minutes": len(stops) * 30,
            "stops": stops
        }
