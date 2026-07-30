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
    { name: 'Critical', count: kpis.critical_risk_patients, color: '#dc2626' },
    { name: 'High', count: kpis.high_risk_patients, color: '#ea580c' },
    { name: 'Moderate', count: kpis.moderate_risk_patients, color: '#d97706' },
    { name: 'Low', count: kpis.low_risk_patients, color: '#16a34a' }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Role Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              PHC Supervisor Command Center <Sparkles className="w-5 h-5 text-indigo-600" />
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300 text-xs font-bold">
              Multi-Worker Oversight
            </span>
          </div>
          <p className="text-xs text-slate-500">
            PHC Ramanthapur Circle • Live GPS Tracking & Route Compliance Oversight
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setSupervisorTab('tracking')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              supervisorTab === 'tracking' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200'
            }`}
          >
            <Navigation className="w-4 h-4" /> Live Worker Routes
          </button>

          <button
            onClick={() => setSupervisorTab('analytics')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              supervisorTab === 'analytics' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" /> Catchment Analytics
          </button>

          <button
            onClick={onGenerateReport}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <FileText className="w-4 h-4" /> EOD Report
          </button>
        </div>
      </div>

      {supervisorTab === 'tracking' ? (
        /* SUPERVISOR LIVE MULTI-WORKER TRACKING VIEW */
        <div className="space-y-6">
          {/* Worker Selector Bar */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Select Field Worker to Monitor:</span>
              <div className="flex flex-wrap gap-2">
                {workers.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWorkerId(w.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedWorkerId === w.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{w.name}</span>
                    <span className="text-[10px] opacity-80">({w.village.split(' ')[0]})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-blue-700 font-bold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" /> Active Sector: <strong>{currentWorker.village}</strong>
            </div>
          </div>

          {/* Supervisor Split Screen: Worker Route Card & Leaflet Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{currentWorker.name}'s Route Schedule</h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                    Active On Field
                  </span>
                </div>
                <p className="text-xs text-slate-500">Assigned Sector: {currentWorker.village}</p>
              </div>

              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {currentWorker.stops.map((stop) => (
                  <div key={stop.stop_id} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 border border-blue-300 flex items-center justify-center font-bold text-xs">
                        #{stop.sequence}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{stop.patient_name}</h4>
                        <span className="text-[10px] text-slate-500 block">{stop.village} • ETA {stop.estimated_arrival}</span>
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
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold">Total Patients</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{kpis.total_patients}</p>
              <span className="text-[10px] text-emerald-700 font-bold">+4 registered this week</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-red-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold">Critical Risk</span>
                <ShieldAlert className="w-4 h-4 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{kpis.critical_risk_patients}</p>
              <span className="text-[10px] text-red-700 font-bold">Requires Priority Route 1</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold">Visits Completed</span>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-emerald-700">{kpis.completed_visits_today}/{kpis.scheduled_visits_today}</p>
              <span className="text-[10px] text-emerald-700 font-bold">{kpis.route_compliance_rate}% Route Compliance</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold">Emergencies Today</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-amber-600">{kpis.emergencies_today}</p>
              <span className="text-[10px] text-amber-700 font-bold">Auto Re-Optimized by OR-Tools</span>
            </div>
          </div>

          {/* Analytics Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Patient Urgency Risk Breakdown</h3>
              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskDistributionData}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a' }} />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">High-Risk Priority Roster</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {MOCK_PATIENTS.map((patient) => (
                  <div key={patient.patient_id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{patient.name}</h4>
                      <p className="text-[10px] text-slate-500">{patient.village} • {patient.visit_type.replace('_', ' ')}</p>
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
