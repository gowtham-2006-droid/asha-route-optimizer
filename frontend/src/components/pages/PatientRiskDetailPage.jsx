import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, HeartPulse, Navigation,
  Sparkles, Check, ArrowLeft, Bot, RefreshCw, Info, ChevronRight,
  TrendingUp, Activity, CheckCircle2, AlertTriangle, AlertCircle,
  Calendar, Clock, ShieldCheck, Heart, Thermometer, Droplets, Scale,
  Navigation2, FileSpreadsheet, PhoneCall, HelpCircle, MoreVertical,
  BarChart3, UserCheck, LogOut
} from 'lucide-react';

export default function PatientRiskDetailPage({
  patient,
  currentUser,
  onBack,
  onNavigateToTab,
  onTriggerEmergency,
  onLogout
}) {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 Months');
  const [aiAnswer, setAiAnswer] = useState(null);

  const patientData = patient || {
    name: 'Saraswati Devi',
    age: 68,
    gender: 'Female',
    village: 'Ramanthapur',
    phc: 'Ramanthapur',
    ashaWorker: 'Lakshmi Devi',
    patientId: 'P-100245',
    riskScore: 87,
    riskBand: 'High Risk',
    photoUrl: 'https://images.unsplash.com/photo-1566616213894-26910a39f65e?w=200&auto=format&fit=crop&q=80'
  };

  const handleAskQuestion = (q) => {
    if (q.includes('why')) {
      setAiAnswer("Saraswati Devi is High Risk due to Stage 2 Hypertension (160/95 mmHg), uncontrolled Diabetes (248 mg/dL), age 68, and an overdue follow-up visit of 18 days.");
    } else if (q.includes('reduce')) {
      setAiAnswer("Recommend daily BP monitoring, immediate resumption of anti-hypertensive medication, diabetic diet consultation, and weekly ASHA home check-ups.");
    } else if (q.includes('revisit')) {
      setAiAnswer("Next visit recommended within 3 days (by July 3, 2026) to assess blood pressure response to medication.");
    } else {
      setAiAnswer("Carry: Automatic BP Monitor, Glucometer & Strips, ORS Packets, Amlodipine 5mg, and Emergency Referral Form.");
    }
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
            <button onClick={() => onNavigateToTab('dashboard')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Home className="w-4 h-4" /><span>Dashboard</span>
            </button>
            <button onClick={() => onNavigateToTab('route')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Navigation className="w-4 h-4" /><span>My Route</span>
            </button>
            <button onClick={() => onNavigateToTab('patients')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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
            <button onClick={() => onNavigateToTab('settings')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Settings className="w-4 h-4" /><span>Settings</span>
            </button>
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 font-bold transition-all mt-2">
              <LogOut className="w-4 h-4" /><span>Log Out</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Promo */}
        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <Bot className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-900 block">Need Help?</span>
            <p className="text-[11px] text-slate-500 leading-snug">Ask AI Assistant for health guidance</p>
          </div>
          <button className="w-full py-2 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center justify-center gap-1">
            Chat with AI ✨
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack || (() => onNavigateToTab('dashboard'))}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-lg font-extrabold text-slate-900">AI Risk Score Details</h2>
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

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* ROW 1: Patient Header Card & AI Risk Score Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Patient Profile Header Card (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex items-start gap-5">
              <img
                src={patientData.photoUrl || "https://images.unsplash.com/photo-1566616213894-26910a39f65e?w=200&auto=format&fit=crop&q=80"}
                alt={patientData.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-50 shadow-md shrink-0"
              />
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900 truncate">{patientData.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 font-extrabold text-[11px] shrink-0">
                    High Risk
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600 font-medium">
                  <p className="flex items-center gap-2">
                    <span className="text-slate-400">👤 Age:</span> <strong className="text-slate-800">{patientData.age} • {patientData.gender}</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-400">📍 Village:</span> <strong className="text-slate-800">{patientData.village}</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-400">🏥 PHC:</span> <strong className="text-slate-800">{patientData.phc || 'Ramanthapur'}</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-400">👤 ASHA Worker:</span> <strong className="text-slate-800">{patientData.ashaWorker || 'Lakshmi Devi'}</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-400">🪪 Patient ID:</span> <strong className="text-slate-800 font-mono">{patientData.patientId || 'P-100245'}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: AI Risk Score Gauge Card (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-sm">AI Risk Score</span>
                  <Info className="w-4 h-4 text-slate-400 cursor-pointer" />
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <span>Last Updated: Today, 9:15 AM</span>
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-purple-600 transition-colors" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-2">
                {/* Big Score Display */}
                <div className="text-center sm:text-left space-y-2">
                  <div className="flex items-baseline justify-center sm:justify-start gap-1">
                    <span className="text-5xl font-black text-red-600 tracking-tight">{patientData.riskScore || 87}</span>
                    <span className="text-xl font-bold text-slate-400">/100</span>
                  </div>
                  <div>
                    <span className="px-4 py-1.5 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-sm shadow-red-600/30">
                      HIGH RISK
                    </span>
                  </div>
                </div>

                {/* Semi-Circle Gauge Meter */}
                <div className="relative w-48 h-28 flex items-end justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 55">
                    {/* Background Arc */}
                    <path
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* Gradient Arc */}
                    <defs>
                      <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="35%" stopColor="#f59e0b" />
                        <stop offset="70%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke="url(#scoreGrad)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray="126"
                      strokeDashoffset="15"
                    />
                  </svg>
                  {/* Brain Icon in Center */}
                  <div className="absolute bottom-2 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
                      <BrainCircuitIcon className="w-6 h-6" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 left-2 text-[10px] font-bold text-slate-400">0</span>
                  <span className="absolute bottom-0 right-2 text-[10px] font-bold text-slate-400">100</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-500">
                  Risk Level: <strong className="text-red-600">High</strong>
                </span>
              </div>
            </div>
          </div>

          {/* ROW 2: AI Analysis & Risk Score Trend */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: AI Analysis Card (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#6c47ff]">
                <Sparkles className="w-5 h-5 fill-current" />
                <h3 className="font-extrabold text-slate-900 text-sm">AI Analysis</h3>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                This patient has been classified as <strong className="text-red-600 font-bold">HIGH RISK</strong> because:
              </p>

              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Age above 65</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Diabetes</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Hypertension</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Missed last follow-up <strong className="text-red-600 font-bold">(18 days)</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Blood pressure increased during last visit</span>
                </div>
              </div>

              {/* AI Confidence Bar */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-purple-900">AI Confidence</span>
                  <span className="font-black text-purple-700 text-sm">94%</span>
                </div>
                <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#6c47ff] rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
            </div>

            {/* Right: Risk Score Trend Chart (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm">Risk Score Trend</h3>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-xs text-slate-700 font-bold focus:outline-none focus:border-[#6c47ff]"
                >
                  <option>Last 6 Months</option>
                  <option>Last 3 Months</option>
                  <option>This Year</option>
                </select>
              </div>

              {/* Trend Chart Mock Area */}
              <div className="relative h-48 pt-6 px-2 flex flex-col justify-between">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-bold text-slate-300 pointer-events-none pb-6">
                  <div className="border-b border-slate-100 flex justify-between"><span>100</span></div>
                  <div className="border-b border-slate-100 flex justify-between"><span>75</span></div>
                  <div className="border-b border-slate-100 flex justify-between"><span>50</span></div>
                  <div className="border-b border-slate-100 flex justify-between"><span>25</span></div>
                  <div className="border-b border-slate-100 flex justify-between"><span>0</span></div>
                </div>

                {/* SVG Curve Line */}
                <svg className="absolute inset-0 w-full h-40 mt-3" preserveAspectRatio="none" viewBox="0 0 500 120">
                  <defs>
                    <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 40 80 Q 120 65, 200 75 T 360 40 T 460 20 L 460 120 L 40 120 Z"
                    fill="url(#trendFill)"
                  />
                  <path
                    d="M 40 80 Q 120 65, 200 75 T 360 40 T 460 20"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                  />
                </svg>

                {/* Points overlay */}
                <div className="relative z-10 flex items-end justify-between h-full px-6 pt-4 pb-1">
                  {[
                    { month: 'Jan', val: 62, top: '55%' },
                    { month: 'Feb', val: 70, top: '42%' },
                    { month: 'Mar', val: 65, top: '50%' },
                    { month: 'Apr', val: 78, top: '30%' },
                    { month: 'May', val: 82, top: '22%' },
                    { month: 'Jun', val: 87, top: '12%', active: true },
                  ].map((pt) => (
                    <div key={pt.month} className="flex flex-col items-center relative group">
                      <div className="absolute text-[10px] font-black text-slate-800 -top-5 bg-white px-1 rounded shadow-xs">
                        {pt.val}
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border-2 ${pt.active ? 'bg-red-600 border-white ring-4 ring-red-100 scale-125' : 'bg-red-500 border-white'}`} />
                      <span className="text-[10px] font-bold text-slate-500 mt-8">{pt.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: Latest Health Vitals */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Latest Health Vitals <span className="text-xs text-slate-400 font-semibold">(Last Visit: 18 Jun 2026)</span>
              </h3>
              <button className="text-xs text-[#6c47ff] font-bold flex items-center gap-1 hover:underline">
                View All Vitals <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* BP */}
              <div className="p-4 rounded-3xl bg-red-50/40 border border-red-100 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-red-500">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="text-[11px] font-bold text-slate-600">Blood Pressure</span>
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 block leading-tight">160/95</span>
                  <span className="text-[10px] text-slate-400 font-semibold">mmHg</span>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-extrabold text-[10px]">
                  High
                </span>
              </div>

              {/* Blood Sugar */}
              <div className="p-4 rounded-3xl bg-red-50/40 border border-red-100 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-blue-500">
                  <Droplets className="w-4 h-4 fill-current" />
                  <span className="text-[11px] font-bold text-slate-600">Blood Sugar</span>
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 block leading-tight">248</span>
                  <span className="text-[10px] text-slate-400 font-semibold">mg/dL</span>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-extrabold text-[10px]">
                  High
                </span>
              </div>

              {/* BMI */}
              <div className="p-4 rounded-3xl bg-amber-50/40 border border-amber-100 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-500">
                  <Scale className="w-4 h-4" />
                  <span className="text-[11px] font-bold text-slate-600">BMI</span>
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 block leading-tight">28.6</span>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[10px]">
                  Overweight
                </span>
              </div>

              {/* Heart Rate */}
              <div className="p-4 rounded-3xl bg-red-50/40 border border-red-100 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-red-500">
                  <Activity className="w-4 h-4" />
                  <span className="text-[11px] font-bold text-slate-600">Heart Rate</span>
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 block leading-tight">92</span>
                  <span className="text-[10px] text-slate-400 font-semibold">bpm</span>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-extrabold text-[10px]">
                  High
                </span>
              </div>

              {/* Temperature */}
              <div className="p-4 rounded-3xl bg-emerald-50/40 border border-emerald-100 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-500">
                  <Thermometer className="w-4 h-4" />
                  <span className="text-[11px] font-bold text-slate-600">Temperature</span>
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 block leading-tight">98.7</span>
                  <span className="text-[10px] text-slate-400 font-semibold">°F</span>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                  Normal
                </span>
              </div>
            </div>
          </div>

          {/* ROW 4: 3-Column Grid (Medical History, AI Recommended Actions, Risk Prediction) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: Medical History (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <h3 className="font-extrabold text-slate-900 text-sm">Medical History</h3>
              </div>

              <div className="relative pl-6 space-y-4 text-xs font-semibold border-l-2 border-slate-100">
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">✓</span>
                  <div className="text-slate-400 text-[10px] font-bold">Jan 2026</div>
                  <div className="text-slate-900 font-bold">Pregnancy Check</div>
                  <div className="text-slate-500 text-[11px]">Normal</div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">✓</span>
                  <div className="text-slate-400 text-[10px] font-bold">Feb 2026</div>
                  <div className="text-slate-900 font-bold">BP Check</div>
                  <div className="text-slate-500 text-[11px]">140/90 mmHg</div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">✓</span>
                  <div className="text-slate-400 text-[10px] font-bold">Mar 2026</div>
                  <div className="text-slate-900 font-bold">Vaccination</div>
                  <div className="text-slate-500 text-[11px]">Tetanus</div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">✓</span>
                  <div className="text-slate-400 text-[10px] font-bold">Apr 2026</div>
                  <div className="text-slate-900 font-bold">Diabetes Screening</div>
                  <div className="text-slate-500 text-[11px]">FBS: 180 mg/dL</div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-white text-[9px] font-bold">!</span>
                  <div className="text-slate-400 text-[10px] font-bold">May 2026</div>
                  <div className="text-amber-600 font-bold">Missed Follow-up</div>
                  <div className="text-slate-500 text-[11px]">Due on 28 May</div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-white text-[9px] font-bold">!</span>
                  <div className="text-red-600 text-[10px] font-extrabold">Today •</div>
                  <div className="text-red-600 font-black">High Risk Detected</div>
                  <div className="text-slate-700 font-extrabold text-[11px]">Score: 87/100</div>
                </div>
              </div>
            </div>

            {/* Col 2: AI Recommended Actions (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-600" />
                  <h3 className="font-extrabold text-slate-900 text-sm">AI Recommended Actions</h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50">
                    <span className="text-slate-500 font-medium">Priority</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-extrabold text-[10px] uppercase">
                      URGENT
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50">
                    <span className="text-slate-500 font-medium">Recommended Visit</span>
                    <strong className="text-slate-900 font-bold">Today</strong>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50">
                    <span className="text-slate-500 font-medium">Estimated Visit Duration</span>
                    <strong className="text-slate-900 font-bold">18 minutes</strong>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50">
                    <span className="text-slate-500 font-medium">Recommended Medicine</span>
                    <strong className="text-slate-900 font-bold">ORS, BP Tablets</strong>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50">
                    <span className="text-slate-500 font-medium">Suggested Next Check-up</span>
                    <strong className="text-slate-900 font-bold">Within 3 days</strong>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100 text-xs text-purple-950 font-medium leading-relaxed">
                Make sure to counsel the patient on diet, medication adherence and regular follow-up.
              </div>
            </div>

            {/* Col 3: Risk Prediction (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-slate-900 text-sm">Risk Prediction</h3>
              </div>

              <div className="text-center space-y-2">
                <span className="text-xs text-slate-500 font-medium block">Probability of Emergency</span>

                {/* Donut Chart */}
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3.5"
                      strokeDasharray="78, 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-black text-slate-900">78%</span>
                    <span className="text-[10px] font-extrabold text-red-600">High</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <span className="font-extrabold text-slate-900 block">Possible Complications</span>
                <ul className="space-y-1 text-slate-600 font-semibold pl-2">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Stroke</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Dehydration</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> High BP Crisis</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Heart Complications</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ROW 5: Bottom 3 Cards (Similar Patients, AI Insights, Ask AI Assistant) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Similar Patients (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Similar Patients (AI)</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Patients with similar risk score</p>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center">
                        L
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Lakshmi</h4>
                        <span className="text-[10px] text-slate-500">Age: 70 • Score: 89</span>
                      </div>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-red-100 text-red-700 font-black text-xs flex items-center justify-center">
                      89
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center">
                        A
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Anitha</h4>
                        <span className="text-[10px] text-slate-500">Age: 66 • Score: 84</span>
                      </div>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center">
                      84
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center">
                        R
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Rani</h4>
                        <span className="text-[10px] text-slate-500">Age: 69 • Score: 81</span>
                      </div>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center">
                      81
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigateToTab('patients')}
                className="w-full py-2.5 rounded-2xl border border-purple-200 text-[#6c47ff] hover:bg-purple-50 font-bold text-xs flex items-center justify-center gap-1 transition-all"
              >
                View More Patients <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* AI Insights (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="font-extrabold text-slate-900 text-sm">AI Insights</h3>
              </div>

              <div className="space-y-3 text-xs font-semibold text-slate-700">
                <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-purple-50/50">
                  <TrendingUp className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Risk score increased by 9% in last 30 days</span>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-red-50/50">
                  <Heart className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>BP is consistently high in last 2 visits</span>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-amber-50/50">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Patient missed 1 follow-up appointments</span>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-emerald-50/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Regular monitoring strongly recommended</span>
                </div>
              </div>
            </div>

            {/* Ask AI Assistant (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-600" />
                  <h3 className="font-extrabold text-slate-900 text-sm">Ask AI Assistant</h3>
                </div>

                {/* Question buttons */}
                <div className="space-y-2 text-xs">
                  <button
                    onClick={() => handleAskQuestion('why')}
                    className="w-full text-left p-2.5 rounded-2xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100/70 text-purple-900 font-semibold transition-all flex items-center justify-between"
                  >
                    <span>❓ Why is this patient high risk?</span>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  </button>

                  <button
                    onClick={() => handleAskQuestion('reduce')}
                    className="w-full text-left p-2.5 rounded-2xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100/70 text-purple-900 font-semibold transition-all flex items-center justify-between"
                  >
                    <span>❓ How can I reduce this risk?</span>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  </button>

                  <button
                    onClick={() => handleAskQuestion('revisit')}
                    className="w-full text-left p-2.5 rounded-2xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100/70 text-purple-900 font-semibold transition-all flex items-center justify-between"
                  >
                    <span>❓ When should I revisit?</span>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  </button>

                  <button
                    onClick={() => handleAskQuestion('carry')}
                    className="w-full text-left p-2.5 rounded-2xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100/70 text-purple-900 font-semibold transition-all flex items-center justify-between"
                  >
                    <span>❓ What medicines should I carry?</span>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  </button>
                </div>

                {/* AI Answer Box if clicked */}
                {aiAnswer && (
                  <div className="p-3 rounded-2xl bg-purple-900 text-white text-xs space-y-1 animate-fade-in shadow-md">
                    <span className="font-bold text-purple-300 block text-[10px] uppercase">Gemini AI Answer:</span>
                    <p>{aiAnswer}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setAiAnswer("Type your custom question in the chat prompt.")}
                className="w-full py-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                Ask More Questions ✨
              </button>
            </div>
          </div>

          {/* QUICK ACTIONS BOTTOM BAR */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider hidden sm:block">Quick Actions</span>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => onNavigateToTab('route')}
                className="px-4 py-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-600/25 transition-all"
              >
                <Navigation className="w-4 h-4 fill-current" /> Start Navigation
              </button>

              <button
                onClick={() => alert(`Schedule Visit initiated for ${patientData.name}`)}
                className="px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4 text-emerald-600" /> Schedule Visit
              </button>

              <button
                onClick={() => alert(`Generating AI Clinical Report for ${patientData.name}...`)}
                className="px-4 py-2.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-blue-600" /> Generate AI Report
              </button>

              <button
                onClick={() => alert(`Marked Saraswati Devi visit as COMPLETED!`)}
                className="px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-600" /> Mark as Visited
              </button>

              <button
                onClick={onTriggerEmergency}
                className="px-4 py-2.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <AlertOctagon className="w-4 h-4 text-red-600" /> Emergency Referral
              </button>

              <button className="p-2.5 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrainCircuitIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 0 5.61 4 4 0 0 0 2.726 5.72 3 3 0 1 0 5.797-1.425" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1 0 5.61 4 4 0 0 1-2.726 5.72 3 3 0 1 1-5.797-1.425" />
      <path d="M12 19v-4" />
      <path d="M12 11V7" />
      <path d="M12 11h3" />
      <path d="M12 11H9" />
    </svg>
  );
}
