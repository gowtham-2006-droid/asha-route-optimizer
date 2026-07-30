import React from 'react';

export default function RiskBadge({ band = 'Moderate', score }) {
  const normalizedBand = band?.toUpperCase() || 'MODERATE';

  let badgeStyle = 'bg-slate-700 text-white';
  let dotColor = 'bg-slate-300';
  let label = 'Low Risk';

  if (normalizedBand === 'CRITICAL') {
    badgeStyle = 'bg-red-600 text-white shadow-sm shadow-red-600/30';
    dotColor = 'bg-white animate-pulse';
    label = 'CRITICAL';
  } else if (normalizedBand === 'HIGH') {
    badgeStyle = 'bg-orange-600 text-white shadow-sm shadow-orange-600/30';
    dotColor = 'bg-white';
    label = 'HIGH RISK';
  } else if (normalizedBand === 'MODERATE') {
    badgeStyle = 'bg-amber-600 text-white shadow-sm shadow-amber-600/30';
    dotColor = 'bg-white';
    label = 'MODERATE';
  } else if (normalizedBand === 'LOW') {
    badgeStyle = 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30';
    dotColor = 'bg-white';
    label = 'ROUTINE LOW';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wide ${badgeStyle}`}>
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      <span>{label}</span>
      {score !== undefined && (
        <span className="ml-1 pl-1.5 border-l border-white/40 font-mono text-[10px]">
          {score}
        </span>
      )}
    </span>
  );
}
