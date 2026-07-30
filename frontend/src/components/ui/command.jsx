import React, { useState } from 'react';
import { Search, Command as CommandIcon, X } from 'lucide-react';

export function Command({ children, className = '' }) {
  return (
    <div className={`w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {children}
    </div>
  );
}

export function CommandInput({ placeholder = "Type a command or search...", value, onChange, className = '' }) {
  return (
    <div className="flex items-center border-b border-slate-800 px-3.5 py-2.5">
      <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none ${className}`}
      />
    </div>
  );
}

export function CommandList({ children, className = '' }) {
  return (
    <div className={`max-h-72 overflow-y-auto p-1.5 space-y-1 ${className}`}>
      {children}
    </div>
  );
}

export function CommandEmpty({ children = "No results found.", className = '' }) {
  return (
    <div className={`py-6 text-center text-xs text-slate-500 ${className}`}>
      {children}
    </div>
  );
}

export function CommandGroup({ heading, children, className = '' }) {
  return (
    <div className={`py-1 ${className}`}>
      {heading && (
        <span className="px-2 py-1 block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          {heading}
        </span>
      )}
      {children}
    </div>
  );
}

export function CommandItem({ children, onSelect, className = '' }) {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors ${className}`}
    >
      {children}
    </div>
  );
}

export function CommandSeparator({ className = '' }) {
  return <div className={`h-px bg-slate-800 my-1 ${className}`} />;
}

export function CommandShortcut({ children, className = '' }) {
  return (
    <span className={`text-[10px] font-mono text-slate-500 tracking-widest ${className}`}>
      {children}
    </span>
  );
}

export function CommandDialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-lg w-full relative">
        <button onClick={onClose} className="absolute right-3 top-3 z-10 text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
        <Command>{children}</Command>
      </div>
    </div>
  );
}
