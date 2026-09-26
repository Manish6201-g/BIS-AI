import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp, Activity } from 'lucide-react';

export const FooterSection = () => {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      setIstTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer data-theme="dark" className="bg-black text-white pt-24 pb-8 px-6 sm:px-12 border-t border-zinc-900 relative overflow-hidden select-none">
      {/* Background subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-zinc-800/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full space-y-16 sm:space-y-24 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Title & Live Telemetry */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950 font-mono text-[11px] tracking-widest text-zinc-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>BUREAU OF INDIAN STANDARDS / SIH26107</span>
            </div>

            <h2 className="editorial-headline text-3xl sm:text-5xl lg:text-6xl text-white">
              INTELLIGENCE <br />
              FOR INDIAN <br />
              <span className="text-zinc-500">STANDARDS.</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-md">
              National regulatory compliance platform for Indian Standards, Quality Control Orders, 
              Scheme-I licensing procedures, and citizen consumer safety verification.
            </p>

            {/* Live New Delhi IST Clock Widget */}
            <div className="inline-flex items-center space-x-4 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 font-mono text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-400 uppercase text-[10px]">NEW DELHI (IST):</span>
              </div>
              <span className="text-white font-bold tracking-wider">{istTime || '12:00:00'} IST</span>
              <span className="text-zinc-700">|</span>
              <span className="text-emerald-400 text-[10px] uppercase font-semibold">GAZETTE MIRROR ACTIVE</span>
            </div>
          </div>

          {/* Right Navigation Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 font-mono text-xs">
            <div className="space-y-3">
              <span className="text-zinc-500 tracking-widest uppercase block text-[11px]">
                EXPLORE
              </span>
              <ul className="space-y-2 text-zinc-300">
                <li><Link to="/" className="hover:text-white transition-colors">HOME</Link></li>
                <li><Link to="/assistant" className="hover:text-white transition-colors">AI ASSISTANT</Link></li>
                <li><Link to="/matcher" className="hover:text-white transition-colors">STANDARDS MATCHER</Link></li>
                <li><Link to="/certification" className="hover:text-white transition-colors">10-STEP WIZARD</Link></li>
                <li><Link to="/standards" className="hover:text-white transition-colors">STANDARDS EXPLORER</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-zinc-500 tracking-widest uppercase block text-[11px]">
                VERIFICATION
              </span>
              <ul className="space-y-2 text-zinc-300">
                <li><Link to="/verify-isi" className="hover:text-white transition-colors">7-DIGIT ISI CM/L</Link></li>
                <li><Link to="/verify-huid" className="hover:text-white transition-colors">GOLD HUID</Link></li>
                <li><Link to="/auth" className="hover:text-white transition-colors">USER PORTAL</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">ADMIN ANALYTICS</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-zinc-500 tracking-widest uppercase block text-[11px]">
                OFFICIAL
              </span>
              <ul className="space-y-2 text-zinc-300">
                <li>
                  <a href="https://www.bis.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white group">
                    <span>BIS NATIONAL</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-white transition-colors" />
                  </a>
                </li>
                <li>
                  <a href="https://www.manakonline.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white group">
                    <span>MANAKONLINE</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-white transition-colors" />
                  </a>
                </li>
                <li>
                  <a href="https://dpiit.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white group">
                    <span>DPIIT QCOs</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-white transition-colors" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Operational Status & Back To Top */}
        <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-zinc-500 gap-4">
          <span>© 2026 BISMART AI. DEVELOPED FOR SMART INDIA HACKATHON (SIH26107).</span>
          <div className="flex items-center space-x-4">
            <span className="text-zinc-400">BHASHINI VOICE READY</span>
            <span>•</span>
            <span className="text-zinc-400">100% REGULATORY ACCURACY</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Giant Clipped Outline Wordmark at Bottom */}
        <div className="overflow-hidden pt-4 -mb-10 sm:-mb-16">
          <div className="giant-bg-text text-outline-giant text-[24vw] leading-none text-center select-none pointer-events-none">
            BISmart
          </div>
        </div>
      </div>
    </footer>
  );
};
