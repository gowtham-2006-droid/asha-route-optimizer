import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RouteMap from './components/RouteMap';
import RouteStopCard from './components/RouteStopCard';
import EmergencyModal from './components/EmergencyModal';
import AIExplanationModal from './components/AIExplanationModal';
import SupervisorDashboard from './components/SupervisorDashboard';
import ReportModal from './components/ReportModal';
import PatientManagement from './components/PatientManagement';
import RegisterPatientModal from './components/RegisterPatientModal';
import PatientDetailModal from './components/PatientDetailModal';
import PhoneOTPLogin from './components/PhoneOTPLogin';
import { MOCK_WORKER, MOCK_ROUTE_STOPS, MOCK_PATIENTS } from './services/mockData';
import { MapPin, Navigation, Clock, CheckCircle2, AlertOctagon, UserCheck } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('asha_user_profile');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activeRole, setActiveRole] = useState(() => currentUser?.role || 'asha_worker');
  const [activeTab, setActiveTab] = useState('route'); // 'route' | 'patients'
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [stops, setStops] = useState(MOCK_ROUTE_STOPS);

  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [explainPatientId, setExplainPatientId] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedPatientDetail, setSelectedPatientDetail] = useState(null);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (currentUser?.role) {
      setActiveRole(currentUser.role);
    }
  }, [currentUser]);

  const showToast = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Login handler
  const handleLoginSuccess = (userProfile) => {
    setCurrentUser(userProfile);
    setActiveRole(userProfile.role);
    showToast(`Welcome ${userProfile.name}! Authentication verified via Phone OTP.`, 'success');
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('asha_jwt_token');
    localStorage.removeItem('asha_user_profile');
    setCurrentUser(null);
    showToast('Session logged out successfully', 'info');
  };

  // Handle visit status updates
  const handleStatusChange = (stopId, newStatus) => {
    setStops(prev => prev.map(s => s.stop_id === stopId ? { ...s, status: newStatus } : s));
    showToast(`Visit status updated to ${newStatus.toUpperCase()}`, 'success');
  };

  // Handle clinical risk simulation updates from Patient Management
  const handleUpdatePatient = (updatedPatient) => {
    setPatients(prev => prev.map(p => p.patient_id === updatedPatient.patient_id ? updatedPatient : p));

    setStops(prevStops => {
      const updatedList = prevStops.map(s => {
        if (s.patient_id === updatedPatient.patient_id) {
          return {
            ...s,
            risk_score: updatedPatient.risk_score,
            risk_band: updatedPatient.risk_band
          };
        }
        return s;
      });

      const sorted = [...updatedList].sort((a, b) => b.risk_score - a.risk_score);
      return sorted.map((stop, idx) => ({ ...stop, sequence: idx + 1 }));
    });

    showToast(`✨ ML Risk Score recalculated for ${updatedPatient.name} (${updatedPatient.risk_score}/100 — ${updatedPatient.risk_band}). Route re-ordered!`, 'success');
  };

  // Register new patient
  const handleRegisterNewPatient = (newPatient) => {
    setPatients(prev => [newPatient, ...prev]);

    if (newPatient.risk_score >= 60) {
      const newStop = {
        sequence: 1,
        stop_id: `stp_${Date.now()}`,
        patient_id: newPatient.patient_id,
        patient_name: newPatient.name,
        village: newPatient.village,
        latitude: newPatient.latitude,
        longitude: newPatient.longitude,
        visit_type: newPatient.visit_type,
        estimated_arrival: '09:30 AM',
        estimated_departure: '09:55 AM',
        travel_time_minutes: 10,
        distance_km: 1.8,
        risk_score: newPatient.risk_score,
        risk_band: newPatient.risk_band,
        status: 'scheduled',
        is_emergency: false
      };

      setStops(prev => [newStop, ...prev].map((s, idx) => ({ ...s, sequence: idx + 1 })));
    }

    showToast(`Patient ${newPatient.name} registered. Risk Score: ${newPatient.risk_score} (${newPatient.risk_band})`, 'success');
  };

  // Simulate Emergency Dispatch & OR-Tools Re-routing
  const handleSimulateEmergency = (emergencyData) => {
    const emergencyStop = {
      sequence: 1,
      stop_id: `stp_emergency_${Date.now()}`,
      patient_id: "pat_emergency_99",
      patient_name: emergencyData.patient_name || "Kavitha Sharma",
      village: "Ramanthapur Central",
      latitude: 17.3990,
      longitude: 78.5410,
      visit_type: "pnc_checkup",
      estimated_arrival: "09:55 AM",
      estimated_departure: "10:35 AM",
      travel_time_minutes: 8,
      distance_km: 1.5,
      risk_score: emergencyData.severity || 98,
      risk_band: "Critical",
      status: "scheduled",
      is_emergency: true
    };

    const updatedStops = [
      emergencyStop,
      ...stops.map(s => ({
        ...s,
        sequence: s.sequence + 1,
        status: s.risk_band === 'Low' ? 'missed' : s.status
      }))
    ];

    setStops(updatedStops);
    showToast("🚨 EMERGENCY DISPATCHED: Google OR-Tools re-routed Lakshmi Devi to Stop #1!", "emergency");
  };

  // Reset demo route
  const handleResetRoute = () => {
    setStops(MOCK_ROUTE_STOPS);
    setPatients(MOCK_PATIENTS);
    showToast("Route sequence reset to initial baseline schedule", "info");
  };

  // Render Phone OTP Login Screen if unauthenticated
  if (!currentUser) {
    return <PhoneOTPLogin onLoginSuccess={handleLoginSuccess} />;
  }

  const completedCount = stops.filter(s => s.status === 'visited').length;
  const totalKm = stops.reduce((acc, s) => acc + s.distance_km, 0).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification Banner */}
      {notification && (
        <div className={`fixed top-16 right-4 z-50 px-4 py-2.5 rounded-2xl shadow-2xl border text-xs font-semibold flex items-center gap-2 animate-bounce ${
          notification.type === 'emergency'
            ? 'bg-red-600 text-white border-red-400 shadow-red-900/50'
            : notification.type === 'success'
            ? 'bg-emerald-600 text-white border-emerald-400'
            : 'bg-indigo-600 text-white border-indigo-400'
        }`}>
          {notification.type === 'emergency' ? <AlertOctagon className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          {notification.msg}
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        currentUser={currentUser}
        onLogout={handleLogout}
        onTriggerEmergency={() => setIsEmergencyOpen(true)}
        onResetRoute={handleResetRoute}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeRole === 'asha_worker' ? (
          <div className="space-y-6">
            {/* View Sub-Tabs: Today's Route vs Patient Management */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab('route')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'route'
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Navigation className="w-4 h-4" /> Today's Route & Map
              </button>

              <button
                onClick={() => setActiveTab('patients')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'patients'
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <UserCheck className="w-4 h-4" /> Patient Directory & Risk Simulator
              </button>
            </div>

            {activeTab === 'route' ? (
              <div className="space-y-6">
                {/* Worker Summary Header */}
                <div className="p-4 sm:p-6 rounded-3xl glass-panel flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-white">Today's Optimized Route</h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                        Live VRPTW Solver Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-2">
                      <span>Assigned Worker: <strong>{currentUser.name}</strong></span> •
                      <span>Sector: <strong>{MOCK_WORKER.assigned_village}</strong></span>
                    </p>
                  </div>

                  {/* Route Metrics */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex-1 md:flex-none px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Distance</span>
                      <span className="text-sm font-bold text-sky-400 flex items-center justify-center gap-1">
                        <Navigation className="w-3.5 h-3.5" /> {totalKm} km
                      </span>
                    </div>

                    <div className="flex-1 md:flex-none px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Est. Duration</span>
                      <span className="text-sm font-bold text-indigo-400 flex items-center justify-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 3h 30m
                      </span>
                    </div>

                    <div className="flex-1 md:flex-none px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Progress</span>
                      <span className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {completedCount}/{stops.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Split Screen: Left Route List, Right Interactive Map */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Route Sequence Stops List */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                        Sequence Stops ({stops.length})
                      </h3>
                      <span className="text-xs text-slate-400">Risk Priority Ordered</span>
                    </div>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                      {stops.map(stop => (
                        <RouteStopCard
                          key={stop.stop_id}
                          stop={stop}
                          onStatusChange={handleStatusChange}
                          onExplainRisk={(pid) => setExplainPatientId(pid)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Interactive Leaflet Route Map */}
                  <div className="lg:col-span-7 h-[500px] lg:h-auto">
                    <RouteMap
                      stops={stops}
                      workerLocation={MOCK_WORKER.current_location}
                      onExplainRisk={(pid) => setExplainPatientId(pid)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Patient Directory & Live Clinical Risk Simulator */
              <PatientManagement
                patients={patients}
                onUpdatePatient={handleUpdatePatient}
                onSelectPatient={(p) => setSelectedPatientDetail(p)}
                onRegisterNewPatient={() => setIsRegisterOpen(true)}
              />
            )}
          </div>
        ) : (
          /* Supervisor Analytics Command Dashboard */
          <SupervisorDashboard onGenerateReport={() => setIsReportOpen(true)} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-3 text-center text-xs text-slate-500">
        Idea2Impact 2026 — ASHA Route Optimizer AI • Built with React, FastAPI, OR-Tools & Gemini
      </footer>

      {/* Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onSimulateEmergency={handleSimulateEmergency}
      />

      <AIExplanationModal
        patientId={explainPatientId}
        onClose={() => setExplainPatientId(null)}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      <RegisterPatientModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegister={handleRegisterNewPatient}
      />

      <PatientDetailModal
        patient={selectedPatientDetail}
        onClose={() => setSelectedPatientDetail(null)}
      />
    </div>
  );
}
