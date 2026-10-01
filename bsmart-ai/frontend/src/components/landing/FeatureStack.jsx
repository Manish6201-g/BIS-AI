import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Shield, Cpu, Compass, FileCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// StarBorder container with kinetic conic gradient
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
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const activePathRef = useRef(null);
  const totalLenRef = useRef(0);
  const nodeRefs = useRef([]);
  const animFrameRef = useRef(null);

  const [pathD, setPathD] = useState('');
  const [cometPos, setCometPos] = useState(null);
  const [revealedStages, setRevealedStages] = useState([false, false, false, false]);

  const cards = [
    {
      id: "001",
      milestone: "VERIFY",
      stageLabel: "STAGE 01",
      title: t('fs_card1_title'),
      stack: "GROUNDED RAG • 12+ INDIC LANGUAGES • ZERO HALLUCINATION",
      description: t('fs_card1_desc'),
      link: "/assistant",
      color: "#00f2fe, #4facfe, #7000ff",
      ctaColor: "#f6d365, #fda085",
      cta: t('fs_card1_cta'),
      icon: Cpu,
      previewType: "rag",
      chips: ["RAG PIPELINE", "BHASHINI SPEECH", "CLAUSE 5.1 VERIFIED", "< 450MS LATENCY"]
    },
    {
      id: "002",
      milestone: "COMPLY",
      stageLabel: "STAGE 02",
      title: t('fs_card2_title'),
      stack: "SEMANTIC SEARCH • HARMONIZED CLASSIFICATION • DPIIT QCOs",
      description: t('fs_card2_desc'),
      link: "/matcher",
      color: "#a855f7, #6366f1, #3b82f6",
      ctaColor: "#f6d365, #fda085",
      cta: t('fs_card2_cta'),
      icon: Compass,
      previewType: "matcher",
      chips: ["20,000+ STANDARDS", "QCO RESOLUTION", "HSN CODE MAPPING", "ZERO AMBIGUITY"]
    },
    {
      id: "003",
      milestone: "STANDARDS",
      stageLabel: "STAGE 03",
      title: t('fs_card3_title'),
      stack: "7-DIGIT ISI CM/L • 6-CHAR GOLD HUID • RECALL ALERTS",
      description: t('fs_card3_desc'),
      link: "/verify-isi",
      color: "#fbbf24, #f59e0b, #d97706",
      ctaColor: "#f6d365, #fda085",
      cta: t('fs_card3_cta'),
      icon: Shield,
      previewType: "verify",
      chips: ["SCHEME-I AUTHENTICITY", "22K/18K/14K HALLMARK", "AHC RECOGNITION", "CITIZEN SAFETY"]
    },
    {
      id: "004",
      milestone: "CERTIFY",
      stageLabel: "STAGE 04",
      title: t('fs_card4_title'),
      stack: "APPLICATION FORM-V • LAB TESTING STI • FACTORY AUDIT",
      description: t('fs_card4_desc'),
      link: "/certification",
      color: "#10b981, #14b8a6, #06b6d4",
      ctaColor: "#f6d365, #fda085",
      cta: t('fs_card4_cta'),
      icon: FileCheck,
      previewType: "wizard",
      chips: ["FORM-V FILING", "STI COMPLIANCE", "IN-HOUSE LAB SETUP", "AUDIT READINESS"]
    }
  ];

  // Recalculate smooth serpentine cubic Bézier curve through all milestone nodes
  const calculateGeometry = useCallback(() => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const W = cRect.width;
    const H = cRect.height;
    if (W <= 0 || H <= 0) return;

    // Start at top center of Section 03
    const pts = [{ x: W / 2, y: 0 }];

    for (let i = 0; i < 4; i++) {
      const el = nodeRefs.current[i];
      if (el) {
        const nRect = el.getBoundingClientRect();
        const x = nRect.left - cRect.left + nRect.width / 2;
        const y = nRect.top - cRect.top + nRect.height / 2;
        pts.push({ x, y });
      }
    }

    // End at bottom center of Section 03 (aligns with PhilosophyPortal entrance)
    pts.push({ x: W / 2, y: H });

    if (pts.length >= 3) {
      let dStr = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const midY = (p0.y + p1.y) / 2;
        dStr += ` C ${p0.x.toFixed(1)},${midY.toFixed(1)} ${p1.x.toFixed(1)},${midY.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
      }
      setPathD(dStr);
    }
  }, []);

  // Update strokeDashoffset & reveal states smoothly with zero lag
  const updateScroll = useCallback(() => {
    if (!containerRef.current || !activePathRef.current) return;
    const totalLen = totalLenRef.current;
    if (totalLen <= 0) return;

    const cRect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;

    // Draw snake line as the user scrolls through Section 03
    const startY = vh * 0.8;
    const endY = vh * 0.3;
    const scrollRange = cRect.height + startY - endY;
    const scrolled = startY - cRect.top;

    let progress = scrollRange > 0 ? scrolled / scrollRange : 0;
    progress = Math.min(Math.max(progress, 0), 1);

    const drawnLen = totalLen * progress;
    activePathRef.current.style.strokeDashoffset = `${(totalLen - drawnLen).toFixed(1)}`;

    // Position glowing comet head at the leading tip of the active stroke
    if (drawnLen > 0) {
      try {
        const pt = activePathRef.current.getPointAtLength(drawnLen);
        setCometPos({ x: pt.x, y: pt.y });
      } catch (e) {}
    } else {
      setCometPos(null);
    }

    // Progressively reveal milestone cards as the laser snake reaches them
    setRevealedStages(prev => {
      let changed = false;
      const next = [...prev];
      for (let i = 0; i < 4; i++) {
        const el = nodeRefs.current[i];
        if (el) {
          const nRect = el.getBoundingClientRect();
          const nodeProgress = (nRect.top - cRect.top) / cRect.height;
          const isReached = progress >= Math.max(0.04, nodeProgress - 0.05) || nRect.top <= vh * 0.78;
          if (next[i] !== isReached) {
            next[i] = isReached;
            changed = true;
          }
        }
      }
      return changed ? next : prev;
    });
  }, []);

  // Set up length on pathD change
  useEffect(() => {
    if (!activePathRef.current || !pathD) return;
    try {
      const len = activePathRef.current.getTotalLength();
      if (len > 0) {
        totalLenRef.current = len;
        activePathRef.current.style.strokeDasharray = `${len}`;
        updateScroll();
      }
    } catch (e) {}
  }, [pathD, updateScroll]);

  // Handle Resize and Scroll events
  useEffect(() => {
    calculateGeometry();

    const ro = new ResizeObserver(() => {
      calculateGeometry();
    });
    if (containerRef.current) ro.observe(containerRef.current);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        animFrameRef.current = requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', calculateGeometry, { passive: true });

    const timer = setTimeout(() => {
      calculateGeometry();
      updateScroll();
    }, 150);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', calculateGeometry);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [calculateGeometry, updateScroll]);

  return (
    <section className="min-h-screen bg-black text-white font-sans relative select-none overflow-hidden">
      {/* 01. Milestones Header Marquee */}
      <div className="w-full h-[18vh] md:h-[22vh] lg:h-[26vh] border-b border-white/20 overflow-hidden flex items-center relative z-10 bg-black select-none">
        <div className="marquee-selected-works">
          <div className="marquee-selected-works__track">
            {[0, 1, 2, 3].map(N => (
              <div key={N} className="marquee-selected-works__segment" aria-hidden={N > 0 ? "true" : undefined}>
                <span className="marquee-selected-works__text">{t('fs_marquee')}</span>
                <span className="marquee-selected-works__dash">-</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 02. Snake Path Winding Canvas & Responsive Milestone Journey */}
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        {/* Serpentine SVG Layer (Draws the snake line & comet head across all devices) */}
        {pathD && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="snake-laser-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="70%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
              </linearGradient>

              <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <radialGradient id="comet-head-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.9" />
                <stop offset="75%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Faint Guide Track */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="4"
              strokeDasharray="8 10"
            />

            {/* Active Neon Laser Snake Line */}
            <path
              ref={activePathRef}
              d={pathD}
              fill="none"
              stroke="url(#snake-laser-gradient)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neon-glow)"
              style={{ willChange: 'stroke-dashoffset' }}
            />

            {/* Glowing Comet Head at Leading Edge */}
            {cometPos && (
              <g transform={`translate(${cometPos.x}, ${cometPos.y})`}>
                <circle r="24" fill="url(#comet-head-glow)" className="animate-pulse" />
                <circle r="7" fill="#ffffff" />
                <circle r="3.5" fill="#10b981" />
              </g>
            )}
          </svg>
        )}

        {/* 03. Milestone Nodes & Feature Cards Flow */}
        <div className="relative z-20 flex flex-col space-y-24 sm:space-y-32 lg:space-y-40">
          {cards.map((c, idx) => {
            const isRevealed = revealedStages[idx];
            // Alternating alignment on large screens creates a natural serpentine journey
            const isEven = idx % 2 === 0;

            return (
              <div
                key={c.id}
                className={`relative flex flex-col ${
                  isEven ? 'lg:items-end' : 'lg:items-start'
                } w-full transition-all duration-700`}
              >
                {/* Milestone Node Beacon Anchor */}
                <div
                  className={`w-full flex ${
                    isEven ? 'lg:justify-end' : 'lg:justify-start'
                  } justify-start mb-6 px-2`}
                >
                  <div
                    ref={el => (nodeRefs.current[idx] = el)}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-500 shadow-lg"
                    style={{
                      borderColor: isRevealed ? '#10b981' : 'rgba(255, 255, 255, 0.12)',
                      backgroundColor: isRevealed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(15, 15, 18, 0.85)',
                      boxShadow: isRevealed ? '0 0 28px rgba(16, 185, 129, 0.45)' : 'none',
                    }}
                  >
                    <span className="relative flex h-3.5 w-3.5">
                      {isRevealed && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      )}
                      <span
                        className="relative inline-flex rounded-full h-3.5 w-3.5 transition-colors duration-500"
                        style={{ backgroundColor: isRevealed ? '#10b981' : '#52525b' }}
                      />
                    </span>
                    <span
                      className="font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-500"
                      style={{ color: isRevealed ? '#ffffff' : '#71717a' }}
                    >
                      {c.stageLabel} • {c.milestone}
                    </span>
                  </div>
                </div>

                {/* Feature Card Component with StarBorder & Revealing Transform */}
                <div
                  className="w-full lg:w-[88%] xl:w-[84%] transition-all duration-700 ease-out"
                  style={{
                    opacity: isRevealed ? 1 : 0.35,
                    transform: isRevealed ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 28px, 0) scale(0.97)',
                    filter: isRevealed ? 'none' : 'grayscale(40%)',
                    willChange: 'transform, opacity, filter',
                  }}
                >
                  <div className="scroll-stack-card !w-full !max-w-none !mb-0">
                    <StarBorder color={c.color} speed={isRevealed ? "6s" : "14s"}>
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
                      <div className="card-content-grid pt-4 flex-1">
                        {/* Left Column: UI Engine Preview */}
                        <div className="card-preview-col bg-zinc-950/95 border border-zinc-900 rounded-2xl p-4 sm:p-5 flex flex-col justify-between font-mono text-xs overflow-hidden shadow-inner min-w-0">
                          <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-3 border-b border-zinc-900 gap-2">
                            <div className="flex items-center space-x-2 min-w-0">
                              <c.icon className="w-4 h-4 text-white flex-shrink-0" />
                              <span className="font-bold text-white tracking-wider truncate">LIVE MODULE ENGINE</span>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors duration-500 flex-shrink-0 ${
                                isRevealed
                                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                  : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                              }`}
                            >
                              {isRevealed ? 'ONLINE' : 'STANDBY'}
                            </span>
                          </div>

                          {c.previewType === 'rag' && (
                            <div className="space-y-2.5 py-3">
                              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs">
                                <span className="text-zinc-500 block text-[10px] uppercase font-semibold">User Query</span>
                                <span className="text-white font-medium break-words">"What is the safety pressure relief limit for domestic pressure cookers?"</span>
                              </div>
                              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs space-y-1">
                                <div className="flex flex-wrap items-center justify-between text-cyan-400 text-[10px] font-bold gap-1">
                                  <span className="truncate">GROUNDED CITATION: IS 2347:2017 [CLAUSE 5.1]</span>
                                  <span className="text-emerald-400 whitespace-nowrap">99.8% CONFIDENCE</span>
                                </div>
                                <p className="text-zinc-300 text-[11px] leading-relaxed break-words">
                                  "Operating pressure must release at 1.0 kgf/cm² with a secondary safety fuse plug complying with Schedule IV."
                                </p>
                              </div>
                            </div>
                          )}

                          {c.previewType === 'matcher' && (
                            <div className="space-y-2.5 py-3">
                              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs">
                                <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Input Product</span>
                                <span className="text-white font-medium break-words">"Packaged Drinking Water (Other than Natural Mineral Water)"</span>
                              </div>
                              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs space-y-1.5">
                                <div className="flex flex-wrap items-center justify-between text-purple-300 text-[10px] font-bold gap-1">
                                  <span className="truncate">RESOLVED STANDARD: IS 14543:2016</span>
                                  <span className="text-amber-400 whitespace-nowrap">MANDATORY QCO</span>
                                </div>
                                <div className="flex items-center space-x-2 text-[10px] text-zinc-400 truncate">
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
                                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 min-w-0">
                                  <span className="text-zinc-500 block text-[10px]">ISI LICENCE</span>
                                  <span className="text-amber-400 font-bold block truncate">CM/L-8400123</span>
                                  <span className="text-emerald-400 text-[10px] block mt-0.5 truncate">● OPERATIVE</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 min-w-0">
                                  <span className="text-zinc-500 block text-[10px]">GOLD HALLMARK</span>
                                  <span className="text-amber-400 font-bold block truncate">HUID: AB89K2</span>
                                  <span className="text-emerald-400 text-[10px] block mt-0.5 truncate">● 22K 916 AUTHENTIC</span>
                                </div>
                              </div>
                              <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-[11px] text-zinc-300 truncate">
                                Manufacturer: Hawkins Cookers Limited • Factory: Thane West
                              </div>
                            </div>
                          )}

                          {c.previewType === 'wizard' && (
                            <div className="space-y-2 py-2 text-xs">
                              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 text-[11px] gap-2">
                                <div className="flex items-center space-x-2 min-w-0">
                                  <Check className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="truncate">Step 01: Application Form-V Filing</span>
                                </div>
                                <span className="text-[10px] font-bold flex-shrink-0">COMPLETED</span>
                              </div>
                              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 text-[11px] gap-2">
                                <div className="flex items-center space-x-2 min-w-0">
                                  <Check className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="truncate">Step 02: In-House QC Lab & STI</span>
                                </div>
                                <span className="text-[10px] font-bold flex-shrink-0">VERIFIED</span>
                              </div>
                              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px] gap-2">
                                <div className="flex items-center space-x-2 min-w-0">
                                  <span className="w-3.5 h-3.5 rounded-full border border-zinc-600 flex items-center justify-center text-[9px] flex-shrink-0">3</span>
                                  <span className="truncate">Step 03: BIS Factory Audit Readiness</span>
                                </div>
                                <span className="text-[10px] text-cyan-400 flex-shrink-0">IN PROGRESS</span>
                              </div>
                            </div>
                          )}

                          <div className="text-[10px] text-zinc-600 uppercase tracking-widest pt-2 flex items-center justify-between border-t border-zinc-900">
                            <span>BIS SMART TELEMETRY</span>
                            <span className="text-zinc-500 font-mono">NODE 26107</span>
                          </div>
                        </div>

                        {/* Right Column: Editorial Description & Capability Chips */}
                        <div className="card-desc-col flex flex-col justify-between py-1 space-y-4 min-w-0 overflow-hidden">
                          <div>
                            <p className="text-sm sm:text-base lg:text-lg text-zinc-200 leading-relaxed font-normal break-words">
                              {c.description}
                            </p>
                          </div>

                          <div className="space-y-3 pt-2 w-full min-w-0">
                            <div className="flex flex-wrap gap-2">
                              {c.chips.map((chip, i) => (
                                <span
                                  key={i}
                                  className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-400 uppercase tracking-wider shadow-2xs whitespace-nowrap"
                                >
                                  {chip}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-500 pt-1 truncate">
                              <span
                                className={`w-2 h-2 rounded-full transition-colors duration-500 flex-shrink-0 ${
                                  isRevealed ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
                                }`}
                              />
                              <span className="truncate">Statutory Gazette Grounded • Updated for 2026 Regulations</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </StarBorder>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 04. Bottom Exit Connector Beacon to Section 04 */}
        <div className="relative z-20 flex flex-col items-center justify-center pt-24 pb-8">
          <div className="flex items-center space-x-2.5 px-4 py-2 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono text-xs shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="tracking-wider uppercase">CIRCUIT CONTINUES TO STATUTORY MANDATE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
