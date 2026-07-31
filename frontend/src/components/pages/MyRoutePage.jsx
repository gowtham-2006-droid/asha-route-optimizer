import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, Clock, ChevronRight, CheckCircle2,
  AlertTriangle, HeartPulse, Navigation, ArrowRight, Activity, Sparkles,
  RotateCw, RefreshCw, Sun, Coffee, Flag, ArrowUpDown, ChevronUp,
  BarChart3, UserCheck, Check, Calendar, CloudRain, ShieldCheck, Fuel,
  Compass, Zap, ArrowLeft, MoreVertical, Eye, Map, CheckCheck, LogOut
} from 'lucide-react';
import RouteMap from '../RouteMap';

export default function MyRoutePage({
  stops,
  workerLocation,
  currentUser,
  onStatusChange,
  onExplainRisk,
  onTriggerEmergency,
  onRegisterNewPatient,
  onNavigateToTab,
  onLogout
}) {
  const [selectedTab, setSelectedTab] = useState('all');

  const completedCount = stops.filter(s => s.status === 'visited').length || 10;
  const totalStops = stops.length || 24;

  const mockTimelineStops = [
    {
      time: '09:00 AM',
      type: 'start',
      title: 'Start - PHC Ramanthapur',
      sub: 'Start your day',
      isStart: true
    },
    {
      time: '09:25 AM',
      seq: 1,
      name: 'Lakshmi',
      village: 'Ramanthapur Village',
      task: 'Pregnancy Check',
      risk: 'Low Risk',
      riskColor: 'bg-emerald-100 text-emerald-800',
      eta: '09:25 AM',
      dist: '1.8 km',
      completed: true
    },
    {
      time: '10:05 AM',
      seq: 2,
      name: 'Saraswati Devi',
      village: 'Habsiguda Village',
      task: 'Elderly Care',
      risk: 'High Risk',
      riskColor: 'bg-red-100 text-red-700 font-extrabold',
      eta: '10:05 AM',
      dist: '2.4 km',
      completed: false
    },
    {
      time: '10:40 AM',
      seq: 3,
      name: 'Anitha Reddy',
      village: 'Nagole Village',
      task: 'Diabetes Follow-up',
      risk: 'High Risk',
      riskColor: 'bg-red-100 text-red-700 font-extrabold',
      eta: '10:40 AM',
      dist: '1.9 km',
      completed: false
    },
    {
      time: '03:30 PM',
      type: 'end',
      title: 'End - PHC Ramanthapur',
      sub: 'Day completion',
      isEnd: true
    }
  ];

  const queuePatients = [
    { seq: 1, name: 'Lakshmi', village: 'Ramanthapur', risk: 'Low Risk', riskBadge: 'bg-emerald-100 text-emerald-800', eta: '09:25 AM', dist: '1.8 km', completed: true },
    { seq: 2, name: 'Saraswati Devi', village: 'Habsiguda', risk: 'High Risk', riskBadge: 'bg-red-100 text-red-700', eta: '10:05 AM', dist: '2.4 km', completed: false },
    { seq: 3, name: 'Anitha Reddy', village: 'Nagole', risk: 'High Risk', riskBadge: 'bg-red-100 text-red-700', eta: '10:40 AM', dist: '1.9 km', completed: false },
    { seq: 4, name: 'Meena Kumari', village: 'Uppal', risk: 'Low Risk', riskBadge: 'bg-emerald-100 text-emerald-800', eta: '11:20 AM', dist: '1.7 km', completed: false },
    { seq: 5, name: 'Rani', village: 'Nagole', risk: 'Medium Risk', riskBadge: 'bg-amber-100 text-amber-800', eta: '11:45 AM', dist: '2.2 km', completed: false },
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

          {/* Sidebar Navigation */}
          <nav className="space-y-1 text-xs font-semibold text-slate-600">
            <button onClick={() => onNavigateToTab('dashboard')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Home className="w-4 h-4" /><span>Dashboard</span>
            </button>
            <button onClick={() => onNavigateToTab('route')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
              <Navigation className="w-4 h-4" /><span>My Route</span>
            </button>
            <button onClick={() => onNavigateToTab('patients')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Users className="w-4 h-4" /><span>Patients</span>
            </button>
            <button onClick={() => onNavigateToTab('add_patient')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Plus className="w-4 h-4" /><span>Add Patient</span>
            </button>
            <button onClick={() => onNavigateToTab('next_patient')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <UserCheck className="w-4 h-4" /><span>Next Patient</span>
            </button>
            <button onClick={onTriggerEmergency} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-bold">
              <div className="flex items-center gap-3"><AlertOctagon className="w-4 h-4" /><span>Emergency</span></div>
              <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">2</span>
            </button>
            <button onClick={() => onNavigateToTab('reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <FileText className="w-4 h-4" /><span>Reports</span>
            </button>
            <button onClick={() => onNavigateToTab('analytics')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <BarChart3 className="w-4 h-4" /><span>Analytics</span>
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
            <button onClick={() => onNavigateToTab('settings')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all">
              <Settings className="w-4 h-4" /><span>Settings</span>
            </button>
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 font-bold transition-all mt-2">
              <LogOut className="w-4 h-4" /><span>Log Out</span>
            </button>
          </nav>
        </div>

        {/* Sidebar AI Promo Box */}
        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-900 block">Need Help?</span>
            <p className="text-[11px] text-slate-500 leading-snug">Get instant answers and health guidance</p>
          </div>
          <button className="w-full py-2 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center justify-center gap-1">
            Chat with AI ✨
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigateToTab('dashboard')} className="p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 leading-tight">Full Route Plan</h2>
              <p className="text-xs text-slate-500 font-medium">AI Optimized Route for Today</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-600" /> PHC Ramanthapur
            </div>

            <button className="relative p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-600 text-white font-bold text-[9px] flex items-center justify-center">3</span>
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

        {/* Page Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* ROW 1: Top 5 KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Patients Card */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Patients</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">24</span>
                <span className="text-[10px] font-bold text-slate-400">Total Stops</span>
              </div>
            </div>

            {/* Total Distance */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Total Distance</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">24.6 km</span>
              </div>
            </div>

            {/* Estimated Time */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Estimated Time</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">6h 30m</span>
              </div>
            </div>

            {/* AI Efficiency */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">AI Efficiency</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">98%</span>
                <span className="text-[10px] font-bold text-emerald-600">Optimized</span>
              </div>
            </div>

            {/* Last Optimized */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Last Optimized</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">09:15 AM</span>
                <span className="text-[10px] font-bold text-slate-400">Today</span>
              </div>
            </div>
          </div>

          {/* ROW 2: Interactive Route Map + Route Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Map Container (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col space-y-4">
              {/* Map Legend Bar Header */}
              <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold text-slate-600 pb-1">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600" /> High Risk</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium Risk</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low Risk</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Completed</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Current Location</span>
              </div>

              {/* Map Component */}
              <div className="h-[380px] rounded-2xl overflow-hidden relative">
                <RouteMap stops={stops} workerLocation={workerLocation} onExplainRisk={onExplainRisk} />
              </div>
            </div>

            {/* Route Timeline Container (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm">Route Timeline</h3>
                <button className="text-xs text-[#6c47ff] font-bold hover:underline">Show All</button>
              </div>

              <div className="space-y-4 overflow-y-auto max-h-[310px] pr-1">
                {mockTimelineStops.map((st, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <span className="w-16 text-[10px] font-bold text-slate-400 pt-1 shrink-0">{st.time}</span>
                    <div className="flex flex-col items-center">
                      {st.isStart || st.isEnd ? (
                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                          {st.isStart ? '🏠' : '🚩'}
                        </div>
                      ) : (
                        <div className={`w-6 h-6 rounded-full ${st.seq === 1 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'} flex items-center justify-center font-extrabold text-xs shrink-0`}>
                          {st.seq}
                        </div>
                      )}
                      {idx < mockTimelineStops.length - 1 && <div className="w-0.5 h-8 bg-slate-200 my-1" />}
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      {st.isStart || st.isEnd ? (
                        <div>
                          <h4 className="font-extrabold text-slate-900">{st.title}</h4>
                          <p className="text-[10px] text-slate-400 font-medium">{st.sub}</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-extrabold text-slate-900">{st.name}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] ${st.riskColor}`}>
                              {st.risk}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium">{st.village} • {st.task}</p>
                          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold">
                            <span>🕒 {st.eta}</span>
                            <span>📍 {st.dist}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Summary Pill */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs font-extrabold text-slate-800">
                24 Stops • 24.6 km • 6h 30m
              </div>
            </div>
          </div>

          {/* ROW 3: Route Statistics, AI Optimization Insights, Patient Queue */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Route Statistics (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm">Route Statistics</h3>
                <button className="text-xs text-[#6c47ff] font-bold hover:underline">View Details</button>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">Distance</span>
                  <strong className="text-slate-900 font-black block">24.6 km</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">Travel Time</span>
                  <strong className="text-slate-900 font-black block">6h 30m</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">Patients</span>
                  <strong className="text-slate-900 font-black block">24</strong>
                </div>

                <div className="p-3 bg-red-50/50 rounded-2xl space-y-1 border border-red-100">
                  <span className="text-[10px] font-bold text-red-600 block">High Risk</span>
                  <strong className="text-red-700 font-black block">6</strong>
                </div>
                <div className="p-3 bg-emerald-50/50 rounded-2xl space-y-1 border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-600 block">Completed</span>
                  <strong className="text-emerald-700 font-black block">10</strong>
                </div>
                <div className="p-3 bg-blue-50/50 rounded-2xl space-y-1 border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-600 block">Remaining</span>
                  <strong className="text-blue-700 font-black block">14</strong>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">Fuel Saved</span>
                  <strong className="text-slate-900 font-black block">18% <span className="text-[9px] text-slate-400 font-normal">(~3.2 km)</span></strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">Time Saved</span>
                  <strong className="text-slate-900 font-black block">42 min</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">Efficiency</span>
                  <strong className="text-emerald-600 font-black block">98%</strong>
                </div>
              </div>
            </div>

            {/* AI Optimization Insights (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-purple-600">
                    <Sparkles className="w-4 h-4 fill-current" />
                    <h3 className="font-extrabold text-slate-900 text-sm">AI Optimization Insights</h3>
                  </div>
                  <button className="text-xs text-[#6c47ff] font-bold hover:underline">View Details</button>
                </div>

                <div className="flex items-center gap-4">
                  {/* Donut Chart */}
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#6c47ff" strokeWidth="4" strokeDasharray="98, 100" strokeLinecap="round" />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-base font-black text-slate-900 block leading-tight">98%</span>
                      <span className="text-[8px] font-bold text-slate-400">Efficiency</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs font-semibold">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Distance Reduced: <strong>21% (6.4 km)</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Estimated Time Saved: <strong>42 min</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>High Risk Prioritized: <strong>100%</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Traffic Conditions: <strong>Low</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Weather Impact: <strong>Low</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100 text-xs text-purple-950 font-medium">
                <span className="font-bold flex items-center gap-1 text-purple-900 mb-0.5"><Sparkles className="w-3.5 h-3.5 text-[#6c47ff]" /> AI Recommendation</span>
                Great! You are on an optimized route. Consider taking a short break around 12:30 PM after your 12th visit.
              </div>
            </div>

            {/* Patient Queue (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Patient Queue</h3>
                  <button onClick={() => onNavigateToTab('patients')} className="text-xs text-[#6c47ff] font-bold hover:underline">View All</button>
                </div>

                <div className="space-y-2 text-xs">
                  {queuePatients.map((pq) => (
                    <div key={pq.seq} className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-full ${pq.seq === 1 ? 'bg-emerald-500' : pq.risk.includes('High') ? 'bg-red-500' : 'bg-amber-500'} text-white font-extrabold text-xs flex items-center justify-center shrink-0`}>
                          {pq.seq}
                        </span>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs leading-tight">{pq.name}</h4>
                          <span className="text-[10px] text-slate-400 font-medium">{pq.village}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${pq.riskBadge}`}>
                          {pq.risk}
                        </span>
                        <div className="text-right text-[10px] font-bold text-slate-400">
                          <div>{pq.eta}</div>
                          <div>{pq.dist}</div>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-purple-100 text-[#6c47ff] flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => onNavigateToTab('patients')} className="w-full py-2 rounded-2xl border border-purple-200 text-[#6c47ff] hover:bg-purple-50 font-bold text-xs flex items-center justify-center gap-1 transition-all">
                View Full Patient List <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ROW 4: Before vs After AI Optimization, Emergency & Alerts, Route Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Before vs After AI Optimization (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm">Before vs After AI Optimization</h3>
                <button className="text-xs text-[#6c47ff] font-bold hover:underline">View Comparison</button>
              </div>

              <div className="grid grid-cols-2 gap-3 relative text-xs">
                {/* Without AI */}
                <div className="p-3 bg-red-50/40 rounded-2xl border border-red-100 space-y-2">
                  <span className="text-[10px] font-black text-red-600 uppercase block">Without AI</span>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Distance</span>
                    <strong className="text-slate-900 font-black text-sm">31.0 km</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Time</span>
                    <strong className="text-slate-900 font-black text-sm">7h 45m</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">High Risk Covered</span>
                    <strong className="text-red-600 font-black text-xs">82% <span className="text-[9px] text-slate-400 font-normal">(14/17)</span></strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Fuel Cost</span>
                    <strong className="text-slate-900 font-black text-xs">₹210</strong>
                  </div>
                </div>

                {/* AI Improvement Badge Center */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border border-purple-200 shadow-md flex flex-col items-center justify-center text-center z-10">
                  <span className="text-[8px] font-bold text-slate-400">AI Improvement</span>
                  <span className="text-[10px] font-black text-emerald-600">21%</span>
                  <span className="text-[7px] text-slate-400">Distance</span>
                </div>

                {/* With AI */}
                <div className="p-3 bg-emerald-50/40 rounded-2xl border border-emerald-200 space-y-2">
                  <span className="text-[10px] font-black text-emerald-700 uppercase block">With AI</span>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Distance</span>
                    <strong className="text-slate-900 font-black text-sm">24.6 km</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Time</span>
                    <strong className="text-slate-900 font-black text-sm">6h 30m</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">High Risk Covered</span>
                    <strong className="text-emerald-600 font-black text-xs">100% <span className="text-[9px] text-slate-400 font-normal">(17/17)</span></strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Fuel Cost</span>
                    <strong className="text-slate-900 font-black text-xs">₹145</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency & Alerts (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Emergency & Alerts</h3>
                  <button onClick={onTriggerEmergency} className="text-xs text-red-600 font-bold hover:underline">View All</button>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Alert 1 */}
                  <div className="p-2.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-emerald-900 text-xs">No Active Emergencies</h4>
                      <p className="text-[10px] text-emerald-700 font-medium">All clear! No emergency alerts.</p>
                    </div>
                  </div>

                  {/* Alert 2 */}
                  <div className="p-2.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5">
                    <CloudRain className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-blue-900 text-xs">Weather Alert</h4>
                      <p className="text-[10px] text-blue-700 font-medium">Light rain expected around 3:00 PM. Carry umbrella and stay safe.</p>
                    </div>
                  </div>

                  {/* Alert 3 */}
                  <div className="p-2.5 rounded-2xl bg-red-50/60 border border-red-100 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-red-900 text-xs">New High Priority Patient</h4>
                      <p className="text-[10px] text-red-700 font-medium">Added in Lakshmipur Village. Distance: 1.4 km from next stop</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button onClick={onTriggerEmergency} className="py-2 rounded-2xl border border-purple-200 text-[#6c47ff] hover:bg-purple-50 font-bold transition-all">
                  View Details
                </button>
                <button onClick={() => alert("Re-optimizing route with latest traffic and emergency updates...")} className="py-2 rounded-2xl bg-[#6c47ff] text-white font-bold hover:bg-purple-700 shadow-md shadow-purple-600/25 transition-all">
                  Re-optimize Route
                </button>
              </div>
            </div>

            {/* Route Performance (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Route Performance</h3>
                  <button onClick={() => onNavigateToTab('reports')} className="text-xs text-[#6c47ff] font-bold hover:underline">View Report</button>
                </div>

                {/* Performance Chart Line */}
                <div className="h-28 relative pt-2 px-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-2">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-600" /> Distance (km)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Visits</span>
                  </div>

                  <svg className="w-full h-20" viewBox="0 0 300 80" preserveAspectRatio="none">
                    <path d="M 0 70 Q 50 60, 100 45 T 200 25 T 300 15" fill="none" stroke="#6c47ff" strokeWidth="2.5" />
                    <path d="M 0 75 Q 50 65, 100 55 T 200 40 T 300 28" fill="none" stroke="#10b981" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Distance Covered</span>
                  <strong className="text-slate-900 font-black">12.8 km</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Visits Completed</span>
                  <strong className="text-slate-900 font-black">10</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Avg. Time/Visit</span>
                  <strong className="text-slate-900 font-black">18 min</strong>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS BOTTOM BAR */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider hidden sm:block">Quick Actions</span>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => alert("Navigation started on Google Maps GPS!")}
                className="px-4 py-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-600/25 transition-all"
              >
                <Navigation className="w-4 h-4 fill-current" /> Start Navigation
              </button>

              <button
                onClick={() => alert("Route re-optimized with OR-Tools engine!")}
                className="px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4 text-emerald-600" /> Re-optimize Route
              </button>

              <button
                onClick={onTriggerEmergency}
                className="px-4 py-2.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <AlertOctagon className="w-4 h-4 text-red-600" /> Emergency Re-route
              </button>

              <button
                onClick={() => onNavigateToTab('reports')}
                className="px-4 py-2.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-blue-600" /> Generate AI Report
              </button>

              <button className="p-2.5 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all font-bold text-xs flex items-center gap-1">
                <MoreVertical className="w-4 h-4" /> More Actions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
