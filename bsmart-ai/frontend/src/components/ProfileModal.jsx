import React, { useState } from 'react';
import { 
  X, 
  User, 
  Building, 
  Mail, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [organization, setOrganization] = useState(user?.organization || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (newPassword && newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMsg('New password and confirmation do not match.');
      return;
    }

    setSaving(true);
    const updateData = {};
    if (fullName !== user.full_name) updateData.full_name = fullName;
    if (organization !== (user.organization || '')) updateData.organization = organization;
    if (newPassword) updateData.password = newPassword;

    if (Object.keys(updateData).length === 0) {
      setSuccessMsg('No changes to save.');
      setSaving(false);
      return;
    }

    const res = await updateProfile(updateData);
    setSaving(false);

    if (res.success) {
      setSuccessMsg('Profile updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    } else {
      setErrorMsg(res.message || 'Failed to update profile.');
    }
  };

  const roleBadgeColor = 
    user.role === 'admin' ? 'bg-red-50 text-red-700 border-red-200' :
    user.role === 'industry' ? 'bg-purple-50 text-purple-700 border-purple-200' :
    'bg-emerald-50 text-emerald-700 border-emerald-200';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gov-navy px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold tracking-wide">Account Profile & Security</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* User Overview Box */}
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-semibold block">Official Identifier</span>
              <p className="text-xs font-mono font-bold text-slate-800">{user.email}</p>
              <div className="flex items-center space-x-2 pt-1 text-[11px] text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Joined {new Date(user.created_at || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
            <div>
              <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${roleBadgeColor}`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{user.role}</span>
              </span>
            </div>
          </div>

          {/* Feedback Alerts */}
          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-800 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Organization / Enterprise</label>
              <div className="relative">
                <Building className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Apex Industries Pvt Ltd"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-3">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                <KeyRound className="w-4 h-4 text-gov-blue" />
                <span>Change Password (Optional)</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Leave blank to keep current"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
                  />
                </div>
              </div>

              {newPassword && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 text-xs font-bold text-white bg-gov-blue hover:bg-blue-900 rounded-xl shadow-xs transition-colors disabled:opacity-50"
              >
                {saving ? 'Updating...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
