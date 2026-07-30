import React, { useState } from 'react';
import { Bell, Navigation, Users } from 'lucide-react';

export function NavigationMenu({ activeRole, activeTab, onSelectTab, className = '' }) {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  const mockNotifications = [
    { id: 1, title: 'Emergency Dispatch', text: 'Kavitha Sharma flagged Critical (Score: 98)', time: '5m ago', isEmergency: true },
    { id: 2, title: 'Route Re-Optimized', text: 'OR-Tools updated schedule for Lakshmi Devi', time: '12m ago', isEmergency: false },
    { id: 3, title: 'High Risk Alert', text: 'Sunitha Rao overdue ANC visit by 5 days', time: '1h ago', isEmergency: true }
  ];

  return (
    <div className={`flex items-center justify-between gap-3 w-full ${className}`}>
      {/* Top Navigation Tabs for Worker Role (Hidden/Clean for Supervisor Role) */}
      {activeRole === 'asha_worker' ? (
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onSelectTab && onSelectTab('route')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'route' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" /> My Route & Map
          </button>

          <button
            onClick={() => onSelectTab && onSelectTab('patients')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'patients' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Patient Directory
          </button>
        </div>
      ) : (
        <div className="flex-1" /> // Empty placeholder for clean supervisor top bar
      )}

      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setIsNotifyOpen(!isNotifyOpen)}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white relative transition-colors"
          title="Alert Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
        </button>

        {isNotifyOpen && (
          <div className="absolute right-0 top-11 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 p-3 space-y-2 animate-fade-in font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold text-white">
              <span>Notifications</span>
              <span className="text-[10px] text-sky-400">3 New Alerts</span>
            </div>

            <div className="space-y-1.5 max-h-60 overflow-y-auto">
              {mockNotifications.map((n) => (
                <div key={n.id} className={`p-2.5 rounded-xl border text-xs ${
                  n.isEmergency ? 'bg-red-950/20 border-red-500/30 text-red-200' : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}>
                  <div className="flex justify-between font-semibold mb-0.5 text-[11px]">
                    <span className={n.isEmergency ? 'text-red-400 font-bold' : 'text-slate-200'}>{n.title}</span>
                    <span className="text-[9px] text-slate-500">{n.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
