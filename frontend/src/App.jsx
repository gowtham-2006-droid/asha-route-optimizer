import React, { useState, useEffect } from 'react';
import AshaCompanionDashboard from './components/AshaCompanionDashboard';
import MyRoutePage from './components/pages/MyRoutePage';
import PatientsPage from './components/pages/PatientsPage';
import AddPatientPage from './components/pages/AddPatientPage';
import EmergencyPage from './components/pages/EmergencyPage';
import ReportsPage from './components/pages/ReportsPage';
import MessagesPage from './components/pages/MessagesPage';
import TrainingPage from './components/pages/TrainingPage';
import ResourcesPage from './components/pages/ResourcesPage';
import SettingsPage from './components/pages/SettingsPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import PatientRiskDetailPage from './components/pages/PatientRiskDetailPage';
import PatientVisitPage from './components/pages/PatientVisitPage';

import EmergencyModal from './components/EmergencyModal';
import AIExplanationModal from './components/AIExplanationModal';
import SupervisorDashboard from './components/SupervisorDashboard';
import ReportModal from './components/ReportModal';
import RegisterPatientModal from './components/RegisterPatientModal';
import PatientDetailModal from './components/PatientDetailModal';
import PhoneOTPLogin from './components/PhoneOTPLogin';
import { MOCK_WORKER, MOCK_ROUTE_STOPS, MOCK_PATIENTS } from './services/mockData';

// Custom UI Components
import { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerContent, DrawerFooter, DrawerClose } from './components/ui/drawer';
import { CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty } from './components/ui/command';
import RiskBadge from './components/RiskBadge';

