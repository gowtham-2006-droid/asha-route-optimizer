# ASHA Route Optimizer AI — Team Assignment & Development Contract

**Project:** ASHA Route Optimizer AI  
**Theme:** Smart Automation (Idea2Impact 2026 — Hyderabad Finale)  
**Build Duration:** 2-Day Hackathon MVP  
**Document Version:** 1.1  
**Status:** Finalized & Approved  

---

## 1. Member Roles & Ownership Matrix

| Role | Member Name | Mission | Folder Ownership | Primary Deliverables |
|---|---|---|---|---|
| **Frontend & Integration Lead** | **Gowtham** | Build complete UI and integrate REST APIs | `frontend/` | Responsive UI, API Integration, Demo polish |
| **Backend Engineer** | **Member 2** | Build application backend, DB & expose APIs | `backend/` | Working REST API, Database, AI Gateway layer |
| **AI Engineer** | **Member 3** | Develop ML, OR-Tools solver & Gemini LLM | `ai/` | Trained ML model, VRPTW Optimizer, LLM service |

---

## 2. Detailed Member Specifications

### 2.1 Member 1 — Frontend & Integration Lead (Gowtham)

#### Mission
Build the complete user interface and integrate all backend APIs.

#### Responsibilities
- React + Tailwind project setup
- Authentication screens (Phone OTP modal/page)
- Worker & Supervisor Dashboard
- Patient Management UI (Table, Search, Filter)
- Patient Details View
- Route Map (`MapView.jsx` via Leaflet)
- Emergency Alert UI (Floating Action Button + Modal)
- Reports & Analytics (Recharts KPI tiles + EOD report view)
- Loading, Empty, and Error states
- Axios API integration with backend endpoints
- Final UI polish & Demo support

#### Folder Ownership
```text
frontend/
```

#### Deliverables
- Responsive UI matching PRD & design guidelines
- Complete API integration with fallback mock data layer
- Ready-for-demo web application

#### Depends On
- [`docs/API_SPECIFICATION.md`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/docs/API_SPECIFICATION.md)
- Backend APIs (`/api/v1/*`)

---

### 2.2 Member 2 — Backend Engineer

#### Mission
Build the application backend and expose APIs.

#### Responsibilities
- FastAPI project setup & architecture
- Database schema setup (PostgreSQL + SQLAlchemy) matching [`docs/DATABASE_SCHEMA.md`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/docs/DATABASE_SCHEMA.md)
- Authentication (`/auth/request-otp`, `/auth/verify-otp`, JWT middleware)
- Patient Management CRUD APIs (`/patients`)
- Worker Management APIs (`/workers`)
- Route APIs (`/routes/optimize`, `/routes/emergency-reroute`)
- Emergency dispatch APIs (`/emergencies`)
- Report APIs (`/ai/generate-report`, `/reports`)
- Connecting AI microservice modules
- Global error handling & Pydantic request/response validation

#### Folder Ownership
```text
backend/
```

#### Deliverables
- Fully tested REST API gateway
- PostgreSQL Database & migration scripts (`schema.sql`)
- Orchestration layer for AI microservices

#### Depends On
- [`docs/DATABASE_SCHEMA.md`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/docs/DATABASE_SCHEMA.md)
- AI module interfaces (`ai/`)

---

### 2.3 Member 3 — AI Engineer

#### Mission
Develop all AI capabilities across Machine Learning, Route Optimization, and Generative AI.

#### Module Breakdown

##### Module 1 — Risk Prediction
- Generate rule-weighted synthetic dataset (`generate_dataset.py`) — 3,000+ rows
- Feature engineering & one-hot encoding
- Train XGBoost / RandomForest risk regressor (`train_model.py`)
- Export model artifacts (`risk_model.pkl`)
- Expose risk prediction microservice (`POST /predict-risk`)

##### Module 2 — Route Optimization
- Implement Google OR-Tools VRPTW solver (`optimizer.py`)
- Multi-worker routing support
- Time-window constraints & disjunction penalties
- Live emergency re-routing algorithm (`POST /emergency-reroute`) displacing low-priority visits

##### Module 3 — LLM Integration
- Gemini 1.5 Flash API integration (`llm_service.py`)
- AI priority explanations (`POST /ai/explain-priority`)
- Daily supervisor report generator (`POST /ai/generate-report`)

#### Folder Ownership
```text
ai/
```

#### Deliverables
- Trained ML risk prediction model & pipeline
- Google OR-Tools VRPTW optimizer engine
- Gemini LLM explanation & report service

#### Depends On
- Shared input/output schemas in [`docs/API_SPECIFICATION.md`](file:///c:/Users/MSI/Desktop/asha-route-optimizer/docs/API_SPECIFICATION.md)
- Backend gateway integration

---

## 3. Integration & Inter-Service Architecture

```text
Frontend (React)
    │
    ▼ (HTTP / JSON REST API calls)
Backend (FastAPI Gateway)
    │
 ┌──┴────────────────────────┐
 │                           │
 ▼                           ▼
Database (PostgreSQL)      AI Services (Python)
                           ├── predict_risk() [XGBoost]
                           ├── optimize_route() [OR-Tools VRPTW]
                           └── generate_report() [Gemini 1.5 Flash]
```

---

## 4. Team Execution Protocols

### 4.1 Daily Standup & Sync Protocol
Every developer answers 4 key questions during daily syncs:
1. What did I finish?
2. What am I working on next?
3. Am I blocked by anything?
4. Do I need any API contract or schema changes?

---

### 4.2 Merge Rules
- **Protected Main Branch:** Never merge directly to `main`.
- **Pre-PR Testing:** Test feature branch locally before opening a Pull Request.
- **Contract Change Notice:** Notify teammates before altering any shared contract in `shared/` or `docs/`.
- **Peer Review Required:** Minimum 1 peer review approval before merging into `main`.

---

### 4.3 Definition of Done
A task is considered **DONE** only when:
- [x] It strictly matches the PRD requirements.
- [x] It adheres to the API specification & JSON envelope schemas.
- [x] It passes local runtime tests cleanly.
- [x] It integrates seamlessly with dependent modules.
- [x] It is committed with standard conventional commit messages (`feat:`, `fix:`, `ai:`, `docs:`).

---

## 5. Hackathon Immediate Kickoff Plan

### 💻 Gowtham (Frontend)
1. Initialize React project (`frontend/`) with Vite.
2. Configure Tailwind CSS & Lucide icons.
3. Build base layout shell (Navbar, Sidebar, Container).
4. Construct initial UI screens with mock data layer.

### 💻 Backend Engineer
1. Initialize FastAPI app (`backend/`).
2. Run database migration script (`schema.sql`).
3. Implement JWT Auth endpoints.
4. Build Patient CRUD API endpoints.

### 🤖 AI Engineer
1. Execute synthetic dataset generator script (3,000+ rows).
2. Train initial XGBoost risk prediction model.
3. Construct Google OR-Tools route optimizer baseline.
