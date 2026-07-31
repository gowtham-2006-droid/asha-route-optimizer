import React, { useState } from 'react';
import {
  Building2, Home, Users, UserCheck, MapPin, Navigation, AlertOctagon,
  FileText, Folder, BarChart3, Share2, MessageSquare, Settings, Bell,
  Calendar, ChevronDown, ArrowRight, ShieldCheck, CheckCircle2, Clock,
  Activity, Sparkles, AlertTriangle, Battery, Wifi, Check, X, RefreshCw,
  Award, TrendingUp, TrendingDown, FileSpreadsheet, Download, Send, Menu,
  Plus, MoreVertical, LogOut, Search, Baby, Syringe, Eye, ChevronLeft,
  ChevronRight, Filter, UserPlus, FileSpreadsheet as FileCsv
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LineChart, Line } from 'recharts';

export default function PhcPatientsPage({
  onNavigateToTab,
  onLogout,
  onSelectPatient
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVillage, setFilterVillage] = useState('All Villages');
  const [filterRisk, setFilterRisk] = useState('All Risk Levels');
  const [filterDisease, setFilterDisease] = useState('All Diseases');
  const [filterAsha, setFilterAsha] = useState('All ASHA Workers');
  const [filterGender, setFilterGender] = useState('All Gender');
  const [filterAge, setFilterAge] = useState('All Age Groups');
  const [filterStatus, setFilterStatus] = useState('Visit Status');

  const phcPatients = [
    { id: 'PT001234', name: 'Saraswati Devi', age: 68, gender: 'F', village: 'Ramanthapur', disease: 'Diabetes, Hypertension', riskScore: 87, riskBand: 'High Risk', riskBadgeColor: 'bg-red-100 text-red-700', asha: 'Lakshmi Devi', ashaAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', lastVisit: '2 days ago (23 May 2026)', nextVisit: 'Tomorrow (26 May 2026)', photoUrl: 'https://images.unsplash.com/photo-1566616213894-26910a39f65e?w=100&auto=format&fit=crop&q=80' },
    { id: 'PT001235', name: 'Rani Lakshmi', age: 54, gender: 'F', village: 'Pedda Thimmapur', disease: 'BP, Arthritis', riskScore: 74, riskBand: 'High Risk', riskBadgeColor: 'bg-red-100 text-red-700', asha: 'Sita Devi', ashaAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', lastVisit: '5 days ago (20 May 2026)', nextVisit: 'In 2 days (27 May 2026)', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80' },
    { id: 'PT001236', name: 'Ramesh (Son)', age: 62, gender: 'M', village: 'Habsiguda', disease: 'Diabetes', riskScore: 62, riskBand: 'Medium Risk', riskBadgeColor: 'bg-amber-100 text-amber-800', asha: 'Lakshmi Devi', ashaAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', lastVisit: '1 week ago (18 May 2026)', nextVisit: 'In 5 days (30 May 2026)', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { id: 'PT001237', name: 'Anitha Reddy', age: 34, gender: 'F', village: 'Nandigama', disease: 'Pregnancy', riskScore: 55, riskBand: 'Medium Risk', riskBadgeColor: 'bg-amber-100 text-amber-800', asha: 'Meena Kumari', ashaAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80', lastVisit: '3 days ago (22 May 2026)', nextVisit: 'In 4 days (29 May 2026)', photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80' },
    { id: 'PT001238', name: 'Meena Kumari', age: 27, gender: 'F', village: 'Uppal', disease: 'Pregnancy', riskScore: 48, riskBand: 'Low Risk', riskBadgeColor: 'bg-emerald-100 text-emerald-800', asha: 'Meena Kumari', ashaAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80', lastVisit: '1 day ago (24 May 2026)', nextVisit: 'In 7 days (1 Jun 2026)', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
    { id: 'PT001239', name: 'Chinna Babu', age: 5, gender: 'M', village: 'Lakshmipur', disease: 'Malnutrition', riskScore: 42, riskBand: 'Low Risk', riskBadgeColor: 'bg-emerald-100 text-emerald-800', asha: 'Anitha Reddy', ashaAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80', lastVisit: '2 days ago (23 May 2026)', nextVisit: 'In 10 days (4 Jun 2026)', photoUrl: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=100&auto=format&fit=crop&q=80' },
    { id: 'PT001240', name: 'Srinivas Rao', age: 70, gender: 'M', village: 'Habsiguda', disease: 'Heart Disease', riskScore: 91, riskBand: 'High Risk', riskBadgeColor: 'bg-red-100 text-red-700', asha: 'Lakshmi Devi', ashaAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', lastVisit: 'Today (25 May 2026)', nextVisit: 'Tomorrow (26 May 2026)', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80' },
    { id: 'PT001241', name: 'Parvathi Amma', age: 72, gender: 'F', village: 'Ramanthapur', disease: 'Asthma, BP', riskScore: 79, riskBand: 'High Risk', riskBadgeColor: 'bg-red-100 text-red-700', asha: 'Sita Devi', ashaAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', lastVisit: '4 days ago (21 May 2026)', nextVisit: 'In 1 day (26 May 2026)', photoUrl: 'https://images.unsplash.com/photo-1566616213894-26910a39f65e?w=100&auto=format&fit=crop&q=80' }
  ];

  const overdueByVillageData = [
    { village: 'Pedda Thimmapur', count: 32 },
    { village: 'Lakshmipur', count: 28 },
    { village: 'Nandigama', count: 22 },
    { village: 'Ramanthapur', count: 18 },
    { village: 'Habsiguda', count: 16 },
    { village: 'Uppal', count: 14 }
  ];

  const trendData = [
    { day: '1 May', total: 12100, newP: 300, highRisk: 550 },
    { day: '8 May', total: 12220, newP: 380, highRisk: 565 },
    { day: '15 May', total: 12310, newP: 420, highRisk: 570 },
    { day: '22 May', total: 12420, newP: 450, highRisk: 578 },
    { day: '29 May', total: 12486, newP: 490, highRisk: 582 },
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
            <button onClick={() => onNavigateToTab && onNavigateToTab('patients')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
              <UserCheck className="w-4 h-4" /><span>Patients</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('villages')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <MapPin className="w-4 h-4" /><span>Villages</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('routes')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Navigation className="w-4 h-4" /><span>Live Routes</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('emergencies')} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-bold">
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
            <p className="text-[11px] text-slate-500 leading-snug">Ask anything about patients or health data</p>
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
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">Patients</h2>
              <p className="text-xs text-slate-500 font-medium">Manage and monitor all registered patients</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Top Search Bar */}
            <div className="relative w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search patient, ID, phone or Aadhaar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
              />
              <span className="absolute right-3 top-2 text-[10px] text-slate-400 font-mono font-bold bg-slate-200 px-1.5 py-0.5 rounded">Ctrl/</span>
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-600 text-white font-bold text-[9px] flex items-center justify-center">5</span>
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
              <div className="w-9 h-9 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Total Patients</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">12,486</span>
                <span className="text-[10px] font-bold text-emerald-600">+128 this month</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">High Risk Patients</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">582</span>
                <span className="text-[10px] font-bold text-red-600">4.7% of total</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                <Baby className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Pregnant Mothers</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">241</span>
                <span className="text-[10px] font-bold text-pink-600">+18 this month</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Syringe className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Children <span className="text-[9px] font-normal">(0-18 yrs)</span></span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">1,932</span>
                <span className="text-[10px] font-bold text-blue-600">15.5% of total</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Overdue Visits</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">146</span>
                <span className="text-[10px] font-bold text-amber-600">Require attention</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Emergency Cases</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">18</span>
                <span className="text-[10px] font-bold text-red-600">Active cases</span>
              </div>
            </div>
          </div>

          {/* ROW 2: Patients Search/Table (Left 8 cols) & AI Insights / Risk Distribution (Right 4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Patient Search, Filters & Table */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Filters Dropdown Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
                  <select value={filterVillage} onChange={(e)=>setFilterVillage(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]">
                    <option>All Villages</option><option>Ramanthapur</option><option>Pedda Thimmapur</option><option>Habsiguda</option><option>Nandigama</option><option>Uppal</option>
                  </select>

                  <select value={filterRisk} onChange={(e)=>setFilterRisk(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]">
                    <option>All Risk Levels</option><option>High Risk</option><option>Medium Risk</option><option>Low Risk</option>
                  </select>

                  <select value={filterDisease} onChange={(e)=>setFilterDisease(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]">
                    <option>All Diseases</option><option>Diabetes</option><option>Hypertension</option><option>Pregnancy</option><option>Asthma</option>
                  </select>

                  <select value={filterAsha} onChange={(e)=>setFilterAsha(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]">
                    <option>All ASHA Workers</option><option>Lakshmi Devi</option><option>Sita Devi</option><option>Meena Kumari</option>
                  </select>

                  <select value={filterGender} onChange={(e)=>setFilterGender(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]">
                    <option>All Gender</option><option>Female</option><option>Male</option>
                  </select>

                  <select value={filterAge} onChange={(e)=>setFilterAge(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]">
                    <option>All Age Groups</option><option>Elderly (60+)</option><option>Adults (18-60)</option><option>Children (0-18)</option>
                  </select>

                  <select value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]">
                    <option>Visit Status</option><option>Overdue</option><option>Completed</option><option>Pending</option>
                  </select>
                </div>

                {/* Patient Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-100">
                      <tr>
                        <th className="p-3">Patient</th>
                        <th className="p-3">Age / Gender</th>
                        <th className="p-3">Village</th>
                        <th className="p-3">Disease / Condition</th>
                        <th className="p-3">AI Risk Score</th>
                        <th className="p-3">Assigned ASHA</th>
                        <th className="p-3">Last Visit</th>
                        <th className="p-3">Next Visit</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {phcPatients.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2.5">
                              <img src={p.photoUrl} alt={p.name} className="w-8 h-8 rounded-full object-cover border" />
                              <div>
                                <span className="font-extrabold text-slate-900 text-xs block">{p.name}</span>
                                <span className="text-[10px] text-slate-400 font-mono">ID: {p.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-slate-800 font-bold">{p.age} / {p.gender}</td>
                          <td className="p-3 text-slate-800">{p.village}</td>
                          <td className="p-3 text-slate-800">{p.disease}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${p.riskBadgeColor}`}>
                              {p.riskScore} {p.riskScore >= 70 ? 'High' : p.riskScore >= 50 ? 'Medium' : 'Low'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <img src={p.ashaAvatar} alt={p.asha} className="w-6 h-6 rounded-full object-cover" />
                              <span className="text-slate-800 font-bold text-xs">{p.asha}</span>
                            </div>
                          </td>
                          <td className="p-3 text-slate-600 text-[11px]">{p.lastVisit}</td>
                          <td className="p-3 text-slate-600 text-[11px]">{p.nextVisit}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${p.riskBadgeColor}`}>
                              {p.riskBand}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => onSelectPatient && onSelectPatient(p)}
                                title="View Patient Details"
                                className="p-1 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-600"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table Footer Pagination */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 font-medium">Showing 1 to 8 of 12,486 patients</span>

                <div className="flex items-center gap-1.5">
                  <button className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="px-3 py-1 rounded-xl bg-[#6c47ff] text-white font-bold">1</button>
                  <button className="px-3 py-1 rounded-xl hover:bg-slate-100 font-bold text-slate-600">2</button>
                  <button className="px-3 py-1 rounded-xl hover:bg-slate-100 font-bold text-slate-600">3</button>
                  <button className="px-3 py-1 rounded-xl hover:bg-slate-100 font-bold text-slate-600">4</button>
                  <button className="px-3 py-1 rounded-xl hover:bg-slate-100 font-bold text-slate-600">5</button>
                  <span className="px-1 text-slate-400">...</span>
                  <button className="px-3 py-1 rounded-xl hover:bg-slate-100 font-bold text-slate-600">1561</button>
                  <button className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"><ChevronRight className="w-4 h-4" /></button>
                </div>

                <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-slate-800 font-bold">
                  <option>8 / page</option>
                  <option>25 / page</option>
                  <option>50 / page</option>
                </select>
              </div>
            </div>

            {/* Right 4 Cols: AI Insights (Today), Risk Distribution & Recent High Risk Patients */}
            <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
              {/* Card 1: AI Insights (Today) */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">AI Insights (Today)</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  <div className="p-2.5 rounded-2xl bg-red-50/60 border border-red-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-red-900 text-xs">High Risk Patients</h4>
                      <span className="text-[10px] text-slate-500">Require immediate attention</span>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-red-100 text-red-600 font-extrabold text-xs flex items-center justify-center">🔴</span>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-amber-900 text-xs">Overdue Visits</h4>
                      <span className="text-[10px] text-slate-500">Patients not visited on time</span>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 font-extrabold text-xs flex items-center justify-center">🕒</span>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-pink-50/60 border border-pink-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-pink-900 text-xs">Pregnant Mothers</h4>
                      <span className="text-[10px] text-slate-500">Require regular follow-up</span>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 font-extrabold text-xs flex items-center justify-center">🤰</span>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-blue-900 text-xs">Vaccinations Due</h4>
                      <span className="text-[10px] text-slate-500">Children & pregnant women</span>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 font-extrabold text-xs flex items-center justify-center">💉</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-100 text-[11px] text-purple-950 font-medium">
                  <span className="font-bold flex items-center gap-1 text-[#6c47ff] mb-0.5"><Sparkles className="w-3.5 h-3.5 fill-current" /> AI Recommendation</span>
                  Visit Village Pedda Thimmapur first. 16 overdue patients and 6 high-risk patients. Confidence: 97%
                </div>
              </div>

              {/* Card 2: Risk Distribution */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Risk Distribution</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
                </div>

                <div className="flex items-center justify-around my-1">
                  {/* Donut Gauge */}
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="76.5, 100" strokeDashoffset="0" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="18.8, 100" strokeDashoffset="-76.5" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="4.7, 100" strokeDashoffset="-95.3" strokeLinecap="round" />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-xs font-black text-slate-900 block leading-tight">12,486</span>
                      <span className="text-[8px] font-bold text-slate-400">Total</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs font-semibold">
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> High Risk: <strong>582 (4.7%)</strong></div>
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium Risk: <strong>2,341 (18.8%)</strong></div>
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low Risk: <strong>9,563 (76.5%)</strong></div>
                  </div>
                </div>
              </div>

              {/* Card 3: Recent High Risk Patients */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Recent High Risk Patients</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  {phcPatients.filter(p => p.riskScore >= 70).slice(0, 4).map(hp => (
                    <div key={hp.id} className="flex items-center justify-between p-2 rounded-2xl bg-slate-50">
                      <div className="flex items-center gap-2.5">
                        <img src={hp.photoUrl} alt={hp.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs">{hp.name}</h4>
                          <span className="text-[10px] text-slate-400">{hp.village}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-red-100 text-red-600 font-extrabold text-xs flex items-center justify-center">
                          {hp.riskScore}
                        </span>
                        <button onClick={() => onSelectPatient && onSelectPatient(hp)} className="p-1 text-slate-400 hover:text-purple-600">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: 4 Columns Charts & Overdue Analytics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Col 1: Disease Distribution (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Disease Distribution</h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
              </div>

              <div className="space-y-1.5 text-[11px] font-semibold">
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Hypertension</span><strong>2,341 (18.7%)</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Diabetes</span><strong>2,120 (17.0%)</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Pregnancy</span><strong>1,152 (9.2%)</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Respiratory</span><strong>980 (7.8%)</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Arthritis</span><strong>612 (4.9%)</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Others</span><strong>5,281 (42.4%)</strong></div>
              </div>
            </div>

            {/* Col 2: Patients Trend (This Month) (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Patients Trend <span className="text-[10px] text-slate-400 font-normal">(This Month)</span></h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Trend →</button>
              </div>

              <div className="h-28 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={9} />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#6c47ff" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="newP" stroke="#10b981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="highRisk" stroke="#ef4444" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 pt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-600" /> Total Patients</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> New Patients</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> High Risk</span>
              </div>
            </div>

            {/* Col 3: Vaccination Coverage (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Vaccination Coverage</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
                </div>

                <div className="text-center my-2">
                  <div className="relative w-24 h-14 mx-auto flex items-end justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 55">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" strokeDasharray="126" strokeDashoffset="28" />
                    </svg>
                    <div className="absolute bottom-0 text-center">
                      <span className="text-base font-black text-slate-900 block leading-tight">78%</span>
                      <span className="text-[8px] font-bold text-slate-400">Coverage Rate</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 block pt-1">Target: 90%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 text-center text-xs">
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-400 block">Covered</span>
                  <strong className="text-emerald-700 font-black">3,251</strong>
                </div>
                <div className="p-2 bg-amber-50 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-400 block">Due</span>
                  <strong className="text-amber-700 font-black">912</strong>
                </div>
                <div className="p-2 bg-red-50 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-400 block">Overdue</span>
                  <strong className="text-red-700 font-black">241</strong>
                </div>
              </div>
            </div>

            {/* Col 4: Overdue Visits by Village (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Overdue Visits by Village</h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All →</button>
              </div>

              <div className="space-y-2 text-xs font-semibold">
                {overdueByVillageData.map((ov) => (
                  <div key={ov.village} className="space-y-0.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-700 font-bold">{ov.village}</span>
                      <strong className="text-red-600 font-black">{ov.count}</strong>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${(ov.count / 35) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS BOTTOM BAR */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider hidden sm:block">Quick Actions</span>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => alert("Add New Patient Form Opened")}
                className="px-4 py-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-600/25 transition-all"
              >
                <Plus className="w-4 h-4" /> Add New Patient
              </button>

              <button
                onClick={() => alert("ASHA Worker Assignment Tool Opened")}
                className="px-4 py-2.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <UserCheck className="w-4 h-4 text-blue-600" /> Assign ASHA Worker
              </button>

              <button
                onClick={() => alert("Schedule Follow-up Visit Calendar Opened")}
                className="px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4 text-emerald-600" /> Schedule Follow-up
              </button>

              <button
                onClick={() => alert("Emergency Referral Dispatched to General Hospital")}
                className="px-4 py-2.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <AlertOctagon className="w-4 h-4 text-red-600" /> Emergency Referral
              </button>

              <button
                onClick={() => alert("Generating AI Catchment Summary Report...")}
                className="px-4 py-2.5 rounded-2xl bg-purple-50 border border-purple-200 text-[#6c47ff] hover:bg-purple-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 fill-current" /> Generate AI Summary
              </button>

              <button
                onClick={() => {
                  const csvContent = 'Patient ID,Name,Age,Gender,Village,Disease,Risk Score,Assigned ASHA,Status\n' + 
                    phcPatients.map(p => `${p.id},${p.name},${p.age},${p.gender},${p.village},${p.disease},${p.riskScore},${p.asha},${p.riskBand}`).join('\n');
                  const blob = new Blob([csvContent], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'phc_patients_export.csv';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <FileCsv className="w-4 h-4 text-slate-600" /> Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
