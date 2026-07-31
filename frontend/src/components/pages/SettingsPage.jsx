import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, Globe, Calendar, Smartphone, Mail,
  Clock, Moon, Cloud, Wifi, Shield, Lock, ShieldCheck, Database, Download,
  HelpCircle, MessageCircle, AlertTriangle, Trash2, HeartPulse, Navigation,
  Bot, Sparkles, ChevronRight, Edit3, Check, BarChart3, UserCheck, LogOut
} from 'lucide-react';

export default function SettingsPage({
  currentUser,
  onTriggerEmergency,
  onRegisterNewPatient,
  onNavigateToTab,
  onLogout
}) {
  const [activeSubTab, setActiveSubTab] = useState('General');
  const [language, setLanguage] = useState('English');
  const [phcLocation, setPhcLocation] = useState('PHC Ramanthapur');

  // Toggle States
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dataSync, setDataSync] = useState(true);

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
            <button onClick={() => onNavigateToTab('resources')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Folder className="w-4 h-4" /><span>Resources</span>
            </button>
            <button onClick={() => onNavigateToTab('settings')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
              <Settings className="w-4 h-4" /><span>Settings</span>
            </button>
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-bold mt-2">
              <LogOut className="w-4 h-4" /><span>Log Out</span>
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
            <p className="text-[11px] text-slate-500 leading-snug">Get help with settings, troubleshooting and more.</p>
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
            <h2 className="text-xl font-bold text-slate-900">Settings</h2>
            <p className="text-xs text-slate-500">Manage your preferences and account settings</p>
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

        {/* 3. SUB-NAVIGATION TABS BAR */}
        <div className="bg-white border-b border-slate-200 px-6 py-2">
          <div className="flex items-center gap-6 text-xs font-bold text-slate-600">
            {['General', 'Profile', 'Notifications', 'Privacy', 'Security', 'App Preferences', 'About'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`py-2 relative transition-all ${
                  activeSubTab === tab ? 'text-[#6c47ff] font-extrabold' : 'hover:text-slate-900'
                }`}
              >
                {tab}
                {activeSubTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6c47ff] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Settings Forms */}
            <div className="lg:col-span-8 space-y-6">
              {/* CARD 1: General Settings */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center font-bold">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">General Settings</h3>
                    <p className="text-xs text-slate-400 font-medium">Manage language, location and other general preferences.</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs divide-y divide-slate-100">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-slate-400" />
                      <div>
                        <h4 className="font-bold text-slate-900">Language</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Choose your preferred language</span>
                      </div>
                    </div>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#6c47ff]"
                    >
                      <option value="English">English</option>
                      <option value="Telugu">తెలుగు (Telugu)</option>
                      <option value="Hindi">हिंदी (Hindi)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <div>
                        <h4 className="font-bold text-slate-900">Location</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Your working location / PHC</span>
                      </div>
                    </div>
                    <select
                      value={phcLocation}
                      onChange={(e) => setPhcLocation(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#6c47ff]"
                    >
                      <option value="PHC Ramanthapur">PHC Ramanthapur</option>
                      <option value="PHC Habsiguda">PHC Habsiguda</option>
                      <option value="PHC Uppal">PHC Uppal</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div>
                        <h4 className="font-bold text-slate-900">Date & Time</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Set date, time and format</span>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                      25 May 2024, 10:30 AM <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 2: Notification Settings */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center font-bold">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">Notification Settings</h3>
                    <p className="text-xs text-slate-400 font-medium">Control how and when you receive notifications.</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs divide-y divide-slate-100">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-slate-400" />
                      <div>
                        <h4 className="font-bold text-slate-900">Push Notifications</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Receive alerts on your device</span>
                      </div>
                    </div>
                    <input type="checkbox" checked={pushNotif} onChange={(e) => setPushNotif(e.target.checked)} className="w-5 h-5 accent-[#6c47ff] rounded cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <div>
                        <h4 className="font-bold text-slate-900">Email Notifications</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Receive updates via email</span>
                      </div>
                    </div>
                    <input type="checkbox" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} className="w-5 h-5 accent-[#6c47ff] rounded cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <AlertOctagon className="w-4 h-4 text-red-500" />
                      <div>
                        <h4 className="font-bold text-slate-900">Emergency Alerts</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Get notified about critical emergencies</span>
                      </div>
                    </div>
                    <input type="checkbox" checked={emergencyAlerts} onChange={(e) => setEmergencyAlerts(e.target.checked)} className="w-5 h-5 accent-[#6c47ff] rounded cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <div>
                        <h4 className="font-bold text-slate-900">Daily Reminders</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Receive daily schedule and task reminders</span>
                      </div>
                    </div>
                    <input type="checkbox" checked={dailyReminders} onChange={(e) => setDailyReminders(e.target.checked)} className="w-5 h-5 accent-[#6c47ff] rounded cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* CARD 3: App Preferences */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6c47ff] flex items-center justify-center font-bold">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">App Preferences</h3>
                    <p className="text-xs text-slate-400 font-medium">Customize the app behavior and display.</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs divide-y divide-slate-100">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Moon className="w-4 h-4 text-slate-400" />
                      <div>
                        <h4 className="font-bold text-slate-900">Dark Mode</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Switch between light and dark theme</span>
                      </div>
                    </div>
                    <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} className="w-5 h-5 accent-[#6c47ff] rounded cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Cloud className="w-4 h-4 text-slate-400" />
                      <div>
                        <h4 className="font-bold text-slate-900">Data Sync</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Sync data on mobile network</span>
                      </div>
                    </div>
                    <input type="checkbox" checked={dataSync} onChange={(e) => setDataSync(e.target.checked)} className="w-5 h-5 accent-[#6c47ff] rounded cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Wifi className="w-4 h-4 text-slate-400" />
                      <div>
                        <h4 className="font-bold text-slate-900">Offline Mode</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Work in offline mode</span>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                      Sync when online <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 4: Danger Zone */}
              <div className="p-5 rounded-3xl bg-red-50/50 border border-red-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-red-900 text-xs">Danger Zone</h4>
                    <p className="text-[11px] text-red-600 font-medium">Permanently delete your account and all data</p>
                  </div>
                </div>

                <button className="px-4 py-2 rounded-xl bg-white border border-red-300 text-red-600 font-extrabold text-xs hover:bg-red-50 transition-all shrink-0">
                  Delete Account
                </button>
              </div>
            </div>

            {/* Right 4 Cols: Profile & Quick Links */}
            <div className="lg:col-span-4 space-y-6">
              {/* CARD 1: Profile Summary */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Profile Summary</h3>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-base flex items-center justify-center border border-purple-200 shrink-0">
                    LD
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">{currentUser?.name || 'Lakshmi Devi'}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#6c47ff] font-extrabold text-[10px]">
                      ASHA Worker
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 font-medium pt-2 border-t border-slate-100">
                  <p className="flex items-center gap-2">📞 +91 98765 43210</p>
                  <p className="flex items-center gap-2">✉️ lakshmi.devi@asha.gov.in</p>
                  <p className="flex items-center gap-2">📍 PHC Ramanthapur, Nagole Village</p>
                  <p className="flex items-center gap-2">🆔 ASHA ID: ASHA12567</p>
                </div>

                <button className="w-full py-2.5 rounded-2xl bg-white border border-purple-200 text-[#6c47ff] font-extrabold text-xs shadow-xs hover:bg-purple-50 transition-all flex items-center justify-center gap-1.5">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              </div>

              {/* CARD 2: Security */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Security
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Manage your password and account security.</p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Lock className="w-4 h-4 text-slate-500" />
                      <span className="font-bold text-slate-900">Change Password</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-4 h-4 text-slate-500" />
                      <span className="font-bold text-slate-900">Two-Factor Authentication</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold text-emerald-600">Enabled</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-slate-500" />
                      <span className="font-bold text-slate-900">Active Sessions</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* CARD 3: Data & Storage */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Data & Storage</h3>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Database className="w-4 h-4 text-slate-500" />
                      <div>
                        <h4 className="font-bold text-slate-900">Clear Cache</h4>
                        <span className="text-[10px] text-slate-400">Free up storage space</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold text-slate-500">24.6 MB</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Download className="w-4 h-4 text-slate-500" />
                      <div>
                        <h4 className="font-bold text-slate-900">Download My Data</h4>
                        <span className="text-[10px] text-slate-400">Download your app data</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* CARD 4: Support & Feedback */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Support & Feedback</h3>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-purple-600" />
                      <span className="font-bold text-slate-900">Help Center</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <MessageCircle className="w-4 h-4 text-purple-600" />
                      <span className="font-bold text-slate-900">Send Feedback</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-slate-900">Report an Issue</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* CARD 5: Account & Log Out */}
              <div className="bg-red-50/50 rounded-3xl border border-red-200 p-5 shadow-xs space-y-3">
                <h3 className="font-extrabold text-red-900 text-sm">Account & Session</h3>
                <p className="text-xs text-slate-600">You are currently logged in as <strong className="text-slate-900">{currentUser?.name || 'Lakshmi Devi'}</strong> ({currentUser?.role || 'ASHA Worker'}).</p>
                <button
                  onClick={onLogout}
                  className="w-full py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/30 transition-all"
                >
                  <LogOut className="w-4 h-4" /> Log Out of Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
