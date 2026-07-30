import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export function Calendar({ selectedDate, onSelectDate, className = '' }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 6, 30)); // July 2026

  const daysInMonth = 31;
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className={`p-4 bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xs shadow-xl font-sans ${className}`}>
      {/* Month Header */}
      <div className="flex items-center justify-between mb-3 text-xs font-bold text-white">
        <span className="flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4 text-sky-400" /> July 2026
        </span>
        <div className="flex items-center gap-1 text-slate-400">
          <button className="p-1 hover:text-white rounded"><ChevronLeft className="w-4 h-4" /></button>
          <button className="p-1 hover:text-white rounded"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-500 mb-2">
        <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {dates.map((day) => {
          const isToday = day === 30;
          const isSelected = selectedDate === day;
          return (
            <button
              key={day}
              onClick={() => onSelectDate && onSelectDate(day)}
              className={`h-7 w-7 mx-auto rounded-lg flex items-center justify-center font-semibold transition-all ${
                isSelected
                  ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/30'
                  : isToday
                  ? 'bg-slate-800 text-sky-400 border border-sky-500/40 font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
