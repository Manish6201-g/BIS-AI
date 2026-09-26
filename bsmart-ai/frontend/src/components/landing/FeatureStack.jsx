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

  const stageRef = useRef(null);

  useGSAP(() => {
    const cardElements = gsap.utils.toArray('.pinned-card-item');
    if (cardElements.length <= 1 || !stageRef.current) return;

    // Initially: Card 001 is docked at yPercent: 0.
    // Cards 002, 003, 004 start below the viewport:
    gsap.set(cardElements.slice(1), {
      yPercent: 125,
      opacity: 1,
      scale: 1,
    });

    // Pinned Timeline: Pin the entire section so cards sequentially slide over each other
    // and continue the choreography AFTER the cards overlap
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 4.2}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // 1. CARDS SEQUENTIAL OVERLAP (001 -> 002 -> 003 -> 004)
    cardElements.forEach((card, index) => {
      if (index > 0) {
        const prevCard = cardElements[index - 1];
        const prevInner = prevCard.querySelector('.card-surface');

        tl.to(card, {
          yPercent: 0,
          ease: 'power1.inOut',
          duration: 1,
        })
        .to(prevInner, {
          scale: 0.94 - (index - 1) * 0.025,
          opacity: 0.4,
          filter: 'blur(3px)',
          transformOrigin: 'center top',
          ease: 'power1.inOut',
          duration: 0.8,
        }, '<');
      }
    });

    // 2. PHASE A — STACK HOLD (Hold the complete stacked composition while user continues scrolling)
    tl.to({}, { duration: 1.0 });

    // 3. PHASE B — POST-OVERLAP TRANSFORMATION (CRITICAL REQUIREMENT)
    // 3.1 Depth Separation / Fan: All 4 cards gently fan out revealing previous card numbers and tabs
    cardElements.forEach((card, idx) => {
      const inner = card.querySelector('.card-surface');
      const yOffset = (idx - 3) * 14; // reveals headers/tabs of previous cards
      const xOffset = (idx - 1.5) * 8;
      if (inner) {
        tl.to(inner, {
          y: yOffset,
          x: xOffset,
          filter: 'blur(0px)',
          opacity: idx === cardElements.length - 1 ? 1 : 0.78,
          duration: 0.9,
          ease: 'power2.inOut',
        }, '<');
      }
    });

    // 3.2 Front Card Movement & Card-by-Card Reveal:
    // Card 004 slides to the left, revealing Card 003 and internal live module details underneath
    const card004 = cardElements[3];
    const card003 = cardElements[2];
    const inner004 = card004?.querySelector('.card-surface');
    const inner003 = card003?.querySelector('.card-surface');

    if (inner004) {
      tl.to(inner004, {
        xPercent: -42,
        scale: 0.92,
        opacity: 0.85,
        duration: 1.1,
        ease: 'power2.inOut',
      });
    }

    if (inner003) {
      tl.to(inner003, {
        opacity: 1,
        scale: 0.98,
        duration: 0.8,
        ease: 'power2.out',
      }, '<+=0.2');
    }

    // 3.3 Stack Shrink into Center & Giant Circular Wheel rising from the BOTTOM:
    // The deck clusters and scales down into the center
    tl.to(cardElements.map(c => c.querySelector('.card-surface')), {
      xPercent: 0,
      x: 0,
      y: 0,
      scale: 0.92,
      opacity: 0.7,
      duration: 0.8,
      ease: 'power2.inOut',
    })
    .to(stageRef.current, {
      scale: 0.28,
      opacity: 0,
      y: -35,
      duration: 1.4,
      ease: 'power3.inOut',
    })
    // The giant circular wheel rises from the bottom of the viewport
    .fromTo('.kinetic-bottom-wheel', {
      y: 450,
      opacity: 0,
      rotation: -35,
    }, {
      y: 0,
      opacity: 1,
      rotation: 65,
      duration: 1.5,
      ease: 'power2.out',
    }, '<+=0.1')
    // Continue rotation across the bottom as next section transition approaches
    .to('.kinetic-bottom-wheel', {
      y: -120,
      rotation: 125,
      opacity: 0.2,
      duration: 1.0,
      ease: 'power2.in',
    })
    .fromTo('.stack-next-prompt', {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '<-=0.3');

    // 4. Release Hold Buffer before unpinning to Timeline Section
    tl.to({}, { duration: 0.6 });

    // Recalibrate on resize / load
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      data-theme="dark"
      className="bg-black text-white relative border-b border-zinc-900 min-h-screen flex flex-col justify-center py-16 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full mb-6 sm:mb-8 text-center sm:text-left">
        <div className="font-mono text-xs sm:text-sm tracking-widest text-zinc-500 uppercase mb-2">
          02 — CORE CAPABILITIES
        </div>
        <h2 className="editorial-headline text-3xl sm:text-5xl md:text-6xl text-white">
          PINNED <span className="text-zinc-400">FEATURE STACK.</span>
        </h2>
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-2">
          Scroll to experience 100% sequential card stacking
        </p>
      </div>

      {/* Giant Bottom Circular Wheel shown in reference video — rising from the bottom */}
      <div 
        className="kinetic-bottom-wheel absolute -bottom-[420px] sm:-bottom-[540px] lg:-bottom-[680px] left-1/2 -translate-x-1/2 w-[950px] h-[950px] sm:w-[1300px] sm:h-[1300px] lg:w-[1600px] lg:h-[1600px] pointer-events-none opacity-0 will-change-transform z-20 flex items-center justify-center"
      >
        <svg className="w-full h-full select-none" viewBox="0 0 1600 1600">
          <defs>
            {/* Circle path for text: center 800, 800 with radius 660 */}
            <path 
              id="giantArcCircle" 
              d="M 800, 800 m -660, 0 a 660,660 0 1,1 1320,0 a 660,660 0 1,1 -1320,0" 
              fill="none" 
            />
          </defs>
          {/* Outer dashed tech tracks */}
          <circle cx="800" cy="800" r="750" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="12 16" />
          <circle cx="800" cy="800" r="700" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

          {/* Giant Bold Monospace / Editorial Text along the circle */}
          <text fill="#ffffff" fontSize="42" fontWeight="900" letterSpacing="18" className="uppercase font-mono tracking-widest drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            <textPath href="#giantArcCircle" startOffset="0%">
              • STANDARDS • COMPLIANCE • CERTIFICATION • BISmart AI • STANDARDS • COMPLIANCE • CERTIFICATION • BISmart AI •
            </textPath>
          </text>

          {/* Inner dashed orbital lines */}
          <circle cx="800" cy="800" r="620" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="8 10" />
          <circle cx="800" cy="800" r="540" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </svg>
      </div>

      {/* Next Section Transition indicator that appears as stack shrinks */}
      <div className="stack-next-prompt absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-0 will-change-transform">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
          CONTINUING TO NEXT SECTION
        </span>
        <span className="text-sm font-bold text-white tracking-wider uppercase">
          03 — WORKFLOW TIMELINE ↓
        </span>
      </div>

      {/* Pinned Stage: All 4 cards occupy the exact stage container */}
      <div ref={stageRef} className="relative max-w-5xl mx-auto w-full h-[530px] sm:h-[460px] will-change-transform">
        {cards.map((c, idx) => (
          <div
            key={c.num}
            className="pinned-card-item absolute inset-0 w-full will-change-transform"
            style={{
              zIndex: 10 + idx,
              top: `${idx * 14}px`, // Subtle 14px tab offset for authentic card deck tab headers
            }}
          >
            <div
              className={`card-surface h-full bg-zinc-950 rounded-[32px] p-6 sm:p-10 border ${c.accent} shadow-[0_-25px_50px_rgba(0,0,0,0.95),0_35px_80px_rgba(0,0,0,0.98)] flex flex-col justify-between will-change-transform`}
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
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center flex-grow">
                {/* Visual Preview Left */}
                <div className="lg:col-span-5 bg-black/90 rounded-2xl p-5 border border-zinc-800 min-h-[180px] flex flex-col justify-between font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 pb-2 border-b border-zinc-900">
                    <span>LIVE MODULE ENGINE</span>
                    <span className="text-emerald-400 font-bold">OPERATIONAL</span>
                  </div>

                  {c.previewType === 'rag' && (
                    <div className="space-y-2 py-2">
                      <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-cyan-300 text-xs">
                        [1] IS 2347:2017 — Clause 5.1
                      </div>
                      <div className="p-2 rounded bg-zinc-900/50 text-zinc-400 text-[11px] leading-relaxed">
                        "Safety relief valve must release pressure at 1.5x nominal limit."
                      </div>
                    </div>
                  )}

                  {c.previewType === 'matcher' && (
                    <div className="space-y-2 py-2">
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
                    <div className="space-y-2 py-2">
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
                    <div className="space-y-1 py-2 text-[11px]">
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
                <div className="lg:col-span-7 space-y-4">
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
