import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, Calendar, Download, Eye,
  MoreVertical, HeartPulse, Navigation, CheckCircle2, Activity, ShieldCheck,
  UserPlus, Sparkles, Filter, RefreshCw, FileSpreadsheet, Share2, ChevronRight, ArrowUpRight,
  BarChart3, UserCheck
} from 'lucide-react';

export default function ReportsPage({
  currentUser,
  onTriggerEmergency,
  onRegisterNewPatient,
  onNavigateToTab
}) {
  const [dateRange, setDateRange] = useState('01 May 2024 - 31 May 2024');
  const [villageFilter, setVillageFilter] = useState('All Villages');
  const [reportTypeFilter, setReportTypeFilter] = useState('All Reports');

  const recentReports = [
    { id: 'r1', name: 'Monthly Performance Report', desc: 'Summary of visits and outcomes', type: 'Performance', typeColor: 'bg-emerald-100 text-emerald-800', range: '01 May - 31 May 2024', generatedOn: '01 Jun 2024 10:30 AM', author: 'Lakshmi Devi', icon: '📊' },
    { id: 'r2', name: 'High Risk Patients Report', desc: 'List of all high risk patients', type: 'Patient', typeColor: 'bg-blue-100 text-blue-800', range: '01 May - 31 May 2024', generatedOn: '01 Jun 2024 10:15 AM', author: 'Lakshmi Devi', icon: '🫀' },
    { id: 'r3', name: 'Village Wise Summary', desc: 'Visits and coverage by village', type: 'Summary', typeColor: 'bg-amber-100 text-amber-800', range: '01 May - 31 May 2024', generatedOn: '01 Jun 2024 09:45 AM', author: 'Lakshmi Devi', icon: '🏘️' },
    { id: 'r4', name: 'Immunization Report', desc: 'Immunization and vaccine coverage', type: 'Immunization', typeColor: 'bg-emerald-100 text-emerald-800', range: '01 May - 31 May 2024', generatedOn: '01 Jun 2024 09:30 AM', author: 'Lakshmi Devi', icon: '💉' },
    { id: 'r5', name: 'Emergency Cases Report', desc: 'All emergency cases handled', type: 'Emergency', typeColor: 'bg-red-100 text-red-800', range: '01 May - 31 May 2024', generatedOn: '01 Jun 2024 09:10 AM', author: 'Lakshmi Devi', icon: '🚨' },
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
            <button onClick={() => onNavigateToTab('next_patient')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <UserCheck className="w-4 h-4" /><span>Next Patient</span>
            </button>
            <button onClick={onTriggerEmergency} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-bold">
              <div className="flex items-center gap-3"><AlertOctagon className="w-4 h-4" /><span>Emergency</span></div>
              <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">2</span>
            </button>
            <button onClick={() => onNavigateToTab('reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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
          </nav>
        </div>

        {/* Bottom AI Promo Box ("AI Reports") */}
        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <FileText className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-900 block">AI Reports</span>
            <p className="text-[11px] text-slate-500 leading-snug">Get intelligent insights about your performance and patient outcomes.</p>
          </div>
          <button className="w-full py-2 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center justify-center gap-1">
            Try AI Report <Sparkles className="w-3 h-3 fill-current" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Reports</h2>
            <p className="text-xs text-slate-500">Track performance, visits and health outcomes</p>
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
          {/* 3. TOP FILTER CONTROLS ROW */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-wrap items-end justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4 flex-1">
              <div>
                <label className="font-bold text-slate-400 block mb-1 text-[10px] uppercase">Date Range</label>
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold focus:outline-none focus:border-[#6c47ff]">
                  <option>01 May 2024 - 31 May 2024</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-400 block mb-1 text-[10px] uppercase">Village</label>
                <select value={villageFilter} onChange={(e) => setVillageFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold focus:outline-none focus:border-[#6c47ff]">
                  <option>All Villages</option>
                  <option>Ramanthapur</option>
                  <option>Habsiguda</option>
                  <option>Uppal</option>
                  <option>Nagole</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-400 block mb-1 text-[10px] uppercase">Report Type</label>
                <select value={reportTypeFilter} onChange={(e) => setReportTypeFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold focus:outline-none focus:border-[#6c47ff]">
                  <option>All Reports</option>
                  <option>Performance</option>
                  <option>Patient</option>
                  <option>Emergency</option>
                </select>
              </div>

              <button className="px-5 py-2 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Apply Filters
              </button>
            </div>

            <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs flex items-center gap-1.5 transition-all">
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* 4. TOP KPI METRIC CARDS (5 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Total Visits</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">156</span>
                <span className="text-[10px] font-bold text-emerald-600">↑ 18.6% vs Apr</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Completed Visits</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">124</span>
                <span className="text-[10px] font-bold text-emerald-600">79.5% of total</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">New Patients</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">32</span>
                <span className="text-[10px] font-bold text-emerald-600">↑ 14.3% vs Apr</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">High Risk Patients</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">16</span>
                <span className="text-[10px] font-bold text-red-600">↑ 23.1% vs Apr</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Follow-ups</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">68</span>
                <span className="text-[10px] font-bold text-blue-600">↑ 12.7% vs Apr</span>
              </div>
            </div>
          </div>

          {/* 5. MIDDLE VISUAL ANALYTICS GRID (3 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: Visits Trend Area Chart */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Visits Trend</h3>
                <select className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-800 font-bold">
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>

              {/* Sparkline Graphic Simulator */}
              <div className="h-44 bg-gradient-to-b from-purple-50/80 to-transparent rounded-2xl p-4 flex flex-col justify-between relative border border-purple-100">
                <div className="absolute top-4 left-1/3 p-2 bg-white rounded-xl shadow-md border border-purple-200 text-[10px] font-bold text-center z-10">
                  <span className="text-slate-400 block">16 May 2024</span>
                  <span className="text-[#6c47ff] text-xs">24 Visits</span>
                </div>

                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
                  <path
                    d="M 0,60 Q 30,30 60,50 T 120,40 T 180,60 T 240,40 T 300,50"
                    fill="none"
                    stroke="#6c47ff"
                    strokeWidth="3"
                  />
                  <path
                    d="M 0,60 Q 30,30 60,50 T 120,40 T 180,60 T 240,40 T 300,50 L 300,100 L 0,100 Z"
                    fill="url(#purpleGrad)"
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6c47ff" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-2">
                  <span>1 May</span>
                  <span>6 May</span>
                  <span>11 May</span>
                  <span>16 May</span>
                  <span>21 May</span>
                  <span>26 May</span>
                  <span>31 May</span>
                </div>
              </div>
            </div>

            {/* Col 2: Visit Type Distribution Donut Chart */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Visit Type Distribution</h3>

              <div className="flex items-center justify-between gap-4">
                {/* Donut Circle */}
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#6c47ff" strokeWidth="4" strokeDasharray="39.7 60.3" strokeDashoffset="0" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="24.4 75.6" strokeDashoffset="-39.7" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="18.6 81.4" strokeDashoffset="-64.1" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="11.5 88.5" strokeDashoffset="-82.7" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f97316" strokeWidth="4" strokeDasharray="5.8 94.2" strokeDashoffset="-94.2" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-base font-black text-slate-900">156</span>
                    <span className="text-[10px] text-slate-400 font-bold">Total</span>
                  </div>
                </div>

                {/* Donut Legend */}
                <div className="space-y-1.5 text-[11px] font-semibold text-slate-700 flex-1">
                  <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#6c47ff]" /> Regular Check-up</span> <strong className="text-slate-900">62 (39.7%)</strong></div>
                  <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> ANC Check-up</span> <strong className="text-slate-900">38 (24.4%)</strong></div>
                  <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Follow-up</span> <strong className="text-slate-900">29 (18.6%)</strong></div>
                  <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Immunization</span> <strong className="text-slate-900">18 (11.5%)</strong></div>
                  <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Others</span> <strong className="text-slate-900">9 (5.8%)</strong></div>
                </div>
              </div>
            </div>

            {/* Col 3: AI Generated Summary Panel */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 text-sm">AI Generated Summary</h3>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#6c47ff] font-extrabold text-[9px]">
                    ✨ AI Powered
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold mb-3">Based on your activity from 01 May - 31 May 2024</p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-950 font-medium text-[11px] leading-snug">
                    📈 Your visits increased by <strong>18.6%</strong> compared to last month. Great job!
                  </div>
                  <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-100 text-amber-950 font-medium text-[11px] leading-snug">
                    ⚠️ <strong>16 high risk patients</strong> need more frequent follow-ups.
                  </div>
                  <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-950 font-medium text-[11px] leading-snug">
                    🎯 Focus on immunization coverage in <strong>Nagole village</strong>.
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-2xl bg-white border border-purple-200 text-[#6c47ff] font-extrabold text-xs shadow-xs hover:bg-purple-50 transition-all flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-current" /> View Full AI Report
              </button>
            </div>
          </div>

          {/* 6. BOTTOM SECTION (Recent Reports Table & Side Widgets) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Recent Reports Table (Left 8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Recent Reports</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 text-[10px]">
                      <tr>
                        <th className="p-4">Report Name</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Date Range</th>
                        <th className="p-4">Generated On</th>
                        <th className="p-4">Generated By</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentReports.map(r => (
                        <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-2xl bg-purple-50 text-base flex items-center justify-center shrink-0">
                                {r.icon}
                              </div>
                              <div>
                                <span className="font-extrabold text-slate-900 text-xs block">{r.name}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{r.desc}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${r.typeColor}`}>
                              {r.type}
                            </span>
                          </td>

                          <td className="p-4 font-semibold text-slate-800">{r.range}</td>

                          <td className="p-4 font-semibold text-slate-800">{r.generatedOn}</td>

                          <td className="p-4 font-semibold text-slate-800">{r.author}</td>

                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"><Eye className="w-3.5 h-3.5" /></button>
                              <button className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"><Download className="w-3.5 h-3.5" /></button>
                              <button className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"><MoreVertical className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 text-center">
                <button className="text-xs text-[#6c47ff] font-bold hover:underline inline-flex items-center gap-1">
                  View More Reports <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Side Widgets (Right 4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Widget 1: Quick Export */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Quick Export</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-red-50/70 border border-red-100 hover:bg-red-100/70 transition-all cursor-pointer">
                    <FileText className="w-5 h-5 text-red-600 mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-slate-800 block">Export PDF</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover:bg-emerald-100/70 transition-all cursor-pointer">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-slate-800 block">Export Excel</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100/70 transition-all cursor-pointer">
                    <Share2 className="w-5 h-5 text-[#6c47ff] mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-slate-800 block">Share Report</span>
                  </div>
                </div>
              </div>

              {/* Widget 2: Report Templates */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Report Templates</h3>
                  <button className="text-[11px] text-[#6c47ff] font-bold hover:underline">View All</button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Daily Visit Report</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Daily visit summary</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Weekly Summary Report</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Weekly performance overview</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Monthly Performance Report</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Comprehensive monthly report</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
