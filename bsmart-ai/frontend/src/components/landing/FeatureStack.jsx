import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Check, MessageSquare, Search, Award, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FeatureStack = () => {
  const containerRef = useRef(null);

  const cards = [
    {
      num: "001",
      title: "AI ASSISTANT",
      tag: "GROUNDED RAG / ZERO HALLUCINATION",
      desc: "Ask regulatory questions about Indian Standards in natural language. Every answer is legally grounded in verified BIS specifications with exact clause citations.",
      link: "/assistant",
      accent: "border-cyan-500/50 text-cyan-400 shadow-cyan-950/20",
      cta: "Launch Assistant",
      previewType: "rag"
    },
    {
      num: "002",
      title: "BIS STANDARDS EXPLORER",
      tag: "SEMANTIC SEARCH & QCO RESOLUTION",
      desc: "Search by commercial product name, material composition, or capacity. Maps items directly to mandatory IS Codes and highlights DPIIT enforcement deadlines.",
      link: "/matcher",
      accent: "border-purple-500/50 text-purple-400 shadow-purple-950/20",
      cta: "Find My Standard",
      previewType: "matcher"
    },
    {
      num: "003",
      title: "PRODUCT VERIFICATION",
      tag: "7-DIGIT CM/L & 6-DIGIT HUID",
      desc: "Protect citizens against counterfeit items. Check genuine 7-digit ISI certification licences and decode 6-character laser-engraved Gold HUID hallmarking codes.",
      link: "/verify-isi",
      accent: "border-amber-500/50 text-amber-400 shadow-amber-950/20",
      cta: "Verify Authenticity",
      previewType: "verify"
    },
    {
      num: "004",
      title: "CERTIFICATION GUIDANCE",
      tag: "10-STEP SCHEME-I ISI ROADMAP",
      desc: "Interactive manufacturer workflow covering application filings, factory testing checklists, laboratory sample evaluations, and audit readiness reports.",
      link: "/certification",
      accent: "border-emerald-500/50 text-emerald-400 shadow-emerald-950/20",
      cta: "Start 10-Step Wizard",
      previewType: "wizard"
    }
  ];

  useGSAP(() => {
    const cardElements = gsap.utils.toArray('.feature-stack-card');

    cardElements.forEach((card, index) => {
      if (index < cardElements.length - 1) {
        const nextCard = cardElements[index + 1];
        const inner = card.querySelector('.feature-card-inner');

        gsap.to(inner, {
          scale: 0.92 - (cardElements.length - 1 - index) * 0.02,
          opacity: 0.35,
          filter: 'blur(3px)',
          yPercent: -3,
          transformOrigin: 'center top',
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 90%',
            end: 'top 20%',
            scrub: true,
          }
        });
      }
    });

    // Ensure ScrollTrigger recalibrates accurately after layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      data-theme="dark"
      className="bg-black text-white pt-24 pb-32 px-4 sm:px-8 lg:px-12 border-b border-zinc-900 relative"
    >
      <div className="max-w-6xl mx-auto w-full mb-16 sm:mb-24 text-center sm:text-left">
        <div className="font-mono text-xs sm:text-sm tracking-widest text-zinc-500 uppercase mb-3">
          02 — CORE CAPABILITIES
        </div>
        <h2 className="editorial-headline text-4xl sm:text-6xl md:text-7xl text-white">
          PINNED <br />
          <span className="text-zinc-400">FEATURE STACK.</span>
        </h2>
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-4">
          Scroll down to experience progressive card stacking physics
        </p>
      </div>

      {/* Cards Stack with Staggered Sticky Offset and Full Scroll Runway */}
      <div className="max-w-5xl mx-auto relative">
        {cards.map((c, idx) => (
          <div
            key={c.num}
            className="feature-stack-card sticky will-change-transform"
            style={{
              top: `calc(80px + ${idx * 24}px)`,
              zIndex: 10 + idx,
              marginBottom: idx === cards.length - 1 ? '100vh' : '65vh',
            }}
          >
            <div
              className={`feature-card-inner bg-zinc-950 rounded-[32px] p-6 sm:p-10 border ${c.accent} shadow-[0_-25px_50px_rgba(0,0,0,0.95),0_35px_80px_rgba(0,0,0,0.98)] transition-all duration-300 will-change-transform`}
            >
              {/* Card Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
                <div className="flex items-baseline space-x-6">
                  <span className="font-mono text-4xl sm:text-6xl font-black text-white tracking-tighter">
                    {c.num}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-3xl font-black tracking-tight uppercase text-white">
                      {c.title}
                    </h3>
                    <span className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase mt-0.5 block">
                      {c.tag}
                    </span>
                  </div>
                </div>

                <Link
                  to={c.link}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold tracking-wider uppercase transition-colors self-start sm:self-auto group"
                >
                  <span>{c.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              {/* Card Body Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
                {/* Visual Preview Left */}
                <div className="lg:col-span-5 bg-black/90 rounded-2xl p-6 border border-zinc-800 min-h-[190px] flex flex-col justify-between font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 pb-2 border-b border-zinc-900">
                    <span>LIVE MODULE ENGINE</span>
                    <span className="text-emerald-400 font-bold">OPERATIONAL</span>
                  </div>

                  {c.previewType === 'rag' && (
                    <div className="space-y-2 py-3">
                      <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-cyan-300 text-xs">
                        [1] IS 2347:2017 — Clause 5.1
                      </div>
                      <div className="p-2 rounded bg-zinc-900/50 text-zinc-400 text-[11px] leading-relaxed">
                        "Safety relief valve must release pressure at 1.5x nominal limit."
                      </div>
                    </div>
                  )}

                  {c.previewType === 'matcher' && (
                    <div className="space-y-2 py-3">
                      <div className="p-2 rounded bg-zinc-900 text-purple-300 flex justify-between">
                        <span>Pressure Cooker</span>
                        <span className="font-bold">→ IS 2347</span>
                      </div>
                      <div className="p-2 rounded bg-zinc-900/50 text-zinc-400 text-[11px]">
                        QCO: MANDATORY (DPIIT Order)
                      </div>
                    </div>
                  )}

                  {c.previewType === 'verify' && (
                    <div className="space-y-2 py-3">
                      <div className="p-2 rounded bg-zinc-900 text-amber-300 flex justify-between">
                        <span>CM/L-8400123</span>
                        <span className="text-emerald-400 font-bold">VERIFIED</span>
                      </div>
                      <div className="p-2 rounded bg-zinc-900/50 text-zinc-400 text-[11px]">
                        Mfr: Hawkins Cookers Ltd • Active
                      </div>
                    </div>
                  )}

                  {c.previewType === 'wizard' && (
                    <div className="space-y-1.5 py-3 text-[11px]">
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        <span>Step 01: Application Form-V</span>
                      </div>
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        <span>Step 02: In-House Testing Lab</span>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-500">
                        <span>○ Step 03: Factory Audit</span>
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-zinc-600 uppercase tracking-widest pt-2">
                    BIS CONNECT GAZETTE MIRROR
                  </div>
                </div>

                {/* Description Right */}
                <div className="lg:col-span-7 space-y-5">
                  <p className="text-base sm:text-xl text-zinc-300 font-normal leading-relaxed">
                    {c.desc}
                  </p>
                  <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400 pt-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Statutory Grounding • Automatic Real-Time Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
