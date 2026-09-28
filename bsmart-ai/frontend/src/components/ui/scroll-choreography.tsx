import React, { useRef, useState, useEffect } from "react";
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
  Maximize2
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

function interpolate(
  t: number,
  inputRange: number[],
  outputRange: string[]
): string {
  if (t <= inputRange[0]) return outputRange[0];
  if (t >= inputRange[inputRange.length - 1])
    return outputRange[outputRange.length - 1];

  for (let i = 0; i < inputRange.length - 1; i++) {
    const start = inputRange[i];
    const end = inputRange[i + 1];
    if (t >= start && t <= end) {
      const localT = (t - start) / (end - start);
      const startVal = parseFloat(outputRange[i]);
      const endVal = parseFloat(outputRange[i + 1]);
      const unit = outputRange[i].replace(/[-\d.]/g, "");
      return `${startVal + (endVal - startVal) * localT}${unit}`;
    }
  }
  return outputRange[outputRange.length - 1];
}

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
  subtitle = "Scroll through the 4 verification quadrants as statutory telemetry converges into the national central authenticity emblem."
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [smoothProgress, setSmoothProgress] = useState(0);

  const stiffness = 380;
  const dampingVal = 38;
  const mass = 1.0;

  useEffect(() => {
    let animationFrameId: number;
    let velocity = 0;
    let currentProgress = 0;
    let currentSmoothProgress = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollableHeight = rect.height - viewportH;

      if (scrollableHeight <= 0) {
        currentProgress = 0;
      } else {
        const scrolled = -rect.top;
        currentProgress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const loop = () => {
      const dt = 1 / 60;
      const displacement = currentProgress - currentSmoothProgress;
      const springForce = stiffness * displacement;
      const dampingForce = -dampingVal * velocity;
      const acceleration = (springForce + dampingForce) / mass;

      velocity += acceleration * dt;
      currentSmoothProgress += velocity * dt;

      setSmoothProgress(currentSmoothProgress);
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const sp = smoothProgress;

  // Responsive quadrant coordinates - tight, filled positioning
  const xLeft = "-23vw";
  const xRight = "23vw";
  const yTop = "-18vh";
  const yBottom = "18vh";

  // Top Left Style (Quadrant 1)
  const tlTransform = `translate(-50%, -50%) translate(${interpolate(
    sp,
    [0, 0.1, 0.45, 0.75, 1],
    [xLeft, xLeft, "0vw", "0vw", "0vw"]
  )}, ${interpolate(
    sp,
    [0, 0.1, 0.45, 0.75, 1],
    [yTop, yTop, "0vh", "0vh", "0vh"]
  )})`;
  const tlOpacity = interpolateNum(sp, [0.55, 0.72], [1, 0]);

  // Bottom Right Style (Quadrant 2)
  const brTransform = `translate(-50%, -50%) translate(${interpolate(
    sp,
    [0, 0.1, 0.45, 0.75, 1],
    [xRight, xRight, "0vw", "0vw", "0vw"]
  )}, ${interpolate(
    sp,
    [0, 0.1, 0.45, 0.75, 1],
    [yBottom, yBottom, "0vh", "0vh", "0vh"]
  )})`;
  const brOpacity = interpolateNum(sp, [0.55, 0.72], [1, 0]);

  // Bottom Left Style (Quadrant 3)
  const blTransform = `translate(-50%, -50%) translate(${interpolate(
    sp,
    [0, 0.1, 0.45, 0.75, 1],
    [xLeft, xLeft, "0vw", "0vw", "0vw"]
  )}, ${interpolate(
    sp,
    [0, 0.1, 0.45, 0.75, 1],
    [yBottom, yBottom, "0vh", "0vh", "0vh"]
  )})`;
  const blOpacity = interpolateNum(sp, [0.55, 0.72], [1, 0]);

  // Top Right Style (Quadrant 4 Hero - choreographs and expands to fill the stage)
  const trTransform = `translate(-50%, -50%) translate(${interpolate(
    sp,
    [0, 0.1, 0.45, 0.75, 1],
    [xRight, xRight, "0vw", "0vw", "0vw"]
  )}, ${interpolate(
    sp,
    [0, 0.1, 0.45, 0.75, 1],
    [yTop, yTop, "0vh", "0vh", "0vh"]
  )})`;

  const trWidth = interpolate(
    sp,
    [0.45, 0.75, 1],
    ["44vw", "88vw", "94vw"]
  );

  const trHeight = interpolate(
    sp,
    [0.45, 0.75, 1],
    ["32vh", "72vh", "78vh"]
  );

  const heroContentOpacity = interpolateNum(sp, [0.65, 0.85], [0, 1]);
  const heroContentScale = interpolateNum(sp, [0.65, 0.85], [0.95, 1]);

  const baseCardClasses =
    "absolute left-1/2 top-1/2 w-[88vw] sm:w-[44vw] h-[28vh] sm:h-[32vh] overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-300 bg-zinc-950 shadow-xl will-change-transform transition-shadow duration-300";

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[160vh] sm:h-[180vh] w-full border border-zinc-300 bg-white rounded-[32px] overflow-hidden shadow-xs", className)}
    >
      {/* Background Architectural Blueprint Matrix (Ensures NO empty blank space) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Technical Coordinate Markers */}
        <div className="absolute top-4 left-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
          CHOREO // VIEWPORT MATRIX [0,0]
        </div>
        <div className="absolute top-4 right-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
          GAZETTE MIRROR: ACTIVE // 100% GROUNDED
        </div>
        <div className="absolute bottom-4 left-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
          STATUTORY SECTION 16 SAFETY PIPELINE
        </div>
        <div className="absolute bottom-4 right-6 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
          FPS // 60 SPRING INTERPOLATION
        </div>

        {/* Center Crosshair Overlay */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dashed border-zinc-300" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-zinc-200" />
      </div>

      {/* Sticky Interactive Stage Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 pointer-events-none">
        
        {/* Header Bar */}
        <div className="relative z-50 text-center px-4 max-w-4xl mx-auto pointer-events-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[10px] sm:text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>{badge}</span>
          </div>

          <h3 className="editorial-headline text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-black">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-600 font-mono mt-1 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Real-Time Telemetry Counters Ribbon */}
          <div className="hidden sm:grid grid-cols-4 gap-2 max-w-2xl mx-auto mt-3 pt-3 border-t border-zinc-200 text-center font-mono">
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg py-1 px-2">
              <span className="text-xs font-black text-black block">45,000+</span>
              <span className="text-[9px] text-zinc-500 uppercase">Active CM/L</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg py-1 px-2">
              <span className="text-xs font-black text-black block">1,650+</span>
              <span className="text-[9px] text-zinc-500 uppercase">AHC Labs</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg py-1 px-2">
              <span className="text-xs font-black text-black block">150+</span>
              <span className="text-[9px] text-zinc-500 uppercase">QCO Schemes</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg py-1 px-2">
              <span className="text-xs font-black text-emerald-600 block">&lt; 120ms</span>
              <span className="text-[9px] text-zinc-500 uppercase">Live Latency</span>
            </div>
          </div>
        </div>

        {/* 4-Quadrant Stage Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          
          {/* Top Left: Quadrant 1 */}
          <div
            className={cn(baseCardClasses, "z-10")}
            style={{ transform: tlTransform, opacity: tlOpacity }}
          >
            <img
              src={images.topLeft}
              alt="Quadrant Top Left"
              className="size-full object-cover grayscale brightness-90 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 p-5 flex flex-col justify-between text-white font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                  {captions?.topLeft?.tag || "01 — PROOF TESTING"}
                </span>
                <span className="text-[10px] text-zinc-400 font-bold">IS 2347 COMPLIANT</span>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black uppercase text-white">
                  {captions?.topLeft?.title || "SCHEME-I FACTORY INSPECTION"}
                </h4>
                <p className="text-[11px] text-zinc-300 mt-0.5">
                  {captions?.topLeft?.subtitle || "Hydrostatic test bench & safety valve burst audit"}
                </p>
                <div className="mt-2 flex items-center space-x-2 text-[10px] text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mandatory Daily SIT Logbook Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right: Quadrant 2 */}
          <div
            className={cn(baseCardClasses, "z-20")}
            style={{ transform: brTransform, opacity: brOpacity }}
          >
            <img
              src={images.bottomRight}
              alt="Quadrant Bottom Right"
              className="size-full object-cover grayscale brightness-90 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 p-5 flex flex-col justify-between text-white font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                  {captions?.bottomRight?.tag || "02 — HALLMARKING"}
                </span>
                <span className="text-[10px] text-zinc-400 font-bold">22K 916 // 18K 750</span>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black uppercase text-white">
                  {captions?.bottomRight?.title || "6-CHAR LASER HUID ASSAY"}
                </h4>
                <p className="text-[11px] text-zinc-300 mt-0.5">
                  {captions?.bottomRight?.subtitle || "AHC verified gold fineness & laser traceability"}
                </p>
                <div className="mt-2 flex items-center space-x-2 text-[10px] text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Microscopic Laser Etch Registered in Central AHC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Left: Quadrant 3 */}
          <div
            className={cn(baseCardClasses, "z-30")}
            style={{ transform: blTransform, opacity: blOpacity }}
          >
            <img
              src={images.bottomLeft}
              alt="Quadrant Bottom Left"
              className="size-full object-cover grayscale brightness-90 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 p-5 flex flex-col justify-between text-white font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
                  {captions?.bottomLeft?.tag || "03 — GAZETTE REGISTRY"}
                </span>
                <span className="text-[10px] text-zinc-400 font-bold">SECTION 16 MANDATE</span>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black uppercase text-white">
                  {captions?.bottomLeft?.title || "STATUTORY QCO MANDATES"}
                </h4>
                <p className="text-[11px] text-zinc-300 mt-0.5">
                  {captions?.bottomLeft?.subtitle || "Cognizable consumer protection under Section 16"}
                </p>
                <div className="mt-2 flex items-center space-x-2 text-[10px] text-cyan-300">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Central DPIIT Gazette Orders Grounded</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right: Quadrant 4 (Hero - Choreographs & Expands to Full Screen) */}
          <div
            className={cn(
              baseCardClasses,
              "z-40 origin-center bg-zinc-950 border-2 border-black"
            )}
            style={{
              transform: trTransform,
              width: trWidth,
              height: trHeight,
            }}
          >
            <img
              src={images.topRight}
              alt="Hero Quadrant"
              className="size-full object-cover brightness-95 contrast-110"
            />

            {/* Micro Initial Caption (Visible when small) */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 p-5 flex flex-col justify-between text-white font-mono"
              style={{ opacity: 1 - heroContentOpacity }}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold text-white bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30 backdrop-blur-xs flex items-center gap-1.5">
                  <Maximize2 className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>{captions?.topRight?.tag || "04 — CONVERGENCE"}</span>
                </span>
                <span className="text-[10px] text-zinc-400">HERO EXPAND ↓</span>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black uppercase text-white">
                  {captions?.topRight?.title || "CENTRAL BIS AUTHENTICITY EMBLEM"}
                </h4>
                <p className="text-[11px] text-zinc-300">
                  {captions?.topRight?.subtitle || "Scroll down to converge quadrants into full verification mode"}
                </p>
              </div>
            </div>

            {/* Expanded Hero Experience Overlay (Revealed at scroll >= 0.65) */}
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-md p-6 sm:p-10 flex flex-col justify-between text-white font-mono pointer-events-auto"
              style={{
                opacity: heroContentOpacity,
                transform: `scale(${heroContentScale})`,
                pointerEvents: sp > 0.65 ? "auto" : "none",
              }}
            >
              {/* Top Banner inside Expanded Hero */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-sm shadow-md">
                    BIS
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      BUREAU OF INDIAN STANDARDS // AUTHENTICITY NETWORK
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-emerald-400 font-mono">
                      NATIONAL GAZETTE REGULATORY MIRROR • LIVE AUDIT TELEMETRY
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>100% OPERATIONAL TELEMETRY</span>
                </span>
              </div>

              {/* Center Inspection Matrix inside Expanded Hero */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 my-auto py-4">
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-2">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                    01 — ISI MONOGRAM
                  </span>
                  <p className="text-sm font-black text-white">7-Digit CM/L Code Validation</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Direct validation of factory premise, registered product category, and active expiry date in the Gazette.
                  </p>
                </div>

                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-2">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                    02 — GOLD HUID TRACEABILITY
                  </span>
                  <p className="text-sm font-black text-white">6-Character Micro Laser Etch</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Trace exact fineness (22K916, 18K750) and official AHC centre registration number to prevent karatage fraud.
                  </p>
                </div>

                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-2">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                    03 — STATUTORY REMEDY
                  </span>
                  <p className="text-sm font-black text-white">Section 15 & 29 Enforcement</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Instant counterfeit violation forwarding to central enforcement officers with 24/7 National Consumer Helpline 1915.
                  </p>
                </div>
              </div>

              {/* Bottom Quick Links in Expanded Hero */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-zinc-800">
                <div className="text-xs text-zinc-400">
                  <span className="text-white font-bold">Statutory Guarantee:</span> All data queries verified against official Gazette notifications.
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href="#verif-quick-tool"
                    className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors text-center cursor-pointer shadow-xs"
                  >
                    Proceed To Verification Matrix ↓
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Scroll Prompt Bottom Indicator */}
        <div className="relative z-50 text-center pointer-events-auto px-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[10px] uppercase tracking-widest text-zinc-600 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span>{sp < 0.5 ? "Scroll down to converge quadrants into full verification mode ↓" : "Quadrants converged into central inspection matrix"}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
