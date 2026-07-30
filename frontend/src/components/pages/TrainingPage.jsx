import React from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, PlayCircle, BookOpen, CheckCircle, HeartPulse, Navigation
} from 'lucide-react';

export default function TrainingPage({ currentUser, onNavigateToTab, onTriggerEmergency, onRegisterNewPatient }) {
  const modules = [
    { id: 'm1', title: 'Maternal ANC & High Risk Screening Protocol', duration: '15 mins', progress: 100, category: 'Clinical Protocol' },
    { id: 'm2', title: 'Google OR-Tools VRPTW Route Optimization Guide', duration: '10 mins', progress: 80, category: 'AI Tools' },
    { id: 'm3', title: 'Rural Offline Data Caching & LocalStorage Sync', duration: '12 mins', progress: 0, category: 'System Logistics' },
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
            <button onClick={() => onNavigateToTab('reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <FileText className="w-4 h-4" /><span>Reports</span>
            </button>
            <button onClick={() => onNavigateToTab('messages')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <MessageSquare className="w-4 h-4" /><span>Messages</span>
            </button>
            <button onClick={() => onNavigateToTab('training')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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
            <h2 className="text-xl font-bold text-slate-900">ASHA Academy & Protocol Training</h2>
            <p className="text-xs text-slate-500">Interactive Clinical Skills & AI Tool Mastery Modules</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-600" /> PHC Ramanthapur
            </div>
            <button className="relative p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"><Bell className="w-4 h-4" /></button>
          </div>
        </header>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map(mod => (
              <div key={mod.id} className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-[#6c47ff] text-[10px] font-extrabold uppercase">{mod.category}</span>
                  <h3 className="font-extrabold text-slate-900 text-sm">{mod.title}</h3>
                  <span className="text-xs text-slate-500 font-medium block">Duration: {mod.duration}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-[#6c47ff]">{mod.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6c47ff] rounded-full transition-all" style={{ width: `${mod.progress}%` }} />
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-600/30 transition-all">
                  <PlayCircle className="w-4 h-4" /> {mod.progress === 100 ? 'Review Module' : 'Continue Module'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
