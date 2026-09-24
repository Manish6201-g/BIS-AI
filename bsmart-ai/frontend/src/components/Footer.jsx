import React from 'react';
import { Shield, ExternalLink, Award, FileCheck, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-emerald-400" />
              <span className="font-extrabold text-xl text-white uppercase tracking-tight">BISmart AI</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              AI-Powered Intelligent Assistant for Indian Standards (IS), Bureau of Indian Standards (BIS) services, 
              Quality Control Orders (QCOs), and product authenticity verification.
            </p>
            <div className="inline-flex items-center space-x-2 bg-zinc-900 text-emerald-400 px-3 py-1 rounded-full text-xs border border-zinc-800 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>SIH 2026 Problem SIH26107</span>
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">BIS Core Systems</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/matcher" className="hover:text-emerald-400 transition-colors">Product-to-Standard Matcher</a></li>
              <li><a href="/certification" className="hover:text-emerald-400 transition-colors">Scheme-I ISI Certification Wizard</a></li>
              <li><a href="/verify-isi" className="hover:text-emerald-400 transition-colors">CM/L Licence Authenticity Check</a></li>
              <li><a href="/verify-huid" className="hover:text-emerald-400 transition-colors">HUID Gold Hallmarking Verifier</a></li>
              <li><a href="/standards" className="hover:text-emerald-400 transition-colors">National Standards Explorer</a></li>
            </ul>
          </div>

          {/* Col 3: Official Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Official Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.bis.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                  <span>BIS National Portal</span>
                  <ExternalLink className="w-3 h-3 text-zinc-600" />
                </a>
              </li>
              <li>
                <a href="https://www.manakonline.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                  <span>Manakonline e-Services</span>
                  <ExternalLink className="w-3 h-3 text-zinc-600" />
                </a>
              </li>
              <li>
                <a href="https://www.services.bis.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                  <span>Know Your Standard (KYS)</span>
                  <ExternalLink className="w-3 h-3 text-zinc-600" />
                </a>
              </li>
              <li>
                <a href="https://dpiit.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                  <span>DPIIT Quality Control Orders</span>
                  <ExternalLink className="w-3 h-3 text-zinc-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Anti-Hallucination Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Compliance & Grounding</h4>
            <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
              <strong className="text-zinc-200 block mb-1">Strict Legal Safeguard:</strong>
              All standard clauses, test criteria, and QCO regulations presented by BISmart AI are retrieved 
              from verified BIS gazette notifications. Unverified assertions are strictly rejected by our anti-hallucination engine.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 font-mono">
          <p>© 2026 BISmart AI — Smart India Hackathon Prototype. Developed for National Standardization & Consumer Safety.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <span>Demo Data Mode Enabled</span>
            <span>•</span>
            <span>Bhashini Multilingual Voice Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
