# ASHA Route Optimizer AI — Database Schema

**Database Engine:** PostgreSQL 15+ (Hosted on Supabase or Local Docker)  
**ORM Support:** SQLAlchemy 2.0 / Prisma  
**Document Version:** 1.0  
**Status:** Approved & Frozen  

---

## 1. Entity-Relationship (ER) Overview

```
 ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
 │     phcs     │1 ────── *│    users     │1 ────── 1│   workers    │
 └──────┬───────┘          └──────────────┘          └──────┬───────┘
        │ 1                                                 │ 1
        │                                                   │
        ▼ *                                                 ▼ *
 ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
 │   patients   │1 ────── *│ risk_scores  │          │    routes    │
 └──────┬───────┘          └──────────────┘          └──────┬───────┘
        │ 1                                                 │ 1
        ├─── * ┌──────────────┐                             │
        │      │ emergencies  │                             │
        │      └──────────────┘                             │
        │ 1                                                 ▼ *
        │      ┌──────────────┐                    ┌────────────────┐
        └──── *│    visits    │* ──────────────── 1│  route_stops   │
               └──────────────┘                    └────────────────┘
```

---

## 2. Table Definitions

### 2.1 `phcs` (Primary Health Centres)
Stores catchment area administrative hubs.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(50)` | `PRIMARY KEY` | Unique PHC ID (e.g. `phc_ramanthapur_01`) |
| `name` | `VARCHAR(100)` | `NOT NULL` | PHC Name |
| `district` | `VARCHAR(100)` | `NOT NULL` | District Name (e.g. `Malkajgiri`) |
| `state` | `VARCHAR(100)` | `NOT NULL` | State (e.g. `Telangana`) |
| `latitude` | `DECIMAL(9,6)` | `NOT NULL` | Geo latitude coordinate |
| `longitude` | `DECIMAL(9,6)` | `NOT NULL` | Geo longitude coordinate |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Registration timestamp |

---

### 2.2 `users` (Authentication & Roles)
System user credentials and role assignments.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(50)` | `PRIMARY KEY` | User ID (e.g. `usr_w101`) |
| `phone` | `VARCHAR(15)` | `UNIQUE, NOT NULL` | Mobile number for OTP auth |
| `name` | `VARCHAR(100)` | `NOT NULL` | User full name |
| `role` | `VARCHAR(20)` | `NOT NULL` | `asha_worker` \| `supervisor` \| `admin` |
| `phc_id` | `VARCHAR(50)` | `FOREIGN KEY (phcs.id)` | Associated PHC |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Record creation timestamp |

---

### 2.3 `workers` (ASHA Worker Operational Profiles)
Operational settings and current live status for field workers.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(50)` | `PRIMARY KEY` | Worker ID (matches `users.id`) |
| `user_id` | `VARCHAR(50)` | `FOREIGN KEY (users.id), UNIQUE` | Linked auth user |
| `assigned_village` | `VARCHAR(100)` | `NOT NULL` | Primary village coverage |
| `daily_max_visits` | `INT` | `DEFAULT 10` | Maximum visit capacity |
| `current_latitude` | `DECIMAL(9,6)` | `NULLABLE` | Last reported live GPS latitude |
| `current_longitude` | `DECIMAL(9,6)` | `NULLABLE` | Last reported live GPS longitude |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Record creation timestamp |

---

### 2.4 `patients` (Demographic & Clinical Records)
Patient master data used by ML risk model and route solver.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(50)` | `PRIMARY KEY` | Patient ID (e.g. `pat_001`) |
| `name` | `VARCHAR(100)` | `NOT NULL` | Patient full name |
| `age` | `INT` | `NOT NULL` | Patient age in years |
| `gender` | `VARCHAR(10)` | `NOT NULL` | `female` \| `male` \| `other` |
| `phone` | `VARCHAR(15)` | `NULLABLE` | Patient/Guardian contact phone |
| `village` | `VARCHAR(100)` | `NOT NULL` | Residential village name |
| `latitude` | `DECIMAL(9,6)` | `NOT NULL` | Home location latitude |
| `longitude` | `DECIMAL(9,6)` | `NOT NULL` | Home location longitude |
| `is_pregnant` | `BOOLEAN` | `DEFAULT FALSE` | Pregnancy status |
| `trimester` | `INT` | `DEFAULT 0` | 0=N/A, 1=1st, 2=2nd, 3=3rd |
| `high_risk_pregnancy`| `BOOLEAN` | `DEFAULT FALSE` | High-risk pregnancy flag |
| `newborn_age_days` | `INT` | `DEFAULT 0` | Newborn age in days (0 if N/A) |
| `vaccination_status`| `VARCHAR(20)` | `DEFAULT 'up_to_date'` | `up_to_date` \| `due` \| `overdue` \| `not_applicable` |
| `days_overdue` | `INT` | `DEFAULT 0` | Days overdue for visit/vaccine |
| `chronic_disease_flags`| `JSONB` | `DEFAULT '[]'` | Array of conditions e.g. `["anemia"]` |
| `previous_missed_visits`| `INT` | `DEFAULT 0` | Count of missed visits in 90 days |
| `visit_type` | `VARCHAR(30)` | `NOT NULL` | `anc_checkup` \| `pnc_checkup` \| `immunization` \| `general` |
| `last_visit_days_ago`| `INT` | `DEFAULT 0` | Days since last visit |
| `assigned_worker_id`| `VARCHAR(50)` | `FOREIGN KEY (workers.id)` | Assigned ASHA worker |
| `phc_id` | `VARCHAR(50)` | `FOREIGN KEY (phcs.id)` | Linked PHC |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Record creation timestamp |

---

