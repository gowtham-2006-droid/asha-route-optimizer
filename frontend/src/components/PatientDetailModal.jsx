import React from 'react';
import { X, User, Activity, MapPin, Calendar, Heart, ShieldAlert, CheckCircle2 } from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function PatientDetailModal({ patient, onClose }) {
  if (!patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">{patient.name}</h3>
              <p className="text-xs text-slate-400 font-mono">{patient.patient_id} • Age {patient.age} ({patient.gender})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Risk Summary Banner */}
        <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 mb-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Current Urgency Score</span>
            <span className="text-xl font-bold text-white">{patient.risk_score}/100</span>
          </div>
          <RiskBadge band={patient.risk_band} score={patient.risk_score} />
        </div>

        {/* Clinical Breakdown Grid */}
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div>
              <span className="text-slate-500 block text-[10px]">Village Sector</span>
              <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" /> {patient.village}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px]">Care Category</span>
              <span className="font-semibold text-slate-200 uppercase mt-0.5 block">
                {patient.visit_type.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1.5">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Maternal / Pediatric Status</span>
            {patient.is_pregnant ? (
              <p className="text-slate-200 font-semibold flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-pink-400" /> Pregnant — Trimester {patient.trimester}
                {patient.high_risk_pregnancy && <span className="text-red-400 font-bold ml-1">(High Risk)</span>}
              </p>
            ) : patient.newborn_age_days > 0 ? (
              <p className="text-slate-200 font-semibold">Newborn — {patient.newborn_age_days} Days Old</p>
            ) : (
              <p className="text-slate-400">General Adult Health Care</p>
            )}
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Chronic Flags & History</span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {patient.chronic_disease_flags?.length > 0 ? (
                patient.chronic_disease_flags.map(f => (
                  <span key={f} className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-semibold uppercase text-[10px]">
                    {f}
                  </span>
                ))
              ) : (
                <span className="text-slate-500">No chronic diseases flagged</span>
              )}
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Vaccination & Visit Tracking</span>
            <p className="text-slate-300">Vaccination: <strong className="capitalize">{patient.vaccination_status.replace('_', ' ')}</strong></p>
            <p className="text-slate-300">Days Overdue: <strong>{patient.days_overdue} days</strong></p>
            <p className="text-slate-300">Last Visit: <strong>{patient.last_visit_days_ago} days ago</strong></p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800 mt-4">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
