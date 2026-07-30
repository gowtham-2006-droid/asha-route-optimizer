import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, Download, Sparkles, Calendar,
  CheckCircle2, ArrowRight, HeartPulse, Navigation, Filter
} from 'lucide-react';

export default function ReportsPage({ currentUser, onNavigateToTab, onTriggerEmergency, onRegisterNewPatient }) {
  const [selectedRange, setSelectedRange] = useState('This Week');

  const reportsList = [
    { id: 'rep_101', title: 'End of Day Clinical Risk Summary', date: 'July 30, 2026', type: 'Gemini AI Summary', status: 'Generated', stopsCovered: 18, highRiskHandled: 6 },
    { id: 'rep_102', title: 'Maternal ANC & Immunization Audit', date: 'July 29, 2026', type: 'PHC Compliance', status: 'Verified', stopsCovered: 22, highRiskHandled: 5 },
    { id: 'rep_103', title: 'Weekly Route Distance & Fuel Savings', date: 'July 27, 2026', type: 'Logistics KPI', status: 'Archived', stopsCovered: 94, highRiskHandled: 28 },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fe] text-slate-900 font-sans">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-[#6c47ff] tracking-tight leading-none">ASHA Companion</h1>
              <p className="text-[11px] text-slate-400 font-medium">Empowering Rural Health</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold text-slate-600">
            <button onClick={() => onNavigateToTab('dashboard')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Home className="w-4 h-4" /><span>Dashboard</span>
            </button>
            <button onClick={() => onNavigateToTab('route')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Navigation className="w-4 h-4" /><span>My Route</span>
            </button>
            <button onClick={() => onNavigateToTab('patients')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Users className="w-4 h-4" /><span>Patients</span>
            </button>
            <button onClick={onRegisterNewPatient} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Plus className="w-4 h-4" /><span>Add Patient</span>
            </button>
            <button onClick={onTriggerEmergency} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-bold">
              <div className="flex items-center gap-3"><AlertOctagon className="w-4 h-4" /><span>Emergency</span></div>
              <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">2</span>
            </button>
            <button onClick={() => onNavigateToTab('reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
              <FileText className="w-4 h-4" /><span>Reports</span>
            </button>
            <button onClick={() => onNavigateToTab('messages')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <MessageSquare className="w-4 h-4" /><span>Messages</span>
            </button>
            <button onClick={() => onNavigateToTab('training')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <GraduationCap className="w-4 h-4" /><span>Training</span>
            </button>
            <button onClick={() => onNavigateToTab('resources')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Folder className="w-4 h-4" /><span>Resources</span>
            </button>
            <button onClick={() => onNavigateToTab('settings')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Settings className="w-4 h-4" /><span>Settings</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Reports & Clinical EOD Logs</h2>
            <p className="text-xs text-slate-500">Automated Gemini AI Summaries & PHC Performance Reports</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-600" /> PHC Ramanthapur
            </div>
            <button className="relative p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"><Bell className="w-4 h-4" /></button>
          </div>
        </header>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Top Banner Action */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#6c47ff] to-indigo-600 text-white shadow-lg shadow-purple-600/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">Gemini 1.5 Flash AI</span>
              <h3 className="text-xl font-bold mt-2">Generate Today's End-of-Day Summary</h3>
              <p className="text-xs text-purple-100 mt-1 max-w-xl">Compile all 18 visited patients, clinical observations, and high-risk ANC checkups into an executive PHC report.</p>
            </div>
            <button className="px-5 py-3 rounded-2xl bg-white text-[#6c47ff] font-extrabold text-xs hover:bg-slate-100 transition-all shadow-md shrink-0 flex items-center gap-2">
              <Sparkles className="w-4 h-4 fill-current" /> Generate EOD Report
            </button>
          </div>

          {/* Reports Table Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Archived Field Reports</h3>
              <div className="flex items-center gap-2 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-slate-700 font-medium">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>All Time</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {reportsList.map((rep) => (
                <div key={rep.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center font-bold text-sm shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{rep.title}</h4>
                      <p className="text-xs text-slate-500">{rep.date} • {rep.type} • {rep.stopsCovered} Stops Covered ({rep.highRiskHandled} High Risk)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">{rep.status}</span>
                    <button className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs">
                      <Download className="w-3.5 h-3.5 text-purple-600" /> Export PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
