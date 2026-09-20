import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, User, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { user, login, register, logout, switchDemoRole } = useAuth();
  
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('consumer');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isRegister) {
      const res = await register({ email, password, full_name: fullName, role, organization });
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message);
      }
    } else {
      const res = await login(email, password);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message);
      }
    }
    setLoading(false);
  };

  const handleQuickDemoRole = (roleType) => {
    switchDemoRole(roleType);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 rounded-2xl bg-gov-navy text-white flex items-center justify-center mx-auto mb-3 shadow-md">
          <Shield className="w-6 h-6 text-amber-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-gov-navy">
          {isRegister ? "Create BISmart Portal Account" : "Sign In to BISmart AI"}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Role-Based Access for Consumers, Manufacturers & BIS Officers
        </p>
      </div>

      {/* Quick Demo Login Presets */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          One-Click Demo Roles:
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemoRole('consumer')}
            className="p-2 text-center rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 transition-colors"
          >
            <span className="text-xs font-bold block">Consumer</span>
            <span className="text-[10px] text-emerald-700">Citizen</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoRole('industry')}
            className="p-2 text-center rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 transition-colors"
          >
            <span className="text-xs font-bold block">Industry</span>
            <span className="text-[10px] text-purple-700">Manufacturer</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoRole('admin')}
            className="p-2 text-center rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-900 transition-colors"
          >
            <span className="text-xs font-bold block">Admin</span>
            <span className="text-[10px] text-red-700">BIS Officer</span>
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue font-medium"
                >
                  <option value="consumer">Consumer / Citizen</option>
                  <option value="industry">Industry / Manufacturer</option>
                  <option value="admin">BIS Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Organization / Company Name</label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Apex Manufacturing Pvt Ltd"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@bismart.gov.in"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gov-blue hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl text-xs shadow-xs transition-colors"
          >
            {loading ? "Processing..." : isRegister ? "Create Account" : "Sign In to Portal"}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs font-semibold text-gov-blue hover:underline"
          >
            {isRegister ? "Already registered? Sign In instead" : "Need an account? Register here"}
          </button>
        </div>
      </div>
    </div>
  );
};