### 2.5 `risk_scores` (ML Model Inference History)
Historical risk score predictions generated by XGBoost.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(50)` | `PRIMARY KEY` | Ingestion score ID |
| `patient_id` | `VARCHAR(50)` | `FOREIGN KEY (patients.id)` | Linked patient |
| `risk_score` | `INT` | `NOT NULL` | Urgency score (0-100) |
| `risk_band` | `VARCHAR(20)` | `NOT NULL` | `Critical` \| `High` \| `Moderate` \| `Low` |
| `top_contributing_factors`| `JSONB` | `NULLABLE` | Contributing feature breakdown |
| `explanation_text` | `TEXT` | `NULLABLE` | LLM plain-English rationale |
| `calculated_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Inference calculation timestamp |

---

### 2.6 `routes` (Daily Optimized Routes)
Master record for daily worker route optimization runs.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(50)` | `PRIMARY KEY` | Route ID (e.g. `rte_20260731_w101`) |
| `worker_id` | `VARCHAR(50)` | `FOREIGN KEY (workers.id)` | Worker assigned |
| `route_date` | `DATE` | `NOT NULL` | Route date |
| `total_distance_km` | `DECIMAL(6,2)` | `NOT NULL` | Total travel distance |
| `total_duration_minutes`| `INT` | `NOT NULL` | Total estimated route time |
| `status` | `VARCHAR(20)` | `DEFAULT 'active'` | `active` \| `completed` \| `reoptimized` |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Route solver execution timestamp |

---

### 2.7 `route_stops` (Sequential Route Stops)
Individual ordered patient visit stops in a route.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(50)` | `PRIMARY KEY` | Stop ID |
| `route_id` | `VARCHAR(50)` | `FOREIGN KEY (routes.id)` | Linked route |
| `patient_id` | `VARCHAR(50)` | `FOREIGN KEY (patients.id)` | Target patient |
| `sequence_number` | `INT` | `NOT NULL` | Stop order index (1, 2, 3...) |
| `estimated_arrival` | `VARCHAR(10)` | `NOT NULL` | Estimated ETA (e.g. `09:40`) |
| `estimated_departure`| `VARCHAR(10)` | `NOT NULL` | Estimated departure (e.g. `10:05`) |
| `travel_time_minutes`| `INT` | `NOT NULL` | Travel time from previous stop |
| `distance_km` | `DECIMAL(5,2)` | `NOT NULL` | Travel distance from previous stop |
| `is_emergency` | `BOOLEAN` | `DEFAULT FALSE` | Dynamic emergency flag |
| `status` | `VARCHAR(20)` | `DEFAULT 'scheduled'` | `scheduled` \| `in_progress` \| `visited` \| `missed` |

---

### 2.8 `visits` (Visit Execution Log)
Real ground logs of visits completed or missed by workers.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(50)` | `PRIMARY KEY` | Visit log ID |
| `route_stop_id` | `VARCHAR(50)` | `FOREIGN KEY (route_stops.id), NULLABLE` | Linked stop |
| `patient_id` | `VARCHAR(50)` | `FOREIGN KEY (patients.id)` | Patient visited |
| `worker_id` | `VARCHAR(50)` | `FOREIGN KEY (workers.id)` | Worker logged |
| `visit_type` | `VARCHAR(30)` | `NOT NULL` | Checkup type |
| `status` | `VARCHAR(20)` | `NOT NULL` | `visited` \| `missed` |
| `missed_reason` | `VARCHAR(50)` | `NULLABLE` | `not_home` \| `refused` \| `emergency_reassign` |
| `clinical_notes` | `TEXT` | `NULLABLE` | Worker observations |
| `visited_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Check-in timestamp |

---

### 2.9 `emergencies` (Emergency Dispatch Logs)
Logs of emergency events triggered during the day.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(50)` | `PRIMARY KEY` | Emergency log ID |
| `patient_id` | `VARCHAR(50)` | `FOREIGN KEY (patients.id)` | Emergency patient |
| `worker_id` | `VARCHAR(50)` | `FOREIGN KEY (workers.id)` | Dispatch worker |
| `severity_score` | `INT` | `DEFAULT 95` | Emergency urgency rating |
| `description` | `TEXT` | `NOT NULL` | Clinical emergency description |
| `status` | `VARCHAR(20)` | `DEFAULT 'triggered'` | `triggered` \| `resolved` \| `reassigned` |
| `triggered_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Alert trigger timestamp |

---

### 2.10 `reports` (EOD AI Summary Reports)
End-of-day supervisor reports generated via Gemini.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(50)` | `PRIMARY KEY` | Report ID |
| `worker_id` | `VARCHAR(50)` | `FOREIGN KEY (workers.id)` | Worker evaluated |
| `phc_id` | `VARCHAR(50)` | `FOREIGN KEY (phcs.id)` | Associated PHC |
| `report_date` | `DATE` | `NOT NULL` | Date of evaluation |
| `summary_title` | `VARCHAR(150)` | `NOT NULL` | Headline title |
| `report_text` | `TEXT` | `NOT NULL` | Plain-English markdown text |
| `metrics_json` | `JSONB` | `NOT NULL` | Coverage metrics JSON |
| `generated_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | LLM report generation timestamp |

---

## 3. Recommended Database Indexes

To maintain <100ms response times for frontend queries:
- `idx_patients_worker_id`: `patients(assigned_worker_id)`
- `idx_patients_village`: `patients(village)`
- `idx_risk_scores_patient_id`: `risk_scores(patient_id, calculated_at DESC)`
- `idx_route_stops_route_id`: `route_stops(route_id, sequence_number)`
- `idx_visits_worker_date`: `visits(worker_id, visited_at)`
