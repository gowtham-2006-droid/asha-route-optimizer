import React, { useState } from 'react';
import {
  Building2, Home, Users, UserCheck, MapPin, Navigation, AlertOctagon,
  FileText, Folder, BarChart3, Share2, MessageSquare, Settings, Bell,
  Calendar, ChevronDown, ArrowRight, ShieldCheck, CheckCircle2, Clock,
  Activity, Sparkles, AlertTriangle, Battery, Wifi, Check, X, RefreshCw,
  Award, TrendingUp, TrendingDown, FileSpreadsheet, Download, Send, Menu,
  Plus, MoreVertical, LogOut, Search, ChevronLeft, ChevronRight, Filter,
  Box, Package, Truck, Pill, Stethoscope, Syringe, Building, CheckSquare
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Cell } from 'recharts';

export default function PhcResourcesPage({
  onNavigateToTab,
  onLogout
}) {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const inventoryItems = [
    { name: 'ORS Packets', category: 'Medical Supplies', stock: 12, unit: 'Packets', minStock: 50, status: 'Low Stock', statusColor: 'bg-amber-100 text-amber-800', expiry: '--', updated: '25 May 2026' },
    { name: 'Iron Tablets', category: 'Medicines', stock: 28, unit: 'Tablets', minStock: 100, status: 'Low Stock', statusColor: 'bg-amber-100 text-amber-800', expiry: '30 Jun 2026', updated: '25 May 2026' },
    { name: 'Paracetamol 500mg', category: 'Medicines', stock: 15, unit: 'Strips', minStock: 50, status: 'Low Stock', statusColor: 'bg-amber-100 text-amber-800', expiry: '15 Jul 2026', updated: '25 May 2026' },
    { name: 'Amlodipine 5mg', category: 'Medicines', stock: 35, unit: 'Tablets', minStock: 80, status: 'Low Stock', statusColor: 'bg-amber-100 text-amber-800', expiry: '10 Aug 2026', updated: '25 May 2026' },
    { name: 'TT Vaccine', category: 'Vaccines', stock: 0, unit: 'Vials', minStock: 10, status: 'Out of Stock', statusColor: 'bg-red-100 text-red-700', expiry: '--', updated: '25 May 2026' },
    { name: 'BP Monitor', category: 'Equipment', stock: 5, unit: 'Units', minStock: 3, status: 'Good Stock', statusColor: 'bg-emerald-100 text-emerald-800', expiry: '--', updated: '25 May 2026' },
    { name: 'Glucometer Strips', category: 'Medical Supplies', stock: 120, unit: 'Strips', minStock: 50, status: 'Good Stock', statusColor: 'bg-emerald-100 text-emerald-800', expiry: '20 Sep 2026', updated: '25 May 2026' },
    { name: 'Thermometer', category: 'Equipment', stock: 8, unit: 'Units', minStock: 2, status: 'Good Stock', statusColor: 'bg-emerald-100 text-emerald-800', expiry: '--', updated: '25 May 2026' },
    { name: 'PCV Vaccine', category: 'Vaccines', stock: 25, unit: 'Vials', minStock: 20, status: 'Good Stock', statusColor: 'bg-emerald-100 text-emerald-800', expiry: '12 Sep 2026', updated: '25 May 2026' },
    { name: 'Hand Sanitizer', category: 'Others', stock: 18, unit: 'Bottles', minStock: 10, status: 'Good Stock', statusColor: 'bg-emerald-100 text-emerald-800', expiry: '05 Oct 2026', updated: '25 May 2026' }
  ];

  const utilizationData = [
    { name: 'ORS Packets', val: 78, color: '#6c47ff' },
    { name: 'Iron Tablets', val: 65, color: '#3b82f6' },
    { name: 'Paracetamol', val: 52, color: '#f59e0b' },
    { name: 'TT Vaccine', val: 35, color: '#ef4444' },
    { name: 'BP Tablets', val: 61, color: '#10b981' }
  ];

  const stockTrendData = [
    { month: 'Jan 2026', ors: 170, iron: 140, para: 90 },
    { month: 'Feb 2026', ors: 145, iron: 100, para: 50 },
    { month: 'Mar 2026', ors: 130, iron: 90, para: 40 },
    { month: 'Apr 2026', ors: 120, iron: 70, para: 30 },
    { month: 'May 2026', ors: 110, iron: 65, para: 25 }
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
            <button onClick={() => onNavigateToTab && onNavigateToTab('resources')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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
            <p className="text-[11px] text-slate-500 leading-snug">Ask anything about resources or inventory</p>
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
                <Folder className="w-5 h-5 text-[#6c47ff]" /> Resources & Inventory
              </h2>
              <p className="text-xs text-slate-500 font-medium">Manage medical supplies, equipment, vehicles and facilities</p>
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
                <Box className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Total Items</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">256</span>
                <span className="text-[10px] font-bold text-slate-400">All Resources</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Low Stock Items</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">23</span>
                <span className="text-[10px] font-bold text-amber-600">Need Attention</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Out of Stock</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">6</span>
                <span className="text-[10px] font-bold text-red-600">Urgent</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Expiring Soon</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">18</span>
                <span className="text-[10px] font-bold text-amber-600">Within 30 Days</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Total Facilities</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">4</span>
                <span className="text-[10px] font-bold text-blue-600">PHC Facilities</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block">Vehicles Available</span>
                <span className="text-2xl font-black text-slate-900 block leading-tight">6 / 8</span>
                <span className="text-[10px] font-bold text-emerald-600">In Service</span>
              </div>
            </div>
          </div>

          {/* ROW 2: Inventory Overview Donut (4 cols), Stock Status by Category Stacked Bars (4 cols), Stock Alerts & Facilities (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Col 1: Inventory Overview Donut (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Inventory Overview</h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Full Report →</button>
              </div>

              <div className="flex items-center justify-around my-1">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#6c47ff" strokeWidth="4" strokeDasharray="50, 100" strokeDashoffset="0" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="30, 100" strokeDashoffset="-50" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="11, 100" strokeDashoffset="-80" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray="6, 100" strokeDashoffset="-91" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="3, 100" strokeDashoffset="-97" strokeLinecap="round" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-base font-black text-slate-900 block leading-tight">256</span>
                    <span className="text-[8px] font-bold text-slate-400">Total Items</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs font-semibold text-slate-700">
                  <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Medical Supplies</span><strong>128 (50%)</strong></div>
                  <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Medicines</span><strong>76 (30%)</strong></div>
                  <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Equipment</span><strong>28 (11%)</strong></div>
                  <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Vaccines</span><strong>16 (6%)</strong></div>
                  <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Others</span><strong>8 (3%)</strong></div>
                </div>
              </div>
            </div>

            {/* Col 2: Stock Status by Category Stacked Bars (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Stock Status by Category</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 border-b border-slate-100 pb-1">
                    <span>Category</span>
                    <div className="flex gap-4"><span>Good</span><span>Low</span><span>Out of Stock</span><span>Total</span></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-800">Medical Supplies</span>
                    <div className="flex gap-5 text-[11px] font-bold"><span className="text-emerald-600">82</span><span className="text-amber-600">10</span><span className="text-red-600">2</span><span className="text-slate-900">94</span></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-800">Medicines</span>
                    <div className="flex gap-5 text-[11px] font-bold"><span className="text-emerald-600">48</span><span className="text-amber-600">16</span><span className="text-red-600">2</span><span className="text-slate-900">66</span></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-800">Equipment</span>
                    <div className="flex gap-5 text-[11px] font-bold"><span className="text-emerald-600">20</span><span className="text-amber-600">6</span><span className="text-red-600">1</span><span className="text-slate-900">27</span></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-800">Vaccines</span>
                    <div className="flex gap-5 text-[11px] font-bold"><span className="text-emerald-600">14</span><span className="text-amber-600">2</span><span className="text-red-600">1</span><span className="text-slate-900">17</span></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-800">Others</span>
                    <div className="flex gap-5 text-[11px] font-bold"><span className="text-emerald-600">6</span><span className="text-amber-600">1</span><span className="text-red-600">0</span><span className="text-slate-900">7</span></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-around text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Good Stock</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Low Stock</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Out of Stock</span>
              </div>
            </div>

            {/* Col 3: Stock Alerts & Facilities (4 cols) */}
            <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
              {/* Stock Alerts Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Stock Alerts</h3>
                  <button className="text-[10px] text-red-600 font-bold hover:underline">View All →</button>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  <div className="p-2 rounded-2xl bg-red-50/60 border border-red-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-red-900 text-[11px]">ORS Packets</h4>
                      <span className="text-[10px] text-slate-500">Only 12 packets remaining</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 block">10 min ago</span>
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-extrabold text-[9px]">Critical</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-amber-900 text-[11px]">Iron Tablets</h4>
                      <span className="text-[10px] text-slate-500">Low stock: 28 tablets left</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 block">25 min ago</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[9px]">Low</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-amber-900 text-[11px]">Paracetamol</h4>
                      <span className="text-[10px] text-slate-500">Low stock: 15 strips left</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 block">40 min ago</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[9px]">Low</span>
                    </div>
                  </div>
                </div>

                <button className="text-xs text-[#6c47ff] font-bold hover:underline text-center w-full pt-1">
                  View All Alerts →
                </button>
              </div>

              {/* Facilities & Infrastructure Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Facilities & Infrastructure</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-[11px]">PHC Ramanthapur</h4>
                    <span className="text-[9px] text-slate-400 block">Main Center</span>
                    <span className="text-[10px] text-emerald-600 font-bold block">Status: Operational</span>
                    <span className="text-[10px] text-slate-600 block">Beds: 30 • Staff: 18</span>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-[11px]">PHC Uppal</h4>
                    <span className="text-[9px] text-slate-400 block">Sub Center</span>
                    <span className="text-[10px] text-emerald-600 font-bold block">Status: Operational</span>
                    <span className="text-[10px] text-slate-600 block">Beds: 20 • Staff: 12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: Inventory List Table (12 cols) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-sm">Inventory List</h3>

                <div className="flex items-center gap-3">
                  <select value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700">
                    <option>All Categories</option><option>Medical Supplies</option><option>Medicines</option><option>Equipment</option><option>Vaccines</option>
                  </select>

                  <div className="relative w-52">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-100">
                    <tr>
                      <th className="p-3">Item Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Available Stock</th>
                      <th className="p-3">Unit</th>
                      <th className="p-3">Min. Stock Level</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Expiry Date</th>
                      <th className="p-3 text-right">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {inventoryItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-extrabold text-slate-900">{item.name}</td>
                        <td className="p-3 text-slate-800">{item.category}</td>
                        <td className="p-3 font-black text-slate-900">{item.stock}</td>
                        <td className="p-3 text-slate-500 font-medium">{item.unit}</td>
                        <td className="p-3 text-slate-800 font-bold">{item.minStock}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${item.statusColor}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500 font-mono">{item.expiry}</td>
                        <td className="p-3 text-right text-slate-400 font-mono text-[10px]">{item.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Showing 1 to 10 of 56 items</span>
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

          {/* ROW 4: Resource Utilization, Monthly Stock Trend, Recent Activity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Col 1: Resource Utilization (This Month) (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Resource Utilization <span className="text-[9px] text-slate-400 font-normal">(This Month)</span></h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
              </div>

              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={utilizationData}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={8} />
                    <YAxis stroke="#94a3b8" fontSize={8} />
                    <Tooltip />
                    <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                      {utilizationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Col 2: Monthly Stock Trend (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Monthly Stock Trend</h3>
                <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View Report →</button>
              </div>

              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockTrendData}>
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={8} />
                    <YAxis stroke="#94a3b8" fontSize={8} />
                    <Tooltip />
                    <Line type="monotone" dataKey="ors" stroke="#6c47ff" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="iron" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="para" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Col 3: Recent Activity (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Recent Activity</h3>
                  <button className="text-[10px] text-[#6c47ff] font-bold hover:underline">View All →</button>
                </div>

                <div className="space-y-2 text-xs font-semibold">
                  <div className="p-2 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-0.5">
                    <h4 className="font-extrabold text-emerald-900 text-[11px]">Stock received: Iron Tablets (500 units)</h4>
                    <span className="text-[10px] text-slate-500 block">By: Lakshmi Devi</span>
                    <span className="text-[9px] text-slate-400 font-mono block">25 May 2026, 10:15 AM</span>
                  </div>

                  <div className="p-2 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-0.5">
                    <h4 className="font-extrabold text-amber-900 text-[11px]">Low stock alert: ORS Packets</h4>
                    <span className="text-[10px] text-slate-500 block">By: System</span>
                    <span className="text-[9px] text-slate-400 font-mono block">25 May 2026, 09:40 AM</span>
                  </div>

                  <div className="p-2 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-0.5">
                    <h4 className="font-extrabold text-blue-900 text-[11px]">Stock dispatched: Paracetamol (200 units)</h4>
                    <span className="text-[10px] text-slate-500 block">To: ASHA Meena Kumari</span>
                    <span className="text-[9px] text-slate-400 font-mono block">24 May 2026, 05:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-400 font-semibold pt-2">
            ℹ️ Resources data is updated in real-time • Last synced: 25 May 2026, 10:32 AM • <button onClick={() => alert("Refreshed resource inventory data!")} className="text-[#6c47ff] font-bold hover:underline">Refresh Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
