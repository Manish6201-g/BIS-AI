import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Award, 
  ExternalLink, 
  Search, 
  ArrowRight,
  Maximize2,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Layers,
  LayoutGrid,
  ShieldAlert,
  Flame,
  Scale,
  Check,
  Activity,
  Compass
} from "lucide-react";

export interface ScrollChoreographyImages {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
}

export interface ScrollChoreographyCaptions {
  topLeft?: { tag?: string; title: string; subtitle?: string; metrics?: string };
  topRight?: { tag?: string; title: string; subtitle?: string; metrics?: string };
  bottomLeft?: { tag?: string; title: string; subtitle?: string; metrics?: string };
  bottomRight?: { tag?: string; title: string; subtitle?: string; metrics?: string };
}

export interface ScrollChoreographyProps {
  images: ScrollChoreographyImages;
  captions?: ScrollChoreographyCaptions;
  className?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
}

interface QuadrantConfig {
  id: string;
  index: string;
  key: keyof ScrollChoreographyImages;
  defaultTag: string;
  defaultTitle: string;
  defaultSubtitle: string;
  standard: string;
  category: string;
  statusText: string;
  statusBadge: string;
  accentBorder: string;
  telemetry: { label: string; value: string }[];
  highlights: string[];
  actionUrl: string;
  actionLabel: string;
}

const QUADRANTS: QuadrantConfig[] = [
  {
    id: "quad-1",
    index: "01",
    key: "topLeft",
    defaultTag: "01 — PROOF TESTING",
    defaultTitle: "SCHEME-I FACTORY INSPECTION",
    defaultSubtitle: "Hydrostatic test bench & thermal safety audit",
    standard: "IS 2347 / IS 4151 / IS 14543",
    category: "MECHANICAL & PRESSURE INTEGRITY",
    statusText: "OPERATIVE // FACTORY TESTED",
    statusBadge: "bg-emerald-50 text-emerald-800 border-emerald-300",
    accentBorder: "group-hover:border-emerald-500",
    telemetry: [
      { label: "BURST PRESSURE", value: "17-BAR TESTED" },
      { label: "SIT LOGGING", value: "DAILY BATCH RECORD" },
      { label: "LEAK TOLERANCE", value: "0.00% ZERO ESCAPE" },
    ],
    highlights: [
      "Mandatory on-site factory laboratory for daily batch hydrostatic sampling",
      "Thermal safety release plug activation tested under accelerated stress",
      "Traceable to licensed factory premise gazette registration",
    ],
    actionUrl: "#verif-quick-tool",
    actionLabel: "Verify CM/L Licence",
  },
  {
    id: "quad-2",
    index: "02",
    key: "bottomRight",
    defaultTag: "02 — HALLMARKING",
    defaultTitle: "6-CHAR LASER HUID ASSAY",
    defaultSubtitle: "AHC verified gold fineness (22K916 / 18K750)",
    standard: "IS 1417:2016 MANDATE",
    category: "PRECIOUS METALS PURITY ASSAY",
    statusText: "AUTHENTIC // CENTRAL MIRROR",
    statusBadge: "bg-amber-50 text-amber-900 border-amber-300",
    accentBorder: "group-hover:border-amber-500",
    telemetry: [
      { label: "LASER ETCHING", value: "6-CHAR UNIQUE HUID" },
      { label: "FINENESS ASSAY", value: "916 (22K GOLD)" },
      { label: "AHC TEST LABS", value: "1,650+ ACCREDITED" },
    ],
    highlights: [
      "Microscopic laser-etched HUID unique to every piece of jewellery",
      "Central assay mirror prevents karatage dilution and under-carat fraud",
      "Traceable directly to the certified Assaying & Hallmarking Centre",
    ],
    actionUrl: "#verif-quick-tool",
    actionLabel: "Query Gold HUID",
  },
  {
    id: "quad-3",
    index: "03",
    key: "bottomLeft",
    defaultTag: "03 — GAZETTE REGISTRY",
    defaultTitle: "STATUTORY QCO MANDATES",
    defaultSubtitle: "Cognizable consumer protection under Section 16",
    standard: "BIS ACT 2016 §16 & §29",
    category: "STATUTORY CRIMINAL LAW",
    statusText: "MANDATORY // ENFORCED",
    statusBadge: "bg-red-50 text-red-900 border-red-300",
    accentBorder: "group-hover:border-red-500",
    telemetry: [
      { label: "MANDATORY QCOs", value: "150+ ORDERS" },
      { label: "PENALTY CLAUSE", value: "UP TO 2 YRS JAIL" },
      { label: "HELPLINE 24/7", value: "TOLL-FREE 1915" },
    ],
    highlights: [
      "Strict prohibition on sale of non-certified goods in mandatory sectors",
      "Statutory penalties of ₹2,00,000 to 10× product value and seizure",
      "Cognizable consumer complaint filing with direct magistrate jurisdiction",
    ],
    actionUrl: "/assistant",
    actionLabel: "Report Counterfeit Goods",
  },
  {
    id: "quad-4",
    index: "04",
    key: "topRight",
    defaultTag: "04 — CONVERGENCE",
    defaultTitle: "CENTRAL BIS AUTHENTICITY EMBLEM",
    defaultSubtitle: "National Gazette Mirror & Citizen Verification Hub",
    standard: "CENTRAL REPOSITORY",
    category: "NATIONAL VERIFICATION NETWORK",
    statusText: "100% OPERATIONAL",
    statusBadge: "bg-black text-white border-black",
    accentBorder: "group-hover:border-black",
    telemetry: [
      { label: "ACTIVE LICENCES", value: "45,000+ CM/L" },
      { label: "API LATENCY", value: "< 120ms LIVE" },
      { label: "GAZETTE SYNC", value: "100% GROUNDED" },
    ],
    highlights: [
      "Real-time synchronized central mirror of all operative licences",
      "Multi-modal verification: ISI CM/L code, QR scan, and Laser HUID",
      "Direct citizen access with complete transparency and zero paywall",
    ],
    actionUrl: "/verify-isi",
    actionLabel: "Open Master Registry",
  },
];

