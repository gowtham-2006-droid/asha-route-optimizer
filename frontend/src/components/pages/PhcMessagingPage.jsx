import React, { useState } from 'react';
import {
  Building2, Home, Users, UserCheck, MapPin, Navigation, AlertOctagon,
  FileText, Folder, BarChart3, Share2, MessageSquare, Settings, Bell,
  Calendar, ChevronDown, ArrowRight, ShieldCheck, CheckCircle2, Clock,
  Activity, Sparkles, AlertTriangle, Battery, Wifi, Check, X, RefreshCw,
  Award, TrendingUp, TrendingDown, FileSpreadsheet, Download, Send, Menu,
  Plus, MoreVertical, LogOut, Search, ChevronLeft, ChevronRight, Filter,
  Paperclip, Mic, Phone, Video, Info, User
} from 'lucide-react';
import { messageService } from '../../services/api';

export default function PhcMessagingPage({
  onNavigateToTab,
  onLogout
}) {
  const [selectedContactId, setSelectedContactId] = useState('c1');
  const [inputText, setInputText] = useState('');

  const contacts = [
    {
      id: 'c1',
      name: 'Lakshmi Devi',
      role: 'ASHA Worker (Habsiguda)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      lastMsg: 'Completed visit for Saraswati Devi. Blood sugar recorded 142 mg/dL.',
      time: '10:24 AM',
      unread: 2,
      online: true,
      village: 'Habsiguda',
      activeRoute: 'Stop 18 of 24 (75% completed)'
    },
    {
      id: 'c2',
      name: 'Sita Devi',
      role: 'ASHA Worker (Uppal)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      lastMsg: 'Requested additional ORS packets for Pedda Thimmapur sub-center.',
      time: '09:45 AM',
      unread: 0,
      online: true,
      village: 'Uppal',
      activeRoute: 'Stop 14 of 20 (70% completed)'
    },
    {
      id: 'c3',
      name: '🚨 Emergency Broadcast Channel',
      role: 'System Channel (All Workers)',
      avatar: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=150&auto=format&fit=crop&q=80',
      lastMsg: 'ALERT: Pregnancy emergency case ER-1024 reported in Pedda Thimmapur.',
      time: '10:10 AM',
      unread: 5,
      online: true,
      village: 'All Villages',
      activeRoute: 'Broadcast Active'
    },
    {
      id: 'c4',
      name: 'Anitha Reddy',
      role: 'ASHA Worker (Pedda Thimmapur)',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      lastMsg: 'Vaccination drive in Pedda Thimmapur school completed for 45 children.',
      time: 'Yesterday',
      unread: 0,
      online: false,
      village: 'Pedda Thimmapur',
      activeRoute: 'Stop 12 of 18 (66% completed)'
    },
    {
      id: 'c5',
      name: 'Meena Kumari',
      role: 'ASHA Worker (Nacharam)',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
      lastMsg: 'Patient Ravi Kumar has high fever 103.2°F. Initiated cold compress.',
      time: 'Yesterday',
      unread: 0,
      online: true,
      village: 'Nacharam',
      activeRoute: 'Stop 10 of 15 (66% completed)'
    }
  ];

  const selectedContact = contacts.find(c => c.id === selectedContactId) || contacts[0];

  const [messages, setMessages] = useState({
    c1: [
      { sender: 'Lakshmi Devi', text: 'Good morning Dr. Ramesh. Starting my Habsiguda route now.', time: '08:30 AM', isMe: false },
      { sender: 'Dr. Ramesh Kumar', text: 'Good morning Lakshmi. Please prioritize Saraswati Devi (Stop #18) as her BP risk score is elevated.', time: '08:35 AM', isMe: true },
      { sender: 'Lakshmi Devi', text: 'Understood Doctor. Arrived at Saraswati Devi home now.', time: '10:15 AM', isMe: false },
      { sender: 'Lakshmi Devi', text: 'Completed visit for Saraswati Devi. Blood sugar recorded 142 mg/dL.', time: '10:24 AM', isMe: false }
    ],
    c3: [
      { sender: 'System Broadcast', text: '🚨 CRITICAL ALERT: Emergency Case ER-1024 reported in Pedda Thimmapur.', time: '10:10 AM', isMe: false },
      { sender: 'Dr. Ramesh Kumar', text: 'Ambulance dispatched. Nearby ASHA Lakshmi Devi assigned to location.', time: '10:12 AM', isMe: true }
    ]
  });

  React.useEffect(() => {
    async function fetchRealMessages() {
      try {
        const res = await messageService.getMessages();
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const apiMsgs = res.data.map(m => ({
            sender: m.sender_name,
            text: m.text,
            time: m.timestamp,
            isMe: m.is_me
          }));
          setMessages(prev => ({
            ...prev,
            c1: [...(prev.c1 || []), ...apiMsgs]
          }));
        }
      } catch (err) {
        console.warn("Real messages fetch notice:", err);
      }
    }
    fetchRealMessages();
  }, []);

  const activeChat = messages[selectedContactId] || [
    { sender: selectedContact.name, text: selectedContact.lastMsg, time: selectedContact.time, isMe: false }
  ];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      sender: 'Dr. Ramesh Kumar',
      text: inputText,
      time: timeStr,
      isMe: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMsg]
    }));

    // Post to live FastAPI backend
    try {
      await messageService.sendMessage({
        sender_id: 'usr_sup01',
        sender_name: 'Dr. Ramesh Kumar',
        receiver_id: selectedContactId,
        text: inputText
      });
    } catch (err) {
      console.warn("Backend message send notice:", err);
    }

    setInputText('');
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
            <button onClick={() => onNavigateToTab && onNavigateToTab('messaging')} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
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
            <p className="text-[11px] text-slate-500 leading-snug">Ask anything about messaging</p>
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
                <MessageSquare className="w-5 h-5 text-[#6c47ff]" /> Messaging Center
              </h2>
              <p className="text-xs text-slate-500 font-medium">Real-time communication with ASHA field workers and emergency teams</p>
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

        {/* Content Body Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-hidden">
          {/* Left Contacts List (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search workers or channels..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                />
              </div>

              <div className="space-y-1.5 overflow-y-auto max-h-[500px] pr-1">
                {contacts.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedContactId(c.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      selectedContactId === c.id ? 'bg-purple-50/70 border-[#6c47ff]' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-purple-200" />
                        {c.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-slate-900 text-xs truncate">{c.name}</h4>
                        <p className="text-[10px] text-slate-500 truncate">{c.lastMsg}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[9px] text-slate-400 font-mono block">{c.time}</span>
                      {c.unread > 0 && (
                        <span className="w-4 h-4 rounded-full bg-[#6c47ff] text-white font-bold text-[9px] flex items-center justify-center mt-1 ml-auto">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => alert("Broadcast Message Modal")} className="w-full py-2.5 rounded-2xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Broadcast Announcement
            </button>
          </div>

          {/* Center Chat Window (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full object-cover border border-purple-200" />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    {selectedContact.name}
                    {selectedContact.online && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">{selectedContact.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100"><Phone className="w-4 h-4" /></button>
                <button className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100"><Video className="w-4 h-4" /></button>
                <button className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100"><Info className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 max-h-[380px]">
              {activeChat.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[75%] p-3 rounded-2xl text-xs space-y-1 ${
                    m.isMe ? 'bg-[#6c47ff] text-white rounded-br-none shadow-md shadow-purple-600/20' : 'bg-slate-100 text-slate-900 rounded-bl-none'
                  }`}>
                    <span className={`text-[10px] font-bold block ${m.isMe ? 'text-purple-200' : 'text-purple-600'}`}>{m.sender}</span>
                    <p className="leading-relaxed font-medium">{m.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono mt-1 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Quick Templates Bar */}
            <div className="flex items-center gap-2 py-2 border-t border-slate-100 overflow-x-auto text-[10px] font-bold text-slate-600">
              <span className="text-slate-400 font-semibold shrink-0">Quick Templates:</span>
              <button onClick={() => setInputText("Please share your current visit status.")} className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-purple-50 hover:text-[#6c47ff] shrink-0">
                Status Check
              </button>
              <button onClick={() => setInputText("Emergency backup requested for your location.")} className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-purple-50 hover:text-[#6c47ff] shrink-0">
                Emergency Dispatch
              </button>
              <button onClick={() => setInputText("Vaccine drive schedule updated for tomorrow.")} className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-purple-50 hover:text-[#6c47ff] shrink-0">
                Vaccine Drive
              </button>
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button type="button" className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"><Paperclip className="w-4 h-4" /></button>
              <button type="button" className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"><Mic className="w-4 h-4" /></button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message to ASHA worker..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
              />

              <button type="submit" className="p-2.5 rounded-2xl bg-[#6c47ff] text-white hover:bg-purple-700 shadow-md shadow-purple-600/30 transition-all">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
