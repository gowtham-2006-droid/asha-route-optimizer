import React, { useState } from 'react';
import { Activity, Phone, ShieldCheck, ArrowRight, Lock, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { authService } from '../services/api';

export default function PhoneOTPLogin({ onLoginSuccess }) {
  const [step, setStep] = useState(1); // 1 = Phone input, 2 = OTP verification
  const [phone, setPhone] = useState('+91 98765 43210');
  const [role, setRole] = useState('asha_worker');
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const res = await authService.requestOtp(phone);
    setIsSubmitting(false);

    if (res) {
      setStep(2);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMsg('Please enter all 6 digits of the OTP.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const res = await authService.verifyOtp(phone, enteredOtp, role);
    setIsSubmitting(false);

    if (res && res.data) {
      const { token, user } = res.data;
      localStorage.setItem('asha_jwt_token', token);
      localStorage.setItem('asha_user_profile', JSON.stringify(user));
      onLoginSuccess(user);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/80 backdrop-blur-xl relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center mx-auto shadow-xl shadow-sky-500/20">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              ASHA Route Optimizer <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono">AI 1.0</span>
            </h1>
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> PHC Ramanthapur Circle • Telangana Health Society
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {step === 1 ? (
          /* STEP 1: Phone Number & Role Input */
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Role</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setRole('asha_worker')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    role === 'asha_worker' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ASHA Field Worker
                </button>
                <button
                  type="button"
                  onClick={() => setRole('supervisor')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    role === 'supervisor' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  PHC Supervisor
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Registered Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm font-mono focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              {isSubmitting ? 'Sending OTP...' : 'Request OTP Code'}
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-slate-500 pt-1">
              Secured by OTP Authentication • National Health Mission Protocol
            </p>
          </form>
        ) : (
          /* STEP 2: 6-Digit OTP Verification */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs text-slate-400 block">OTP Sent to <strong className="text-white font-mono">{phone}</strong></span>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[10px] text-sky-400 underline"
              >
                Change Phone Number
              </button>
            </div>

            {/* OTP Input Grid */}
            <div className="flex justify-between gap-2 py-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[idx] = e.target.value;
                    setOtp(newOtp);
                    if (e.target.value && idx < 5) {
                      document.getElementById(`otp-${idx + 1}`)?.focus();
                    }
                  }}
                  className="w-11 h-12 text-center bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-lg font-bold focus:border-sky-500 focus:outline-none"
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px]">
              <span className="text-slate-500">Demo OTP: <strong className="text-emerald-400 font-mono">123456</strong></span>
              <button
                type="button"
                onClick={() => setOtp(['1', '2', '3', '4', '5', '6'])}
                className="text-sky-400 font-semibold"
              >
                Auto-Fill Demo OTP
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              {isSubmitting ? 'Verifying OTP...' : 'Verify OTP & Unlock App'}
              <ShieldCheck className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
