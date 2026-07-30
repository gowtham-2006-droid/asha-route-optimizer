import React, { useState } from 'react';
import {
  HeartPulse, ShieldCheck, Users, Activity, Lock, Phone, User,
  Mail, MapPin, Eye, EyeOff, ArrowRight, Sparkles, Heart
} from 'lucide-react';

export default function PhoneOTPLogin({ onLoginSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [termsAgreed, setTermsAgreed] = useState(true);

  // Form State
  const [mobileNumber, setMobileNumber] = useState('+91 98765 43210');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [village, setVillage] = useState('Select your village / area');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: 'Lakshmi Devi',
      role: 'asha_worker',
      phone: mobileNumber || '+91 98765 43210',
      village: 'Ramanthapur'
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!fullName) {
      alert('Please enter your full name');
      return;
    }
    onLoginSuccess({
      name: fullName || 'Lakshmi Devi',
      role: 'asha_worker',
      phone: mobileNumber || '+91 98765 43210',
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
                    ASHA Companion
                  </h1>
                  <p className="text-[11px] text-slate-400 font-medium">Empowering Rural Health</p>
                </div>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                  Your Companion in Every Step of <span className="text-[#6c47ff]">Rural Healthcare</span>
                </h2>
                <span className="text-xs font-bold text-[#6c47ff] flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-current" /> Track. Care. Impact.
                </span>
                <p className="text-xs text-slate-500 leading-relaxed font-medium pt-1">
                  ASHA Companion helps you manage patients, plan visits, and improve health outcomes in your community.
                </p>
              </div>

              {/* ASHA Worker Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-purple-200 bg-purple-100 h-44 flex items-center justify-center">
                <div className="text-center space-y-1">
                  <span className="text-4xl block">👩‍⚕️🏽📋</span>
                  <span className="text-xs font-bold text-purple-900 block">Empowering 100,000+ ASHA Workers</span>
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
                <span className="text-[8px] text-slate-400 block">Data is safe</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-purple-100">
                <Activity className="w-4 h-4 text-[#6c47ff] mx-auto mb-1" />
                <span className="text-[9px] font-bold text-slate-800 block leading-tight">Smarter Healthcare</span>
                <span className="text-[8px] text-slate-400 block">Better outcomes</span>
              </div>
            </div>
          </div>

          {/* Right Login Card (7 Cols) */}
          <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-6 max-w-md mx-auto w-full">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Welcome Back! 👋</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Sign in to continue to ASHA Companion</p>
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
                  className="w-full py-3 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                >
                  Login <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Or Continue With */}
              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 uppercase">or continue with</span>
              </div>

              {/* Continue with Google Button */}
              <button
                onClick={() => onLoginSuccess({ name: 'Lakshmi Devi', role: 'asha_worker', phone: '+91 98765 43210', village: 'Ramanthapur' })}
                className="w-full py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <span className="font-bold text-blue-600">G</span> Continue with Google
              </button>

              {/* Switch to Register */}
              <p className="text-center text-xs text-slate-500 font-medium">
                Don't have an account?{' '}
                <button onClick={() => setIsRegisterMode(true)} className="text-[#6c47ff] font-extrabold hover:underline">
                  Register here
                </button>
              </p>
            </div>

            {/* Bottom Security Box */}
            <div className="max-w-md mx-auto w-full p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center gap-3 text-xs">
              <ShieldCheck className="w-5 h-5 text-[#6c47ff] shrink-0" />
              <div>
                <h4 className="font-bold text-purple-950 text-xs">Your data is protected</h4>
                <p className="text-[10px] text-purple-700 font-medium">We use end-to-end encryption to keep your information secure.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= 2. REGISTER SCREEN ================= */
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
                    ASHA Companion
                  </h1>
                  <p className="text-[11px] text-slate-400 font-medium">Empowering Rural Health</p>
                </div>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                  Join <span className="text-[#6c47ff]">ASHA Companion</span>
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Create your account and start making a difference in your community.
                </p>
              </div>

              {/* 3 Feature Bullets */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#6c47ff] flex items-center justify-center font-bold shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Easy Patient Management</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Add, track and follow up with patients easily</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Smart Route Planning</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Optimize your visits and save travel time</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Real-time Insights</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Get important alerts and health insights</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Graphic Illustration */}
            <div className="rounded-2xl bg-purple-100/60 p-4 text-center border border-purple-200">
              <span className="text-3xl block">📋 🩺 🩹</span>
              <span className="text-[10px] font-bold text-purple-900 block mt-1">Official National Health Mission Companion</span>
            </div>
          </div>

          {/* Right Register Card (7 Cols) */}
          <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4 max-w-md mx-auto w-full">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-1.5">
                  Create Your Account <Sparkles className="w-4 h-4 text-[#6c47ff] fill-current" />
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Let's get started with your details</p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Mobile Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>
                </div>

                {/* Email Address (Optional) */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Email Address <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>
                </div>

                {/* Create Password */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Create Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-[#6c47ff]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Password must be at least 6 characters</span>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 pt-0.5">
                    <span>Strength: Weak</span>
                    <div className="flex gap-1">
                      <span className="w-3 h-1 rounded-full bg-red-500" />
                      <span className="w-3 h-1 rounded-full bg-slate-200" />
                      <span className="w-3 h-1 rounded-full bg-slate-200" />
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-[#6c47ff]"
                    />
                  </div>
                </div>

                {/* Area / Village Dropdown */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Your Area / Village</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <select
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-[#6c47ff]"
                    >
                      <option>Select your village / area</option>
                      <option>Ramanthapur</option>
                      <option>Habsiguda</option>
                      <option>Uppal</option>
                      <option>Nagole</option>
                    </select>
                  </div>
                </div>

                {/* Checkbox Terms */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="w-4 h-4 accent-[#6c47ff] rounded cursor-pointer"
                  />
                  <label htmlFor="terms" className="font-semibold text-slate-600 cursor-pointer text-[11px]">
                    I agree to the <span className="text-[#6c47ff] font-bold">Terms & Conditions</span> and <span className="text-[#6c47ff] font-bold">Privacy Policy</span>
                  </label>
                </div>

                {/* Primary Register Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-2xl bg-[#6c47ff] hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                >
                  Register <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Switch to Login */}
              <p className="text-center text-xs text-slate-500 font-medium">
                Already have an account?{' '}
                <button onClick={() => setIsRegisterMode(false)} className="text-[#6c47ff] font-extrabold hover:underline">
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
