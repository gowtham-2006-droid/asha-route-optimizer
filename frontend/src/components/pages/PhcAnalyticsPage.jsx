import React, { useState } from 'react';
import {
  Building2, Home, Users, UserCheck, MapPin, Navigation, AlertOctagon,
  FileText, Folder, BarChart3, Share2, MessageSquare, Settings, Bell,
  Calendar, ChevronDown, ArrowRight, ShieldCheck, CheckCircle2, Clock,
  Activity, Sparkles, AlertTriangle, Battery, Wifi, Check, X, RefreshCw,
  Award, TrendingUp, TrendingDown, FileSpreadsheet, Download, Send, Menu,
  Plus, MoreVertical, LogOut, Search, ChevronLeft, ChevronRight, Filter,
  Cpu, HeartPulse, Brain, Zap, Target
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';

export default function PhcAnalyticsPage({
  onNavigateToTab,
  onLogout
}) {
  const [selectedVillage, setSelectedVillage] = useState('All Villages');
  const [analyticsType, setAnalyticsType] = useState('All Analytics');

  const riskTrendData = [
    { week: '14 Apr', score: 48 },
    { week: '21 Apr', score: 46 },
    { week: '28 Apr', score: 51 },
    { week: '05 May', score: 53 },
    { week: '12 May', score: 50 },
    { week: '19 May', score: 42 }
  ];

  const diseaseProbData = [
    { name: 'Hypertension', pct: 42, fill: '#ef4444' },
    { name: 'Diabetes', pct: 31, fill: '#f59e0b' },
    { name: 'Anemia', pct: 26, fill: '#eab308' },
    { name: 'Respiratory Infection', pct: 18, fill: '#10b981' },
    { name: 'Cardiac Disease', pct: 12, fill: '#3b82f6' }
  ];

  const highRiskPatients = [
    { name: 'Sita Devi', id: 'P-10456', age: 29, village: 'Pedda Thimmapur', condition: 'High Risk Pregnancy', score: '91/100', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80' },
    { name: 'Ravi Kumar', id: 'P-10233', age: 54, village: 'Uppal', condition: 'Hypertension + Diabetes', score: '87/100', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { name: 'Anitha Bai', id: 'P-11876', age: 48, village: 'Habsiguda', condition: 'Uncontrolled Diabetes', score: '85/100', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80' },
    { name: 'Lakshmi Narayana', id: 'P-10789', age: 62, village: 'Nacharam', condition: 'Cardiac Risk', score: '82/100', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
    { name: 'Meena Kumari', id: 'P-10554', age: 33, village: 'Nagole', condition: 'Anemia • Low BMI', score: '78/100', photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80' }
  ];

  const modelPerfData = [
    { model: 'Risk Prediction Model', accuracy: '98.6%', precision: '97.1%', recall: '97.8%', f1: '97.4%', status: 'Excellent', color: 'bg-emerald-100 text-emerald-800' },
    { model: 'Emergency Prediction', accuracy: '95.3%', precision: '94.2%', recall: '93.6%', f1: '93.9%', status: 'Excellent', color: 'bg-emerald-100 text-emerald-800' },
    { model: 'Disease Prediction', accuracy: '93.7%', precision: '92.8%', recall: '92.1%', f1: '92.4%', status: 'Good', color: 'bg-blue-100 text-blue-800' },
    { model: 'Hospitalization Risk', accuracy: '94.8%', precision: '93.4%', recall: '92.9%', f1: '93.1%', status: 'Good', color: 'bg-blue-100 text-blue-800' }
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
            <button onClick={() => onNavigateToTab && onNavigateToTab('reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <FileText className="w-4 h-4" /><span>Reports</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('resources')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Folder className="w-4 h-4" /><span>Resources</span>
            </button>
            <button onClick={() => onNavigateToTab && onNavigateToTab('analytics')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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
            <p className="text-[11px] text-slate-500 leading-snug">Ask anything about health analytics</p>
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
                <Brain className="w-5 h-5 text-[#6c47ff]" /> AI Analytics Dashboard
              </h2>
              <p className="text-xs text-slate-500 font-medium">AI-powered insights for better healthcare decisions</p>
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
                <span className="text-[11px] font-semibold text-slate-400 block">Total Patients Analyzed</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">12,486</span>
                <span className="text-[10px] font-bold text-emerald-600">↑ 12% vs last week</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">High Risk Patients</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">1,248</span>
                <span className="text-[10px] font-bold text-red-600">↑ 15% vs last week</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">AI Risk Predictions</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">98.6%</span>
                <span className="text-[10px] font-bold text-emerald-600">Accuracy</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Prevented Emergencies</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">156</span>
                <span className="text-[10px] font-bold text-emerald-600">↑ 18% vs last week</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Average Risk Score</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">42 / 100</span>
                <span className="text-[10px] font-bold text-amber-600">Moderate</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Model Confidence</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">93%</span>
                <span className="text-[10px] font-bold text-emerald-600">High Confidence</span>
              </div>
            </div>
          </div>

          {/* ROW 2: Filters Bar */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
              <select value={analyticsType} onChange={(e)=>setAnalyticsType(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-700">
                <option>All Analytics</option><option>Risk Heatmap</option><option>Disease Predictions</option><option>Hospitalization Risk</option>
              </select>

              <select value={selectedVillage} onChange={(e)=>setSelectedVillage(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-700">
                <option>All Villages</option><option>Habsiguda</option><option>Uppal</option><option>Pedda Thimmapur</option><option>Nacharam</option><option>Nagole</option>
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

          {/* ROW 3: AI Risk Heatmap (5 cols), AI Risk Trend & Risk Distribution (4 cols), Top High Risk Patients (3 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: AI Risk Heatmap (By Village) (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">AI Risk Heatmap (By Village)</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Full Map →</button>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    <div className="p-2.5 rounded-xl bg-purple-100 text-purple-900">
                      <span>Habsiguda</span><span className="block text-lg font-black">633 High</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900">
                      <span>Uppal</span><span className="block text-lg font-black">412 Medium</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-red-100 text-red-900 col-span-2">
                      <span>Pedda Thimmapur (Critical Cluster)</span><span className="block text-xl font-black text-red-600">824 Very High</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-around text-[9px] font-bold text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600" /> Very High (80-100)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> High (60-79)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Medium (40-59)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Low (20-39)</span>
              </div>
            </div>

            {/* Col 2: AI Risk Trend & Risk Distribution (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">AI Risk Trend (Last 6 Weeks)</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
                </div>
                <div className="h-28 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={riskTrendData}>
                      <XAxis dataKey="week" stroke="#94a3b8" fontSize={9} />
                      <YAxis stroke="#94a3b8" fontSize={9} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#6c47ff" strokeWidth={2} dot={{ r: 3, fill: '#6c47ff' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Risk Distribution</h3>
                <div className="space-y-1 text-[10px] font-semibold">
                  <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-600" /> Very High (80-100)</span><strong>1,248 (10%)</strong></div>
                  <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> High (60-79)</span><strong>2,732 (22%)</strong></div>
                  <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Medium (40-59)</span><strong>4,156 (33%)</strong></div>
                  <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Low (20-39)</span><strong>2,846 (23%)</strong></div>
                  <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Very Low (0-19)</span><strong>1,504 (12%)</strong></div>
                </div>
              </div>
            </div>

            {/* Col 3: Top High Risk Patients (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Top High Risk Patients</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="space-y-2">
                  {highRiskPatients.map((p) => (
                    <div key={p.id} className="p-2 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={p.photo} alt={p.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs">{p.name}</h4>
                          <span className="text-[9px] text-slate-400 block font-medium">{p.condition}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-black text-[9px] text-right">
                        {p.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="text-xs text-[#6c47ff] font-bold hover:underline text-center w-full pt-1">
                View All High Risk Patients →
              </button>
            </div>
          </div>

          {/* ROW 4: AI Predictions & Recommendations (12 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Col 1: AI Prediction: Emergency Risk (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 text-center">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Emergency Risk</h3>
              <div className="w-20 h-20 rounded-full bg-red-50 text-red-600 font-black text-xl flex flex-col items-center justify-center mx-auto border-4 border-red-200">
                78%
                <span className="text-[8px] font-bold text-red-500">High Risk</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Emergency Risk Prediction (Next 7 Days)</p>
            </div>

            {/* Col 2: AI Prediction: Hospitalization Risk (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 text-center">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Hospitalization Risk</h3>
              <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-600 font-black text-xl flex flex-col items-center justify-center mx-auto border-4 border-amber-200">
                34%
                <span className="text-[8px] font-bold text-amber-500">Moderate</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Hospitalization Risk Prediction (Next 30 Days)</p>
            </div>

            {/* Col 3: AI Prediction: Disease Probability (Top 5) (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Disease Probability (Top 5)</h3>
              <div className="h-28 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={diseaseProbData}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={8} width={80} />
                    <Tooltip />
                    <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                      {diseaseProbData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Col 4: AI Recommendations (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">AI Recommendations</h3>

              <div className="space-y-1.5 text-xs font-semibold">
                <div className="p-2 rounded-xl bg-red-50 text-red-900 flex justify-between items-center">
                  <span className="text-[10px] font-bold">🎯 Prioritize 312 high-risk pregnancy cases</span>
                  <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[8px] font-black">High</span>
                </div>

                <div className="p-2 rounded-xl bg-amber-50 text-amber-900 flex justify-between items-center">
                  <span className="text-[10px] font-bold">⚖️ Reassign 18 patients from overloaded workers</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[8px] font-black">Medium</span>
                </div>

                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-900 flex justify-between items-center">
                  <span className="text-[10px] font-bold">🩸 Focus on hypertension screening in Uppal</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[8px] font-black">Low</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 5: Model Performance, Insights Summary, AI Model Training Status (12 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Col 1: Model Performance Table (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Model Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold">
                  <thead className="text-[9px] font-bold uppercase text-slate-400 border-b border-slate-100">
                    <tr><th className="p-2">Model</th><th className="p-2">Accuracy</th><th className="p-2">Recall</th><th className="p-2 text-right">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {modelPerfData.map((mp, idx) => (
                      <tr key={idx}>
                        <td className="p-2 font-bold text-slate-900">{mp.model}</td>
                        <td className="p-2 font-mono">{mp.accuracy}</td>
                        <td className="p-2 font-mono">{mp.recall}</td>
                        <td className="p-2 text-right"><span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${mp.color}`}>{mp.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Col 2: Insights Summary (This Week) (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Insights Summary (This Week)</h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100">
                  <span className="text-[10px] text-slate-400 block font-bold">New High Risk</span>
                  <span className="text-xl font-black text-purple-900">+156</span>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <span className="text-[10px] text-slate-400 block font-bold">Risk Improved</span>
                  <span className="text-xl font-black text-emerald-900">+8.2%</span>
                </div>
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100">
                  <span className="text-[10px] text-slate-400 block font-bold">Early Interventions</span>
                  <span className="text-xl font-black text-blue-900">428</span>
                </div>
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
                  <span className="text-[10px] text-slate-400 block font-bold">Lives Impacted</span>
                  <span className="text-xl font-black text-amber-900">1,248</span>
                </div>
              </div>
            </div>

            {/* Col 3: AI Model Training Status (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">AI Model Training Status</h3>
              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <div><span className="text-[10px] text-slate-400 block font-bold">Last Training Date</span><strong>24 May 2026, 11:30 PM</strong></div>
                <div><span className="text-[10px] text-slate-400 block font-bold">Next Training Schedule</span><strong>25 May 2026, 11:30 PM</strong></div>
                <div><span className="text-[10px] text-slate-400 block font-bold">Training Data Used</span><strong>124,856 Records</strong></div>
                <div><span className="text-[10px] text-slate-400 block font-bold">Model Version</span><strong>v2.4.1</strong></div>
                <div><span className="text-[10px] text-slate-400 block font-bold">Data Quality Score</span><strong className="text-emerald-600">98.2%</strong></div>
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-400 font-semibold pt-2">
            ℹ️ AI models are updated daily at 11:30 PM • All predictions are based on available data • Data privacy & security ensured • Last updated: 25 May 2026, 10:32 AM • <button onClick={() => alert("Refreshed AI models and predictions!")} className="text-[#6c47ff] font-bold hover:underline">Refresh Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
