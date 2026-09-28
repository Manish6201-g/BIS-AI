import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Mail, 
  User, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, register } = useAuth();
  
  const from = location.state?.from?.pathname || '/';

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('consumer');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState(null);
  const [successNotice, setSuccessNotice] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, show current session status with quick redirect
  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">Signed In Successfully</h2>
        <p className="text-xs text-slate-600">
          You are currently signed in as <strong>{user.full_name}</strong> ({user.email}).
        </p>
        <button
          onClick={() => navigate(from, { replace: true })}
          className="px-5 py-2.5 bg-gov-navy text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
        >
          Continue to Application →
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    if (isRegister) {
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      setSubmitting(true);
      const res = await register({ 
        email, 
        password, 
        full_name: fullName, 
        role, 
        organization 
      });
      setSubmitting(false);

      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.message);
      }
    } else {
      setSubmitting(true);
      const res = await login(email, password);
      setSubmitting(false);

      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.message);
      }
    }
  };

  // One-click real credential prefill and login for hackathon judges
  const handleQuickDemoLogin = async (demoEmail, demoPassword) => {
    setError(null);
    setSuccessNotice(null);
    setEmail(demoEmail);
    setPassword(demoPassword);
    setSubmitting(true);

    const res = await login(demoEmail, demoPassword);
    setSubmitting(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 animate-fadeIn font-mono">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mx-auto shadow-md">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>Access Control Gateway</span>
        </div>
        <h1 className="editorial-headline text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
          {isRegister ? "Create Portal Account" : "Sign In to BISmart AI"}
        </h1>
        <p className="text-xs text-zinc-500 font-mono">
          Statutory Access for Consumers, Manufacturers & BIS Officers
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200">
        <button
          type="button"
          onClick={() => { setIsRegister(false); setError(null); }}
          className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
            !isRegister ? 'bg-black text-white shadow-xs' : 'text-zinc-600 hover:text-black'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => { setIsRegister(true); setError(null); }}
          className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
            isRegister ? 'bg-black text-white shadow-xs' : 'text-zinc-600 hover:text-black'
          }`}
        >
          New Registration
        </button>
      </div>

      {/* Quick Demo Login Cards */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-300 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Preset Audit Credentials (One-Click)</span>
          </label>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleQuickDemoLogin('consumer@bismart.gov.in', 'Demo1234!')}
            className="p-2.5 text-center rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-black transition-colors disabled:opacity-50 cursor-pointer"
          >
            <span className="text-xs font-mono font-bold block uppercase">Consumer</span>
            <span className="text-[10px] font-mono text-zinc-500">Citizen</span>
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleQuickDemoLogin('industry@bismart.gov.in', 'Demo1234!')}
            className="p-2.5 text-center rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-black transition-colors disabled:opacity-50 cursor-pointer"
          >
            <span className="text-xs font-mono font-bold block uppercase">Industry</span>
            <span className="text-[10px] font-mono text-zinc-500">Manufacturer</span>
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleQuickDemoLogin('admin@bismart.gov.in', 'Admin1234!')}
            className="p-2.5 text-center rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-black transition-colors disabled:opacity-50 cursor-pointer"
          >
            <span className="text-xs font-mono font-bold block uppercase">Admin</span>
            <span className="text-[10px] font-mono text-zinc-500">BIS Officer</span>
          </button>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-300 shadow-2xs space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700 text-xs font-mono font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-black font-mono focus:outline-none focus:border-black focus:bg-white shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Portal Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2.5 text-xs text-black font-mono focus:outline-none focus:border-black focus:bg-white font-medium cursor-pointer"
                >
                  <option value="consumer">Consumer / Citizen / Researcher</option>
                  <option value="industry">Industry / Manufacturer / Importer</option>
                  <option value="admin">BIS Officer / Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Organization / Enterprise (Optional)</label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Apex Kitchenware & Manufacturing Ltd"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-black font-mono focus:outline-none focus:border-black focus:bg-white shadow-inner"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@organization.gov.in"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-black font-mono focus:outline-none focus:border-black focus:bg-white shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl pl-9 pr-10 py-2.5 text-xs text-black font-mono focus:outline-none focus:border-black focus:bg-white shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-zinc-400 hover:text-black cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-black font-mono focus:outline-none focus:border-black focus:bg-white shadow-inner"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-black hover:bg-zinc-800 text-white font-mono font-bold uppercase py-2.5 rounded-xl text-xs shadow-xs transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{submitting ? "Authenticating..." : isRegister ? "Complete Registration" : "Sign In to Portal"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
            className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 hover:text-black hover:underline cursor-pointer"
          >
            {isRegister ? "Already registered? Sign In instead" : "Need an account? Register here"}
          </button>
        </div>
      </div>
    </div>
  );
};
