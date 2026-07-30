# ASHA Route Optimizer AI — Integration Contract (ICD)

**Project:** ASHA Route Optimizer AI  
**Theme:** Smart Automation (Idea2Impact 2026 — Hyderabad Finale)  
**Document Version:** 1.1  
**Status:** Frozen & Approved  

---

## 1. Project Overview

### 1.1 Purpose
The Integration Contract defines the technical agreements that every team member must follow during the development of **ASHA Route Optimizer AI**. Its purpose is to ensure that the Frontend, Backend, and AI modules are developed independently while remaining fully compatible during integration.

No developer should make changes to API contracts, database fields, folder structure, or technology choices without team approval.

---

### 1.2 Team Structure

#### Member 1 — Frontend & Integration Lead (Gowtham)
Responsible for:
- UI/UX implementation
- Dashboard
- Maps
- API integration
- Final application integration
- Demo preparation

#### Member 2 — Backend Engineer
Responsible for:
- Backend APIs
- Database
- Authentication
- CRUD operations
- Business logic
- Connecting AI modules

#### Member 3 — AI Engineer
Responsible for:
- ML Risk Prediction
- OR-Tools Route Optimization
- Gemini Report Generation
- Synthetic Dataset
- AI Model Deployment

---

### 1.3 Project Architecture

```
                    React Frontend
                          │
                     REST API Calls
                          │
                  FastAPI Backend
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
     PostgreSQL      ML Model      OR-Tools
                                       │
                                       ▼
                                Gemini API
```

---

### 1.4 Core Integration Rules

- **Rule 1:** Frontend NEVER accesses the database directly.
- **Rule 2:** Frontend ONLY communicates through Backend APIs.
- **Rule 3:** Backend is the only module allowed to communicate with AI services.
- **Rule 4:** AI modules NEVER communicate directly with the frontend.
- **Rule 5:** Every API response must return JSON.
- **Rule 6:** Database field names cannot be changed after approval.
- **Rule 7:** All developers must use the agreed folder structure.
- **Rule 8:** Every new feature must be committed on its own Git branch before merging into `main`.
- **Rule 9:** Breaking API changes require team discussion before implementation.
- **Rule 10:** Every completed feature must be tested before merging.

---

### 1.5 Integration Workflow

```
Frontend
     │
     ▼
Backend API
     │
 ┌───┴────────────┐
 │                │
 ▼                ▼
Database       AI Services
               ├── Risk Prediction
               ├── Route Optimization
               └── Report Generator
```

---

### 1.6 Communication Rules
- Use GitHub Issues for bugs and feature tracking.
- Discuss API or schema changes before implementation.
- Do not push unfinished code directly to `main`.
- Notify the team before changing shared interfaces.

---

### 1.7 Definition of Done
A feature is considered complete only when:
- It matches the PRD.
- It follows the API contract.
- It passes testing.
- It integrates without breaking other modules.
- It is committed and reviewed before merging.

---

## 2. Technology Stack & Version Lock

To prevent runtime discrepancies across developer environments during the 2-day hackathon, all dependency versions are explicitly locked as specified below.

### 2.1 Runtimes & Engines
| Component | Engine / Runtime | Locked Version | Verification Command |
|---|---|---|---|
| Python Runtime | Python | `3.11.8` | `python --version` |
| Node Runtime | Node.js | `v20.11.0` (LTS) | `node -v` |
| Node Package Manager | npm | `10.2.4` | `npm -v` |
| Database Engine | PostgreSQL | `15.5` / Supabase | `psql --version` |

---

### 2.2 Frontend Stack (`frontend/package.json`)
| Library / Package | Version | Purpose |
|---|---|---|
| `react` | `^18.2.0` | Core UI Framework |
| `react-dom` | `^18.2.0` | DOM Renderer |
| `vite` | `^5.1.0` | Frontend Build Tool & Dev Server |
| `tailwindcss` | `^3.4.1` | Utility-First CSS Styling |
| `lucide-react` | `^0.323.0` | Iconography |
| `leaflet` | `^1.9.4` | Interactive Maps Engine |
| `react-leaflet` | `^4.2.1` | React Wrapper for Leaflet |
| `axios` | `^1.6.7` | HTTP Client for API Communications |
| `zustand` | `^4.5.0` | Global State Management |
| `recharts` | `^2.10.4` | Analytics & Risk Visualizations |
| `clsx` / `tailwind-merge` | `^2.2.1` | Class Utility Merging |

---

