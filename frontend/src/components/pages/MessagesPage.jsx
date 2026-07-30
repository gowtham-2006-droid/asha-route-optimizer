import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, Send, HeartPulse, Navigation
} from 'lucide-react';

export default function MessagesPage({ currentUser, onNavigateToTab, onTriggerEmergency, onRegisterNewPatient }) {
  const [activeChat, setActiveChat] = useState('sup_101');
  const [messageInput, setMessageInput] = useState('');

  const contacts = [
    { id: 'sup_101', name: 'Dr. Radhika Rao', role: 'PHC Medical Officer', online: true, unread: 2, lastMsg: 'Emergency dispatch confirmed for Saraswati Devi' },
    { id: 'wrk_102', name: 'Sunitha Kumar', role: 'ASHA Worker (Habsiguda)', online: true, unread: 0, lastMsg: 'I can cover Stop 4 if needed' },
    { id: 'wrk_103', name: 'Radhika Sharma', role: 'ASHA Worker (Uppal)', online: false, unread: 0, lastMsg: 'Stock restocked at Ramanthapur clinic' },
  ];

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Dr. Radhika Rao', text: 'Lakshmi, please verify BP reading for Saraswati Devi at Stop #1.', time: '09:45 AM', isMe: false },
    { id: 2, sender: 'Lakshmi Devi', text: 'Yes Doctor, BP recorded at 145/95 mmHg. OR-Tools placed her as Priority #1.', time: '09:48 AM', isMe: true },
    { id: 3, sender: 'Dr. Radhika Rao', text: 'Excellent. Emergency dispatch ambulance is on standby if needed.', time: '09:50 AM', isMe: false },
  ]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), sender: currentUser?.name || 'Lakshmi Devi', text: messageInput, time: 'Just now', isMe: true }
    ]);
    setMessageInput('');
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fe] text-slate-900 font-sans">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-[#6c47ff] tracking-tight leading-none">ASHA Companion</h1>
              <p className="text-[11px] text-slate-400 font-medium">Empowering Rural Health</p>
            </div>
          </div>

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
            <button onClick={onRegisterNewPatient} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Plus className="w-4 h-4" /><span>Add Patient</span>
            </button>
            <button onClick={onTriggerEmergency} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-bold">
              <div className="flex items-center gap-3"><AlertOctagon className="w-4 h-4" /><span>Emergency</span></div>
              <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">2</span>
            </button>
            <button onClick={() => onNavigateToTab('reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <FileText className="w-4 h-4" /><span>Reports</span>
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
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">PHC Clinical Messaging & Dispatch Chat</h2>
            <p className="text-xs text-slate-500">Real-time communication with PHC Supervisors & Sector Workers</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-600" /> PHC Ramanthapur
            </div>
            <button className="relative p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"><Bell className="w-4 h-4" /></button>
          </div>
        </header>

        <div className="p-6 flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0">
          {/* Contacts Column */}
          <div className="md:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-col space-y-3">
            <h3 className="font-bold text-slate-900 text-sm px-2">Clinical Contacts</h3>
            <div className="space-y-2">
              {contacts.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveChat(c.id)}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex items-center justify-between gap-3 ${
                    activeChat === c.id ? 'bg-purple-50 border border-purple-200' : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center border border-purple-200">
                        {c.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      {c.online && <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{c.name}</h4>
                      <span className="text-[10px] text-slate-500 font-medium block">{c.role}</span>
                    </div>
                  </div>

                  {c.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#6c47ff] text-white font-bold text-[10px] flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active Chat Column */}
          <div className="md:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="pb-3 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center border border-purple-200">
                RR
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Dr. Radhika Rao</h3>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active Now • PHC Medical Officer
                </span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[360px] pr-1 text-xs">
              {chatMessages.map(m => (
                <div key={m.id} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl ${
                    m.isMe ? 'bg-[#6c47ff] text-white rounded-br-none' : 'bg-slate-100 text-slate-900 rounded-bl-none'
                  }`}>
                    <span className={`text-[10px] block font-bold mb-1 ${m.isMe ? 'text-purple-200' : 'text-slate-500'}`}>{m.sender}</span>
                    <p className="leading-relaxed">{m.text}</p>
                    <span className={`text-[9px] block text-right mt-1 ${m.isMe ? 'text-purple-200' : 'text-slate-400'}`}>{m.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Row */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type message to PHC Medical Officer..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
              />
              <button
                onClick={handleSendMessage}
                className="p-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white shadow-md shadow-purple-600/30 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
