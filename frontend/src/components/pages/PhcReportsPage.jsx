import React, { useState } from 'react';
import {
  Building2, Home, Users, UserCheck, MapPin, Navigation, AlertOctagon,
  FileText, Folder, BarChart3, Share2, MessageSquare, Settings, Bell,
  Calendar, ChevronDown, ArrowRight, ShieldCheck, CheckCircle2, Clock,
  Activity, Sparkles, AlertTriangle, Battery, Wifi, Check, X, RefreshCw,
  Award, TrendingUp, TrendingDown, FileSpreadsheet, Download, Send, Menu,
  Plus, MoreVertical, LogOut, Search, ChevronLeft, ChevronRight, Filter,
  RotateCw, Pill, Share
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export default function PhcReportsPage({
  onNavigateToTab,
  onLogout
}) {
  const [reportType, setReportType] = useState('All Reports');
  const [selectedVillage, setSelectedVillage] = useState('All Villages');
  const [selectedWorker, setSelectedWorker] = useState('All Workers');

  const visitTrendData = [
    { day: '19 May', visits: 145 },
    { day: '20 May', visits: 168 },
    { day: '21 May', visits: 172 },
    { day: '22 May', visits: 186 },
    { day: '23 May', visits: 194 },
    { day: '24 May', visits: 184 },
    { day: '25 May', visits: 199 }
  ];

  const medicineData = [
    { name: 'ORS Packets', count: 632 },
    { name: 'Iron Tablets', count: 548 },
    { name: 'Amlodipine 5mg', count: 421 },
    { name: 'Paracetamol', count: 392 },
    { name: 'Calcium Tablets', count: 363 }
  ];

  const topWorkers = [
    { name: 'Lakshmi Devi', visits: 128, patients: 112, coverage: 96, photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
    { name: 'Sita Devi', visits: 116, patients: 104, coverage: 92, photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80' },
    { name: 'Anitha Reddy', visits: 108, patients: 98, coverage: 89, photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80' },
    { name: 'Meena Kumari', visits: 102, patients: 92, coverage: 87, photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80' },
    { name: 'Rani Devi', visits: 96, patients: 84, coverage: 82, photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
  ];

  const detailedReportsData = [
    { date: '25 May 2026', worker: 'Lakshmi Devi', village: 'Habsiguda', visits: 28, patientsChecked: 25, highRisk: 4, distance: '12.6', medicines: 48, avgDuration: '23 min', status: 'Completed' },
    { date: '25 May 2026', worker: 'Sita Devi', village: 'Uppal', visits: 24, patientsChecked: 22, highRisk: 3, distance: '11.2', medicines: 42, avgDuration: '22 min', status: 'Completed' },
    { date: '25 May 2026', worker: 'Anitha Reddy', village: 'Pedda Thimmapur', visits: 22, patientsChecked: 20, highRisk: 2, distance: '10.5', medicines: 38, avgDuration: '21 min', status: 'Completed' },
    { date: '24 May 2026', worker: 'Meena Kumari', village: 'Nacharam', visits: 20, patientsChecked: 18, highRisk: 2, distance: '9.8', medicines: 36, avgDuration: '24 min', status: 'Completed' },
    { date: '24 May 2026', worker: 'Rani Devi', village: 'Nagole', visits: 18, patientsChecked: 16, highRisk: 1, distance: '8.7', medicines: 34, avgDuration: '20 min', status: 'Completed' }
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
            <button onClick={() => onNavigateToTab && onNavigateToTab('emergencies')} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-bold">
              <div className="flex items-center gap-3"><AlertOctagon className="w-4 h-4" /><span>Emergencies</span></div>
              <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">4</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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
            <p className="text-[11px] text-slate-500 leading-snug">Ask anything about health reports</p>
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
                <BarChart3 className="w-5 h-5 text-[#6c47ff]" /> Reports & Analytics
              </h2>
              <p className="text-xs text-slate-500 font-medium">Comprehensive insights and performance reports</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Range Selector */}
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer">
              <Calendar className="w-3.5 h-3.5 text-purple-600" /> 19 May 2026 - 25 May 2026 <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
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
              <div className="w-9 h-9 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Total Visits</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">1,248</span>
                <span className="text-[10px] font-bold text-emerald-600">↑ 18% vs last week</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Patients Checked</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">1,102</span>
                <span className="text-[10px] font-bold text-emerald-600">↑ 15% vs last week</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">High Risk Patients</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">128</span>
                <span className="text-[10px] font-bold text-red-600">↑ 12% vs last week</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Pill className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Medicines Distributed</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">2,356</span>
                <span className="text-[10px] font-bold text-emerald-600">↑ 22% vs last week</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Distance Covered</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">342.6 km</span>
                <span className="text-[10px] font-bold text-emerald-600">↑ 16% vs last week</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Avg Visit Duration</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">24 min</span>
                <span className="text-[10px] font-bold text-red-600">↓ 5% vs last week</span>
              </div>
            </div>
          </div>

          {/* ROW 2: Filters Bar */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
              <select value={reportType} onChange={(e)=>setReportType(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]">
                <option>All Reports</option><option>Visit Summary</option><option>High Risk Report</option><option>Medicine Distribution</option><option>ASHA Performance</option>
              </select>

              <select value={selectedVillage} onChange={(e)=>setSelectedVillage(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]">
                <option>All Villages</option><option>Habsiguda</option><option>Uppal</option><option>Pedda Thimmapur</option><option>Nacharam</option><option>Nagole</option>
              </select>

              <select value={selectedWorker} onChange={(e)=>setSelectedWorker(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]">
                <option>All Workers</option><option>Lakshmi Devi</option><option>Sita Devi</option><option>Anitha Reddy</option><option>Meena Kumari</option><option>Rani Devi</option>
              </select>

              <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-purple-600" /> 19 May 2026 - 25 May 2026
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-2xl border border-purple-200 text-[#6c47ff] font-extrabold text-xs hover:bg-purple-50 transition-all flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Apply Filters
              </button>
              <button className="px-4 py-2 rounded-2xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-all">
                Reset
              </button>
            </div>
          </div>

          {/* ROW 3: Visit Trend (Daily), Visits by Village Donut & Report Summary Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: Visit Trend (Daily) (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Visit Trend (Daily)</h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Details →</button>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitTrendData}>
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={9} />
                    <YAxis stroke="#94a3b8" fontSize={9} />
                    <Tooltip />
                    <Line type="monotone" dataKey="visits" stroke="#6c47ff" strokeWidth={2} dot={{ r: 4, fill: '#6c47ff' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Col 2: Visits by Village Donut Chart (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Visits by Village</h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
              </div>

              <div className="flex items-center justify-around my-1">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#6c47ff" strokeWidth="4" strokeDasharray="33, 100" strokeDashoffset="0" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="26, 100" strokeDashoffset="-33" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="22, 100" strokeDashoffset="-59" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="11, 100" strokeDashoffset="-81" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="8, 100" strokeDashoffset="-92" strokeLinecap="round" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-base font-black text-slate-900 block leading-tight">1,248</span>
                    <span className="text-[8px] font-bold text-slate-400">Total Visits</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs font-semibold">
                  <div className="flex items-center justify-between gap-4"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Habsiguda</span><strong>412 (33%)</strong></div>
                  <div className="flex items-center justify-between gap-4"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Uppal</span><strong>328 (26%)</strong></div>
                  <div className="flex items-center justify-between gap-4"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Pedda Thimmapur</span><strong>276 (22%)</strong></div>
                  <div className="flex items-center justify-between gap-4"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Nacharam</span><strong>132 (11%)</strong></div>
                  <div className="flex items-center justify-between gap-4"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Nagole</span><strong>100 (8%)</strong></div>
                </div>
              </div>
            </div>

            {/* Col 3: Report Summary Panel (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Report Summary</h3>

                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex justify-between p-2 rounded-2xl bg-slate-50"><span className="text-slate-400 font-bold">Total Reports Generated</span><strong className="text-slate-900 font-black">128</strong></div>
                  <div className="flex justify-between p-2 rounded-2xl bg-slate-50"><span className="text-slate-400 font-bold">Scheduled Reports</span><strong className="text-slate-900 font-black">18</strong></div>
                  <div className="flex justify-between p-2 rounded-2xl bg-slate-50"><span className="text-slate-400 font-bold">Shared Reports</span><strong className="text-slate-900 font-black">42</strong></div>
                  <div className="flex justify-between p-2 rounded-2xl bg-emerald-50/60"><span className="text-emerald-900 font-bold">Data Accuracy</span><strong className="text-emerald-700 font-black">98.6%</strong></div>
                  <div className="flex justify-between p-2 rounded-2xl bg-purple-50/50"><span className="text-purple-900 font-bold">Last Updated</span><strong className="text-[#6c47ff] font-bold text-[11px]">25 May 2026, 10:32 AM</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 4: Patient Risk Donut, Medicine Bar Chart, ASHA Performance Table, Recent Reports */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Col 1: Patient Risk Distribution Donut (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Patient Risk Distribution</h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
              </div>

              <div className="space-y-1.5 text-[11px] font-semibold">
                <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> High Risk (Score 70-100)</span><strong>128 (12%)</strong></div>
                <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium Risk (Score 40-69)</span><strong>356 (32%)</strong></div>
                <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low Risk (Score &lt;40)</span><strong>618 (56%)</strong></div>
              </div>
            </div>

            {/* Col 2: Medicine Distribution Bar Chart (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Medicine Distribution</h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
              </div>

              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={medicineData}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={9} width={80} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6c47ff" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Col 3: ASHA Worker Performance (Top 5) (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">ASHA Worker Performance <span className="text-[9px] text-slate-400 font-normal">(Top 5)</span></h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
              </div>

              <div className="space-y-1.5 text-xs font-semibold">
                {topWorkers.map((tw) => (
                  <div key={tw.name} className="flex items-center justify-between p-1.5 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-2">
                      <img src={tw.photoUrl} alt={tw.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-slate-900 font-bold text-xs">{tw.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span>{tw.visits}</span>
                      <strong className="text-emerald-600">{tw.coverage}%</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 4: Recent Reports & Quick Actions (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Recent Reports</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All</button>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      <div><h4 className="font-bold text-slate-900 text-[11px]">Weekly Visit Summary</h4><span className="text-[9px] text-slate-400">25 May 2026, 10:30 AM</span></div>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">XLSX</span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-red-600" />
                      <div><h4 className="font-bold text-slate-900 text-[11px]">High Risk Patients Report</h4><span className="text-[9px] text-slate-400">25 May 2026, 09:15 AM</span></div>
                    </div>
                    <span className="text-[9px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">PDF</span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      <div><h4 className="font-bold text-slate-900 text-[11px]">Medicine Distribution Report</h4><span className="text-[9px] text-slate-400">24 May 2026, 06:40 PM</span></div>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">XLSX</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-4 gap-1 text-[9px] font-bold text-slate-700 text-center pt-1 border-t border-slate-100">
                <button onClick={() => alert("Generate Custom Report Modal")} className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-[#6c47ff] flex flex-col items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-purple-600" /> Generate
                </button>
                <button onClick={() => alert("Schedule Report Email")} className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-[#6c47ff] flex flex-col items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" /> Schedule
                </button>
                <button onClick={() => alert("Exporting all report data...")} className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-[#6c47ff] flex flex-col items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-emerald-600" /> Export
                </button>
                <button onClick={() => alert("Share Report Link Generated")} className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-[#6c47ff] flex flex-col items-center gap-1">
                  <Share className="w-3.5 h-3.5 text-amber-600" /> Share
                </button>
              </div>
            </div>
          </div>

          {/* ROW 5: Detailed Report Data Table (12 cols) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-sm">Detailed Report Data</h3>
                <span className="text-xs text-slate-400 font-medium">Showing 1 to 5 of 36 entries</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-100">
                    <tr>
                      <th className="p-3">Date</th>
                      <th className="p-3">ASHA Worker</th>
                      <th className="p-3">Village</th>
                      <th className="p-3">Visits</th>
                      <th className="p-3">Patients Checked</th>
                      <th className="p-3">High Risk Patients</th>
                      <th className="p-3">Distance (km)</th>
                      <th className="p-3">Medicines Distributed</th>
                      <th className="p-3">Avg Duration</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {detailedReportsData.map((dr, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-mono font-bold text-slate-900">{dr.date}</td>
                        <td className="p-3 font-extrabold text-slate-900">{dr.worker}</td>
                        <td className="p-3 text-slate-800">{dr.village}</td>
                        <td className="p-3 text-slate-900 font-bold">{dr.visits}</td>
                        <td className="p-3 text-emerald-600 font-bold">{dr.patientsChecked}</td>
                        <td className="p-3 text-red-600 font-bold">{dr.highRisk}</td>
                        <td className="p-3 font-mono">{dr.distance}</td>
                        <td className="p-3 font-bold text-purple-600">{dr.medicines}</td>
                        <td className="p-3 font-mono text-slate-500">{dr.avgDuration}</td>
                        <td className="p-3 text-right">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                            {dr.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Showing 1 to 5 of 36 entries</span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"><ChevronLeft className="w-4 h-4" /></button>
                <button className="px-3 py-1 rounded-lg bg-[#6c47ff] text-white font-bold">1</button>
                <button className="px-3 py-1 rounded-lg hover:bg-slate-100 font-bold text-slate-600">2</button>
                <button className="px-3 py-1 rounded-lg hover:bg-slate-100 font-bold text-slate-600">3</button>
                <button className="px-3 py-1 rounded-lg hover:bg-slate-100 font-bold text-slate-600">4</button>
                <button className="px-3 py-1 rounded-lg hover:bg-slate-100 font-bold text-slate-600">5</button>
                <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-400 font-semibold">
            🔄 Reports data is refreshed every 30 minutes • All times are in IST
          </div>
        </div>
      </div>
    </div>
  );
}
