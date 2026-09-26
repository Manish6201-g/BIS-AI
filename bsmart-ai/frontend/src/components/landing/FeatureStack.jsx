import React, { useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Shield, Cpu, Compass, FileCheck } from 'lucide-react';

// Exact CodeZen Physics Constants
const ca = {
  itemDistance: 100,
  itemScale: 0.015,
  itemStackDistance: 18,
  stackPosition: 0.08,
  scaleEndPosition: 0.05,
  baseScale: 0.92,
};

// Exact CodeZen StarBorder container (lT component)
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

export const FeatureStack = () => {
  const cardsRef = useRef([]);
  const cardTops = useRef([]);
  const innerTop = useRef(0);
  const endTop = useRef(0);
  const innerRef = useRef(null);
  const voidRef = useRef(null);
  const wheelRef = useRef(null);
  const endRef = useRef(null);

  const cards = [
    {
      id: "001",
      title: "AI REGULATORY ASSISTANT",
      stack: "GROUNDED RAG • 12+ INDIC LANGUAGES • ZERO HALLUCINATION",
      description: "Instant statutory guidance on mandatory Indian Standards, Quality Control Orders, and Scheme-I licensing. Every citation is legally verified against official BIS gazette gazettes.",
      link: "/assistant",
      color: "#00f2fe, #4facfe, #7000ff",
      ctaColor: "#f6d365, #fda085",
      cta: "Launch Assistant",
      icon: Cpu,
      previewType: "rag",
      chips: ["RAG PIPELINE", "BHASHINI SPEECH", "CLAUSE 5.1 VERIFIED", "< 450MS LATENCY"]
    },
    {
      id: "002",
      title: "STANDARDS MATCHER",
      stack: "SEMANTIC SEARCH • HARMONIZED CLASSIFICATION • DPIIT QCOs",
      description: "Transform commercial product names, raw materials, and capacities into mandatory IS Codes with live enforcement deadlines, testing procedures, and exemption thresholds.",
      link: "/matcher",
      color: "#a855f7, #6366f1, #3b82f6",
      ctaColor: "#f6d365, #fda085",
      cta: "Find My Standard",
      icon: Compass,
      previewType: "matcher",
      chips: ["20,000+ STANDARDS", "QCO RESOLUTION", "HSN CODE MAPPING", "ZERO AMBIGUITY"]
    },
    {
      id: "003",
      title: "PRODUCT VERIFICATION",
      stack: "7-DIGIT ISI CM/L • 6-CHAR GOLD HUID • RECALL ALERTS",
      description: "Protect Indian households from substandard and counterfeit products. Verify genuine manufacturer CM/L numbers and decode 6-character laser-engraved gold hallmarking codes.",
      link: "/verify-isi",
      color: "#fbbf24, #f59e0b, #d97706",
      ctaColor: "#f6d365, #fda085",
      cta: "Verify Authenticity",
      icon: Shield,
      previewType: "verify",
      chips: ["SCHEME-I AUTHENTICITY", "22K/18K/14K HALLMARK", "AHC RECOGNITION", "CITIZEN SAFETY"]
    },
    {
      id: "004",
      title: "10-STEP CERTIFICATION",
      stack: "APPLICATION FORM-V • LAB TESTING STI • FACTORY AUDIT",
      description: "Step-by-step statutory certification roadmap for MSMEs and domestic manufacturers. Tracks testing checklists, STI requirements, and factory audit readiness.",
      link: "/certification",
      color: "#10b981, #14b8a6, #06b6d4",
      ctaColor: "#f6d365, #fda085",
      cta: "Start 10-Step Wizard",
      icon: FileCheck,
      previewType: "wizard",
      chips: ["FORM-V FILING", "STI COMPLIANCE", "IN-HOUSE LAB SETUP", "AUDIT READINESS"]
    }
  ];

  const words = [
    { text: "STANDARDS", offset: "14%" },
    { text: "•", offset: "26%" },
    { text: "COMPLIANCE", offset: "38%" },
    { text: "•", offset: "50%" },
    { text: "CERTIFY", offset: "62%" },
    { text: "•", offset: "73%" },
    { text: "VERIFY", offset: "85%" }
  ];

  // Exact CodeZen Recalculation logic
  const recalc = useCallback(() => {
    const cardsElements = Array.from(document.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cardsElements;
    cardsElements.forEach(c => {
      c.style.transform = '';
    });
    if (voidRef.current) {
      voidRef.current.style.transform = '';
      voidRef.current.style.transformOrigin = '';
      voidRef.current.style.opacity = '1';
      voidRef.current.style.visibility = 'visible';
    }
    if (wheelRef.current) {
      wheelRef.current.style.transform = 'rotate(180deg)';
      wheelRef.current.style.opacity = '0';
      wheelRef.current.style.visibility = 'hidden';
    }

    const scrollY = window.scrollY;
    cardTops.current = cardsElements.map(c => c.getBoundingClientRect().top + scrollY);
    if (endRef.current) endTop.current = endRef.current.getBoundingClientRect().top + scrollY;
    if (innerRef.current) innerTop.current = innerRef.current.getBoundingClientRect().top + scrollY;
  }, []);

  // Exact CodeZen Scroll physics loop
  const update = useCallback(() => {
    const N = window.scrollY;
    const z = cardsRef.current;
    const P = cardTops.current;
    const D = endTop.current;
    const H = innerTop.current;
    if (!z.length || !P.length) return;

    const X = window.innerHeight;
    const me = z[0].offsetHeight;
    const te = (X - me) / 2;
    const fe = te - (ca.stackPosition - ca.scaleEndPosition) * X;
    const V = P[z.length - 1] - fe;
    const B = X * 1.2;

    let Q = 0;
    if (N > V) {
      Q = (N - V) / B;
      Q = Math.min(Math.max(Q, 0), 1);
    }

    // 1. Exact CodeZen Card Overlapping
    for (let se = 0; se < z.length; se++) {
      const ge = z[se];
      const Te = P[se];
      const Ie = Te - te - ca.itemStackDistance * se;
      const We = Te - fe;
      const be = Ie;
      const ot = Math.max(D - X * 0.5, V + B);

      let wt = 0;
      if (N >= We) {
        wt = 1;
      } else if (N > Ie) {
        wt = (N - Ie) / (We - Ie);
      }
      wt = Math.min(Math.max(wt, 0), 1);

      const Ct = ca.baseScale + se * ca.itemScale;
      const Gt = Number((1 - wt * (1 - Ct)).toFixed(4));

      let xt = 0;
      if (N >= be && N <= ot) {
        xt = N - Te + te + ca.itemStackDistance * se;
      } else if (N > ot) {
        xt = ot - Te + te + ca.itemStackDistance * se;
      }

      ge.style.transform = `translate3d(0, ${Math.round(xt * 10) / 10}px, 0) scale(${Gt})`;
    }

    // 2. Exact CodeZen Void Container 3D Shrink
    const he = voidRef.current;
    const ie = innerRef.current;
    if (he && ie) {
      const se = N + X / 2 - H;
      ie.style.perspectiveOrigin = `50% ${se}px`;
      ie.style.perspective = "1500px";

      if (Q > 0) {
        const ge = Math.pow(Q, 1.5);
        const Te = -ge * 3000;
        const Ie = 1 - ge;
        const We = 1 - Math.pow(Q, 2.5);
        he.style.transformOrigin = `50% ${se}px`;
        he.style.transform = `translate3d(0, 0, ${Te}px) scale(${Math.max(0, Ie).toFixed(4)})`;
        he.style.opacity = Math.max(0, We).toFixed(3);
        if (Q >= 1) he.style.visibility = "hidden";
        else he.style.visibility = "visible";
      } else {
        he.style.transformOrigin = "";
        he.style.transform = "";
        he.style.opacity = "1";
        he.style.visibility = "visible";
      }
    }

    // 3. Exact CodeZen Kinetic Arc Wheel (Revealing from bottom right to left)
    const ce = wheelRef.current;
    if (ce) {
      if (N > D + X * 1.2 + X * 0.2) {
        ce.style.display = "none";
        ce.style.visibility = "hidden";
      } else if (Q > 0) {
        ce.style.display = "block";
        ce.style.visibility = "visible";
        ce.style.opacity = Math.min(Q * 4, 1).toFixed(3);
        const se = 180 * (1 - Q);
        ce.style.transformOrigin = "50% 100%";
        ce.style.transform = `rotate(${se}deg)`;
      } else {
        ce.style.display = "block";
        ce.style.opacity = "0";
        ce.style.visibility = "hidden";
        ce.style.transform = "rotate(180deg)";
      }
    }
  }, []);

  useEffect(() => {
    const cardsElements = Array.from(document.querySelectorAll('.scroll-stack-card'));
    cardsElements.forEach((card, idx) => {
      if (idx < cardsElements.length - 1) {
        card.style.marginBottom = `${ca.itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
    });

    const ro = new ResizeObserver(() => recalc());
    cardsElements.forEach(c => ro.observe(c));
    recalc();

    const onScroll = () => {
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recalc, { passive: true });
    const timer = setTimeout(() => {
      recalc();
      update();
    }, 120);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recalc);
    };
  }, [recalc, update]);

  return (
    <section className="min-h-screen bg-black text-white font-sans relative select-none">
      {/* Top Section Intro */}
      <div className="pt-24 pb-12 px-6 sm:px-12 max-w-7xl mx-auto w-full text-center sm:text-left relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950 font-mono text-[11px] tracking-widest text-zinc-400 uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>02 — CODEZEN KINETIC CARDS • CORE CAPABILITIES</span>
        </div>
        <h2 className="editorial-headline text-3xl sm:text-5xl md:text-6xl text-white">
          PINNED <span className="text-zinc-500">FEATURE STACK.</span>
        </h2>
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-2">
          Scroll to experience CodeZen 3D Void shrink & kinetic wheel rotation
        </p>
      </div>

      {/* CodeZen Exact Scroll Stack Inner with 3D perspective */}
      <div
        ref={innerRef}
        className="scroll-stack-inner px-6 md:px-12 lg:px-16"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Void Container: Shrinks into 3D space when Q > 0 */}
        <div
          ref={voidRef}
          className="void-container relative w-full flex flex-col items-center justify-center"
          style={{ willChange: 'transform, opacity', transformStyle: 'preserve-3d' }}
        >
          {cards.map((c) => (
            <div
              key={c.id}
              className="scroll-stack-card"
            >
              <StarBorder
                color={c.color}
                speed="8s"
              >
                {/* Top Row: Brand Group & Number */}
                <div className="card-top-row flex items-center justify-between pb-4 border-b border-zinc-800/80 gap-4">
                  <div className="id-brand-group flex items-baseline gap-4 sm:gap-5 min-w-0 flex-1">
                    <span className="huge-number font-mono text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none flex-shrink-0 select-none">
                      {c.id}
                    </span>
                    <div className="client-info min-w-0 flex-1 flex flex-col justify-center gap-0.5">
                      <span className="label font-bold text-base sm:text-xl lg:text-2xl text-white uppercase tracking-tight truncate">
                        {c.title}
                      </span>
                      <span className="client-name font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider truncate">
                        {c.stack}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={c.link}
                    className="live-btn-star cursor-pointer flex-shrink-0"
                  >
                    <StarBorder color={c.ctaColor} speed="3s">
                      <span className="flex items-center space-x-1.5 px-1">
                        <span>{c.cta}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </StarBorder>
                  </Link>
                </div>

                {/* Content Grid: Visual Showcase & Description */}
                <div className="content-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch pt-4 flex-1">
                  {/* Left Column: UI Engine Preview */}
                  <div className="lg:col-span-6 bg-zinc-950/95 border border-zinc-900 rounded-2xl p-4 sm:p-5 flex flex-col justify-between font-mono text-xs overflow-hidden shadow-inner">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-3 border-b border-zinc-900">
                      <div className="flex items-center space-x-2">
                        <c.icon className="w-4 h-4 text-white" />
                        <span className="font-bold text-white tracking-wider">LIVE MODULE ENGINE</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        ONLINE
                      </span>
                    </div>

                    {c.previewType === 'rag' && (
                      <div className="space-y-2.5 py-3">
                        <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs">
                          <span className="text-zinc-500 block text-[10px] uppercase font-semibold">User Query</span>
                          <span className="text-white font-medium">"What is the safety pressure relief limit for domestic pressure cookers?"</span>
                        </div>
                        <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs space-y-1">
                          <div className="flex items-center justify-between text-cyan-400 text-[10px] font-bold">
                            <span>GROUNDED CITATION: IS 2347:2017 [CLAUSE 5.1]</span>
                            <span className="text-emerald-400">99.8% CONFIDENCE</span>
                          </div>
                          <p className="text-zinc-300 text-[11px] leading-relaxed">
                            "Operating pressure must release at 1.0 kgf/cm² with a secondary safety fuse plug complying with Schedule IV."
                          </p>
                        </div>
                      </div>
                    )}

                    {c.previewType === 'matcher' && (
                      <div className="space-y-2.5 py-3">
                        <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs">
                          <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Input Product</span>
                          <span className="text-white font-medium">"Packaged Drinking Water (Other than Natural Mineral Water)"</span>
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

                    {c.previewType === 'verify' && (
                      <div className="space-y-2.5 py-3">
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
                        <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-[11px] text-zinc-300 truncate">
                          Manufacturer: Hawkins Cookers Limited • Factory: Thane West
                        </div>
                      </div>
                    )}

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
                  <div className="lg:col-span-6 flex flex-col justify-between py-1 space-y-4">
                    <div>
                      <p className="text-sm sm:text-base lg:text-lg text-zinc-200 leading-relaxed font-normal">
                        {c.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 w-full">
                      <div className="flex flex-wrap gap-2">
                        {c.chips.map((chip, i) => (
                          <span
                            key={i}
                            className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-400 uppercase tracking-wider shadow-2xs"
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
              </StarBorder>
            </div>
          ))}
        </div>

        {/* CodeZen Exact Scroll Stack End: 120vh spacer */}
        <div ref={endRef} className="scroll-stack-end pointer-events-none h-[120vh]" />
      </div>

      {/* CodeZen Exact Fixed Kinetic Arc Wheel */}
      <div
        ref={wheelRef}
        className="kinetic-wheel pointer-events-none"
        style={{
          position: 'fixed',
          bottom: '-18vh',
          left: '0',
          width: '100vw',
          height: 'auto',
          zIndex: 0,
          visibility: 'hidden',
          opacity: 0,
          willChange: 'transform, opacity',
          transformOrigin: '50% 100%',
        }}
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
          <path
            d="M 400,1500 A 1100,1100 0 0,1 2600,1500"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="3"
            strokeDasharray="6 16"
          />
          {words.map((item, idx) => (
            <text
              key={idx}
              fill="#ffffff"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: item.text === '•' ? '50px' : '100px',
                textTransform: 'uppercase',
                letterSpacing: '4px',
              }}
              dy={item.text === '•' ? '-18' : '0'}
            >
              <textPath href="#arc-path" startOffset={item.offset} textAnchor="middle">
                {item.text}
              </textPath>
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
};

