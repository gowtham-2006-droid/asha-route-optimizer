import React, { useState } from 'react';
import { Users, AlertTriangle, CheckCircle, ShieldAlert, FileText, Sparkles, Navigation, UserCheck, MapPin } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { MOCK_SUPERVISOR_KPIS, MOCK_PATIENTS, MOCK_ROUTE_STOPS } from '../services/mockData';
import RiskBadge from './RiskBadge';
import RouteMap from './RouteMap';

export default function SupervisorDashboard({ onGenerateReport }) {
  const [selectedWorkerId, setSelectedWorkerId] = useState('usr_w101');
  const [supervisorTab, setSupervisorTab] = useState('tracking');

  const kpis = MOCK_SUPERVISOR_KPIS;

  const workers = [
    { id: 'usr_w101', name: 'Lakshmi Devi', village: 'Ramanthapur Sector 1', stops: MOCK_ROUTE_STOPS, location: { latitude: 17.3950, longitude: 78.5300 } },
    {
      id: 'usr_w102',
      name: 'Radhika Sharma',
      village: 'Uppal Main Road',
      location: { latitude: 17.4020, longitude: 78.5610 },
      stops: [
        { stop_id: 'w2_s1', sequence: 1, patient_name: 'Sarita Devi', village: 'Uppal Main Road', latitude: 17.4020, longitude: 78.5610, risk_score: 78, risk_band: 'High', estimated_arrival: '09:30 AM', distance_km: 1.2, status: 'visited' },
        { stop_id: 'w2_s2', sequence: 2, patient_name: 'Latha Rao', village: 'Uppal Colony', latitude: 17.4050, longitude: 78.5650, risk_score: 45, risk_band: 'Moderate', estimated_arrival: '10:15 AM', distance_km: 1.8, status: 'scheduled' }
      ]
    },
    {
      id: 'usr_w103',
      name: 'Sunitha Kumar',
      village: 'Habsiguda Colony',
      location: { latitude: 17.4090, longitude: 78.5460 },
      stops: [
        { stop_id: 'w3_s1', sequence: 1, patient_name: 'Meena Kumari', village: 'Habsiguda Colony', latitude: 17.4090, longitude: 78.5460, risk_score: 38, risk_band: 'Moderate', estimated_arrival: '09:45 AM', distance_km: 2.1, status: 'scheduled' }
      ]
    }
  ];

  const currentWorker = workers.find(w => w.id === selectedWorkerId) || workers[0];

  const riskDistributionData = [
    { name: 'Critical', count: kpis.critical_risk_patients, color: '#ef4444' },
    { name: 'High', count: kpis.high_risk_patients, color: '#f97316' },
    { name: 'Moderate', count: kpis.moderate_risk_patients, color: '#eab308' },
    { name: 'Low', count: kpis.low_risk_patients, color: '#22c55e' }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Role Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              PHC Supervisor Command Center <Sparkles className="w-5 h-5 text-indigo-400" />
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
              Multi-Worker Oversight
            </span>
          </div>
          <p className="text-xs text-slate-400">
            PHC Ramanthapur Circle • Live GPS Tracking & Route Compliance Oversight
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setSupervisorTab('tracking')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              supervisorTab === 'tracking' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Navigation className="w-4 h-4" /> Live Worker Routes
          </button>

          <button
            onClick={() => setSupervisorTab('analytics')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              supervisorTab === 'analytics' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> Catchment Analytics
          </button>

          <button
            onClick={onGenerateReport}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <FileText className="w-4 h-4" /> EOD Report
          </button>
        </div>
      </div>

      {supervisorTab === 'tracking' ? (
        /* SUPERVISOR LIVE MULTI-WORKER TRACKING VIEW */
        <div className="space-y-6">
          {/* Worker Selector Bar */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300">Select Field Worker to Monitor:</span>
              <div className="flex flex-wrap gap-2">
                {workers.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWorkerId(w.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      selectedWorkerId === w.id
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{w.name}</span>
                    <span className="text-[10px] opacity-75">({w.village.split(' ')[0]})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-sky-400 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Active Sector: <strong>{currentWorker.village}</strong>
            </div>
          </div>

          {/* Supervisor Split Screen: Worker Route Card & Leaflet Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">{currentWorker.name}'s Route Schedule</h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    Active On Field
                  </span>
                </div>
                <p className="text-xs text-slate-400">Assigned Sector: {currentWorker.village}</p>
              </div>

              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {currentWorker.stops.map((stop) => (
                  <div key={stop.stop_id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-sky-600/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold text-xs">
                        #{stop.sequence}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs">{stop.patient_name}</h4>
                        <span className="text-[10px] text-slate-400 block">{stop.village} • ETA {stop.estimated_arrival}</span>
                      </div>
                    </div>
                    <RiskBadge band={stop.risk_band} score={stop.risk_score} />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 h-[500px]">
              <RouteMap
                stops={currentWorker.stops}
                workerLocation={currentWorker.location}
                onExplainRisk={() => {}}
              />
            </div>
          </div>
        </div>
      ) : (
        /* SUPERVISOR CATCHMENT ANALYTICS VIEW */
        <div className="space-y-6">
          {/* KPI Tiles Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl glass-card">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Total Patients</span>
                <Users className="w-4 h-4 text-sky-400" />
              </div>
              <p className="text-2xl font-bold text-white">{kpis.total_patients}</p>
              <span className="text-[10px] text-emerald-400 font-medium">+4 registered this week</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border-red-500/30">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Critical Risk</span>
                <ShieldAlert className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-2xl font-bold text-red-400">{kpis.critical_risk_patients}</p>
              <span className="text-[10px] text-red-400/80 font-medium">Requires Priority Route 1</span>
            </div>

            <div className="p-4 rounded-2xl glass-card">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Visits Completed</span>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-emerald-400">{kpis.completed_visits_today}/{kpis.scheduled_visits_today}</p>
              <span className="text-[10px] text-emerald-400 font-medium">{kpis.route_compliance_rate}% Route Compliance</span>
            </div>

            <div className="p-4 rounded-2xl glass-card">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Emergencies Today</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-amber-400">{kpis.emergencies_today}</p>
              <span className="text-[10px] text-amber-400/80 font-medium">Auto Re-Optimized by OR-Tools</span>
            </div>
          </div>

          {/* Analytics Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass-card space-y-3">
              <h3 className="font-bold text-slate-200 text-sm">Patient Urgency Risk Breakdown</h3>
              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskDistributionData}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-card space-y-3">
              <h3 className="font-bold text-slate-200 text-sm">High-Risk Priority Roster</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {MOCK_PATIENTS.map((patient) => (
                  <div key={patient.patient_id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-white text-xs">{patient.name}</h4>
                      <p className="text-[10px] text-slate-400">{patient.village} • {patient.visit_type.replace('_', ' ')}</p>
                    </div>
                    <RiskBadge band={patient.risk_band} score={patient.risk_score} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