### 2.3 Backend & FastAPI Microservices Stack (`requirements.txt`)
| Library / Package | Version | Layer / Module | Purpose |
|---|---|---|---|
| `fastapi` | `0.109.2` | Core Backend & Services | REST API Framework |
| `uvicorn` | `0.27.1` | Server Runtime | ASGI Web Server |
| `pydantic` | `2.6.1` | Data Validation | Request/Response Schema Validation |
| `ortools` | `9.8.3296` | AI Optimizer | Google OR-Tools VRPTW Solver |
| `scikit-learn` | `1.4.0` | ML Risk Engine | Machine Learning & Feature Transformers |
| `xgboost` | `2.0.3` | ML Risk Engine | Gradient Boosting Risk Model |
| `pandas` | `2.2.0` | Data Processing | Dataframe Processing & Synthetic Dataset |
| `numpy` | `1.26.4` | Numerical Ops | Matrix & Distance Computations |
| `google-generativeai` | `0.4.0` | Generative AI | Gemini 1.5 Flash Report & Explanation API |
| `sqlalchemy` | `2.0.27` | Database ORM | Database Object Relational Mapper |
| `psycopg2-binary` | `2.9.9` | DB Driver | PostgreSQL Database Driver |
| `python-jose[cryptography]`| `3.3.0` | Auth & Security | JWT Token Parsing & Verification |
| `passlib[bcrypt]` | `1.7.4` | Auth & Security | Password & Hash verification |
| `python-dotenv` | `1.0.1` | Environment | Environment Config Loader |
| `httpx` | `0.26.0` | Service Comm | Async HTTP Client for Inter-service Calls |
| `pytest` | `8.0.1` | Testing | Automated Testing Framework |

---

## 3. Repository Structure & Development Standards

### 3.1 Repository Structure
```text
asha-route-optimizer/
│
├── frontend/                 # Frontend Team (React + Vite)
│
├── backend/                  # Backend Team (FastAPI)
│
├── ai/                       # AI Team (ML Models & OR-Tools Solver)
│
├── shared/                   # Shared contracts & schemas
│   ├── api-contracts/
│   ├── schemas/
│   ├── constants/
│   └── types/
│
├── docs/                     # Documentation
│
├── .gitignore
├── README.md
└── LICENSE
```

---

### 3.2 Folder Ownership

#### Frontend (Owner: Gowtham)
- **Allowed to modify:** `frontend/`
- **Not allowed to modify:** `backend/`, `ai/` (except during integration phase).

#### Backend (Owner: Backend Engineer)
- **Allowed to modify:** `backend/`
- **Read-only access:** `shared/`
- **Cannot change:** `frontend/`

#### AI (Owner: AI Engineer)
- **Allowed to modify:** `ai/`
- **Read-only access:** `shared/`
- **Cannot change:** `frontend/`, `backend/`

---

### 3.3 Shared Folder Policy
The `shared/` directory belongs to all team members and serves as the single source of truth for interfaces and types:
- `shared/api-contracts/` — Open API & request/response schemas
- `shared/schemas/` — Validation schemas
- `shared/constants/` — System-wide enums and constants
- `shared/types/` — Shared TypeScript & Pydantic definitions

*Rule:* Never delete or modify anything in `shared/` without explicit team discussion and approval.

---

### 3.4 Branch Strategy
Direct pushes to `main` are strictly forbidden.

```text
main
├── frontend
├── backend
└── ai
```

For major feature branches:
- `feature/frontend-dashboard`
- `feature/backend-auth`
- `feature/ai-risk-model`

---

### 3.5 Commit Message Convention
Follow clean conventional commits:

**Allowed Prefixes:**
- `feat: add dashboard UI`
- `fix: resolve login validation bug`
- `docs: update API specification`
- `refactor: optimize route controller`
- `ai: train risk prediction model`

**Forbidden Messages:** `update`, `changes`, `final`, `done`, `fix`.

---

### 3.6 Code Style & File Naming

#### Frontend (React / JS / JSX)
- Components: `PascalCase.jsx` (e.g., `PatientCard.jsx`, `RouteMap.jsx`)
- Pages: Placed inside `/pages` (e.g., `Dashboard.jsx`, `RoutePlanner.jsx`)
- Reusable UI: Placed inside `/components`
- Variables & Functions: `camelCase`

#### Backend & AI (Python)
- Language: Python 3.11
- Naming: `snake_case` for modules, functions, and variables
- Key Files:
  - `predict_risk.py`
  - `route_service.py`
  - `patient_controller.py`
  - `optimizer.py`
  - `llm_service.py`
  - `dataset_generator.py`

---

### 3.7 Naming Consistency Rules

#### Database Keys
- `patient_id`
- `worker_id`
- `route_id`

#### REST API Endpoints
- `GET /patients`
- `POST /predict-risk`
- `POST /optimize-route`

#### JSON Keys
Always use `snake_case`:
```json
{
  "patient_id": 15,
  "risk_score": 91
}
```

---

### 3.8 Environment Variables
Every developer maintains an uncommitted local `.env` file based on `.env.example`:
```ini
DATABASE_URL=postgresql://user:pass@localhost:5432/asha_db
GEMINI_API_KEY=AIzaSy...
MAP_API_KEY=pk...
SECRET_KEY=super_secret_jwt_key_2026
```
*Rule:* Never commit `.env` files to Git repositories.

---

### 3.9 Documentation Maintenance Rules
- Whenever a new API endpoint is created/modified $\rightarrow$ update `docs/API_Specification.md`
- Whenever a database table or column changes $\rightarrow$ update `docs/Database_Schema.md`
- Whenever product requirements change $\rightarrow$ update `docs/ASHA_Route_Optimizer_AI_PRD.md`

