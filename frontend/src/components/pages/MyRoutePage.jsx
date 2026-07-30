import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, Clock, ChevronRight, CheckCircle2,
  AlertTriangle, HeartPulse, Compass, Navigation, ArrowRight, Activity, Sparkles,
  Maximize2, RotateCw, RefreshCw, Sun, Coffee, Flag, Sparkle, ArrowUpDown, ChevronUp
} from 'lucide-react';
import RouteMap from '../RouteMap';
import RiskBadge from '../RiskBadge';

export default function MyRoutePage({
  stops,
  workerLocation,
  currentUser,
  onStatusChange,
  onExplainRisk,
  onTriggerEmergency,
  onRegisterNewPatient,
  onNavigateToTab
}) {
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(false);

  const completedCount = stops.filter(s => s.status === 'visited').length;
  const totalStops = stops.length || 24;
  const completedPercent = Math.round((completedCount / totalStops) * 100) || 29;
  const highRiskCount = stops.filter(s => s.risk_band === 'High' || s.risk_band === 'Critical').length || 6;

  const mockStopsList = stops.length > 0 ? stops : [
    { stop_id: 's1', sequence: 1, patient_name: 'Saraswati Devi', age: 68, gender: 'Female', risk_band: 'High', distance_km: 1.2, travel_mins: 12, status: 'visited' },
    { stop_id: 's2', sequence: 2, patient_name: 'Anitha Reddy', age: 32, gender: 'Female', risk_band: 'Moderate', distance_km: 0.8, travel_mins: 8, status: 'scheduled' },
    { stop_id: 's3', sequence: 3, patient_name: 'Meena Kumari', age: 45, gender: 'Female', risk_band: 'High', distance_km: 1.5, travel_mins: 15, status: 'scheduled' },
    { stop_id: 's4', sequence: 4, patient_name: 'Ramesh Kumar', age: 57, gender: 'Male', risk_band: 'Moderate', distance_km: 1.8, travel_mins: 14, status: 'scheduled' },
    { stop_id: 's5', sequence: 5, patient_name: 'Laxmi Bai', age: 29, gender: 'Female', risk_band: 'Low', distance_km: 1.0, travel_mins: 10, status: 'scheduled' },
  ];

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

          {/* Sidebar Menu */}
          <nav className="space-y-1 text-xs font-semibold text-slate-600">
            <button
              onClick={() => onNavigateToTab('dashboard')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onNavigateToTab('route')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>My Route</span>
            </button>

            <button
              onClick={() => onNavigateToTab('patients')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all"
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

        {/* Bottom AI Promo Widget ("AI Route Optimization") */}
        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-900 block">AI Route Optimization</span>
            <p className="text-[11px] text-slate-500 leading-snug">Save time, reach more families, improve health.</p>
          </div>
          <button className="w-full py-2 rounded-xl bg-[#6c47ff] text-white font-bold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all">
            Optimize Route
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">My Route</h2>
            <p className="text-xs text-slate-500">AI optimized route for today</p>
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

        {/* My Route Content Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* 3. TOP METRIC CARDS (5 White Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Card 1: Total Distance */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Total Distance</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">24.6 <span className="text-xs font-bold text-slate-700">km</span></span>
                <span className="text-[10px] text-slate-400 font-medium">Today's Route</span>
              </div>
            </div>

            {/* Card 2: Estimated Time */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Estimated Time</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">6h 30m</span>
                <span className="text-[10px] text-slate-400 font-medium">Including visits</span>
              </div>
            </div>

            {/* Card 3: Total Stops */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Total Stops</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">24</span>
                <span className="text-[10px] text-slate-400 font-medium">Patients to visit</span>
              </div>
            </div>

            {/* Card 4: High Risk Patients */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">High Risk Patients</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">{highRiskCount}</span>
                <span className="text-[10px] text-slate-400 font-medium">Priority visits</span>
              </div>
            </div>

            {/* Card 5: Visits Completed */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Visits Completed</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">{completedCount} <span className="text-xs font-normal text-slate-400">/ {totalStops}</span></span>
                <span className="text-[10px] font-bold text-emerald-600">{completedPercent}% Completed</span>
              </div>
            </div>
          </div>

          {/* 4. MIDDLE SPLIT SECTION (Route Map + Route Summary & Today's Stops) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel: Optimized Route Map */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Optimized Route Map</h3>
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600" /> High Risk</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium Risk</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low Risk</span>
                  </div>
                </div>

                {/* Leaflet Map Container */}
                <div className="h-[380px] rounded-2xl overflow-hidden relative">
                  <RouteMap stops={stops} workerLocation={workerLocation} onExplainRisk={onExplainRisk} />

                  {/* Floating Bottom Left Live Location Widget */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-200/80 shadow-lg flex items-center gap-3 z-[1000]">
                    <div className="w-3 h-3 rounded-full bg-purple-600 animate-ping" />
                    <div>
                      <span className="text-xs font-extrabold text-slate-900 block leading-none">Live Location</span>
                      <span className="text-[10px] text-purple-600 font-bold">You are here</span>
                    </div>
                  </div>

                  {/* Floating View Full Map Button */}
                  <button className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1 shadow-md z-[1000]">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-500" /> View Full Map
                  </button>
                </div>
              </div>

              {/* AI Recommendation Banner below Map */}
              <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#6c47ff]">
                    <Sparkles className="w-4 h-4 fill-current" /> AI Recommendation
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    You have <strong>6 high risk patients</strong> today. Consider starting with <strong>Stop 3</strong> from your current location to save 18 mins and cover high priority patients early.
                  </p>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center shrink-0">
                  🧠
                </div>
              </div>
            </div>

            {/* Right Panel: Route Summary & Today's Stops */}
            <div className="lg:col-span-5 space-y-4">
              {/* Route Summary Box */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Route Summary</h3>
                  <button
                    onClick={() => setIsSummaryCollapsed(!isSummaryCollapsed)}
                    className="text-xs text-purple-600 font-bold flex items-center gap-0.5 hover:underline"
                  >
                    {isSummaryCollapsed ? 'Expand v' : 'Collapse ^'}
                  </button>
                </div>

                {!isSummaryCollapsed && (
                  <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">Start Time</span>
                        <span className="font-extrabold text-slate-900">9:00 AM</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-2">
                      <Flag className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">End Time (Est.)</span>
                        <span className="font-extrabold text-slate-900">3:30 PM</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">Break Time</span>
                        <span className="font-extrabold text-slate-900">30 mins</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Today's Stops (24) List */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Today's Stops ({totalStops})</h3>
                  <button className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 transition-all">
                    <ArrowUpDown className="w-3.5 h-3.5 text-purple-600" /> Reorder
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {mockStopsList.map((stop) => {
                    const isVisited = stop.status === 'visited';
                    return (
                      <div
                        key={stop.stop_id || stop.sequence}
                        className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          isVisited ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-slate-200/80 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                            stop.risk_band === 'High' || stop.risk_band === 'Critical' ? 'bg-red-600' : stop.risk_band === 'Moderate' ? 'bg-amber-500' : 'bg-emerald-600'
                          }`}>
                            {stop.sequence}
                          </div>

                          <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center shrink-0">
                            {stop.patient_name.split(' ').map(n => n[0]).join('')}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 text-xs">{stop.patient_name}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                                stop.risk_band === 'High' || stop.risk_band === 'Critical'
                                  ? 'bg-red-100 text-red-700'
                                  : stop.risk_band === 'Moderate'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {stop.risk_band} Risk
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 block font-medium">
                              Age: {stop.age || 40} • {stop.gender || 'Female'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right text-[10px] text-slate-500 font-semibold">
                            <span className="block font-bold text-slate-800">{stop.distance_km} km</span>
                            <span>{stop.travel_mins || 12} mins</span>
                          </div>

                          <button
                            onClick={() => onStatusChange(stop.stop_id, isVisited ? 'scheduled' : 'visited')}
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                              isVisited
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'border-2 border-slate-300 hover:border-purple-600'
                            }`}
                          >
                            {isVisited && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Big Navigation Button */}
                <button className="w-full py-3 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-600/30 transition-all">
                  <Navigation className="w-4 h-4 fill-current" /> Start Navigation
                </button>
              </div>
            </div>
          </div>

          {/* 5. BOTTOM BANNER BAR */}
          <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <span className="text-base">🌱</span>
              <span>Tip: Stay hydrated, take breaks and keep spreading care in your community!</span>
            </div>

            <div className="flex items-center gap-4 text-slate-500 font-bold">
              <span className="flex items-center gap-1 text-amber-600"><Sun className="w-4 h-4" /> 28°C Sunny</span>
              <span className="flex items-center gap-1 text-slate-400">Last Sync: 8:45 AM <RefreshCw className="w-3.5 h-3.5" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
