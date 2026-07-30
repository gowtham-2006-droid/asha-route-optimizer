import React, { useState } from 'react';
import { Activity, MapPin, AlertOctagon, RefreshCw, LogOut, Menu, Globe, Wifi } from 'lucide-react';
import { NavigationMenu } from './ui/navigation-menu';

export default function Navbar({
  activeRole,
  setActiveRole,
  activeTab,
  onSelectTab,
  currentUser,
  onLogout,
  onTriggerEmergency,
  onResetRoute,
  onOpenSidebar,
  currentLanguage,
  onLanguageChange,
  isOfflineMode,
  onToggleOfflineMode
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo & Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
            title="Main Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
            <Activity className="w-5 h-5 text-white" />
          </div>

          <div>
            <h1 className="font-bold text-sm sm:text-base text-white leading-tight flex items-center gap-1.5">
              ASHA Route Optimizer <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" /> PHC Ramanthapur Circle
            </p>
          </div>
        </div>

        {/* Navigation Menu (Desktop) */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs mx-2">
          <NavigationMenu activeTab={activeTab} onSelectTab={onSelectTab} />
        </div>

        {/* Controls & Features */}
        <div className="flex items-center gap-2">
          {/* Multilingual Selector [EN | TE | HI] */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-0.5 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5" />
            <button
              onClick={() => onLanguageChange('EN')}
              className={`px-2 py-0.5 rounded-lg transition-all ${currentLanguage === 'EN' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('TE')}
              className={`px-2 py-0.5 rounded-lg transition-all ${currentLanguage === 'TE' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => onLanguageChange('HI')}
              className={`px-2 py-0.5 rounded-lg transition-all ${currentLanguage === 'HI' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              हिंदी
            </button>
          </div>

          {/* Network Sync Status Indicator */}
          <button
            onClick={onToggleOfflineMode}
            className={`px-2.5 py-1 rounded-xl border text-[11px] font-semibold flex items-center gap-1 transition-all ${
              isOfflineMode
                ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
            }`}
            title="Click to toggle Network Sync Mode"
          >
            <Wifi className="w-3 h-3" />
            <span className="hidden sm:inline">{isOfflineMode ? '⚡ Rural Offline' : '📶 Cloud Synced'}</span>
          </button>

          {/* Emergency FAB */}
          <button
            onClick={onTriggerEmergency}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <AlertOctagon className="w-3.5 h-3.5 animate-bounce" />
            <span className="hidden sm:inline">Emergency</span>
          </button>

          {/* Role Switcher */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center text-xs">
            <button
              onClick={() => setActiveRole('asha_worker')}
              className={`px-2.5 py-0.5 rounded-lg font-medium transition-all ${activeRole === 'asha_worker' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}
            >
              Worker
            </button>
            <button
              onClick={() => setActiveRole('supervisor')}
              className={`px-2.5 py-0.5 rounded-lg font-medium transition-all ${activeRole === 'supervisor' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
            >
              Supervisor
            </button>
          </div>

          {/* Logout */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
