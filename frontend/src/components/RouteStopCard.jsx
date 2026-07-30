import React from 'react';
import { Clock, MapPin, Navigation, Sparkles, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function RouteStopCard({ stop, onStatusChange, onExplainRisk }) {
  const getStatusBadge = () => {
    switch (stop.status) {
      case 'visited':
        return <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Visited</span>;
      case 'missed':
        return <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1"><XCircle className="w-3 h-3" /> Missed</span>;
      case 'in_progress':
        return <span className="text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center gap-1"><Clock className="w-3 h-3 animate-spin" /> In Progress</span>;
      case 'scheduled':
      default:
        return <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">Scheduled</span>;
    }
  };

  return (
    <div className={`p-4 rounded-2xl glass-card transition-all hover:border-slate-700 ${
      stop.is_emergency ? 'border-2 border-red-500/80 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : ''
    }`}>
      {/* Header: Sequence & Risk Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
            stop.is_emergency ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-800 text-slate-200 border border-slate-700'
          }`}>
            {stop.is_emergency ? '🚨' : `#${stop.sequence}`}
          </span>
          <div>
            <h3 className="font-bold text-slate-100 text-base leading-tight flex items-center gap-2">
              {stop.patient_name}
              {stop.is_emergency && <span className="text-[10px] uppercase font-bold text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded">Emergency</span>}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-500" /> {stop.village}
            </p>
          </div>
        </div>

        <RiskBadge band={stop.risk_band} score={stop.risk_score} />
      </div>

      {/* Details Row: ETA, Distance, Visit Type */}
      <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-2.5 rounded-xl text-xs mb-3 border border-slate-800/80">
        <div>
          <span className="text-slate-500 block text-[10px]">ETA</span>
          <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3 text-sky-400" /> {stop.estimated_arrival}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">Distance</span>
          <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
            <Navigation className="w-3 h-3 text-indigo-400" /> {stop.distance_km} km
          </span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">Visit Type</span>
          <span className="font-semibold text-slate-200 uppercase text-[10px] mt-0.5 block truncate">
            {stop.visit_type.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Action Buttons & Status */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
        <div>{getStatusBadge()}</div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onExplainRisk(stop.patient_id)}
            className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors border border-indigo-500/20 text-xs flex items-center gap-1"
            title="Explain AI Priority"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">AI Info</span>
          </button>

          {stop.status !== 'visited' && (
            <button
              onClick={() => onStatusChange(stop.stop_id, 'visited')}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-sm"
            >
              <CheckCircle className="w-3.5 h-3.5" /> Visit
            </button>
          )}

          {stop.status !== 'missed' && (
            <button
              onClick={() => onStatusChange(stop.stop_id, 'missed')}
              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors"
            >
              Missed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
