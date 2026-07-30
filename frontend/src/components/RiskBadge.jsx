import React from 'react';
import { AlertTriangle, ShieldAlert, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RiskBadge({ band, score, showScore = true }) {
  const getStyle = () => {
    switch (band?.toLowerCase()) {
      case 'critical':
        return {
          bg: 'bg-red-500/15 text-red-400 border-red-500/30',
          icon: <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />,
          dot: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
        };
      case 'high':
        return {
          bg: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />,
          dot: 'bg-orange-500'
        };
      case 'moderate':
        return {
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          icon: <AlertCircle className="w-3.5 h-3.5 text-amber-400" />,
          dot: 'bg-amber-500'
        };
      case 'low':
      default:
        return {
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
          dot: 'bg-emerald-500'
        };
    }
  };

  const style = getStyle();

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg}`}>
      <span className={`w-2 h-2 rounded-full ${style.dot}`} />
      {style.icon}
      <span>{band}</span>
      {showScore && score !== undefined && (
        <span className="ml-1 opacity-75 font-mono">({score})</span>
      )}
    </span>
  );
}
