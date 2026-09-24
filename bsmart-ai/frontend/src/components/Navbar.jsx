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
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800 text-white">
        {/* Top Mini Gov Bar */}
        <div className="bg-zinc-950 text-zinc-400 text-[11px] py-1 px-4 sm:px-8 flex justify-between items-center border-b border-zinc-900">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-emerald-400 tracking-wider">SIH26107</span>
            <span>•</span>
            <span className="truncate">Bureau of Indian Standards • AI Regulatory & Intelligence System</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="bg-zinc-900 text-zinc-200 text-xs rounded px-2 py-0.5 border border-zinc-800 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
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

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shadow-xs group-hover:border-emerald-500/50 transition-colors">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-black text-lg tracking-tight text-white uppercase">BISmart</span>
                  <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                    AI
                  </span>
                </div>
                <p className="text-[9px] text-zinc-400 font-mono tracking-wider uppercase">Standardization Platform</p>
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
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      isActive(item.path)
                        ? 'bg-zinc-800 text-emerald-400 border border-zinc-700'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive(item.path) ? 'text-emerald-400' : 'text-zinc-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Profile / Auth Button */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated && user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-zinc-900 transition-colors border border-zinc-800"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-zinc-200 leading-tight truncate max-w-[120px]">
                        {user.full_name || 'User'}
                      </p>
                      <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">
                        {user.role}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-zinc-800">
                        <p className="text-xs font-bold text-white truncate">{user.full_name}</p>
                        <p className="text-[11px] font-mono text-zinc-400 truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            setProfileModalOpen(true);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white text-left"
                        >
                          <Settings className="w-4 h-4 text-zinc-400" />
                          <span>Settings & Security</span>
                        </button>

                        {user.role === 'admin' && (
                          <>
                            <Link
                              to="/dashboard"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            >
                              <BarChart3 className="w-4 h-4 text-emerald-400" />
                              <span>Analytics Dashboard</span>
                            </Link>
                            <Link
                              to="/admin"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            >
                              <Lock className="w-4 h-4 text-red-400" />
                              <span>Admin Control Center</span>
                            </Link>
                          </>
                        )}
                      </div>

                      <div className="border-t border-zinc-800 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-bold text-red-400 hover:bg-zinc-800 text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-xs font-extrabold tracking-wider uppercase transition-all shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Portal Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-4 space-y-2">
            {isAuthenticated && user ? (
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 mb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{user.full_name}</p>
                    <p className="text-[11px] font-mono text-zinc-400">{user.email}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 uppercase">
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-zinc-800">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setProfileModalOpen(true);
                    }}
                    className="flex-1 py-1 text-center text-xs font-semibold bg-zinc-800 text-zinc-200 rounded-lg"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-1 text-center text-xs font-bold bg-red-950 text-red-400 rounded-lg border border-red-800"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2 bg-emerald-500 text-black font-bold rounded-xl text-xs uppercase"
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
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-zinc-900 text-emerald-400 font-bold'
                      : 'text-zinc-300 hover:bg-zinc-900'
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
