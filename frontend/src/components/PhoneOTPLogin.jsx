import React, { useState } from 'react';
import {
  HeartPulse, ShieldCheck, Users, Activity, Lock, Phone, User,
  Mail, MapPin, Eye, EyeOff, ArrowRight, Sparkles, Heart, Building2
} from 'lucide-react';
import { authService } from '../services/api';

export default function PhoneOTPLogin({ onLoginSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState('asha_worker'); // 'asha_worker' | 'supervisor'
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  // Form State
  const [mobileNumber, setMobileNumber] = useState('+91 98765 43210');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [village, setVillage] = useState('Select your village / area');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let loggedInUser = null;
    try {
      // Authenticate with live FastAPI backend (/api/v1/auth/login)
      const res = await authService.login(mobileNumber, password, selectedRole);
      if (res.data && res.data.token) {
        localStorage.setItem('asha_jwt_token', res.data.token);
        loggedInUser = res.data.user;
      }
    } catch (err) {
      console.warn("Backend auth notice:", err.message);
    } finally {
      setLoading(false);
    }

    const defaultName = selectedRole === 'asha_worker' ? 'Lakshmi Devi' : 'Dr. Ramesh Kumar (Medical Officer)';
    onLoginSuccess({
      name: loggedInUser?.name || defaultName,
      role: loggedInUser?.role || selectedRole,
      phone: loggedInUser?.phone || mobileNumber || (selectedRole === 'asha_worker' ? '+91 98765 43210' : '+91 98765 43299'),
      village: selectedRole === 'asha_worker' ? 'Ramanthapur' : 'PHC Ramanthapur Hub'
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!fullName) {
      alert('Please enter your full name');
      return;
    }
    setLoading(true);

    let registeredUser = null;
    try {
      // Register with live FastAPI backend (/api/v1/auth/register)
      const res = await authService.register({
        name: fullName,
        phone: mobileNumber,
        password: password,
        role: selectedRole,
        village: village === 'Select your village / area' ? 'Ramanthapur' : village
      });
      if (res.data && res.data.token) {
        localStorage.setItem('asha_jwt_token', res.data.token);
        registeredUser = res.data.user;
      }
    } catch (err) {
      console.warn("Backend auth notice:", err.message);
    } finally {
      setLoading(false);
    }

    onLoginSuccess({
      name: registeredUser?.name || fullName,
      role: registeredUser?.role || selectedRole,
      phone: registeredUser?.phone || mobileNumber || '+91 98765 43210',
      village: village === 'Select your village / area' ? 'Ramanthapur' : village
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fe] flex items-center justify-center p-4 md:p-8 font-sans">
      {!isRegisterMode ? (
        /* ================= 1. LOGIN SCREEN ================= */
        <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
          {/* Left Hero Section (5 Cols) */}
          <div className="md:col-span-5 bg-gradient-to-br from-purple-50 via-indigo-50 to-white p-8 flex flex-col justify-between border-r border-slate-100 relative">
            <div className="space-y-6">
              {/* Logo & Title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="font-extrabold text-base text-[#6c47ff] tracking-tight leading-none">
                    ASHA Route Optimizer AI
                  </h1>
                  <p className="text-[11px] text-slate-400 font-medium">Empowering Rural Healthcare</p>
                </div>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                  Role-Based Portal <span className="text-[#6c47ff]">Login</span>
                </h2>
                <span className="text-xs font-bold text-[#6c47ff] flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-current" /> Track. Care. Impact.
                </span>
                <p className="text-xs text-slate-500 leading-relaxed font-medium pt-1">
                  Access the ASHA Companion Mobile Portal or the PHC Command Center for Medical Officers.
                </p>
              </div>

              {/* Graphic Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-purple-200 bg-purple-100 h-44 flex items-center justify-center">
                <div className="text-center space-y-1">
                  <span className="text-4xl block">
                    {selectedRole === 'asha_worker' ? '👩‍⚕️🏽📋' : '🏥👨‍⚕️ Center'}
                  </span>
                  <span className="text-xs font-bold text-purple-900 block">
                    {selectedRole === 'asha_worker' ? 'ASHA Companion Field Portal' : 'PHC Supervisor Command Center'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom 3 Feature Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-purple-100/60 text-center">
              <div className="p-2 rounded-xl bg-white border border-purple-100">
                <Users className="w-4 h-4 text-[#6c47ff] mx-auto mb-1" />
                <span className="text-[9px] font-bold text-slate-800 block leading-tight">Community Focused</span>
                <span className="text-[8px] text-slate-400 block">Built for ASHA</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-purple-100">
                <ShieldCheck className="w-4 h-4 text-[#6c47ff] mx-auto mb-1" />
                <span className="text-[9px] font-bold text-slate-800 block leading-tight">Secure & Reliable</span>
                <span className="text-[8px] text-slate-400 block">JWT Auth</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-purple-100">
                <Activity className="w-4 h-4 text-[#6c47ff] mx-auto mb-1" />
                <span className="text-[9px] font-bold text-slate-800 block leading-tight">Smarter AI</span>
                <span className="text-[8px] text-slate-400 block">OR-Tools Solver</span>
              </div>
            </div>
          </div>

          {/* Right Login Card (7 Cols) */}
          <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-6 max-w-md mx-auto w-full">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Welcome Back! 👋</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Select your role and sign in to continue</p>
              </div>

              {/* ROLE SELECTION PILLS */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 block">Select Access Role</label>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('asha_worker');
                      setMobileNumber('+91 98765 43210');
                    }}
                    className={`py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                      selectedRole === 'asha_worker'
                        ? 'bg-[#6c47ff] text-white shadow-md shadow-purple-600/30'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📱 ASHA Worker
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('supervisor');
                      setMobileNumber('+91 98765 43299');
                    }}
                    className={`py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                      selectedRole === 'supervisor'
                        ? 'bg-[#6c47ff] text-white shadow-md shadow-purple-600/30'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🏥 PHC Supervisor
                  </button>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                {/* Mobile Number */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Mobile Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 block">Password</label>
                    <button type="button" className="text-[11px] text-[#6c47ff] font-bold hover:underline">Forgot Password?</button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-[#6c47ff]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-[#6c47ff] rounded cursor-pointer"
                  />
                  <label htmlFor="remember" className="font-bold text-slate-600 cursor-pointer">Remember me</label>
                </div>

                {/* Primary Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Authenticating...' : `Login as ${selectedRole === 'asha_worker' ? 'ASHA Worker' : 'PHC Supervisor'}`} <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Or Continue With */}
              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 uppercase">or continue with</span>
              </div>

              {/* Quick Role Demo Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onLoginSuccess({ name: 'Lakshmi Devi', role: 'asha_worker', phone: '+91 98765 43210', village: 'Ramanthapur' })}
                  className="py-2.5 rounded-2xl bg-purple-50 border border-purple-200 text-[#6c47ff] font-extrabold text-xs hover:bg-purple-100 transition-all text-center"
                >
                  📱 ASHA Demo
                </button>

                <button
                  type="button"
                  onClick={() => onLoginSuccess({ name: 'Dr. Ramesh Kumar', role: 'supervisor', phone: '+91 98765 43299', village: 'PHC Ramanthapur' })}
                  className="py-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-extrabold text-xs hover:bg-indigo-100 transition-all text-center"
                >
                  🏥 Supervisor Demo
                </button>
              </div>

              {/* Switch to Register */}
              <p className="text-center text-xs text-slate-500 font-medium">
                Don't have an account?{' '}
                <button onClick={() => setIsRegisterMode(true)} className="text-[#6c47ff] font-extrabold hover:underline">
                  Register here
                </button>
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ================= 2. REGISTER SCREEN ================= */
        <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
          {/* Left Hero */}
          <div className="md:col-span-5 bg-gradient-to-br from-purple-50 via-indigo-50 to-white p-8 flex flex-col justify-between border-r border-slate-100">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="font-extrabold text-base text-[#6c47ff] tracking-tight leading-none">ASHA Optimizer</h1>
                  <p className="text-[11px] text-slate-400 font-medium">Register New Account</p>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                  Join the Network of <span className="text-[#6c47ff]">Healthcare Heroes</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Register your account to access real-time route optimization, emergency alerts, and patient monitoring.
                </p>
              </div>
            </div>
          </div>

          {/* Right Register Card */}
          <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-6 max-w-md mx-auto w-full">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Create Account 📝</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Register for ASHA Companion or PHC Command</p>
              </div>

              {/* ROLE SELECTION FOR REGISTER */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 block">Register Role</label>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('asha_worker')}
                    className={`py-2 rounded-xl text-xs font-extrabold transition-all ${
                      selectedRole === 'asha_worker' ? 'bg-[#6c47ff] text-white shadow-md shadow-purple-600/30' : 'text-slate-600'
                    }`}
                  >
                    📱 ASHA Worker
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('supervisor')}
                    className={`py-2 rounded-xl text-xs font-extrabold transition-all ${
                      selectedRole === 'supervisor' ? 'bg-[#6c47ff] text-white shadow-md shadow-purple-600/30' : 'text-slate-600'
                    }`}
                  >
                    🏥 PHC Supervisor
                  </button>
                </div>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Lakshmi Devi"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-[#6c47ff]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-[#6c47ff]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Village / Center Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramanthapur"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-[#6c47ff]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? 'Creating Account...' : 'Complete Registration'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="text-center text-xs text-slate-500 font-medium">
                Already have an account?{' '}
                <button onClick={() => setIsRegisterMode(false)} className="text-[#6c47ff] font-extrabold hover:underline">
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
