import React, { useState } from 'react';
import { AlertOctagon, Zap, ShieldAlert } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel
} from './ui/alert-dialog';

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
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <AlertOctagon className="w-6 h-6 text-red-500 animate-pulse" />
          Dynamic Emergency Dispatch Alert
        </AlertDialogTitle>
        <AlertDialogDescription>
          Triggering an emergency will instantly run Google OR-Tools VRPTW solver, insert this patient as Stop #1, and re-route field workers.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <form onSubmit={handleSubmit} className="space-y-3 my-2 text-xs">
        <div>
          <label className="block font-semibold text-slate-300 mb-1">Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Emergency Clinical Description</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <div className="flex justify-between font-semibold mb-1">
            <span className="text-slate-300">Urgency Severity Rating</span>
            <span className="text-red-400 font-bold">{severity}/100 (Critical Emergency)</span>
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

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Re-Optimizing Route...' : 'Trigger Re-Routing Now'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </AlertDialog>
  );
}
