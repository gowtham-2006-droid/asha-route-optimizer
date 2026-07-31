import React, { useState } from 'react';
import {
  Building2, Home, Users, UserCheck, MapPin, Navigation, AlertOctagon,
  FileText, Folder, BarChart3, Share2, MessageSquare, Settings, Bell,
  Calendar, ChevronDown, ArrowRight, ShieldCheck, CheckCircle2, Clock,
  Activity, Sparkles, AlertTriangle, Battery, Wifi, Check, X, RefreshCw,
  Award, TrendingUp, TrendingDown, FileSpreadsheet, Download, Send, Menu,
  Plus, MoreVertical, LogOut, ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import RouteMap from './RouteMap';
import { MOCK_ROUTE_STOPS } from '../services/mockData';
import AshaWorkerManagementPage from './pages/AshaWorkerManagementPage';
import PhcPatientsPage from './pages/PhcPatientsPage';
import VillagesPage from './pages/VillagesPage';
import LiveRoutesPage from './pages/LiveRoutesPage';

export default function SupervisorDashboard({ onGenerateReport, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedVillage, setSelectedVillage] = useState('All Villages');
  const [selectedWorkerId, setSelectedWorkerId] = useState('w1');
  const [emergencyHandled, setEmergencyHandled] = useState(false);

  const workers = [
    {
      id: 'w1',
      name: 'Lakshmi Devi',
      village: 'Habsiguda',
      patients: 24,
      completed: 18,
      remaining: 6,
      efficiency: 97,
      status: 'Active',
      statusBg: 'bg-emerald-100 text-emerald-800',
      location: 'Visiting Saraswati Devi (0.8 km away)',
      lastUpdate: '10:22 AM',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      battery: 78,
      network: 'Good'
    },
    {
      id: 'w2',
      name: 'Sita Devi',
      village: 'Pedda Thimmapur',
      patients: 20,
      completed: 14,
      remaining: 6,
      efficiency: 92,
      status: 'Active',
      statusBg: 'bg-emerald-100 text-emerald-800',
      location: 'On the way to Rani Lakshmi (1.2 km away)',
      lastUpdate: '10:31 AM',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      battery: 85,
      network: 'Good'
    },
    {
      id: 'w3',
      name: 'Anitha Reddy',
      village: 'Nandigama',
      patients: 22,
      completed: 12,
      remaining: 10,
      efficiency: 85,
      status: 'Busy',
      statusBg: 'bg-amber-100 text-amber-800',
      location: 'Visiting Meena Kumari (1.5 km away)',
      lastUpdate: '10:30 AM',
      photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      battery: 62,
      network: 'Moderate'
    },
    {
      id: 'w4',
      name: 'Meena Kumari',
      village: 'Uppal',
      patients: 18,
      completed: 9,
      remaining: 9,
      efficiency: 75,
      status: 'Busy',
      statusBg: 'bg-amber-100 text-amber-800',
      location: 'Break (12 mins) PHC Uppal',
      lastUpdate: '10:29 AM',
      photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
      battery: 90,
      network: 'Good'
    },
    {
      id: 'w5',
      name: 'Rani Devi',
      village: 'Lakshmipur',
      patients: 16,
      completed: 6,
      remaining: 10,
      efficiency: 60,
      status: 'Offline',
      statusBg: 'bg-red-100 text-red-700',
      location: 'Last seen 2 hours ago',
      lastUpdate: '08:15 AM',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      battery: 15,
      network: 'Poor'
    }
  ];

  const selectedWorker = workers.find(w => w.id === selectedWorkerId) || workers[0];

  const diseaseData = [
    { name: 'Fever', count: 42, color: '#6c47ff' },
    { name: 'Diabetes', count: 35, color: '#8b5cf6' },
    { name: 'BP', count: 58, color: '#ef4444' },
    { name: 'Respiratory', count: 28, color: '#3b82f6' },
    { name: 'Others', count: 18, color: '#10b981' }
  ];

  if (activeTab === 'workers') {
    return (
      <AshaWorkerManagementPage
        onNavigateToTab={(tab) => setActiveTab(tab)}
        onLogout={onLogout}
      />
    );
  }

  if (activeTab === 'patients') {
    return (
      <PhcPatientsPage
        onNavigateToTab={(tab) => setActiveTab(tab)}
        onLogout={onLogout}
      />
    );
  }

  if (activeTab === 'villages') {
    return (
      <VillagesPage
        onNavigateToTab={(tab) => setActiveTab(tab)}
        onLogout={onLogout}
      />
    );
  }

  if (activeTab === 'routes') {
    return (
      <LiveRoutesPage
        onNavigateToTab={(tab) => setActiveTab(tab)}
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fe] text-slate-900 font-sans">
      {/* 1. LEFT SIDEBAR (PHC Command Center) */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-6">
          {/* Logo & Brand Header */}
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

          {/* Sidebar Menu */}
          <nav className="space-y-1 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25'
                  : 'hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button onClick={() => setActiveTab('workers')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Users className="w-4 h-4" /><span>ASHA Workers</span>
            </button>

            <button onClick={() => setActiveTab('patients')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <UserCheck className="w-4 h-4" /><span>Patients</span>
            </button>

            <button onClick={() => setActiveTab('villages')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <MapPin className="w-4 h-4" /><span>Villages</span>
            </button>

            <button onClick={() => setActiveTab('routes')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Navigation className="w-4 h-4" /><span>Live Routes</span>
            </button>

            <button onClick={() => setActiveTab('emergencies')} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-bold">
              <div className="flex items-center gap-3"><AlertOctagon className="w-4 h-4" /><span>Emergencies</span></div>
              <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">4</span>
            </button>

            <button onClick={() => setActiveTab('reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <FileText className="w-4 h-4" /><span>Reports</span>
            </button>

            <button onClick={() => setActiveTab('resources')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Folder className="w-4 h-4" /><span>Resources</span>
            </button>

            <button onClick={() => setActiveTab('analytics')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <BarChart3 className="w-4 h-4" /><span>AI Analytics</span>
            </button>

            <button onClick={() => setActiveTab('referrals')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Share2 className="w-4 h-4" /><span>Referrals</span>
            </button>

            <button onClick={() => setActiveTab('messaging')} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <div className="flex items-center gap-3"><MessageSquare className="w-4 h-4" /><span>Messaging</span></div>
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center">12</span>
            </button>

            <button onClick={() => setActiveTab('settings')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Settings className="w-4 h-4" /><span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Medical Officer Profile Card */}
        <div className="p-3.5 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
              alt="Dr. Ramesh Kumar"
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
            />
            <div>
              <h4 className="font-extrabold text-slate-900 text-xs leading-tight">Dr. Ramesh Kumar</h4>
              <span className="text-[10px] text-slate-500 font-semibold block">Medical Officer</span>
              <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
              </span>
            </div>
          </div>
          {onLogout && (
            <button onClick={onLogout} title="Log Out" className="p-1.5 rounded-xl text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4" />
            </button>
          )}
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
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">PHC Command Center</h2>
              <p className="text-xs text-slate-500 font-medium">Welcome back, <strong className="text-slate-900">Dr. Ramesh Kumar 👋</strong></p>
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

            {/* Village Filter */}
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-[#6c47ff]"
            >
              <option value="All Villages">All Villages</option>
              <option value="Habsiguda">Habsiguda</option>
              <option value="Pedda Thimmapur">Pedda Thimmapur</option>
              <option value="Nandigama">Nandigama</option>
              <option value="Uppal">Uppal</option>
              <option value="Lakshmipur">Lakshmipur</option>
            </select>
          </div>
        </header>

        {/* Dashboard Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* ROW 1: 6 KPI Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Card 1: Active ASHA Workers */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Online: 28</span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Active ASHA Workers</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">36</span>
              </div>
            </div>

            {/* Card 2: Today's Visits */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Today's Visits</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">412</span>
                <button className="text-[10px] font-bold text-[#6c47ff] flex items-center gap-0.5 hover:underline pt-0.5">
                  View Details <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Completed */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Completed</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">278</span>
                <span className="text-[10px] font-bold text-emerald-600">67% Completed</span>
              </div>
            </div>

            {/* Card 4: Pending Visits */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Pending Visits</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">134</span>
                <span className="text-[10px] font-bold text-amber-600">33% Pending</span>
              </div>
            </div>

            {/* Card 5: High Risk Patients */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">High Risk Patients</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">58</span>
                <button className="text-[10px] font-bold text-red-600 flex items-center gap-0.5 hover:underline pt-0.5">
                  View All <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            {/* Card 6: Emergency Cases */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Emergency Cases</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">4</span>
                <button className="text-[10px] font-bold text-[#6c47ff] flex items-center gap-0.5 hover:underline pt-0.5">
                  View All <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ROW 2: Live Village Map, AI Insights (Today), Emergency Control Center & Resource Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: Live Village Map (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Live Village Map</h3>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600" /> High Risk</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Medium Risk</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Low Risk</span>
                  </div>
                </div>

                {/* Map Area */}
                <div className="h-[340px] rounded-2xl overflow-hidden relative">
                  <RouteMap stops={MOCK_ROUTE_STOPS} workerLocation={{ latitude: 17.3990, longitude: 78.5410 }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> ASHA Workers Online: 28 / 36
                </span>
                <button className="px-4 py-1.5 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center gap-1">
                  View All Routes <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Col 2: AI Insights (Today) (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-sm">AI Insights <span className="text-xs text-slate-400 font-medium">(Today)</span></h3>
                  <button className="text-[11px] text-[#6c47ff] font-bold hover:underline">View Full Report →</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-2xl bg-red-50/50">
                    <div>
                      <h4 className="font-extrabold text-red-900">High Risk Patients</h4>
                      <span className="text-[10px] text-slate-500 block">Requiring attention</span>
                    </div>
                    <span className="text-lg font-black text-red-600">58</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-2xl bg-amber-50/50">
                    <div>
                      <h4 className="font-extrabold text-amber-900">Overdue Visits</h4>
                      <span className="text-[10px] text-slate-500 block">Patients not visited</span>
                    </div>
                    <span className="text-lg font-black text-amber-600">16</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-2xl bg-blue-50/50">
                    <div>
                      <h4 className="font-extrabold text-blue-900">Missed Vaccinations</h4>
                      <span className="text-[10px] text-slate-500 block">Children & adults</span>
                    </div>
                    <span className="text-lg font-black text-blue-600">8</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-2xl bg-purple-50/50">
                    <div>
                      <h4 className="font-extrabold text-purple-900">Pregnant Mothers</h4>
                      <span className="text-[10px] text-slate-500 block">Currently registered</span>
                    </div>
                    <span className="text-lg font-black text-purple-600">22</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-2xl bg-emerald-50/50">
                    <div>
                      <h4 className="font-extrabold text-emerald-900">Children Due for Vaccination</h4>
                      <span className="text-[10px] text-slate-500 block">Next 15 days</span>
                    </div>
                    <span className="text-lg font-black text-emerald-600">41</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50">
                    <div>
                      <h4 className="font-extrabold text-slate-900">Emergency Referrals</h4>
                      <span className="text-[10px] text-slate-500 block">Referred to higher centers</span>
                    </div>
                    <span className="text-lg font-black text-slate-900">3</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-100 text-[11px] text-purple-950 font-medium">
                <span className="font-bold flex items-center gap-1 text-[#6c47ff] mb-0.5"><Sparkles className="w-3.5 h-3.5 fill-current" /> AI Recommendation</span>
                Village Habsiguda has high risk concentration. Consider additional ASHA support.
              </div>
            </div>

            {/* Col 3: Emergency Control Center & Resource Overview (4 cols) */}
            <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
              {/* Emergency Control Center Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Emergency Control Center</h3>
                  <button className="text-xs text-red-600 font-bold hover:underline">View All →</button>
                </div>

                {!emergencyHandled ? (
                  <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-red-600 text-xs flex items-center gap-1">
                        <AlertOctagon className="w-4 h-4 fill-current animate-bounce" /> New Emergency
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">5 mins ago</span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-700 font-semibold">
                      <p><strong>Patient:</strong> Rani Lakshmi</p>
                      <p><strong>Village:</strong> Pedda Thimmapur</p>
                      <p><strong>Issue:</strong> Severe BP & Dizziness</p>
                      <p><strong>Assigned ASHA:</strong> Sita Devi</p>
                      <p><strong>Response Time:</strong> 12 min</p>
                      <p className="text-[#6c47ff]"><strong>AI Suggested Worker:</strong> Sita Devi (1.2 km away)</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <button
                        onClick={() => setEmergencyHandled(true)}
                        className="py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-[11px] shadow-sm hover:bg-emerald-700 transition-all"
                      >
                        Accept & Assign
                      </button>
                      <button
                        onClick={() => alert("Reassigning emergency worker...")}
                        className="py-1.5 rounded-xl bg-blue-600 text-white font-extrabold text-[11px] shadow-sm hover:bg-blue-700 transition-all"
                      >
                        Reassign
                      </button>
                      <button
                        onClick={() => setEmergencyHandled(true)}
                        className="py-1.5 rounded-xl border border-red-300 text-red-600 hover:bg-red-100 font-extrabold text-[11px] transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
                    ✓ Emergency dispatched to Sita Devi! Status: In Progress.
                  </div>
                )}
              </div>

              {/* Resource Overview Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Resource Overview</h3>
                  <button className="text-xs text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  <div className="p-2 rounded-2xl bg-amber-50 border border-amber-100">
                    <span className="text-[10px] text-slate-400 font-bold block">ORS Packets</span>
                    <strong className="text-slate-900 font-black block text-sm">120</strong>
                    <span className="text-[9px] font-bold text-amber-600">Low Stock</span>
                  </div>

                  <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <span className="text-[10px] text-slate-400 font-bold block">Iron Tablets</span>
                    <strong className="text-slate-900 font-black block text-sm">450</strong>
                    <span className="text-[9px] font-bold text-emerald-600">Available</span>
                  </div>

                  <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <span className="text-[10px] text-slate-400 font-bold block">Vaccines</span>
                    <strong className="text-slate-900 font-black block text-sm">230</strong>
                    <span className="text-[9px] font-bold text-emerald-600">Available</span>
                  </div>

                  <div className="p-2 rounded-2xl bg-amber-50 border border-amber-100">
                    <span className="text-[10px] text-slate-400 font-bold block">BP Tablets</span>
                    <strong className="text-slate-900 font-black block text-sm">80</strong>
                    <span className="text-[9px] font-bold text-amber-600">Low Stock</span>
                  </div>

                  <div className="p-2 rounded-2xl bg-amber-50 border border-amber-100">
                    <span className="text-[10px] text-slate-400 font-bold block">Glucose</span>
                    <strong className="text-slate-900 font-black block text-sm">60</strong>
                    <span className="text-[9px] font-bold text-amber-600">Low Stock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: ASHA Worker Monitoring & Live Route Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: ASHA Worker Monitoring Table (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">ASHA Worker Monitoring</h3>
                  <button className="text-xs text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3.5">Worker</th>
                        <th className="p-3.5">Village</th>
                        <th className="p-3.5">Patients Today</th>
                        <th className="p-3.5">Completed</th>
                        <th className="p-3.5">Remaining</th>
                        <th className="p-3.5">Efficiency</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Current Location</th>
                        <th className="p-3.5">Last Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {workers.map((w) => (
                        <tr
                          key={w.id}
                          onClick={() => setSelectedWorkerId(w.id)}
                          className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedWorkerId === w.id ? 'bg-purple-50/50' : ''}`}
                        >
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <img src={w.photoUrl} alt={w.name} className="w-8 h-8 rounded-full object-cover border" />
                              <span className="font-extrabold text-slate-900 text-xs">{w.name}</span>
                            </div>
                          </td>
                          <td className="p-3.5">{w.village}</td>
                          <td className="p-3.5 font-bold text-slate-900">{w.patients}</td>
                          <td className="p-3.5 text-emerald-600 font-bold">{w.completed}</td>
                          <td className="p-3.5 text-amber-600 font-bold">{w.remaining}</td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#6c47ff] rounded-full" style={{ width: `${w.efficiency}%` }} />
                              </div>
                              <span className="text-[10px] font-black text-slate-900">{w.efficiency}%</span>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${w.statusBg}`}>
                              ● {w.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-[11px] text-slate-600 truncate max-w-[150px]">{w.location}</td>
                          <td className="p-3.5 text-[10px] text-slate-400 font-mono">{w.lastUpdate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Col 2: Live Route Tracking Card (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Live Route Tracking</h3>
                  <button className="text-xs text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/60 border border-purple-100">
                  <div className="flex items-center gap-3">
                    <img src={selectedWorker.photoUrl} alt={selectedWorker.name} className="w-9 h-9 rounded-full object-cover border border-purple-200" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs">{selectedWorker.name}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">{selectedWorker.village}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Live
                  </span>
                </div>

                {/* Map Preview */}
                <div className="h-40 rounded-2xl overflow-hidden relative">
                  <RouteMap stops={MOCK_ROUTE_STOPS.slice(0, 4)} workerLocation={{ latitude: 17.3990, longitude: 78.5410 }} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl">
                  <div><span className="text-[10px] text-slate-400 block font-bold">Current Stop</span><strong>Saraswati Devi</strong></div>
                  <div><span className="text-[10px] text-slate-400 block font-bold">Next Stop</span><strong>Anitha Reddy</strong></div>
                  <div><span className="text-[10px] text-slate-400 block font-bold">ETA</span><strong>10:40 AM <span className="text-[9px] text-slate-400 font-normal">(11 min)</span></strong></div>
                  <div><span className="text-[10px] text-slate-400 block font-bold">Distance Remaining</span><strong>1.8 km</strong></div>
                  <div><span className="text-[10px] text-slate-400 block font-bold">Patients Left</span><strong>{selectedWorker.remaining}</strong></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1"><Battery className="w-4 h-4 text-emerald-600" /> Battery {selectedWorker.battery}%</span>
                <span className="flex items-center gap-1"><Wifi className="w-4 h-4 text-blue-600" /> Network {selectedWorker.network}</span>
              </div>
            </div>
          </div>

          {/* ROW 4: 4 Columns Grid (AI Analytics, Leaderboard & Forecast, Recent Reports, Messaging Center) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Col 1: AI Analytics Overview (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">AI Analytics Overview</h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Full Analytics →</button>
              </div>

              {/* Disease Trend Bar Chart */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Disease Trend</span>
                <div className="h-28 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={diseaseData}>
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} />
                      <YAxis hide />
                      <Tooltip />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {diseaseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Col 2: Leaderboard & AI Forecast (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Performance Leaderboard</h3>

                <div className="space-y-2 text-xs font-semibold">
                  {workers.map((w, idx) => (
                    <div key={w.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                      <div className="flex items-center gap-2">
                        <span className="w-5 font-black text-[#6c47ff]">{idx + 1}.</span>
                        <img src={w.photoUrl} alt={w.name} className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-slate-900">{w.name}</span>
                      </div>
                      <strong className="text-emerald-600">{w.efficiency}%</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-[10px] text-purple-950 font-bold space-y-1">
                <span className="text-[#6c47ff] block">AI 7-Day Forecast:</span>
                <p>High risk patients may increase +18%. Expected emergencies: 6-8. Additional 2 ASHA workers recommended.</p>
              </div>
            </div>

            {/* Col 3: Recent Reports (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Recent Reports</h3>
                  <button onClick={onGenerateReport} className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-red-500" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-[11px]">Daily Report - 24 May 2026</h4>
                        <span className="text-[9px] text-slate-400">PDF • 10:00 AM</span>
                      </div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-purple-600" />
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-red-500" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-[11px]">Weekly Report - 18 to 24 May</h4>
                        <span className="text-[9px] text-slate-400">PDF • Yesterday</span>
                      </div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-purple-600" />
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-red-500" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-[11px]">Monthly Report - April 2026</h4>
                        <span className="text-[9px] text-slate-400">PDF • 2 May</span>
                      </div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-purple-600" />
                  </div>
                </div>
              </div>

              <button onClick={onGenerateReport} className="w-full py-2 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-all">
                <FileText className="w-3.5 h-3.5 text-blue-600" /> Generate EOD Report
              </button>
            </div>

            {/* Col 4: Messaging Center (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Messaging Center</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">Send Message →</button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-purple-900 text-[11px]">New Vaccination Drive</h4>
                      <span className="text-[9px] text-slate-400">10:20 AM</span>
                    </div>
                    <p className="text-[10px] text-slate-600">To all ASHA Workers</p>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-[11px]">ORS Stock Available</h4>
                      <span className="text-[9px] text-slate-400">09:45 AM</span>
                    </div>
                    <p className="text-[10px] text-slate-600">PHC Ramanthapur</p>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-[11px]">Training Program</h4>
                      <span className="text-[9px] text-slate-400">Yesterday</span>
                    </div>
                    <p className="text-[10px] text-slate-600">28 May 2026, 10 AM</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-2 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30 transition-all">
                View All Messages →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
