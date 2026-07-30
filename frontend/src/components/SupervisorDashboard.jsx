import React from 'react';
import { Users, AlertTriangle, CheckCircle, ShieldAlert, FileText, Download, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { MOCK_SUPERVISOR_KPIS, MOCK_PATIENTS } from '../services/mockData';
import RiskBadge from './RiskBadge';

export default function SupervisorDashboard({ onGenerateReport }) {
  const kpis = MOCK_SUPERVISOR_KPIS;

  const riskDistributionData = [
    { name: 'Critical', count: kpis.critical_risk_patients, color: '#ef4444' },
    { name: 'High', count: kpis.high_risk_patients, color: '#f97316' },
    { name: 'Moderate', count: kpis.moderate_risk_patients, color: '#eab308' },
    { name: 'Low', count: kpis.low_risk_patients, color: '#22c55e' }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Generate EOD Report Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/20">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            PHC Supervisor Command Center <Sparkles className="w-5 h-5 text-indigo-400" />
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-Time Risk Monitoring & Field Route Performance — Ramanthapur Circle
          </p>
        </div>

        <button
          onClick={onGenerateReport}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
        >
          <FileText className="w-4 h-4" /> Generate Gemini EOD Report ✨
        </button>
      </div>

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
        {/* Risk Distribution Bar Chart */}
        <div className="p-5 rounded-2xl glass-card space-y-3">
          <h3 className="font-bold text-slate-200 text-sm">Patient Urgency Risk Breakdown</h3>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistributionData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* High Risk Focus List */}
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
  );
}
