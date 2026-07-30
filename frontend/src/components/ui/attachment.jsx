import React from 'react';
import { FileText, X } from 'lucide-react';

export function Attachment({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-between p-3 bg-slate-950/80 border border-slate-800 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

export function AttachmentMedia({ children, className = '' }) {
  return (
    <div className={`w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center mr-3 ${className}`}>
      {children || <FileText className="w-5 h-5" />}
    </div>
  );
}

export function AttachmentContent({ children, className = '' }) {
  return (
    <div className={`flex-1 min-w-0 ${className}`}>
      {children}
    </div>
  );
}

export function AttachmentTitle({ children, className = '' }) {
  return (
    <h4 className={`text-xs font-bold text-white truncate ${className}`}>
      {children}
    </h4>
  );
}

export function AttachmentDescription({ children, className = '' }) {
  return (
    <p className={`text-[10px] text-slate-400 truncate ${className}`}>
      {children}
    </p>
  );
}

export function AttachmentActions({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-1 ml-2 ${className}`}>
      {children}
    </div>
  );
}

export function AttachmentAction({ children, onClick, 'aria-label': ariaLabel, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${className}`}
    >
      {children || <X className="w-4 h-4" />}
    </button>
  );
}
