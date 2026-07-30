import React, { useState } from 'react';
import { Search, Plus, UserCheck, MapPin, Eye, RefreshCw, Upload } from 'lucide-react';
import RiskBadge from './RiskBadge';
import BatchPatientUploadModal from './BatchPatientUploadModal';

export default function PatientManagement({ patients, onUpdatePatient, onSelectPatient, onRegisterNewPatient, onBatchImport }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRiskBand, setFilterRiskBand] = useState('ALL');
  const [filterVillage, setFilterVillage] = useState('ALL');
  const [editingPatient, setEditingPatient] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const villages = ['ALL', ...new Set(patients.map(p => p.village))];

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
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Patient Care Directory <UserCheck className="w-5 h-5 text-blue-600" />
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              PHC Ramanthapur Catchment Area • {patients.length} Registered Patients
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Upload className="w-4 h-4 text-blue-600" /> Upload CSV Batch
            </button>

            <button
              onClick={onRegisterNewPatient}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" /> Register Patient
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by patient name, ID, or village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          {/* Risk Band Filter */}
          <div className="sm:col-span-3">
            <select
              value={filterRiskBand}
              onChange={(e) => setFilterRiskBand(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-medium focus:border-blue-600 focus:outline-none"
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
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-medium focus:border-blue-600 focus:outline-none"
            >
              {villages.map(v => (
                <option key={v} value={v}>{v === 'ALL' ? 'All Villages' : v}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Patient Master Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5">Patient Info</th>
                <th className="p-3.5">Village / Sector</th>
                <th className="p-3.5">Maternal & Infant Status</th>
                <th className="p-3.5">Vaccination & Overdue</th>
                <th className="p-3.5">ML Risk Score</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.patient_id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">{patient.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{patient.patient_id} • Age {patient.age} ({patient.gender})</span>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {patient.village}
                    </span>
                  </td>

                  <td className="p-3.5">
                    {patient.is_pregnant ? (
                      <div className="space-y-0.5">
                        <span className="px-2 py-0.5 rounded bg-pink-100 text-pink-800 border border-pink-300 text-[10px] font-bold">
                          Pregnant (Trimester {patient.trimester})
                        </span>
                        {patient.high_risk_pregnancy && (
                          <span className="block text-[10px] text-red-600 font-bold">⚠️ High-Risk Pregnancy</span>
                        )}
                      </div>
                    ) : patient.newborn_age_days > 0 ? (
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-300 text-[10px] font-bold">
                        Newborn ({patient.newborn_age_days} days old)
                      </span>
                    ) : (
                      <span className="text-slate-500">General Care</span>
                    )}
                  </td>

                  <td className="p-3.5">
                    <div className="space-y-0.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        patient.vaccination_status === 'overdue' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-slate-100 text-slate-700'
                      }`}>
                        Vaccine: {patient.vaccination_status.replace('_', ' ')}
                      </span>
                      {patient.days_overdue > 0 && (
                        <span className="block text-[10px] text-amber-700 font-bold">{patient.days_overdue} days overdue</span>
                      )}
                    </div>
                  </td>

                  <td className="p-3.5">
                    <RiskBadge band={patient.risk_band} score={patient.risk_score} />
                  </td>

                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => onSelectPatient(patient)}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold"
                    >
                      <Eye className="w-3.5 h-3.5 inline mr-1" /> View
                    </button>

                    <button
                      onClick={() => setEditingPatient(patient)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300 text-xs font-bold"
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

      <BatchPatientUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onBatchImport={onBatchImport}
      />
    </div>
  );
}

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Live ML Risk Simulator</h3>
            <p className="text-xs text-blue-600 font-semibold">Patient: {patient.name} ({patient.patient_id})</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100">✕</button>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Simulated Risk Score</span>
            <span className="text-2xl font-bold text-slate-900">{simulated.score}/100</span>
          </div>
          <RiskBadge band={simulated.band} score={simulated.score} />
        </div>

        <div className="space-y-4 text-xs text-slate-700">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <label className="flex items-center gap-2 text-slate-900 font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={isPregnant}
                onChange={(e) => setIsPregnant(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              Is Pregnant Patient?
            </label>

            {isPregnant && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-slate-600 block mb-1 font-semibold">Trimester</label>
                  <select
                    value={trimester}
                    onChange={(e) => setTrimester(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-slate-900"
                  >
                    <option value={1}>1st Trimester</option>
                    <option value={2}>2nd Trimester (+10)</option>
                    <option value={3}>3rd Trimester (+25)</option>
                  </select>
                </div>

                <div className="flex items-center pt-4">
                  <label className="flex items-center gap-1.5 text-red-600 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={highRiskPregnancy}
                      onChange={(e) => setHighRiskPregnancy(e.target.checked)}
                      className="w-4 h-4 accent-red-600 rounded"
                    />
                    High-Risk Flag (+30)
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">Cancel</button>
          <button
            onClick={handleApply}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30"
          >
            Recalculate Risk & Re-Order Route
          </button>
        </div>
      </div>
    </div>
  );
}
