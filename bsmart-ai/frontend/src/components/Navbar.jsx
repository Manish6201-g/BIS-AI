import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Lock,
  LogOut,
  ChevronDown,
  UserCheck,
  Settings
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ProfileModal } from './ProfileModal';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { currentLang, setCurrentLang, languages, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await logout();
    navigate('/');
  };

  const navLinks = [
    { name: t('nav_home'), path: '/', icon: Shield },
    { name: t('nav_assistant'), path: '/assistant', icon: MessageSquare },
    { name: t('nav_matcher'), path: '/matcher', icon: Search },
    { name: t('nav_certification'), path: '/certification', icon: Award },
    { name: t('nav_isi'), path: '/verify-isi', icon: CheckCircle2 },
    { name: t('nav_huid'), path: '/verify-huid', icon: Sparkles },
    { name: t('nav_standards'), path: '/standards', icon: FileText },
    ...(user?.role === 'admin' ? [
      { name: t('nav_dashboard'), path: '/dashboard', icon: BarChart3 },
      { name: t('nav_admin'), path: '/admin', icon: Lock }
    ] : [])
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className={`sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs ${location.pathname === '/' ? 'landing-navbar' : ''}`}>
        {/* Top Gov Banner */}
        <div className="bg-gov-navy text-slate-200 text-xs py-1 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-amber-400">SIH 2026</span>
            <span>|</span>
            <span className="truncate">Bureau of Indian Standards (BIS) • AI-Powered Intelligent Assistant</span>
          </div>

          <div className="flex items-center space-x-4">
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

            {/* User Profile / Auth Area */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated && user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gov-navy text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                        {user.full_name || 'User'}
                      </p>
                      <span className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' :
                        user.role === 'industry' ? 'bg-purple-100 text-purple-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.full_name}</p>
                        <p className="text-[11px] font-mono text-slate-500 truncate">{user.email}</p>
                        {user.organization && (
                          <p className="text-[10px] text-slate-400 truncate mt-0.5 flex items-center space-x-1">
                            <Building2 className="w-3 h-3 shrink-0" />
                            <span>{user.organization}</span>
                          </p>
                        )}
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            setProfileModalOpen(true);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left"
                        >
                          <Settings className="w-4 h-4 text-slate-400" />
                          <span>Account Settings & Security</span>
                        </button>

                        {user.role === 'admin' && (
                          <>
                            <Link
                              to="/dashboard"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              <BarChart3 className="w-4 h-4 text-gov-blue" />
                              <span>Analytics Dashboard</span>
                            </Link>
                            <Link
                              to="/admin"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              <Lock className="w-4 h-4 text-red-500" />
                              <span>Admin Control Center</span>
                            </Link>
                          </>
                        )}
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/auth"
                    className="flex items-center space-x-1.5 px-4 py-2 bg-gov-blue hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                </div>
              )}
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
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
            {isAuthenticated && user ? (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{user.full_name}</p>
                    <p className="text-[11px] font-mono text-slate-500">{user.email}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gov-blue text-white uppercase">
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-slate-200">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setProfileModalOpen(true);
                    }}
                    className="flex-1 py-1 text-center text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-1 text-center text-xs font-bold bg-red-50 border border-red-200 rounded-lg text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2 bg-gov-blue text-white rounded-xl text-xs font-bold shadow-xs"
              >
                Sign In / Register
              </Link>
            )}

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

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </>
  );
};
