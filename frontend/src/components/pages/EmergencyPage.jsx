import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, HeartPulse, Navigation,
  Sparkles, Check, Phone, PhoneCall, Bot, Maximize2, ArrowRight, CheckCircle2,
  Clock, Activity, X
} from 'lucide-react';
import RouteMap from '../RouteMap';

export default function EmergencyPage({
  currentUser,
  onTriggerEmergency,
  onNavigateToTab
}) {
  const [selectedEmergency, setSelectedEmergency] = useState('em_101');
  const [isOnMyWay, setIsOnMyWay] = useState(false);

  const activeEmergencies = [
    {
      id: 'em_101',
      priority: 'HIGH PRIORITY',
      timeAgo: '5 mins ago',
      name: 'Lakshmi Narayana',
      age: 54,
      gender: 'Male',
      symptom: 'Severe Breathing Difficulty',
      distance: '1.2 km',
      village: 'Ramanthapur',
      address: 'H. No: 8-2-150/3, Ramanthapur',
      status: 'Critical',
      eta: '6 mins',
      contact: '+91 98765 43210',
      onSet: '20 mins ago',
      vitals: 'BP: 160/90, SpO2: 88%, Pulse: 112',
      history: 'Asthma',
      familyContact: 'Suresh (Son) - +91 99876 54321',
      aiRec: 'High risk of respiratory distress. Immediate medical attention recommended. Carry inhaler and oxygen support.',
      latitude: 17.3995,
      longitude: 78.5420
    },
    {
      id: 'em_102',
      priority: 'MEDIUM PRIORITY',
      timeAgo: '15 mins ago',
      name: 'Padma Bai',
      age: 32,
      gender: 'Female (Pregnant)',
      symptom: 'Severe Abdominal Pain',
      distance: '2.8 km',
      village: 'Uppal',
      address: 'Plot 45, Near Temple, Uppal',
      status: 'Medium',
      eta: '12 mins',
      contact: '+91 98123 45678',
      onSet: '45 mins ago',
      vitals: 'BP: 130/85, SpO2: 97%, Pulse: 94',
      history: '2nd Trimester Pregnancy',
      familyContact: 'Ramesh (Husband) - +91 98760 12345',
      aiRec: 'Potential obstetric emergency. Transport patient to PHC Ramanthapur immediately.',
      latitude: 17.4050,
      longitude: 78.5550
    }
  ];

  const currentPatient = activeEmergencies.find(e => e.id === selectedEmergency) || activeEmergencies[0];

  const mockStopsForMap = activeEmergencies.map((em, idx) => ({
    sequence: idx + 1,
    stop_id: em.id,
    patient_name: em.name,
    village: em.village,
    latitude: em.latitude,
    longitude: em.longitude,
    risk_score: em.status === 'Critical' ? 98 : 75,
    risk_band: em.status === 'Critical' ? 'Critical' : 'High Risk',
    status: 'scheduled',
    is_emergency: true
  }));

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
            <button onClick={() => onNavigateToTab('dashboard')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Home className="w-4 h-4" /><span>Dashboard</span>
            </button>
            <button onClick={() => onNavigateToTab('route')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Navigation className="w-4 h-4" /><span>My Route</span>
            </button>
            <button onClick={() => onNavigateToTab('patients')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Users className="w-4 h-4" /><span>Patients</span>
            </button>
            <button onClick={() => onNavigateToTab('add_patient')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Plus className="w-4 h-4" /><span>Add Patient</span>
            </button>
            <button onClick={() => onNavigateToTab('emergency')} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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
            <button onClick={() => onNavigateToTab('settings')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Settings className="w-4 h-4" /><span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom AI Promo Box ("AI Assistant") */}
        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <Bot className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-900 block">AI Assistant</span>
            <p className="text-[11px] text-slate-500 leading-snug">Need help managing emergencies?</p>
          </div>
          <button className="w-full py-2 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center justify-center gap-1">
            Ask AI <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Emergency</h2>
            <p className="text-xs text-slate-500">Respond to emergencies and critical cases</p>
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

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* 3. RED URGENT BANNER */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertOctagon className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">2 Active Emergencies</h3>
                <p className="text-xs text-slate-600">Immediate attention required. Please respond as soon as possible.</p>
              </div>
            </div>

            <button className="px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-600/30 transition-all flex items-center gap-2 shrink-0">
              View All Emergencies <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4. TOP KPI METRIC CARDS (5 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-3xl bg-red-50/60 border border-red-100 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">Active Emergencies</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">2</span>
                <span className="text-[10px] font-bold text-red-600">Needs immediate attention</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-amber-50/60 border border-amber-100 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">In Progress</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">1</span>
                <span className="text-[10px] font-bold text-amber-600">Being handled</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">Resolved Today</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">3</span>
                <span className="text-[10px] font-bold text-emerald-600">Successfully resolved</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-blue-50/60 border border-blue-100 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">Avg Response Time</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">18 min</span>
                <span className="text-[10px] font-bold text-blue-600">This month</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-purple-50/60 border border-purple-100 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">Total This Month</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">12</span>
                <span className="text-[10px] font-bold text-emerald-600">+20% vs last month</span>
              </div>
            </div>
          </div>

          {/* 5. MAIN 3-COLUMN DASHBOARD BODY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* COLUMN 1: Active Emergencies List */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Active Emergencies (2)</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <span>Sort by:</span>
                    <select className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 text-slate-800 font-bold">
                      <option>Severity</option>
                      <option>Time</option>
                    </select>
                  </div>
                </div>

                {/* Emergency Cards */}
                <div className="space-y-3">
                  {activeEmergencies.map((em) => (
                    <div
                      key={em.id}
                      onClick={() => setSelectedEmergency(em.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        selectedEmergency === em.id
                          ? 'bg-red-50/40 border-red-300 shadow-md ring-2 ring-red-400/30'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                          em.priority.includes('HIGH') ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {em.priority}
                        </span>
                        <span className="text-slate-400 font-semibold text-[10px]">{em.timeAgo}</span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center shrink-0 border border-red-200">
                          {em.name.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm">{em.name}</h4>
                          <span className="text-[11px] text-slate-500 font-medium block">Age: {em.age} • {em.gender}</span>
                          <p className="text-xs font-bold text-slate-800 mt-1">{em.symptom}</p>
                          <span className="text-[10px] text-slate-500 font-medium block mt-0.5">📍 {em.distance} away • {em.village}</span>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black ${
                          em.status === 'Critical' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'
                        }`}>
                          {em.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-2.5 text-center text-xs font-bold text-slate-500 hover:text-slate-800">
                v View Resolved Emergencies v
              </button>
            </div>

            {/* COLUMN 2: Live Emergency Map */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Live Emergency Map</h3>
                <button onClick={() => onNavigateToTab('route')} className="text-xs text-[#6c47ff] font-bold flex items-center gap-1 hover:underline">
                  View Full Map <Maximize2 className="w-3 h-3" />
                </button>
              </div>

              <div className="h-[280px] rounded-2xl overflow-hidden relative border border-slate-200">
                <RouteMap stops={mockStopsForMap} workerLocation={{ latitude: 17.3990, longitude: 78.5410 }} />
              </div>

              {/* Legend Row */}
              <div className="flex items-center justify-around text-[10px] font-bold text-slate-600 py-1 bg-slate-50 rounded-xl border border-slate-100">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600" /> High Priority</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium Priority</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Your Location</span>
              </div>

              {/* Bottom AI Route Banner */}
              <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#6c47ff] shrink-0" />
                  <div>
                    <span className="font-bold text-purple-950 block leading-tight">AI Route Suggestion Ready</span>
                    <span className="text-[10px] text-purple-700">Tap "View Route" for fastest path</span>
                  </div>
                </div>

                <button onClick={() => onNavigateToTab('route')} className="px-3 py-1.5 rounded-xl bg-white border border-purple-300 text-[#6c47ff] font-extrabold text-[11px] hover:bg-purple-50 transition-all shrink-0">
                  View Route
                </button>
              </div>
            </div>

            {/* COLUMN 3: Selected Emergency Details */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Selected Emergency</h3>
                  <span className="text-xs text-slate-400 font-semibold">{currentPatient.timeAgo}</span>
                </div>

                {/* Patient Overview */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 font-bold text-sm flex items-center justify-center shrink-0 border border-red-200">
                      {currentPatient.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-black text-[9px] block w-max mb-1">
                        {currentPatient.priority}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base">{currentPatient.name}</h4>
                      <span className="text-xs text-slate-500 font-medium block">Age: {currentPatient.age} • {currentPatient.gender}</span>
                      <p className="text-xs font-bold text-[#6c47ff] mt-0.5">{currentPatient.symptom}</p>
                      <span className="text-[11px] text-slate-600 font-medium block mt-0.5">{currentPatient.address}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Distance</span>
                      <span className="font-extrabold text-slate-900">{currentPatient.distance}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">ETA</span>
                      <span className="font-extrabold text-slate-900">{currentPatient.eta}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Contact</span>
                      <span className="font-extrabold text-purple-600">{currentPatient.contact}</span>
                    </div>
                  </div>
                </div>

                {/* Emergency Medical Details */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-xs">Emergency Details</h4>
                  <div className="space-y-1 text-slate-600 font-medium text-[11px]">
                    <p><strong className="text-slate-800">Symptoms:</strong> {currentPatient.symptom}</p>
                    <p><strong className="text-slate-800">Onset:</strong> {currentPatient.onSet}</p>
                    <p><strong className="text-slate-800">Vitals:</strong> {currentPatient.vitals}</p>
                    <p><strong className="text-slate-800">Medical History:</strong> {currentPatient.history}</p>
                    <p><strong className="text-slate-800">Family Contact:</strong> {currentPatient.familyContact}</p>
                  </div>
                </div>

                {/* AI Recommendation Box */}
                <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-xs space-y-1">
                  <span className="font-extrabold text-[#6c47ff] flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5 fill-current" /> AI Recommendation
                  </span>
                  <p className="text-purple-950 font-medium leading-relaxed text-[11px]">{currentPatient.aiRec}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onNavigateToTab('route')}
                  className="w-full py-3 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 fill-current" /> Navigate Now
                </button>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setIsOnMyWay(true)}
                    className={`py-2 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isOnMyWay ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-emerald-500 text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" /> {isOnMyWay ? 'On Your Way!' : 'Mark as On My Way'}
                  </button>
                  <button className="py-2 rounded-xl bg-white border border-red-400 text-red-600 hover:bg-red-50 font-bold flex items-center justify-center gap-1.5 transition-all">
                    <X className="w-3.5 h-3.5" /> Decline
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 6. BOTTOM ROW: Nearby ASHA Workers (3 Cards) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Nearby ASHA Workers</h3>
              <button className="text-xs text-[#6c47ff] font-bold hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center shrink-0 border border-purple-200">
                    SD
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Savitri Devi</h4>
                    <span className="text-[10px] text-slate-500 block">1.0 km away • ⭐ 4.8</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[9px]">Available</span>
                  <button className="p-2 rounded-xl bg-purple-50 text-[#6c47ff] hover:bg-purple-100"><PhoneCall className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center shrink-0 border border-purple-200">
                    AK
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Anjali Kumari</h4>
                    <span className="text-[10px] text-slate-500 block">1.5 km away</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[9px]">On Duty</span>
                  <button className="p-2 rounded-xl bg-purple-50 text-[#6c47ff] hover:bg-purple-100"><PhoneCall className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center shrink-0 border border-purple-200">
                    SR
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Shobha Rani</h4>
                    <span className="text-[10px] text-slate-500 block">2.1 km away • ⭐ 4.7</span>
                  </div>
                </div>
                <button className="p-2 rounded-xl bg-purple-50 text-[#6c47ff] hover:bg-purple-100"><PhoneCall className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
