import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowUpRight } from 'lucide-react';

export const FooterSection = () => {
  return (
    <footer data-theme="dark" className="bg-black text-white pt-24 pb-8 px-6 sm:px-12 border-t border-zinc-900 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto w-full space-y-16 sm:space-y-24">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Title */}
          <div className="lg:col-span-6 space-y-4">
            <div className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
              BUREAU OF INDIAN STANDARDS / SIH26107
            </div>
            <h2 className="editorial-headline text-3xl sm:text-5xl lg:text-6xl text-white">
              INTELLIGENCE <br />
              FOR INDIAN <br />
              <span className="text-zinc-500">STANDARDS.</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-md pt-2">
              National regulatory compliance assistant for Indian Standards, Quality Control Orders, 
              Scheme-I licensing procedures, and citizen consumer safety verification.
            </p>
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
                  <a href="https://www.bis.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white">
                    <span>BIS NATIONAL</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-600" />
                  </a>
                </li>
                <li>
                  <a href="https://www.manakonline.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white">
                    <span>MANAKONLINE</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-600" />
                  </a>
                </li>
                <li>
                  <a href="https://dpiit.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white">
                    <span>DPIIT QCOs</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-600" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-zinc-500 gap-4">
          <span>© 2026 BISMART AI. DEVELOPED FOR SMART INDIA HACKATHON (SIH26107).</span>
          <div className="flex items-center space-x-4">
            <span>BHASHINI VOICE READY</span>
            <span>•</span>
            <span className="text-zinc-400">100% GROUNDED</span>
          </div>
        </div>

        {/* Giant Clipped Outline Wordmark at Bottom */}
        <div className="overflow-hidden pt-4 -mb-10 sm:-mb-16">
          <div className="giant-bg-text text-outline-giant text-[24vw] leading-none text-center">
            BISmart
          </div>
        </div>
      </div>
    </footer>
  );
};
