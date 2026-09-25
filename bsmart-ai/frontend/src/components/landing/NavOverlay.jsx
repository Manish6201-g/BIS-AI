import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Shield, Lock, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const NavOverlay = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth();

  const menuItems = [
    { num: "01", label: "HOME", path: "/" },
    { num: "02", label: "AI ASSISTANT", path: "/assistant", tag: "GROUNDED RAG" },
    { num: "03", label: "STANDARDS MATCHER", path: "/matcher", tag: "QCO ENFORCEMENT" },
    { num: "04", label: "CERTIFICATION WIZARD", path: "/certification", tag: "SCHEME-I" },
    { num: "05", label: "VERIFY ISI MARK", path: "/verify-isi", tag: "7-DIGIT CM/L" },
    { num: "06", label: "VERIFY GOLD HUID", path: "/verify-huid", tag: "HALLMARKING" },
    { num: "07", label: "STANDARDS EXPLORER", path: "/standards", tag: "NATIONAL GAZETTE" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
        >
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
            <Link to="/" onClick={onClose} className="flex items-center space-x-2">
              <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
                BUREAU OF INDIAN STANDARDS
              </span>
              <span className="text-zinc-600">/</span>
              <span className="font-extrabold text-sm tracking-tight text-white uppercase">
                BISmart AI
              </span>
            </Link>

            <button
              onClick={onClose}
              className="circular-menu-btn border border-zinc-700 bg-zinc-900 text-white hover:bg-white hover:text-black hover:border-white transition-all"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Navigation Links with Oversized Typography */}
          <div className="py-12 max-w-4xl">
            <nav className="space-y-4 sm:space-y-6">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="group flex items-baseline space-x-4 sm:space-x-8 hover:text-cyan-400 transition-colors"
                  >
                    <span className="font-mono text-xs sm:text-sm text-zinc-600 group-hover:text-cyan-400 transition-colors">
                      {item.num}
                    </span>
                    <span className="text-2xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
                      {item.label}
                    </span>
                    {item.tag && (
                      <span className="hidden sm:inline-block font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full border border-zinc-800 text-zinc-500 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                        {item.tag}
                      </span>
                    )}
                    <ArrowUpRight className="w-5 h-5 sm:w-8 sm:h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Bottom Bar: Auth, SIH Details & Contact */}
          <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-xs text-zinc-500 font-mono">
            <div className="flex items-center space-x-4">
              <span>SIH 2026 • SIH26107</span>
              <span>•</span>
              <span className="text-zinc-400">DEMO VERIFICATION ENVIRONMENT</span>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-zinc-300 font-bold">{user.full_name}</span>
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="flex items-center space-x-1 text-red-400 hover:text-red-300"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={onClose}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white text-black font-extrabold tracking-wider hover:bg-cyan-400 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>SIGN IN / ACCESS PORTAL</span>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
