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

// Custom UI Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from './components/ui/breadcrumb';
import { Calendar } from './components/ui/calendar';
import { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerContent, DrawerFooter, DrawerClose } from './components/ui/drawer';
import { CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty } from './components/ui/command';
import { Pagination } from './components/ui/pagination';
import { Sidebar } from './components/ui/sidebar';
import RiskBadge from './components/RiskBadge';

import { MapPin, Navigation, Clock, CheckCircle2, AlertOctagon, UserCheck, Search, Sparkles, Home } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('asha_user_profile');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activeRole, setActiveRole] = useState(() => currentUser?.role || 'asha_worker');
  const [activeTab, setActiveTab] = useState('route');
  const [selectedDate, setSelectedDate] = useState(30);

  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [stops, setStops] = useState(MOCK_ROUTE_STOPS);

  // UI Drawer & Modal States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerPatient, setDrawerPatient] = useState(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

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

  // Keyboard shortcut Ctrl+K for Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLoginSuccess = (userProfile) => {
    setCurrentUser(userProfile);
    setActiveRole(userProfile.role);
    showToast(`Welcome ${userProfile.name}! Authentication verified via Phone OTP.`, 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('asha_jwt_token');
    localStorage.removeItem('asha_user_profile');
    setCurrentUser(null);
    showToast('Session logged out successfully', 'info');
  };

  const handleStatusChange = (stopId, newStatus) => {
    setStops(prev => prev.map(s => s.stop_id === stopId ? { ...s, status: newStatus } : s));
    showToast(`Visit status updated to ${newStatus.toUpperCase()}`, 'success');
  };

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

  const handleBatchImport = (importedPatients) => {
    setPatients(prev => [...importedPatients, ...prev]);

    const newStops = importedPatients.map((p, idx) => ({
      sequence: idx + 1,
      stop_id: `stp_csv_${Date.now()}_${idx}`,
      patient_id: p.patient_id,
      patient_name: p.name,
      village: p.village,
      latitude: p.latitude,
      longitude: p.longitude,
      visit_type: p.visit_type,
      estimated_arrival: '10:00 AM',
      estimated_departure: '10:25 AM',
      travel_time_minutes: 15,
      distance_km: 2.4,
      risk_score: p.risk_score,
      risk_band: p.risk_band,
      status: 'scheduled',
      is_emergency: false
    }));

    setStops(prev => [...newStops, ...prev].map((s, idx) => ({ ...s, sequence: idx + 1 })));
    showToast(`✨ CSV Batch Ingested: ${importedPatients.length} patients scored and added to map!`, 'success');
  };

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

  const handleResetRoute = () => {
    setStops(MOCK_ROUTE_STOPS);
    setPatients(MOCK_PATIENTS);
    showToast("Route sequence reset to initial baseline schedule", "info");
  };

  const openRightDrawer = (patientId) => {
    const p = patients.find(pat => pat.patient_id === patientId) || patients[0];
    setDrawerPatient(p);
    setIsDrawerOpen(true);
  };

  if (!currentUser) {
    return <PhoneOTPLogin onLoginSuccess={handleLoginSuccess} />;
  }

  const completedCount = stops.filter(s => s.status === 'visited').length;
  const totalKm = stops.reduce((acc, s) => acc + s.distance_km, 0).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Banner */}
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

      {/* Header */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        onTriggerEmergency={() => setIsEmergencyOpen(true)}
        onResetRoute={handleResetRoute}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      {/* Sub-Header Breadcrumb & Command Bar */}
      <div className="bg-slate-900/40 border-b border-slate-800/80 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
          <Breadcrumb>
            <BreadcrumbItem><Home className="w-3.5 h-3.5 text-slate-400" /> Home</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>PHC Ramanthapur</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem isCurrent>{activeTab === 'route' ? "Today's Route" : activeTab === 'patients' ? "Patient Directory" : "Supervisor"}</BreadcrumbItem>
          </Breadcrumb>

          <button
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 hover:text-white transition-colors"
          >
            <Search className="w-3 h-3 text-sky-400" />
            <span>Search Command Palette...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-[9px]">Ctrl+K</kbd>
          </button>
        </div>
      </div>

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeRole === 'asha_worker' ? (
          <div className="space-y-6">
            {activeTab === 'route' ? (
              <div className="space-y-6">
                {/* Worker Summary & Date Selector */}
                <div className="p-4 sm:p-6 rounded-3xl glass-panel flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
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

                  {/* Route Date Calendar Selector & Metrics */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                    <Calendar selectedDate={selectedDate} onSelectDate={(d) => { setSelectedDate(d); showToast(`Loaded schedule for July ${d}, 2026`, 'info'); }} />

                    <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
                      <div className="px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">Distance</span>
                        <span className="text-xs font-bold text-sky-400">{totalKm} km</span>
                      </div>

                      <div className="px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">Duration</span>
                        <span className="text-xs font-bold text-indigo-400">3h 30m</span>
                      </div>

                      <div className="px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">Visited</span>
                        <span className="text-xs font-bold text-emerald-400">{completedCount}/{stops.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Split Screen: Left Route List, Right Interactive Map */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <h3 className="font-bold text-slate-200 text-sm">Sequence Stops ({stops.length})</h3>
                      <span className="text-xs text-slate-400">Risk Priority Ordered</span>
                    </div>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                      {stops.map(stop => (
                        <RouteStopCard
                          key={stop.stop_id}
                          stop={stop}
                          onStatusChange={handleStatusChange}
                          onExplainRisk={(pid) => openRightDrawer(pid)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-7 h-[500px] lg:h-auto">
                    <RouteMap
                      stops={stops}
                      workerLocation={MOCK_WORKER.current_location}
                      onExplainRisk={(pid) => openRightDrawer(pid)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <PatientManagement
                  patients={patients}
                  onUpdatePatient={handleUpdatePatient}
                  onSelectPatient={(p) => openRightDrawer(p.patient_id)}
                  onRegisterNewPatient={() => setIsRegisterOpen(true)}
                  onBatchImport={handleBatchImport}
                />
                <Pagination currentPage={1} totalPages={3} onPageChange={(p) => showToast(`Page ${p} loaded`, 'info')} />
              </div>
            )}
          </div>
        ) : (
          <SupervisorDashboard onGenerateReport={() => setIsReportOpen(true)} />
        )}
      </main>

      <footer className="border-t border-slate-900 py-3 text-center text-xs text-slate-500">
        Idea2Impact 2026 — ASHA Route Optimizer AI • Built with React, FastAPI, OR-Tools & Gemini
      </footer>

      {/* Main Navigation Sidebar Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'supervisor') setActiveRole('supervisor');
          else {
            setActiveRole('asha_worker');
            setActiveTab(tab);
          }
        }}
      />

      {/* Patient Clinical Details Slide-Over Drawer (Right-Side Drawer) */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {drawerPatient && (
          <>
            <DrawerHeader>
              <div className="flex items-center justify-between mb-1">
                <DrawerTitle>{drawerPatient.name}</DrawerTitle>
                <RiskBadge band={drawerPatient.risk_band} score={drawerPatient.risk_score} />
              </div>
              <DrawerDescription>
                {drawerPatient.patient_id} • Village: {drawerPatient.village} • Age {drawerPatient.age}
              </DrawerDescription>
            </DrawerHeader>

            <DrawerContent>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <span className="text-slate-500 font-bold uppercase block text-[10px]">Maternal & Clinical Flags</span>
                <p className="text-slate-200 font-semibold">
                  {drawerPatient.is_pregnant ? `Pregnant — Trimester ${drawerPatient.trimester}` : 'General Health Checkup'}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {drawerPatient.chronic_disease_flags?.map(f => (
                    <span key={f} className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-semibold uppercase text-[10px]">{f}</span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-indigo-950/20 border border-indigo-900/50 rounded-2xl text-xs space-y-1.5 text-indigo-100">
                <span className="font-bold flex items-center gap-1 text-indigo-400 uppercase text-[10px]"><Sparkles className="w-3.5 h-3.5" /> Gemini Priority Rationale</span>
                <p>Prioritized due to 3rd trimester pregnancy combined with overdue ANC visit schedule. Blood pressure and fetal heart rate checkup recommended.</p>
              </div>
            </DrawerContent>

            <DrawerFooter>
              <DrawerClose onClick={() => setIsDrawerOpen(false)} />
            </DrawerFooter>
          </>
        )}
      </Drawer>

      {/* Command Palette Dialog */}
      <CommandDialog isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)}>
        <CommandInput placeholder="Search patients, workers, or commands..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Navigation">
            <CommandItem onSelect={() => { setActiveTab('route'); setIsCommandOpen(false); }}>Today's Route & Map</CommandItem>
            <CommandItem onSelect={() => { setActiveTab('patients'); setIsCommandOpen(false); }}>Patient Directory & Risk Simulator</CommandItem>
            <CommandItem onSelect={() => { setActiveRole('supervisor'); setIsCommandOpen(false); }}>Supervisor Command Center</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => { setIsEmergencyOpen(true); setIsCommandOpen(false); }}>🚨 Emergency Trigger</CommandItem>
            <CommandItem onSelect={() => { setIsRegisterOpen(true); setIsCommandOpen(false); }}>Register New Patient</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

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
