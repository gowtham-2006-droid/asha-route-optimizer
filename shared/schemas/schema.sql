-- ASHA Route Optimizer AI — PostgreSQL Schema DDL

CREATE TABLE IF NOT EXISTS phcs (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    phone VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('asha_worker', 'supervisor', 'admin')),
    phc_id VARCHAR(50) REFERENCES phcs(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS workers (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) UNIQUE REFERENCES users(id),
    assigned_village VARCHAR(100) NOT NULL,
    daily_max_visits INT DEFAULT 10,
    current_latitude DECIMAL(9,6),
    current_longitude DECIMAL(9,6),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('female', 'male', 'other')),
    phone VARCHAR(15),
    village VARCHAR(100) NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    is_pregnant BOOLEAN DEFAULT FALSE,
    trimester INT DEFAULT 0,
    high_risk_pregnancy BOOLEAN DEFAULT FALSE,
    newborn_age_days INT DEFAULT 0,
    vaccination_status VARCHAR(20) DEFAULT 'up_to_date',
    days_overdue INT DEFAULT 0,
    chronic_disease_flags JSONB DEFAULT '[]'::jsonb,
    previous_missed_visits INT DEFAULT 0,
    visit_type VARCHAR(30) NOT NULL,
    last_visit_days_ago INT DEFAULT 0,
    assigned_worker_id VARCHAR(50) REFERENCES workers(id),
    phc_id VARCHAR(50) REFERENCES phcs(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS risk_scores (
    id VARCHAR(50) PRIMARY KEY,
    patient_id VARCHAR(50) REFERENCES patients(id),
    risk_score INT NOT NULL CHECK (risk_score BETWEEN 0 AND 100),
    risk_band VARCHAR(20) NOT NULL CHECK (risk_band IN ('Critical', 'High', 'Moderate', 'Low')),
    top_contributing_factors JSONB,
    explanation_text TEXT,
    calculated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS routes (
    id VARCHAR(50) PRIMARY KEY,
    worker_id VARCHAR(50) REFERENCES workers(id),
    route_date DATE NOT NULL,
    total_distance_km DECIMAL(6,2) NOT NULL,
    total_duration_minutes INT NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS route_stops (
    id VARCHAR(50) PRIMARY KEY,
    route_id VARCHAR(50) REFERENCES routes(id),
    patient_id VARCHAR(50) REFERENCES patients(id),
    sequence_number INT NOT NULL,
    estimated_arrival VARCHAR(10) NOT NULL,
    estimated_departure VARCHAR(10) NOT NULL,
    travel_time_minutes INT NOT NULL,
    distance_km DECIMAL(5,2) NOT NULL,
    is_emergency BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'scheduled'
);

CREATE TABLE IF NOT EXISTS visits (
    id VARCHAR(50) PRIMARY KEY,
    route_stop_id VARCHAR(50) REFERENCES route_stops(id),
    patient_id VARCHAR(50) REFERENCES patients(id),
    worker_id VARCHAR(50) REFERENCES workers(id),
    visit_type VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('visited', 'missed')),
    missed_reason VARCHAR(50),
    clinical_notes TEXT,
    visited_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS emergencies (
    id VARCHAR(50) PRIMARY KEY,
    patient_id VARCHAR(50) REFERENCES patients(id),
    worker_id VARCHAR(50) REFERENCES workers(id),
    severity_score INT DEFAULT 95,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'triggered',
    triggered_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(50) PRIMARY KEY,
    worker_id VARCHAR(50) REFERENCES workers(id),
    phc_id VARCHAR(50) REFERENCES phcs(id),
    report_date DATE NOT NULL,
    summary_title VARCHAR(150) NOT NULL,
    report_text TEXT NOT NULL,
    metrics_json JSONB NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_patients_worker_id ON patients(assigned_worker_id);
CREATE INDEX IF NOT EXISTS idx_patients_village ON patients(village);
CREATE INDEX IF NOT EXISTS idx_risk_scores_patient_id ON risk_scores(patient_id, calculated_at DESC);
CREATE INDEX IF NOT EXISTS idx_route_stops_route_id ON route_stops(route_id, sequence_number);
CREATE INDEX IF NOT EXISTS idx_visits_worker_date ON visits(worker_id, visited_at);