export const ScrollChoreography: React.FC<ScrollChoreographyProps> = ({
  images,
  captions,
  className,
  badge = "05.CHOREOGRAPHY — CITIZEN STATUTORY PROOF MATRIX",
  title = "CHOREOGRAPHED REGULATORY PROOFS",
  subtitle = "Explore the 4 statutory pillars of product quality & hallmarking assurance as they converge into the national central authenticity network."
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0); // 0, 1, 2, 3, or 4 (Converged)
  const [viewMode, setViewMode] = useState<"matrix" | "focus" | "converged">("matrix");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play cycling when enabled
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Synchronize with scroll position through the section container
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!containerRef.current || isPlaying) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const viewportH = window.innerHeight;
            // When container enters viewport mid-screen, track relative scroll progress
            const topOffset = viewportH * 0.5 - rect.top;
            const totalH = rect.height;
            if (topOffset >= 0 && topOffset <= totalH) {
              const progress = Math.max(0, Math.min(1, topOffset / totalH));
              // Map progress to steps: 0 -> Step 0, 0.25 -> Step 1, 0.50 -> Step 2, 0.75 -> Step 3, 0.90 -> Step 4
              if (progress < 0.22) {
                setActiveStep(0);
              } else if (progress < 0.44) {
                setActiveStep(1);
              } else if (progress < 0.66) {
                setActiveStep(2);
              } else if (progress < 0.88) {
                setActiveStep(3);
              } else {
                setActiveStep(4);
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPlaying]);

  const activeQuadrant = activeStep < 4 ? QUADRANTS[activeStep] : QUADRANTS[3];
  const activeImage = images[activeQuadrant.key] || images.topRight;
  const activeCaption = captions?.[activeQuadrant.key];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full border border-zinc-300 bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xs",
        className
      )}
    >
      {/* Subtle Blueprint Grid Pattern Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Technical Corner Markers */}
        <div className="absolute top-4 left-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest hidden sm:block">
          CHOREO // MATRIX [0,0]
        </div>
        <div className="absolute top-4 right-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest hidden sm:block">
          CENTRAL GAZETTE MIRROR // ACTIVE
        </div>
      </div>

      <div className="relative z-10 p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
        
        {/* ========================================================
            01. Section Header & High-Density Telemetry Bar
            ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-200 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[10px] sm:text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>{badge}</span>
            </div>

            <h3 className="editorial-headline text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-black leading-tight">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-600 font-mono leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* View Mode Switcher & Auto-Play Controls */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <div className="inline-flex p-1 bg-zinc-100 rounded-xl border border-zinc-200">
              <button
                type="button"
                onClick={() => setViewMode("matrix")}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer",
                  viewMode === "matrix"
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:text-black"
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">2×2 Matrix</span>
                <span className="sm:hidden">Matrix</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("focus")}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer",
                  viewMode === "focus"
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:text-black"
                )}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Deep Inspect</span>
                <span className="sm:hidden">Inspect</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewMode("converged");
                  setActiveStep(4);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer",
                  viewMode === "converged"
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:text-black"
                )}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Converged Matrix</span>
              </button>
            </div>

            {/* Auto Play / Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={cn(
                "p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-[11px] font-bold",
                isPlaying
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : "bg-white border-zinc-300 text-zinc-600 hover:text-black hover:border-black"
              )}
              title={isPlaying ? "Pause automated choreography" : "Auto-play choreography steps"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlaying ? "PAUSE" : "AUTO"}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            02. Stepper Pill Navigation (Always Organized & Clear)
            ======================================================== */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-[11px]">
            {QUADRANTS.map((quad, idx) => {
              const isSelected = activeStep === idx && viewMode !== "converged";
              return (
                <button
                  key={quad.id}
                  type="button"
                  onClick={() => {
                    setActiveStep(idx);
                    if (viewMode === "converged") setViewMode("focus");
                  }}
                  className={cn(
                    "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1",
                    isSelected
                      ? "bg-black text-white border-black shadow-xs ring-1 ring-black"
                      : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-white hover:border-zinc-400"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-[9px] font-bold uppercase tracking-wider",
                      isSelected ? "text-zinc-400" : "text-zinc-500"
                    )}>
                      PILLAR {quad.index}
                    </span>
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      isSelected ? "bg-emerald-400 animate-pulse" : "bg-zinc-300"
                    )} />
                  </div>
                  <p className="font-bold text-xs truncate leading-tight">
                    {quad.defaultTitle.split(" ")[0]} {quad.defaultTitle.split(" ")[1] || ""}
                  </p>
                  <span className={cn(
                    "text-[9px] font-mono truncate",
                    isSelected ? "text-zinc-300" : "text-zinc-400"
                  )}>
                    {quad.standard}
                  </span>
                </button>
              );
            })}

            {/* 5th Pill: Full Convergence */}
            <button
              type="button"
              onClick={() => {
                setActiveStep(4);
                setViewMode("converged");
              }}
              className={cn(
                "col-span-2 sm:col-span-1 p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1",
                activeStep === 4 || viewMode === "converged"
                  ? "bg-black text-white border-black shadow-xs ring-1 ring-black"
                  : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-white hover:border-zinc-400"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                  FINAL STAGE
                </span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
              <p className="font-bold text-xs truncate leading-tight">
                CONVERGED SUITE
              </p>
              <span className={cn(
                "text-[9px] font-mono truncate",
                activeStep === 4 ? "text-zinc-300" : "text-zinc-400"
              )}>
                ALL 4 PILLARS IN SYNC
              </span>
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden">
            <div
              className="bg-black h-full transition-all duration-500 ease-out"
              style={{ width: `${((activeStep + 1) / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* ========================================================
            03. Main Presentation: (Matrix View OR Focus View OR Converged)
            ======================================================== */}
        
        {/* VIEW 1: Clean 2x2 Matrix Grid (Organized, No Collisions) */}
        {viewMode === "matrix" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {QUADRANTS.map((quad, idx) => {
              const imgUrl = images[quad.key] || images.topRight;
              const cap = captions?.[quad.key];
              const isSelected = activeStep === idx;

              return (
                <div
                  key={quad.id}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "group relative rounded-2xl sm:rounded-3xl border overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[300px] sm:min-h-[340px] bg-zinc-950 text-white p-5 sm:p-6",
                    isSelected
                      ? "border-black shadow-lg ring-2 ring-black"
                      : "border-zinc-300 hover:border-zinc-500 shadow-xs"
                  )}
                >
                  {/* Background Specimen Image with Cinematic Dark Gradient */}
                  <img
                    src={imgUrl}
                    alt={quad.defaultTitle}
                    className="absolute inset-0 size-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-500 filter grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent pointer-events-none" />

                  {/* Top Bar inside Card */}
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white uppercase tracking-wider">
                          {cap?.tag || quad.defaultTag}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-400">
                          {quad.standard}
                        </span>
                      </div>
                      <h4 className="editorial-headline text-lg sm:text-xl font-black uppercase text-white mt-1">
                        {cap?.title || quad.defaultTitle}
                      </h4>
                      <p className="text-xs text-zinc-300 font-mono leading-snug">
                        {cap?.subtitle || quad.defaultSubtitle}
                      </p>
                    </div>

                    <span className={cn(
                      "font-mono text-[9px] font-bold px-2 py-0.5 rounded-md uppercase border shrink-0",
                      quad.statusBadge
                    )}>
                      {quad.statusText.split("//")[0]}
                    </span>
                  </div>

                  {/* Telemetry Chips in Card */}
                  <div className="relative z-10 grid grid-cols-3 gap-2 my-4 pt-4 border-t border-white/10 font-mono">
                    {quad.telemetry.map((t, tIdx) => (
                      <div key={tIdx} className="bg-white/5 rounded-lg p-2 border border-white/10">
                        <span className="text-[8px] sm:text-[9px] text-zinc-400 uppercase tracking-widest block truncate">
                          {t.label}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-bold text-white block truncate mt-0.5">
                          {t.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Inspection Actions */}
                  <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStep(idx);
                        setViewMode("focus");
                      }}
                      className="text-white font-bold hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>DEEP INSPECTION</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={quad.actionUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      <span>{quad.actionLabel}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 2: Deep Focus Inspector (Single Specimen Showcase) */}
        {viewMode === "focus" && (
          <div className="bg-zinc-950 text-white rounded-2xl sm:rounded-3xl border border-zinc-800 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left 6 Cols: Cinematic Image Specimen with Crosshair Overlay */}
            <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[460px] overflow-hidden bg-black flex flex-col justify-between p-6">
              <img
                src={activeImage}
                alt={activeQuadrant.defaultTitle}
                className="absolute inset-0 size-full object-cover opacity-60 filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

              {/* Holographic Crosshair Target */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-48 h-48 rounded-full border border-dashed border-white/40" />
                <div className="absolute w-64 h-64 rounded-full border border-white/20" />
                <div className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Specimen Header */}
              <div className="relative z-10 flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md uppercase text-[10px] font-bold text-white">
                  PILLAR {activeQuadrant.index} // SPECIMEN
                </span>
                <span className="text-[10px] text-zinc-300">
                  STANDARD: {activeQuadrant.standard}
                </span>
              </div>

              {/* Specimen Footer */}
              <div className="relative z-10 space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 block tracking-widest">
                  {activeQuadrant.category}
                </span>
                <h4 className="editorial-headline text-xl sm:text-2xl font-black uppercase text-white">
                  {activeCaption?.title || activeQuadrant.defaultTitle}
                </h4>
                <p className="text-xs text-zinc-300 font-mono">
                  {activeCaption?.subtitle || activeQuadrant.defaultSubtitle}
                </p>
              </div>
            </div>

            {/* Right 6 Cols: Rich Regulatory Proof Telemetry & Checklist */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 font-mono">
              <div className="space-y-4">
                
                {/* Status Indicator */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      STATUTORY VERIFICATION PROFILE
                    </span>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded border uppercase",
                    activeQuadrant.statusBadge
                  )}>
                    {activeQuadrant.statusText}
                  </span>
                </div>

                {/* 3 Telemetry Data Boxes */}
                <div className="grid grid-cols-3 gap-2">
                  {activeQuadrant.telemetry.map((t, idx) => (
                    <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                      <span className="text-[9px] text-zinc-400 block uppercase tracking-wider truncate">
                        {t.label}
                      </span>
                      <span className="text-xs font-black text-white block mt-0.5 truncate">
                        {t.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Statutory Checkpoints Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                    INSPECTION PROTOCOL CHECKPOINTS
                  </span>
                  <div className="space-y-2">
                    {activeQuadrant.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start space-x-2.5 text-xs text-zinc-300 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Navigation & Action Triggers */}
              <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 3))}
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-white text-white cursor-pointer"
                    title="Previous pillar"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-zinc-400 text-[11px]">
                    PILLAR {activeQuadrant.index} OF 04
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveStep((prev) => (prev < 3 ? prev + 1 : 0))}
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-white text-white cursor-pointer"
                    title="Next pillar"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setViewMode("matrix")}
                    className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 text-xs font-bold uppercase transition-colors cursor-pointer"
                  >
                    Back to Matrix
                  </button>

                  <a
                    href={activeQuadrant.actionUrl}
                    className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{activeQuadrant.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 3: Converged Central Master Verification Suite */}
        {viewMode === "converged" && (
          <div className="bg-zinc-950 text-white rounded-2xl sm:rounded-3xl border border-zinc-800 p-6 sm:p-10 space-y-8 font-mono shadow-2xl">
            
            {/* Header with National Emblem Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-black text-base shadow-lg">
                  BIS
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white uppercase tracking-wider block">
                      NATIONAL BUREAU OF INDIAN STANDARDS
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono">
                    AUTHENTICATED GAZETTE VERIFICATION NETWORK • CENTRAL MIRROR
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>100% OPERATIONAL TELEMETRY</span>
                </span>
              </div>
            </div>

            {/* 3 Inspection Pillars in Converged Mode */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-2 hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                    01 — ISI MONOGRAM
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    SCHEME-I
                  </span>
                </div>
                <p className="text-sm font-black text-white">7-Digit CM/L Licence Code</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Real-time validation of factory location, registered product category, scope of certification, and active expiry date in the Gazette.
                </p>
              </div>

              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-2 hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                    02 — GOLD HUID TRACEABILITY
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    IS 1417:2016
                  </span>
                </div>
                <p className="text-sm font-black text-white">6-Character Micro Laser Etch</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Trace exact fineness (22K916, 18K750, 14K585) and official AHC centre registration number to prevent karatage dilution and jewellery fraud.
                </p>
              </div>

              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-2 hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                    03 — STATUTORY REMEDY
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                    BIS ACT §16 & §29
                  </span>
                </div>
                <p className="text-sm font-black text-white">Cognizable Criminal Remedy</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Instant counterfeit violation forwarding to central enforcement officers with 24/7 National Consumer Helpline 1915 integration.
                </p>
              </div>
            </div>

            {/* Bottom Actions inside Converged Mode */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-zinc-800">
              <div className="text-xs text-zinc-400">
                <span className="text-white font-bold">Statutory Guarantee:</span> All citizen verification queries are cryptographically matched with official Gazette records.
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode("matrix")}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  View 2×2 Matrix
                </button>
                <a
                  href="#verif-quick-tool"
                  className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors text-center cursor-pointer shadow-xs font-bold"
                >
                  Proceed To Instant Verifier ↓
                </a>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            04. 4-Metric Telemetry Ribbon (Always Visible & Organized)
            ======================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-2 font-mono">
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider block">
              Active CM/L Licences
            </span>
            <span className="text-base sm:text-lg font-black text-black block mt-0.5">
              45,000+
            </span>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider block">
              Certified AHC Labs
            </span>
            <span className="text-base sm:text-lg font-black text-black block mt-0.5">
              1,650+
            </span>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider block">
              Mandatory QCO Orders
            </span>
            <span className="text-base sm:text-lg font-black text-black block mt-0.5">
              150+ Schemes
            </span>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider block">
              Live Central Latency
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-600 block mt-0.5">
              &lt; 120ms Verified
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
