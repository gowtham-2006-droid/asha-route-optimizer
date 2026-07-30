import React from 'react';
import { Activity, Navigation, UserCheck, Shield, X, ChevronRight, FileText } from 'lucide-react';

export function Sidebar({ isOpen, onClose, activeRole, activeTab, onSelectTab }) {
  if (!isOpen) return null;

  const workerNavItems = [
    { id: 'route', label: "My Route & Map", icon: <Navigation className="w-4 h-4 text-sky-400" /> },
    { id: 'patients', label: 'Patient Directory', icon: <UserCheck className="w-4 h-4 text-indigo-400" /> },
  ];

  const supervisorNavItems = [
    { id: 'supervisor', label: 'PHC Supervisor Command Center', icon: <Shield className="w-4 h-4 text-indigo-400" /> },
  ];

  const currentNavItems = activeRole === 'supervisor' ? supervisorNavItems : workerNavItems;

  return (
    <div className="fixed inset-0 z-50 flex bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="w-72 bg-slate-900 border-r border-slate-800 h-full p-6 flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg ${
              activeRole === 'supervisor' ? 'bg-gradient-to-tr from-indigo-600 to-purple-600' : 'bg-gradient-to-tr from-sky-500 to-indigo-600'
            }`}>
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm leading-tight">
                {activeRole === 'supervisor' ? 'Supervisor Portal' : 'ASHA Optimizer'}
              </h2>
              <span className="text-[10px] text-sky-400 font-mono">PHC Ramanthapur</span>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1.5 flex-1">
          {currentNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab && onSelectTab(item.id);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === item.id || (activeRole === 'supervisor' && item.id === 'supervisor')
                  ? (activeRole === 'supervisor' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-sky-600 text-white shadow-lg shadow-sky-600/30')
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500">
          Idea2Impact 2026 • AI VRPTW Solver v1.0
        </div>
      </div>
    </div>
  );
}
