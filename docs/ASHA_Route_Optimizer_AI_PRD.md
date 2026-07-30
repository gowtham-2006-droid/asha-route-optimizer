# ASHA Route Optimizer AI
## Product Requirements Document (PRD)

**Theme:** Smart Automation
**Target Event:** Idea2Impact 2026 — Hyderabad Finale
**Build Duration:** 2-Day Hackathon MVP
**Document Version:** 1.0
**Status:** Implementation-Ready

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goal & Vision](#3-goal--vision)
4. [Core AI Features](#4-core-ai-features)
   - 4.1 AI Risk Prediction Engine
   - 4.2 Route Optimization Engine (OR-Tools VRPTW)
   - 4.3 AI Explanation & Report Generator
5. [User Roles & Permissions](#5-user-roles--permissions)
6. [Application Modules & Screens](#6-application-modules--screens)
7. [User Flows](#7-user-flows)
8. [Database Design](#8-database-design)
9. [API Design](#9-api-design)
10. [Frontend Design](#10-frontend-design)
11. [Backend Architecture](#11-backend-architecture)
12. [AI System Architecture](#12-ai-system-architecture)
13. [Tech Stack](#13-tech-stack)
14. [MVP Roadmap (2-Day Plan)](#14-mvp-roadmap-2-day-plan)
15. [Future Features](#15-future-features)
16. [Judging Preparation](#16-judging-preparation)
17. [Risks & Mitigations](#17-risks--mitigations)
18. [Future Scope](#18-future-scope)

---

## 1. EXECUTIVE SUMMARY

ASHA Route Optimizer AI is a Smart Automation platform that helps India's 1+ million ASHA (Accredited Social Health Activist) workers plan their daily field visits intelligently. It combines a **machine learning risk-prediction model**, a **constraint-based route optimizer (Google OR-Tools VRPTW)**, and a **generative-AI explanation layer** to replace paper-register-based planning with an AI-driven, explainable, emergency-aware scheduling system.

The MVP is scoped for a 2-day hackathon build: a stripped-down but fully working system covering one PHC (Primary Health Centre) catchment area, 3–5 ASHA workers, ~30–50 synthetic patients, one optimized daily route per worker, emergency re-routing, and AI-generated end-of-day reports.

---

## 2. PROBLEM STATEMENT

ASHA workers currently plan visits manually using memory or paper registers. This causes:

| Problem | Real-World Impact |
|---|---|
| Critical patients missed | High-risk pregnancies / newborns go unchecked past due dates |
| Poor prioritization | Low-risk and high-risk visits treated equally |
| Long travel distances | Wasted hours walking/traveling inefficient paths |
| No optimized scheduling | No time-window awareness (feeding times, clinic hours) |
| No emergency handling | Emergencies disrupt the entire day with no fallback plan |
| Poor reporting | PHC Supervisors get no structured visibility into ground reality |

**Design constraint:** the solution must be powerful (AI-driven) yet simple enough for a semi-literate, low-connectivity field worker to use on a basic Android phone.

---

## 3. GOAL & VISION

Build an AI-powered route-planning platform that:

1. **Predicts** patient urgency using a trained ML risk model.
2. **Optimizes** daily visit routes across multiple workers using constraint programming.
3. **Explains** every AI decision in plain language a healthcare supervisor can trust.
4. **Handles emergencies** by re-optimizing routes live, dropping only low-priority visits.
5. Feels realistic and adoptable by India's public health system (PHC / District Health Society / NHM workflows) — not a toy demo.

**North Star metric for the demo:** "An ASHA worker opens the app, sees a risk-ranked, time-window-optimized route, taps to visit, an emergency drops in, the app re-optimizes in under 3 seconds, and a supervisor gets an auto-generated plain-English report at day end."

---

## 4. CORE AI FEATURES

### 4.1 AI Risk Prediction Engine (Machine Learning)

**Purpose:** Convert raw patient/visit attributes into a single **Risk Score (0–100)** used as the priority signal for route optimization.

#### 4.1.1 Input Features (Dataset Columns)

| Column | Type | Description |
|---|---|---|
| `patient_id` | string | Unique patient identifier |
| `age` | int | Patient age in years |
| `gender` | enum | male / female / other |
| `is_pregnant` | bool | Pregnancy status |
| `trimester` | int (0–3) | 0 = not applicable |
| `high_risk_pregnancy` | bool | Flagged high-risk pregnancy (e.g., anemia, hypertension) |
| `newborn_age_days` | int | Age of newborn in days (0 if not applicable) |
| `vaccination_status` | enum | up_to_date / due / overdue / not_applicable |
| `days_overdue` | int | Days since the visit/vaccination was due |
| `chronic_disease_flags` | list/bitmask | e.g., diabetes, TB, hypertension |
| `previous_missed_visits` | int | Count of missed visits in last 90 days |
| `visit_type` | enum | anc_checkup / pnc_checkup / immunization / general / follow_up |
| `distance_from_last_visit_km` | float | Optional, used later for routing not risk |
| `last_visit_days_ago` | int | Days since last successful visit |
| **`risk_score` (target)** | int 0–100 | Ground-truth label (synthetic, rule-derived) |

#### 4.1.2 Synthetic Dataset Generation Strategy

Since no real patient data is available for a hackathon, generate a **rule-weighted synthetic dataset** (recommended: 3,000–5,000 rows) using a Python script (`generate_dataset.py`):

1. Randomly sample realistic distributions for each column (e.g., age via normal distribution skewed toward reproductive/infant ages, pregnancy flags at realistic rural prevalence rates).
2. Compute a **synthetic ground-truth risk score** via a weighted rule formula (this becomes the label the model learns to approximate):

```
risk_score = clip(
    30 * high_risk_pregnancy
  + 25 * (trimester == 3)
  + 20 * (newborn_age_days <= 7)
  + 15 * (vaccination_status == 'overdue')
  + min(days_overdue, 30) * 1.0
  + 10 * min(previous_missed_visits, 3)
  + 15 * has_chronic_disease
  + 10 * (visit_type == 'anc_checkup' and trimester >= 2)
  + random_noise(-5, 5),
  0, 100
)
```

3. Inject **~5% noise / edge cases** (e.g., elderly chronic patients, conflicting flags) so the model doesn't simply memorize the rule and generalizes reasonably.
4. Split: 70% train / 15% validation / 15% test.
5. Save as `data/patients_synthetic.csv`.

> Note: the "rule formula" is only used to *label* synthetic training data. The ML model is trained to predict this label from features — this simulates what a real model trained on historical government ANC/PNC/immunization records would eventually learn from actual outcomes (e.g., complications, missed critical windows).

#### 4.1.3 Model & Training Pipeline

- **Algorithm:** XGBoost Regressor (preferred) or RandomForestRegressor (scikit-learn) as a fallback — both handle mixed categorical/numeric features well and train in seconds on this dataset size.
- **Preprocessing:** One-hot encode categorical fields (`vaccination_status`, `visit_type`, `gender`); scale numeric fields is optional for tree models.
- **Pipeline (`train_model.py`):**

```
1. Load CSV → pandas DataFrame
2. Feature engineering (encode categoricals, fill NaNs)
3. Train/val/test split
4. Train XGBRegressor(n_estimators=200, max_depth=6, learning_rate=0.1)
5. Evaluate on validation set
6. Save model artifact → model/risk_model.pkl (joblib)
7. Save feature encoder → model/encoder.pkl
```

- **Evaluation Metrics:**
  - MAE (Mean Absolute Error) — target < 6 points on 0–100 scale
  - RMSE
  - R² score
  - Feature importance chart (for the "explainability" judging point)

#### 4.1.4 Model Deployment

- Serve via **FastAPI** microservice: `ml-service/`
- Endpoint:

```
POST /api/v1/predict-risk
Content-Type: application/json

Request:
{
  "age": 24,
  "is_pregnant": true,
  "trimester": 3,
  "high_risk_pregnancy": true,
  "newborn_age_days": 0,
  "vaccination_status": "overdue",
  "days_overdue": 12,
  "chronic_disease_flags": ["anemia"],
  "previous_missed_visits": 1,
  "visit_type": "anc_checkup"
}

Response: 200 OK
{
  "risk_score": 87,
  "risk_band": "critical",
  "top_factors": [
    {"factor": "high_risk_pregnancy", "contribution": 0.34},
    {"factor": "trimester_3", "contribution": 0.22},
    {"factor": "vaccination_overdue", "contribution": 0.18}
  ]
}
```

- Batch endpoint `POST /api/v1/predict-risk/batch` accepts an array of patients (used at day-start to score everyone assigned to a worker).
- Risk bands: `0–39 low`, `40–69 moderate`, `70–89 high`, `90–100 critical`.

#### 4.1.5 Future Improvements

- Replace synthetic labels with real anonymized ANC/PNC/HMIS (Health Management Information System) data from NHM/state government once available via MOU.
- Add model retraining pipeline triggered monthly with new visit-outcome data (active learning loop).
- Add SHAP values for per-prediction explainability instead of static feature importance.

---

### 4.2 Route Optimization Engine (Google OR-Tools VRPTW)

**Purpose:** Given a set of risk-scored patients and a set of ASHA workers, generate the optimal set of daily routes.

#### 4.2.1 Problem Formulation

This is modeled as a **Vehicle Routing Problem with Time Windows (VRPTW)**, where:
- "Vehicles" = ASHA workers (traveling on foot / two-wheeler)
- "Depot" = PHC or worker's home starting point
- "Customers" = patients requiring visits
- "Demand" = fixed visit weight (or estimated visit duration in minutes)
- "Priority" = derived from the ML risk score (converted into a soft constraint / objective weight, not a hard constraint)

#### 4.2.2 Inputs

| Input | Description |
|---|---|
| Worker list | id, start location (lat/lng), work-hour window (e.g., 9 AM–2 PM), max visits/day |
| Patient list | id, location (lat/lng), risk_score, visit_type, estimated visit duration, time window (if any, e.g., "before 11 AM" for infant feeding checks) |
| Distance/time matrix | Computed via Haversine formula for MVP (or Google Distance Matrix API if internet available) |
| Emergency flag | Boolean per patient, injected at runtime |

#### 4.2.3 Constraints

1. **Work-hour limit:** each worker's route must fit within their shift window.
2. **Time windows:** patients with specified windows must be visited within that window.
3. **Capacity/visit-count limit:** max N visits per worker per day (default 8–10).
4. **Priority-weighted objective:** minimize `(total travel time) − (λ × Σ risk_score of visited patients)`, i.e., maximize high-risk coverage while minimizing distance.
5. **Droppable low-priority nodes:** OR-Tools' `AddDisjunction` is used so low-risk visits (risk_score < 40) can be dropped (with a penalty cost) if the day cannot fit everyone — critical/high-risk nodes get very high drop penalties so they are dropped last.
6. **Emergency insertion:** when an emergency patient is added mid-day, the solver re-runs with the worker's *remaining* unvisited nodes + the emergency node, using the worker's *current location* as the new depot.

#### 4.2.4 Outputs

```json
{
  "worker_id": "W002",
  "route": [
    {"patient_id": "P014", "eta": "09:15", "risk_score": 91, "visit_type": "anc_checkup"},
    {"patient_id": "P022", "eta": "09:45", "risk_score": 78, "visit_type": "immunization"},
    {"patient_id": "P009", "eta": "10:20", "risk_score": 55, "visit_type": "follow_up"}
  ],
  "dropped_visits": [
    {"patient_id": "P031", "risk_score": 22, "reason": "low_priority_capacity_limit"}
  ],
  "total_distance_km": 6.4,
  "total_duration_min": 187
}
```

#### 4.2.5 Optimization Flow

```
1. Fetch today's assigned patients per worker (from DB)
2. Call ML service → batch risk scores for all patients
3. Build distance/time matrix (Haversine for MVP)
4. Construct OR-Tools RoutingModel:
     - Nodes = depot + patients
     - ArcCost = travel time
     - Disjunctions = optional visits w/ priority-weighted penalty
     - Dimension = "Time" with time-window constraints
     - Dimension = "Capacity" with max-visits constraint
5. Solve with GuidedLocalSearch metaheuristic (time limit: 5s for hackathon demo)
6. Return ordered route(s) + dropped visits + ETA per stop
7. Persist route to DB (routes, route_stops tables)
```

#### 4.2.6 OR-Tools Architecture Diagram

```
        ┌────────────────────────┐
        │   Route Optimizer API  │
        │      (FastAPI)         │
        └───────────┬────────────┘
                     │
      ┌──────────────┼───────────────┐
      ▼              ▼               ▼
 Distance Matrix   Risk Scores    Constraints
 Builder           (ML Service)   (time window,
 (Haversine/        via HTTP      capacity,
  Google Maps)                    work hours)
      │              │               │
      └──────────────┼───────────────┘
                     ▼
          ┌─────────────────────┐
          │  OR-Tools Routing    │
          │  Model + Solver      │
          │  (GuidedLocalSearch) │
          └──────────┬───────────┘
                     ▼
          Optimized Route(s) + Dropped Visits
                     ▼
              Persist to PostgreSQL
                     ▼
              Push to Worker App (map view)
```

#### 4.2.7 APIs

```
POST /api/v1/optimize-routes
  Body: { "date": "2026-08-01", "worker_ids": ["W001","W002"] }
  Response: array of route objects (see 4.2.4)

POST /api/v1/emergency-reroute
  Body: { "worker_id": "W002", "emergency_patient": {...}, "current_location": {...} }
  Response: updated route object for that worker only
```

---

### 4.3 AI Explanation & Report Generator (LLM Layer)

**Purpose:** Translate structured AI/optimizer output into natural-language explanations and reports using Gemini API (or OpenAI API as fallback).

#### 4.3.1 Capabilities

| Capability | Trigger | Output |
|---|---|---|
| Priority explanation | Worker taps "Why is this patient first?" | 1–2 sentence plain-language reason citing top risk factors |
| End-of-day summary | Worker taps "Complete Day" | Paragraph summary: visits completed, missed, distance traveled, notable risk cases |
| Worker performance report | Supervisor views worker profile | Weekly summary: completion rate, avg response time to emergencies, risk-coverage rate |
| Missed-visit explanation | Any visit marked "missed" | Short explanation combining reason code + risk implication |
| Emergency summary | After emergency resolved | What happened, how re-routing changed the day, impact on other patients |

#### 4.3.2 Example Prompt Template (Priority Explanation)

```
System: You are a healthcare assistant explaining AI-driven visit
priority to a rural health worker in simple, respectful language.
Keep responses under 40 words. Avoid medical jargon where possible.

User: Patient risk_score=87 (band: critical).
Top factors: high_risk_pregnancy (0.34), trimester_3 (0.22),
vaccination_overdue (0.18). Visit type: anc_checkup.

Expected style of output: "This patient is a top priority today —
she's in her third trimester of a high-risk pregnancy and her
vaccination is overdue. An early visit is important."
```

#### 4.3.3 API

```
POST /api/v1/ai/explain-priority
  Body: { "patient_id": "P014" }
  Response: { "explanation": "..." }

POST /api/v1/ai/generate-report
  Body: { "type": "end_of_day", "worker_id": "W002", "date": "2026-08-01" }
  Response: { "report_text": "...", "report_id": "R00123" }
```

#### 4.3.4 Caching & Cost Control

- Cache explanations per `patient_id + risk_score` combination (Redis, 24h TTL) to avoid redundant LLM calls when the same patient is viewed repeatedly.
- Batch end-of-day report generation as a single LLM call combining all structured data rather than multiple calls.

---

## 5. USER ROLES & PERMISSIONS

| Capability | ASHA Worker | PHC Supervisor | Administrator |
|---|:---:|:---:|:---:|
| View own daily route | ✅ | ✅ (read-only, all workers) | ✅ |
| Update visit status | ✅ | ❌ | ❌ |
| Trigger emergency re-route | ✅ | ✅ | ✅ |
| View AI risk scores | ✅ (own patients) | ✅ (all in PHC) | ✅ (all) |
| Add/edit patient records | ✅ (limited fields) | ✅ | ✅ |
| Manage worker accounts | ❌ | ✅ (own PHC) | ✅ (all) |
| View analytics dashboard | ❌ | ✅ (PHC-level) | ✅ (district/state-level) |
| Generate reports | ✅ (own) | ✅ (PHC-level) | ✅ (system-wide) |
| Configure system settings (thresholds, work hours) | ❌ | ✅ (PHC-level defaults) | ✅ (global) |
| Manage user roles | ❌ | ❌ | ✅ |

---

## 6. APPLICATION MODULES & SCREENS

### 6.1 Login / Authentication
- Phone number + OTP login (primary, for low-literacy accessibility) with fallback email+password for Supervisor/Admin.
- Role-based redirect after login.

### 6.2 Dashboard
- **ASHA Worker:** Today's route summary card, patient count, risk breakdown (critical/high/moderate/low pill chart), "Start Route" button.
- **Supervisor:** PHC-wide today's-status grid (workers active, visits completed vs planned, emergencies today).
- **Administrator:** District/state-level KPI tiles, PHC comparison table.

### 6.3 Patient Management
- Searchable/filterable patient table (by risk band, visit type, village).
- Patient detail view: demographics, visit history timeline, current risk score with AI explanation, chronic condition tags.
- Add/Edit patient form with validation.

### 6.4 Worker Management (Supervisor/Admin)
- Worker roster table: name, phone, assigned village(s), today's status.
- Assign/reassign patients to workers.
- Work-hour and capacity configuration per worker.

### 6.5 Map Screen
- Interactive map (Leaflet/Mapbox) showing: worker's current location, patient pins color-coded by risk band, optimized route polyline in visit order, ETA labels.
- Tap a pin → mini patient card with "Why is this patient here?" AI explanation button.

### 6.6 Route Screen
- Ordered list view mirroring the map route (list ⇄ map toggle).
- Each stop: patient name, risk badge, visit type, ETA, "Mark Visited / Missed" buttons, "Why first?" explain button.
- Drag-to-reorder disabled in MVP (AI-optimized order is authoritative); Supervisor can override in later phase.

### 6.7 Emergency Screen
- Big, high-contrast "Report Emergency" button (accessible from anywhere).
- Emergency form: patient (existing or new), location, severity, notes.
- On submit → calls `/emergency-reroute` → shows updated route with a diff view ("2 low-priority visits postponed to accommodate emergency").

### 6.8 Analytics (Supervisor/Admin)
- Charts: visits completed vs planned (trend), risk-coverage rate, average response time to emergencies, missed-visit reasons breakdown.
- Filters: date range, worker, village, PHC.

### 6.9 Reports
- List of AI-generated reports (end-of-day, weekly worker performance, emergency summaries).
- Export to PDF (nice-to-have if time allows).

### 6.10 AI Insights
- Model performance snapshot (MAE, feature importance chart) — mainly for judges/technical demo.
- "Ask AI" free-text box for Supervisors: e.g., "Which villages have the most overdue vaccinations this week?"

### 6.11 Settings
- Worker: language preference, notification toggle.
- Supervisor/Admin: risk-band thresholds, default work hours, max visits/day, LLM prompt tone toggle (formal/simple).

### 6.12 Common UI States (apply across all screens)
- **Loading:** skeleton loaders for lists/cards, spinner for map route computation ("Optimizing your route...").
- **Empty:** "No visits scheduled today" with illustration + CTA.
- **Error:** retry-friendly error banners ("Couldn't reach the server. Retry?").
- **Offline (future):** banner indicating cached data is being shown.

---

## 7. USER FLOWS

### 7.1 Starting Work
```
Login (OTP) → Dashboard → "Start Route" →
System calls /optimize-routes for today →
Loading state ("Optimizing your route...") →
Route Screen shows ordered stops
```

### 7.2 Viewing Assigned Patients
```
Dashboard → Patient Management (or Route Screen list) →
Tap patient → Patient Detail (risk score + AI explanation + history)
```

### 7.3 Optimizing Routes (system-triggered, worker-visible)
```
Worker taps "Start Route" (or Supervisor triggers for all workers) →
Backend: fetch patients → ML batch risk scoring →
OR-Tools solve → persist routes → push to app →
Map + Route screens update
```

### 7.4 Visiting Patients
```
Route Screen → navigate to next stop (map deep link) →
Arrive → open patient card → conduct visit (offline in real life) →
Return to app → "Mark Visited"
```

### 7.5 Updating Visit Status
```
Route Screen → stop → "Mark Visited" / "Mark Missed" →
If Missed → reason dropdown (not home / refused / relocated / other) →
AI generates short missed-visit explanation → saved to visit record
```

### 7.6 Receiving Emergency
```
Any screen → "Report Emergency" (floating button) →
Emergency form → submit →
Backend: ML risk-scores emergency patient (auto-critical if flagged) →
/emergency-reroute called with worker's current location →
Updated route pushed → diff shown ("visits postponed: P031, P045")
```

### 7.7 Re-optimization
```
Triggered automatically after emergency insertion OR
manually by worker ("Re-optimize") OR
by Supervisor reassigning a patient mid-day
```

### 7.8 Completing Day
```
Route Screen → "Complete Day" →
Confirms all stops marked (visited/missed) →
Backend generates end-of-day AI report →
Report Screen shows summary + saved to Reports list
```

### 7.9 Generating Report
```
Reports Screen → "Generate" (or auto-generated at day-end) →
Select report type → LLM call with structured day data →
Report rendered → optional PDF export
```

---

## 8. DATABASE DESIGN

### 8.1 Entity-Relationship Diagram (ASCII)

```
┌───────────────┐        ┌────────────────┐        ┌───────────────┐
│    Workers    │1      *│     Visits      │*      1│   Patients    │
├───────────────┤────────├─────────────────┤────────├───────────────┤
│ id (PK)       │        │ id (PK)         │        │ id (PK)       │
│ name          │        │ worker_id (FK)  │        │ name          │
│ phone         │        │ patient_id (FK) │        │ age           │
│ role          │        │ route_id (FK)   │        │ gender        │
│ phc_id (FK)   │        │ status          │        │ village       │
│ shift_start   │        │ scheduled_time  │        │ phone         │
│ shift_end     │        │ actual_time     │        │ lat / lng     │
│ max_visits    │        │ visit_type      │        │ is_pregnant   │
│ lat / lng     │        │ missed_reason   │        │ trimester     │
└──────┬────────┘        └────────┬────────┘        │ ...clinical.. │
       │1                          │*                └──────┬────────┘
       │                           │                          │1
       │*                          ▼                          │*
┌──────┴────────┐        ┌─────────────────┐        ┌────────┴────────┐
│    Routes     │        │  Risk_Scores     │        │ Emergency_Cases │
├───────────────┤        ├─────────────────┤        ├─────────────────┤
│ id (PK)       │        │ id (PK)          │        │ id (PK)         │
│ worker_id(FK) │        │ patient_id (FK)  │        │ patient_id (FK) │
│ date          │        │ score (0-100)    │        │ worker_id (FK)  │
│ total_dist_km │        │ risk_band        │        │ reported_at     │
│ total_dur_min │        │ top_factors(json)│        │ severity        │
│ status        │        │ computed_at      │        │ resolved_at     │
└───────────────┘        └─────────────────┘        └─────────────────┘

┌───────────────┐        ┌─────────────────┐
│    Reports    │        │  Notifications   │
├───────────────┤        ├─────────────────┤
│ id (PK)       │        │ id (PK)          │
│ type          │        │ user_id (FK)     │
│ worker_id(FK) │        │ title            │
│ phc_id (FK)   │        │ body             │
│ date_range    │        │ read_at          │
│ content_text  │        │ created_at       │
│ created_at    │        └─────────────────┘
└───────────────┘
```

### 8.2 Table Definitions

**patients**
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| name | varchar | |
| age | int | |
| gender | enum | |
| village | varchar | |
| phone | varchar | nullable |
| lat, lng | float | |
| is_pregnant | bool | |
| trimester | int | 0–3 |
| high_risk_pregnancy | bool | |
| newborn_age_days | int | nullable |
| vaccination_status | enum | |
| days_overdue | int | |
| chronic_disease_flags | jsonb | array of strings |
| previous_missed_visits | int | |
| visit_type | enum | |
| assigned_worker_id | UUID FK → workers.id | |
| phc_id | UUID FK → phc.id | |
| created_at, updated_at | timestamp | |

**workers**
id, name, phone, role (`asha_worker`), phc_id (FK), shift_start, shift_end, max_visits_per_day, lat, lng, created_at

**routes**
id, worker_id (FK), date, total_distance_km, total_duration_min, status (`planned`/`in_progress`/`completed`), created_at

**route_stops** *(junction table between routes and patients, ordered)*
id, route_id (FK), patient_id (FK), sequence_order, eta, status (`pending`/`visited`/`missed`/`dropped`)

**visits**
id, worker_id (FK), patient_id (FK), route_id (FK), status, scheduled_time, actual_time, visit_type, missed_reason, notes, created_at

**risk_scores**
id, patient_id (FK), score, risk_band, top_factors (jsonb), model_version, computed_at

**emergency_cases**
id, patient_id (FK), worker_id (FK), reported_at, severity, description, resolved_at, resulting_route_id (FK)

**reports**
id, type (`end_of_day`/`weekly_performance`/`emergency_summary`), worker_id (FK, nullable), phc_id (FK, nullable), date_range_start, date_range_end, content_text, created_at

**notifications**
id, user_id (FK), title, body, read_at, created_at

**phc** *(Primary Health Centre, for multi-tenancy)*
id, name, district, state, lat, lng

**users** *(auth table, referenced by workers/supervisors/admins)*
id, phone, email, password_hash (nullable if OTP-only), role (`asha_worker`/`supervisor`/`admin`), phc_id (FK), created_at

### 8.3 Relationships Summary
- `phc` 1—* `workers`, `patients`, `reports`
- `workers` 1—* `visits`, `routes`
- `patients` 1—* `visits`, `risk_scores`, `emergency_cases`
- `routes` 1—* `route_stops` (join to `patients`)
- `users` 1—1 `workers` (for worker-role users)

---

## 9. API DESIGN

**Base URL:** `/api/v1`
**Auth:** JWT Bearer token (issued after OTP verification). All endpoints below require `Authorization: Bearer <token>` unless noted.

### 9.1 Authentication
```
POST /auth/request-otp
  Body: { "phone": "+91XXXXXXXXXX" }
  Response 200: { "message": "OTP sent" }

POST /auth/verify-otp
  Body: { "phone": "+91XXXXXXXXXX", "otp": "123456" }
  Response 200: { "token": "jwt...", "user": {...} }
  Response 401: { "error": "Invalid OTP" }
```

### 9.2 Patients
```
GET /patients?worker_id=&risk_band=&village=
  Response 200: [ {patient...}, ... ]

GET /patients/{id}
  Response 200: { patient detail incl. latest risk_score + history }

POST /patients
  Body: { name, age, gender, village, lat, lng, ...clinical fields }
  Response 201: { patient object }

PUT /patients/{id}
  Response 200: { updated patient object }
```

### 9.3 Risk Scoring
```
POST /ml/predict-risk           (single, see 4.1.4)
POST /ml/predict-risk/batch     (array of patients)
```

### 9.4 Routing
```
POST /routes/optimize           (see 4.2.7)
POST /routes/emergency-reroute  (see 4.2.7)
GET  /routes/{worker_id}/today
  Response 200: { route object with ordered stops }
```

### 9.5 Visits
```
PATCH /visits/{id}/status
  Body: { "status": "visited" | "missed", "missed_reason": "not_home" }
  Response 200: { updated visit }
```

### 9.6 Emergencies
```
POST /emergencies
  Body: { patient (existing_id or new object), worker_id, severity, description }
  Response 201: { emergency_case, updated_route }
```

### 9.7 AI / Reports
```
POST /ai/explain-priority       (see 4.3.3)
POST /ai/generate-report        (see 4.3.3)
GET  /reports?type=&worker_id=&date_range=
```

### 9.8 Standard Status Codes
| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Validation error |
| 401 | Unauthorized / invalid token |
| 403 | Forbidden (role lacks permission) |
| 404 | Resource not found |
| 422 | Semantic error (e.g., optimizer infeasible) |
| 500 | Server error |

---

## 10. FRONTEND DESIGN

### 10.1 Design Language
- Mobile-first (ASHA workers use phones), responsive breakpoints for Supervisor/Admin (tablet/desktop).
- High contrast, large tap targets (min 44px), minimal text, icon-forward for low-literacy usability.
- Color-coded risk bands: 🔴 Critical, 🟠 High, 🟡 Moderate, 🟢 Low.

### 10.2 Key Components
- `RiskBadge` — colored pill showing band + score
- `RouteStopCard` — patient name, ETA, risk badge, action buttons
- `MapView` — Leaflet map with worker + patient markers, route polyline
- `EmergencyButton` — floating action button, always visible
- `AIExplainModal` — bottom-sheet showing LLM explanation text
- `ReportCard` — summary preview + expand
- `KPITile` — used on Supervisor/Admin dashboards
- `DataTable` — sortable/filterable, used in Patient/Worker Management
- `Chart` components — bar (risk distribution), line (completion trend), donut (missed-visit reasons)
- `Dialog` — confirmation modals (e.g., "Complete Day?")
- `Toast` — success/error notifications

### 10.3 States to Implement per Screen
- Loading (skeletons/spinners), Empty, Error (with retry), Success.

### 10.4 Responsive Behaviour
- Worker app: single-column mobile layout, bottom nav (Dashboard / Route / Emergency / Settings).
- Supervisor/Admin: sidebar nav + multi-column dashboard grid on tablet/desktop; collapses to bottom nav on mobile.

---

## 11. BACKEND ARCHITECTURE

### 11.1 Folder Structure

```
asha-route-optimizer/
├── backend/                     # Node.js/Express OR Python/FastAPI main API
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── patient.controller.js
│   │   │   ├── worker.controller.js
│   │   │   ├── route.controller.js
│   │   │   ├── visit.controller.js
│   │   │   ├── emergency.controller.js
│   │   │   └── report.controller.js
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── routing.service.js       # calls OR-Tools microservice
│   │   │   ├── ml.service.js            # calls ML microservice
│   │   │   ├── ai.service.js            # calls Gemini/OpenAI
│   │   │   └── notification.service.js
│   │   ├── models/                       # ORM models (Prisma/SQLAlchemy)
│   │   ├── repositories/                 # DB access layer
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── validate.middleware.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   ├── distance.js               # Haversine helper
│   │   │   └── constants.js
│   │   └── routes/                       # Express route definitions
│   ├── prisma/ (or migrations/)
│   └── server.js
│
├── ml-service/                  # Python FastAPI microservice
│   ├── data/patients_synthetic.csv
│   ├── model/risk_model.pkl
│   ├── generate_dataset.py
│   ├── train_model.py
│   └── main.py                  # FastAPI app exposing /predict-risk
│
├── optimizer-service/           # Python FastAPI + OR-Tools microservice
│   ├── main.py                  # exposes /optimize-routes, /emergency-reroute
│   ├── vrptw_solver.py
│   └── distance_matrix.py
│
├── frontend/                    # React (Vite) app
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/ (API clients)
│   │   ├── store/ (state management)
│   │   └── App.jsx
│
└── docs/
    └── PRD.md (this document)
```

### 11.2 Service Communication
- Main backend (Node/Express or FastAPI) acts as the **API gateway** and orchestrator.
- It calls `ml-service` (risk scoring) and `optimizer-service` (routing) over internal HTTP.
- All persistent state lives in PostgreSQL, accessed only by the main backend.

### 11.3 Authentication
- OTP-based login → JWT issued (15 min access token + refresh token).
- Role claim embedded in JWT; middleware checks role per route.

### 11.4 Validation
- Request schema validation (Zod for Node / Pydantic for FastAPI) on all POST/PUT/PATCH endpoints.

### 11.5 Error Handling
- Centralized error middleware returns consistent JSON: `{ "error": { "code": "...", "message": "..." } }`.
- Optimizer infeasibility handled gracefully (422 with explanation, not a crash).

### 11.6 Logging
- Structured JSON logs (request id, user id, latency) via Winston (Node) or Python `logging` + `structlog`.
- Separate log stream for AI service calls (track LLM/ML latency & cost).

---

## 12. AI SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                        │
│      Worker App  |  Supervisor Dashboard  |  Admin Console      │
└───────────────────────────────┬───────────────────────────────┘
                                 │ REST / JSON (JWT auth)
                                 ▼
                    ┌────────────────────────┐
                    │   Main Backend (API     │
                    │   Gateway / Orchestrator)│
                    └───────────┬─────────────┘
              ┌──────────────────┼───────────────────┐
              ▼                  ▼                    ▼
   ┌─────────────────┐ ┌──────────────────┐ ┌───────────────────┐
   │  ML Service      │ │ Optimizer Service │ │  AI/LLM Service    │
   │  (FastAPI)       │ │ (FastAPI+OR-Tools)│ │ (Gemini/OpenAI)     │
   │  XGBoost Risk    │ │ VRPTW Solver       │ │ Explanations &      │
   │  Model           │ │                    │ │ Reports              │
   └─────────────────┘ └──────────────────┘ └───────────────────┘
              │                  │                    │
              └──────────────────┼────────────────────┘
                                 ▼
                     ┌────────────────────┐
                     │   PostgreSQL DB     │
                     │   + Redis Cache     │
                     └────────────────────┘
```

**Flow:** Backend fetches patients → ML service batch-scores risk → Optimizer service consumes risk scores + constraints → produces routes → Backend persists → Frontend renders. AI/LLM service is called on-demand (explanations, reports), with Redis caching results per `patient_id + risk_score` or per `report_type + date + worker_id` to control cost and latency.

**Caching Strategy:**
- Risk scores: cached per patient per day (recomputed only if patient data changes or new day starts).
- Distance matrix: cached per worker's patient set (invalidated when patient set changes).
- LLM explanations: cached 24h keyed by `(patient_id, risk_score)`.

**Future Scalability:**
- Move ML/Optimizer services behind a message queue (e.g., Redis Queue/Celery) for async processing at district scale (thousands of workers).
- Partition optimizer runs per PHC to parallelize across a compute cluster.
- Swap synthetic model for a real model retrained on HMIS data with a scheduled MLOps pipeline (e.g., Airflow + model registry).

---

## 13. TECH STACK

| Layer | Recommendation | Why (hackathon-appropriate) |
|---|---|---|
| Frontend | React (Vite) + Tailwind CSS + shadcn/ui | Fast to build, component-rich, mobile-responsive |
| Maps | Leaflet.js + OpenStreetMap tiles | Free, no API key needed, fast to integrate |
| Backend (API Gateway) | Node.js + Express (or FastAPI if team prefers Python end-to-end) | Fast REST setup, huge ecosystem |
| ML Service | Python + FastAPI + XGBoost/scikit-learn | Best-in-class for tabular ML, quick to serve |
| Optimizer Service | Python + FastAPI + Google OR-Tools | Purpose-built VRPTW solver, well-documented |
| LLM | Gemini API (gemini-1.5-flash or newer available tier) or OpenAI API | Fast, cheap, good instruction-following for short explanations |
| Database | PostgreSQL (Supabase for hosted Postgres + instant auth) | Relational integrity for patients/visits/routes; Supabase accelerates hackathon setup |
| Cache | Redis (Upstash for serverless hosting) | Cheap, fast caching for LLM/risk-score reuse |
| Auth | Supabase Auth (phone OTP) or Firebase Auth | Ready-made OTP flow, saves build time |
| Hosting (Frontend) | Vercel | One-command deploy, free tier |
| Hosting (Backend/services) | Render or Railway | Simple Docker/Python service deploy, free/cheap tier |
| Version Control | GitHub | Standard, required for most hackathon submissions |

---

## 14. MVP ROADMAP (2-DAY PLAN)

### Day 1 — Morning
- Finalize schema, set up PostgreSQL (Supabase project), scaffold repos (backend, ml-service, optimizer-service, frontend).
- Generate synthetic dataset (`generate_dataset.py`) — 3,000+ rows.
- Set up auth (OTP flow) end-to-end.

### Day 1 — Afternoon
- Train & serve risk model (`train_model.py` → FastAPI `/predict-risk`).
- Build Patient Management CRUD (backend + frontend table).
- Build core DB tables + seed 30–50 synthetic patients + 3–5 workers.

### Day 2 — Morning
- Build Optimizer Service (OR-Tools VRPTW) with distance matrix + time windows + disjunctions.
- Wire `/routes/optimize` end-to-end: Dashboard → Start Route → Map/Route screens.
- Build Emergency flow + `/emergency-reroute`.

### Day 2 — Afternoon
- Integrate LLM explanation + end-of-day report generation.
- Build Supervisor Analytics dashboard (basic charts).
- **Integration & Testing:** full user-flow walkthrough (login → route → visit → emergency → report).
- **Deployment:** deploy frontend (Vercel), backend + services (Render/Railway), verify env vars/secrets.
- **Presentation prep:** record demo video as backup, rehearse pitch (see Section 16).

---

## 15. FUTURE FEATURES

- **Offline mode:** local SQLite cache + background sync when connectivity returns (critical for rural network gaps).
- **Voice assistant:** Telugu/Hindi voice input for visit updates ("visited", "missed") for low-literacy usability.
- **Government integration:** HMIS / RCH portal data sync for real patient records and reporting compliance.
- **Predictive outbreak analysis:** aggregate risk trends across villages to flag potential disease clusters early.
- **District dashboard:** state/district health officials view aggregated KPIs across all PHCs.
- **WhatsApp notifications:** daily route summary and emergency alerts via WhatsApp Business API for workers without app fluency.

---

## 16. JUDGING PREPARATION

### 16.1 Elevator Pitch (30 seconds)
"Every day, over a million ASHA workers plan life-critical home visits from memory and paper registers — and critical patients fall through the cracks. ASHA Route Optimizer AI uses machine learning to predict patient risk, Google OR-Tools to build the most efficient route across all their patients, and generative AI to explain every decision in plain language — even re-optimizing instantly when an emergency comes in. It's AI that fits into how India's public health system already works."

### 16.2 Demo Flow (aim for ~3 minutes)
1. Login as ASHA worker → Dashboard shows today's risk-ranked visit count.
2. Tap "Start Route" → watch AI optimize in real time → Map + Route screen.
3. Tap "Why is this patient first?" → show LLM explanation.
4. Trigger an emergency → show live re-route + dropped low-priority visits.
5. "Complete Day" → AI-generated end-of-day report.
6. Switch to Supervisor view → PHC-wide dashboard + analytics.

### 16.3 Architecture Explanation (for technical judges)
Walk through Section 12 diagram: three independent AI services (ML risk model, OR-Tools optimizer, LLM explainer) orchestrated by a central backend, each independently scalable and swappable.

### 16.4 Technical Innovation
- Combines **predictive ML**, **operations-research optimization**, and **generative AI** in a single coherent pipeline — not just "a chatbot wrapper."
- Risk score becomes a first-class optimization input (soft constraint via disjunction penalties), not just a display label.
- Emergency re-routing re-solves the VRPTW live using the worker's current location as a dynamic depot.

### 16.5 Business Impact
- Reduces missed high-risk visits, improves ANC/PNC/immunization compliance — directly supports National Health Mission (NHM) KPIs.
- Reduces ASHA workers' unproductive travel time, effectively increasing their patient-facing capacity without added headcount.

### 16.6 Social Impact
- Improves maternal and infant health outcomes in underserved rural areas.
- Builds a decision-support tool that respects the worker's judgment (explainable, not a black box) rather than replacing them.

### 16.7 Scalability
- Multi-tenant design (PHC → District → State) via `phc_id` scoping already in schema.
- Microservice split (ML / Optimizer / LLM) allows independent scaling as adoption grows.

### 16.8 Possible Judge Questions & Ideal Answers

| Question | Ideal Answer |
|---|---|
| "Is your ML model trained on real data?" | "For the hackathon we used a rule-weighted synthetic dataset that mirrors realistic clinical risk patterns; production deployment would retrain on anonymized HMIS/RCH data via a government MOU, using the same pipeline." |
| "Why OR-Tools instead of a simpler nearest-neighbor heuristic?" | "OR-Tools lets us encode real-world constraints — work hours, time windows, and priority-weighted droppable visits — which a simple greedy heuristic can't handle robustly, especially under emergency re-routing." |
| "How do you handle poor rural connectivity?" | "Offline mode with local caching and background sync is on our near-term roadmap; the MVP focuses on the core AI pipeline, but the architecture (React + REST APIs) supports this cleanly." |
| "How is this different from existing route-planning apps?" | "Generic route apps optimize only for distance. We optimize for a clinically-informed priority signal alongside distance, and we explain *why*, which builds trust with both workers and supervisors." |
| "What's your data privacy approach for patient health data?" | "Role-based access control, encrypted at rest (Supabase/Postgres), and scoped by PHC; a production rollout would need to comply with India's Digital Personal Data Protection Act and health-data-specific consent frameworks." |
| "How do you validate the model's predictions are clinically meaningful?" | "In production we'd validate against actual outcomes (missed critical windows, complications) with clinical advisors from the health department, not just statistical accuracy." |

---

## 17. RISKS & MITIGATIONS

| Risk | Mitigation |
|---|---|
| OR-Tools solve time too slow for live demo | Cap solver time limit to 3–5 seconds; pre-warm with cached distance matrices |
| LLM API latency/cost during demo | Cache explanations; have a scripted fallback response if API is down |
| Synthetic data looks unrealistic to judges | Clearly frame it as synthetic + explain the real-data migration path (Section 4.1.5) |
| Time overrun on 2-day build | Roadmap prioritizes core AI pipeline first (Section 14); analytics/reports are the first to cut if behind schedule |
| Map/GPS inaccuracy in demo environment | Use fixed demo coordinates for a real Indian district (e.g., Chittoor/Anantapur) instead of live GPS during the pitch |
| Team unfamiliarity with OR-Tools | Use OR-Tools' official VRPTW example as a starting template; keep constraint set minimal for MVP |

---

## 18. FUTURE SCOPE

Beyond the "Future Features" in Section 15, longer-term product evolution includes:
- Integration with India's **Ayushman Bharat Digital Mission (ABDM)** health ID ecosystem.
- District-level **outbreak early-warning system** built on aggregated risk-score trends.
- **Multi-modal input:** photo-based symptom logging with vision-model triage assist.
- **Incentive/performance layer:** gamified, transparent performance tracking tied to existing ASHA incentive schemes.
- Expansion beyond ASHA workers to **Anganwadi workers** and **PHC nurses** for a unified rural health workforce platform.

---

*End of Document — ASHA Route Optimizer AI PRD v1.0*
