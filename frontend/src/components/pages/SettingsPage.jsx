import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, Globe, Wifi, Save, HeartPulse, Navigation
} from 'lucide-react';

export default function SettingsPage({ currentUser, onNavigateToTab, onTriggerEmergency, onRegisterNewPatient }) {
  const [language, setLanguage] = useState('EN');
  const [offlineSync, setOfflineSync] = useState(true);
  const [notifications, setNotifications] = useState(true);

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
            <button onClick={() => onNavigateToTab('training')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <GraduationCap className="w-4 h-4" /><span>Training</span>
            </button>
            <button onClick={() => onNavigateToTab('resources')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Folder className="w-4 h-4" /><span>Resources</span>
            </button>
            <button onClick={() => onNavigateToTab('settings')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
              <Settings className="w-4 h-4" /><span>Settings</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Application Preferences & Settings</h2>
            <p className="text-xs text-slate-500">Configure Offline Caching, Language, and Emergency Alerts</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-600" /> PHC Ramanthapur
            </div>
            <button className="relative p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"><Bell className="w-4 h-4" /></button>
          </div>
        </header>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto max-w-3xl">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
            {/* Language Setting */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-600" /> Interface Language
                </h4>
                <p className="text-xs text-slate-500">Select preferred language for voice readout and UI text</p>
              </div>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800"
              >
                <option value="EN">English</option>
                <option value="TE">తెలుగు (Telugu)</option>
                <option value="HI">हिंदी (Hindi)</option>
              </select>
            </div>

            {/* Offline Caching */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-emerald-600" /> Offline LocalStorage Caching
                </h4>
                <p className="text-xs text-slate-500">Cache patient records locally when visiting rural areas without network</p>
              </div>

              <input
                type="checkbox"
                checked={offlineSync}
                onChange={(e) => setOfflineSync(e.target.checked)}
                className="w-5 h-5 accent-[#6c47ff] rounded cursor-pointer"
              />
            </div>

            {/* Emergency Alerts */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-red-600" /> High-Risk Emergency Alerts
                </h4>
                <p className="text-xs text-slate-500">Receive instant push notifications for critical maternal cases</p>
              </div>

              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 accent-[#6c47ff] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
