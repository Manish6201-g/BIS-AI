import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  MessageSquare, 
  Award, 
  CheckCircle2, 
  FileText, 
  BarChart3, 
  Globe, 
  User, 
  Menu, 
  X,
  Sparkles,
  Building2,
  Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentLang, setCurrentLang, languages, t } = useLanguage();
  const { user, switchDemoRole } = useAuth();

  const navLinks = [
    { name: t('nav_home'), path: '/', icon: Shield },
    { name: t('nav_assistant'), path: '/assistant', icon: MessageSquare },
    { name: t('nav_matcher'), path: '/matcher', icon: Search },
    { name: t('nav_certification'), path: '/certification', icon: Award },
    { name: t('nav_isi'), path: '/verify-isi', icon: CheckCircle2 },
    { name: t('nav_huid'), path: '/verify-huid', icon: Sparkles },
    { name: t('nav_standards'), path: '/standards', icon: FileText },
    { name: t('nav_dashboard'), path: '/dashboard', icon: BarChart3 },
    ...(user?.role === 'admin' ? [{ name: t('nav_admin'), path: '/admin', icon: Lock }] : [])
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Gov Banner */}
      <div className="bg-gov-navy text-slate-200 text-xs py-1 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-amber-400">SIH 2026</span>
          <span>|</span>
          <span className="truncate">Bureau of Indian Standards (BIS) • AI-Powered Intelligent Assistant</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Demo Role Switcher */}
          <div className="hidden sm:flex items-center space-x-1">
            <span className="text-slate-400 text-[11px]">Role:</span>
            <select
              value={user?.role || 'consumer'}
              onChange={(e) => switchDemoRole(e.target.value)}
              className="bg-slate-800 text-amber-300 text-xs rounded px-2 py-0.5 border border-slate-700 focus:outline-none"
            >
              <option value="consumer">Consumer</option>
              <option value="industry">Manufacturer / Industry</option>
              <option value="admin">BIS Admin</option>
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-slate-800 text-white text-xs rounded px-2 py-0.5 border border-slate-700 focus:outline-none font-medium"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native} ({lang.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-gov-navy to-gov-blue flex items-center justify-center text-white shadow-md">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-gov-navy">BISmart</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">AI</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">Bureau of Indian Standards Portal</p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-gov-blue border-b-2 border-gov-blue'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive(item.path) ? 'text-gov-blue' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User profile & quick action */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.full_name || 'Aarav Sharma'}</p>
              <span className={`inline-block text-[10px] font-medium px-2 py-0.2 rounded-full uppercase ${
                user?.role === 'admin' ? 'bg-red-100 text-red-800' :
                user?.role === 'industry' ? 'bg-purple-100 text-purple-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {user?.role}
              </span>
            </div>
            <Link
              to="/auth"
              className="p-2 text-slate-600 hover:text-gov-blue hover:bg-slate-100 rounded-full border border-slate-200"
              title="User Account"
            >
              <User className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-gov-blue font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
