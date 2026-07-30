import React, { useState } from 'react';
import { UserPlus, X, Sparkles, MapPin } from 'lucide-react';

export default function RegisterPatientModal({ isOpen, onClose, onRegister }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(25);
  const [village, setVillage] = useState('Ramanthapur Sector 1');
  const [isPregnant, setIsPregnant] = useState(true);
  const [trimester, setTrimester] = useState(3);
  const [highRisk, setHighRisk] = useState(true);
  const [vaccineStatus, setVaccineStatus] = useState('due');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `pat_${Math.floor(100 + Math.random() * 900)}`;

    // Compute synthetic risk score
    let score = 25;
    if (highRisk) score += 35;
    if (trimester === 3) score += 25;
    if (vaccineStatus === 'overdue') score += 15;
    score = Math.min(Math.max(score, 10), 100);

    let band = 'Low';
    if (score >= 80) band = 'Critical';
    else if (score >= 60) band = 'High';
    else if (score >= 35) band = 'Moderate';

    onRegister({
      patient_id: newId,
      name,
      age: Number(age),
      gender: 'female',
      village,
      latitude: 17.3980 + (Math.random() * 0.015 - 0.007),
      longitude: 78.5400 + (Math.random() * 0.015 - 0.007),
      is_pregnant: isPregnant,
      trimester: isPregnant ? Number(trimester) : 0,
      high_risk_pregnancy: isPregnant ? highRisk : false,
      newborn_age_days: 0,
      vaccination_status: vaccineStatus,
      days_overdue: vaccineStatus === 'overdue' ? 7 : 0,
      chronic_disease_flags: highRisk ? ['anemia'] : [],
      previous_missed_visits: 0,
      visit_type: 'anc_checkup',
      last_visit_days_ago: 10,
      risk_score: score,
      risk_band: band,
      assigned_worker_id: 'usr_w101'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-sky-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Register New Patient</h3>
              <p className="text-xs text-sky-400 font-medium">PHC Ramanthapur Catchment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              placeholder="e.g. Radhika Sharma"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Age</label>
              <input
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Village / Sector</label>
              <select
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-sky-500 focus:outline-none"
              >
                <option value="Ramanthapur Sector 1">Ramanthapur Sector 1</option>
                <option value="Uppal Main Road">Uppal Main Road</option>
                <option value="Habsiguda Colony">Habsiguda Colony</option>
                <option value="Ramanthapur East">Ramanthapur East</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <label className="flex items-center gap-2 text-white font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={isPregnant}
                onChange={(e) => setIsPregnant(e.target.checked)}
                className="w-4 h-4 accent-sky-500 rounded"
              />
              Pregnant Patient
            </label>

            {isPregnant && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-slate-400 block mb-1">Trimester</label>
                  <select
                    value={trimester}
                    onChange={(e) => setTrimester(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-white"
                  >
                    <option value={1}>1st Trimester</option>
                    <option value={2}>2nd Trimester</option>
                    <option value={3}>3rd Trimester</option>
                  </select>
                </div>

                <div className="flex items-center pt-3">
                  <label className="flex items-center gap-1.5 text-red-400 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={highRisk}
                      onChange={(e) => setHighRisk(e.target.checked)}
                      className="w-4 h-4 accent-red-500 rounded"
                    />
                    High-Risk Pregnancy
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-sky-600/30">
              <Sparkles className="w-4 h-4" /> Save & Compute Risk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
