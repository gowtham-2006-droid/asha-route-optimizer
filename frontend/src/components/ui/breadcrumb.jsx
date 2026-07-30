import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb({ children, className = '' }) {
  return (
    <nav className={`flex items-center gap-1.5 text-xs text-slate-400 font-medium ${className}`}>
      {children}
    </nav>
  );
}

export function BreadcrumbItem({ children, isCurrent = false, className = '' }) {
  return (
    <div className={`flex items-center gap-1.5 ${isCurrent ? 'text-white font-bold' : 'hover:text-slate-200 cursor-pointer'} ${className}`}>
      {children}
    </div>
  );
}

export function BreadcrumbSeparator() {
  return <ChevronRight className="w-3.5 h-3.5 text-slate-600" />;
}
