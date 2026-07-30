import React from 'react';
import { X } from 'lucide-react';

export function Drawer({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl relative">
        {children}
      </div>
    </div>
  );
}

export function DrawerHeader({ children, className = '' }) {
  return (
    <div className={`p-6 border-b border-slate-800 space-y-1 ${className}`}>
      {children}
    </div>
  );
}

export function DrawerTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-bold text-white leading-tight ${className}`}>
      {children}
    </h3>
  );
}

export function DrawerDescription({ children, className = '' }) {
  return (
    <p className={`text-xs text-slate-400 ${className}`}>
      {children}
    </p>
  );
}

export function DrawerContent({ children, className = '' }) {
  return (
    <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${className}`}>
      {children}
    </div>
  );
}

export function DrawerFooter({ children, className = '' }) {
  return (
    <div className={`p-6 border-t border-slate-800 flex items-center justify-end gap-3 ${className}`}>
      {children}
    </div>
  );
}

export function DrawerClose({ onClick, children }) {
  return (
    <div onClick={onClick}>
      {children || <button className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold">Cancel</button>}
    </div>
  );
}
