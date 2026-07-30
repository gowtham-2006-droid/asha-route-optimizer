import React, { useState } from 'react';
import { Activity, Phone, ShieldCheck, UserCheck, Shield, ArrowRight, Sparkles, MapPin } from 'lucide-react';

export default function PhoneOTPLogin({ onLoginSuccess }) {
  const [selectedRole, setSelectedRole] = useState('asha_worker');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('request'); // 'request' | 'verify'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestOtp = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('verify');
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '123456' && otp.length !== 6) {
      alert('Invalid OTP code. Please enter 123456 for demo.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const userProfile = {
        token: `jwt_session_${Date.now()}`,
        role: selectedRole,
        user_id: selectedRole === 'asha_worker' ? 'usr_w101' : 'usr_sup01',
        name: selectedRole === 'asha_worker' ? 'Lakshmi Devi' : 'Dr. Radhika Rao',
        phone: phone,
        phc_id: 'phc_ramanthapur_01'
      };

      localStorage.setItem('asha_jwt_token', userProfile.token);
      localStorage.setItem('asha_user_profile', JSON.stringify(userProfile));

      setIsSubmitting(false);
      onLoginSuccess(userProfile);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
        {/* Header Logo & Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-sky-500/30">
            <Activity className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">ASHA Route Optimizer AI</h1>
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" /> PHC Ramanthapur Circle • Telangana
          </p>
        </div>

        {/* Portal Selection Cards */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Select Portal Access</span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedRole('asha_worker')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedRole === 'asha_worker'
                  ? 'bg-sky-600/20 border-sky-500 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <UserCheck className={`w-5 h-5 mb-1 ${selectedRole === 'asha_worker' ? 'text-sky-400' : 'text-slate-500'}`} />
              <span className="font-bold text-xs block">ASHA Worker</span>
              <span className="text-[10px] text-slate-400 block">Field Route & Care</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('supervisor')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedRole === 'supervisor'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Shield className={`w-5 h-5 mb-1 ${selectedRole === 'supervisor' ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span className="font-bold text-xs block">PHC Supervisor</span>
              <span className="text-[10px] text-slate-400 block">Command Center</span>
            </button>
          </div>
        </div>

        {/* Phone OTP Form */}
        {step === 'request' ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Registered Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-sky-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all"
            >
              {isSubmitting ? 'Sending OTP Code...' : 'Request OTP Code'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3 bg-sky-500/10 border border-sky-500/30 rounded-xl text-xs text-sky-300 flex items-center justify-between">
              <span>OTP Code sent to <strong>{phone}</strong></span>
              <button type="button" onClick={() => setStep('request')} className="text-sky-400 underline font-semibold">Edit</button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter 6-Digit OTP Code</label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm tracking-widest font-mono focus:border-sky-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOtp('123456')}
              className="w-full py-1.5 text-[11px] bg-slate-800 text-sky-400 rounded-lg hover:bg-slate-700 font-semibold"
            >
              Auto-Fill Demo OTP (123456)
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all"
            >
              {isSubmitting ? 'Verifying Session...' : 'Verify OTP & Enter Portal'} <Sparkles className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
          Idea2Impact 2026 • Secure NHM / HMIS OAuth API Layer
        </div>
      </div>
    </div>
  );
}
