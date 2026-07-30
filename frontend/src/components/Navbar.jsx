import React, { useState } from 'react';
import { Sparkles, Search, Bell, RefreshCw, AlertOctagon, LogOut, Menu, Globe, Wifi, Shield, UserCheck } from 'lucide-react';

export default function Navbar({
  activeRole,
  activeTab,
  onSelectTab,
  currentUser,
  onLogout,
  onTriggerEmergency,
  onOpenSidebar,
  currentLanguage,
  onLanguageChange,
  isOfflineMode,
  onToggleOfflineMode
}) {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  return (
    <header className="sticky top-3 z-40 max-w-7xl mx-auto px-4">
      <div className="bg-white/90 backdrop-blur-2xl border border-white/60 shadow-[0_12px_30px_rgba(108,76,241,0.08)] rounded-full flex items-center justify-between px-6 py-2.5 transition-all">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors md:hidden"
            title="Open Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="w-9 h-9 rounded-full bg-[#532cd8] flex items-center justify-center text-white shadow-md shrink-0">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-sm sm:text-base text-[#532cd8] tracking-tight">
                ASHA Route Optimizer AI
              </h1>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider ${
                activeRole === 'supervisor'
                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                  : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
              }`}>
                {activeRole === 'supervisor' ? 'Supervisor Portal' : 'Active Dispatch'}
              </span>
            </div>
          </div>
        </div>

        {/* Floating Search Pill */}
        <div className="hidden md:flex items-center relative group">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search routes, patients..."
            className="bg-slate-100/80 border border-slate-200 rounded-full pl-10 pr-4 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 w-48 focus:w-64 transition-all outline-none focus:ring-2 focus:ring-[#532cd8]/20"
          />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Worker Multilingual Switcher */}
          {activeRole === 'asha_worker' && (
            <div className="bg-slate-100 p-1 rounded-full border border-slate-200 flex items-center gap-0.5 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
              <button
                onClick={() => onLanguageChange('EN')}
                className={`px-2 py-0.5 rounded-full transition-all ${currentLanguage === 'EN' ? 'bg-[#532cd8] text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('TE')}
                className={`px-2 py-0.5 rounded-full transition-all ${currentLanguage === 'TE' ? 'bg-[#532cd8] text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => onLanguageChange('HI')}
                className={`px-2 py-0.5 rounded-full transition-all ${currentLanguage === 'HI' ? 'bg-[#532cd8] text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                हिंदी
              </button>
            </div>
          )}

          {/* AI Sync Button */}
          <button
            onClick={onToggleOfflineMode}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              isOfflineMode
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-[#532cd8]/10 hover:bg-[#532cd8]/20 text-[#532cd8]'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isOfflineMode ? '⚡ Offline' : 'Run AI Sync'}</span>
          </button>

          {/* Worker Emergency Button */}
          {activeRole === 'asha_worker' && (
            <button
              onClick={onTriggerEmergency}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all hover:scale-105"
            >
              <AlertOctagon className="w-3.5 h-3.5 animate-bounce" />
              <span className="hidden sm:inline">Emergency</span>
            </button>
          )}

          {/* Logout */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 rounded-full bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"
              title="Logout Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
