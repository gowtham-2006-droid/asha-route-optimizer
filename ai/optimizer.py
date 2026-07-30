import math
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

def haversine_distance_km(lat1, lon1, lat2, lon2):
    """
    Computes Haversine spherical distance between two GPS coordinates
    multiplied by a 1.25x road curvature factor for realistic urban/rural travel.
    """
    R = 6371.0 # Earth radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance_km = R * c * 1.25 # 1.25x road curvature factor
    return distance_km

def time_string_to_minutes(time_str):
    """Converts 'HH:MM' 24h string to minutes from 00:00."""
    h, m = map(int, time_str.split(':'))
    return h * 60 + m

def minutes_to_time_string(minutes):
    """Converts minutes from 00:00 to 'HH:MM AM/PM' string."""
    h = (minutes // 60) % 24
    m = minutes % 60
    period = "AM" if h < 12 else "PM"
    h_12 = h if h <= 12 else h - 12
    if h_12 == 0: h_12 = 12
    return f"{h_12:02d}:{m:02d} {period}"

class VRPTWSolver:
    """
    Google OR-Tools VRPTW Solver for ASHA Worker Route Optimization.
    """
    def __init__(self, start_loc, shift_start="09:00", shift_end="17:00"):
        self.start_loc = start_loc # {"latitude": float, "longitude": float}
        self.shift_start = time_string_to_minutes(shift_start)
        self.shift_end = time_string_to_minutes(shift_end)

    def build_distance_and_time_matrix(self, locations, avg_speed_kmh=20.0):
        """
        Builds travel distance (meters) and travel time (minutes) matrices.
        Average travel speed: 20 km/h (walking + two-wheeler).
        """
        num_locs = len(locations)
        dist_matrix = [[0] * num_locs for _ in range(num_locs)]
        time_matrix = [[0] * num_locs for _ in range(num_locs)]

        for i in range(num_locs):
            for j in range(num_locs):
                if i != j:
                    dist_km = haversine_distance_km(
                        locations[i]["latitude"], locations[i]["longitude"],
                        locations[j]["latitude"], locations[j]["longitude"]
                    )
                    dist_matrix[i][j] = int(dist_km * 1000) # meters
                    travel_time_min = int((dist_km / avg_speed_kmh) * 60)
                    time_matrix[i][j] = travel_time_min

        return dist_matrix, time_matrix

    def solve(self, patients):
        """
        Solves VRPTW route sequence prioritizing Critical/High risk scores.
        """
        if not patients:
            return {"stops": [], "total_distance_km": 0, "total_duration_minutes": 0}

        # Build list of locations (Depot at index 0)
        locations = [self.start_loc] + [{"latitude": p["latitude"], "longitude": p["longitude"]} for p in patients]
        dist_matrix, time_matrix = self.build_distance_and_time_matrix(locations)

        num_nodes = len(locations)
        manager = pywrapcp.RoutingIndexManager(num_nodes, 1, 0) # 1 vehicle, depot index 0
        routing = pywrapcp.RoutingModel(manager)

        # Distance callback
        def distance_callback(from_idx, to_idx):
            from_node = manager.IndexToNode(from_idx)
            to_node = manager.IndexToNode(to_idx)
            return dist_matrix[from_node][to_node]

        transit_dist_cb = routing.RegisterTransitCallback(distance_callback)
        routing.SetArcCostEvaluatorOfAllVehicles(transit_dist_cb)

        # Time dimension callback
        def time_callback(from_idx, to_idx):
            from_node = manager.IndexToNode(from_idx)
            to_node = manager.IndexToNode(to_idx)
            service_time = 0 if from_node == 0 else patients[from_node - 1].get("visit_duration_minutes", 20)
            return time_matrix[from_node][to_node] + service_time

        transit_time_cb = routing.RegisterTransitCallback(time_callback)
        routing.AddDimension(
            transit_time_cb,
            60, # allow waiting time up to 60 mins
            self.shift_end - self.shift_start,
            False,
            "Time"
        )
        time_dimension = routing.GetDimensionOrDie("Time")

        # Set time windows per patient
        for i, p in enumerate(patients):
            node_idx = manager.NodeToIndex(i + 1)
            pref_start = p.get("preferred_time_window", {}).get("start", "09:00")
            pref_end = p.get("preferred_time_window", {}).get("end", "17:00")
            t_start = max(time_string_to_minutes(pref_start) - self.shift_start, 0)
            t_end = min(time_string_to_minutes(pref_end) - self.shift_start, self.shift_end - self.shift_start)
            time_dimension.CumulVar(node_idx).SetRange(t_start, t_end)

            # Disjunction penalty weighted by risk score (high risk = high penalty for dropping)
            penalty = int(p.get("risk_score", 50) * 1000)
            routing.AddDisjunction([node_idx], penalty)

        # Solver Search Parameters
        search_params = pywrapcp.DefaultRoutingSearchParameters()
        search_params.first_solution_strategy = routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
        search_params.time_limit.seconds = 3 # 3 second solver limit

        solution = routing.SolveWithParameters(search_params)

        if not solution:
            # Solver fallback: sort by risk score descending
            sorted_patients = sorted(patients, key=lambda x: x.get("risk_score", 0), reverse=True)
            return self._build_fallback_stops(sorted_patients)

        # Extract solved route
        index = routing.Start(0)
        route_stops = []
        curr_time = self.shift_start
        total_dist_meters = 0

        prev_node = 0
        seq = 1

        while not routing.IsEnd(index):
            node = manager.IndexToNode(index)
            if node != 0:
                patient = patients[node - 1]
                travel_m = dist_matrix[prev_node][node]
                travel_min = time_matrix[prev_node][node]
                total_dist_meters += travel_m
                curr_time += travel_min

                arrival_str = minutes_to_time_string(curr_time)
                duration = patient.get("visit_duration_minutes", 20)
                curr_time += duration
                dept_str = minutes_to_time_string(curr_time)

                route_stops.append({
                    "sequence": seq,
                    "patient_id": patient["patient_id"],
                    "patient_name": patient.get("name", "Patient"),
                    "village": patient.get("village", ""),
                    "latitude": patient["latitude"],
                    "longitude": patient["longitude"],
                    "visit_type": patient.get("visit_type", "anc_checkup"),
                    "estimated_arrival": arrival_str,
                    "estimated_departure": dept_str,
                    "travel_time_minutes": travel_min,
                    "distance_km": round(travel_m / 1000.0, 1),
                    "risk_score": patient.get("risk_score", 50),
                    "risk_band": patient.get("risk_band", "Moderate"),
                    "status": "scheduled",
                    "is_emergency": patient.get("is_emergency", False)
                })
                seq += 1
            prev_node = node
            index = solution.Value(routing.NextVar(index))

        return {
            "route_id": f"rte_opt_{len(route_stops)}",
            "total_distance_km": round(total_dist_meters / 1000.0, 1),
            "total_duration_minutes": curr_time - self.shift_start,
            "stops": route_stops
        }

    def _build_fallback_stops(self, patients):
        stops = []
        curr_time = self.shift_start
        for i, p in enumerate(patients):
            arrival_str = minutes_to_time_string(curr_time)
            curr_time += p.get("visit_duration_minutes", 20) + 15
            dept_str = minutes_to_time_string(curr_time)
            stops.append({
                "sequence": i + 1,
                "patient_id": p["patient_id"],
                "patient_name": p.get("name", "Patient"),
                "village": p.get("village", ""),
                "latitude": p["latitude"],
                "longitude": p["longitude"],
                "visit_type": p.get("visit_type", "anc_checkup"),
                "estimated_arrival": arrival_str,
                "estimated_departure": dept_str,
                "travel_time_minutes": 15,
                "distance_km": 2.5,
                "risk_score": p.get("risk_score", 50),
                "risk_band": p.get("risk_band", "Moderate"),
                "status": "scheduled",
                "is_emergency": p.get("is_emergency", False)
            })
        return {"stops": stops, "total_distance_km": round(len(patients) * 2.5, 1), "total_duration_minutes": 180}
