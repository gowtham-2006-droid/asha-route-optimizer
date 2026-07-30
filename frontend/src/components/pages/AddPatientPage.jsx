import React, { useState } from 'react';
import {
  Home, MapPin, Users, Plus, AlertOctagon, FileText, MessageSquare,
  GraduationCap, Folder, Settings, Bell, Calendar, User, HeartPulse,
  Navigation, UploadCloud, Sparkles, Check, RefreshCw, Scan, UserCheck, Trash2, ArrowRight
} from 'lucide-react';

export default function AddPatientPage({
  currentUser,
  onRegisterNewPatient,
  onTriggerEmergency,
  onNavigateToTab
}) {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: 'Select gender',
    phone: '',
    village: 'Select village',
    address: '',
    pincode: '',
    aadhaar: '',
    familyId: '',
    occupation: 'Select occupation',
    bloodGroup: 'Select blood group',
    height: '',
    weight: '',
    maritalStatus: 'Select status',
    chronicDiseases: [],
    pregnancyStatus: 'Not Applicable',
    lmpDate: '',
    eddDate: '',
    gravida: '',
    para: '',
    visitType: 'Select visit type',
    priorityLevel: 'Select priority',
    symptoms: '',
    lastCheckup: '',
    nextDue: '',
    referredBy: ''
  });

  const toggleChronic = (disease) => {
    setFormData(prev => {
      const exists = prev.chronicDiseases.includes(disease);
      return {
        ...prev,
        chronicDiseases: exists
          ? prev.chronicDiseases.filter(d => d !== disease)
          : [...prev.chronicDiseases, disease]
      };
    });
  };

  const handleClearForm = () => {
    setFormData({
      fullName: '', age: '', gender: 'Select gender', phone: '', village: 'Select village',
      address: '', pincode: '', aadhaar: '', familyId: '', occupation: 'Select occupation',
      bloodGroup: 'Select blood group', height: '', weight: '', maritalStatus: 'Select status',
      chronicDiseases: [], pregnancyStatus: 'Not Applicable', lmpDate: '', eddDate: '',
      gravida: '', para: '', visitType: 'Select visit type', priorityLevel: 'Select priority',
      symptoms: '', lastCheckup: '', nextDue: '', referredBy: ''
    });
  };

  const handleSave = () => {
    if (!formData.fullName || !formData.age) {
      alert('Please fill out Full Name and Age');
      return;
    }

    onRegisterNewPatient({
      patient_id: `P-${Math.floor(10000 + Math.random() * 90000)}`,
      name: formData.fullName,
      age: Number(formData.age),
      gender: formData.gender === 'Select gender' ? 'Female' : formData.gender,
      village: formData.village === 'Select village' ? 'Ramanthapur' : formData.village,
      risk_score: 72,
      risk_band: 'High Risk',
      is_pregnant: formData.pregnancyStatus !== 'Not Applicable',
      trimester: 3,
      high_risk_pregnancy: true,
      vaccination_status: 'up_to_date',
      days_overdue: 0,
      previous_missed_visits: 0,
      chronic_disease_flags: formData.chronicDiseases
    });

    onNavigateToTab('patients');
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fe] text-slate-900 font-sans">
      {/* 1. LEFT SIDEBAR (ASHA Companion) */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-6">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-[#6c47ff] tracking-tight leading-none">
                ASHA Companion
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">Empowering Rural Health</p>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="space-y-1 text-xs font-semibold text-slate-600">
            <button onClick={() => onNavigateToTab('dashboard')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Home className="w-4 h-4" /><span>Dashboard</span>
            </button>
            <button onClick={() => onNavigateToTab('route')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Navigation className="w-4 h-4" /><span>My Route</span>
            </button>
            <button onClick={() => onNavigateToTab('patients')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Users className="w-4 h-4" /><span>Patients</span>
            </button>
            <button onClick={() => onNavigateToTab('add_patient')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#6c47ff] text-white font-bold shadow-md shadow-purple-600/25 transition-all">
              <Plus className="w-4 h-4" /><span>Add Patient</span>
            </button>
            <button onClick={onTriggerEmergency} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-bold">
              <div className="flex items-center gap-3"><AlertOctagon className="w-4 h-4" /><span>Emergency</span></div>
              <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">2</span>
            </button>
            <button onClick={() => onNavigateToTab('reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <FileText className="w-4 h-4" /><span>Reports</span>
            </button>
            <button onClick={() => onNavigateToTab('messages')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <MessageSquare className="w-4 h-4" /><span>Messages</span>
            </button>
            <button onClick={() => onNavigateToTab('training')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <GraduationCap className="w-4 h-4" /><span>Training</span>
            </button>
            <button onClick={() => onNavigateToTab('resources')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Folder className="w-4 h-4" /><span>Resources</span>
            </button>
            <button onClick={() => onNavigateToTab('settings')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50 transition-all">
              <Settings className="w-4 h-4" /><span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom AI Promo Box ("AI Assistant") */}
        <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6c47ff] flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-slate-900 block">AI Assistant</span>
            <p className="text-[11px] text-slate-500 leading-snug">Get health insights and suggestions while you work.</p>
          </div>
          <button className="w-full py-2 rounded-xl bg-[#6c47ff] text-white font-extrabold text-xs shadow-md shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center justify-center gap-1">
            Ask AI <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add New Patient</h2>
            <p className="text-xs text-slate-500">Register a new patient in the system</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-600" /> PHC Ramanthapur
            </div>

            <button className="relative p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600" />
            </button>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-[#6c47ff] font-bold text-xs flex items-center justify-center border border-purple-200">
                LD
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-bold text-slate-900 block leading-tight">{currentUser?.name || 'Lakshmi Devi'}</span>
                <span className="text-[10px] text-slate-500 font-semibold">ASHA Worker</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body & Split Form */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Top Form Header Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => onNavigateToTab('patients')}
              className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center gap-2"
            >
              Save Patient
            </button>
          </div>

          {/* Form Split Grid (Left Form Sections, Right AI Preview & Quick Actions) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Form Column (3 Sections) */}
            <div className="lg:col-span-8 space-y-6">
              {/* SECTION 1: Personal Information */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-purple-600 text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-600" /> Personal Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div className="sm:col-span-1">
                    <label className="font-bold text-slate-700 block mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Age <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      placeholder="Years"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Gender <span className="text-red-500">*</span></label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    >
                      <option>Select gender</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Village <span className="text-red-500">*</span></label>
                    <select
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    >
                      <option>Select village</option>
                      <option>Ramanthapur</option>
                      <option>Habsiguda</option>
                      <option>Uppal</option>
                      <option>Nagole</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Address</label>
                    <input
                      type="text"
                      placeholder="Enter full address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Pincode</label>
                    <input
                      type="text"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Aadhaar Number</label>
                    <input
                      type="text"
                      placeholder="Enter Aadhaar number"
                      value={formData.aadhaar}
                      onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Family ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="Enter family ID"
                      value={formData.familyId}
                      onChange={(e) => setFormData({ ...formData, familyId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Occupation</label>
                    <select
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    >
                      <option>Select occupation</option>
                      <option>Homemaker</option>
                      <option>Agricultural Worker</option>
                      <option>Self Employed</option>
                      <option>Student</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Health Information */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-purple-600 text-sm flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-purple-600" /> Health Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Blood Group</label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    >
                      <option>Select blood group</option>
                      <option>O+</option>
                      <option>A+</option>
                      <option>B+</option>
                      <option>AB+</option>
                      <option>O-</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Height (cm)</label>
                    <input
                      type="number"
                      placeholder="Enter height"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="Enter weight"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Marital Status</label>
                    <select
                      value={formData.maritalStatus}
                      onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    >
                      <option>Select status</option>
                      <option>Married</option>
                      <option>Single</option>
                      <option>Widowed</option>
                    </select>
                  </div>
                </div>

                {/* Chronic Diseases Chips */}
                <div className="space-y-1.5 text-xs pt-2">
                  <label className="font-bold text-slate-700 block">Chronic Diseases</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'hypertension', label: 'Hypertension', icon: '💜' },
                      { id: 'diabetes', label: 'Diabetes', icon: '💧' },
                      { id: 'asthma', label: 'Asthma', icon: '☘️' },
                      { id: 'heart', label: 'Heart Disease', icon: '🫀' },
                      { id: 'tb', label: 'Tuberculosis', icon: '🫁' },
                      { id: 'other', label: 'Other', icon: '...' }
                    ].map(d => {
                      const isSel = formData.chronicDiseases.includes(d.id);
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => toggleChronic(d.id)}
                          className={`px-3.5 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 transition-all ${
                            isSel ? 'bg-purple-100 text-[#6c47ff] border-purple-300 shadow-xs' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span>{d.icon}</span>
                          <span>{d.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pregnancy Status Section */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs pt-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Pregnancy Status (For Women)</label>
                    <select
                      value={formData.pregnancyStatus}
                      onChange={(e) => setFormData({ ...formData, pregnancyStatus: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    >
                      <option>Not Applicable</option>
                      <option>Pregnant - 1st Trimester</option>
                      <option>Pregnant - 2nd Trimester</option>
                      <option>Pregnant - 3rd Trimester</option>
                      <option>Postpartum / Lactating</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">LMP Date (If Pregnant)</label>
                    <input
                      type="date"
                      value={formData.lmpDate}
                      onChange={(e) => setFormData({ ...formData, lmpDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Due Date (EDD)</label>
                    <input
                      type="date"
                      value={formData.eddDate}
                      onChange={(e) => setFormData({ ...formData, eddDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="font-bold text-slate-700 block mb-1">Gravida (G)</label>
                      <input
                        type="text"
                        placeholder="G"
                        value={formData.gravida}
                        onChange={(e) => setFormData({ ...formData, gravida: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="font-bold text-slate-700 block mb-1">Para (P)</label>
                      <input
                        type="text"
                        placeholder="P"
                        value={formData.para}
                        onChange={(e) => setFormData({ ...formData, para: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Visit & Medical Information */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-purple-600 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" /> Visit & Medical Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Visit Type <span className="text-red-500">*</span></label>
                    <select
                      value={formData.visitType}
                      onChange={(e) => setFormData({ ...formData, visitType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    >
                      <option>Select visit type</option>
                      <option>ANC Check-up</option>
                      <option>ANC Follow-up</option>
                      <option>Immunization</option>
                      <option>Regular Check-up</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Priority Level</label>
                    <select
                      value={formData.priorityLevel}
                      onChange={(e) => setFormData({ ...formData, priorityLevel: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    >
                      <option>Select priority</option>
                      <option>High Priority</option>
                      <option>Medium Priority</option>
                      <option>Routine Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Current Symptoms</label>
                    <input
                      type="text"
                      placeholder="Enter current symptoms (if any)"
                      value={formData.symptoms}
                      onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Last Check-up Date</label>
                    <input
                      type="date"
                      value={formData.lastCheckup}
                      onChange={(e) => setFormData({ ...formData, lastCheckup: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Next Due Date</label>
                    <input
                      type="date"
                      value={formData.nextDue}
                      onChange={(e) => setFormData({ ...formData, nextDue: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Referred By</label>
                    <input
                      type="text"
                      placeholder="Enter name (if any)"
                      value={formData.referredBy}
                      onChange={(e) => setFormData({ ...formData, referredBy: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>
                </div>

                {/* Photo Upload Dashed Box */}
                <div className="p-5 border-2 border-dashed border-purple-200 rounded-2xl bg-purple-50/40 text-center space-y-1 mt-2">
                  <UploadCloud className="w-8 h-8 text-[#6c47ff] mx-auto" />
                  <span className="text-xs font-bold text-slate-800 block">Upload Patient Photo <span className="text-slate-400 font-normal">(Optional)</span></span>
                  <p className="text-[11px] text-slate-500">Drag & drop an image here, or <button type="button" className="text-[#6c47ff] font-bold hover:underline">click to browse</button></p>
                  <span className="text-[10px] text-slate-400 block">JPG, PNG up to 5MB</span>
                </div>
              </div>
            </div>

            {/* Right Column: AI Risk Preview & Quick Actions */}
            <div className="lg:col-span-4 space-y-6">
              {/* CARD 1: AI Risk Preview */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">AI Risk Preview</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-extrabold text-[10px]">
                    Live Prediction
                  </span>
                </div>

                {/* Score Gauge Ring */}
                <div className="flex items-center justify-center gap-6 py-2">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                      <path className="text-pink-600" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="72, 100" strokeLinecap="round" strokeWidth="4" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-2xl font-black text-slate-900">72</span>
                      <span className="text-[10px] text-slate-400 font-bold">/100</span>
                    </div>
                  </div>

                  <span className="px-3.5 py-1 rounded-full bg-red-100 text-red-700 font-black text-xs">
                    High Risk
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                  This is an AI predicted score based on the information provided.
                </p>

                {/* Risk Factors Identified List */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px]">Risk Factors Identified</span>
                  
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-600 flex items-center gap-1.5">❶ Age factor</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[10px]">High</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-600 flex items-center gap-1.5">❷ Chronic condition</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[10px]">High</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-600 flex items-center gap-1.5">❸ Visit type</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">Medium</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <span className="text-slate-600 flex items-center gap-1.5">❹ Pregnancy status</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Low</span>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-2xl bg-white border border-purple-200 text-[#6c47ff] font-extrabold text-xs shadow-xs hover:bg-purple-50 transition-all flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 fill-current" /> View AI Analysis
                </button>
              </div>

              {/* CARD 2: Quick Actions */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm mb-2">Quick Actions</h3>

                {/* Action 1: Check Duplicate */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3 cursor-pointer hover:bg-emerald-100/70 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 text-xs">Check Duplicate</h4>
                    <p className="text-[10px] text-emerald-700 font-medium">Search if patient already exists</p>
                  </div>
                </div>

                {/* Action 2: Scan Aadhaar */}
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3 cursor-pointer hover:bg-blue-100/70 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">
                    <Scan className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 text-xs">Scan Aadhaar</h4>
                    <p className="text-[10px] text-blue-700 font-medium">Verify Aadhaar details</p>
                  </div>
                </div>

                {/* Action 3: Add Family Member */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center gap-3 cursor-pointer hover:bg-amber-100/70 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 text-xs">Add Family Member</h4>
                    <p className="text-[10px] text-amber-700 font-medium">Link to existing family</p>
                  </div>
                </div>

                {/* Action 4: Clear Form */}
                <div
                  onClick={handleClearForm}
                  className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center gap-3 cursor-pointer hover:bg-purple-100/70 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#6c47ff] flex items-center justify-center shrink-0 font-bold">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-900 text-xs">Clear Form</h4>
                    <p className="text-[10px] text-purple-700 font-medium">Reset all fields</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
