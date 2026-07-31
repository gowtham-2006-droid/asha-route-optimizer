import React, { useState, useEffect } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, HeartPulse, Navigation,
  Sparkles, Check, ArrowLeft, Bot, RefreshCw, Info, ChevronRight,
  TrendingUp, Activity, CheckCircle2, AlertTriangle, AlertCircle,
  Calendar, Clock, ShieldCheck, Heart, Thermometer, Droplets, Scale,
  PhoneCall, HelpCircle, MoreVertical, BarChart3, UserCheck, Pill,
  CheckSquare, Square, FileSpreadsheet, Lock, Phone, User, Stethoscope,
  X, LogOut
} from 'lucide-react';

export default function PatientVisitPage({
  patient,
  currentUser,
  onBack,
  onNavigateToTab,
  onTriggerEmergency,
  onLogout
}) {
  // Visit Timer State (Counts up from 17 mins 32 secs)
  const [seconds, setSeconds] = useState(1052);
  const [activeAiAnswer, setActiveAiAnswer] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Form Vitals State
  const [vitals, setVitals] = useState({
    systolic: '160',
    diastolic: '95',
    sugar: '248',
    temp: '98.7',
    weight: '62.5',
    pulse: '92',
    spo2: '97',
    symptoms: 'Headache, Dizziness',
    painLevel: 6,
    notes: 'Patient feels tired and had headache since morning.'
  });

  // Medicines Checked State
  const [medicines, setMedicines] = useState({
    ors: true,
    bpTablets: true,
    ironTablets: true,
    calciumTablets: false,
    insulin: false,
    remarks: 'Take BP tablet after food. Avoid salt.'
  });

  // Checklist State
  const [checklist, setChecklist] = useState({
    bpChecked: true,
    sugarChecked: true,
    counsellingDone: true,
    vaccinationVerified: true,
    referredPHC: false
  });

  // Family Notes State
  const [familyNotes, setFamilyNotes] = useState({
    familyLiving: true,
    livingAlone: false,
    caregiverNeeded: false,
    financialDiff: true,
    transportation: false,
    additional: 'Family cooperative. Needs diet counselling.'
  });

  const handleAskQuestion = (q) => {
    if (q.includes('increasing')) {
      setActiveAiAnswer("BP has risen from 140/90 (Feb) to 160/95 due to medication non-adherence over the past 18 days and high sodium diet intake.");
    } else if (q.includes('referred')) {
      setActiveAiAnswer("If BP remains > 160 mmHg after 10 mins rest, immediate PHC Medical Officer consultation is required.");
    } else if (q.includes('lifestyle')) {
      setActiveAiAnswer("Advise strict low-sodium (<2g/day) DASH diet, 20-min daily light walk, and stress reduction exercises.");
    } else {
      setActiveAiAnswer("1. Explain importance of taking Amlodipine daily.\n2. Advise family members to monitor meal salt content.\n3. Schedule follow-up visit within 3 days.");
    }
  };

  const patientData = patient || {
    name: 'Saraswati Devi',
    age: 68,
    gender: 'Female',
    village: 'Habsiguda',
    address: 'H. No: 12-85, Street No. 4, Ramanthapur Village',
    phone: '+91 98765 43210',
    bloodGroup: 'O+',
    emergencyContact: 'Ramesh (Son) +91 99876 54321',
    assignedAsha: 'Lakshmi Devi',
    lastVisit: '18 Jun 2026',
    status: 'High Risk',
    photoUrl: 'https://images.unsplash.com/photo-1566616213894-26910a39f65e?w=200&auto=format&fit=crop&q=80'
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

          {/* Sidebar Menu Links */}
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
            <button onClick={() => onNavigateToTab('next_patient')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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

        {/* AI Sidebar Card */}
        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <Bot className="w-5 h-5" />
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
          <div className="flex items-center gap-4">
            <button
              onClick={onBack || (() => onNavigateToTab('dashboard'))}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-extrabold text-slate-900 leading-tight">Patient Visit</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> GPS Connected
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-purple-600" /> PHC Ramanthapur
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Visit Duration Timer */}
            <div className="px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-extrabold text-purple-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#6c47ff]" />
              <span>Visit Duration</span>
              <span className="font-mono text-purple-700">{formatTimer(seconds)}</span>
            </div>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center border border-purple-200">
                LD
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-bold text-slate-900 block leading-tight">{currentUser?.name || 'Lakshmi Devi'}</span>
                <span className="text-[10px] text-slate-500 font-semibold">ASHA Worker</span>
              </div>
              <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* ROW 1: Patient Header Banner & 4 Stat Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Patient Header Banner (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
              <img
                src={patientData.photoUrl || "https://images.unsplash.com/photo-1566616213894-26910a39f65e?w=200&auto=format&fit=crop&q=80"}
                alt={patientData.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-purple-50 shadow-md shrink-0"
              />
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900 truncate">{patientData.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 font-extrabold text-[11px] shrink-0">
                    High Risk
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-600">
                  {patientData.age} Years • {patientData.gender}
                </p>
                <div className="pt-1">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-extrabold text-[11px]">
                    Today's Visit: <span className="text-[#6c47ff]">Follow-up</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Stat Cards (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 block pt-1">Scheduled Time</span>
                <strong className="text-base font-black text-slate-900 block">10:30 AM</strong>
              </div>

              <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 block pt-1">Started At</span>
                <strong className="text-base font-black text-slate-900 block">10:32 AM</strong>
              </div>

              <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 block pt-1">Visit Type</span>
                <strong className="text-base font-black text-slate-900 block">Follow-up</strong>
              </div>

              <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 block pt-1">Est. Duration</span>
                <strong className="text-base font-black text-slate-900 block">18 mins</strong>
              </div>
            </div>
          </div>

          {/* ROW 2: Patient Summary & AI Visit Assistant */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Card: Patient Summary (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-purple-600" />
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Patient Summary</h4>
              </div>

              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex items-start justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><Home className="w-3.5 h-3.5" /> Village</span>
                  <strong className="text-slate-900">{patientData.village}</strong>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Address</span>
                  <strong className="text-slate-900 text-right max-w-[200px]">{patientData.address}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone</span>
                  <strong className="text-slate-900">{patientData.phone}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><Droplets className="w-3.5 h-3.5" /> Blood Group</span>
                  <strong className="text-slate-900">{patientData.bloodGroup}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5" /> Emergency Contact</span>
                  <strong className="text-slate-900 text-right">{patientData.emergencyContact}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Assigned ASHA</span>
                  <strong className="text-slate-900">{patientData.assignedAsha}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Last Visit</span>
                  <strong className="text-slate-900">{patientData.lastVisit}</strong>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-slate-400 flex items-center gap-1.5"><AlertOctagon className="w-3.5 h-3.5 text-red-500" /> Current Status</span>
                  <strong className="text-red-600 font-extrabold">{patientData.status}</strong>
                </div>
              </div>
            </div>

            {/* Right Card: AI Visit Assistant (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-600">
                  <Sparkles className="w-5 h-5 fill-current" />
                  <h4 className="font-extrabold text-slate-900 text-sm">AI Visit Assistant</h4>
                </div>
                <button className="text-xs text-slate-400 hover:text-purple-600 font-medium flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> What is this?
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Left Objectives Checklist (7 cols) */}
                <div className="sm:col-span-7 p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2.5">
                  <span className="text-xs font-extrabold text-purple-950 block">Today's Objectives</span>

                  <div className="space-y-2 text-xs font-semibold text-purple-900">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6c47ff] text-white flex items-center justify-center text-[10px]">✓</div>
                      <span>Check Blood Pressure</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6c47ff] text-white flex items-center justify-center text-[10px]">✓</div>
                      <span>Measure Blood Sugar</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6c47ff] text-white flex items-center justify-center text-[10px]">✓</div>
                      <span>Verify medicine usage</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-[10px]">👥</div>
                      <span>Counsel family</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6c47ff] text-white flex items-center justify-center text-[10px]">✓</div>
                      <span>Schedule next visit</span>
                    </div>
                  </div>
                </div>

                {/* Right Robot Mascot Card (5 cols) */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-gradient-to-b from-purple-50 to-indigo-50 border border-purple-100 space-y-2">
                  {/* Robot Mascot graphic */}
                  <div className="w-16 h-16 rounded-full bg-purple-100 border-2 border-purple-200 flex items-center justify-center text-[#6c47ff] shadow-md">
                    <Bot className="w-9 h-9 animate-bounce" />
                  </div>

                  <div className="w-full p-2.5 rounded-xl bg-purple-100/80 border border-purple-200 space-y-0.5">
                    <span className="text-[10px] font-bold text-purple-700 block">Estimated completion time</span>
                    <strong className="text-xl font-black text-purple-950 block">18 mins</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: Health Assessment (Left) & AI Live Analysis (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Health Assessment Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-purple-600" />
                  <h4 className="font-extrabold text-slate-900 text-sm">Health Assessment</h4>
                </div>
                <button className="text-xs text-[#6c47ff] font-bold hover:underline">View History</button>
              </div>

              {/* Vitals Form Grid */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Blood Pressure <span className="text-[9px] font-normal">(mmHg)</span></label>
                  <input
                    type="text"
                    value={`${vitals.systolic} / ${vitals.diastolic}`}
                    onChange={(e) => {
                      const parts = e.target.value.split('/');
                      setVitals(prev => ({ ...prev, systolic: parts[0] || '160', diastolic: parts[1] || '95' }));
                    }}
                    className="w-full px-3 py-2 bg-red-50/50 border border-red-300 text-red-600 font-extrabold rounded-xl text-center focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Blood Sugar <span className="text-[9px] font-normal">(mg/dL)</span></label>
                  <input
                    type="text"
                    value={vitals.sugar}
                    onChange={(e) => setVitals(prev => ({ ...prev, sugar: e.target.value }))}
                    className="w-full px-3 py-2 bg-red-50/50 border border-red-300 text-red-600 font-extrabold rounded-xl text-center focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Temperature <span className="text-[9px] font-normal">(°F)</span></label>
                  <input
                    type="text"
                    value={vitals.temp}
                    onChange={(e) => setVitals(prev => ({ ...prev, temp: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl text-center focus:outline-none focus:border-[#6c47ff]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Weight <span className="text-[9px] font-normal">(kg)</span></label>
                  <input
                    type="text"
                    value={vitals.weight}
                    onChange={(e) => setVitals(prev => ({ ...prev, weight: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl text-center focus:outline-none focus:border-[#6c47ff]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Pulse <span className="text-[9px] font-normal">(bpm)</span></label>
                  <input
                    type="text"
                    value={vitals.pulse}
                    onChange={(e) => setVitals(prev => ({ ...prev, pulse: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl text-center focus:outline-none focus:border-[#6c47ff]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Oxygen Saturation <span className="text-[9px] font-normal">(SpO2 %)</span></label>
                  <input
                    type="text"
                    value={vitals.spo2}
                    onChange={(e) => setVitals(prev => ({ ...prev, spo2: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl text-center focus:outline-none focus:border-[#6c47ff]"
                  />
                </div>
              </div>

              {/* Symptoms & Pain Slider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Symptoms</label>
                  <select
                    value={vitals.symptoms}
                    onChange={(e) => setVitals(prev => ({ ...prev, symptoms: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none"
                  >
                    <option>Headache, Dizziness</option>
                    <option>Fever, Cough</option>
                    <option>Abdominal Pain</option>
                    <option>Shortness of Breath</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className="text-slate-400">Pain Level (0-10)</span>
                    <span className="text-purple-600 font-black">{vitals.painLevel}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={vitals.painLevel}
                    onChange={(e) => setVitals(prev => ({ ...prev, painLevel: Number(e.target.value) }))}
                    className="w-full accent-[#6c47ff]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Notes</label>
                <textarea
                  rows="2"
                  value={vitals.notes}
                  onChange={(e) => setVitals(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#6c47ff]"
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-1">
                <span>Last Recorded: 18 Jun 2026, 10:10 AM</span>
                <button className="text-[#6c47ff] font-bold hover:underline">View History</button>
              </div>
            </div>

            {/* Right: AI Live Analysis (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-600">
                    <Bot className="w-5 h-5" />
                    <h4 className="font-extrabold text-slate-900 text-sm">AI Live Analysis</h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Live
                  </span>
                </div>

                {/* Red Callout Box */}
                <div className="p-4 rounded-2xl bg-red-50/60 border border-red-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-extrabold text-red-600 text-xs">Blood Pressure: 160/95 mmHg</h5>
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[9px] font-black uppercase">
                      Elevated
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    Blood pressure remains elevated. Recommend rest and re-check after 10 mins. Refer to PHC if it stays above 160 after rest.
                  </p>
                </div>

                {/* AI Confidence */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-purple-900">AI Confidence</span>
                    <span className="text-[#6c47ff] text-sm font-black">93%</span>
                  </div>
                  <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6c47ff] rounded-full" style={{ width: '93%' }} />
                  </div>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-extrabold text-xs">High Risk</span>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs">Monitor Closely</span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">Lifestyle Advice</span>
              </div>
            </div>
          </div>

          {/* ROW 4: 3 Columns (Medicine Distributed, Visit Checklist, Family & Home Notes) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: Medicine Distributed (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Pill className="w-4 h-4 text-purple-600" />
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Medicine Distributed</h4>
              </div>

              <div className="space-y-2 text-xs font-semibold">
                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={medicines.ors} onChange={(e) => setMedicines(prev=>({ ...prev, ors: e.target.checked }))} className="rounded border-slate-300 text-[#6c47ff]" />
                    <span>ORS</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">1 Packet</span>
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={medicines.bpTablets} onChange={(e) => setMedicines(prev=>({ ...prev, bpTablets: e.target.checked }))} className="rounded border-slate-300 text-[#6c47ff]" />
                    <span>BP Tablets <span className="text-[10px] text-slate-400 font-normal">(Amlodipine 5mg)</span></span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">10 Tablets</span>
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={medicines.ironTablets} onChange={(e) => setMedicines(prev=>({ ...prev, ironTablets: e.target.checked }))} className="rounded border-slate-300 text-[#6c47ff]" />
                    <span>Iron Tablets</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">15 Tablets</span>
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={medicines.calciumTablets} onChange={(e) => setMedicines(prev=>({ ...prev, calciumTablets: e.target.checked }))} className="rounded border-slate-300 text-[#6c47ff]" />
                    <span>Calcium Tablets</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">—</span>
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={medicines.insulin} onChange={(e) => setMedicines(prev=>({ ...prev, insulin: e.target.checked }))} className="rounded border-slate-300 text-[#6c47ff]" />
                    <span>Insulin</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">—</span>
                </label>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Remarks / Instructions</label>
                <input
                  type="text"
                  value={medicines.remarks}
                  onChange={(e) => setMedicines(prev => ({ ...prev, remarks: e.target.value }))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#6c47ff]"
                />
              </div>
            </div>

            {/* Col 2: Visit Checklist (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <CheckSquare className="w-4 h-4 text-purple-600" />
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Visit Checklist</h4>
                </div>

                <div className="space-y-2.5 text-xs font-semibold">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
                    <span className="text-slate-800">BP Checked</span>
                  </div>

                  <div className="flex items-center gap-2 text-emerald-600">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
                    <span className="text-slate-800">Sugar Checked</span>
                  </div>

                  <div className="flex items-center gap-2 text-emerald-600">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
                    <span className="text-slate-800">Counselling Done</span>
                  </div>

                  <div className="flex items-center gap-2 text-emerald-600">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
                    <span className="text-slate-800">Vaccination Verified</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="w-4 h-4 rounded border border-slate-300" />
                    <span>Referred to PHC (If needed)</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-emerald-600 font-extrabold">80%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
            </div>

            {/* Col 3: Family & Home Notes (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Users className="w-4 h-4 text-purple-600" />
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Family & Home Notes</h4>
              </div>

              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={familyNotes.familyLiving} onChange={(e) => setFamilyNotes(prev=>({ ...prev, familyLiving: e.target.checked }))} className="rounded border-slate-300 text-[#6c47ff]" />
                  <span>Lives with son and daughter-in-law</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={familyNotes.livingAlone} onChange={(e) => setFamilyNotes(prev=>({ ...prev, livingAlone: e.target.checked }))} className="rounded border-slate-300 text-[#6c47ff]" />
                  <span>Living Alone</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={familyNotes.caregiverNeeded} onChange={(e) => setFamilyNotes(prev=>({ ...prev, caregiverNeeded: e.target.checked }))} className="rounded border-slate-300 text-[#6c47ff]" />
                  <span>Needs caregiver support</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={familyNotes.financialDiff} onChange={(e) => setFamilyNotes(prev=>({ ...prev, financialDiff: e.target.checked }))} className="rounded border-slate-300 text-[#6c47ff]" />
                  <span>Financial difficulty</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={familyNotes.transportation} onChange={(e) => setFamilyNotes(prev=>({ ...prev, transportation: e.target.checked }))} className="rounded border-slate-300 text-[#6c47ff]" />
                  <span>Transportation unavailable</span>
                </label>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Additional Notes</label>
                <input
                  type="text"
                  value={familyNotes.additional}
                  onChange={(e) => setFamilyNotes(prev => ({ ...prev, additional: e.target.value }))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#6c47ff]"
                />
              </div>
            </div>
          </div>

          {/* ROW 5: 3 Columns (AI Recommendations, Visit Timeline, Ask AI Assistant) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: AI Recommendations (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">AI Recommendations</h4>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-500 font-medium">Priority Action</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-800">Refer to PHC</span>
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[9px] font-black uppercase">Urgent</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-500 font-medium">Next Visit</span>
                    <span className="text-slate-900 font-bold">Within 3 days</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-500 font-medium">Medicine Reminder</span>
                    <span className="text-slate-900 font-bold">Continue BP medication</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-500 font-medium">Diet Advice</span>
                    <span className="text-slate-900 font-bold">Reduce salt intake</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-500 font-medium">Exercise</span>
                    <span className="text-slate-900 font-bold">20-minute walk daily</span>
                  </div>
                </div>
              </div>

              <button className="text-xs text-[#6c47ff] font-bold flex items-center justify-start gap-1 hover:underline pt-2">
                View Detailed Recommendations <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Col 2: Visit Timeline (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Visit Timeline</h4>
              </div>

              <div className="relative pl-6 space-y-3.5 text-xs font-semibold border-l-2 border-slate-100">
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">✓</span>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold">10:32 AM</span>
                    <span className="text-slate-900 font-bold">Visit Started</span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">✓</span>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold">10:35 AM</span>
                    <span className="text-slate-900 font-bold">Vitals Recorded</span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">✓</span>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold">10:37 AM</span>
                    <span className="text-slate-900 font-bold">AI Analysis</span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center text-white text-[9px] font-bold">●</span>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-purple-600 font-bold">10:40 AM</span>
                    <span className="text-[#6c47ff] font-bold">Medicine Given</span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center text-white text-[9px] font-bold">●</span>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-purple-600 font-bold">10:45 AM</span>
                    <span className="text-[#6c47ff] font-bold">Counselling</span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center text-white text-[9px] font-bold">●</span>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-purple-600 font-bold">10:49 AM</span>
                    <span className="text-[#6c47ff] font-bold">Visit Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3: Ask AI Assistant (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-600" />
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Ask AI Assistant</h4>
                </div>

                <div className="space-y-2 text-xs">
                  <button
                    onClick={() => handleAskQuestion('increasing')}
                    className="w-full text-left p-2.5 rounded-2xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100 text-purple-950 font-semibold transition-all"
                  >
                    Why is BP increasing?
                  </button>

                  <button
                    onClick={() => handleAskQuestion('referred')}
                    className="w-full text-left p-2.5 rounded-2xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100 text-purple-950 font-semibold transition-all"
                  >
                    Should this patient be referred?
                  </button>

                  <button
                    onClick={() => handleAskQuestion('lifestyle')}
                    className="w-full text-left p-2.5 rounded-2xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100 text-purple-950 font-semibold transition-all"
                  >
                    What lifestyle changes should I advise?
                  </button>

                  <button
                    onClick={() => handleAskQuestion('counselling')}
                    className="w-full text-left p-2.5 rounded-2xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100 text-purple-950 font-semibold transition-all"
                  >
                    Generate counselling points
                  </button>
                </div>

                {activeAiAnswer && (
                  <div className="p-3 rounded-2xl bg-purple-950 text-white text-xs space-y-1 animate-fade-in shadow-md">
                    <span className="font-bold text-purple-300 block text-[9px] uppercase">AI Response:</span>
                    <p className="whitespace-pre-line">{activeAiAnswer}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setActiveAiAnswer("Type custom query in chat assistant.")}
                className="w-full py-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-1"
              >
                Ask More Questions ✨
              </button>
            </div>
          </div>

          {/* BOTTOM ACTION BAR */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => alert("Progress Saved Successfully!")}
                className="px-4 py-2.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-blue-600" /> Save Progress
              </button>

              <button
                onClick={() => alert("Generating Clinical Home Visit Report...")}
                className="px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Generate Visit Report
              </button>

              <button
                onClick={() => alert("Calling PHC Doctor (+91 98765 00000)...")}
                className="px-4 py-2.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 hover:bg-purple-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#6c47ff]" /> Call Doctor
              </button>

              <button
                onClick={onTriggerEmergency}
                className="px-4 py-2.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <AlertOctagon className="w-4 h-4 text-red-600" /> Emergency Referral
              </button>

              <button
                onClick={() => {
                  alert(`Home Visit for ${patientData.name} successfully COMPLETED!`);
                  onNavigateToTab('dashboard');
                }}
                className="px-5 py-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-purple-600/30 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" /> Complete Visit
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mx-auto sm:mx-0">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>All data is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
