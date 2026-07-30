import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, Search, Filter, Phone, Video, Info,
  Paperclip, Smile, Send, HeartPulse, Navigation, Bot, Sparkles, CheckCheck,
  Megaphone, Edit3, ArrowRight, User, BarChart3, UserCheck
} from 'lucide-react';

export default function MessagesPage({
  currentUser,
  onTriggerEmergency,
  onRegisterNewPatient,
  onNavigateToTab
}) {
  const [activeTabFilter, setActiveTabFilter] = useState('All');
  const [activeChat, setActiveChat] = useState('c1');
  const [inputMessage, setInputMessage] = useState('');

  const conversationList = [
    { id: 'c1', name: 'PHC Ramanthapur', icon: '🏠', time: '10:30 AM', lastMsg: 'Dr. Kavitha: Please ensure all high risk patients are followed up.', unread: 2, isGroup: true, active: true },
    { id: 'c2', name: 'ASHA Team - Zone 3', icon: '👥', time: '9:45 AM', lastMsg: 'Savitri Devi: Immunization camp tomorrow at 10 AM.', unread: 1, isGroup: true },
    { id: 'c3', name: 'Supervisor - Sunitha', icon: '👩‍💼', time: 'Yesterday', lastMsg: 'Great work on completing all visits yesterday! 👍', unread: 0, isGroup: false },
    { id: 'c4', name: 'ANM - Roja', icon: '👩‍⚕️', time: 'Yesterday', lastMsg: 'Please share the pregnancy follow-up list.', unread: 0, isGroup: false },
    { id: 'c5', name: 'Village Health Group', icon: '👥', time: '2 Jun', lastMsg: 'Laxmi: Thank you for the visit.', unread: 0, isGroup: true },
    { id: 'c6', name: 'Medical Officer', icon: '👨‍⚕️', time: '1 Jun', lastMsg: 'Monthly report has been approved.', unread: 0, verified: true, isGroup: false },
    { id: 'c7', name: 'Training Coordinator', icon: '🎓', time: '31 May', lastMsg: 'New training module on maternal health is now available.', unread: 0, isGroup: false },
    { id: 'c8', name: 'System Notifications', icon: '🔔', time: '30 May', lastMsg: 'Your monthly performance report is ready.', unread: 1, isGroup: false },
  ];

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Dr. Kavitha (MO)', role: 'Medical Officer', avatar: 'DK', isMe: false, time: '10:30 AM', text: "Good morning team! Please ensure all high risk patients are followed up today. Let's focus on maternal health and immunization coverage.", reactions: { thumbs: 6, heart: 3 } },
    { id: 2, sender: 'Savitri Devi (ASHA)', role: 'ASHA Worker', avatar: 'SD', isMe: false, time: '10:32 AM', text: "Good morning doctor! I have 12 home visits scheduled today including 3 high risk patients.", reactions: { thumbs: 2 } },
    { id: 3, sender: 'Lakshmi Devi', role: 'ASHA Worker', avatar: 'LD', isMe: true, time: '10:35 AM', text: "I am on my way to Uppal village for the first visit.", doubleCheck: true },
    { id: 4, sender: 'ANM Roja', role: 'Auxiliary Nurse Midwife', avatar: 'AR', isMe: false, time: '10:36 AM', text: "Immunization camp is scheduled at Nagole village today 10 AM - 1 PM. Please inform all mothers.", reactions: { thumbs: 3 } },
    { id: 5, sender: 'Supervisor Sunitha', role: 'PHC Supervisor', avatar: 'SS', isMe: false, time: '10:38 AM', text: "Don't forget to update the app after each visit. Keep up the great work team! 🌟", reactions: { heart: 4 } },
  ]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: currentUser?.name || 'Lakshmi Devi',
        role: 'ASHA Worker',
        avatar: 'LD',
        isMe: true,
        time: 'Just now',
        text: inputMessage,
        doubleCheck: true
      }
    ]);
    setInputMessage('');
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
            <button onClick={() => onNavigateToTab('messages')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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
          </nav>
        </div>

        {/* Bottom AI Promo Box ("AI Assistant") */}
        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <Bot className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-900 block">AI Assistant</span>
            <p className="text-[11px] text-slate-500 leading-snug">Ask anything about patients, guidelines or health updates.</p>
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
            <h2 className="text-xl font-bold text-slate-900">Messages</h2>
            <p className="text-xs text-slate-500">Communicate and coordinate with your team</p>
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

        {/* 3. MAIN 3-COLUMN MESSAGING BODY */}
        <div className="p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-y-auto">
          {/* COLUMN 1: Conversations List (Left 3.5 Cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-col space-y-4">
            {/* Search Box */}
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                />
              </div>
              <button className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100">
                <Filter className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button onClick={() => setActiveTabFilter('All')} className={`flex-1 py-1.5 rounded-lg text-center ${activeTabFilter === 'All' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}>All</button>
              <button onClick={() => setActiveTabFilter('Unread')} className={`flex-1 py-1.5 rounded-lg text-center flex items-center justify-center gap-1 ${activeTabFilter === 'Unread' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}>
                Unread <span className="px-1.5 py-0.2 rounded-full bg-[#6c47ff] text-white text-[9px]">3</span>
              </button>
              <button onClick={() => setActiveTabFilter('Mentions')} className={`flex-1 py-1.5 rounded-lg text-center ${activeTabFilter === 'Mentions' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}>Mentions</button>
            </div>

            {/* Conversations Roster */}
            <div className="space-y-1.5 overflow-y-auto max-h-[500px] pr-1">
              {conversationList.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveChat(c.id)}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex items-start justify-between gap-2.5 ${
                    activeChat === c.id ? 'bg-purple-50 border border-purple-200 shadow-2xs' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-2xl bg-purple-100 text-[#6c47ff] font-bold text-sm flex items-center justify-center shrink-0 border border-purple-200">
                      {c.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <h4 className="font-extrabold text-slate-900 text-xs truncate">{c.name}</h4>
                        {c.verified && <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white font-bold text-[8px] flex items-center justify-center">✓</span>}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate font-medium mt-0.5">{c.lastMsg}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[9px] font-semibold text-slate-400">{c.time}</span>
                    {c.unread > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#6c47ff] text-white font-bold text-[9px] flex items-center justify-center">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Active Chat Thread (Middle 6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
            {/* Header Bar */}
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] font-bold text-base flex items-center justify-center border border-purple-200">
                  🏠
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">PHC Ramanthapur</h3>
                  <span className="text-[10px] text-slate-500 font-semibold block">👥 12 Members</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-600">
                <button className="p-2 rounded-xl hover:bg-slate-100"><Search className="w-4 h-4" /></button>
                <button className="p-2 rounded-xl hover:bg-slate-100"><Phone className="w-4 h-4" /></button>
                <button className="p-2 rounded-xl hover:bg-slate-100"><Video className="w-4 h-4" /></button>
                <button className="p-2 rounded-xl hover:bg-slate-100"><Info className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Date Pill */}
            <div className="text-center">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px]">Today</span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[380px] pr-2 text-xs">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex items-start gap-2.5 max-w-md">
                    {!m.isMe && (
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center shrink-0 border border-purple-200 mt-1">
                        {m.avatar}
                      </div>
                    )}

                    <div className="space-y-1">
                      {!m.isMe && (
                        <span className="text-[10px] font-extrabold text-purple-700 block">{m.sender}</span>
                      )}

                      <div className={`p-3.5 rounded-2xl shadow-2xs ${
                        m.isMe ? 'bg-[#6c47ff] text-white rounded-br-none' : 'bg-slate-50 text-slate-900 border border-slate-200/80 rounded-bl-none'
                      }`}>
                        <p className="leading-relaxed font-medium">{m.text}</p>
                      </div>

                      {/* Reactions & Timestamp */}
                      <div className={`flex items-center gap-2 text-[9px] ${m.isMe ? 'justify-end text-purple-400' : 'text-slate-400'}`}>
                        {m.reactions && (
                          <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs text-slate-700">
                            {m.reactions.thumbs && <span>👍 {m.reactions.thumbs}</span>}
                            {m.reactions.heart && <span>❤️ {m.reactions.heart}</span>}
                          </div>
                        )}
                        <span>{m.time}</span>
                        {m.doubleCheck && <CheckCheck className="w-3 h-3 text-purple-300" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Box */}
            <div className="pt-2 flex items-center gap-2">
              <button className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100">
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
              />

              <button className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100">
                <Smile className="w-4 h-4" />
              </button>

              <button
                onClick={handleSendMessage}
                className="p-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white shadow-md shadow-purple-600/30 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* COLUMN 3: Groups & Announcements Side Panel (Right 3 Cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Panel 1: Groups */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Groups</h3>
                <button className="text-[11px] text-[#6c47ff] font-bold hover:underline">View All</button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#6c47ff] flex items-center justify-center font-bold">🏠</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">PHC Ramanthapur</h4>
                      <span className="text-[10px] text-slate-400">12 members</span>
                    </div>
                  </div>
                  <span className="w-4 h-4 rounded-full bg-[#6c47ff] text-white font-bold text-[9px] flex items-center justify-center">2</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">👥</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">ASHA Team - Zone 3</h4>
                      <span className="text-[10px] text-slate-400">18 members</span>
                    </div>
                  </div>
                  <span className="w-4 h-4 rounded-full bg-[#6c47ff] text-white font-bold text-[9px] flex items-center justify-center">1</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">👥</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Village Health Group</h4>
                      <span className="text-[10px] text-slate-400">25 members</span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">🔔</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Emergency Alerts</h4>
                      <span className="text-[10px] text-slate-400">8 members</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 2: Announcements */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Announcements</h3>
                <button className="text-[11px] text-[#6c47ff] font-bold hover:underline">View All</button>
              </div>

              <div className="space-y-3 text-xs">
                {/* Announcement 1 */}
                <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#6c47ff] font-extrabold text-xs">
                    <Megaphone className="w-4 h-4" /> Immunization Drive
                  </div>
                  <p className="text-slate-700 text-[11px] leading-snug">Special immunization drive on 5th June 2024 (Wednesday) at PHC Ramanthapur.</p>
                  <div className="flex items-center justify-between text-[9px] text-slate-400 font-semibold pt-1">
                    <span>By MO Kavitha</span>
                    <span>2 hours ago</span>
                  </div>
                </div>

                {/* Announcement 2 */}
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-xs">
                    <GraduationCap className="w-4 h-4" /> Training Program
                  </div>
                  <p className="text-slate-700 text-[11px] leading-snug">Maternal Health Training program on 10th June 2024. All ASHA workers must attend.</p>
                  <div className="flex items-center justify-between text-[9px] text-slate-400 font-semibold pt-1">
                    <span>By Training Coordinator</span>
                    <span>1 day ago</span>
                  </div>
                </div>

                {/* Announcement 3 */}
                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-800 font-extrabold text-xs">
                    <Settings className="w-4 h-4" /> System Update
                  </div>
                  <p className="text-slate-700 text-[11px] leading-snug">New update is available with improved patient tracking and report generation.</p>
                  <div className="flex items-center justify-between text-[9px] text-slate-400 font-semibold pt-1">
                    <span>By Admin</span>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 3: New Message Button */}
            <button className="w-full py-3 rounded-2xl bg-white border border-purple-200 text-[#6c47ff] font-extrabold text-xs shadow-xs hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
              <Edit3 className="w-4 h-4" /> New Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
