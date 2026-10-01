import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Search, MessageSquare, FileText, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TimelineSection = () => {
  const { t } = useLanguage();
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const activePathRef = useRef(null);
  const totalLenRef = useRef(0);
  const nodeRefs = useRef([]);
  const animFrameRef = useRef(null);

  const [pathD, setPathD] = useState('');
  const [cometPos, setCometPos] = useState(null);
  const [revealedPhases, setRevealedPhases] = useState([false, false, false, false]);

  const steps = [
    {
      num: "01",
      phaseLabel: "PHASE 01",
      title: t('timeline_step1_title'),
      desc: t('timeline_step1_desc'),
      icon: Search,
      tag: "STANDARDS CATALOG ENGINE",
      accent: "emerald",
      chips: ["20,000+ IS STANDARDS", "DPIIT QCO RESOLUTION", "HSN MAPPING"]
    },
    {
      num: "02",
      phaseLabel: "PHASE 02",
      title: t('timeline_step2_title'),
      desc: t('timeline_step2_desc'),
      icon: MessageSquare,
      tag: "BHASHINI NLP ASSISTANT",
      accent: "indigo",
      chips: ["11+ INDIC LANGUAGES", "VOICE SPEECH-TO-TEXT", "MULTILINGUAL AI"]
    },
    {
      num: "03",
      phaseLabel: "PHASE 03",
      title: t('timeline_step3_title'),
      desc: t('timeline_step3_desc'),
      icon: FileText,
      tag: "CLAUSE-LEVEL GROUNDING",
      accent: "amber",
      chips: ["STATUTORY CITATIONS", "SCHEDULE PROTOCOLS", "ZERO HALLUCINATION"]
    },
    {
      num: "04",
      phaseLabel: "PHASE 04",
      title: t('timeline_step4_title'),
      desc: t('timeline_step4_desc'),
      icon: ShieldCheck,
      tag: "INSTANT VERIFICATION",
      accent: "emerald",
      chips: ["7-DIGIT ISI CM/L", "6-CHAR GOLD HUID", "STATUTORY AUTHENTIC"]
    }
  ];

  // Calculate smooth serpentine cubic Bézier snake path through all 4 phase nodes
  const calculateGeometry = useCallback(() => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const W = cRect.width;
    const H = cRect.height;
    if (W <= 0 || H <= 0) return;

    // Start at top center of container
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

    // End at bottom center
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

  // Smooth scroll progression updating snake stroke & comet head
  const updateScroll = useCallback(() => {
    if (!containerRef.current || !activePathRef.current) return;
    const totalLen = totalLenRef.current;
    if (totalLen <= 0) return;

    const cRect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;

    // Drawing progress based on scroll position in timeline section
    const startY = vh * 0.8;
    const endY = vh * 0.3;
    const scrollRange = cRect.height + startY - endY;
    const scrolled = startY - cRect.top;

    let progress = scrollRange > 0 ? scrolled / scrollRange : 0;
    progress = Math.min(Math.max(progress, 0), 1);

    const drawnLen = totalLen * progress;
    activePathRef.current.style.strokeDashoffset = `${(totalLen - drawnLen).toFixed(1)}`;

    // Position glowing comet head at the leading tip of the snake
    if (drawnLen > 0) {
      try {
        const pt = activePathRef.current.getPointAtLength(drawnLen);
        setCometPos({ x: pt.x, y: pt.y });
      } catch (e) {}
    } else {
      setCometPos(null);
    }

    // Reveal phase cards as snake reaches each milestone
    setRevealedPhases(prev => {
      let changed = false;
      const next = [...prev];
      for (let i = 0; i < 4; i++) {
        const el = nodeRefs.current[i];
        if (el) {
          const nRect = el.getBoundingClientRect();
          const inView = nRect.top <= vh * 0.78;
          const nodeProgress = (nRect.top - cRect.top) / cRect.height;
          const isReached = progress >= Math.max(0.04, nodeProgress - 0.05) || inView;
          if (next[i] !== isReached) {
            next[i] = isReached;
            changed = true;
          }
        }
      }
      return changed ? next : prev;
    });
  }, []);

  // Update stroke length when path geometry changes
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

  // Set up resize observer and scroll listener
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
    <section
      ref={timelineRef}
      data-theme="light"
      className="bg-tech-dotted-white text-black py-16 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-12 border-b border-zinc-200 relative overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 md:mb-20 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-zinc-500 uppercase mb-3 px-3 py-1 rounded-full bg-black/5 border border-black/10">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('timeline_tag')}</span>
          </div>
          <h2 className="editorial-headline text-4xl sm:text-6xl md:text-7xl text-black font-black tracking-tight leading-[1.05]">
            {t('timeline_title_1')} <br />
            <span className="text-zinc-400">{t('timeline_title_2')}</span>
          </h2>
        </div>

        {/* Winding Snake Path Canvas */}
        <div ref={containerRef} className="relative w-full py-8">
          {/* Serpentine SVG Layer */}
          {pathD && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="timeline-snake-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="35%" stopColor="#10b981" stopOpacity="1" />
                  <stop offset="70%" stopColor="#0d9488" stopOpacity="1" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="1" />
                </linearGradient>

                <filter id="timeline-laser-shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#10b981" floodOpacity="0.45" />
                </filter>

                <radialGradient id="timeline-comet-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="40%" stopColor="#34d399" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Faint Guide Track */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(0, 0, 0, 0.12)"
                strokeWidth="3.5"
                strokeDasharray="6 8"
              />

              {/* Active Neon Laser Snake Line */}
              <path
                ref={activePathRef}
                d={pathD}
                fill="none"
                stroke="url(#timeline-snake-grad)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#timeline-laser-shadow)"
                style={{ willChange: 'stroke-dashoffset' }}
              />

              {/* Glowing Comet Head at Leading Edge */}
              {cometPos && (
                <g transform={`translate(${cometPos.x}, ${cometPos.y})`}>
                  <circle r="22" fill="url(#timeline-comet-glow)" className="animate-pulse" />
                  <circle r="6" fill="#10b981" />
                  <circle r="3" fill="#ffffff" />
                </g>
              )}
            </svg>
          )}

          {/* 4 Phases with Winding Snake Milestones */}
          <div className="relative z-20 flex flex-col space-y-16 sm:space-y-24 md:space-y-32">
            {steps.map((s, idx) => {
              const isRevealed = revealedPhases[idx];
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={s.num}
                  className={`relative flex flex-col ${
                    isEven ? 'md:items-start' : 'md:items-end'
                  } w-full transition-all duration-700`}
                >
                  {/* Serpentine Milestone Node Beacon */}
                  <div
                    className={`w-full flex ${
                      isEven ? 'md:justify-start md:pl-[30%]' : 'md:justify-end md:pr-[30%]'
                    } justify-start mb-4 px-2`}
                  >
                    <div
                      ref={el => (nodeRefs.current[idx] = el)}
                      className="inline-flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-500 shadow-sm"
                      style={{
                        borderColor: isRevealed ? '#10b981' : 'rgba(0, 0, 0, 0.15)',
                        backgroundColor: isRevealed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.9)',
                        boxShadow: isRevealed ? '0 0 24px rgba(16, 185, 129, 0.35)' : 'none',
                      }}
                    >
                      <span className="relative flex h-3.5 w-3.5">
                        {isRevealed && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                        )}
                        <span
                          className="relative inline-flex rounded-full h-3.5 w-3.5 transition-colors duration-500"
                          style={{ backgroundColor: isRevealed ? '#10b981' : '#a1a1aa' }}
                        />
                      </span>
                      <span
                        className="font-mono text-xs font-black uppercase tracking-widest transition-colors duration-500"
                        style={{ color: isRevealed ? '#065f46' : '#71717a' }}
                      >
                        {s.phaseLabel} • {s.title}
                      </span>
                    </div>
                  </div>

                  {/* Phase Card Content */}
                  <div
                    className="w-full md:w-[68%] lg:w-[60%] transition-all duration-700 ease-out"
                    style={{
                      opacity: isRevealed ? 1 : 0.4,
                      transform: isRevealed ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 20px, 0) scale(0.98)',
                      willChange: 'transform, opacity',
                    }}
                  >
                    <div className="bg-white/95 border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                      {/* Top accent bar */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500"
                        style={{
                          background: isRevealed
                            ? 'linear-gradient(90deg, #10b981, #06b6d4, #10b981)'
                            : 'rgba(0, 0, 0, 0.08)',
                        }}
                      />

                      {/* Header Row: Phase Tag & Number */}
                      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 gap-4">
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className={`p-2.5 rounded-2xl ${isRevealed ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-500'} transition-colors duration-500`}>
                            <s.icon className="w-5 h-5 flex-shrink-0" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 block truncate">
                              {s.tag}
                            </span>
                            <h3 className="font-sans text-xl sm:text-2xl font-black text-black uppercase tracking-tight truncate">
                              {s.title}
                            </h3>
                          </div>
                        </div>

                        <span className="font-mono text-3xl sm:text-4xl font-black text-black/15 group-hover:text-black/30 transition-colors duration-300 select-none flex-shrink-0">
                          {s.num}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="py-4 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                        {s.desc}
                      </p>

                      {/* Capability Chips */}
                      <div className="pt-2 flex flex-wrap gap-2 border-t border-zinc-100">
                        {s.chips.map((chip, cIdx) => (
                          <span
                            key={cIdx}
                            className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md bg-zinc-100/80 border border-zinc-200 text-zinc-700 uppercase tracking-wider font-semibold"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Terminal Cap */}
          <div className="relative z-20 flex flex-col items-center justify-center pt-20 pb-4">
            <div className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-600 font-mono text-xs shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="tracking-wider uppercase">WORKFLOW FULLY GROUNDED & VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
