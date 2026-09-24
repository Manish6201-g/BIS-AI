import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  MessageSquare, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight,
  BookOpen, 
  CheckCheck, 
  Building, 
  Users, 
  FileText, 
  ChevronRight,
  HelpCircle,
  BarChart2,
  ChevronDown,
  Layers,
  Cpu,
  Compass,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LandingPage = () => {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeAccordion, setActiveAccordion] = useState(0);

  // Mouse move for glowing ambient aura in hero
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const stackCards = [
    {
      id: "001",
      title: "GROUNDED RAG ENGINE",
      tag: "100% Anti-Hallucination / Exact Clause Citations",
      desc: "Every response is legally anchored in official BIS gazettes, specifications, and amendments. Inspect exact clause numbers (e.g., [1] IS 2347:2017 Clause 5.1) directly with interactive drawer previews.",
      cta: "Launch Assistant",
      link: "/assistant",
      borderColor: "neon-border-cyan",
      badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-800",
      numberColor: "text-cyan-400",
      graphicType: "rag"
    },
    {
      id: "002",
      title: "PRODUCT-TO-STANDARD MATCHER",
      tag: "Semantic AI Resolution / Mandatory QCOs",
      desc: "Search by commercial product name, material composition, or capacity. The engine maps items to mandatory Indian Standards (IS Code), identifies DPIIT Quality Control Orders, and displays enforcement deadlines.",
      cta: "Find My Standard",
      link: "/matcher",
      borderColor: "neon-border-purple",
      badgeColor: "text-purple-400 bg-purple-950/60 border-purple-800",
      numberColor: "text-purple-400",
      graphicType: "matcher"
    },
    {
      id: "003",
      title: "SCHEME-I CERTIFICATION WIZARD",
      tag: "10-Step Interactive Manufacturer Roadmap",
      desc: "Guided operational workflow for MSMEs and industrial manufacturers: application filing, factory testing checklists, independent lab evaluations, technical documentation, and audit readiness reports.",
      cta: "Start 10-Step Wizard",
      link: "/certification",
      borderColor: "neon-border-emerald",
      badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800",
      numberColor: "text-emerald-400",
      graphicType: "wizard"
    },
    {
      id: "004",
      title: "AUTHENTICITY VERIFICATION ENGINE",
      tag: "7-Digit ISI CM/L & 6-Digit Gold HUID Checks",
      desc: "Protect Indian citizens against counterfeit, uncertified products. Verify genuine 7-digit CM/L licence numbers and decode 6-character laser-engraved HUID hallmarking codes on 22K/18K gold jewellery in seconds.",
      cta: "Verify Product",
      link: "/verify-isi",
      borderColor: "neon-border-amber",
      badgeColor: "text-amber-400 bg-amber-950/60 border-amber-800",
      numberColor: "text-amber-400",
      graphicType: "verify"
    }
  ];

  const accordionItems = [
    {
      domain: "TECHNICAL ARCHITECTURE",
      title: "Bhashini Multilingual Speech & Vector Retrieval",
      summary: "Full end-to-end voice and text pipeline supporting Hindi, Punjabi, Tamil, and 8 additional Indian languages with hybrid lexical + semantic embedding search."
    },
    {
      domain: "OPERATIONAL COMPLIANCE",
      title: "Quality Control Orders & DPIIT Gazette Registry",
      summary: "Statutory order tracking covering electricals, steel, chemicals, toys, and cookware, flagging mandatory enforcement dates and legal consequences."
    },
    {
      domain: "CONFORMITY ASSESSMENT",
      title: "Scheme-I, Scheme-II, and Compulsory Registration (CRS)",
      summary: "Covers standard mark issuance, factory testing protocols, surveillance audits, and laboratory test sample validation."
    }
  ];

  const faqs = [
    {
      q: "What is BISmart AI?",
      a: "BISmart AI is an intelligent platform developed for SIH26107 to help Indian manufacturers, businesses, and consumers effortlessly navigate Indian Standards (IS), mandatory certification schemes, and product authenticity verification."
    },
    {
      q: "How does the anti-hallucination engine protect against incorrect regulatory claims?",
      a: "Our RAG architecture retrieves only verified BIS standards and gazette notifications. If an answer cannot be grounded in official clauses, the AI explicitly reports that sufficient reliable information was not found."
    },
    {
      q: "Can I use voice interaction in Indian languages like Hindi?",
      a: "Yes! Powered by a Bhashini-compatible speech architecture, users can speak queries in Hindi or other regional languages and receive bilingual or native responses with audio synthesis."
    },
    {
      q: "What is an ISI Mark CM/L number?",
      a: "A Certification Marks Licence (CM/L) is a unique 7-digit number issued by BIS to certified manufacturers. It must appear below the ISI mark on genuine consumer products."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* ========================================================
          SECTION 1: DARK CYBERNETIC HERO (CODEZEN AESTHETIC)
          ======================================================== */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative min-h-[92vh] flex items-center justify-center cz-grid-dark px-4 sm:px-6 lg:px-8 py-16 overflow-hidden border-b border-zinc-900"
      >
        {/* Ambient Cursor Aura */}
        <div 
          className="pointer-events-none absolute w-[450px] h-[450px] rounded-full blur-[100px] opacity-25 transition-all duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.8), rgba(139,92,246,0.5), transparent)',
            left: `${mousePos.x - 225}px`,
            top: `${mousePos.y - 225}px`
          }}
        />

        {/* Right Vertical Floating Links Rail */}
        <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center space-y-6 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          <span className="[writing-mode:vertical-rl] hover:text-emerald-400 transition-colors cursor-pointer">
            <Link to="/assistant">ASSISTANT</Link>
          </span>
          <span className="w-px h-6 bg-zinc-800" />
          <span className="[writing-mode:vertical-rl] hover:text-emerald-400 transition-colors cursor-pointer">
            <Link to="/matcher">MATCHER</Link>
          </span>
          <span className="w-px h-6 bg-zinc-800" />
          <span className="[writing-mode:vertical-rl] hover:text-emerald-400 transition-colors cursor-pointer">
            <Link to="/certification">CERTIFY</Link>
          </span>
          <span className="w-px h-6 bg-zinc-800" />
          <span className="[writing-mode:vertical-rl] hover:text-emerald-400 transition-colors cursor-pointer">
            <Link to="/verify-isi">VERIFY</Link>
          </span>
        </div>

        <div className="max-w-6xl w-full mx-auto relative z-10">
          {/* Top Emerald Badge */}
          <div className="flex justify-center sm:justify-start mb-6">
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SIH26107 • STANDARDS INTELLIGENCE</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300 font-bold flex items-center hover:text-white cursor-pointer">
                <Link to="/assistant" className="flex items-center space-x-1">
                  <span>DISCOVER</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Headline Area */}
            <div className="lg:col-span-7 text-center sm:text-left space-y-5">
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
                BUREAU OF INDIAN STANDARDS • AI ASSISTANT
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.92]">
                STANDARDS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  INTELLIGENCE.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed">
                National regulatory platform for Indian Standards (IS), mandatory Quality Control Orders (QCOs), 10-step ISI licensing, and product authenticity verification.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
                <Link
                  to="/assistant"
                  className="px-6 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask BIS Assistant</span>
                </Link>

                <Link
                  to="/matcher"
                  className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2"
                >
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>Find My Standard</span>
                </Link>
              </div>
            </div>

            {/* Right Centerpiece: Glowing 4-Ring HUD & Radar Enter */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-6">
              {/* Drone / Radar Centerpiece Box */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Outer Dashed Rotating Ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/30 animate-spin-slow" />
                <div className="absolute inset-4 rounded-full border border-zinc-800 animate-spin-reverse" />
                <div className="absolute inset-16 rounded-full border border-emerald-500/20 animate-pulse-glow" />

                {/* 4 Thruster Rings at 4 Corners */}
                <div className="absolute -top-3 -left-3 thruster-ring">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">IS</span>
                </div>
                <div className="absolute -top-3 -right-3 thruster-ring">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">QCO</span>
                </div>
                <div className="absolute -bottom-3 -left-3 thruster-ring">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">ISI</span>
                </div>
                <div className="absolute -bottom-3 -right-3 thruster-ring">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">HUID</span>
                </div>

                {/* Radar Enter Button Centerpiece */}
                <Link to="/assistant" className="radar-enter-btn bg-black/80 border border-emerald-500/50">
                  <div className="radar-ring" />
                  <div className="radar-ring-inner" />
                  <Sparkles className="w-5 h-5 text-emerald-400 mb-1" />
                  <span className="font-mono text-xs font-black text-white tracking-widest">ENTER</span>
                  <span className="text-[8px] font-mono text-emerald-400 tracking-wider">AI SYSTEM</span>
                </Link>
              </div>

              <div className="text-[11px] font-mono text-zinc-500 mt-4 tracking-widest text-center uppercase">
                4 PILLARS OF COMPLIANCE • REAL-TIME
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: HIGH-CONTRAST EDITORIAL SPLIT (CRISP WHITE)
          ======================================================== */}
      <section className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: 01 What We Are */}
          <div className="lg:col-span-6 space-y-6 lg:border-r lg:border-zinc-200 lg:pr-12">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-500 block">
              01 — WHAT WE ARE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black leading-[0.95]">
              INTELLIGENT <br />
              COMPLIANCE FOR <br />
              INDIAN STANDARDS.
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              BISmart AI is an authoritative regulatory assistant engineered for Smart India Hackathon (SIH26107). It bridges technical standards, mandatory DPIIT Quality Control Orders, and citizen safety verification using exact clause-grounded retrieval.
            </p>
            <div className="pt-2 text-xs font-mono text-zinc-400 tracking-wider uppercase">
              GROUNDED • VERIFIABLE • STATUTORY
            </div>
          </div>

          {/* Right Column: 02 By The Numbers Grid */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-500 block">
              02 — BY THE NUMBERS
            </span>
            <div className="grid grid-cols-2 gap-8 pt-2">
              <div className="border-b border-zinc-200 pb-6">
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-black">20,000+</div>
                <div className="text-xs font-mono text-zinc-500 tracking-wider uppercase mt-1">Standards Indexed</div>
              </div>
              <div className="border-b border-zinc-200 pb-6">
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-black">150+</div>
                <div className="text-xs font-mono text-zinc-500 tracking-wider uppercase mt-1">Mandatory QCOs</div>
              </div>
              <div className="border-b border-zinc-200 pb-6">
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-black">100%</div>
                <div className="text-xs font-mono text-zinc-500 tracking-wider uppercase mt-1">Clause Accuracy</div>
              </div>
              <div className="border-b border-zinc-200 pb-6">
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-black">11</div>
                <div className="text-xs font-mono text-zinc-500 tracking-wider uppercase mt-1">Bhashini Languages</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: INFINITE RUNNING OUTLINE TYPOGRAPHY MARQUEE
          ======================================================== */}
      <section className="bg-black py-8 border-b border-zinc-900 overflow-hidden" aria-hidden="true">
        <div className="marquee-container">
          <div className="marquee-content text-4xl sm:text-7xl">
            <span className="marquee-text-outline mx-6">BISMART MILESTONES</span>
            <span className="text-emerald-400 font-black mx-4">•</span>
            <span className="marquee-text-outline mx-6">STANDARDS INTELLIGENCE</span>
            <span className="text-emerald-400 font-black mx-4">•</span>
            <span className="marquee-text-outline mx-6">QUALITY CONTROL ORDERS</span>
            <span className="text-emerald-400 font-black mx-4">•</span>
            <span className="marquee-text-outline mx-6">CONFORMITY ASSESSMENT</span>
            <span className="text-emerald-400 font-black mx-4">•</span>
          </div>
          <div className="marquee-content text-4xl sm:text-7xl">
            <span className="marquee-text-outline mx-6">BISMART MILESTONES</span>
            <span className="text-emerald-400 font-black mx-4">•</span>
            <span className="marquee-text-outline mx-6">STANDARDS INTELLIGENCE</span>
            <span className="text-emerald-400 font-black mx-4">•</span>
            <span className="marquee-text-outline mx-6">QUALITY CONTROL ORDERS</span>
            <span className="text-emerald-400 font-black mx-4">•</span>
            <span className="marquee-text-outline mx-6">CONFORMITY ASSESSMENT</span>
            <span className="text-emerald-400 font-black mx-4">•</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: STICKY STACKING 3D CARDS (001 TO 004)
          ======================================================== */}
      <section className="bg-black py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto mb-16 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-2">
            REGULATORY CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            CORE PLATFORM MODULES
          </h2>
          <p className="text-xs font-mono text-zinc-500 mt-2 uppercase tracking-wider">
            Scroll to reveal stacked milestone cards
          </p>
        </div>

        {/* The 4 Stack Cards */}
        <div className="space-y-12">
          {stackCards.map((card, idx) => (
            <div key={card.id} className="stack-card-wrapper" style={{ zIndex: 10 + idx }}>
              <div className={`stack-card-inner ${card.borderColor}`}>
                {/* Card Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                  <div className="flex items-center space-x-6">
                    <span className={`huge-number ${card.numberColor}`}>{card.id}</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase">
                        {card.title}
                      </h3>
                      <span className={`inline-block mt-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}>
                        {card.tag}
                      </span>
                    </div>
                  </div>

                  <Link to={card.link} className="cz-pill-btn self-start sm:self-auto">
                    <span>{card.cta}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Card Body Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 items-center">
                  {/* Left Column Graphic Preview */}
                  <div className="md:col-span-5 bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 min-h-[190px] flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                      <span>MODULE PREVIEW</span>
                      <span className="text-emerald-400">ACTIVE</span>
                    </div>

                    {card.graphicType === 'rag' && (
                      <div className="space-y-2 font-mono text-xs">
                        <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-cyan-300">
                          [1] IS 2347:2017 — Clause 5.1
                        </div>
                        <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px]">
                          "Safety relief device must operate between 1.5x and 3.0x nominal pressure."
                        </div>
                      </div>
                    )}

                    {card.graphicType === 'matcher' && (
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between p-2 rounded bg-zinc-900 text-purple-300">
                          <span>Product: Pressure Cooker</span>
                          <span>→ IS 2347</span>
                        </div>
                        <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400">
                          QCO Status: MANDATORY (DPIIT 2020 Order)
                        </div>
                      </div>
                    )}

                    {card.graphicType === 'wizard' && (
                      <div className="space-y-1.5 font-mono text-[11px]">
                        <div className="flex items-center space-x-2 text-emerald-400">
                          <Check className="w-3.5 h-3.5" />
                          <span>Step 01: Application Form-V</span>
                        </div>
                        <div className="flex items-center space-x-2 text-emerald-400">
                          <Check className="w-3.5 h-3.5" />
                          <span>Step 02: In-House Testing Lab</span>
                        </div>
                        <div className="flex items-center space-x-2 text-zinc-500">
                          <span className="w-3.5 h-3.5 flex items-center justify-center">○</span>
                          <span>Step 03: Factory Audit Assessment</span>
                        </div>
                      </div>
                    )}

                    {card.graphicType === 'verify' && (
                      <div className="space-y-2 font-mono text-xs">
                        <div className="p-2 rounded bg-zinc-900 text-amber-300 flex justify-between">
                          <span>CM/L-8400123</span>
                          <span className="text-emerald-400 font-bold">VERIFIED</span>
                        </div>
                        <div className="p-2 rounded bg-zinc-900 text-[10px] text-zinc-400">
                          Mfr: Hawkins Cookers Ltd • Operative
                        </div>
                      </div>
                    )}

                    <div className="text-[10px] font-mono text-zinc-600">
                      OFFICIAL BIS CONNECT MIRROR
                    </div>
                  </div>

                  {/* Right Column Description */}
                  <div className="md:col-span-7 space-y-4">
                    <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                      {card.desc}
                    </p>
                    <div className="flex items-center space-x-3 pt-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-mono text-zinc-400">Instant Execution • Zero Manual Work</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 5: BRUTALIST DOMAIN ACCORDION & SECONDARY MARQUEE
          ======================================================== */}
      <section className="bg-white text-black py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center sm:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 block">
              SYSTEM CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black mt-1">
              BUILD. DEVELOP. GROW.
            </h2>
          </div>

          <div className="divide-y divide-zinc-200">
            {accordionItems.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveAccordion(activeAccordion === idx ? -1 : idx)}
                className="py-5 cursor-pointer group transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                      {item.domain}
                    </span>
                    <h3 className="text-base sm:text-xl font-extrabold text-black group-hover:text-emerald-600 transition-colors flex items-center space-x-2">
                      <span>{item.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${activeAccordion === idx ? 'rotate-180 text-black' : ''}`} />
                </div>

                {activeAccordion === idx && (
                  <div className="pt-3 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal animate-in fade-in duration-200">
                    {item.summary}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: FAQ SECTION
          ======================================================== */}
      <section className="bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <HelpCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-wider">
              Authoritative Guidance & SIH26107 Compliance
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                <h4 className="text-sm font-bold text-white">{f.q}</h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-normal">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: GIANT KINETIC FOOTER (CODEZEN FOOTER STYLE)
          ======================================================== */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="font-black text-lg text-white uppercase tracking-tight">BISmart AI</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                AI Regulatory Assistant developed for SIH26107. Standardizing national compliance across Indian manufacturing and citizen consumer protection.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                NAVIGATE
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li><Link to="/assistant" className="hover:text-emerald-400 transition-colors">AI Assistant</Link></li>
                <li><Link to="/matcher" className="hover:text-emerald-400 transition-colors">Find Standard</Link></li>
                <li><Link to="/certification" className="hover:text-emerald-400 transition-colors">10-Step Wizard</Link></li>
                <li><Link to="/verify-isi" className="hover:text-emerald-400 transition-colors">Verify ISI Mark</Link></li>
                <li><Link to="/verify-huid" className="hover:text-emerald-400 transition-colors">Verify Gold HUID</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                CHANNELS
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li><a href="https://www.bis.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400">BIS Official Portal ↗</a></li>
                <li><a href="https://www.manakonline.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400">Manakonline e-Services ↗</a></li>
                <li><a href="https://dpiit.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400">DPIIT Quality Orders ↗</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                COLOPHON
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                Smart India Hackathon 2026. Problem Statement SIH26107. Clause Grounding & RAG Architecture.
              </p>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE • DEMO MODE</span>
              </div>
            </div>
          </div>

          {/* Huge Outline Brand Typography */}
          <div className="pt-8 border-t border-zinc-900/60">
            <div className="footer-giant-text">
              BISMART
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-zinc-600 pt-4">
              <span>© 2026 BISMART AI. ALL RIGHTS RESERVED.</span>
              <span className="mt-2 sm:mt-0">DEVELOPED FOR BUREAU OF INDIAN STANDARDS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
