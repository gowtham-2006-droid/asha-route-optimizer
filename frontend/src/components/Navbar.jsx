import React from 'react';
import { Activity, MapPin, AlertOctagon, RefreshCw, LogOut, Menu } from 'lucide-react';
import { NavigationMenu } from './ui/navigation-menu';

export default function Navbar({ activeRole, setActiveRole, activeTab, onSelectTab, currentUser, onLogout, onTriggerEmergency, onResetRoute, onOpenSidebar }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo, Sidebar Hamburger & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
            title="Open Main Navigation Drawer"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
            <Activity className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="font-bold text-base sm:text-lg text-white leading-tight flex items-center gap-2">
              ASHA Route Optimizer <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">AI 1.0</span>
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" /> PHC Ramanthapur Catchment Area
            </p>
          </div>
        </div>

        {/* Navigation Menu & Notifications */}
        <div className="hidden lg:flex items-center flex-1 max-w-sm mx-4">
          <NavigationMenu activeTab={activeTab} onSelectTab={onSelectTab} />
        </div>

        {/* Action Controls & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Profile Badge */}
          {currentUser && (
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold">{currentUser.name}</span>
            </div>
          )}

          {/* Emergency FAB */}
          <button
            onClick={onTriggerEmergency}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <AlertOctagon className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">Emergency Trigger</span>
          </button>

          {/* Reset Simulation Route */}
          <button
            onClick={onResetRoute}
            title="Reset Route Sequence"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Role Switcher Tabs */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
            <button
              onClick={() => setActiveRole('asha_worker')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeRole === 'asha_worker'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Worker
            </button>
            <button
              onClick={() => setActiveRole('supervisor')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeRole === 'supervisor'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Supervisor
            </button>
          </div>

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              title="Logout Session"
              className="p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
