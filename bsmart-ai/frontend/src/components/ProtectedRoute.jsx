import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Lock } from 'lucide-react';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-4 border-gov-blue border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500 font-medium">Verifying security credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-600">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">Restricted Access</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          This portal section requires <strong>{requiredRole.toUpperCase()}</strong> authority.
          Your current account role is <span className="font-semibold text-gov-blue">{user.role}</span>.
        </p>
        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-gov-navy text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return children;
};
