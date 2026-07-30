import React, { useState } from 'react';
import { Sparkles, AlertTriangle, TrendingUp, Navigation, Clock, CheckCircle2, MapPin, Volume2, Search, Zap, Plus, PhoneCall } from 'lucide-react';
import RouteMap from './RouteMap';
import RiskBadge from './RiskBadge';

export default function WorkerDashboard({
  stops,
  workerLocation,
  currentUser,
  currentLanguage,
  onStatusChange,
  onExplainRisk,
  onTriggerEmergency,
  onRegisterNewPatient
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const completedCount = stops.filter(s => s.status === 'visited').length;
  const totalKm = stops.reduce((acc, s) => acc + s.distance_km, 0).toFixed(1);
  const efficiencyScore = Math.round(((completedCount + 1) / (stops.length + 1)) * 100) || 94;

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Hero / System Status Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome & System Status Card */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-white/80">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(78,222,163,0.8)] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Live AI Dispatch Active</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {currentLanguage === 'TE' ? 'సిస్టమ్ క్రియాశీలంగా ఉంది.' : currentLanguage === 'HI' ? 'सिस्टम सक्रिय है।' : 'System Active.'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mt-2 leading-relaxed">
              AI is currently optimizing live rural routes for <strong>{MOCK_WORKER_NAME(currentUser)}</strong> across <strong>Ramanthapur Circle</strong>.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200">
              <span className="text-xs font-bold text-indigo-900">Network Stable • 4G</span>
            </div>
            <div className="flex items-center gap-2 bg-red-50 px-3.5 py-1.5 rounded-full border border-red-200">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span className="text-xs font-bold text-red-800">2 High-Risk ANC Checkups Today</span>
            </div>
          </div>
        </div>

        {/* AI Optimization Score Circular Gauge Widget */}
        <div className="glass-panel glass-panel-interactive rounded-3xl p-6 flex flex-col items-center justify-center relative bg-white/80 shadow-sm">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider absolute top-6 left-6">
            AI Optimization Score
          </h3>
          
          <div className="relative w-32 h-32 mt-4 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-indigo-100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-indigo-600"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${efficiencyScore}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-indigo-700">{efficiencyScore}%</span>
            </div>
          </div>

          <p className="text-xs text-emerald-700 font-bold mt-4 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +2.4% vs traditional manual routing
          </p>
        </div>
      </section>

      {/* Main Interactive Map & Route Trajectories Section */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[550px]">
        {/* Large Interactive Map Island */}
        <div className="lg:col-span-3 glass-panel rounded-3xl overflow-hidden relative flex flex-col bg-white/90">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-600 animate-pulse" />
              <h3 className="text-base font-bold text-slate-900">Live Field Trajectories — Ramanthapur Sector</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={onRegisterNewPatient}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add Patient
              </button>
            </div>
          </div>

          <div className="flex-1 relative min-h-[420px]">
            <RouteMap
              stops={stops}
              workerLocation={workerLocation}
              onExplainRisk={onExplainRisk}
            />
          </div>
        </div>

        {/* Side Column: Route Stats & Quick Actions */}
        <div className="flex flex-col gap-6">
          {/* Route Metrics Card */}
          <div className="glass-panel glass-panel-interactive rounded-3xl p-5 bg-white/80 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Shift Metrics</h3>
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-600">Total Distance</span>
                <span className="font-extrabold text-indigo-700 text-sm">{totalKm} km</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-600">Est. Duration</span>
                <span className="font-extrabold text-indigo-700 text-sm">3h 30m</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-600">Completed Visits</span>
                <span className="font-extrabold text-emerald-700 text-sm">{completedCount}/{stops.length}</span>
              </div>
            </div>

            <button
              onClick={onTriggerEmergency}
              className="w-full py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <AlertTriangle className="w-4 h-4" /> Trigger Emergency Dispatch
            </button>
          </div>

          {/* Activity Feed Card */}
          <div className="glass-panel rounded-3xl p-5 bg-white/80 flex-1 flex flex-col">
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-4">
              Real-Time Route Logs
            </h3>
            <div className="space-y-3 overflow-y-auto max-h-56 pr-1 text-xs">
              <div className="flex items-start gap-3 pl-2 border-l-2 border-indigo-500">
                <div>
                  <p className="font-bold text-slate-900">Google OR-Tools VRPTW Solver Executed</p>
                  <p className="text-[10px] text-slate-500">Auto-prioritized 2 critical ANC checkups</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pl-2 border-l-2 border-emerald-500">
                <div>
                  <p className="font-bold text-slate-900">Lakshmi Devi Checked In</p>
                  <p className="text-[10px] text-slate-500">GPS coords locked at Ramanthapur Hub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Priority Visits Cards Section */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Active Route Priorities ({stops.length})</h3>
          <span className="text-xs text-slate-500">Optimized by XGBoost & OR-Tools</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stops.map((stop) => (
            <div
              key={stop.stop_id}
              className={`glass-panel glass-panel-interactive rounded-3xl p-5 flex flex-col justify-between space-y-4 border ${
                stop.is_emergency ? 'bg-red-50/80 border-red-300 shadow-md' : 'bg-white/90 border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs text-white shadow-sm ${
                    stop.is_emergency ? 'bg-red-600' : stop.status === 'visited' ? 'bg-emerald-600' : 'bg-indigo-600'
                  }`}>
                    {stop.is_emergency ? '🚨' : `#${stop.sequence}`}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{stop.patient_name}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> {stop.village}
                    </p>
                  </div>
                </div>
                <RiskBadge band={stop.risk_band} score={stop.risk_score} />
              </div>

              <div className="h-px bg-slate-200 w-full" />

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Estimated Arrival</span>
                  <span className="font-bold text-slate-900">{stop.estimated_arrival}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Distance</span>
                  <span className="font-bold text-indigo-700">{stop.distance_km} km</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <button
                  onClick={() => onExplainRisk(stop.patient_id)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> AI Info
                </button>

                <button
                  onClick={() => onStatusChange(stop.stop_id, stop.status === 'visited' ? 'scheduled' : 'visited')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1 ${
                    stop.status === 'visited' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> {stop.status === 'visited' ? 'Visited' : 'Mark Visited'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MOCK_WORKER_NAME(currentUser) {
  return currentUser?.name || 'Lakshmi Devi';
}
