import React, { useState } from 'react';
import {
  Building2, Home, Users, UserCheck, MapPin, Navigation, AlertOctagon,
  FileText, Folder, BarChart3, Share2, MessageSquare, Settings, Bell,
  Calendar, ChevronDown, ArrowRight, ShieldCheck, CheckCircle2, Clock,
  Activity, Sparkles, AlertTriangle, Battery, Wifi, Check, X, RefreshCw,
  Award, TrendingUp, TrendingDown, FileSpreadsheet, Download, Send, Menu,
  Plus, MoreVertical, LogOut, Search, ChevronLeft, ChevronRight, Filter,
  Sliders, Lock, Shield, Cpu, SlidersHorizontal, User
} from 'lucide-react';

export default function PhcSettingsPage({
  onNavigateToTab,
  onLogout
}) {
  const [activeSubTab, setActiveSubTab] = useState('General');
  const [phcName, setPhcName] = useState('PHC Ramanthapur');
  const [medicalOfficer, setMedicalOfficer] = useState('Dr. Ramesh Kumar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [helpline, setHelpline] = useState('108');

  // AI & Route Optimization Settings
  const [distanceWeight, setDistanceWeight] = useState(40);
  const [riskWeight, setRiskWeight] = useState(60);
  const [autoReroute, setAutoReroute] = useState(true);
  const [solverTimeout, setSolverTimeout] = useState('10');

  // Notification Toggles
  const [notifyEmergency, setNotifyEmergency] = useState(true);
  const [notifyDelays, setNotifyDelays] = useState(true);
  const [notifyLowStock, setNotifyLowStock] = useState(true);
  const [notifyEodReport, setNotifyEodReport] = useState(false);

  const handleSaveSettings = () => {
    alert("Settings updated and saved successfully!");
  };

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
            <button onClick={() => onNavigateToTab && onNavigateToTab('settings')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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
            <p className="text-[11px] text-slate-500 leading-snug">Ask anything about platform settings</p>
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
                <Settings className="w-5 h-5 text-[#6c47ff]" /> System Settings & Configuration
              </h2>
              <p className="text-xs text-slate-500 font-medium">Manage PHC profile, AI route optimization parameters, notifications and security</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
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
          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            {['General', 'AI & Optimization', 'Notifications', 'Security & Access'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all shrink-0 ${
                  activeSubTab === tab
                    ? 'bg-[#6c47ff] text-white shadow-md shadow-purple-600/25'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB 1: GENERAL SETTINGS */}
          {activeSubTab === 'General' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6 max-w-3xl">
              <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">PHC Facility Details</h3>

              <div className="space-y-4 text-xs font-semibold text-slate-700">
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold block">Facility Name</label>
                  <input
                    type="text"
                    value={phcName}
                    onChange={(e) => setPhcName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-bold block">Medical Officer-in-Charge</label>
                  <input
                    type="text"
                    value={medicalOfficer}
                    onChange={(e) => setMedicalOfficer(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold block">Contact Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold block">Emergency Helpline</label>
                    <input
                      type="text"
                      value={helpline}
                      onChange={(e) => setHelpline(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button onClick={handleSaveSettings} className="px-6 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: AI & OPTIMIZATION SETTINGS */}
          {activeSubTab === 'AI & Optimization' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6 max-w-3xl">
              <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">Google OR-Tools & Machine Learning Controls</h3>

              <div className="space-y-5 text-xs font-semibold text-slate-700">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-slate-900 font-extrabold">Distance Weight vs. Patient Risk Weight</label>
                    <span className="text-[#6c47ff] font-bold">Distance: {distanceWeight}% | Risk: {riskWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={distanceWeight}
                    onChange={(e) => {
                      setDistanceWeight(Number(e.target.value));
                      setRiskWeight(100 - Number(e.target.value));
                    }}
                    className="w-full accent-[#6c47ff]"
                  />
                  <p className="text-[11px] text-slate-400 font-normal">Higher risk weight prioritizes visiting critical high-risk patients earlier in the route.</p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">Automatic Dynamic Re-routing</h4>
                    <p className="text-[11px] text-slate-500 font-normal">Automatically re-orders ASHA worker stops when a high-risk emergency is triggered.</p>
                  </div>
                  <button
                    onClick={() => setAutoReroute(!autoReroute)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${autoReroute ? 'bg-[#6c47ff]' : 'bg-slate-300'}`}
                  >
                    <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${autoReroute ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-bold block">OR-Tools Solver Execution Timeout (seconds)</label>
                  <select
                    value={solverTimeout}
                    onChange={(e) => setSolverTimeout(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                  >
                    <option value="5">5 Seconds (Fast)</option>
                    <option value="10">10 Seconds (Recommended)</option>
                    <option value="30">30 Seconds (Exhaustive Optimization)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button onClick={handleSaveSettings} className="px-6 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeSubTab === 'Notifications' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6 max-w-3xl">
              <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">Real-Time Alerts & Email Notifications</h3>

              <div className="space-y-3 text-xs font-semibold text-slate-700">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">Emergency Alerts</h4>
                    <p className="text-[11px] text-slate-500">Receive instant push notifications for critical patient emergencies.</p>
                  </div>
                  <input type="checkbox" checked={notifyEmergency} onChange={(e)=>setNotifyEmergency(e.target.checked)} className="w-4 h-4 accent-[#6c47ff]" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">ASHA Route Delay Alerts</h4>
                    <p className="text-[11px] text-slate-500">Notify supervisor when a field worker is delayed by &gt;30 minutes.</p>
                  </div>
                  <input type="checkbox" checked={notifyDelays} onChange={(e)=>setNotifyDelays(e.target.checked)} className="w-4 h-4 accent-[#6c47ff]" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">Low Supply & Stock Alerts</h4>
                    <p className="text-[11px] text-slate-500">Notify when medicines or vaccines drop below minimum stock level.</p>
                  </div>
                  <input type="checkbox" checked={notifyLowStock} onChange={(e)=>setNotifyLowStock(e.target.checked)} className="w-4 h-4 accent-[#6c47ff]" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button onClick={handleSaveSettings} className="px-6 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & ACCESS */}
          {activeSubTab === 'Security & Access' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6 max-w-3xl">
              <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">Security, Session & Log Out</h3>

              <div className="space-y-4 text-xs font-semibold text-slate-700">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">Current Session Role</h4>
                    <p className="text-[11px] text-slate-500">Logged in as Medical Officer (Dr. Ramesh Kumar)</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-[#6c47ff] font-extrabold text-[10px]">Active Session</span>
                </div>

                {/* Log Out Box */}
                <div className="p-4 rounded-2xl bg-red-50/60 border border-red-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-red-900 text-xs">Log Out of Command Center</h4>
                    <p className="text-[11px] text-slate-500">Sign out and clear session state from this browser.</p>
                  </div>
                  <button onClick={onLogout} className="px-4 py-2 rounded-xl bg-red-600 text-white font-extrabold text-xs shadow-md shadow-red-600/30 hover:bg-red-700 transition-all flex items-center gap-1.5">
                    <LogOut className="w-3.5 h-3.5" /> Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
