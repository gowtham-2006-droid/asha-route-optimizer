# ASHA Route Optimizer AI — API Specification

**Base URL:** `/api/v1`  
**Protocol:** HTTPS  
**Format:** JSON (`Content-Type: application/json`)  
**Auth Header:** `Authorization: Bearer <JWT_TOKEN>`  
**Document Version:** 1.0  
**Status:** Approved & Frozen  

---

## 1. Global Response Standards

### 1.1 Success Response Envelope
All API endpoints return JSON wrapped in the following envelope:
```json
{
  "success": true,
  "data": {},
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-987654321"
  }
}
```

### 1.2 Error Response Envelope
All error responses follow this exact schema:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Field 'phone' must be a valid 10-digit Indian phone number",
    "details": [
      {
        "field": "phone",
        "issue": "regex match failed ^[6-9]\\d{9}$"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-987654321"
  }
}
```

---

## 2. Authentication API (`/auth`)

### 2.1 Request OTP
Send a 6-digit OTP to the worker or supervisor's registered mobile number.

- **HTTP Method:** `POST`
- **Path:** `/api/v1/auth/request-otp`
- **Auth Required:** No

#### Request Body
```json
{
  "phone": "+919876543210"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "message": "OTP sent successfully",
    "expires_in_seconds": 300
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-101"
  }
}
```

---

### 2.2 Verify OTP
Verify the OTP code and receive a signed JWT access token.

- **HTTP Method:** `POST`
- **Path:** `/api/v1/auth/verify-otp`
- **Auth Required:** No

#### Request Body
```json
{
  "phone": "+919876543210",
  "otp": "123456"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 43200,
    "user": {
      "user_id": "usr_w101",
      "name": "Lakshmi Devi",
      "phone": "+919876543210",
      "role": "asha_worker",
      "phc_id": "phc_hyderabad_01"
    }
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-102"
  }
}
```

#### Error Response (`401 Unauthorized`)
```json
{
  "success": false,
  "error": {
    "code": "INVALID_OTP",
    "message": "The OTP provided is incorrect or has expired"
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-103"
  }
}
```

---

## 3. Patient Management API (`/patients`)

### 3.1 List Patients
Get patients assigned to a worker or PHC, filterable by risk band or village.

- **HTTP Method:** `GET`
- **Path:** `/api/v1/patients`
- **Auth Required:** Yes
- **Query Parameters:**
  - `worker_id` (optional, string): Filter by assigned worker
  - `risk_band` (optional, string): `Critical` | `High` | `Moderate` | `Low`
  - `village` (optional, string): Filter by village name
  - `page` (optional, int, default: 1)
  - `limit` (optional, int, default: 20)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "patients": [
      {
        "patient_id": "pat_001",
        "name": "Sunitha Rao",
        "age": 26,
        "gender": "female",
        "village": "Ramanthapur",
        "latitude": 17.3984,
        "longitude": 78.5382,
        "is_pregnant": true,
        "trimester": 3,
        "high_risk_pregnancy": true,
        "newborn_age_days": 0,
        "vaccination_status": "due",
        "days_overdue": 5,
        "last_visit_days_ago": 14,
        "risk_score": 85,
        "risk_band": "Critical",
        "assigned_worker_id": "usr_w101"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total_count": 1,
      "total_pages": 1
    }
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-201"
  }
}
```

---

### 3.2 Get Patient Detail
Retrieve clinical background and visit history for a specific patient.

