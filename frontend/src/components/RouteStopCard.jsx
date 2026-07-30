import React, { useState } from 'react';
import { MapPin, Clock, Navigation, CheckCircle2, Sparkles, Volume2 } from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function RouteStopCard({ stop, onStatusChange, onExplainRisk }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTextToSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `Stop number ${stop.sequence}. Patient ${stop.patient_name} in ${stop.village}. Risk category ${stop.risk_band}, score ${stop.risk_score}. Estimated arrival ${stop.estimated_arrival}.`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const isVisited = stop.status === 'visited';

  return (
    <div className={`p-4 rounded-2xl border transition-all duration-200 ${
      stop.is_emergency
        ? 'bg-red-50 border-red-400 shadow-md animate-pulse'
        : isVisited
        ? 'bg-slate-50 border-slate-200 opacity-80'
        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
    }`}>
      {/* Top Header: Sequence #, Name, Risk Badge */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs text-white shrink-0 ${
            stop.is_emergency
              ? 'bg-red-600 shadow-md shadow-red-600/50'
              : isVisited
              ? 'bg-emerald-600 text-white'
              : 'bg-blue-600'
          }`}>
            {stop.is_emergency ? '🚨' : `#${stop.sequence}`}
          </div>

          <div>
            <h4 className={`font-bold text-sm leading-snug ${isVisited ? 'line-through text-slate-400' : 'text-slate-900'}`}>
              {stop.patient_name}
            </h4>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" /> {stop.village}
            </span>
          </div>
        </div>

        <RiskBadge band={stop.risk_band} score={stop.risk_score} />
      </div>

      {/* ETA & Distance Row */}
      <div className="grid grid-cols-2 gap-2 my-2 py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>ETA: <strong className="text-slate-900">{stop.estimated_arrival}</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
          <Navigation className="w-3.5 h-3.5 text-indigo-600" />
          <span>Distance: <strong className="text-slate-900">{stop.distance_km} km</strong></span>
        </div>
      </div>

      {/* Actions & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1">
          {/* AI Explanation Button */}
          <button
            onClick={() => onExplainRisk(stop.patient_id)}
            className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AI Rationale
          </button>

          {/* Text-To-Speech Button */}
          <button
            onClick={handleTextToSpeech}
            className={`p-1.5 rounded-lg border text-xs ${
              isSpeaking ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse' : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200'
            }`}
            title="Read instructions out loud"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>

          {/* Turn-by-Turn Navigation */}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${stop.latitude},${stop.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-blue-600 border border-slate-200"
            title="Open Google Maps Directions"
          >
            <Navigation className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Visit Status Toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onStatusChange(stop.stop_id, isVisited ? 'scheduled' : 'visited')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              isVisited
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> {isVisited ? 'Visited' : 'Mark Visited'}
          </button>
        </div>
      </div>
    </div>
  );
}
