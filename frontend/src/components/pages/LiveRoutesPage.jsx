import React, { useState } from 'react';
import {
  Building2, Home, Users, UserCheck, MapPin, Navigation, AlertOctagon,
  FileText, Folder, BarChart3, Share2, MessageSquare, Settings, Bell,
  Calendar, ChevronDown, ArrowRight, ShieldCheck, CheckCircle2, Clock,
  Activity, Sparkles, AlertTriangle, Battery, Wifi, Check, X, RefreshCw,
  Award, TrendingUp, TrendingDown, FileSpreadsheet, Download, Send, Menu,
  Plus, MoreVertical, LogOut, Search, ChevronLeft, ChevronRight, Eye,
  Play, Radio, Map, ArrowUpRight
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import RouteMap from '../RouteMap';
import { MOCK_ROUTE_STOPS } from '../../services/mockData';

export default function LiveRoutesPage({
  onNavigateToTab,
  onLogout
}) {
  const [selectedWorkerId, setSelectedWorkerId] = useState('w1');
  const [activeSubTab, setActiveSubTab] = useState('Route');

  const workersRoutes = [
    {
      id: 'w1',
      name: 'Lakshmi Devi',
      village: 'Habsiguda',
      progress: 75,
      stopsCompleted: 18,
      totalStops: 24,
      status: 'On the Way',
      statusColor: 'bg-blue-100 text-blue-800',
      location: 'Near Habsiguda (0.4 km away)',
      lastUpdate: '10:32 AM',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      battery: 78,
      network: 'Good',
      isLive: true,
      currentPatient: 'Patient 18 - Saraswati Devi',
      nextPatient: 'Patient 19 - Anitha Reddy',
      nextEta: '10:48 AM (ETA 16 min)'
    },
    {
      id: 'w2',
      name: 'Sita Devi',
      village: 'Pedda Thimmapur',
      progress: 60,
      stopsCompleted: 14,
      totalStops: 23,
      status: 'On the Way',
      statusColor: 'bg-blue-100 text-blue-800',
      location: 'Enroute to Patient 15 (1.2 km away)',
      lastUpdate: '10:31 AM',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      battery: 85,
      network: 'Good',
      isLive: true
    },
    {
      id: 'w3',
      name: 'Anitha Reddy',
      village: 'Nandigama',
      progress: 90,
      stopsCompleted: 20,
      totalStops: 22,
      status: 'On the Way',
      statusColor: 'bg-blue-100 text-blue-800',
      location: 'Near Nandigama (0.6 km away)',
      lastUpdate: '10:30 AM',
      photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      battery: 68,
      network: 'Good',
      isLive: true
    },
    {
      id: 'w4',
      name: 'Meena Kumari',
      village: 'Uppal',
      progress: 100,
      stopsCompleted: 22,
      totalStops: 22,
      status: 'Completed',
      statusColor: 'bg-emerald-100 text-emerald-800',
      location: 'Route Completed',
      lastUpdate: '10:29 AM',
      photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
      battery: 92,
      network: 'Good',
      isLive: false
    },
    {
      id: 'w5',
      name: 'Rani Devi',
      village: 'Lakshmipur',
      progress: 35,
      stopsCompleted: 8,
      totalStops: 23,
      status: 'Delayed',
      statusColor: 'bg-amber-100 text-amber-800',
      location: 'Traffic on route (2.1 km away)',
      lastUpdate: '10:15 AM',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      battery: 45,
      network: 'Moderate',
      isLive: true
    },
    {
      id: 'w6',
      name: 'Parvathi Amma',
      village: 'Ramanthapur',
      progress: 0,
      stopsCompleted: 0,
      totalStops: 20,
      status: 'Not Started',
      statusColor: 'bg-slate-100 text-slate-600',
      location: 'Yet to start',
      lastUpdate: '--',
      photoUrl: 'https://images.unsplash.com/photo-1566616213894-26910a39f65e?w=150&auto=format&fit=crop&q=80',
      battery: 100,
      network: 'Good',
      isLive: false
    }
  ];

  const selectedWorker = workersRoutes.find(w => w.id === selectedWorkerId) || workersRoutes[0];

  const distanceData = [
    { time: '12 AM', dist: 0 },
    { time: '4 AM', dist: 0 },
    { time: '8 AM', dist: 45 },
    { time: '12 PM', dist: 185 },
    { time: '4 PM', dist: 290 },
    { time: '8 PM', dist: 342.6 }
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
            <button onClick={() => onNavigateToTab && onNavigateToTab('routes')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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
            <p className="text-[11px] text-slate-500 leading-snug">Ask anything about live routes or locations</p>
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
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">Live Routes</h2>
              <p className="text-xs text-slate-500 font-medium">Real-time tracking of ASHA workers and their daily routes</p>
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
          {/* ROW 1: 7 KPI Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Active Routes</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">28</span>
                <span className="text-[9px] font-bold text-[#6c47ff]">77% of total</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">On the Way</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">18</span>
                <span className="text-[9px] font-bold text-blue-600">51% of total</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Completed</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">6</span>
                <span className="text-[9px] font-bold text-emerald-600">21% of total</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Delayed</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">4</span>
                <span className="text-[9px] font-bold text-amber-600">14% of total</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <Play className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Not Started</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">8</span>
                <span className="text-[9px] font-bold text-slate-400">29% of total</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Total Distance</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">342.6 km</span>
                <span className="text-[9px] font-bold text-slate-400">Today</span>
              </div>
            </div>

            <div className="p-3.5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="w-8 h-8 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">Avg. Progress</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">64%</span>
                <span className="text-[9px] font-bold text-emerald-600">Today</span>
              </div>
            </div>
          </div>

          {/* ROW 2: Live Map (5 cols), Live Route Summary & Alerts (3 cols), Selected Worker Details (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: Live Map (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-sm">Live Map</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Live
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-[9px] font-bold text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Active</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> On the Way</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600" /> Completed</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Delayed</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400" /> Not Started</span>
                  </div>
                </div>

                <div className="h-[320px] rounded-2xl overflow-hidden relative">
                  <RouteMap stops={MOCK_ROUTE_STOPS} workerLocation={{ latitude: 17.3990, longitude: 78.5410 }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-2">
                  Total ASHA on Route: <strong className="text-[#6c47ff]">28 / 36</strong>
                  <button className="text-[10px] text-[#6c47ff] hover:underline font-bold">View All</button>
                </span>

                <button className="px-4 py-1.5 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center gap-1">
                  View Full Map <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Col 2: Live Route Summary & Route Alerts (3 cols) */}
            <div className="lg:col-span-3 space-y-6 flex flex-col justify-between">
              {/* Live Route Summary Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Live Route Summary</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All Routes →</button>
                </div>

                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex justify-between"><span className="text-slate-400">Total Routes</span><strong>36</strong></div>
                  <div className="flex justify-between"><span className="text-slate-400">Active Now</span><strong className="text-emerald-600">28</strong></div>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span className="text-slate-400">Average Progress</span><strong className="text-emerald-600">64%</strong></div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '64%' }} />
                    </div>
                  </div>
                  <div className="flex justify-between"><span className="text-slate-400">Total Distance Covered</span><strong>342.6 km</strong></div>
                  <div className="flex justify-between"><span className="text-slate-400">Estimated Time Left</span><strong>3h 24m</strong></div>
                  <div className="flex justify-between"><span className="text-slate-400">Completed Stops</span><strong className="text-emerald-600">278</strong></div>
                  <div className="flex justify-between"><span className="text-slate-400">Pending Stops</span><strong className="text-amber-600">134</strong></div>
                  <div className="flex justify-between"><span className="text-slate-400">Delay Alerts</span><strong className="text-red-600">4</strong></div>
                </div>
              </div>

              {/* Route Alerts Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Route Alerts</h3>
                  <button className="text-[10px] text-red-600 font-bold hover:underline">View All →</button>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  <div className="p-2 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-0.5">
                    <div className="flex justify-between">
                      <h4 className="font-extrabold text-amber-900 text-[11px]">Delay Detected</h4>
                      <span className="text-[9px] text-slate-400">10:15 AM</span>
                    </div>
                    <p className="text-[10px] text-slate-600">Rani Devi is delayed by 25 mins</p>
                  </div>

                  <div className="p-2 rounded-2xl bg-red-50/60 border border-red-100 space-y-0.5">
                    <div className="flex justify-between">
                      <h4 className="font-extrabold text-red-900 text-[11px]">Stop Missed</h4>
                      <span className="text-[9px] text-slate-400">09:58 AM</span>
                    </div>
                    <p className="text-[10px] text-slate-600">Sita Devi missed Patient 9</p>
                  </div>

                  <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <div className="flex justify-between">
                      <h4 className="font-extrabold text-slate-900 text-[11px]">Slow Progress</h4>
                      <span className="text-[9px] text-slate-400">09:45 AM</span>
                    </div>
                    <p className="text-[10px] text-slate-600">Low progress in Lakshmipur route</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3: Selected Worker Route Details & Timeline (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Worker Profile Header */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/60 border border-purple-100">
                  <div className="flex items-center gap-3">
                    <img src={selectedWorker.photoUrl} alt={selectedWorker.name} className="w-10 h-10 rounded-full object-cover border-2 border-purple-200" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-xs">{selectedWorker.name}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-extrabold">● Live</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block">ASHA ID: {selectedWorker.id}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{selectedWorker.village}</span>
                    </div>
                  </div>
                  <div className="text-right text-[10px] font-bold space-y-0.5">
                    <span className="text-emerald-600 block">Battery 78%</span>
                    <span className="text-blue-600 block">Network Good</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold"><span className="text-slate-400">Progress</span><strong>75%</strong><span className="text-slate-400">Stops: <strong>18 / 24</strong></span></div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6c47ff] rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center justify-between border-b border-slate-200 text-xs font-bold">
                  <button className="pb-2 border-b-2 border-[#6c47ff] text-[#6c47ff]">Route</button>
                  <button className="pb-2 text-slate-400 hover:text-slate-700">Details</button>
                  <button className="pb-2 text-slate-400 hover:text-slate-700">Activity</button>
                  <button className="pb-2 text-slate-400 hover:text-slate-700">Alerts</button>
                </div>

                {/* Route Stops Timeline */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Route Stops</h4>
                  <div className="relative pl-5 space-y-3 text-[11px] font-semibold border-l-2 border-purple-200">
                    <div className="relative">
                      <span className="absolute -left-[27px] top-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                      <div className="flex justify-between">
                        <span className="font-bold text-emerald-700">Current Location</span>
                        <span className="text-slate-400 text-[10px]">10:32 AM</span>
                      </div>
                      <span className="text-slate-600 text-[10px] block">Patient 18 - Saraswati Devi</span>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[27px] top-0.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white" />
                      <div className="flex justify-between">
                        <span className="font-bold text-blue-700">Next Stop</span>
                        <span className="text-slate-400 text-[10px]">10:48 AM <span className="text-slate-400 font-normal">(ETA 16 min)</span></span>
                      </div>
                      <span className="text-slate-600 text-[10px] block">Patient 19 - Anitha Reddy</span>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[27px] top-0.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white" />
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-700">Stop 20</span>
                        <span className="text-slate-400 text-[10px]">11:05 AM <span className="text-slate-400 font-normal">(ETA 33 min)</span></span>
                      </div>
                      <span className="text-slate-600 text-[10px] block">Patient 20 - Meena Kumari</span>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[27px] top-0.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white" />
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-700">Stop 21</span>
                        <span className="text-slate-400 text-[10px]">11:22 AM <span className="text-slate-400 font-normal">(ETA 50 min)</span></span>
                      </div>
                      <span className="text-slate-600 text-[10px] block">Patient 21 - Rani Lakshmi</span>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[27px] top-0.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white" />
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-700">Stop 22</span>
                        <span className="text-slate-400 text-[10px]">11:40 AM <span className="text-slate-400 font-normal">(ETA 1h 08m)</span></span>
                      </div>
                      <span className="text-slate-600 text-[10px] block">Patient 22 - Praveen Kumar</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-2xl bg-[#6c47ff] text-white hover:bg-purple-700 font-extrabold text-xs shadow-md shadow-purple-600/30 transition-all text-center">
                View Full Route →
              </button>
            </div>
          </div>

          {/* ROW 3: Live Routes Activity Table (Left 7 cols) & Sidebar Widgets (Right 5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Live Routes Activity Table */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-sm">Live Routes Activity</h3>
                  <button className="text-xs text-[#6c47ff] font-bold hover:underline">View All Routes →</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-100">
                      <tr>
                        <th className="p-3">ASHA Worker</th>
                        <th className="p-3">Village</th>
                        <th className="p-3">Progress</th>
                        <th className="p-3">Stops</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Current Location</th>
                        <th className="p-3">Last Update</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {workersRoutes.map((w) => (
                        <tr
                          key={w.id}
                          onClick={() => setSelectedWorkerId(w.id)}
                          className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedWorkerId === w.id ? 'bg-purple-50/50' : ''}`}
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <img src={w.photoUrl} alt={w.name} className="w-7 h-7 rounded-full object-cover border" />
                              <span className="font-extrabold text-slate-900 text-xs">{w.name}</span>
                            </div>
                          </td>
                          <td className="p-3 text-slate-800">{w.village}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#6c47ff] rounded-full" style={{ width: `${w.progress}%` }} />
                              </div>
                              <span className="text-[10px] font-black text-slate-900">{w.progress}%</span>
                            </div>
                          </td>
                          <td className="p-3 text-slate-900 font-bold">{w.stopsCompleted} / {w.totalStops}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${w.statusColor}`}>
                              {w.status}
                            </span>
                          </td>
                          <td className="p-3 text-[11px] text-slate-600 truncate max-w-[140px]">{w.location}</td>
                          <td className="p-3 text-[10px] text-slate-400 font-mono">{w.lastUpdate}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1 text-slate-400">
                              <Settings className="w-3.5 h-3.5 hover:text-purple-600 cursor-pointer" />
                              <MapPin className="w-3.5 h-3.5 hover:text-purple-600 cursor-pointer" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-right">
                <button className="text-xs text-[#6c47ff] font-bold hover:underline">Showing 1 to 6 of 28 routes • View All Routes →</button>
              </div>
            </div>

            {/* Right 5 Cols: 4 Analytics & Map List Widgets */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Widget 1: Route Progress Overview */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Route Progress Overview</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
                </div>

                <div className="flex items-center justify-around my-1">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="21, 100" strokeDashoffset="0" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="51, 100" strokeDashoffset="-21" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="14, 100" strokeDashoffset="-72" strokeLinecap="round" />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-sm font-black text-slate-900 block leading-tight">36</span>
                      <span className="text-[7px] font-bold text-slate-400">Total Routes</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-[10px] font-semibold">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed: <strong>6 (21%)</strong></div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> On the Way: <strong>18 (51%)</strong></div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Delayed: <strong>4 (14%)</strong></div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400" /> Not Started: <strong>8 (29%)</strong></div>
                  </div>
                </div>
              </div>

              {/* Widget 2: Distance Covered Today */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Distance Covered Today</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
                </div>

                <div className="space-y-1">
                  <span className="text-xl font-black text-slate-900 block">342.6 km</span>
                  <span className="text-[9px] font-bold text-slate-400 block">Total Distance</span>
                </div>

                <div className="h-20 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={distanceData}>
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={8} />
                      <YAxis hide />
                      <Tooltip />
                      <Line type="monotone" dataKey="dist" stroke="#6c47ff" strokeWidth={2} dot={{ r: 3, fill: '#6c47ff' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Widget 3: Average Progress by Village */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Average Progress by Village</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
                </div>

                <div className="space-y-1.5 text-[10px] font-semibold">
                  <div className="space-y-0.5"><div className="flex justify-between"><span>Habsiguda</span><strong>78%</strong></div><div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '78%' }} /></div></div>
                  <div className="space-y-0.5"><div className="flex justify-between"><span>Pedda Thimmapur</span><strong>65%</strong></div><div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '65%' }} /></div></div>
                  <div className="space-y-0.5"><div className="flex justify-between"><span>Uppal</span><strong>72%</strong></div><div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '72%' }} /></div></div>
                  <div className="space-y-0.5"><div className="flex justify-between"><span>Nandigama</span><strong>61%</strong></div><div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{ width: '61%' }} /></div></div>
                  <div className="space-y-0.5"><div className="flex justify-between"><span>Lakshmipur</span><strong>55%</strong></div><div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{ width: '55%' }} /></div></div>
                </div>
              </div>

              {/* Widget 4: Live Workers on Map List */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Live Workers on Map</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="space-y-2 text-[10px] font-semibold">
                  <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" alt="Lakshmi Devi" className="w-6 h-6 rounded-full object-cover" />
                      <div><strong className="text-slate-900 block leading-tight">Lakshmi Devi</strong><span className="text-slate-400">Habsiguda</span></div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">● Live</span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" alt="Sita Devi" className="w-6 h-6 rounded-full object-cover" />
                      <div><strong className="text-slate-900 block leading-tight">Sita Devi</strong><span className="text-slate-400">Pedda Thimmapur</span></div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">● Live</span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80" alt="Anitha Reddy" className="w-6 h-6 rounded-full object-cover" />
                      <div><strong className="text-slate-900 block leading-tight">Anitha Reddy</strong><span className="text-slate-400">Nandigama</span></div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">● Live</span>
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
