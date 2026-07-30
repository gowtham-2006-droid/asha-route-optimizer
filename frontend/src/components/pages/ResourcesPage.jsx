import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, Search, Filter, Download, Eye,
  MoreVertical, HeartPulse, Navigation, Bot, Sparkles, ChevronRight,
  BookOpen, Baby, ShieldCheck, Droplets, Megaphone, FileCheck, CheckCircle2,
  Video, Image, ArrowRight, Check, Share2, BarChart3, UserCheck
} from 'lucide-react';

export default function ResourcesPage({
  currentUser,
  onTriggerEmergency,
  onRegisterNewPatient,
  onNavigateToTab
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { title: 'Clinical Guidelines', desc: 'Protocols and treatment guidelines', count: '24 Resources', icon: '📖', color: 'bg-purple-50 text-[#6c47ff]' },
    { title: 'Maternal & Child Health', desc: 'ANC, PNC, newborn and child care', count: '18 Resources', icon: '🤱', color: 'bg-emerald-50 text-emerald-600' },
    { title: 'Immunization', desc: 'Vaccines, schedules and cold chain', count: '16 Resources', icon: '🛡️', color: 'bg-amber-50 text-amber-600' },
    { title: 'WASH', desc: 'Water, sanitation and hygiene', count: '12 Resources', icon: '💧', color: 'bg-blue-50 text-blue-600' },
    { title: 'Health Education', desc: 'IEC materials and awareness content', count: '20 Resources', icon: '📢', color: 'bg-pink-50 text-pink-600' },
  ];

  const featured = [
    { id: 'f1', tag: 'GUIDELINE', tagColor: 'bg-purple-100 text-[#6c47ff]', title: 'ANC Checkup Guidelines', desc: 'Standard ANC procedures and checkup schedule', fileInfo: 'PDF • 1.2 MB', type: 'doc' },
    { id: 'f2', tag: 'VIDEO', tagColor: 'bg-emerald-100 text-emerald-700', title: 'Handwashing Technique', desc: 'Step by step handwashing for communities', fileInfo: 'MP4 • 5.4 MB', type: 'video' },
    { id: 'f3', tag: 'JOB AID', tagColor: 'bg-amber-100 text-amber-800', title: 'High Risk Pregnancy Signs', desc: 'Identify danger signs during pregnancy', fileInfo: 'PDF • 850 KB', type: 'doc' },
    { id: 'f4', tag: 'CHECKLIST', tagColor: 'bg-blue-100 text-blue-700', title: 'Home Visit Checklist', desc: 'Use this checklist during every home visit', fileInfo: 'PDF • 420 KB', type: 'doc' },
  ];

  const recentlyAdded = [
    { id: 'r1', name: 'Iron Folic Acid Supplementation Guide', desc: 'Dosage, benefits and side effects', category: 'Clinical Guidelines', catColor: 'bg-purple-100 text-[#6c47ff]', type: 'PDF', addedOn: '22 May 2024', icon: '📄' },
    { id: 'r2', name: 'Breastfeeding Counseling Video', desc: 'Counseling tips for new mothers', category: 'Maternal & Child Health', catColor: 'bg-emerald-100 text-emerald-800', type: 'Video', addedOn: '20 May 2024', icon: '🎥' },
    { id: 'r3', name: 'ORS Preparation Poster', desc: 'How to prepare ORS at home', category: 'Health Education', catColor: 'bg-pink-100 text-pink-700', type: 'Image', addedOn: '18 May 2024', icon: '🖼️' },
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
            <button onClick={() => onNavigateToTab('resources')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
              <Folder className="w-4 h-4" /><span>Resources</span>
            </button>
            <button onClick={() => onNavigateToTab('settings')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Settings className="w-4 h-4" /><span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom AI Promo Box ("Need something?") */}
        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <Folder className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-900 block">Need something?</span>
            <p className="text-[11px] text-slate-500 leading-snug">Find guides, templates and health resources to help you serve better.</p>
          </div>
          <button className="w-full py-2 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center justify-center gap-1">
            Ask AI <Sparkles className="w-3 h-3 fill-current" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Resources</h2>
            <p className="text-xs text-slate-500">Access helpful materials, guides and tools</p>
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
          {/* 3. HERO BANNER ("Everything you need, in one place! 📚") */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-4 max-w-xl">
              <h3 className="text-2xl font-black text-purple-950 flex items-center gap-2">
                Everything you need, in one place! 📚
              </h3>
              <p className="text-xs text-purple-900 font-medium leading-relaxed">
                Guidelines, job aids, forms, videos and more to support your work in the field.
              </p>

              {/* Search Bar inside Hero */}
              <div className="flex items-center gap-2 pt-1">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-purple-200 rounded-2xl text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff] shadow-xs"
                  />
                </div>
                <button className="px-4 py-2 rounded-2xl bg-white border border-purple-200 hover:bg-purple-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs">
                  <Filter className="w-3.5 h-3.5 text-purple-600" /> Filter
                </button>
              </div>
            </div>

            {/* Illustration Avatar */}
            <div className="w-32 h-32 rounded-3xl bg-purple-200/60 border border-purple-300 flex items-center justify-center text-4xl shrink-0">
              👩‍⚕️🏽📖
            </div>
          </div>

          {/* 4. MAIN SPLIT SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8.5 Cols Body */}
            <div className="lg:col-span-8 space-y-6">
              {/* Resource Categories Row (5 Cards) */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Resource Categories</h3>
                  <button className="text-xs text-[#6c47ff] font-bold hover:underline flex items-center gap-1">
                    View All Categories <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-200 transition-all flex flex-col justify-between space-y-2 cursor-pointer">
                      <div className={`w-9 h-9 rounded-xl ${cat.color} flex items-center justify-center text-base font-bold`}>
                        {cat.icon}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs leading-tight">{cat.title}</h4>
                        <p className="text-[10px] text-slate-500 font-medium leading-tight mt-1 line-clamp-2">{cat.desc}</p>
                      </div>
                      <span className="text-[10px] font-bold text-[#6c47ff] block">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Resources Carousel */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Featured Resources</h3>
                  <button className="text-xs text-[#6c47ff] font-bold hover:underline flex items-center gap-1">
                    View All <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {featured.map(item => (
                    <div key={item.id} className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition-all">
                      <div className="space-y-2">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${item.tagColor}`}>
                          {item.tag}
                        </span>

                        <div className="h-24 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 flex items-center justify-center text-3xl">
                          {item.type === 'video' ? '🎥' : '📄'}
                        </div>

                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs">{item.title}</h4>
                          <p className="text-[10px] text-slate-500 font-medium leading-snug mt-0.5">{item.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] font-bold text-slate-500">
                        <span>{item.fileInfo}</span>
                        <button className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700"><Download className="w-3.5 h-3.5 text-purple-600" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Added Table */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Recently Added</h3>
                  <button className="text-xs text-[#6c47ff] font-bold hover:underline flex items-center gap-1">
                    View All <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 text-[10px]">
                      <tr>
                        <th className="p-4">Resource Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Added On</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentlyAdded.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-2xl bg-purple-50 text-base flex items-center justify-center shrink-0">
                                {item.icon}
                              </div>
                              <div>
                                <span className="font-extrabold text-slate-900 text-xs block">{item.name}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{item.desc}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.catColor}`}>
                              {item.category}
                            </span>
                          </td>

                          <td className="p-4 font-semibold text-slate-800">{item.type}</td>

                          <td className="p-4 font-semibold text-slate-800">{item.addedOn}</td>

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
            </div>

            {/* Right 3.5 Cols Side Panel */}
            <div className="lg:col-span-4 space-y-6">
              {/* Panel 1: Quick Links */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Quick Links</h3>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <FileCheck className="w-4 h-4 text-purple-600" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Government Guidelines</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Access latest government protocols</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#6c47ff]" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Forms & Formats</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Download important forms</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Megaphone className="w-4 h-4 text-amber-600" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">IEC Materials</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Posters, flipbooks and brochures</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <AlertOctagon className="w-4 h-4 text-red-600" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Emergency Protocols</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Quick reference for emergencies</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Folder className="w-4 h-4 text-blue-600" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Contact Directory</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Important contacts and numbers</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Panel 2: Offline Resources */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Offline Resources</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    3 Downloaded
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-red-500" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Immunization Schedule</h4>
                        <span className="text-[10px] text-slate-400">PDF • 1.1 MB</span>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-red-500" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Child Growth Chart</h4>
                        <span className="text-[10px] text-slate-400">PDF • 600 KB</span>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-red-500" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Counseling Cards (Set)</h4>
                        <span className="text-[10px] text-slate-400">PDF • 2.3 MB</span>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-2xl bg-white border border-purple-200 text-[#6c47ff] font-extrabold text-xs shadow-xs hover:bg-purple-50 transition-all flex items-center justify-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-purple-600" /> Download More Resources
                </button>
              </div>

              {/* Panel 3: Resource Usage */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Resource Usage</h3>
                  <select className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-0.5 text-[10px] text-slate-800 font-bold">
                    <option>This Month</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-base font-black text-slate-900 block">48</span>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Resources Viewed</span>
                  </div>
                  <div>
                    <span className="text-base font-black text-slate-900 block">21</span>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Downloads</span>
                  </div>
                  <div>
                    <span className="text-base font-black text-slate-900 block">12</span>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Shared</span>
                  </div>
                </div>

                <p className="text-[11px] font-bold text-purple-900 text-center flex items-center justify-center gap-1">
                  📈 Keep learning and sharing for better outcomes!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
