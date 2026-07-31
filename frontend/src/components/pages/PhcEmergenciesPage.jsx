import React, { useState } from 'react';
import {
  Building2, Home, Users, UserCheck, MapPin, Navigation, AlertOctagon,
  FileText, Folder, BarChart3, Share2, MessageSquare, Settings, Bell,
  Calendar, ChevronDown, ArrowRight, ShieldCheck, CheckCircle2, Clock,
  Activity, Sparkles, AlertTriangle, Battery, Wifi, Check, X, RefreshCw,
  Award, TrendingUp, TrendingDown, FileSpreadsheet, Download, Send, Menu,
  Plus, MoreVertical, LogOut, Search, ChevronLeft, ChevronRight, Eye,
  Ambulance, Hospital, Phone, HeartPulse, Thermometer, Droplets, Scale,
  User, CheckSquare, Square, Filter
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LineChart, Line } from 'recharts';
import RouteMap from '../RouteMap';
import { MOCK_ROUTE_STOPS } from '../../services/mockData';

import { emergencyService } from '../../services/api';

export default function PhcEmergenciesPage({
  onNavigateToTab,
  onLogout
}) {
  const [selectedCaseId, setSelectedCaseId] = useState('ER-1024');
  const [emergencyCases, setEmergencyCases] = useState([
    {
      caseId: 'ER-1024',
      patientId: 'P-10456',
      patientName: 'Sita Devi',
      age: 29,
      gender: 'Female',
      village: 'Pedda Thimmapur',
      phone: '+91 98765 43210',
      type: 'Pregnancy Complication',
      priority: 'Critical',
      priorityColor: 'bg-red-100 text-red-700',
      status: 'Active',
      statusColor: 'bg-[#6c47ff] text-white',
      riskScore: '91/100',
      reportedTime: '10 min ago',
      eta: '12 min',
      assignedWorker: 'Lakshmi Devi',
      nearestHospital: 'Gandhi Hospital (4.2 km)',
      vitals: { bp: '160/100 mmHg', pulse: '108 bpm', spo2: '91%', temp: '99.1 °F' }
    }
  ]);

  React.useEffect(() => {
    async function fetchRealEmergencies() {
      try {
        const res = await emergencyService.getEmergencies();
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map(em => ({
            caseId: em.id,
            patientId: em.patient_id || 'P-10456',
            patientName: em.patient_name,
            age: em.age || 30,
            gender: em.gender || 'Female',
            village: em.village,
            phone: em.phone || '+91 98765 43210',
            type: em.emergency_type,
            priority: em.priority || 'Critical',
            priorityColor: em.priority === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800',
            status: em.status || 'Active',
            statusColor: em.status === 'Active' ? 'bg-[#6c47ff] text-white' : 'bg-emerald-100 text-emerald-800',
            riskScore: `${em.risk_score || 90}/100`,
            reportedTime: em.reported_time || 'Just now',
            eta: em.eta || '15 min',
            assignedWorker: em.assigned_worker_id || 'Lakshmi Devi',
            nearestHospital: em.nearest_hospital || 'Gandhi Hospital',
            vitals: em.vitals_json || { bp: '150/95 mmHg', pulse: '104 bpm', spo2: '93%', temp: '99.8 °F' }
          }));
          setEmergencyCases(mapped);
          if (mapped[0]) setSelectedCaseId(mapped[0].caseId);
        }
      } catch (err) {
        console.warn("Real emergency fetch notice:", err);
      }
    }
  }, []);

  const selectedCase = emergencyCases.find(c => c.caseId === selectedCaseId) || emergencyCases[0];

  const emergenciesByVillageData = [
    { village: 'Uppal', count: 8 },
    { village: 'Nagole', count: 6 },
    { village: 'Pedda Thimmapur', count: 5 },
    { village: 'Habsiguda', count: 5 },
    { village: 'Ramanthapur', count: 4 }
  ];

  const responseTimeTrend = [
    { day: '21 May', time: 9 },
    { day: '22 May', time: 11 },
    { day: '23 May', time: 14 },
    { day: '24 May', time: 16 },
    { day: '25 May', time: 14 }
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fe] text-slate-900 font-sans">
      {/* 1. LEFT SIDEBAR (PHC Ramanthapur) */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-6">
          {/* Logo Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-[#6c47ff] tracking-tight leading-none">
                PHC Ramanthapur
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">Command Center</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold text-slate-600">
            <button onClick={() => onNavigateToTab && onNavigateToTab('dashboard')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Home className="w-4 h-4" /><span>Dashboard</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('workers')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Users className="w-4 h-4" /><span>ASHA Workers</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('patients')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <UserCheck className="w-4 h-4" /><span>Patients</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('villages')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <MapPin className="w-4 h-4" /><span>Villages</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('routes')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Navigation className="w-4 h-4" /><span>Live Routes</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('emergencies')} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
              <div className="flex items-center gap-3"><AlertOctagon className="w-4 h-4" /><span>Emergencies</span></div>
              <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">4</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <FileText className="w-4 h-4" /><span>Reports</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('resources')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Folder className="w-4 h-4" /><span>Resources</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('analytics')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <BarChart3 className="w-4 h-4" /><span>AI Analytics</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('referrals')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Share2 className="w-4 h-4" /><span>Referrals</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('messaging')} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <div className="flex items-center gap-3"><MessageSquare className="w-4 h-4" /><span>Messaging</span></div>
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center">12</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('settings')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Settings className="w-4 h-4" /><span>Settings</span>
            </button>
          </nav>
        </div>

        {/* AI Assistant Sidebar Promo */}
        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-900 block">AI Assistant</span>
            <p className="text-[11px] text-slate-500 leading-snug">Ask anything about emergencies and patients</p>
          </div>
          <button className="w-full py-2 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center justify-center gap-1">
            Ask AI ✨
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 md:hidden">
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-red-600 fill-current" /> Emergencies
              </h2>
              <p className="text-xs text-slate-500 font-medium">Real-time emergency monitoring and response</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Selector */}
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer">
              <Calendar className="w-3.5 h-3.5 text-purple-600" /> 25 May 2026 <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-600 text-white font-bold text-[9px] flex items-center justify-center">6</span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
                alt="Dr. Ramesh Kumar"
                className="w-9 h-9 rounded-full object-cover border border-purple-200"
              />
              <div className="hidden sm:block text-left text-xs">
                <span className="font-bold text-slate-900 block leading-tight">Dr. Ramesh Kumar</span>
                <span className="text-[10px] text-slate-500 font-semibold">Medical Officer</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* ROW 1: 6 KPI Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Total Emergencies</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">28</span>
                <span className="text-[10px] font-bold text-slate-400">All Time</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Active Emergencies</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">11</span>
                <span className="text-[10px] font-bold text-amber-600">Ongoing Cases</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Critical Emergencies</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">4</span>
                <span className="text-[10px] font-bold text-red-600">High Priority</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Resolved Emergencies</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">13</span>
                <span className="text-[10px] font-bold text-emerald-600">Completed Cases</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Avg Response Time</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">14 min</span>
                <span className="text-[10px] font-bold text-purple-600">Average</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Ambulance className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Available Ambulances</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">6</span>
                <span className="text-[10px] font-bold text-blue-600">Ready</span>
              </div>
            </div>
          </div>

          {/* ROW 2: Live Emergency Map (5 cols), Selected Emergency (3 cols), Emergency Details Panel (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: Live Emergency Map (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-sm">Live Emergency Map</h3>
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-extrabold text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" /> Live
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600" /> Critical</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> High</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Active</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Resolved</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-600" /> Ambulance</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-600" /> Hospital</span>
                  </div>
                </div>

                <div className="h-[340px] rounded-2xl overflow-hidden relative">
                  <RouteMap stops={MOCK_ROUTE_STOPS} workerLocation={{ latitude: 17.3990, longitude: 78.5410 }} />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button className="px-4 py-2 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center gap-1">
                  View All Emergencies <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Col 2: Selected Emergency Summary (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Selected Emergency</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-black text-[10px]">CRITICAL</span>
                    <span className="text-[10px] text-slate-400 font-mono">Case ID: {selectedCase.caseId}</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-slate-900 text-base">{selectedCase.patientName}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-bold text-[10px]">High Risk ({selectedCase.riskScore})</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{selectedCase.age} yrs • {selectedCase.gender}</span>
                  </div>

                  <div className="space-y-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl">
                    <div><span className="text-[10px] text-slate-400 block font-bold">Emergency Type</span><strong>{selectedCase.type}</strong></div>
                    <div><span className="text-[10px] text-slate-400 block font-bold">Village</span><strong>{selectedCase.village}</strong></div>
                    <div><span className="text-[10px] text-slate-400 block font-bold">Reported</span><strong>{selectedCase.reportedTime}</strong></div>
                    <div><span className="text-[10px] text-slate-400 block font-bold">ETA (Estimated)</span><strong className="text-red-600">{selectedCase.eta}</strong></div>
                    <div><span className="text-[10px] text-slate-400 block font-bold">Assigned Worker</span><strong>{selectedCase.assignedWorker}</strong></div>
                    <div><span className="text-[10px] text-slate-400 block font-bold">Nearest Hospital</span><strong>{selectedCase.nearestHospital}</strong></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-extrabold pt-2 border-t border-slate-100">
                <button className="py-2 rounded-xl bg-[#6c47ff] text-white hover:bg-purple-700 shadow-md shadow-purple-600/30 transition-all text-center">
                  View Details
                </button>
                <button onClick={() => alert(`Ambulance dispatched to ${selectedCase.patientName} in ${selectedCase.village}!`)} className="py-2 rounded-xl border border-purple-200 text-[#6c47ff] hover:bg-purple-50 transition-all text-center flex items-center justify-center gap-1">
                  <Ambulance className="w-3.5 h-3.5 text-purple-600" /> Dispatch
                </button>
              </div>
            </div>

            {/* Col 3: Emergency Details Panel (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Emergency Details</h3>

                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl">
                  <div><span className="text-[10px] text-slate-400 block font-bold">Patient ID</span><strong>{selectedCase.patientId}</strong></div>
                  <div><span className="text-[10px] text-slate-400 block font-bold">Age / Gender</span><strong>{selectedCase.age} / {selectedCase.gender}</strong></div>
                  <div><span className="text-[10px] text-slate-400 block font-bold">Phone</span><strong>{selectedCase.phone}</strong></div>
                  <div><span className="text-[10px] text-slate-400 block font-bold">Village</span><strong>{selectedCase.village}</strong></div>
                  <div><span className="text-[10px] text-slate-400 block font-bold">Emergency Type</span><strong>{selectedCase.type}</strong></div>
                  <div><span className="text-[10px] text-slate-400 block font-bold">Risk Score</span><strong className="text-red-600">{selectedCase.riskScore} High</strong></div>
                </div>

                {/* Live Vitals Card */}
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Vitals</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold bg-red-50/50 p-3 rounded-2xl border border-red-100">
                    <div>BP: <strong className="text-red-600">{selectedCase.vitals.bp}</strong></div>
                    <div>Pulse: <strong className="text-slate-900">{selectedCase.vitals.pulse}</strong></div>
                    <div>SpO2: <strong className="text-red-600">{selectedCase.vitals.spo2}</strong></div>
                    <div>Temp: <strong className="text-slate-900">{selectedCase.vitals.temp}</strong></div>
                  </div>
                </div>

                <div className="space-y-1 text-xs font-semibold text-slate-700">
                  <div><span className="text-slate-400 block font-bold">Assigned Worker</span><strong>👤 {selectedCase.assignedWorker}</strong></div>
                  <div><span className="text-slate-400 block font-bold">Route Distance</span><strong>📍 4.2 km</strong></div>
                  <div><span className="text-slate-400 block font-bold">Nearest Hospital</span><strong>🏥 {selectedCase.nearestHospital}</strong></div>
                </div>
              </div>

              <select className="w-full py-2.5 rounded-2xl border border-purple-200 bg-purple-50 text-[#6c47ff] font-extrabold text-xs text-center cursor-pointer focus:outline-none">
                <option>Update Status ∨</option>
                <option>Mark as In Progress</option>
                <option>Mark as Ambulance Dispatched</option>
                <option>Mark as Resolved</option>
              </select>
            </div>
          </div>

          {/* ROW 3: Emergency Queue (4 cols) & All Emergency Activity Table (8 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: Emergency Queue (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Emergency Queue (11)</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  {emergencyCases.map((ec) => (
                    <div
                      key={ec.caseId}
                      onClick={() => setSelectedCaseId(ec.caseId)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        selectedCaseId === ec.caseId ? 'bg-purple-50/70 border-[#6c47ff]' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-400 font-bold">{ec.caseId}</span>
                          <strong className="text-slate-900 text-xs">{ec.patientName}</strong>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${ec.priorityColor}`}>
                          {ec.priority}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                        <span>{ec.type} • {ec.village}</span>
                        <span className="font-bold text-[#6c47ff]">{ec.eta} ETA</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="text-xs text-[#6c47ff] font-bold hover:underline text-center pt-1">
                View all emergencies →
              </button>
            </div>

            {/* Col 2: All Emergency Activity Table (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">All Emergency Activity</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-100">
                      <tr>
                        <th className="p-3">Case ID</th>
                        <th className="p-3">Patient</th>
                        <th className="p-3">Village</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Priority</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {emergencyCases.map((ec) => (
                        <tr
                          key={ec.caseId}
                          onClick={() => setSelectedCaseId(ec.caseId)}
                          className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedCaseId === ec.caseId ? 'bg-purple-50/50' : ''}`}
                        >
                          <td className="p-3 font-mono font-bold text-slate-900">{ec.caseId}</td>
                          <td className="p-3 font-extrabold text-slate-900">{ec.patientName}</td>
                          <td className="p-3 text-slate-800">{ec.village}</td>
                          <td className="p-3 text-slate-800">{ec.type}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${ec.priorityColor}`}>
                              {ec.priority}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${ec.statusColor}`}>
                              {ec.status}
                            </span>
                          </td>
                          <td className="p-3 text-right text-[10px] text-slate-400 font-mono">{ec.reportedTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Showing 1 to 5 of 11 emergencies</span>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="px-3 py-1 rounded-lg bg-[#6c47ff] text-white font-bold">1</button>
                  <button className="px-3 py-1 rounded-lg hover:bg-slate-100 font-bold text-slate-600">2</button>
                  <button className="px-3 py-1 rounded-lg hover:bg-slate-100 font-bold text-slate-600">3</button>
                  <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 4: 4 Analytics Charts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Col 1: Emergencies by Village (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Emergencies by Village</h3>
              <div className="h-28 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={emergenciesByVillageData}>
                    <XAxis dataKey="village" stroke="#94a3b8" fontSize={9} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6c47ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Col 2: Emergency Type Distribution (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Emergency Type Distribution</h3>
              <div className="space-y-1 text-[10px] font-semibold">
                <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-600" /> Pregnancy Complication</span><strong>9 (32%)</strong></div>
                <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#6c47ff]" /> Accident</span><strong>6 (21%)</strong></div>
                <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Fever</span><strong>5 (18%)</strong></div>
                <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Snake Bite</span><strong>4 (14%)</strong></div>
                <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400" /> Others</span><strong>4 (14%)</strong></div>
              </div>
            </div>

            {/* Col 3: Average Response Time (min) (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Average Response Time (min)</h3>
              <div className="h-28 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={responseTimeTrend}>
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={9} />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="time" stroke="#6c47ff" strokeWidth={2} dot={{ r: 3, fill: '#6c47ff' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Col 4: Emergency Status Overview (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Emergency Status Overview</h3>
              <div className="space-y-1 text-[10px] font-semibold">
                <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Resolved</span><strong>13 (46%)</strong></div>
                <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Active</span><strong>11 (39%)</strong></div>
                <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical</span><strong>4 (15%)</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
