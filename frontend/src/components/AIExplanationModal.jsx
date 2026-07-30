import React from 'react';
import { Sparkles, X, BrainCircuit, Bot } from 'lucide-react';
import { MOCK_AI_EXPLANATIONS, MOCK_PATIENTS } from '../services/mockData';
import RiskBadge from './RiskBadge';

export default function AIExplanationModal({ patientId, onClose }) {
  if (!patientId) return null;

  const patient = MOCK_PATIENTS.find(p => p.patient_id === patientId) || MOCK_PATIENTS[0];
  const explanation = MOCK_AI_EXPLANATIONS[patientId] ||
    `${patient.name} is prioritized as **${patient.risk_band} (Score: ${patient.risk_score})** due to clinical flags including ${patient.chronic_disease_flags?.join(', ') || 'due checkup schedule'}.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl shadow-indigo-950/50 relative">
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Sparkles className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Gemini AI Priority Explanation</h2>
              <p className="text-xs text-indigo-400 font-medium">Explainable Machine Learning Rationale</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Patient Summary Card */}
        <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-sm">{patient.name}</h3>
            <p className="text-xs text-slate-400">{patient.village} • Age {patient.age}</p>
          </div>
          <RiskBadge band={patient.risk_band} score={patient.risk_score} />
        </div>

        {/* Gemini Explanation Content */}
        <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/50 text-indigo-100 text-sm leading-relaxed space-y-3 mb-5">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <Bot className="w-4 h-4" /> AI Healthcare Insights
          </div>
          <p className="text-slate-200" dangerouslySetInnerHTML={{
            __html: explanation.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-300">$1</strong>')
          }} />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
