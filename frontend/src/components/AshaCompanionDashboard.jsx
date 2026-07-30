import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, Clock, ChevronRight, CheckCircle2,
  AlertTriangle, HeartPulse, Compass, Navigation, ArrowRight, Activity, Sparkles, UserCheck
} from 'lucide-react';
import RouteMap from './RouteMap';

export default function AshaCompanionDashboard({
  stops,
  workerLocation,
  currentUser,
  onStatusChange,
  onExplainRisk,
  onTriggerEmergency,
  onRegisterNewPatient
}) {
  const [activeSideNav, setActiveSideNav] = useState('dashboard');

  const completedCount = stops.filter(s => s.status === 'visited').length;
  const totalStops = stops.length || 24;
  const progressPercent = Math.round((completedCount / totalStops) * 100) || 75;

  const nextVisit = stops.find(s => s.status !== 'visited') || stops[0] || {
    patient_name: "Saraswati Devi",
    age: 68,
    gender: "Female",
    risk_band: "High",
    risk_score: 87,
    address: "H. No: 12-85, Street No. 4, Ramanthapur Village",
    estimated_arrival: "10:30 AM",
    distance_km: 1.2,
    priority: "High"
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fe] text-slate-900 font-sans">
      {/* 1. LEFT SIDEBAR (ASHA Companion) */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-6">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-[#6c47ff] tracking-tight leading-none">
                ASHA Companion
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">Empowering Rural Health</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveSideNav('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all ${
                activeSideNav === 'dashboard'
                  ? 'bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25'
                  : 'hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveSideNav('route')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all ${
                activeSideNav === 'route'
                  ? 'bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25'
                  : 'hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>My Route</span>
            </button>

            <button
              onClick={() => setActiveSideNav('patients')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all ${
                activeSideNav === 'patients'
                  ? 'bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25'
                  : 'hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Patients</span>
            </button>

            <button
              onClick={onRegisterNewPatient}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Patient</span>
            </button>

            <button
              onClick={onTriggerEmergency}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-bold"
            >
              <div className="flex items-center gap-3">
                <AlertOctagon className="w-4 h-4" />
                <span>Emergency</span>
              </div>
              <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">
                2
              </span>
            </button>

            <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all">
              <FileText className="w-4 h-4" />
              <span>Reports</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all">
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all">
              <GraduationCap className="w-4 h-4" />
              <span>Training</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all">
              <Folder className="w-4 h-4" />
              <span>Resources</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Progress Widget ("Today's Progress") */}
        <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-2">
          <span className="text-xs font-bold text-slate-800 block">Today's Progress</span>
          
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              <path className="text-[#6c47ff]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${progressPercent}, 100`} strokeLinecap="round" strokeWidth="3" />
            </svg>
            <span className="absolute text-sm font-extrabold text-[#6c47ff]">{progressPercent}%</span>
          </div>

          <p className="text-[11px] text-slate-500 font-semibold">{completedCount} / {totalStops} Visits Completed</p>
          <a href="#schedule" className="text-xs text-[#6c47ff] font-bold flex items-center justify-center gap-1 hover:underline">
            View Details <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Dashboard</h2>
            <p className="text-xs text-slate-500">Welcome back, <strong className="text-slate-900">{currentUser?.name || 'Lakshmi Devi'}</strong> 👋</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-600" /> PHC Ramanthapur
            </div>

            <button className="relative p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600" />
            </button>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center border border-purple-200">
                LD
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-bold text-slate-900 block leading-tight">{currentUser?.name || 'Lakshmi Devi'}</span>
                <span className="text-[10px] text-slate-500 font-semibold">ASHA Worker</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* 3. TOP KPI METRICS GRID (4 White Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Patients */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 block">Total Patients</span>
                <span className="text-2xl font-extrabold text-slate-900 block mt-1">124</span>
                <span className="text-[10px] font-bold text-emerald-600">+8 this week</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            {/* Card 2: High Risk Patients */}
            <div className="p-5 rounded-3xl bg-red-50/50 border border-red-100 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 block">High Risk Patients</span>
                <span className="text-2xl font-extrabold text-red-600 block mt-1">16</span>
                <span className="text-[10px] font-bold text-red-600 flex items-center gap-1 cursor-pointer">View all <ArrowRight className="w-2.5 h-2.5" /></span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
            </div>

            {/* Card 3: Visits Today */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 block">Visits Today</span>
                <span className="text-2xl font-extrabold text-slate-900 block mt-1">18 <span className="text-sm text-slate-400 font-normal">/ 24</span></span>
                <span className="text-[10px] font-bold text-emerald-600">75% Completed</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            {/* Card 4: Est. Time Left */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 block">Est. Time Left</span>
                <span className="text-2xl font-extrabold text-slate-900 block mt-1">2h 15m</span>
                <span className="text-[10px] font-bold text-slate-400">To complete route</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* 4. MIDDLE SECTION (Map + Next Visit & AI Risk Score) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Today's Optimized Route Map */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Today's Optimized Route</h3>
                <button className="text-xs text-[#6c47ff] font-bold flex items-center gap-1 hover:underline">
                  View Full Route <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Map Container */}
              <div className="h-[320px] rounded-2xl overflow-hidden relative">
                <RouteMap stops={stops} workerLocation={workerLocation} onExplainRisk={onExplainRisk} />
              </div>

              {/* Map Bottom Stats Bar */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-2xl text-xs text-center border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Distance</span>
                  <span className="font-extrabold text-slate-900">24.6 km</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Estimated Time</span>
                  <span className="font-extrabold text-slate-900">6h 30m</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Stops</span>
                  <span className="font-extrabold text-slate-900">{totalStops}</span>
                </div>
              </div>

              {/* Big Navigation Action Button */}
              <button className="w-full py-3 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-600/30 transition-all">
                <Navigation className="w-4 h-4 fill-current" /> Start Navigation
              </button>
            </div>

            {/* Right Column: Next Visit & AI Risk Score */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: Next Visit */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Next Visit</h3>
                  <button className="text-xs text-[#6c47ff] font-bold flex items-center gap-1 hover:underline">
                    View Patient <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 text-[#6c47ff] font-bold text-base flex items-center justify-center border border-purple-200 shrink-0">
                    SD
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base">{nextVisit.patient_name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-extrabold text-[10px]">
                        High Risk
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Age: 68 • Female</p>
                    <p className="text-xs text-slate-600 font-medium mt-1">{nextVisit.address || "H. No: 12-85, Street No. 4, Ramanthapur Village"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-2 bg-slate-50 rounded-xl text-center">
                    <span className="text-[10px] text-slate-400 block font-bold">ETA</span>
                    <span className="font-extrabold text-slate-900">10:30 AM</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl text-center">
                    <span className="text-[10px] text-slate-400 block font-bold">Distance</span>
                    <span className="font-extrabold text-slate-900">1.2 km</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl text-center">
                    <span className="text-[10px] text-slate-400 block font-bold">Priority</span>
                    <span className="font-extrabold text-red-600">High</span>
                  </div>
                </div>
              </div>

              {/* Card 2: AI Risk Score */}
              <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-white rounded-3xl border border-purple-100 p-5 shadow-xs space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-purple-900 text-sm">AI Risk Score</h3>
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-purple-950">87</span>
                  <span className="text-sm font-bold text-purple-400">/100</span>
                </div>

                <p className="text-xs font-bold text-purple-900">
                  Risk Level: <span className="text-red-600">High</span>
                </p>

                <button
                  onClick={() => onExplainRisk && onExplainRisk('pat_001')}
                  className="text-xs text-[#6c47ff] font-bold flex items-center gap-1 hover:underline pt-1"
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* 5. BOTTOM SECTION (Today's Schedule + Recent Alerts) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Today's Schedule */}
            <div id="schedule" className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Today's Schedule</h3>
                <button className="text-xs text-[#6c47ff] font-bold flex items-center gap-1 hover:underline">
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Stop 1 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">Saraswati Devi</h4>
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[10px]">High Risk</span>
                      </div>
                      <span className="text-xs text-slate-500">10:30 AM • Ramanthapur</span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1">
                    Completed ✓
                  </span>
                </div>

                {/* Stop 2 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">Anitha Reddy</h4>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">Medium Risk</span>
                      </div>
                      <span className="text-xs text-slate-500">11:15 AM • Ramanthapur</span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center gap-1">
                    Upcoming 🕒
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Recent Alerts</h3>
                <button className="text-xs text-[#6c47ff] font-bold flex items-center gap-1 hover:underline">
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-900 text-xs flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4 text-red-600" /> New High Risk Patient
                    </span>
                    <span className="text-[10px] text-red-600 font-semibold">20 mins ago</span>
                  </div>
                  <p className="text-xs text-red-800">Meena Kumari in Habsiguda has high risk score (92)</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" /> Medicine Stock Low
                    </span>
                    <span className="text-[10px] text-amber-600 font-semibold">1 hr ago</span>
                  </div>
                  <p className="text-xs text-amber-800">ORS packets are running low. Please restock.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
