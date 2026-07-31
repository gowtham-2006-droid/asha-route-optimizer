import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, Search, Download, ChevronLeft,
  ChevronRight, MoreVertical, HeartPulse, Navigation, CheckCircle2,
  Activity, Baby, Syringe, Sparkles, Filter, ChevronDown, LayoutList, LayoutGrid,
  BarChart3, UserCheck, LogOut
} from 'lucide-react';

export default function PatientsPage({
  patients,
  currentUser,
  onUpdatePatient,
  onSelectPatient,
  onRegisterNewPatient,
  onBatchImport,
  onTriggerEmergency,
  onNavigateToTab,
  onLogout
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVillage, setFilterVillage] = useState('All Villages');
  const [filterRisk, setFilterRisk] = useState('All Risk Levels');
  const [filterVisitType, setFilterVisitType] = useState('All Types');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);

  const mockPatientsList = [
    { id: 'P-10245', name: 'Saraswati Devi', age: 68, gender: 'Female', village: 'Ramanthapur', risk_score: 87, risk_band: 'High Risk', visit_type: 'Regular Check-up', last_visit: '2 days ago', last_date: '12 Jun 2024', status: 'Pending' },
    { id: 'P-10244', name: 'Anitha Reddy', age: 32, gender: 'Female', village: 'Ramanthapur', risk_score: 62, risk_band: 'Medium Risk', visit_type: 'ANC Check-up', last_visit: '5 days ago', last_date: '09 Jun 2024', status: 'Pending' },
    { id: 'P-10243', name: 'Ramesh Kumar', age: 57, gender: 'Male', village: 'Habsiguda', risk_score: 45, risk_band: 'Low Risk', visit_type: 'Regular Check-up', last_visit: '1 week ago', last_date: '05 Jun 2024', status: 'Completed' },
    { id: 'P-10242', name: 'Meena Kumari', age: 29, gender: 'Female', village: 'Uppal', risk_score: 79, risk_band: 'High Risk', visit_type: 'ANC Follow-up', last_visit: '3 days ago', last_date: '11 Jun 2024', status: 'Pending' },
    { id: 'P-10241', name: 'Suresh Babu', age: 12, gender: 'Male', village: 'Nagole', risk_score: 30, risk_band: 'Low Risk', visit_type: 'Immunization', last_visit: '2 weeks ago', last_date: '01 Jun 2024', status: 'Pending' },
    { id: 'P-10240', name: 'Krishna Rao', age: 72, gender: 'Male', village: 'Ramanthapur', risk_score: 85, risk_band: 'High Risk', visit_type: 'Regular Check-up', last_visit: '4 days ago', last_date: '10 Jun 2024', status: 'Pending' },
    { id: 'P-10239', name: 'Laxmi Bai', age: 45, gender: 'Female', village: 'Habsiguda', risk_score: 55, risk_band: 'Medium Risk', visit_type: 'Follow-up', last_visit: '6 days ago', last_date: '08 Jun 2024', status: 'Completed' },
  ];

  const getVisitTypeStyle = (type) => {
    switch (type) {
      case 'ANC Check-up':
        return 'bg-emerald-100 text-emerald-800 font-bold';
      case 'ANC Follow-up':
        return 'bg-amber-100 text-amber-800 font-bold';
      case 'Immunization':
        return 'bg-blue-100 text-blue-800 font-bold';
      case 'Follow-up':
        return 'bg-teal-100 text-teal-800 font-bold';
      default:
        return 'bg-purple-100 text-purple-800 font-bold';
    }
  };

  const getRiskStyle = (band) => {
    if (band.includes('High')) return 'bg-red-100 text-red-700 font-extrabold';
    if (band.includes('Medium')) return 'bg-amber-100 text-amber-800 font-extrabold';
    return 'bg-emerald-100 text-emerald-800 font-extrabold';
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
            <button onClick={() => onNavigateToTab('patients')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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

        {/* Bottom AI Promo Box ("AI Assistant") */}
        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-900 block">AI Assistant</span>
            <p className="text-[11px] text-slate-500 leading-snug">Get health insights and suggestions for better care.</p>
          </div>
          <button className="w-full py-2 rounded-xl bg-white border border-purple-200 text-[#6c47ff] font-extrabold text-xs shadow-xs hover:bg-purple-50 transition-all">
            Ask AI &gt;
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Patients</h2>
            <p className="text-xs text-slate-500">Manage and track all patients in your catchment area</p>
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

        {/* Patients Content Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* 3. TOP KPI METRICS GRID (5 White Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Card 1: Total Patients */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Total Patients</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">248</span>
                <span className="text-[10px] font-bold text-emerald-600">+12 this month</span>
              </div>
            </div>

            {/* Card 2: High Risk Patients */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">High Risk Patients</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">32</span>
                <span className="text-[10px] font-bold text-red-600">12.9% of total</span>
              </div>
            </div>

            {/* Card 3: Pregnant Women */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Baby className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Pregnant Women</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">28</span>
                <span className="text-[10px] font-bold text-amber-600">11.3% of total</span>
              </div>
            </div>

            {/* Card 4: Vaccination Due */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Syringe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Vaccination Due</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">46</span>
                <span className="text-[10px] font-bold text-emerald-600">18.5% of total</span>
              </div>
            </div>

            {/* Card 5: Visits Completed */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Visits Completed</span>
                <span className="text-xl font-black text-slate-900 block leading-tight">156</span>
                <span className="text-[10px] font-bold text-blue-600">This month</span>
              </div>
            </div>
          </div>

          {/* 4. SEARCH, FILTERS & ACTION BUTTONS */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="w-full md:w-96 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search patients by name, ID or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => {
                    const csvContent = 'Patient ID,Name,Age,Gender,Village,Risk Score,Visit Type,Status\n' + 
                      mockPatientsList.map(p => `${p.id},${p.name},${p.age},${p.gender},${p.village},${p.risk_score},${p.visit_type},${p.status}`).join('\n');
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'patients_export.csv';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Download className="w-4 h-4 text-purple-600" /> Export
                </button>

                <button
                  onClick={onRegisterNewPatient}
                  className="px-5 py-2 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Patient
                </button>
              </div>
            </div>

            {/* Filter Dropdowns Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Village</label>
                <select
                  value={filterVillage}
                  onChange={(e) => setFilterVillage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 text-xs font-semibold focus:outline-none focus:border-[#6c47ff]"
                >
                  <option value="All Villages">All Villages</option>
                  <option value="Ramanthapur">Ramanthapur</option>
                  <option value="Habsiguda">Habsiguda</option>
                  <option value="Uppal">Uppal</option>
                  <option value="Nagole">Nagole</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Risk Level</label>
                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 text-xs font-semibold focus:outline-none focus:border-[#6c47ff]"
                >
                  <option value="All Risk Levels">All Risk Levels</option>
                  <option value="High Risk">High Risk</option>
                  <option value="Medium Risk">Medium Risk</option>
                  <option value="Low Risk">Low Risk</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Visit Type</label>
                <select
                  value={filterVisitType}
                  onChange={(e) => setFilterVisitType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 text-xs font-semibold focus:outline-none focus:border-[#6c47ff]"
                >
                  <option value="All Types">All Types</option>
                  <option value="ANC Check-up">ANC Check-up</option>
                  <option value="ANC Follow-up">ANC Follow-up</option>
                  <option value="Immunization">Immunization</option>
                  <option value="Regular Check-up">Regular Check-up</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 text-xs font-semibold focus:outline-none focus:border-[#6c47ff]"
                >
                  <option value="All Status">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* 5. MAIN PATIENTS TABLE CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Table Header Controls */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4">
              <h3 className="font-bold text-slate-900 text-sm">All Patients (248)</h3>

              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-slate-500 font-medium">Sort by:</span>
                  <select className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-800 font-bold">
                    <option>Recently Added</option>
                    <option>Risk Score High-Low</option>
                    <option>Alphabetical</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => setViewMode('list')} className={`p-1 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-xs text-[#6c47ff]' : 'text-slate-500'}`}>
                    <LayoutList className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('grid')} className={`p-1 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-xs text-[#6c47ff]' : 'text-slate-500'}`}>
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 text-[10px]">
                  <tr>
                    <th className="p-4 w-8"><input type="checkbox" className="rounded border-slate-300" /></th>
                    <th className="p-4">Patient</th>
                    <th className="p-4">Age / Gender</th>
                    <th className="p-4">Village</th>
                    <th className="p-4">Risk Score ↕</th>
                    <th className="p-4">Visit Type</th>
                    <th className="p-4">Last Visit</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockPatientsList.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4"><input type="checkbox" className="rounded border-slate-300" /></td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center shrink-0 border border-purple-200">
                            {p.name.split(' ').map(n=>n[0]).join('')}
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-900 text-xs block">{p.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {p.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-semibold text-slate-800">{p.age} / {p.gender}</td>

                      <td className="p-4 font-semibold text-slate-800">{p.village}</td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-xs">{p.risk_score}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] ${getRiskStyle(p.risk_band)}`}>
                            {p.risk_band}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-xl text-[10px] ${getVisitTypeStyle(p.visit_type)}`}>
                          {p.visit_type}
                        </span>
                      </td>

                      <td className="p-4">
                        <div>
                          <span className="font-semibold text-slate-800 block">{p.last_visit}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{p.last_date}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.status}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 6. BOTTOM PAGINATION BAR */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <span className="text-slate-500 font-medium">Showing 1 to 10 of 248 patients</span>

              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
                <button className="px-3 py-1 rounded-xl bg-[#6c47ff] text-white font-bold">1</button>
                <button className="px-3 py-1 rounded-xl hover:bg-slate-100 font-bold text-slate-600">2</button>
                <button className="px-3 py-1 rounded-xl hover:bg-slate-100 font-bold text-slate-600">3</button>
                <span className="px-1 text-slate-400">...</span>
                <button className="px-3 py-1 rounded-xl hover:bg-slate-100 font-bold text-slate-600">25</button>
                <button className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"><ChevronRight className="w-4 h-4" /></button>
              </div>

              <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-slate-800 font-bold">
                <option>10 per page</option>
                <option>25 per page</option>
                <option>50 per page</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
