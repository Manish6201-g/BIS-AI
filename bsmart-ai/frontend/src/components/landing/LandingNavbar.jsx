import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu } from 'lucide-react';
import { NavOverlay } from './NavOverlay';

export const LandingNavbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple section brightness detector based on viewport scroll position
      const darkSections = document.querySelectorAll('[data-theme="dark"]');
      let currentIsDark = false;
      const navY = 50;

      darkSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= navY && rect.bottom >= navY) {
          currentIsDark = true;
        }
      });

      setIsDarkSection(currentIsDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isScrolled ? 'backdrop-blur-md bg-opacity-80' : 'bg-transparent'
        } ${
          isDarkSection 
            ? 'text-white border-b border-zinc-800/80 bg-black/60' 
            : 'text-black border-b border-zinc-200/80 bg-white/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          {/* Left: Minimal Wordmark */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <span className="font-mono text-xs tracking-widest uppercase opacity-60">
              BIS
            </span>
            <span className="opacity-40">/</span>
            <span className="font-black text-xl tracking-tight uppercase group-hover:tracking-wider transition-all">
              BISmart AI
            </span>
          </Link>

          {/* Right: Circular Hamburger Button */}
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline-block font-mono text-xs tracking-widest uppercase opacity-50">
              MENU
            </span>
            <button
              onClick={() => setNavOpen(true)}
              className={`circular-menu-btn border transition-all ${
                isDarkSection
                  ? 'border-zinc-700 bg-zinc-900/80 text-white hover:bg-white hover:text-black hover:border-white'
                  : 'border-zinc-300 bg-white/90 text-black hover:bg-black hover:text-white hover:border-black'
              }`}
              aria-label="Open navigation menu"
            >
              <div className="w-2 h-2 rounded-full bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Navigation Overlay */}
      <NavOverlay isOpen={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
};
