import React, { useState } from 'react';
import { FileText, X, Sparkles, Download, CheckCircle2, Bot } from 'lucide-react';
import { MOCK_WORKER } from '../services/mockData';

export default function ReportModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const reportText = `### Daily Field Visit Summary Report
**Date:** 30th July 2026  
**PHC catchment:** Ramanthapur Circle  
**Assigned ASHA Worker:** ${MOCK_WORKER.name} (${MOCK_WORKER.user_id})  

---

#### 📌 Key Operational Highlights
- **Total Scheduled Visits:** 6 Planned
- **Completed Visits:** 5 Visited (83.3% Coverage)
- **High-Risk ANC Checkups Handled:** 2 Critical Patients (Sunitha Rao, Anitha Kumar)
- **Emergencies Handled:** 1 Emergency Dispatch (Kavitha Sharma — severe postpartum hemorrhage)
- **Displaced/Rescheduled Visit:** 1 Moderate Patient (Priyanka Reddy — moved to 31st July Morning)

---

#### 🧠 Gemini AI Plain-English Analysis
ASHA Worker Lakshmi Devi achieved high route compliance today in Ramanthapur Sector 1 & Habsiguda. The Google OR-Tools VRPTW solver successfully re-optimized her route at 11:30 AM to prioritize an emergency postpartum hemorrhage visit for Kavitha Sharma, dropping a low-risk general visit without breaching ANC critical time windows.

#### 🎯 Supervisor Recommendations
1. Re-assign Priyanka Reddy for 31st July 09:30 AM ANC checkup.
2. Confirm blood hemoglobin levels for Sunitha Rao with PHC laboratory.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl shadow-emerald-950/50 relative max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Gemini End-of-Day Report</h2>
              <p className="text-xs text-emerald-400 font-medium">Auto-Generated Plain-English Summary</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-xs text-slate-200 leading-relaxed font-mono bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-sans font-bold text-xs uppercase">
            <Sparkles className="w-4 h-4 text-emerald-400" /> AI Executive Summary
          </div>
          <div className="whitespace-pre-line font-sans text-slate-200 text-sm">
            {reportText}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-2">
          <span className="text-xs text-slate-400">Generated for PHC Medical Officer</span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Report'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
