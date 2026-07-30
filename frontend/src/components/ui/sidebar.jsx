import React from 'react';
import { Sparkles, Plus, AlertOctagon, Navigation, Users, Zap, Settings, HelpCircle, LogOut, X, ChevronRight, Activity } from 'lucide-react';

export function Sidebar({ isOpen, onClose, activeRole, activeTab, onSelectTab }) {
  if (!isOpen) return null;

  const workerNavItems = [
    { id: 'route', label: "Active Dispatch", icon: <AlertOctagon className="w-4 h-4 text-[#532cd8]" /> },
    { id: 'patients', label: 'Patient Directory', icon: <Users className="w-4 h-4 text-[#532cd8]" /> },
  ];

  const supervisorNavItems = [
    { id: 'supervisor', label: 'Supervisor Command Center', icon: <Activity className="w-4 h-4 text-[#532cd8]" /> },
  ];

  const currentNavItems = activeRole === 'supervisor' ? supervisorNavItems : workerNavItems;

  return (
    <div className="fixed inset-0 z-50 flex bg-slate-900/40 backdrop-blur-md animate-fade-in font-sans">
      <div className="w-[280px] bg-white border-r border-slate-200 h-full p-6 flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#532cd8] flex items-center justify-center text-white shadow-md shadow-[#532cd8]/30">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-extrabold text-[#532cd8] text-base leading-tight">
                ASHA AI
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">Clinical Logistics</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => { onSelectTab && onSelectTab('patients'); onClose(); }}
          className="w-full bg-[#6c4cf1] hover:bg-[#532cd8] text-white font-bold text-xs py-3 px-4 rounded-2xl shadow-lg shadow-[#6c4cf1]/30 hover:-translate-y-0.5 transition-all duration-200 mb-6 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Optimization</span>
        </button>

        {/* Navigation Items */}
        <div className="space-y-1.5 flex-1">
          {currentNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab && onSelectTab(item.id);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === item.id || (activeRole === 'supervisor' && item.id === 'supervisor')
                  ? 'bg-slate-100 text-[#532cd8] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
          <div className="flex items-center gap-3 px-2 py-1.5 text-slate-500">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </div>

          <div className="flex items-center gap-3 px-2 pt-2 border-t border-slate-100">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#532cd8] font-black text-xs flex items-center justify-center border border-indigo-200">
              LD
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-slate-900 text-xs">Lakshmi Devi</span>
              <span className="text-[10px] text-slate-500">ASHA System Administrator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
