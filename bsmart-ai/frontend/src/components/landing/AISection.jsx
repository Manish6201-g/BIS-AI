import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, ArrowRight, Sparkles, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AISection = () => {
  const sectionRef = useRef(null);
  const [selectedPreset, setSelectedPreset] = useState(0);

  const presets = [
    {
      label: "IS 2347 (Pressure Cookers)",
      query: "What mandatory BIS standards and QCO orders apply to domestic pressure cookers?",
      clause: "[1] IS 2347:2017 Clause 5.1 — Thermal Safety Relief Mechanism",
      text: "Under IS 2347:2017, all domestic pressure cookers sold or imported in India require mandatory Scheme-I ISI mark certification. Enforced under the Domestic Pressure Cooker (Quality Control) Order issued by DPIIT.",
      badge: "IS 2347 • MANDATORY QCO",
      confidence: "99.8% VERIFIED"
    },
    {
      label: "Packaged Water (IS 14543)",
      query: "Is ISI mark compulsory for packaged drinking water manufacturing in India?",
      clause: "[2] IS 14543:2016 Clause 4.2 — Microbiological Purity Thresholds",
      text: "Yes, under the Prevention of Food Adulteration and FSSAI regulations, no person shall manufacture or sell packaged drinking water without a valid BIS Certification Marks Licence (CM/L).",
      badge: "IS 14543 • COMPULSORY LICENCE",
      confidence: "99.6% VERIFIED"
    },
    {
      label: "Gold HUID Hallmarking",
      query: "How does 6-digit laser-engraved HUID authenticate 22K 916 gold jewellery?",
      clause: "[3] IS 1417:2016 Clause 6.1 — Assaying & Hallmarking Protocol",
      text: "Every piece of 22K (916) or 18K (750) gold jewellery receives a unique 6-character alphanumeric Hallmark Unique Identification (HUID) code at recognized BIS Assaying & Hallmarking Centres (AHC).",
      badge: "IS 1417 • CENTRAL ASSAY DB",
      confidence: "100% VERIFIED"
    },
    {
      label: "Scheme-I Form-V Audit",
      query: "What are the essential steps for MSMEs to obtain an ISI mark factory licence?",
      clause: "[4] BIS Conformity Assessment Regs 2018 — Scheme-I Regulation 4",
      text: "Applicants must establish an in-house quality control testing laboratory, submit Application Form-V via Manakonline, undergo factory inspection by a BIS technical auditor, and clear drawn sample testing.",
      badge: "FORM-V • 10-STEP ROADMAP",
      confidence: "99.4% VERIFIED"
    }
  ];

  const current = presets[selectedPreset];

  useGSAP(() => {
    gsap.from('.ai-headline', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      }
    });

    gsap.from('.ai-dialogue-box', {
      y: 50,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.ai-dialogue-box',
        start: 'top 75%',
        once: true,
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="bg-black text-white py-24 sm:py-36 px-6 sm:px-12 border-b border-zinc-900 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="ai-headline max-w-4xl mb-14 sm:mb-20">
          <div className="font-mono text-xs sm:text-sm tracking-widest text-zinc-500 uppercase mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>04 — ANTI-HALLUCINATION RETRIEVAL</span>
          </div>
          <h2 className="editorial-headline text-4xl sm:text-6xl md:text-8xl text-white">
            INTELLIGENCE <br />
            FOR <span className="text-zinc-500">INDIAN</span> <br />
            STANDARDS.
          </h2>
          <p className="text-base sm:text-xl text-zinc-400 font-normal leading-relaxed mt-6 max-w-2xl">
            Our hybrid semantic vector retrieval searches only authentic Bureau of Indian Standards gazette notifications and Quality Control Orders. 
            Assertions lacking statutory legal backing are strictly rejected.
          </p>
        </div>

        {/* CodeZen-Inspired Interactive Terminal Dialogue Shell */}
        <div className="ai-dialogue-box bg-zinc-950 border border-zinc-800 rounded-[32px] p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 select-none">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-zinc-500 hidden sm:inline">
                bismart-kernel://rag-evaluator.live
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
              <span className="inline-block h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
              <span className="tracking-wider uppercase">TERMINAL SESSION: LIVE</span>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 pt-1 select-none">
            <span className="text-xs font-mono text-zinc-500 self-center mr-1">Query Presets:</span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPreset(idx)}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  selectedPreset === idx
                    ? 'bg-white text-black border-white font-bold shadow-md'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* User Query Block */}
          <div className="border-l-2 border-cyan-500/80 pl-5 sm:pl-6 py-1 space-y-1.5">
            <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              USER REGULATORY INQUIRY
            </span>
            <p className="text-lg sm:text-2xl font-bold text-white tracking-tight">
              "{current.query}"
            </p>
          </div>

          {/* AI Response Card */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  GROUNDED REGULATORY OUTPUT
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-0.5 rounded-full uppercase">
                {current.confidence}
              </span>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              {current.text}
            </p>

            {/* Interactive Clause Citation Drawer Simulation */}
            <div className="bg-black/90 border border-cyan-500/30 rounded-xl p-4 font-mono text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-cyan-300">
                <BookOpen className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>{current.clause}</span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                GAZETTE NOTIFICATION STATUTORY RECORD
              </span>
            </div>
          </div>

          {/* Bottom Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="font-mono text-xs text-zinc-500 tracking-wider">
              MULTILINGUAL BHASHINI VOICE & TEXT SUPPORT READY
            </div>
            <Link
              to="/assistant"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-all duration-200 self-start sm:self-auto group"
            >
              <span>Ask Your Own Query</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
