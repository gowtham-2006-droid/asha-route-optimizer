import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function AlertDialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-red-500/50 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function AlertDialogHeader({ children, className = '' }) {
  return <div className={`space-y-2 mb-4 ${className}`}>{children}</div>;
}

export function AlertDialogTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-bold text-white leading-tight flex items-center gap-2 ${className}`}>{children}</h3>;
}

export function AlertDialogDescription({ children, className = '' }) {
  return <p className={`text-xs text-slate-300 leading-relaxed ${className}`}>{children}</p>;
}

export function AlertDialogFooter({ children, className = '' }) {
  return <div className={`flex justify-end gap-3 pt-4 border-t border-slate-800 ${className}`}>{children}</div>;
}

export function AlertDialogAction({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 ${className}`}
    >
      {children}
    </button>
  );
}

export function AlertDialogCancel({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs ${className}`}
    >
      {children || 'Cancel'}
    </button>
  );
}
