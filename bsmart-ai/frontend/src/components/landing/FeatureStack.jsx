import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Check, Sparkles, Shield, Cpu, Compass, FileCheck, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// StarBorder component inspired directly by CodeZen's lT component
const StarBorder = ({ as: Component = 'div', className = '', color = '#00f2fe, #4facfe, #7000ff', speed = '8s', children, ...props }) => {
  return (
    <Component className={`star-border-container ${className}`} {...props}>
      <div
        className="border-gradient-full"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${color}, transparent)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content">
        {children}
      </div>
    </Component>
  );
};

// Button StarBorder for CTAs
const StarButton = ({ to, color = '#ffffff, #777777, #ffffff', speed = '4s', children, className = '' }) => {
  return (
    <Link to={to} className={`btn-star-border ${className}`}>
      <div
        className="border-gradient-full"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${color}, transparent)`,
          animationDuration: speed,
        }}
      />
      <div className="btn-inner-content">
        {children}
      </div>
    </Link>
  );
};

export const FeatureStack = () => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const cards = [
    {
      num: "001",
      title: "AI REGULATORY ASSISTANT",
      tag: "GROUNDED RAG • 12+ INDIC LANGUAGES • ZERO HALLUCINATION",
      desc: "Instant statutory guidance on mandatory Indian Standards, Quality Control Orders, and Scheme-I licensing. Every citation is legally verified against official BIS gazette gazettes.",
      link: "/assistant",
      color: "#00f2fe, #4facfe, #7000ff",
      btnColor: "#00f2fe, #38bdf8",
      cta: "Launch Assistant",
      icon: Cpu,
      previewType: "rag",
      chips: ["RAG PIPELINE", "BHASHINI SPEECH", "CLAUSE 5.1 VERIFIED", "< 450MS LATENCY"]
    },
    {
      num: "002",
      title: "STANDARDS MATCHER",
      tag: "SEMANTIC SEARCH • HARMONIZED CLASSIFICATION • DPIIT QCOs",
      desc: "Transform commercial product names, raw materials, and capacities into mandatory IS Codes with live enforcement deadlines, testing procedures, and exemption thresholds.",
      link: "/matcher",
      color: "#a855f7, #6366f1, #3b82f6",
      btnColor: "#c084fc, #818cf8",
      cta: "Find My Standard",
      icon: Compass,
      previewType: "matcher",
      chips: ["20,000+ STANDARDS", "QCO RESOLUTION", "HSN CODE MAPPING", "ZERO AMBIGUITY"]
    },
    {
      num: "003",
      title: "PRODUCT VERIFICATION",
      tag: "7-DIGIT ISI CM/L • 6-CHAR GOLD HUID • RECALL ALERTS",
      desc: "Protect Indian households from substandard and counterfeit products. Verify genuine manufacturer CM/L numbers and decode 6-character laser-engraved gold hallmarking codes.",
      link: "/verify-isi",
      color: "#fbbf24, #f59e0b, #d97706",
      btnColor: "#fde047, #f59e0b",
      cta: "Verify Authenticity",
      icon: Shield,
      previewType: "verify",
      chips: ["SCHEME-I AUTHENTICITY", "22K/18K/14K HALLMARK", "AHC RECOGNITION", "CITIZEN SAFETY"]
    },
    {
      num: "004",
      title: "10-STEP CERTIFICATION",
      tag: "APPLICATION FORM-V • LAB TESTING STI • FACTORY AUDIT",
      desc: "Step-by-step statutory certification roadmap for MSMEs and domestic manufacturers. Tracks testing checklists, STI requirements, and factory audit readiness.",
      link: "/certification",
      color: "#10b981, #14b8a6, #06b6d4",
      btnColor: "#34d399, #2dd4bf",
      cta: "Start 10-Step Wizard",
      icon: FileCheck,
      previewType: "wizard",
      chips: ["FORM-V FILING", "STI COMPLIANCE", "IN-HOUSE LAB SETUP", "AUDIT READINESS"]
    }
  ];

  useGSAP(() => {
    const cardElements = gsap.utils.toArray('.pinned-card-item');
    if (cardElements.length <= 1 || !stageRef.current) return;

    // Initially: Card 001 docked. Cards 002, 003, 004 positioned below
    gsap.set(cardElements.slice(1), {
      yPercent: 125,
      opacity: 1,
      scale: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 4.4}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // 1. CARDS SEQUENTIAL 100% OVERLAP (001 -> 002 -> 003 -> 004)
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
          scale: 0.94 - (index - 1) * 0.02,
          opacity: 0.35,
          filter: 'blur(3px)',
          transformOrigin: 'center top',
          ease: 'power1.inOut',
          duration: 0.8,
        }, '<');
      }
    });

    // 2. PHASE A — STACK HOLD (Complete stacked composition held while user continues scrolling)
    tl.to({}, { duration: 1.0 });

    // 3. PHASE B — POST-OVERLAP FAN-OUT & REVEAL
    // Fan out so tabs and huge numbers peek through
    cardElements.forEach((card, idx) => {
      const inner = card.querySelector('.card-surface');
      const yOffset = (idx - 3) * 16;
      const xOffset = (idx - 1.5) * 8;
      if (inner) {
        tl.to(inner, {
          y: yOffset,
          x: xOffset,
          filter: 'blur(0px)',
          opacity: idx === cardElements.length - 1 ? 1 : 0.8,
          duration: 0.9,
          ease: 'power2.inOut',
        }, '<');
      }
    });

    // Slide front card 004 sideways to reveal 003
    const card004 = cardElements[3];
    const card003 = cardElements[2];
    const inner004 = card004?.querySelector('.card-surface');
    const inner003 = card003?.querySelector('.card-surface');

    if (inner004) {
      tl.to(inner004, {
        xPercent: -42,
        scale: 0.93,
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

    // 3.3 Stack Shrink into 3D Void & Exact CodeZen Kinetic Arc Wheel rising from bottom
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
      z: -2600,
      scale: 0.16,
      opacity: 0,
      y: -30,
      duration: 1.6,
      ease: 'power2.in',
    })
    // Kinetic Arc Wheel rotates across bottom from 180deg to 0deg
    .fromTo('.kinetic-wheel-container', {
      rotation: 180,
      opacity: 0,
    }, {
      rotation: 0,
      opacity: 1,
      duration: 1.8,
      ease: 'power1.out',
    }, '<+=0.1')
    .to('.kinetic-wheel-container', {
      opacity: 0.15,
      duration: 0.8,
      ease: 'power2.in',
    }, '>-0.4')
    .fromTo('.stack-next-prompt', {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '<');

    // 4. Release Hold Buffer
    tl.to({}, { duration: 0.6 });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      data-theme="dark"
      className="bg-black text-white relative border-b border-zinc-900 min-h-screen flex flex-col justify-center py-16 px-4 sm:px-8 lg:px-12 overflow-hidden select-none"
      style={{ perspective: "1500px" }}
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-zinc-900/20 blur-[140px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="max-w-6xl mx-auto w-full mb-6 sm:mb-8 text-center sm:text-left relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950 font-mono text-[11px] tracking-widest text-zinc-400 uppercase mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>02 — CODEZEN KINETIC CARDS • CORE CAPABILITIES</span>
        </div>
        <h2 className="editorial-headline text-3xl sm:text-5xl md:text-6xl text-white">
          PINNED <span className="text-zinc-500">FEATURE STACK.</span>
        </h2>
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-2">
          Scroll to experience 100% sequential card stacking & 3D void physics
        </p>
      </div>

      {/* CodeZen Exact Kinetic Arc Wheel — Positioned at bottom with 50% 100% origin */}
      <div 
        className="kinetic-wheel-container pointer-events-none absolute -bottom-[18vh] left-0 w-full z-10 opacity-0 will-change-transform"
        style={{ transformOrigin: '50% 100%' }}
      >
        <svg viewBox="0 0 3000 1500" className="w-full h-auto" style={{ overflow: 'visible' }}>
          <defs>
            <path 
              id="arc-path" 
              d="M 400,1500 A 1100,1100 0 0,1 2600,1500" 
              fill="none" 
              stroke="none" 
            />
          </defs>
          {[
            { text: "STANDARDS", offset: "14%" },
            { text: "•", offset: "26%" },
            { text: "COMPLIANCE", offset: "38%" },
            { text: "•", offset: "50%" },
            { text: "CERTIFY", offset: "62%" },
            { text: "•", offset: "73%" },
            { text: "VERIFY", offset: "85%" }
          ].map((item, idx) => (
            <text 
              key={idx}
              fill="#ffffff" 
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: item.text === "•" ? "55px" : "110px",
                textTransform: "uppercase",
                letterSpacing: "4px"
              }} 
              dy={item.text === "•" ? "-18" : "0"}
            >
              <textPath href="#arc-path" startOffset={item.offset} textAnchor="middle">
                {item.text}
              </textPath>
            </text>
          ))}
        </svg>
      </div>

      {/* Next Section Indicator */}
      <div className="stack-next-prompt absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-0 will-change-transform z-20">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
          CONTINUING TO NEXT SECTION
        </span>
        <span className="text-sm font-bold text-white tracking-wider uppercase flex items-center justify-center space-x-1">
          <span>03 — WORKFLOW TIMELINE</span>
          <span>↓</span>
        </span>
      </div>

      {/* Pinned Stage Container */}
      <div 
        ref={stageRef} 
        className="relative max-w-6xl mx-auto w-full h-[580px] sm:h-[500px] will-change-transform z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {cards.map((c, idx) => (
          <div
            key={c.num}
            className="pinned-card-item absolute inset-0 w-full will-change-transform"
            style={{
              zIndex: 10 + idx,
              top: `${idx * 14}px`,
            }}
          >
            <div className="card-surface h-full will-change-transform">
              {/* CodeZen StarBorder Card Container */}
              <StarBorder
                color={c.color}
                speed="8s"
                className="w-full h-full shadow-[0_-25px_60px_rgba(0,0,0,0.95),0_35px_90px_rgba(0,0,0,0.98)]"
              >
                <div className="h-full p-6 sm:p-10 flex flex-col justify-between">
                  {/* Top Row — CodeZen ID & Brand Group */}
                  <div className="card-top-row flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-900 gap-4">
                    <div className="id-brand-group flex items-baseline space-x-5">
                      <span className="huge-number font-mono text-5xl sm:text-7xl font-black text-white tracking-tighter leading-none">
                        {c.num}
                      </span>
                      <div className="client-info">
                        <h3 className="label text-xl sm:text-2xl font-black tracking-tight uppercase text-white">
                          {c.title}
                        </h3>
                        <span className="client-name font-mono text-[11px] tracking-wider text-zinc-400 uppercase block mt-0.5">
                          {c.tag}
                        </span>
                      </div>
                    </div>

                    {/* CodeZen Star Button CTA */}
                    <StarButton
                      to={c.link}
                      color={c.btnColor}
                      speed="3s"
                      className="live-btn-star self-start sm:self-auto cursor-pointer"
                    >
                      <span>{c.cta}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </StarButton>
                  </div>

                  {/* Body Content Grid */}
                  <div className="content-grid grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-5 items-stretch flex-grow">
                    {/* Left Column: Visual Showcase */}
                    <div className="lg:col-span-6 bg-zinc-950/80 rounded-2xl p-5 border border-zinc-900 flex flex-col justify-between font-mono text-xs overflow-hidden relative group">
                      <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-3 border-b border-zinc-900">
                        <div className="flex items-center space-x-2">
                          <c.icon className="w-4 h-4 text-white" />
                          <span className="font-bold text-white tracking-wider">LIVE ENGINE VIEW</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                          ONLINE
                        </span>
                      </div>

                      {/* Card 001: RAG Assistant Showcase */}
                      {c.previewType === 'rag' && (
                        <div className="space-y-3 py-3">
                          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs">
                            <span className="text-zinc-500 block text-[10px] uppercase">User Prompt</span>
                            <span className="text-white font-semibold">"What is the safety pressure relief limit for domestic pressure cookers?"</span>
                          </div>
                          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs space-y-1">
                            <div className="flex items-center justify-between text-cyan-400 text-[10px] font-bold">
                              <span>GROUNDED CITATION: IS 2347:2017 [CLAUSE 5.1]</span>
                              <span className="text-emerald-400">99.8% CONFIDENCE</span>
                            </div>
                            <p className="text-zinc-300 text-[11px] leading-relaxed">
                              "The operating pressure must release at 1.0 kgf/cm² with a secondary safety fuse plug complying with Schedule IV."
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Card 002: Standards Matcher Showcase */}
                      {c.previewType === 'matcher' && (
                        <div className="space-y-3 py-3">
                          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs">
                            <span className="text-zinc-500 block text-[10px] uppercase">Input Product</span>
                            <span className="text-white font-semibold">"Packaged Drinking Water (Other than Natural Mineral Water)"</span>
                          </div>
                          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs space-y-1.5">
                            <div className="flex items-center justify-between text-purple-300 text-[10px] font-bold">
                              <span>RESOLVED STANDARD: IS 14543:2016</span>
                              <span className="text-amber-400">MANDATORY QCO</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[10px] text-zinc-400">
                              <span>SCHEME-I COMPULSORY</span>
                              <span>•</span>
                              <span>DPIIT GAZETTE ENFORCED</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Card 003: Verification Showcase */}
                      {c.previewType === 'verify' && (
                        <div className="space-y-3 py-3">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                              <span className="text-zinc-500 block text-[10px]">ISI LICENCE</span>
                              <span className="text-amber-400 font-bold">CM/L-8400123</span>
                              <span className="text-emerald-400 text-[10px] block mt-0.5">● OPERATIVE</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                              <span className="text-zinc-500 block text-[10px]">GOLD HALLMARK</span>
                              <span className="text-amber-400 font-bold">HUID: AB89K2</span>
                              <span className="text-emerald-400 text-[10px] block mt-0.5">● 22K 916 AUTHENTIC</span>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-[11px] text-zinc-300">
                            Manufacturer: Hawkins Cookers Limited • Factory: Thane West
                          </div>
                        </div>
                      )}

                      {/* Card 004: Wizard Roadmap Showcase */}
                      {c.previewType === 'wizard' && (
                        <div className="space-y-2 py-2 text-xs">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 text-[11px]">
                            <div className="flex items-center space-x-2">
                              <Check className="w-3.5 h-3.5" />
                              <span>Step 01: Application Form-V Filing</span>
                            </div>
                            <span className="text-[10px] font-bold">COMPLETED</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 text-[11px]">
                            <div className="flex items-center space-x-2">
                              <Check className="w-3.5 h-3.5" />
                              <span>Step 02: In-House QC Lab & STI</span>
                            </div>
                            <span className="text-[10px] font-bold">VERIFIED</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px]">
                            <div className="flex items-center space-x-2">
                              <span className="w-3.5 h-3.5 rounded-full border border-zinc-600 flex items-center justify-center text-[9px]">3</span>
                              <span>Step 03: BIS Factory Audit Readiness</span>
                            </div>
                            <span className="text-[10px] text-cyan-400">IN PROGRESS</span>
                          </div>
                        </div>
                      )}

                      <div className="text-[10px] text-zinc-600 uppercase tracking-widest pt-2 flex items-center justify-between border-t border-zinc-900">
                        <span>BIS SMART TELEMETRY</span>
                        <span className="text-zinc-500 font-mono">NODE 26107</span>
                      </div>
                    </div>

                    {/* Right Column: Editorial Description & Capability Chips */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                      <div>
                        <p className="project-description text-sm sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed">
                          {c.desc}
                        </p>
                      </div>

                      {/* Subsystem Capability Chips */}
                      <div className="space-y-3 pt-2">
                        <div className="flex flex-wrap gap-2">
                          {c.chips.map((chip, i) => (
                            <span
                              key={i}
                              className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase tracking-wider"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-500 pt-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Statutory Gazette Grounded • Updated for 2026 Regulations</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StarBorder>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

