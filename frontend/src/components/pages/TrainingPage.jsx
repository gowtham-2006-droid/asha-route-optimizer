import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, BookOpen, Award, Clock,
  CheckCircle2, PlayCircle, Download, ChevronRight, HeartPulse, Navigation,
  Bot, Sparkles, Search, Filter, Video, Calendar, ShieldCheck, HelpCircle, ArrowRight,
  BarChart3, UserCheck
} from 'lucide-react';

export default function TrainingPage({
  currentUser,
  onTriggerEmergency,
  onRegisterNewPatient,
  onNavigateToTab
}) {
  const [activeCourseTab, setActiveCourseTab] = useState('All Courses');

  const courses = [
    {
      id: 'c1',
      title: 'Maternal Health Care',
      desc: 'Comprehensive guide on ANC, PNC, nutrition and maternal care.',
      badge: 'Mandatory',
      badgeStyle: 'bg-red-100 text-red-700',
      progress: 100,
      btnLabel: 'View Certificate',
      btnPrimary: false,
      icon: '🤱'
    },
    {
      id: 'c2',
      title: 'Child Immunization',
      desc: 'Learn about vaccination schedules, cold chain and safety protocols.',
      badge: 'In Progress',
      badgeStyle: 'bg-blue-100 text-blue-700',
      progress: 65,
      btnLabel: 'Continue',
      btnPrimary: true,
      icon: '👶'
    },
    {
      id: 'c3',
      title: 'Disease Prevention',
      desc: 'Preventive measures for malaria, dengue, TB and other diseases.',
      badge: 'Recommended',
      badgeStyle: 'bg-emerald-100 text-emerald-800',
      progress: 40,
      btnLabel: 'Resume',
      btnPrimary: false,
      icon: '🛡️'
    },
    {
      id: 'c4',
      title: 'WASH Practices',
      desc: 'Water, Sanitation and Hygiene best practices for communities.',
      badge: 'New',
      badgeStyle: 'bg-purple-100 text-[#6c47ff]',
      progress: 20,
      btnLabel: 'Start Course',
      btnPrimary: false,
      icon: '💧'
    }
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
            <button onClick={() => onNavigateToTab('training')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
              <GraduationCap className="w-4 h-4" /><span>Training</span>
            </button>
            <button onClick={() => onNavigateToTab('resources')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Folder className="w-4 h-4" /><span>Resources</span>
            </button>
            <button onClick={() => onNavigateToTab('settings')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Settings className="w-4 h-4" /><span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom AI Promo Box ("AI Assistant") */}
        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <Bot className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-900 block">AI Assistant</span>
            <p className="text-[11px] text-slate-500 leading-snug">Get training suggestions and answers to your health related questions.</p>
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
            <h2 className="text-xl font-bold text-slate-900">Training</h2>
            <p className="text-xs text-slate-500">Learn, grow and improve your skills</p>
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
          {/* 3. HERO BANNER ("Keep Learning, Keep Growing 🎓") */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-3 max-w-xl">
              <h3 className="text-2xl font-black text-purple-950 flex items-center gap-2">
                Keep Learning, Keep Growing 🎓
              </h3>
              <p className="text-xs text-purple-900 font-medium leading-relaxed">
                Access training modules, attend sessions and enhance your knowledge to provide better care.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <button className="px-5 py-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Explore Courses
                </button>
                <button className="px-5 py-2.5 rounded-2xl bg-white border border-purple-200 hover:bg-purple-50 text-[#6c47ff] font-extrabold text-xs shadow-xs transition-all flex items-center gap-2">
                  <Award className="w-4 h-4" /> My Certificates
                </button>
              </div>
            </div>

            {/* Illustration Avatar */}
            <div className="w-32 h-32 rounded-3xl bg-purple-200/60 border border-purple-300 flex items-center justify-center text-4xl shrink-0">
              👩‍⚕️🏽💻
            </div>
          </div>

          {/* 4. MAIN SPLIT SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8.5 Cols: Metrics & Courses List */}
            <div className="lg:col-span-8 space-y-6">
              {/* KPI Metric Cards Row (4 White Cards) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center shrink-0 font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block">Completed Courses</span>
                    <span className="text-lg font-black text-slate-900 block leading-tight">12</span>
                    <span className="text-[9px] font-bold text-emerald-600">↑ 2 this month</span>
                  </div>
                </div>

                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block">In Progress</span>
                    <span className="text-lg font-black text-slate-900 block leading-tight">4</span>
                    <span className="text-[9px] font-bold text-emerald-600">Continue learning</span>
                  </div>
                </div>

                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block">Certificates Earned</span>
                    <span className="text-lg font-black text-slate-900 block leading-tight">6</span>
                    <span className="text-[9px] font-bold text-purple-600">View all certificates</span>
                  </div>
                </div>

                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block">Training Hours</span>
                    <span className="text-lg font-black text-slate-900 block leading-tight">24h 30m</span>
                    <span className="text-[9px] font-bold text-emerald-600">↑ 5h this month</span>
                  </div>
                </div>
              </div>

              {/* Filter Tabs & Search Bar */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-1 overflow-x-auto text-xs font-bold text-slate-600">
                    {['All Courses', 'In Progress', 'Completed', 'Mandatory', 'Recommended'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveCourseTab(tab)}
                        className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                          activeCourseTab === tab ? 'bg-[#6c47ff] text-white font-extrabold shadow-xs' : 'hover:bg-slate-100'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-48">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                      />
                    </div>
                    <button className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100">
                      <Filter className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* All Courses Header */}
                <h3 className="font-extrabold text-slate-900 text-sm">All Courses (16)</h3>

                {/* 4 Course Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {courses.map(course => (
                    <div key={course.id} className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black ${course.badgeStyle}`}>
                            {course.badge}
                          </span>
                        </div>

                        {/* Graphic Frame */}
                        <div className="h-28 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 flex items-center justify-center text-4xl">
                          {course.icon}
                        </div>

                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm">{course.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{course.desc}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${course.progress === 100 ? 'bg-emerald-500' : 'bg-[#6c47ff]'}`} style={{ width: `${course.progress}%` }} />
                          </div>
                          <span className={`text-[10px] font-bold block ${course.progress === 100 ? 'text-emerald-600' : 'text-[#6c47ff]'}`}>
                            {course.progress}% Completed
                          </span>
                        </div>

                        <button className={`w-full py-2.5 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all ${
                          course.btnPrimary
                            ? 'bg-[#6c47ff] hover:bg-purple-700 text-white shadow-md shadow-purple-600/30'
                            : 'bg-white border border-purple-200 text-[#6c47ff] hover:bg-purple-50'
                        }`}>
                          {course.btnPrimary ? <PlayCircle className="w-4 h-4" /> : null}
                          {course.btnLabel}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-2">
                  <button className="text-xs text-[#6c47ff] font-bold hover:underline">View All Courses v</button>
                </div>
              </div>
            </div>

            {/* Right 3.5 Cols: Side Widgets */}
            <div className="lg:col-span-4 space-y-6">
              {/* Panel 1: Your Training Progress */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Your Training Progress</h3>
                  <button className="text-[11px] text-[#6c47ff] font-bold hover:underline">View Details</button>
                </div>

                <div className="flex items-center justify-between gap-4 py-2">
                  {/* Ring Donut */}
                  <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="72, 100" strokeLinecap="round" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-xl font-black text-slate-900">72%</span>
                      <span className="text-[9px] text-slate-400 font-bold">Overall</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs font-semibold text-slate-700 flex-1">
                    <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Completed</span> <strong className="text-slate-900">12</strong></div>
                    <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> In Progress</span> <strong className="text-slate-900">4</strong></div>
                    <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Not Started</span> <strong className="text-slate-900">4</strong></div>
                  </div>
                </div>
              </div>

              {/* Panel 2: Upcoming Live Sessions */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Upcoming Live Sessions</h3>
                  <button className="text-[11px] text-[#6c47ff] font-bold hover:underline">View All</button>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Session 1 */}
                  <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#6c47ff] flex items-center justify-center shrink-0"><Video className="w-4 h-4" /></div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-slate-900 text-xs truncate">Nutrition for Pregnant Women</h4>
                        <span className="text-[10px] text-slate-500 font-medium block">By Dr. Kavitha (MO) • 02 Jun 2024 • 10:00 AM</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-xl bg-[#6c47ff] text-white font-extrabold text-[10px] hover:bg-purple-700 shrink-0">Join</button>
                  </div>

                  {/* Session 2 */}
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><Calendar className="w-4 h-4" /></div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-slate-900 text-xs truncate">Immunization Refresher</h4>
                        <span className="text-[10px] text-slate-500 font-medium block">By ANM Supervisor • 04 Jun 2024 • 02:00 PM</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-xl bg-[#6c47ff] text-white font-extrabold text-[10px] hover:bg-purple-700 shrink-0">Join</button>
                  </div>

                  {/* Session 3 */}
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0"><Award className="w-4 h-4" /></div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-slate-900 text-xs truncate">Health Education Skills</h4>
                        <span className="text-[10px] text-slate-500 font-medium block">By Training Coordinator • 06 Jun 2024 • 11:00 AM</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-xl bg-[#6c47ff] text-white font-extrabold text-[10px] hover:bg-purple-700 shrink-0">Join</button>
                  </div>
                </div>
              </div>

              {/* Panel 3: Quick Resources */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Quick Resources</h3>
                  <button className="text-[11px] text-[#6c47ff] font-bold hover:underline">View All</button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Training Calendar</h4>
                        <span className="text-[10px] text-slate-400 font-medium">View upcoming training schedule</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Download className="w-4 h-4 text-purple-600" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Download Materials</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Access training PDFs and videos</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Training Guidelines</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Standard protocols and guidelines</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-purple-600" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">Help & Support</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Get help for training related queries</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
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
