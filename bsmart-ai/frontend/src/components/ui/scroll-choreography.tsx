import React, { useRef, useState, useEffect, useCallback } from "react";
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
  Play,
  Pause,
  RotateCcw,
  Layers,
  Activity,
  Flame,
  Scale
} from "lucide-react";

export interface ScrollChoreographyImages {
  topLeft: string;
  topRight: string; // The Hero quadrant image that expands to fill the viewport
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

// Numerical interpolation helper
function interpolateNum(
  t: number,
  inputRange: number[],
  outputRange: number[]
): number {
  if (t <= inputRange[0]) return outputRange[0];
  if (t >= inputRange[inputRange.length - 1])
    return outputRange[outputRange.length - 1];

  for (let i = 0; i < inputRange.length - 1; i++) {
    const start = inputRange[i];
    const end = inputRange[i + 1];
    if (t >= start && t <= end) {
      const localT = (t - start) / (end - start);
      return outputRange[i] + (outputRange[i + 1] - outputRange[i]) * localT;
    }
  }
  return outputRange[outputRange.length - 1];
}

export const ScrollChoreography: React.FC<ScrollChoreographyProps> = ({
  images,
  captions,
  className,
  badge = "05.CHOREOGRAPHY — CITIZEN STATUTORY PROOF MATRIX",
  title = "CHOREOGRAPHED REGULATORY PROOFS",
  subtitle = "Scroll down to witness the 4 statutory proof quadrants animate and converge into the national central authenticity emblem."
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const targetProgressRef = useRef(0);

  // Smooth Spring Motion Physics
  useEffect(() => {
    let animationFrameId: number;
    let velocity = 0;
    let currentSmooth = 0;
    const stiffness = 280;
    const damping = 34;
    const mass = 1.0;

    const loop = () => {
      const target = targetProgressRef.current;
      const dt = 1 / 60;
      const displacement = target - currentSmooth;
      const springForce = stiffness * displacement;
      const dampingForce = -damping * velocity;
      const acceleration = (springForce + dampingForce) / mass;

      velocity += acceleration * dt;
      currentSmooth += velocity * dt;

      // Clamp within 0 and 1
      const clamped = Math.max(0, Math.min(1, currentSmooth));
      setSmoothProgress(clamped);

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Native Scroll-Driven Progress Tracker
  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const totalScrollable = rect.height - viewportH;

      if (totalScrollable <= 0) {
        targetProgressRef.current = 0;
      } else {
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
        targetProgressRef.current = p;
        setScrollProgress(p);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPlaying]);

  // Automated Cinematic Playback Mode
  useEffect(() => {
    if (!isPlaying) return;
    let direction = 1;
    const interval = setInterval(() => {
      let next = targetProgressRef.current + direction * 0.008;
      if (next >= 1) {
        next = 1;
        direction = -1;
      } else if (next <= 0) {
        next = 0;
        direction = 1;
      }
      targetProgressRef.current = next;
      setScrollProgress(next);
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const jumpToPhase = (phaseVal: number) => {
    setIsPlaying(false);
    targetProgressRef.current = phaseVal;
    setScrollProgress(phaseVal);
  };

  const p = smoothProgress;

  // ========================================================
  // ANIMATION CHOREOGRAPHY INTERPOLATION (0.0 -> 1.0)
  // ========================================================
  
  // Quadrant 1 (Top-Left): Factory Mechanical & Burst Testing
  // Starts top-left -> arcs downward -> converges to center -> fades
  const tlX = interpolateNum(p, [0, 0.25, 0.55, 0.75, 1], [-25, -28, -12, 0, 0]);
  const tlY = interpolateNum(p, [0, 0.25, 0.55, 0.75, 1], [-25, 15, 0, 0, 0]);
  const tlScale = interpolateNum(p, [0, 0.45, 0.65, 0.75], [1, 1.02, 0.85, 0.5]);
  const tlOpacity = interpolateNum(p, [0.55, 0.72], [1, 0]);
  const tlRotate = interpolateNum(p, [0, 0.35, 0.65], [-1, 2, 0]);

  // Quadrant 2 (Bottom-Right): 6-Char Laser HUID Assaying
  // Starts bottom-right -> arcs upward -> converges to center -> fades
  const brX = interpolateNum(p, [0, 0.25, 0.55, 0.75, 1], [25, 28, 12, 0, 0]);
  const brY = interpolateNum(p, [0, 0.25, 0.55, 0.75, 1], [25, -15, 0, 0, 0]);
  const brScale = interpolateNum(p, [0, 0.45, 0.65, 0.75], [1, 1.02, 0.85, 0.5]);
  const brOpacity = interpolateNum(p, [0.55, 0.72], [1, 0]);
  const brRotate = interpolateNum(p, [0, 0.35, 0.65], [1, -2, 0]);

  // Quadrant 3 (Bottom-Left): Gazette Statutory Enforcement QCO
  // Starts bottom-left -> slides rightward -> converges to center -> fades
  const blX = interpolateNum(p, [0, 0.25, 0.55, 0.75, 1], [-25, -15, -6, 0, 0]);
  const blY = interpolateNum(p, [0, 0.25, 0.55, 0.75, 1], [25, 20, 6, 0, 0]);
  const blScale = interpolateNum(p, [0, 0.45, 0.65, 0.75], [1, 0.98, 0.85, 0.5]);
  const blOpacity = interpolateNum(p, [0.55, 0.72], [1, 0]);
  const blRotate = interpolateNum(p, [0, 0.35, 0.65], [0, 1.5, 0]);

  // Quadrant 4 (Top-Right HERO): Bureau of Indian Standards Authenticity Emblem
  // Starts top-right -> moves to center -> EXPANDS to full stage
  const trX = interpolateNum(p, [0, 0.25, 0.55, 0.75, 1], [25, 15, 0, 0, 0]);
  const trY = interpolateNum(p, [0, 0.25, 0.55, 0.75, 1], [-25, -12, 0, 0, 0]);
  const trRotate = interpolateNum(p, [0, 0.35, 0.60], [1, -1.5, 0]);
  
  // Hero Expansion Dimensions (from 42% width & 38% height up to 96% width & 90% height)
  const trWidth = interpolateNum(p, [0.55, 0.78, 1], [42, 85, 96]);
  const trHeight = interpolateNum(p, [0.55, 0.78, 1], [38, 78, 90]);
  const trBorderRadius = interpolateNum(p, [0.55, 0.78, 1], [24, 28, 32]);

  // Expanded Hero Full Verification Content Overlay
  const heroContentOpacity = interpolateNum(p, [0.65, 0.85], [0, 1]);
  const heroContentScale = interpolateNum(p, [0.65, 0.85], [0.94, 1]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[220vh] sm:h-[250vh] w-full",
        className
      )}
    >
      {/* Sticky Choreography Cinema Viewport */}
      <div className="sticky top-20 sm:top-24 h-[calc(100vh-5.5rem)] sm:h-[calc(100vh-6.5rem)] max-h-[880px] w-full overflow-hidden rounded-[28px] sm:rounded-[36px] border border-zinc-300 bg-zinc-950 text-white flex flex-col justify-between p-4 sm:p-6 lg:p-7 shadow-2xl">
        
        {/* Architectural Blueprint Matrix Background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(#52525b_1px,transparent_1px)] [background-size:24px_24px]" />
          
          {/* Subtle Coordinate Crosshair Rings in Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-dashed border-zinc-600/40" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-zinc-700/30" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-60" />

          {/* Technical Corner Markers */}
          <div className="absolute top-4 left-6 font-mono text-[9px] text-zinc-500 uppercase tracking-widest hidden sm:block">
            CHOREOGRAPHY // KINETIC MATRIX [0,0]
          </div>
          <div className="absolute top-4 right-6 font-mono text-[9px] text-zinc-500 uppercase tracking-widest hidden sm:block">
            CENTRAL GAZETTE MIRROR // ACTIVE
          </div>
        </div>

        {/* ========================================================
            Top Header & Interactive Phase Scrub Controller
            ======================================================== */}
        <div className="relative z-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="space-y-0.5">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full border border-zinc-700 bg-zinc-900 font-mono text-[10px] tracking-widest text-zinc-300 uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{badge}</span>
            </div>
            <h3 className="editorial-headline text-lg sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
              {title}
            </h3>
          </div>

          {/* Interactive Phase Buttons & Auto-Play Controller */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
            <button
              type="button"
              onClick={() => jumpToPhase(0)}
              className={cn(
                "px-2.5 py-1 rounded-lg border transition-all cursor-pointer",
                p < 0.25 
                  ? "bg-white text-black border-white font-bold shadow-xs" 
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
              )}
            >
              01 SPREAD
            </button>

            <button
              type="button"
              onClick={() => jumpToPhase(0.35)}
              className={cn(
                "px-2.5 py-1 rounded-lg border transition-all cursor-pointer",
                p >= 0.25 && p < 0.55
                  ? "bg-white text-black border-white font-bold shadow-xs" 
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
              )}
            >
              02 DANCE
            </button>

            <button
              type="button"
              onClick={() => jumpToPhase(0.65)}
              className={cn(
                "px-2.5 py-1 rounded-lg border transition-all cursor-pointer",
                p >= 0.55 && p < 0.8
                  ? "bg-white text-black border-white font-bold shadow-xs" 
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
              )}
            >
              03 CONVERGE
            </button>

            <button
              type="button"
              onClick={() => jumpToPhase(0.95)}
              className={cn(
                "px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1",
                p >= 0.8 
                  ? "bg-white text-black border-white font-bold shadow-xs" 
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
              )}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>04 HERO EXPAND</span>
            </button>

            {/* Auto Play / Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={cn(
                "px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 font-bold",
                isPlaying
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
              )}
              title={isPlaying ? "Pause animation playback" : "Auto-play continuous choreography animation"}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? "PAUSE" : "AUTO"}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            The Kinetic Choreography Stage (Cards Movement Area)
            ======================================================== */}
        <div className="relative flex-1 w-full my-2 overflow-hidden">
          
          {/* Base Card 1: Top-Left (Factory Mechanical Proof Testing) */}
          <div
            className="absolute left-1/2 top-1/2 w-[82vw] sm:w-[38%] h-[24vh] sm:h-[36%] rounded-2xl sm:rounded-3xl border border-zinc-700 bg-zinc-900 overflow-hidden shadow-2xl transition-all duration-75 will-change-transform z-10"
            style={{
              transform: `translate(-50%, -50%) translate(${tlX * 3.4}%, ${tlY * 2.2}%) rotate(${tlRotate}deg) scale(${tlScale})`,
              opacity: tlOpacity,
              pointerEvents: p > 0.65 ? "none" : "auto",
            }}
          >
            <img
              src={images.topLeft}
              alt="Quadrant 01 Specimen"
              className="absolute inset-0 size-full object-cover opacity-45 filter contrast-125 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-between font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                  {captions?.topLeft?.tag || "01 — PROOF TESTING"}
                </span>
                <span className="text-[9px] text-zinc-400">IS 2347 / IS 4151</span>
              </div>
              <div>
                <h4 className="editorial-headline text-xs sm:text-base font-black uppercase text-white truncate">
                  {captions?.topLeft?.title || "SCHEME-I FACTORY INSPECTION"}
                </h4>
                <p className="text-[10px] text-zinc-300 truncate">
                  {captions?.topLeft?.subtitle || "Hydrostatic test bench & thermal safety audit"}
                </p>
                <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between text-[9px] text-zinc-400">
                  <span>BURST MARGIN: 17-BAR</span>
                  <span className="text-emerald-400 font-bold">CONFORMING ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Base Card 2: Bottom-Right (Laser HUID Gold Hallmarking) */}
          <div
            className="absolute left-1/2 top-1/2 w-[82vw] sm:w-[38%] h-[24vh] sm:h-[36%] rounded-2xl sm:rounded-3xl border border-zinc-700 bg-zinc-900 overflow-hidden shadow-2xl transition-all duration-75 will-change-transform z-20"
            style={{
              transform: `translate(-50%, -50%) translate(${brX * 3.4}%, ${brY * 2.2}%) rotate(${brRotate}deg) scale(${brScale})`,
              opacity: brOpacity,
              pointerEvents: p > 0.65 ? "none" : "auto",
            }}
          >
            <img
              src={images.bottomRight}
              alt="Quadrant 02 Specimen"
              className="absolute inset-0 size-full object-cover opacity-45 filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-between font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                  {captions?.bottomRight?.tag || "02 — HALLMARKING"}
                </span>
                <span className="text-[9px] text-zinc-400">IS 1417 MANDATE</span>
              </div>
              <div>
                <h4 className="editorial-headline text-xs sm:text-base font-black uppercase text-white truncate">
                  {captions?.bottomRight?.title || "6-CHAR LASER HUID ASSAY"}
                </h4>
                <p className="text-[10px] text-zinc-300 truncate">
                  {captions?.bottomRight?.subtitle || "AHC verified gold fineness (22K916 / 18K750)"}
                </p>
                <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between text-[9px] text-zinc-400">
                  <span>PURITY: 916 (22 KARAT)</span>
                  <span className="text-amber-400 font-bold">AUTHENTIC ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Base Card 3: Bottom-Left (Statutory Gazette QCO Orders) */}
          <div
            className="absolute left-1/2 top-1/2 w-[82vw] sm:w-[38%] h-[24vh] sm:h-[36%] rounded-2xl sm:rounded-3xl border border-zinc-700 bg-zinc-900 overflow-hidden shadow-2xl transition-all duration-75 will-change-transform z-20"
            style={{
              transform: `translate(-50%, -50%) translate(${blX * 3.4}%, ${blY * 2.2}%) rotate(${blRotate}deg) scale(${blScale})`,
              opacity: blOpacity,
              pointerEvents: p > 0.65 ? "none" : "auto",
            }}
          >
            <img
              src={images.bottomLeft}
              alt="Quadrant 03 Specimen"
              className="absolute inset-0 size-full object-cover opacity-40 filter contrast-125 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-between font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 uppercase">
                  {captions?.bottomLeft?.tag || "03 — GAZETTE REGISTRY"}
                </span>
                <span className="text-[9px] text-zinc-400">BIS ACT §16 & §29</span>
              </div>
              <div>
                <h4 className="editorial-headline text-xs sm:text-base font-black uppercase text-white truncate">
                  {captions?.bottomLeft?.title || "STATUTORY QCO MANDATES"}
                </h4>
                <p className="text-[10px] text-zinc-300 truncate">
                  {captions?.bottomLeft?.subtitle || "Cognizable consumer protection under Section 16"}
                </p>
                <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between text-[9px] text-zinc-400">
                  <span>MANDATORY ORDERS: 150+</span>
                  <span className="text-red-400 font-bold">CRIMINAL PENALTY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Card 4: Top-Right (Choreographs to Center & Expands to Full Stage) */}
          <div
            className="absolute left-1/2 top-1/2 rounded-2xl sm:rounded-3xl border-2 border-white/40 bg-zinc-950 overflow-hidden shadow-2xl transition-all duration-75 will-change-transform z-40 origin-center"
            style={{
              transform: `translate(-50%, -50%) translate(${trX * 3.4}%, ${trY * 2.2}%) rotate(${trRotate}deg)`,
              width: `${trWidth}%`,
              height: `${trHeight}%`,
              borderRadius: `${trBorderRadius}px`,
            }}
          >
            {/* Background Graphic */}
            <img
              src={images.topRight}
              alt="Hero Quadrant Specimen"
              className="absolute inset-0 size-full object-cover opacity-50 filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 pointer-events-none" />

            {/* Micro Caption on Hero Card when small (p < 0.65) */}
            <div 
              className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between font-mono text-white transition-opacity duration-200"
              style={{ opacity: 1 - heroContentOpacity }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/20 text-white border border-white/30 uppercase">
                  {captions?.topRight?.tag || "04 — CONVERGENCE"}
                </span>
                <span className="text-[9px] text-zinc-300">HERO QUADRANT</span>
              </div>
              <div>
                <h4 className="editorial-headline text-xs sm:text-base font-black uppercase text-white truncate">
                  {captions?.topRight?.title || "CENTRAL BIS AUTHENTICITY EMBLEM"}
                </h4>
                <p className="text-[10px] text-zinc-300 truncate">
                  {captions?.topRight?.subtitle || "Keep scrolling to unveil the full verification matrix"}
                </p>
                <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between text-[9px] text-zinc-400">
                  <span>CENTRAL MIRROR</span>
                  <span className="text-emerald-400 font-bold">100% OPERATIONAL ✓</span>
                </div>
              </div>
            </div>

            {/* Fully Expanded Hero Verification Matrix (Revealed at p >= 0.65) */}
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-md p-4 sm:p-6 lg:p-8 flex flex-col justify-between text-white font-mono pointer-events-auto"
              style={{
                opacity: heroContentOpacity,
                transform: `scale(${heroContentScale})`,
                pointerEvents: p > 0.65 ? "auto" : "none",
              }}
            >
              {/* Expanded Banner Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-sm shadow-md">
                    BIS
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      BUREAU OF INDIAN STANDARDS // AUTHENTICITY NETWORK
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-emerald-400 font-mono">
                      NATIONAL GAZETTE REGULATORY MIRROR • LIVE CITIZEN AUDIT SUITE
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>100% OPERATIONAL TELEMETRY</span>
                </span>
              </div>

              {/* 3 Inspection Pillars inside Expanded Hero */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-auto py-2">
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3.5 space-y-1.5 hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                      01 — ISI MONOGRAM
                    </span>
                    <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">
                      SCHEME-I
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-black text-white">7-Digit CM/L Code Validation</p>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    Direct validation of factory premise, registered product category, and active expiry date in the Gazette.
                  </p>
                </div>

                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3.5 space-y-1.5 hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                      02 — GOLD HUID TRACEABILITY
                    </span>
                    <span className="text-[9px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.2 rounded">
                      IS 1417
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-black text-white">6-Character Micro Laser Etch</p>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    Trace exact fineness (22K916, 18K750) and official AHC centre registration number to prevent karatage fraud.
                  </p>
                </div>

                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3.5 space-y-1.5 hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                      03 — STATUTORY REMEDY
                    </span>
                    <span className="text-[9px] text-red-400 font-bold bg-red-500/10 px-1.5 py-0.2 rounded">
                      §16 & §29
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-black text-white">Section 15 & 29 Enforcement</p>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    Instant counterfeit violation forwarding to central enforcement officers with 24/7 National Consumer Helpline 1915.
                  </p>
                </div>
              </div>

              {/* Bottom Quick Links in Expanded Hero */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-zinc-800 text-xs">
                <div className="text-zinc-400">
                  <span className="text-white font-bold">Statutory Guarantee:</span> All citizen verification queries verified against official Gazette notifications.
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href="#verif-quick-tool"
                    className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors text-center cursor-pointer shadow-xs"
                  >
                    Proceed To Verification Matrix ↓
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================
            Bottom Live Telemetry Ribbon & Progress Stepper
            ======================================================== */}
        <div className="relative z-50 border-t border-zinc-800/80 pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px]">
          
          {/* Real-Time Telemetry Counters */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-zinc-400">
            <div>
              <span className="text-zinc-500 uppercase">ACTIVE CM/L:</span>{" "}
              <span className="font-bold text-white">45,000+</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase">AHC LABS:</span>{" "}
              <span className="font-bold text-white">1,650+</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase">QCO SCHEMES:</span>{" "}
              <span className="font-bold text-white">150+</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase">LATENCY:</span>{" "}
              <span className="font-bold text-emerald-400">&lt; 120ms</span>
            </div>
          </div>

          {/* Interactive Progress Indicator */}
          <div className="flex items-center space-x-2">
            <span className="text-zinc-500">CHOREOGRAPHY:</span>
            <span className="font-bold text-white min-w-[36px]">
              {Math.round(p * 100)}%
            </span>
            <div className="w-24 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-75"
                style={{ width: `${Math.round(p * 100)}%` }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