- **HTTP Method:** `GET`
- **Path:** `/api/v1/patients/{patient_id}`
- **Auth Required:** Yes

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "patient_id": "pat_001",
    "name": "Sunitha Rao",
    "age": 26,
    "gender": "female",
    "village": "Ramanthapur",
    "latitude": 17.3984,
    "longitude": 78.5382,
    "is_pregnant": true,
    "trimester": 3,
    "high_risk_pregnancy": true,
    "newborn_age_days": 0,
    "vaccination_status": "due",
    "days_overdue": 5,
    "chronic_disease_flags": ["anemia"],
    "previous_missed_visits": 1,
    "last_visit_days_ago": 14,
    "risk_score": 85,
    "risk_band": "Critical",
    "visit_history": [
      {
        "visit_id": "vis_901",
        "visit_date": "2026-07-16",
        "visit_type": "anc_checkup",
        "status": "visited",
        "notes": "BP normal, prescribed iron tablets"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-202"
  }
}
```

---

### 3.3 Create New Patient
Register a new patient into the PHC catchment database.

- **HTTP Method:** `POST`
- **Path:** `/api/v1/patients`
- **Auth Required:** Yes

#### Request Body
```json
{
  "name": "Priyanka Reddy",
  "age": 24,
  "gender": "female",
  "village": "Uppal",
  "latitude": 17.4012,
  "longitude": 78.5601,
  "is_pregnant": true,
  "trimester": 2,
  "high_risk_pregnancy": false,
  "newborn_age_days": 0,
  "vaccination_status": "up_to_date",
  "days_overdue": 0,
  "chronic_disease_flags": [],
  "previous_missed_visits": 0,
  "assigned_worker_id": "usr_w101"
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "data": {
    "patient_id": "pat_002",
    "name": "Priyanka Reddy",
    "risk_score": 42,
    "risk_band": "Moderate",
    "created_at": "2026-07-30T23:21:17Z"
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-203"
  }
}
```

---

## 4. ML Risk Prediction API (`/ml`)

### 4.1 Predict Risk (Single Patient)
Exposes the XGBoost/scikit-learn machine learning risk prediction model.

- **HTTP Method:** `POST`
- **Path:** `/api/v1/ml/predict-risk`
- **Auth Required:** Yes (Internal/Backend Gateway service)

#### Request Body
```json
{
  "patient_id": "pat_001",
  "age": 26,
  "gender": "female",
  "is_pregnant": true,
  "trimester": 3,
  "high_risk_pregnancy": true,
  "newborn_age_days": 0,
  "vaccination_status": "due",
  "days_overdue": 5,
  "chronic_disease_flags": ["anemia"],
  "previous_missed_visits": 1,
  "visit_type": "anc_checkup",
  "last_visit_days_ago": 14
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "patient_id": "pat_001",
    "risk_score": 85,
    "risk_band": "Critical",
    "top_contributing_factors": [
      { "factor": "high_risk_pregnancy", "impact": "+30 points" },
      { "factor": "third_trimester", "impact": "+25 points" },
      { "factor": "days_overdue", "impact": "+5 points" }
    ]
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-301"
  }
}
```

---

### 4.2 Batch Predict Risk
Batch score multiple patients for morning route calculation.

- **HTTP Method:** `POST`
- **Path:** `/api/v1/ml/predict-risk/batch`
- **Auth Required:** Yes

#### Request Body
```json
{
  "patients": [
    {
      "patient_id": "pat_001",
      "age": 26,
      "is_pregnant": true,
      "trimester": 3,
      "high_risk_pregnancy": true,
      "newborn_age_days": 0,
      "vaccination_status": "due",
      "days_overdue": 5,
      "chronic_disease_flags": ["anemia"],
      "previous_missed_visits": 1,
      "visit_type": "anc_checkup",
      "last_visit_days_ago": 14
    },
    {
      "patient_id": "pat_002",
      "age": 24,
      "is_pregnant": true,
      "trimester": 2,
      "high_risk_pregnancy": false,
      "newborn_age_days": 0,
      "vaccination_status": "up_to_date",
      "days_overdue": 0,
      "chronic_disease_flags": [],
      "previous_missed_visits": 0,
      "visit_type": "general",
      "last_visit_days_ago": 30
    }
  ]
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "predictions": [
      { "patient_id": "pat_001", "risk_score": 85, "risk_band": "Critical" },
      { "patient_id": "pat_002", "risk_score": 42, "risk_band": "Moderate" }
    ]
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-302"
  }
}
```

---

## 5. Route Optimization API (`/routes`)

### 5.1 Optimize Daily Route
Run Google OR-Tools VRPTW solver to calculate an optimal visit sequence.

- **HTTP Method:** `POST`
- **Path:** `/api/v1/routes/optimize`
- **Auth Required:** Yes

#### Request Body
```json
{
  "worker_id": "usr_w101",
  "start_location": {
    "latitude": 17.3950,
    "longitude": 78.5300,
    "address": "PHC Ramanthapur Hub"
  },
  "shift_start_time": "09:00",
  "shift_end_time": "17:00",
  "patients": [
    {
      "patient_id": "pat_001",
      "latitude": 17.3984,
      "longitude": 78.5382,
      "risk_score": 85,
      "visit_duration_minutes": 25,
      "preferred_time_window": {
        "start": "09:30",
        "end": "11:30"
      }
    },
    {
      "patient_id": "pat_002",
      "latitude": 17.4012,
      "longitude": 78.5601,
      "risk_score": 42,
      "visit_duration_minutes": 15,
      "preferred_time_window": {
        "start": "13:00",
        "end": "16:00"
      }
    }
  ]
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "route_id": "rte_20260731_w101",
    "worker_id": "usr_w101",
    "total_distance_km": 8.4,
    "total_estimated_duration_minutes": 210,
    "stops": [
      {
        "sequence": 1,
        "patient_id": "pat_001",
        "patient_name": "Sunitha Rao",
        "estimated_arrival": "09:40",
        "estimated_departure": "10:05",
        "travel_time_from_prev_minutes": 10,
        "distance_from_prev_km": 2.1,
        "risk_score": 85,
        "risk_band": "Critical"
      },
      {
        "sequence": 2,
        "patient_id": "pat_002",
        "patient_name": "Priyanka Reddy",
        "estimated_arrival": "13:15",
        "estimated_departure": "13:30",
        "travel_time_from_prev_minutes": 15,
        "distance_from_prev_km": 3.8,
        "risk_score": 42,
        "risk_band": "Moderate"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-401"
  }
}
```

---

### 5.2 Emergency Dynamic Re-Routing
Instantly insert an emergency visit and re-calculate the route, dropping low-priority visits if time constraints are breached.

- **HTTP Method:** `POST`
- **Path:** `/api/v1/routes/emergency-reroute`
- **Auth Required:** Yes

#### Request Body
```json
{
  "route_id": "rte_20260731_w101",
  "current_worker_location": {
    "latitude": 17.3970,
    "longitude": 78.5350
  },
  "emergency_patient": {
    "patient_id": "pat_emergency_99",
    "name": "Kavitha Sharma",
    "latitude": 17.3990,
    "longitude": 78.5410,
    "risk_score": 98,
    "risk_band": "Critical",
    "description": "Severe postpartum hemorrhaging",
    "visit_duration_minutes": 40
  }
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "reoptimized_route_id": "rte_20260731_w101_v2",
    "emergency_inserted_at_sequence": 1,
    "dropped_low_priority_patients": [
      {
        "patient_id": "pat_002",
        "patient_name": "Priyanka Reddy",
        "risk_score": 42,
        "reason": "Displaced to preserve schedule for Critical emergency"
      }
    ],
    "updated_stops": [
      {
        "sequence": 1,
        "patient_id": "pat_emergency_99",
        "patient_name": "Kavitha Sharma (EMERGENCY)",
        "estimated_arrival": "09:55",
        "estimated_departure": "10:35",
        "risk_score": 98,
        "risk_band": "Critical",
        "is_emergency": true
      },
      {
        "sequence": 2,
        "patient_id": "pat_001",
        "patient_name": "Sunitha Rao",
        "estimated_arrival": "10:45",
        "estimated_departure": "11:10",
        "risk_score": 85,
        "risk_band": "Critical",
        "is_emergency": false
      }
    ]
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-402"
  }
}
```

---

## 6. Visit Tracking API (`/visits`)

### 6.1 Update Visit Status
Mark a visit as completed, missed, or in-progress.

- **HTTP Method:** `PATCH`
- **Path:** `/api/v1/visits/{visit_id}/status`
- **Auth Required:** Yes

#### Request Body
```json
{
  "status": "missed",
  "missed_reason": "not_home",
  "notes": "Door locked, neighbor informed patient went to district hospital."
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "visit_id": "vis_902",
    "status": "missed",
    "missed_reason": "not_home",
    "updated_at": "2026-07-30T23:21:17Z"
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-501"
  }
}
```

---

## 7. AI Explanation & Report API (`/ai`)

### 7.1 Generate Priority Explanation
Request plain-English justification for why a patient was assigned a specific risk score.

- **HTTP Method:** `POST`
- **Path:** `/api/v1/ai/explain-priority`
- **Auth Required:** Yes

#### Request Body
```json
{
  "patient_id": "pat_001"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "patient_id": "pat_001",
    "explanation": "Sunitha Rao is categorized as **Critical (Risk Score: 85)** primarily due to a high-risk pregnancy in her third trimester combined with an overdue ANC visit (5 days past due) and a history of anemia. Immediate home visit is recommended to check blood pressure and fetal movement."
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-601"
  }
}
```

---

### 7.2 Generate End-of-Day Supervisor Report
Generate an AI summary report for a PHC Supervisor summarizing field performance and missed visits.

- **HTTP Method:** `POST`
- **Path:** `/api/v1/ai/generate-report`
- **Auth Required:** Yes

#### Request Body
```json
{
  "worker_id": "usr_w101",
  "date": "2026-07-30"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "report_id": "rep_20260730_w101",
    "summary_title": "Daily Field Visit Report — Worker Lakshmi Devi",
    "report_text": "On 30th July 2026, ASHA Worker Lakshmi Devi attempted 6 planned visits in Ramanthapur. **5 visits were completed successfully**, including 2 Critical High-Risk ANC checkups. 1 moderate-risk visit was deferred due to an emergency insertion for severe postpartum hemorrhaging (Kavitha Sharma). Overall coverage efficiency: 83%. Recommended follow-up: Re-schedule Priyanka Reddy for 31st July morning.",
    "metrics": {
      "completed_visits": 5,
      "missed_visits": 1,
      "emergencies_handled": 1,
      "coverage_percentage": 83.3
    }
  },
  "meta": {
    "timestamp": "2026-07-30T23:21:17Z",
    "request_id": "req-602"
  }
}
```
