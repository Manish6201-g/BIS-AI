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
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-12 h-12 rounded-2xl bg-gov-navy text-white flex items-center justify-center mx-auto mb-3 shadow-md">
          <Shield className="w-6 h-6 text-amber-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-gov-navy">
          {isRegister ? "Create BISmart Portal Account" : "Sign In to BISmart AI"}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Official Access for Consumers, Manufacturers & BIS Officers
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => { setIsRegister(false); setError(null); }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            !isRegister ? 'bg-white text-gov-navy shadow-xs' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => { setIsRegister(true); setError(null); }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            isRegister ? 'bg-white text-gov-navy shadow-xs' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          New Registration
        </button>
      </div>

      {/* Quick Demo Login Cards */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Official Demo Accounts (One-Click)</span>
          </label>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleQuickDemoLogin('consumer@bismart.gov.in', 'Demo1234!')}
            className="p-2.5 text-center rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 transition-colors disabled:opacity-50"
          >
            <span className="text-xs font-bold block">Consumer</span>
            <span className="text-[10px] text-emerald-700">Citizen</span>
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleQuickDemoLogin('industry@bismart.gov.in', 'Demo1234!')}
            className="p-2.5 text-center rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 transition-colors disabled:opacity-50"
          >
            <span className="text-xs font-bold block">Industry</span>
            <span className="text-[10px] text-purple-700">Manufacturer</span>
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleQuickDemoLogin('admin@bismart.gov.in', 'Admin1234!')}
            className="p-2.5 text-center rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-900 transition-colors disabled:opacity-50"
          >
            <span className="text-xs font-bold block">Admin</span>
            <span className="text-[10px] text-red-700">BIS Officer</span>
          </button>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Portal Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue font-medium"
                >
                  <option value="consumer">Consumer / Citizen / Researcher</option>
                  <option value="industry">Industry / Manufacturer / Importer</option>
                  <option value="admin">BIS Officer / Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Organization / Enterprise (Optional)</label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Apex Kitchenware & Manufacturing Ltd"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@organization.gov.in"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-10 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gov-blue hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl text-xs shadow-xs transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
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
            className="text-xs font-semibold text-gov-blue hover:underline"
          >
            {isRegister ? "Already registered? Sign In instead" : "Need an account? Register here"}
          </button>
        </div>
      </div>
    </div>
  );
};
