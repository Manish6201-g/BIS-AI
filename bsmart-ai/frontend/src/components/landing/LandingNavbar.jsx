import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, Globe, ChevronDown } from 'lucide-react';
import { NavOverlay } from './NavOverlay';
import { useLanguage } from '../../context/LanguageContext';

export const LandingNavbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const { currentLang, setCurrentLang, languages, t } = useLanguage();
  const langMenuRef = useRef(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    if (langMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [langMenuOpen]);

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

  const activeLangObj = languages.find(l => l.code === currentLang) || languages[0];

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

          {/* Right: Language Selector + Circular Hamburger Button */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                  isDarkSection
                    ? 'border-zinc-700 bg-zinc-900/90 text-zinc-200 hover:border-white hover:text-white'
                    : 'border-zinc-300 bg-white/90 text-zinc-800 hover:border-black hover:text-black'
                }`}
                title="Change language / भाषा बदलें"
                aria-label="Change Language"
                aria-expanded={langMenuOpen}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-bold tracking-wide">{activeLangObj.native}</span>
                <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {langMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 p-2 shadow-2xl z-50 text-white font-sans backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
                  role="menu"
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800/80 mb-1">
                    Select Language / भाषा चुनें
                  </div>
                  <div className="grid grid-cols-1 gap-0.5">
                    {languages.map((lang) => {
                      const isSelected = lang.code === currentLang;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setCurrentLang(lang.code);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                            isSelected 
                              ? 'bg-white text-black font-bold' 
                              : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                          }`}
                        >
                          <span className="font-medium">{lang.native}</span>
                          <span className={`text-[10px] font-mono ${isSelected ? 'text-zinc-700' : 'text-zinc-500'}`}>
                            {lang.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 opacity-40 hidden sm:block" />

            {/* Menu Trigger */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="hidden sm:inline-block font-mono text-xs tracking-widest uppercase opacity-50">
                {t('nav_menu') || 'MENU'}
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
        </div>
      </header>

      {/* Full-Screen Navigation Overlay */}
      <NavOverlay isOpen={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
};
