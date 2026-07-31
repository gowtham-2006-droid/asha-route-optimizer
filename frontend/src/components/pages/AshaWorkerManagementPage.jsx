import React, { useState } from 'react';
import {
  Building2, Home, Users, UserCheck, MapPin, Navigation, AlertOctagon,
  FileText, Folder, BarChart3, Share2, MessageSquare, Settings, Bell,
  Calendar, ChevronDown, ArrowRight, ShieldCheck, CheckCircle2, Clock,
  Activity, Sparkles, AlertTriangle, Battery, Wifi, Check, X, RefreshCw,
  Award, TrendingUp, TrendingDown, FileSpreadsheet, Download, Send, Menu,
  Plus, MoreVertical, LogOut, Search, Radio, UserPlus, Phone, Mail,
  GraduationCap, Briefcase, Video, PhoneCall, ChevronRight
} from 'lucide-react';
import RouteMap from '../RouteMap';
import { MOCK_ROUTE_STOPS } from '../../services/mockData';

export default function AshaWorkerManagementPage({
  onNavigateToTab,
  onLogout
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVillage, setFilterVillage] = useState('All Villages');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterPerformance, setFilterPerformance] = useState('All Performance');
  const [filterExperience, setFilterExperience] = useState('All Experience');
  const [sortBy, setSortBy] = useState('Efficiency');
  const [selectedWorkerProfile, setSelectedWorkerProfile] = useState('ASHA001');

  const workersList = [
    {
      id: 'ASHA001',
      name: 'Lakshmi Devi',
      village: 'Habsiguda',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
      visitsToday: '18 / 24',
      efficiency: '97%',
      aiScore: '97/100',
      location: '0.8 km from next patient',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      battery: 82,
      network: 'Good',
      isLive: true,
      experience: 'Experienced',
      age: '32 Years',
      gender: 'Female',
      joiningDate: '12 Jan 2018',
      qualification: 'Intermediate',
      address: 'Habsiguda, Ramanthapur',
      emergencyContact: 'Ramesh (Son) +91 99876 54321',
      phone: '+91 98765 43210',
      assignedVillages: 'Habsiguda, Lakshmipur',
      totalPatients: 248,
      highRiskPatients: 18,
      specialization: 'Maternal & Child Health'
    },
    {
      id: 'ASHA002',
      name: 'Sita Devi',
      village: 'Pedda Thimmapur',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
      visitsToday: '14 / 20',
      efficiency: '92%',
      aiScore: '92/100',
      location: '1.2 km from next patient',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      battery: 76,
      network: 'Good',
      isLive: true,
      experience: 'Experienced'
    },
    {
      id: 'ASHA003',
      name: 'Anitha Reddy',
      village: 'Nandigama',
      status: 'Busy',
      statusColor: 'bg-amber-100 text-amber-800',
      visitsToday: '12 / 22',
      efficiency: '85%',
      aiScore: '85/100',
      location: '1.5 km from next patient',
      photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      battery: 68,
      network: 'Good',
      isLive: true,
      experience: 'Experience'
    },
    {
      id: 'ASHA004',
      name: 'Meena Kumari',
      village: 'Uppal',
      status: 'Offline',
      statusColor: 'bg-slate-100 text-slate-600',
      visitsToday: '6 / 18',
      efficiency: '60%',
      aiScore: '60/100',
      location: 'Last Seen 2 hours ago',
      photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80',
      battery: 0,
      network: 'Offline',
      isLive: false,
      experience: 'Experience'
    }
  ];

  const activeWorker = workersList.find(w => w.id === selectedWorkerProfile) || workersList[0];

  return (
    <div className="flex min-h-screen bg-[#f8f9fe] text-slate-900 font-sans">
      {/* 1. LEFT SIDEBAR (PHC Ramanthapur) */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-6">
          {/* Logo */}
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
            <button onClick={() => onNavigateToTab && onNavigateToTab('workers')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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

        {/* Medical Officer Footer */}
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
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">ASHA Worker Management</h2>
              <p className="text-xs text-slate-500 font-medium">Monitor, support and empower your ASHA workforce</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-2xl bg-purple-50 border border-purple-200 text-[#6c47ff] font-extrabold text-xs flex items-center gap-1.5 hover:bg-purple-100 transition-all">
              <Send className="w-4 h-4" /> Send Broadcast
            </button>

            <button className="relative p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-600 text-white font-bold text-[9px] flex items-center justify-center">5</span>
            </button>

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
                <span className="text-[11px] font-semibold text-slate-400 block">Total Workers</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">36</span>
                <span className="text-[10px] font-bold text-slate-400">All ASHA Workers</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Active Today</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">28</span>
                <span className="text-[10px] font-bold text-emerald-600">77% of total</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">On Leave</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">3</span>
                <span className="text-[10px] font-bold text-amber-600">8% of total</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Offline</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">5</span>
                <span className="text-[10px] font-bold text-red-600">15% of total</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Avg Efficiency</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">92%</span>
                <span className="text-[10px] font-bold text-blue-600">+6% this week</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Tasks Completed</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">412</span>
                <span className="text-[10px] font-bold text-slate-400">Today</span>
              </div>
            </div>
          </div>

          {/* ROW 2: Search, Filters & Add Worker Bar */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
              <div className="relative w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search worker by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                />
              </div>

              <select
                value={filterVillage}
                onChange={(e) => setFilterVillage(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]"
              >
                <option value="All Villages">All Villages</option>
                <option value="Habsiguda">Habsiguda</option>
                <option value="Pedda Thimmapur">Pedda Thimmapur</option>
                <option value="Nandigama">Nandigama</option>
                <option value="Uppal">Uppal</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]"
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Busy">Busy</option>
                <option value="Offline">Offline</option>
              </select>

              <select
                value={filterPerformance}
                onChange={(e) => setFilterPerformance(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]"
              >
                <option value="All Performance">All Performance</option>
                <option value="Top Performing">Top Performing (&gt;90%)</option>
                <option value="Average">Average (70-90%)</option>
                <option value="Needs Improvement">Needs Improvement (&lt;70%)</option>
              </select>

              <select
                value={filterExperience}
                onChange={(e) => setFilterExperience(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]"
              >
                <option value="All Experience">All Experience</option>
                <option value="&gt; 5 Years">&gt; 5 Years</option>
                <option value="1 - 5 Years">1 - 5 Years</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#6c47ff]"
              >
                <option value="Efficiency">Sort By: Efficiency</option>
                <option value="Visits Today">Sort By: Visits Today</option>
                <option value="Alphabetical">Sort By: Name</option>
              </select>
            </div>

            <button
              onClick={() => alert("Add New ASHA Worker Modal Launched")}
              className="px-5 py-2 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Worker
            </button>
          </div>

          {/* ROW 3: Middle Section (Worker Cards Grid + Right Profile Slide-Over Panel) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Grid (4 Worker Cards - 8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {workersList.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorkerProfile(w.id)}
                  className={`bg-white rounded-3xl border p-5 shadow-xs flex flex-col justify-between space-y-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedWorkerProfile === w.id ? 'border-[#6c47ff] ring-2 ring-purple-200' : 'border-slate-200/80'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img src={w.photoUrl} alt={w.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-100" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-slate-900 text-sm">{w.name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${w.statusColor}`}>
                              ● {w.status}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono block">ASHA ID: {w.id}</span>
                          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-purple-600" /> {w.village}
                          </span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold text-[9px]">
                        {w.experience || 'Experience'}
                      </span>
                    </div>

                    {/* 3 Metric Pills */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-2xl bg-slate-50">
                        <span className="text-[9px] font-bold text-slate-400 block">Visits Today</span>
                        <strong className="text-slate-900 font-black block">{w.visitsToday}</strong>
                      </div>
                      <div className="p-2 rounded-2xl bg-slate-50">
                        <span className="text-[9px] font-bold text-slate-400 block">Efficiency</span>
                        <strong className="text-emerald-600 font-black block">{w.efficiency}</strong>
                      </div>
                      <div className="p-2 rounded-2xl bg-slate-50">
                        <span className="text-[9px] font-bold text-slate-400 block">AI Score</span>
                        <strong className="text-purple-600 font-black block">{w.aiScore}</strong>
                      </div>
                    </div>

                    {/* Location & Map snippet */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                        <span>Current Location</span>
                        {w.isLive ? (
                          <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                          </span>
                        ) : (
                          <span className="text-slate-400">Offline</span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-slate-800 block">{w.location}</span>

                      {/* Map preview snippet */}
                      <div className="h-20 rounded-xl overflow-hidden relative">
                        <RouteMap stops={MOCK_ROUTE_STOPS.slice(0, 2)} workerLocation={{ latitude: 17.3990, longitude: 78.5410 }} />
                      </div>
                    </div>

                    {/* Battery & Network */}
                    <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-500 pt-1">
                      <span className="flex items-center gap-1"><Battery className="w-3.5 h-3.5 text-emerald-600" /> {w.battery > 0 ? `${w.battery}% Battery` : '--'}</span>
                      <span className="flex items-center gap-1"><Wifi className="w-3.5 h-3.5 text-blue-600" /> {w.network} Network</span>
                    </div>
                  </div>

                  {/* Card Buttons */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] font-bold">
                    <button onClick={() => setSelectedWorkerProfile(w.id)} className="py-1.5 rounded-xl border border-purple-200 text-[#6c47ff] hover:bg-purple-50 transition-all text-center">
                      View Profile
                    </button>
                    {w.isLive && (
                      <button onClick={() => onNavigateToTab && onNavigateToTab('routes')} className="py-1.5 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-all text-center">
                        Track Live
                      </button>
                    )}
                    <button onClick={() => onNavigateToTab && onNavigateToTab('messaging')} className={`py-1.5 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 transition-all text-center ${!w.isLive ? 'col-span-2' : ''}`}>
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Slide-Over / Profile Details Panel (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <img src={activeWorker.photoUrl} alt={activeWorker.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-200" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-slate-900 text-base">{activeWorker.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${activeWorker.statusColor}`}>
                          {activeWorker.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block">ASHA ID: {activeWorker.id}</span>
                      <span className="text-[11px] text-slate-600 font-semibold">{activeWorker.phone || '+91 98765 43210'}</span>
                    </div>
                  </div>
                  <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center justify-between border-b border-slate-200 text-xs font-bold">
                  <button className="pb-2 border-b-2 border-[#6c47ff] text-[#6c47ff]">Overview</button>
                  <button className="pb-2 text-slate-400 hover:text-slate-700">Performance</button>
                  <button className="pb-2 text-slate-400 hover:text-slate-700">Activity</button>
                  <button className="pb-2 text-slate-400 hover:text-slate-700">Documents</button>
                </div>

                {/* Personal Details */}
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Personal Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-2xl">
                    <div><span className="text-slate-400 block font-bold">Age</span><strong>{activeWorker.age || '32 Years'}</strong></div>
                    <div><span className="text-slate-400 block font-bold">Gender</span><strong>{activeWorker.gender || 'Female'}</strong></div>
                    <div><span className="text-slate-400 block font-bold">Joining Date</span><strong>{activeWorker.joiningDate || '12 Jan 2018'}</strong></div>
                    <div><span className="text-slate-400 block font-bold">Qualification</span><strong>{activeWorker.qualification || 'Intermediate'}</strong></div>
                    <div className="col-span-2"><span className="text-slate-400 block font-bold">Address</span><strong>{activeWorker.address || 'Habsiguda, Ramanthapur'}</strong></div>
                    <div className="col-span-2"><span className="text-slate-400 block font-bold">Emergency Contact</span><strong>{activeWorker.emergencyContact || 'Ramesh (Son) +91 99876 54321'}</strong></div>
                  </div>
                </div>

                {/* Work Information */}
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Work Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-2xl">
                    <div><span className="text-slate-400 block font-bold">Assigned Villages</span><strong>{activeWorker.assignedVillages || 'Habsiguda, Lakshmipur'}</strong></div>
                    <div><span className="text-slate-400 block font-bold">Total Patients</span><strong>{activeWorker.totalPatients || 248}</strong></div>
                    <div><span className="text-slate-400 block font-bold">High Risk Patients</span><strong>{activeWorker.highRiskPatients || 18}</strong></div>
                    <div><span className="text-slate-400 block font-bold">Specialization</span><strong>{activeWorker.specialization || 'Maternal & Child Health'}</strong></div>
                  </div>
                </div>

                {/* AI Performance Summary */}
                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2">
                  <h4 className="font-extrabold text-purple-950 text-xs uppercase tracking-wider">AI Performance Summary</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center text-emerald-600 font-black text-sm shadow-xs">
                        97<span className="text-[8px] font-normal text-slate-400">/100</span>
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 text-xs block">Excellent</span>
                        <span className="text-[10px] text-emerald-600 font-bold">Trend ↑ +6%</span>
                      </div>
                    </div>
                    <div className="text-right text-[10px] font-bold">
                      <span className="text-slate-400 block">Rank in PHC</span>
                      <strong className="text-purple-600 text-sm font-black">1 <span className="text-[9px] font-normal text-slate-400">/ 36</span></strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 font-semibold text-slate-600">
                    <div>Consistency: <strong className="text-slate-900">96%</strong></div>
                    <div>Quality Score: <strong className="text-slate-900">94%</strong></div>
                  </div>
                </div>

                {/* Recent Activity Timeline */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Recent Activity</h4>
                  <div className="relative pl-5 space-y-2 text-[11px] font-semibold border-l-2 border-slate-100">
                    <div className="relative">
                      <span className="absolute -left-[27px] top-0.5 w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-slate-400 font-mono text-[9px] mr-2">10:46 AM</span>
                      <span className="text-slate-900 font-bold">Visit completed - Saraswati Devi</span>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[27px] top-0.5 w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-slate-400 font-mono text-[9px] mr-2">10:35 AM</span>
                      <span className="text-slate-800">Medicine distributed</span>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[27px] top-0.5 w-3 h-3 rounded-full bg-purple-600" />
                      <span className="text-slate-400 font-mono text-[9px] mr-2">10:28 AM</span>
                      <span className="text-slate-800">Navigation started</span>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[27px] top-0.5 w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-slate-400 font-mono text-[9px] mr-2">10:20 AM</span>
                      <span className="text-slate-800">Vitals recorded</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-2xl border border-purple-200 text-[#6c47ff] hover:bg-purple-50 font-extrabold text-xs transition-all text-center">
                View Full Profile →
              </button>
            </div>
          </div>

          {/* ROW 4: AI Insights, Workload Overview, Live Worker Locations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* AI Insights & Recommendations (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Sparkles className="w-4 h-4 text-purple-600 fill-current" />
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">AI Insights & Recommendations</h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  {/* Insight 1 */}
                  <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-600">⭐</span>
                      <div>
                        <h4 className="font-extrabold text-purple-950 text-xs">Lakshmi Devi is likely to finish 45 minutes early.</h4>
                        <p className="text-[10px] text-slate-500">Recommend assigning 2 additional medium-priority patients nearby.</p>
                        <span className="text-[9px] font-bold text-purple-600">Confidence: 96%</span>
                      </div>
                    </div>
                    <button onClick={() => alert("Assigned 2 nearby patients to Lakshmi Devi!")} className="w-full py-1.5 rounded-xl bg-[#6c47ff] text-white font-extrabold text-[11px] hover:bg-purple-700 transition-all">
                      Assign Now
                    </button>
                  </div>

                  {/* Insight 2 */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500">⚙️</span>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs">Sita Devi has high travel time.</h4>
                        <p className="text-[10px] text-slate-500">Consider re-optimizing route for better efficiency.</p>
                        <span className="text-[9px] font-bold text-slate-400">Confidence: 88%</span>
                      </div>
                    </div>
                    <button onClick={() => alert("Route re-optimized for Sita Devi!")} className="w-full py-1.5 rounded-xl border border-purple-200 text-[#6c47ff] font-extrabold text-[11px] hover:bg-purple-50 transition-all">
                      Re-optimize
                    </button>
                  </div>

                  {/* Insight 3 */}
                  <div className="p-3 rounded-2xl bg-red-50/60 border border-red-100 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-red-500">⚠️</span>
                      <div>
                        <h4 className="font-extrabold text-red-900 text-xs">Meena Kumari has not synced data for 2 hours.</h4>
                        <p className="text-[10px] text-slate-500">Please check connectivity or contact the worker.</p>
                        <span className="text-[9px] font-bold text-red-600">Confidence: 90%</span>
                      </div>
                    </div>
                    <button onClick={() => alert("Contacting Meena Kumari...")} className="w-full py-1.5 rounded-xl border border-red-200 text-red-600 font-extrabold text-[11px] hover:bg-red-50 transition-all">
                      Contact
                    </button>
                  </div>
                </div>
              </div>

              <button className="text-xs text-[#6c47ff] font-bold hover:underline text-center pt-2">
                View All AI Insights →
              </button>
            </div>

            {/* Workload Overview (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Workload Overview</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Full Report →</button>
                </div>

                <div className="flex items-center justify-around my-2">
                  {/* Donut Chart */}
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="22, 100" strokeDashoffset="0" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="44, 100" strokeDashoffset="-22" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="34, 100" strokeDashoffset="-66" strokeLinecap="round" />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-base font-black text-slate-900 block leading-tight">36</span>
                      <span className="text-[8px] font-bold text-slate-400">Workers</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs font-semibold">
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> High (&gt; 25 visits): <strong>8 (22%)</strong></div>
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium (15 - 25 visits): <strong>16 (44%)</strong></div>
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low (&lt; 15 visits): <strong>12 (34%)</strong></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="p-2 rounded-2xl bg-red-50 border border-red-100">
                    <span className="text-[9px] font-bold text-red-600 block">Overloaded</span>
                    <strong className="text-slate-900 font-black">3 Workers</strong>
                  </div>
                  <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <span className="text-[9px] font-bold text-emerald-600 block">Optimal</span>
                    <strong className="text-slate-900 font-black">23 Workers</strong>
                  </div>
                  <div className="p-2 rounded-2xl bg-blue-50 border border-blue-100">
                    <span className="text-[9px] font-bold text-blue-600 block">Underloaded</span>
                    <strong className="text-slate-900 font-black">10 Workers</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Worker Locations (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Live Worker Locations</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Full Map →</button>
                </div>

                <div className="h-44 rounded-2xl overflow-hidden relative">
                  <RouteMap stops={MOCK_ROUTE_STOPS} workerLocation={{ latitude: 17.3990, longitude: 78.5410 }} />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 pt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Active</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Busy</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400" /> Offline</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600" /> Emergency</span>
              </div>
            </div>
          </div>

          {/* ROW 5: Performance Analytics, Training & Development, Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Performance Analytics (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Performance Analytics</h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">Visits Trend</span>
                  <div className="flex items-baseline gap-2">
                    <strong className="text-slate-900 font-black text-lg">412</strong>
                    <span className="text-[10px] font-extrabold text-emerald-600">↑ 12%</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">Efficiency Trend</span>
                  <div className="flex items-baseline gap-2">
                    <strong className="text-slate-900 font-black text-lg">92%</strong>
                    <span className="text-[10px] font-extrabold text-emerald-600">↑ 6%</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">Patient Satisfaction</span>
                  <div className="flex items-baseline gap-2">
                    <strong className="text-slate-900 font-black text-lg">4.6/5</strong>
                    <span className="text-[10px] font-extrabold text-emerald-600">↑ 5%</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">Avg Response Time</span>
                  <div className="flex items-baseline gap-2">
                    <strong className="text-slate-900 font-black text-lg">18 min</strong>
                    <span className="text-[10px] font-extrabold text-emerald-600">↓ 8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Training & Development (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Training & Development</h3>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-[#6c47ff]" />
                      <div>
                        <h4 className="font-extrabold text-purple-950 text-xs">Upcoming Training: Maternal Health Care</h4>
                        <span className="text-[10px] text-slate-500 font-medium">28 May 2026</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">12 Registered</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <h4 className="font-extrabold text-emerald-950 text-xs">Completed: Nutrition & Counselling</h4>
                        <span className="text-[10px] text-slate-500 font-medium">Completed on 12 May 2026</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">23 Workers</span>
                  </div>
                </div>
              </div>

              <button className="text-xs text-[#6c47ff] font-bold hover:underline text-center">
                View All Trainings →
              </button>
            </div>

            {/* Quick Actions (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Quick Actions</h3>

              <div className="grid grid-cols-3 gap-2 text-[11px] font-bold text-slate-700 text-center">
                <button onClick={() => alert("Assign New Patient")} className="p-3 rounded-2xl bg-slate-50 hover:bg-purple-50 hover:text-[#6c47ff] transition-all flex flex-col items-center gap-1.5 border border-slate-200/60">
                  <UserPlus className="w-4 h-4 text-purple-600" />
                  <span>Assign New Patient</span>
                </button>

                <button onClick={() => alert("Share Route")} className="p-3 rounded-2xl bg-slate-50 hover:bg-purple-50 hover:text-[#6c47ff] transition-all flex flex-col items-center gap-1.5 border border-slate-200/60">
                  <Share2 className="w-4 h-4 text-blue-600" />
                  <span>Share Route</span>
                </button>

                <button onClick={() => alert("Schedule Meeting")} className="p-3 rounded-2xl bg-slate-50 hover:bg-purple-50 hover:text-[#6c47ff] transition-all flex flex-col items-center gap-1.5 border border-slate-200/60">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Schedule Meeting</span>
                </button>

                <button onClick={() => alert("Downloading ASHA Workforce Report...")} className="p-3 rounded-2xl bg-slate-50 hover:bg-purple-50 hover:text-[#6c47ff] transition-all flex flex-col items-center gap-1.5 border border-slate-200/60">
                  <Download className="w-4 h-4 text-amber-600" />
                  <span>Download Report</span>
                </button>

                <button onClick={() => alert("Initiating Voice Broadcast to all ASHA Workers...")} className="p-3 rounded-2xl bg-slate-50 hover:bg-purple-50 hover:text-[#6c47ff] transition-all flex flex-col items-center gap-1.5 border border-slate-200/60">
                  <PhoneCall className="w-4 h-4 text-purple-600" />
                  <span>Call All Workers</span>
                </button>

                <button onClick={() => alert("Starting Group Video Conference...")} className="p-3 rounded-2xl bg-slate-50 hover:bg-purple-50 hover:text-[#6c47ff] transition-all flex flex-col items-center gap-1.5 border border-slate-200/60">
                  <Video className="w-4 h-4 text-red-500" />
                  <span>Video Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