---

### 3.10 Daily Hackathon Workflow
```text
Pull latest main
       │
       ▼
Create / checkout feature branch
       │
       ▼
Develop feature locally
       │
       ▼
Test locally against contracts
       │
       ▼
Commit with standard prefix
       │
       ▼
Push to GitHub & Open PR
       │
       ▼
Peer Review & Merge
```

---

## 4. Shared Data Types, Enums & Shared Contracts

### 4.1 Standard Enums

#### Risk Band (`RiskBand`)
```typescript
enum RiskBand {
  CRITICAL = "Critical", // Score: 80 - 100 (Red 🔴)
  HIGH     = "High",     // Score: 60 - 79  (Orange 🟠)
  MODERATE = "Moderate", // Score: 35 - 59  (Yellow 🟡)
  LOW      = "Low"       // Score: 0 - 34   (Green 🟢)
}
```

#### User Role (`UserRole`)
```typescript
enum UserRole {
  ASHA_WORKER = "asha_worker",
  SUPERVISOR  = "supervisor",
  ADMIN       = "admin"
}
```

#### Visit Status (`VisitStatus`)
```typescript
enum VisitStatus {
  SCHEDULED   = "scheduled",
  IN_PROGRESS = "in_progress",
  VISITED     = "visited",
  MISSED      = "missed",
  EMERGENCY   = "emergency"
}
```

#### Missed Visit Reason (`MissedReason`)
```typescript
enum MissedReason {
  NOT_HOME            = "not_home",
  PATIENT_REFUSED     = "patient_refused",
  UNREACHABLE_LOCATION= "unreachable_location",
  EMERGENCY_REASSIGN  = "emergency_reassign",
  OTHER               = "other"
}
```

#### Visit Type (`VisitType`)
```typescript
enum VisitType {
  ANC_CHECKUP  = "anc_checkup",
  PNC_CHECKUP  = "pnc_checkup",
  IMMUNIZATION = "immunization",
  GENERAL      = "general",
  FOLLOW_UP    = "follow_up"
}
```

#### Vaccination Status (`VaccinationStatus`)
```typescript
enum VaccinationStatus {
  UP_TO_DATE     = "up_to_date",
  DUE            = "due",
  OVERDUE        = "overdue",
  NOT_APPLICABLE = "not_applicable"
}
```

---

## 5. Response & Error Contract

### 5.1 Success Response Envelope Standard
All JSON responses from the backend API MUST follow this envelope:
```json
{
  "success": true,
  "data": {},
  "meta": {
    "timestamp": "2026-07-30T23:18:33Z",
    "request_id": "req-12345"
  }
}
```

### 5.2 Error Response Envelope Standard
All error responses MUST follow this structure:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Patient age must be a positive integer",
    "details": [
      {
        "field": "age",
        "issue": "value must be > 0"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-07-30T23:18:33Z",
    "request_id": "req-12345"
  }
}
```

### 5.3 HTTP Status Codes Map
| Status Code | Standard Code String | Scenario |
|---|---|---|
| `200 OK` | `SUCCESS` | Successful query or updates |
| `201 Created` | `CREATED` | Resource successfully created |
| `400 Bad Request` | `BAD_REQUEST` | Malformed JSON request body |
| `401 Unauthorized` | `UNAUTHORIZED` | Missing or expired JWT token |
| `403 Forbidden` | `FORBIDDEN` | Authenticated user lacks permission |
| `404 Not Found` | `NOT_FOUND` | Resource ID does not exist |
| `422 Unprocessable Entity`| `VALIDATION_ERROR` / `SOLVER_INFEASIBLE` | Schema validation error or solver constraint failure |
| `500 Internal Error` | `INTERNAL_SERVER_ERROR` | Unhandled backend exception |

---

## 6. Environment Variables & Secret Management

All environment keys MUST be present in `.env.example` across repositories:

```ini
# Backend Service Environment Variables (.env)
PORT=8000
ENVIRONMENT=development
DATABASE_URL=postgresql://user:password@localhost:5432/asha_db
JWT_SECRET=super_secret_jwt_key_2026
JWT_EXPIRATION_MINUTES=720

# AI / External Services
GEMINI_API_KEY=AIzaSy...
ML_SERVICE_URL=http://localhost:8001
OPTIMIZER_SERVICE_URL=http://localhost:8002

# Frontend (.env.development / .env.production)
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_MAP_TILE_SERVER=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

---

## 7. Git & Branching Strategy

To keep code clean and prevent breaking changes during the hackathon:
1. **Protected Main Branch:** No direct pushes to `main`.
2. **Branch Naming Convention:**
   - `feat/frontend-worker-dashboard`
   - `feat/backend-patient-api`
   - `feat/ai-risk-model`
   - `fix/route-solver-time-window`
3. **Pull Request Policy:** Minimum 1 peer review approval before merging into `main`.
