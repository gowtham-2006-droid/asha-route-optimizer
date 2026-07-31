import React, { useState } from 'react';
import {
  Building2, Home, Users, UserCheck, MapPin, Navigation, AlertOctagon,
  FileText, Folder, BarChart3, Share2, MessageSquare, Settings, Bell,
  Calendar, ChevronDown, ArrowRight, ShieldCheck, CheckCircle2, Clock,
  Activity, Sparkles, AlertTriangle, Battery, Wifi, Check, X, RefreshCw,
  Award, TrendingUp, TrendingDown, FileSpreadsheet, Download, Send, Menu,
  Plus, MoreVertical, LogOut, Search, ChevronLeft, ChevronRight, Eye,
  SlidersHorizontal, Scale, FileSpreadsheet as FileCsv
} from 'lucide-react';
import RouteMap from '../RouteMap';
import { MOCK_ROUTE_STOPS } from '../../services/mockData';

export default function VillagesPage({
  onNavigateToTab,
  onLogout
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCoverage, setFilterCoverage] = useState('Coverage Status');
  const [filterRisk, setFilterRisk] = useState('Risk Level');
  const [sortBy, setSortBy] = useState('Coverage');

  const villagesList = [
    { village: 'Habsiguda', population: '3,245', patients: '842', highRisk: 26, coverage: 86, coverageBar: 'bg-emerald-500', ashaWorkers: 3, overdueVisits: 8, status: 'Good', statusBadge: 'bg-emerald-100 text-emerald-800' },
    { village: 'Uppal', population: '4,162', patients: '1,128', highRisk: 42, coverage: 82, coverageBar: 'bg-emerald-500', ashaWorkers: 3, overdueVisits: 12, status: 'Good', statusBadge: 'bg-emerald-100 text-emerald-800' },
    { village: 'Chinna Thimmapur', population: '2,876', patients: '612', highRisk: 18, coverage: 91, coverageBar: 'bg-emerald-500', ashaWorkers: 2, overdueVisits: 5, status: 'Good', statusBadge: 'bg-emerald-100 text-emerald-800' },
    { village: 'Pedda Thimmapur', population: '5,421', patients: '1,642', highRisk: 74, coverage: 62, coverageBar: 'bg-amber-500', ashaWorkers: 4, overdueVisits: 28, status: 'Medium', statusBadge: 'bg-amber-100 text-amber-800' },
    { village: 'Lakshmipur', population: '3,890', patients: '1,034', highRisk: 48, coverage: 54, coverageBar: 'bg-amber-500', ashaWorkers: 3, overdueVisits: 22, status: 'Medium', statusBadge: 'bg-amber-100 text-amber-800' },
    { village: 'Nandigama', population: '2,987', patients: '754', highRisk: 32, coverage: 65, coverageBar: 'bg-amber-500', ashaWorkers: 2, overdueVisits: 18, status: 'Medium', statusBadge: 'bg-amber-100 text-amber-800' },
    { village: 'Ramanthapur', population: '6,232', patients: '1,928', highRisk: 68, coverage: 79, coverageBar: 'bg-emerald-500', ashaWorkers: 5, overdueVisits: 16, status: 'Good', statusBadge: 'bg-emerald-100 text-emerald-800' },
    { village: 'Nagole', population: '5,857', patients: '1,546', highRisk: 38, coverage: 38, coverageBar: 'bg-red-500', ashaWorkers: 2, overdueVisits: 34, status: 'Low', statusBadge: 'bg-red-100 text-red-700' }
  ];

  const highRiskByVillageData = [
    { village: 'Nagole', count: 38 },
    { village: 'Pedda Thimmapur', count: 74 },
    { village: 'Ramanthapur', count: 68 },
    { village: 'Lakshmipur', count: 48 },
    { village: 'Nandigama', count: 32 },
    { village: 'Habsiguda', count: 26 },
    { village: 'Uppal', count: 42 },
    { village: 'Chinna Thimmapur', count: 18 }
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
            <button onClick={() => onNavigateToTab && onNavigateToTab('villages')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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
            <p className="text-[11px] text-slate-500 leading-snug">Ask anything about villages or health data</p>
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
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">Villages Overview</h2>
              <p className="text-xs text-slate-500 font-medium">Monitor health coverage, patients and ASHA activities across all villages</p>
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
          {/* ROW 1: 8 KPI Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Total Villages</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">24</span>
                <span className="text-[9px] font-bold text-slate-400">Under PHC</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Total Population</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">48,672</span>
                <span className="text-[9px] font-bold text-emerald-600">+362 this month</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Total Patients</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">12,486</span>
                <span className="text-[9px] font-bold text-slate-400">25.6% of population</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">High Risk Patients</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">582</span>
                <span className="text-[9px] font-bold text-red-600">4.7% of patients</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">ASHA Workers</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">36</span>
                <span className="text-[9px] font-bold text-slate-400">Active in field</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Coverage Rate</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">78%</span>
                <span className="text-[9px] font-bold text-emerald-600">Target: 90%</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Overdue Visits</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">146</span>
                <span className="text-[9px] font-bold text-amber-600">Need attention</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Emergency Cases</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">18</span>
                <span className="text-[9px] font-bold text-red-600">Active cases</span>
              </div>
            </div>
          </div>

          {/* ROW 2: Villages Map (5 cols), Village Health Summary (3 cols), AI Insights Today (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: Villages Map (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Villages Map</h3>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Good Coverage (≥ 80%)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Medium (50% - 79%)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Low (&lt; 50%)</span>
                  </div>
                </div>

                <div className="h-[280px] rounded-2xl overflow-hidden relative">
                  <RouteMap stops={MOCK_ROUTE_STOPS} workerLocation={{ latitude: 17.3990, longitude: 78.5410 }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <span>Coverage Rate</span>
                  <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6c47ff] rounded-full" style={{ width: '78%' }} />
                  </div>
                  <span className="text-[#6c47ff]">78%</span>
                </div>

                <button className="px-4 py-1.5 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center gap-1">
                  View Full Map <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Col 2: Village Health Summary (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-sm">Village Health Summary</h3>
                  <button className="text-[11px] text-[#6c47ff] font-bold hover:underline">View Full Report →</button>
                </div>

                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex justify-between p-1.5 rounded-xl bg-slate-50"><span className="text-slate-400">Total Villages</span><strong>24</strong></div>
                  <div className="flex justify-between p-1.5 rounded-xl bg-emerald-50/60"><span className="text-emerald-900 font-bold">Fully Covered (≥ 80%)</span><strong className="text-emerald-700">9 Villages</strong></div>
                  <div className="flex justify-between p-1.5 rounded-xl bg-amber-50/60"><span className="text-amber-900 font-bold">Moderate Coverage (50% - 79%)</span><strong className="text-amber-700">11 Villages</strong></div>
                  <div className="flex justify-between p-1.5 rounded-xl bg-red-50/60"><span className="text-red-900 font-bold">Low Coverage (&lt; 50%)</span><strong className="text-red-700">4 Villages</strong></div>
                  <div className="flex justify-between p-1.5 rounded-xl bg-slate-50"><span className="text-slate-400">Total Population</span><strong>48,672</strong></div>
                  <div className="flex justify-between p-1.5 rounded-xl bg-slate-50"><span className="text-slate-400">Total Patients</span><strong>12,486</strong></div>
                  <div className="flex justify-between p-1.5 rounded-xl bg-red-50/50"><span className="text-red-900">High Risk Patients</span><strong className="text-red-600">582</strong></div>
                  <div className="flex justify-between p-1.5 rounded-xl bg-slate-50"><span className="text-slate-400">ASHA Workers</span><strong>36</strong></div>
                  <div className="flex justify-between p-1.5 rounded-xl bg-amber-50/50"><span className="text-amber-900">Overdue Visits</span><strong className="text-amber-600">146</strong></div>
                  <div className="flex justify-between p-1.5 rounded-xl bg-red-50/50"><span className="text-red-900">Emergency Cases</span><strong className="text-red-600">18</strong></div>
                </div>
              </div>
            </div>

            {/* Col 3: AI Insights (Today) (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-sm">AI Insights <span className="text-xs text-slate-400 font-medium">(Today)</span></h3>
                  <button className="text-[11px] text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-100 text-[11px] text-purple-950 font-medium">
                  <span className="font-bold flex items-center gap-1 text-[#6c47ff] mb-0.5"><Sparkles className="w-3.5 h-3.5 fill-current" /> AI Recommendation</span>
                  Village Nagole has the highest high-risk patients (38). Immediate attention required.
                </div>

                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="p-2.5 rounded-2xl bg-red-50/60 border border-red-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-red-900 text-xs">Village with Highest Risk</h4>
                    </div>
                    <div className="text-right">
                      <strong className="text-red-600 font-black text-xs block">Nagole</strong>
                      <span className="text-[10px] text-red-600 font-bold">38 High Risk</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-amber-900 text-xs">Lowest Coverage</h4>
                    </div>
                    <div className="text-right">
                      <strong className="text-amber-700 font-black text-xs block">Nagole</strong>
                      <span className="text-[10px] text-amber-700 font-bold">38%</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-emerald-900 text-xs">Best Performing Village</h4>
                    </div>
                    <div className="text-right">
                      <strong className="text-emerald-700 font-black text-xs block">Chinna Thimmapur</strong>
                      <span className="text-[10px] text-emerald-700 font-bold">91% Coverage</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs">Overdue Visits Concentration</h4>
                    </div>
                    <strong className="text-slate-900 font-black text-xs">Pedda Thimmapur, Nandigama</strong>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-purple-950 text-xs">Suggested Action</h4>
                    </div>
                    <span className="text-[10px] text-purple-900 font-bold text-right">Deploy additional ASHA in Nagole and Pedda Thimmapur</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: Villages List Table (Left 8 cols) & Coverage by Village Chart (Right 4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Villages List Table */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-sm">Villages List</h3>

                  <div className="flex items-center gap-3">
                    <div className="relative w-48">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search village..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                      />
                    </div>

                    <select value={filterCoverage} onChange={(e)=>setFilterCoverage(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700">
                      <option>Coverage Status</option><option>Good (≥ 80%)</option><option>Medium (50-79%)</option><option>Low (&lt; 50%)</option>
                    </select>

                    <select value={filterRisk} onChange={(e)=>setFilterRisk(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700">
                      <option>Risk Level</option><option>High Risk</option><option>Moderate</option><option>Low Risk</option>
                    </select>

                    <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700">
                      <option>Sort By: Coverage</option><option>Sort By: Population</option><option>Sort By: High Risk</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-100">
                      <tr>
                        <th className="p-3">Village</th>
                        <th className="p-3">Population</th>
                        <th className="p-3">Patients</th>
                        <th className="p-3">High Risk</th>
                        <th className="p-3">Coverage Rate</th>
                        <th className="p-3">ASHA Workers</th>
                        <th className="p-3">Overdue Visits</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {villagesList.map((v) => (
                        <tr key={v.village} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-xs">
                                {v.village[0]}
                              </div>
                              <span className="font-extrabold text-slate-900 text-xs">{v.village}</span>
                            </div>
                          </td>
                          <td className="p-3 text-slate-900 font-bold">{v.population}</td>
                          <td className="p-3 text-slate-800 font-bold">{v.patients}</td>
                          <td className="p-3 text-red-600 font-bold">{v.highRisk}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full ${v.coverageBar} rounded-full`} style={{ width: `${v.coverage}%` }} />
                              </div>
                              <span className="text-[10px] font-black text-slate-900">{v.coverage}%</span>
                            </div>
                          </td>
                          <td className="p-3 text-slate-900 font-bold">{v.ashaWorkers}</td>
                          <td className="p-3 text-amber-600 font-bold">{v.overdueVisits}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${v.statusBadge}`}>
                              {v.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button title="View Village Details" className="p-1 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-600">
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

              {/* Table Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Showing 1 to 8 of 24 villages</span>

                <div className="flex items-center gap-1">
                  <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="px-3 py-1 rounded-lg bg-[#6c47ff] text-white font-bold">1</button>
                  <button className="px-3 py-1 rounded-lg hover:bg-slate-100 font-bold text-slate-600">2</button>
                  <button className="px-3 py-1 rounded-lg hover:bg-slate-100 font-bold text-slate-600">3</button>
                  <span className="px-1 text-slate-400">...</span>
                  <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"><ChevronRight className="w-4 h-4" /></button>
                </div>

                <select className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-800 font-bold">
                  <option>Show 10</option>
                  <option>Show 25</option>
                </select>
              </div>
            </div>

            {/* Right 4 Cols: Coverage by Village Chart */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Coverage by Village</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  {villagesList.map((vl) => (
                    <div key={vl.village} className="space-y-0.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-800 font-bold">{vl.village}</span>
                        <strong className="text-slate-900 font-black">{vl.coverage}%</strong>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${vl.coverageBar} rounded-full`} style={{ width: `${vl.coverage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ROW 4: Population, Health Conditions, High Risk & Latest Alerts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Col 1: Population Distribution (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Population Distribution</h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
              </div>

              <div className="space-y-1.5 text-[11px] font-semibold">
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Habsiguda</span><strong>3,245 (6.7%)</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Uppal</span><strong>4,162 (8.5%)</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Ramanthapur</span><strong>6,232 (12.8%)</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Pedda Thimmapur</span><strong>5,421 (11.1%)</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Nagole</span><strong>5,857 (12.0%)</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Others</span><strong>23,755 (48.9%)</strong></div>
              </div>
            </div>

            {/* Col 2: Health Condition Overview (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Health Condition Overview</h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
              </div>

              <div className="space-y-1.5 text-[11px] font-semibold">
                <div className="flex items-center justify-between"><span className="text-slate-700">Hypertension</span><strong>2,341 (18.7%)</strong></div>
                <div className="flex items-center justify-between"><span className="text-slate-700">Diabetes</span><strong>2,120 (16.9%)</strong></div>
                <div className="flex items-center justify-between"><span className="text-slate-700">Pregnancy</span><strong>1,152 (9.2%)</strong></div>
                <div className="flex items-center justify-between"><span className="text-slate-700">Anemia</span><strong>980 (7.8%)</strong></div>
                <div className="flex items-center justify-between"><span className="text-slate-700">Respiratory</span><strong>612 (4.9%)</strong></div>
                <div className="flex items-center justify-between"><span className="text-slate-700">Others</span><strong>5,281 (42.5%)</strong></div>
              </div>
            </div>

            {/* Col 3: High Risk by Village (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">High Risk by Village</h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
              </div>

              <div className="space-y-2 text-xs font-semibold">
                {highRiskByVillageData.map((hr) => (
                  <div key={hr.village} className="space-y-0.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-700 font-bold">{hr.village}</span>
                      <strong className="text-red-600 font-black">{hr.count}</strong>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${(hr.count / 75) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 4: Latest Village Alerts (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Latest Village Alerts</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  <div className="p-2.5 rounded-2xl bg-red-50/60 border border-red-100 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-red-900 text-xs">High Risk Increase in Nagole</h4>
                      <span className="text-[9px] text-slate-400">10 min ago</span>
                    </div>
                    <p className="text-[10px] text-slate-600">High-risk cases increased by 10% in last 7 days</p>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-amber-900 text-xs">Overdue Visits in Pedda Thimmapur</h4>
                      <span className="text-[9px] text-slate-400">25 min ago</span>
                    </div>
                    <p className="text-[10px] text-slate-600">28 overdue visits pending</p>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-xs">Low Coverage in Lakshmipur</h4>
                      <span className="text-[9px] text-slate-400">1 hr ago</span>
                    </div>
                    <p className="text-[10px] text-slate-600">Coverage dropped below 60%</p>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-emerald-900 text-xs">Good Progress in Chinna Thimmapur</h4>
                      <span className="text-[9px] text-slate-400">2 hrs ago</span>
                    </div>
                    <p className="text-[10px] text-slate-600">Coverage improved by 12% this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS BOTTOM BAR */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider hidden sm:block">Quick Actions</span>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => alert("Add New Village Form Opened")}
                className="px-4 py-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-600/25 transition-all"
              >
                <Plus className="w-4 h-4" /> Add New Village
              </button>

              <button
                onClick={() => alert("Generating Village Health Report...")}
                className="px-4 py-2.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-blue-600" /> Village Health Report
              </button>

              <button
                onClick={() => alert("ASHA Worker Assignment Tool Opened")}
                className="px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <Users className="w-4 h-4 text-emerald-600" /> Assign ASHA Workers
              </button>

              <button
                onClick={() => alert("Village Comparison Matrix Opened")}
                className="px-4 py-2.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 hover:bg-purple-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <Scale className="w-4 h-4 text-purple-600" /> Village Comparison
              </button>

              <button
                onClick={() => alert("Generating AI Catchment Summary...")}
                className="px-4 py-2.5 rounded-2xl bg-purple-50 border border-purple-200 text-[#6c47ff] hover:bg-purple-100 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 fill-current" /> Generate AI Summary
              </button>

              <button
                onClick={() => {
                  const csvContent = 'Village,Population,Patients,High Risk,Coverage Rate,ASHA Workers,Overdue Visits,Status\n' + 
                    villagesList.map(v => `${v.village},${v.population},${v.patients},${v.highRisk},${v.coverage}%,${v.ashaWorkers},${v.overdueVisits},${v.status}`).join('\n');
                  const blob = new Blob([csvContent], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'villages_overview_export.csv';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <FileCsv className="w-4 h-4 text-slate-600" /> Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
