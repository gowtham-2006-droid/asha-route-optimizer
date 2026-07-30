import React from 'react';
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
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 px-4 py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo & Portal Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
            title="Main Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shrink-0">
            <Activity className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm sm:text-base text-white leading-tight">
                ASHA Route Optimizer AI
              </h1>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                activeRole === 'supervisor'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-400/30'
                  : 'bg-blue-500/20 text-blue-300 border-blue-400/30'
              }`}>
                {activeRole === 'supervisor' ? 'Supervisor Portal' : 'Worker Portal'}
              </span>
            </div>
            <p className="text-[10px] text-slate-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" /> PHC Ramanthapur Circle • Telangana
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="hidden lg:flex items-center flex-1 max-w-sm mx-2">
          <NavigationMenu activeRole={activeRole} activeTab={activeTab} onSelectTab={onSelectTab} />
        </div>

        {/* Clean Role-Based Actions */}
        <div className="flex items-center gap-2">
          {/* Worker-Only Language Selector */}
          {activeRole === 'asha_worker' && (
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-0.5 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
              <button
                onClick={() => onLanguageChange('EN')}
                className={`px-2 py-0.5 rounded-lg transition-all ${currentLanguage === 'EN' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('TE')}
                className={`px-2 py-0.5 rounded-lg transition-all ${currentLanguage === 'TE' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => onLanguageChange('HI')}
                className={`px-2 py-0.5 rounded-lg transition-all ${currentLanguage === 'HI' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
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
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
            title="Toggle Network Sync Mode"
          >
            <Wifi className="w-3 h-3" />
            <span className="hidden sm:inline">{isOfflineMode ? '⚡ Offline' : '📶 Online'}</span>
          </button>

          {/* Worker Emergency Button */}
          {activeRole === 'asha_worker' && (
            <button
              onClick={onTriggerEmergency}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <AlertOctagon className="w-3.5 h-3.5 animate-bounce" />
              <span className="hidden sm:inline">Emergency</span>
            </button>
          )}

          {/* User Profile Badge */}
          {currentUser && (
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              {activeRole === 'supervisor' ? <Shield className="w-3.5 h-3.5 text-indigo-400" /> : <UserCheck className="w-3.5 h-3.5 text-blue-400" />}
              <span className="text-slate-200 font-semibold">{currentUser.name}</span>
            </div>
          )}

          {/* Logout */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 transition-colors"
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