import { CheckCircle2, AlertOctagon, Sparkles } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('asha_user_profile');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activeRole, setActiveRole] = useState(() => currentUser?.role || 'asha_worker');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [stops, setStops] = useState(MOCK_ROUTE_STOPS);

  // UI Drawer & Modal States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerPatient, setDrawerPatient] = useState(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [explainPatientId, setExplainPatientId] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedPatientDetail, setSelectedPatientDetail] = useState(null);
  const [selectedPatientForRiskDetail, setSelectedPatientForRiskDetail] = useState(null);

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
    setActiveTab(userProfile.role === 'asha_worker' ? 'dashboard' : 'supervisor');
    showToast(`Welcome ${userProfile.name}! Entered ${userProfile.role === 'asha_worker' ? 'ASHA Companion Portal' : 'PHC Supervisor Command Center'}.`, 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('asha_user_profile');
    setCurrentUser(null);
    showToast('Logged out successfully. Returned to login portal.', 'info');
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

  const openRightDrawer = (patientId) => {
    const p = patients.find(pat => pat.patient_id === patientId) || patients[0];
    setSelectedPatientForRiskDetail(p);
    setActiveTab('patient_detail');
  };

  if (!currentUser) {
    return <PhoneOTPLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fe] text-slate-900 flex flex-col font-sans">
      {/* Toast Notification Banner */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-2xl shadow-2xl border text-xs font-semibold flex items-center gap-2 animate-bounce ${
          notification.type === 'emergency'
            ? 'bg-red-600 text-white border-red-400 shadow-red-900/50'
            : notification.type === 'success'
            ? 'bg-emerald-600 text-white border-emerald-400'
            : 'bg-purple-600 text-white border-purple-400'
        }`}>
          {notification.type === 'emergency' ? <AlertOctagon className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          {notification.msg}
        </div>
      )}

      {/* Main Role View Container */}
      <main className="flex-1 flex flex-col">
        {activeRole === 'asha_worker' ? (
          activeTab === 'route' ? (
            <MyRoutePage
              stops={stops}
              workerLocation={MOCK_WORKER.current_location}
              currentUser={currentUser}
              onStatusChange={handleStatusChange}
              onExplainRisk={(pid) => openRightDrawer(pid)}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onRegisterNewPatient={() => setActiveTab('add_patient')}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onLogout={handleLogout}
            />
          ) : activeTab === 'patients' ? (
            <PatientsPage
              patients={patients}
              currentUser={currentUser}
              onUpdatePatient={handleUpdatePatient}
              onSelectPatient={(p) => openRightDrawer(p.patient_id)}
              onRegisterNewPatient={() => setActiveTab('add_patient')}
              onBatchImport={handleBatchImport}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onLogout={handleLogout}
            />
          ) : activeTab === 'add_patient' ? (
            <AddPatientPage
              currentUser={currentUser}
              onRegisterNewPatient={handleRegisterNewPatient}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onLogout={handleLogout}
            />
          ) : activeTab === 'emergency' ? (
            /* EMERGENCY DISPATCH PAGE (Exact Replica of User Mockup) */
            <EmergencyPage
              currentUser={currentUser}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onLogout={handleLogout}
            />
          ) : activeTab === 'reports' ? (
            <ReportsPage
              currentUser={currentUser}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onRegisterNewPatient={() => setActiveTab('add_patient')}
              onLogout={handleLogout}
            />
          ) : activeTab === 'messages' ? (
            <MessagesPage
              currentUser={currentUser}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onRegisterNewPatient={() => setActiveTab('add_patient')}
              onLogout={handleLogout}
            />
          ) : activeTab === 'training' ? (
            <TrainingPage
              currentUser={currentUser}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onRegisterNewPatient={() => setActiveTab('add_patient')}
              onLogout={handleLogout}
            />
          ) : activeTab === 'resources' ? (
            <ResourcesPage
              currentUser={currentUser}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onRegisterNewPatient={() => setActiveTab('add_patient')}
              onLogout={handleLogout}
            />
          ) : activeTab === 'settings' ? (
            <SettingsPage
              currentUser={currentUser}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onRegisterNewPatient={() => setActiveTab('add_patient')}
              onLogout={handleLogout}
            />
          ) : activeTab === 'analytics' ? (
            <AnalyticsPage
              currentUser={currentUser}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onRegisterNewPatient={() => setActiveTab('add_patient')}
              onLogout={handleLogout}
            />
          ) : activeTab === 'next_patient' || activeTab === 'patient_visit' ? (
            <PatientVisitPage
              currentUser={currentUser}
              onBack={() => setActiveTab('dashboard')}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onLogout={handleLogout}
            />
          ) : activeTab === 'patient_detail' ? (
            <PatientRiskDetailPage
              patient={selectedPatientForRiskDetail}
              currentUser={currentUser}
              onBack={() => setActiveTab('dashboard')}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onLogout={handleLogout}
            />
          ) : (
            <AshaCompanionDashboard
              stops={stops}
              workerLocation={MOCK_WORKER.current_location}
              currentUser={currentUser}
              onStatusChange={handleStatusChange}
              onExplainRisk={(pid) => openRightDrawer(pid)}
              onTriggerEmergency={() => setActiveTab('emergency')}
              onRegisterNewPatient={() => setActiveTab('add_patient')}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onLogout={handleLogout}
            />
          )
        ) : (
          /* PHC SUPERVISOR DEDICATED COMMAND CENTER PORTAL */
          <SupervisorDashboard onGenerateReport={() => setIsReportOpen(true)} />
        )}
      </main>

      {/* Patient Clinical Details Slide-Over Drawer */}
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
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <span className="text-slate-500 font-bold uppercase block text-[10px]">Maternal & Clinical Flags</span>
                <p className="text-slate-900 font-semibold">
                  {drawerPatient.is_pregnant ? `Pregnant — Trimester ${drawerPatient.trimester}` : 'General Health Checkup'}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {drawerPatient.chronic_disease_flags?.map(f => (
                    <span key={f} className="px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-300 font-bold uppercase text-[10px]">{f}</span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-2xl text-xs space-y-1.5 text-purple-950">
                <span className="font-bold flex items-center gap-1 text-purple-800 uppercase text-[10px]"><Sparkles className="w-3.5 h-3.5" /> Gemini Priority Rationale</span>
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
            <CommandItem onSelect={() => { setActiveTab('dashboard'); setIsCommandOpen(false); }}>Dashboard</CommandItem>
            <CommandItem onSelect={() => { setActiveTab('route'); setIsCommandOpen(false); }}>My Route</CommandItem>
            <CommandItem onSelect={() => { setActiveTab('patients'); setIsCommandOpen(false); }}>Patient Directory</CommandItem>
            <CommandItem onSelect={() => { setActiveTab('add_patient'); setIsCommandOpen(false); }}>Add Patient</CommandItem>
            <CommandItem onSelect={() => { setActiveTab('emergency'); setIsCommandOpen(false); }}>Emergency Dispatch</CommandItem>
            <CommandItem onSelect={() => { setActiveTab('reports'); setIsCommandOpen(false); }}>Reports</CommandItem>
            <CommandItem onSelect={() => { setActiveTab('analytics'); setIsCommandOpen(false); }}>Analytics</CommandItem>
            <CommandItem onSelect={() => { setActiveTab('messages'); setIsCommandOpen(false); }}>Messages</CommandItem>
            <CommandItem onSelect={() => { setActiveTab('training'); setIsCommandOpen(false); }}>Training</CommandItem>
            <CommandItem onSelect={() => { setActiveTab('resources'); setIsCommandOpen(false); }}>Resources</CommandItem>
            <CommandItem onSelect={() => { setActiveTab('settings'); setIsCommandOpen(false); }}>Settings</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => { setActiveTab('emergency'); setIsCommandOpen(false); }}>🚨 Emergency Trigger</CommandItem>
            <CommandItem onSelect={() => { setActiveTab('add_patient'); setIsCommandOpen(false); }}>Register New Patient</CommandItem>
            <CommandItem onSelect={() => { handleLogout(); setIsCommandOpen(false); }}>🚪 Log Out</CommandItem>
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
