# ASHA Route Optimizer AI — Master Project Completion Report

**Project Name:** ASHA Route Optimizer AI  
**Repository:** [https://github.com/gowtham-2006-droid/asha-route-optimizer](https://github.com/gowtham-2006-droid/asha-route-optimizer)  
**Lead Frontend & Integration:** Gowtham (`Gowtham`)  
**Target Catchment:** PHC Ramanthapur Hub, Hyderabad, Telangana  
**Date of Completion:** July 31, 2026  

---

## Executive Summary

**ASHA Route Optimizer AI** is an AI-powered, dynamic route optimization and clinical risk stratification platform designed for Accredited Social Health Activists (ASHA) and Primary Health Centre (PHC) Supervisors in India. 

The platform transforms daily rural healthcare visits by combining **XGBoost Machine Learning** for clinical urgency scoring, **Google OR-Tools VRPTW Constraint Programming** for route sequence optimization, and **Google Gemini 1.5 Flash Generative AI** for plain-English clinical explanations and executive supervisor reports.

---

## Chronological Project Timeline & Accomplishments

### Phase 1 — Project Strategy & Requirements Definition
- Created [`docs/ASHA_Route_Optimizer_AI_PRD.md`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/docs/ASHA_Route_Optimizer_AI_PRD.md): Comprehensive Product Requirements Document (PRD) detailing problem statement, user personas (ASHA Worker Lakshmi Devi & PHC Medical Officer Dr. Radhika Rao), system architecture, and risk formula definitions.

---

### Phase 2 — Technical Specifications & Integration Contracts
Created four frozen architectural specification documents:

1. **Integration Control Document (ICD):** [`docs/INTEGRATION_CONTRACT.md`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/docs/INTEGRATION_CONTRACT.md)
   - Established frozen technology stack (React + Vite + Tailwind CSS + Leaflet, FastAPI, PostgreSQL, XGBoost, OR-Tools, Gemini).
   - Defined 10 strict integration rules, folder ownership boundaries, and Git branching standards.

2. **REST API Specification:** [`docs/API_SPECIFICATION.md`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/docs/API_SPECIFICATION.md) & [`shared/api-contracts/api-schema.json`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/shared/api-contracts/api-schema.json)
   - Defined complete OpenAPI schemas for `/auth`, `/patients`, `/predict-risk`, `/optimize-route`, `/emergency-reroute`, `/visits`, and `/ai`.

3. **Database Schema:** [`docs/DATABASE_SCHEMA.md`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/docs/DATABASE_SCHEMA.md) & [`shared/schemas/schema.sql`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/shared/schemas/schema.sql)
   - Designed 10 relational tables (`phcs`, `users`, `workers`, `patients`, `risk_scores`, `routes`, `route_stops`, `visits`, `emergencies`, `reports`) + performance indexes.

4. **Team Assignment Matrix:** [`docs/TEAM_ASSIGNMENT.md`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/docs/TEAM_ASSIGNMENT.md)
   - Outlined folder ownership and explicit deliverables for Frontend Lead (Gowtham), Backend Engineer, and AI Engineer.

---

### Phase 3 — Frontend Web Application Development (`frontend/`)
Scaffolded and launched the web application in [`frontend/`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/frontend):

1. **Phone OTP Authentication Flow ([`PhoneOTPLogin.jsx`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/frontend/src/components/PhoneOTPLogin.jsx)):**
   - Role switcher (`ASHA Field Worker` vs `PHC Supervisor`).
   - 6-digit OTP verification (`123456`), JWT token storage in `localStorage`, user profile header badge, and logout.

2. **Axios REST API Client Layer ([`api.js`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/frontend/src/services/api.js)):**
   - Configured Axios instance with request/response JWT interceptors and client-side mock fallback (`safeApiCall`) ensuring 100% offline functionality.

3. **Interactive Leaflet Map Component ([`RouteMap.jsx`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/frontend/src/components/RouteMap.jsx)):**
   - Renders worker GPS location avatar, numbered patient pins color-coded by risk band, and route polyline across Hyderabad (Ramanthapur, Habsiguda, Uppal).

4. **Ordered Route Sequence Cards ([`RouteStopCard.jsx`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/frontend/src/components/RouteStopCard.jsx)):**
   - Sequence number, risk badges, ETAs, travel distances, visit status toggles (`Visited`, `Missed`), and AI explanation trigger.

5. **Patient Directory & Live ML Risk Simulator ([`PatientManagement.jsx`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/frontend/src/components/PatientManagement.jsx)):**
   - Searchable patient directory table with village/risk filters and interactive `ClinicalRiskSimulatorModal` allowing live risk recalculation (0–100) and instant route re-ordering.

6. **Bulk Patient CSV Ingestion Modal ([`BatchPatientUploadModal.jsx`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/frontend/src/components/BatchPatientUploadModal.jsx)):**
   - Drag-and-drop CSV batch upload modal with sample format download support and auto ML scoring.

7. **Dynamic Emergency Dispatch Simulation ([`EmergencyModal.jsx`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/frontend/src/components/EmergencyModal.jsx)):**
   - Live emergency insertion modal (e.g. Kavitha Sharma — severe postpartum hemorrhage) with automatic re-routing and low-priority visit displacement.

8. **Gemini AI Rationale Popup ([`AIExplanationModal.jsx`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/frontend/src/components/AIExplanationModal.jsx)):**
   - Displays plain-English clinical risk reasoning.

9. **PHC Supervisor Command Center ([`SupervisorDashboard.jsx`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/frontend/src/components/SupervisorDashboard.jsx) & [`ReportModal.jsx`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/frontend/src/components/ReportModal.jsx)):**
   - KPI tiles, Recharts risk distribution charts, high-risk patient roster, and Gemini EOD report preview.

10. **shadcn UI Components Suite ([`frontend/src/components/ui/`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/frontend/src/components/ui)):**
    - Built 10 clean UI components: `AlertDialog`, `Attachment`, `Breadcrumb`, `Calendar`, `Card`, `CommandDialog`, `Drawer`, `NavigationMenu`, `Pagination`, and `Sidebar`.

---

### Phase 4 — AI Microservices Module (`ai/`)
Built all AI capabilities in Python:

1. **Synthetic Dataset Generator ([`dataset_generator.py`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/ai/dataset_generator.py)):**
   - Generates 3,500 synthetic patient records skewed realistically to rural Indian health prevalence.

2. **XGBoost Risk Model ([`risk_model.py`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/ai/risk_model.py)):**
   - Feature engineering & XGBoost Regressor training pipeline, serializing trained artifact `ai/model/risk_model.pkl`.

3. **Google OR-Tools VRPTW Solver ([`optimizer.py`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/ai/optimizer.py)):**
   - Haversine distance matrix with 1.25x road curvature factor, time windows, and emergency re-routing displacement algorithm.

4. **Gemini 1.5 Flash Integration ([`llm_service.py`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/ai/llm_service.py)):**
   - Plain-English clinical rationale generator and EOD supervisor report generator with local rule-based fallback.

5. **FastAPI AI Microservice Server ([`main.py`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/ai/main.py)):**
   - Exposes `/predict-risk`, `/optimize-routes`, `/emergency-reroute`, and `/generate-report` REST API endpoints on port `8001`.

---

### Phase 5 — FastAPI Backend REST API Gateway & Database (`backend/`)
Built the backend architecture:

1. **SQLAlchemy ORM Models ([`models.py`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/backend/models.py)):**
   - 10 database tables matching specification (`PHC`, `User`, `Worker`, `Patient`, `RiskScore`, `Route`, `RouteStop`, `Visit`, `Emergency`, `Report`).

2. **Database Engine & Auto-Fallback ([`database.py`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/backend/database.py)):**
   - SQLite zero-friction local fallback with instant PostgreSQL production engine support via `DATABASE_URL`.

3. **Database Seeding Script ([`seed.py`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/backend/seed.py)):**
   - Pre-populates 1 PHC (Ramanthapur Hub), 3 ASHA Workers, and 50 Synthetic Patients with pre-calculated risk scores.

4. **Authentication & Security ([`auth.py`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/backend/auth.py)):**
   - Phone OTP request/verify endpoints and JWT Bearer token middleware.

5. **AI Gateway Orchestrator ([`services/ai_gateway.py`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/backend/services/ai_gateway.py)):**
   - Async HTTP client delegating requests to `http://localhost:8001` with internal fallback.

6. **FastAPI Server Gateway ([`main.py`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/backend/main.py)):**
   - Main entry point exposing `/api/v1/auth`, `/api/v1/patients`, `/api/v1/routes`, and CORS middleware.

---

### Phase 6 — GitHub Synchronization & Commit History

All code changes have been staged, committed, and pushed to `main` on GitHub across 5 commits:

| Commit Hash | Commit Message | Files Changed |
|---|---|---|
| [`d4b1ef9`](https://github.com/gowtham-2006-droid/asha-route-optimizer/commit/d4b1ef9) | `feat: initial commit with full React frontend app` | 44 files |
| [`9ac8b04`](https://github.com/gowtham-2006-droid/asha-route-optimizer/commit/9ac8b04) | `feat: add Bulk Patient CSV Ingestion modal with sample template download and automated batch ML risk scoring` | 3 files |
| [`60b487b`](https://github.com/gowtham-2006-droid/asha-route-optimizer/commit/60b487b) | `feat: add shadcn UI components (AlertDialog, Attachment, Breadcrumb, Calendar, Card, CommandDialog, Drawer, NavigationMenu, Pagination, Sidebar)` | 14 files |
| [`5761533`](https://github.com/gowtham-2006-droid/asha-route-optimizer/commit/5761533) | `ai: complete dataset generator, XGBoost risk model, Google OR-Tools VRPTW solver, Gemini LLM service, and FastAPI microservice` | 6 files |
| [`9ba4201`](https://github.com/gowtham-2006-droid/asha-route-optimizer/commit/9ba4201) | `feat: complete FastAPI REST API gateway server, SQLAlchemy ORM models, auth middleware, and DB seeding script` | 7 files |

---

## How to Run & Verify the Full Application

### 1. Run Frontend Web App
```bash
cd frontend
npm run dev
```
- **Local URL:** `http://localhost:5174/`

### 2. Run AI Microservice
```bash
cd ai
pip install -r requirements.txt
python main.py
```
- **Local URL:** `http://localhost:8001/` (Swagger docs at `http://localhost:8001/docs`)

### 3. Run FastAPI Backend API Gateway
```bash
cd backend
pip install -r requirements.txt
python main.py
```
- **Local URL:** `http://localhost:8000/` (Swagger docs at `http://localhost:8000/docs`)

---
*Report generated automatically by Antigravity AI for Gowtham.*
