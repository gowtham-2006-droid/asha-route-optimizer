import React, { useState } from 'react';
import { Search, Filter, Plus, UserCheck, ShieldAlert, Sparkles, Activity, MapPin, Eye, Edit3, RefreshCw, Upload } from 'lucide-react';
import RiskBadge from './RiskBadge';
import BatchPatientUploadModal from './BatchPatientUploadModal';

export default function PatientManagement({ patients, onUpdatePatient, onSelectPatient, onRegisterNewPatient, onBatchImport }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRiskBand, setFilterRiskBand] = useState('ALL');
  const [filterVillage, setFilterVillage] = useState('ALL');
  const [editingPatient, setEditingPatient] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Extract unique villages
  const villages = ['ALL', ...new Set(patients.map(p => p.village))];

  // Filter patients based on search and filters
  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.patient_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.village.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRiskBand === 'ALL' || p.risk_band?.toUpperCase() === filterRiskBand;
    const matchesVillage = filterVillage === 'ALL' || p.village === filterVillage;
    return matchesSearch && matchesRisk && matchesVillage;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="p-6 rounded-3xl glass-panel space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Patient Management Directory <UserCheck className="w-5 h-5 text-sky-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              PHC Ramanthapur Catchment Area • {patients.length} Registered Patients
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <Upload className="w-4 h-4 text-sky-400" /> Upload CSV Batch
            </button>

            <button
              onClick={onRegisterNewPatient}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-sky-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" /> Register Patient
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by patient name, ID, or village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Risk Band Filter */}
          <div className="sm:col-span-3">
            <select
              value={filterRiskBand}
              onChange={(e) => setFilterRiskBand(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-xs focus:border-sky-500 focus:outline-none"
            >
              <option value="ALL">All Risk Bands</option>
              <option value="CRITICAL">🔴 Critical Only</option>
              <option value="HIGH">🟠 High Only</option>
              <option value="MODERATE">🟡 Moderate Only</option>
              <option value="LOW">🟢 Low Only</option>
            </select>
          </div>

          {/* Village Filter */}
          <div className="sm:col-span-3">
            <select
              value={filterVillage}
              onChange={(e) => setFilterVillage(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-xs focus:border-sky-500 focus:outline-none"
            >
              {villages.map(v => (
                <option key={v} value={v}>{v === 'ALL' ? 'All Villages' : v}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Patient Master Table */}
      <div className="rounded-2xl glass-card overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Patient Info</th>
                <th className="p-3.5">Village / Sector</th>
                <th className="p-3.5">Maternal & Infant Status</th>
                <th className="p-3.5">Vaccination & Overdue</th>
                <th className="p-3.5">ML Risk Score</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPatients.map((patient) => (
                <tr key={patient.patient_id} className="hover:bg-slate-800/40 transition-colors">
                  {/* Name & ID */}
                  <td className="p-3.5">
                    <div>
                      <span className="font-bold text-white text-sm block">{patient.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{patient.patient_id} • Age {patient.age} ({patient.gender})</span>
                    </div>
                  </td>

                  {/* Village */}
                  <td className="p-3.5">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" /> {patient.village}
                    </span>
                  </td>

                  {/* Maternal Status */}
                  <td className="p-3.5">
                    {patient.is_pregnant ? (
                      <div className="space-y-0.5">
                        <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30 text-[10px] font-semibold">
                          Pregnant (Trimester {patient.trimester})
                        </span>
                        {patient.high_risk_pregnancy && (
                          <span className="block text-[10px] text-red-400 font-bold">⚠️ High-Risk Pregnancy</span>
                        )}
                      </div>
                    ) : patient.newborn_age_days > 0 ? (
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold">
                        Newborn ({patient.newborn_age_days} days old)
                      </span>
                    ) : (
                      <span className="text-slate-500">General Care</span>
                    )}
                  </td>

                  {/* Vaccination & Overdue */}
                  <td className="p-3.5">
                    <div className="space-y-0.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        patient.vaccination_status === 'overdue' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        Vaccine: {patient.vaccination_status.replace('_', ' ')}
                      </span>
                      {patient.days_overdue > 0 && (
                        <span className="block text-[10px] text-amber-400 font-medium">{patient.days_overdue} days overdue</span>
                      )}
                    </div>
                  </td>

                  {/* Risk Badge */}
                  <td className="p-3.5">
                    <RiskBadge band={patient.risk_band} score={patient.risk_score} />
                  </td>

                  {/* Actions */}
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => onSelectPatient(patient)}
                      className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/20 text-xs font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5 inline mr-1" /> View
                    </button>

                    <button
                      onClick={() => setEditingPatient(patient)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 text-xs font-semibold"
                    >
                      <RefreshCw className="w-3.5 h-3.5 inline mr-1" /> Simulate AI
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Risk Simulator Modal */}
      {editingPatient && (
        <ClinicalRiskSimulatorModal
          patient={editingPatient}
          onClose={() => setEditingPatient(null)}
          onSave={(updated) => {
            onUpdatePatient(updated);
            setEditingPatient(null);
          }}
        />
      )}

      {/* Bulk CSV Upload Modal */}
      <BatchPatientUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onBatchImport={onBatchImport}
      />
    </div>
  );
}

// Subcomponent: Live Clinical Risk Simulator Modal
function ClinicalRiskSimulatorModal({ patient, onClose, onSave }) {
  const [isPregnant, setIsPregnant] = useState(patient.is_pregnant);
  const [trimester, setTrimester] = useState(patient.trimester);
  const [highRiskPregnancy, setHighRiskPregnancy] = useState(patient.high_risk_pregnancy);
  const [vaccinationStatus, setVaccinationStatus] = useState(patient.vaccination_status);
  const [daysOverdue, setDaysOverdue] = useState(patient.days_overdue);
  const [previousMissed, setPreviousMissed] = useState(patient.previous_missed_visits);
  const [hasAnemia, setHasAnemia] = useState(patient.chronic_disease_flags?.includes('anemia') || false);

  const calculateSimulatedScore = () => {
    let score = 0;
    if (highRiskPregnancy) score += 30;
    if (trimester === 3) score += 25;
    else if (trimester === 2) score += 10;

    if (vaccinationStatus === 'overdue') score += 15;
    score += Math.min(daysOverdue, 30) * 1.0;
    score += Math.min(previousMissed, 3) * 10;
    if (hasAnemia) score += 15;

    score = Math.min(Math.max(Math.round(score), 10), 100);

    let band = 'Low';
    if (score >= 80) band = 'Critical';
    else if (score >= 60) band = 'High';
    else if (score >= 35) band = 'Moderate';

    return { score, band };
  };

  const simulated = calculateSimulatedScore();

  const handleApply = () => {
    const chronic = [];
    if (hasAnemia) chronic.push('anemia');

    onSave({
      ...patient,
      is_pregnant: isPregnant,
      trimester: isPregnant ? trimester : 0,
      high_risk_pregnancy: isPregnant ? highRiskPregnancy : false,
      vaccination_status: vaccinationStatus,
      days_overdue: Number(daysOverdue),
      previous_missed_visits: Number(previousMissed),
      chronic_disease_flags: chronic,
      risk_score: simulated.score,
      risk_band: simulated.band
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-sky-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Live ML Risk Simulator</h3>
              <p className="text-xs text-sky-400 font-medium">Patient: {patient.name} ({patient.patient_id})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800">✕</button>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 mb-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Simulated Risk Score</span>
            <span className="text-2xl font-bold text-white">{simulated.score}/100</span>
          </div>
          <RiskBadge band={simulated.band} score={simulated.score} />
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
            <label className="flex items-center gap-2 text-white font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={isPregnant}
                onChange={(e) => setIsPregnant(e.target.checked)}
                className="w-4 h-4 accent-sky-500 rounded"
              />
              Is Pregnant Patient?
            </label>

            {isPregnant && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-slate-400 block mb-1">Trimester</label>
                  <select
                    value={trimester}
                    onChange={(e) => setTrimester(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-white"
                  >
                    <option value={1}>1st Trimester</option>
                    <option value={2}>2nd Trimester (+10)</option>
                    <option value={3}>3rd Trimester (+25)</option>
                  </select>
                </div>

                <div className="flex items-center pt-4">
                  <label className="flex items-center gap-1.5 text-red-400 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={highRiskPregnancy}
                      onChange={(e) => setHighRiskPregnancy(e.target.checked)}
                      className="w-4 h-4 accent-red-500 rounded"
                    />
                    High-Risk Flag (+30)
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Vaccination Status</label>
              <select
                value={vaccinationStatus}
                onChange={(e) => setVaccinationStatus(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
              >
                <option value="up_to_date">Up To Date</option>
                <option value="due">Due Soon</option>
                <option value="overdue">Overdue (+15)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Days Overdue Visit</label>
              <input
                type="number"
                min={0}
                max={60}
                value={daysOverdue}
                onChange={(e) => setDaysOverdue(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <label className="flex items-center gap-2 text-amber-400 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={hasAnemia}
                onChange={(e) => setHasAnemia(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded"
              />
              Flag Severe Anemia (+15 points)
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-5 border-t border-slate-800 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold">Cancel</button>
          <button
            onClick={handleApply}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Recalculate Risk & Re-Order Route
          </button>
        </div>
      </div>
    </div>
  );
}
