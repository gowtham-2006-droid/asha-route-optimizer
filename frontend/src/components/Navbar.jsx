import React, { useState } from 'react';
import { Activity, MapPin, AlertOctagon, LogOut, Menu, Globe, Wifi, Shield, UserCheck } from 'lucide-react';
import { NavigationMenu } from './ui/navigation-menu';

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
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo & Portal Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
            title="Main Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shrink-0 ${
            activeRole === 'supervisor'
              ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-indigo-500/20'
              : 'bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-sky-500/20'
          }`}>
            <Activity className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm sm:text-base text-white leading-tight">
                ASHA Route Optimizer AI
              </h1>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                activeRole === 'supervisor'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  : 'bg-sky-500/20 text-sky-400 border-sky-500/30'
              }`}>
                {activeRole === 'supervisor' ? 'Supervisor Portal' : 'Worker Portal'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" /> PHC Ramanthapur Circle
            </p>
          </div>
        </div>

        {/* Dynamic Role Navigation Menu */}
        <div className="hidden lg:flex items-center flex-1 max-w-sm mx-2">
          <NavigationMenu activeRole={activeRole} activeTab={activeTab} onSelectTab={onSelectTab} />
        </div>

        {/* Controls & User Profile */}
        <div className="flex items-center gap-2">
          {/* Multilingual Selector [EN | TE | HI] */}
          {activeRole === 'asha_worker' && (
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
          )}

          {/* Network Sync Status Indicator */}
          <button
            onClick={onToggleOfflineMode}
            className={`px-2.5 py-1 rounded-xl border text-[11px] font-semibold flex items-center gap-1 transition-all ${
              isOfflineMode
                ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
            }`}
            title="Toggle Network Sync Mode"
          >
            <Wifi className="w-3 h-3" />
            <span className="hidden sm:inline">{isOfflineMode ? '⚡ Offline' : '📶 Cloud Synced'}</span>
          </button>

          {/* Emergency Trigger (Worker Portal Only) */}
          {activeRole === 'asha_worker' && (
            <button
              onClick={onTriggerEmergency}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <AlertOctagon className="w-3.5 h-3.5 animate-bounce" />
              <span className="hidden sm:inline">Emergency</span>
            </button>
          )}

          {/* Logged In User Profile Pill */}
          {currentUser && (
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              {activeRole === 'supervisor' ? <Shield className="w-3.5 h-3.5 text-indigo-400" /> : <UserCheck className="w-3.5 h-3.5 text-sky-400" />}
              <span className="text-slate-200 font-semibold">{currentUser.name}</span>
            </div>
          )}

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors"
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
