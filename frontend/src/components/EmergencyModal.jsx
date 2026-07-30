import React, { useState } from 'react';
import { AlertOctagon, X, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function EmergencyModal({ isOpen, onClose, onSimulateEmergency }) {
  const [patientName, setPatientName] = useState('Kavitha Sharma');
  const [description, setDescription] = useState('Severe postpartum hemorrhaging (4 days post-delivery)');
  const [severity, setSeverity] = useState(98);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSimulateEmergency({
        patient_name: patientName,
        description,
        severity
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-red-500/50 rounded-3xl max-w-lg w-full p-6 shadow-2xl shadow-red-950/50 relative overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Dynamic Emergency Dispatch</h2>
              <p className="text-xs text-red-400 font-medium">OR-Tools Live Route Re-Optimization</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Emergency Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Urgency Severity Score</span>
              <span className="text-red-400 font-bold">{severity}/100 (Critical)</span>
            </div>
            <input
              type="range"
              min={80}
              max={100}
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
              className="w-full accent-red-500 bg-slate-950"
            />
          </div>

          <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-xl text-xs text-red-300 space-y-1">
            <p className="font-semibold flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Re-Optimization Impact:</p>
            <p>Google OR-Tools VRPTW solver will recalculate time windows, insert this patient as Stop #1, and displace non-urgent visits if required.</p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center gap-2"
            >
              {isSubmitting ? <Zap className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
              {isSubmitting ? 'Re-Optimizing Route...' : 'Trigger Re-Routing Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
