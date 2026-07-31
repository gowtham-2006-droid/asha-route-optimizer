import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, HeartPulse, Navigation,
  Bot, Sparkles, BarChart3, TrendingUp, TrendingDown, Activity,
  Clock, UserCheck, Calendar, ArrowRight, ChevronRight, Target,
  Award, PieChart, LogOut
} from 'lucide-react';

export default function AnalyticsPage({
  currentUser,
  onTriggerEmergency,
  onRegisterNewPatient,
  onNavigateToTab,
  onLogout
}) {
  const [timePeriod, setTimePeriod] = useState('This Month');

  return (
    <div className="flex min-h-screen bg-[#f8f9fe] text-slate-900 font-sans">
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-[#6c47ff] tracking-tight leading-none">ASHA Companion</h1>
              <p className="text-[11px] text-slate-400 font-medium">Empowering Rural Health</p>
            </div>
          </div>

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
            <button onClick={() => onNavigateToTab('reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <FileText className="w-4 h-4" /><span>Reports</span>
            </button>
            <button onClick={() => onNavigateToTab('analytics')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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

        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <Bot className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-900 block">AI Assistant</span>
            <p className="text-[11px] text-slate-500 leading-snug">Get analytics insights and performance tips.</p>
          </div>
          <button className="w-full py-2 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center justify-center gap-1">
            Ask AI <Sparkles className="w-3 h-3 fill-current" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Analytics</h2>
            <p className="text-xs text-slate-500">Track your performance and health outcomes</p>
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
              <div className="w-9 h-9 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center border border-purple-200">LD</div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-bold text-slate-900 block leading-tight">{currentUser?.name || 'Lakshmi Devi'}</span>
                <span className="text-[10px] text-slate-500 font-semibold">ASHA Worker</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Period Selector */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Performance Overview</h3>
            <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold">
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Total Visits</span>
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center"><Target className="w-5 h-5" /></div>
              </div>
              <span className="text-2xl font-black text-slate-900 block mt-2">342</span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +12% vs last month</span>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Patients Covered</span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Users className="w-5 h-5" /></div>
              </div>
              <span className="text-2xl font-black text-slate-900 block mt-2">248</span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +8% vs last month</span>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Risk Score Avg</span>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center"><Activity className="w-5 h-5" /></div>
              </div>
              <span className="text-2xl font-black text-slate-900 block mt-2">54.2</span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5"><TrendingDown className="w-3 h-3" /> -3.5 improved</span>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Completion Rate</span>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center"><Award className="w-5 h-5" /></div>
              </div>
              <span className="text-2xl font-black text-slate-900 block mt-2">92%</span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> +5% vs last month</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visit Trends Chart */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Visit Trends</h3>
                <div className="flex items-center gap-3 text-[10px] font-bold">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#6c47ff]" /> Completed</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Missed</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Emergency</span>
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="flex items-end gap-2 h-48 px-4 pt-4">
                {[
                  { label: 'Mon', c: 18, m: 2, e: 1 },
                  { label: 'Tue', c: 22, m: 1, e: 0 },
                  { label: 'Wed', c: 20, m: 3, e: 2 },
                  { label: 'Thu', c: 25, m: 0, e: 1 },
                  { label: 'Fri', c: 19, m: 2, e: 0 },
                  { label: 'Sat', c: 15, m: 1, e: 1 },
                  { label: 'Sun', c: 8, m: 0, e: 0 },
                ].map(d => (
                  <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col items-center gap-0.5">
                      {d.e > 0 && <div className="w-full bg-emerald-500 rounded-t-lg" style={{ height: `${d.e * 6}px` }} />}
                      {d.m > 0 && <div className="w-full bg-amber-500 rounded-sm" style={{ height: `${d.m * 6}px` }} />}
                      <div className="w-full bg-[#6c47ff] rounded-lg" style={{ height: `${d.c * 5}px` }} />
                    </div>
                    <span className="text-[9px] font-bold text-slate-400">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visit Distribution */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Visit Distribution</h3>

              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#6c47ff" strokeWidth="3.5" strokeDasharray="35, 100" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="25, 100" strokeDashoffset="-35" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="20, 100" strokeDashoffset="-60" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="15, 100" strokeDashoffset="-80" strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-lg font-black text-slate-900">342</span>
                  <span className="text-[9px] text-slate-400 font-bold">Total</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-semibold">
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#6c47ff]" /> ANC Visits</span> <strong>120</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Immunization</span> <strong>86</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> General</span> <strong>68</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Emergency</span> <strong>68</strong></div>
              </div>
            </div>
          </div>

          {/* Risk Distribution & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Patient Risk Distribution</h3>
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold"><span>Low Risk</span><span>124 patients</span></div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-emerald-500" style={{ width: '50%' }} /></div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold"><span>Medium Risk</span><span>78 patients</span></div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-amber-500" style={{ width: '31%' }} /></div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold"><span>High Risk</span><span>32 patients</span></div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-red-500" style={{ width: '13%' }} /></div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold"><span>Critical</span><span>14 patients</span></div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-purple-600" style={{ width: '6%' }} /></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Monthly Milestones</h3>
              <div className="space-y-3 text-xs">
                {[
                  { label: 'ANC Visits Target', current: 45, target: 50, color: 'bg-[#6c47ff]' },
                  { label: 'Immunization Coverage', current: 38, target: 40, color: 'bg-emerald-500' },
                  { label: 'High Risk Follow-ups', current: 28, target: 32, color: 'bg-amber-500' },
                  { label: 'Health Education Sessions', current: 12, target: 15, color: 'bg-blue-500' },
                ].map(m => (
                  <div key={m.label} className="space-y-1">
                    <div className="flex items-center justify-between font-bold"><span>{m.label}</span><span>{m.current}/{m.target}</span></div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${m.color}`} style={{ width: `${(m.current / m.target) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 rounded-3xl border border-purple-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6c47ff]" />
              <h3 className="font-bold text-purple-900 text-sm">AI Performance Insights</h3>
              <span className="px-2 py-0.5 rounded-full bg-purple-200 text-[#6c47ff] text-[9px] font-bold">✨ AI Powered</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white border border-purple-100 space-y-1">
                <span className="font-bold text-emerald-600">📈 Strong Performance</span>
                <p className="text-slate-600 leading-relaxed">Your ANC visit completion rate is 90%, which is 15% above the district average. Keep up the excellent work!</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-purple-100 space-y-1">
                <span className="font-bold text-amber-600">⚠️ Area of Focus</span>
                <p className="text-slate-600 leading-relaxed">Immunization follow-ups for children aged 9-12 months in Nagole Village need attention. 4 overdue cases detected.</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-purple-100 space-y-1">
                <span className="font-bold text-[#6c47ff]">💡 Recommendation</span>
                <p className="text-slate-600 leading-relaxed">Consider scheduling a community health camp next week to cover 8 high-risk patients in Uppal area efficiently.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
