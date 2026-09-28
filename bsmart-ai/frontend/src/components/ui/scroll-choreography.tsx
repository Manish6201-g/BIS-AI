import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ScrollChoreographyImages {
  topLeft: string;
  topRight: string; // The Hero quadrant image that expands to fill the viewport
  bottomLeft: string;
  bottomRight: string;
}

export interface ScrollChoreographyCaptions {
  topLeft?: { tag?: string; title: string; subtitle?: string };
  topRight?: { tag?: string; title: string; subtitle?: string };
  bottomLeft?: { tag?: string; title: string; subtitle?: string };
  bottomRight?: { tag?: string; title: string; subtitle?: string };
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
  badge = "DYNAMIC CHOREOGRAPHY",
  title = "CHOREOGRAPHED REGULATORY PROOFS",
  subtitle = "Scroll through the 4 verification quadrants as statutory telemetry converges into full inspection mode."
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);

  const stiffness = 320;
  const dampingVal = 42;
  const mass = 1.1;

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
      setProgress(currentProgress);
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

  // Quadrant coordinates (standard desktop & mobile responsive dimensions)
  const xLeft = "-22vw";
  const xRight = "22vw";
  const yTop = "-14vh";
  const yBottom = "14vh";

  // Top Left Style
  const tlTransform = `translate(-50%, -50%) translate(${interpolate(
    sp,
    [0, 0.3, 0.35, 0.65, 1],
    [xLeft, xLeft, xLeft, "0vw", "0vw"]
  )}, ${interpolate(
    sp,
    [0, 0.3, 0.35, 0.65, 1],
    [yTop, yBottom, yBottom, "0vh", "0vh"]
  )})`;
  const tlOpacity = interpolateNum(sp, [0.75, 0.85], [1, 0]);

  // Bottom Right Style
  const brTransform = `translate(-50%, -50%) translate(${interpolate(
    sp,
    [0, 0.3, 0.35, 0.65, 1],
    [xRight, xRight, xRight, "0vw", "0vw"]
  )}, ${interpolate(
    sp,
    [0, 0.3, 0.35, 0.65, 1],
    [yBottom, yTop, yTop, "0vh", "0vh"]
  )})`;
  const brOpacity = interpolateNum(sp, [0.75, 0.85], [1, 0]);

  // Bottom Left Style
  const blTransform = `translate(-50%, -50%) translate(${interpolate(
    sp,
    [0, 0.3, 0.35, 0.65, 1],
    [xLeft, xLeft, xLeft, "0vw", "0vw"]
  )}, ${interpolate(
    sp,
    [0, 0.3, 0.35, 0.65, 1],
    [yBottom, yBottom, yBottom, "0vh", "0vh"]
  )})`;
  const blOpacity = interpolateNum(sp, [0.75, 0.85], [1, 0]);

  // Top Right Style (HERO Image that expands across the entire viewport)
  const trTransform = `translate(-50%, -50%) translate(${interpolate(
    sp,
    [0, 0.3, 0.35, 0.65, 1],
    [xRight, xRight, xRight, "0vw", "0vw"]
  )}, ${interpolate(
    sp,
    [0, 0.3, 0.35, 0.65, 1],
    [yTop, yTop, yTop, "0vh", "0vh"]
  )})`;

  const trWidth = interpolate(
    sp,
    [0.65, 0.7, 0.9, 1],
    ["38vw", "38vw", "96vw", "96vw"]
  );

  const trHeight = interpolate(
    sp,
    [0.65, 0.7, 0.9, 1],
    ["26vh", "26vh", "84vh", "84vh"]
  );

  const trBorderRadius = interpolate(
    sp,
    [0.65, 0.9],
    ["24px", "28px"]
  );

  // Overlay text fade-in as Hero expands
  const heroContentOpacity = interpolateNum(sp, [0.75, 0.92], [0, 1]);
  const heroContentScale = interpolateNum(sp, [0.75, 0.92], [0.92, 1]);

  const baseImageClasses =
    "absolute left-1/2 top-1/2 w-[85vw] sm:w-[38vw] h-[22vh] sm:h-[26vh] overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-300 bg-zinc-950 shadow-2xl will-change-transform transition-shadow duration-300";

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[280vh] sm:h-[300vh] w-full", className)}
    >
      {/* Sticky Fullscreen Chamber */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-10 pointer-events-none">
        
        {/* Floating Choreography Header */}
        <div className="relative z-50 text-center px-4 max-w-3xl mx-auto pointer-events-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[10px] sm:text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>{badge}</span>
          </div>
          <h3 className="editorial-headline text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-black">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 font-mono mt-1 max-w-xl mx-auto">
            {subtitle}
          </p>

          {/* Progress Indicator Bar */}
          <div className="w-36 sm:w-48 mx-auto bg-zinc-200 h-1.5 rounded-full overflow-hidden mt-3 border border-zinc-300">
            <div 
              className="bg-black h-full rounded-full transition-all duration-75"
              style={{ width: `${Math.round(Math.min(100, Math.max(0, sp * 100)))}%` }}
            />
          </div>
        </div>

        {/* 4-Quadrant Stage Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          
          {/* Top Left: Quadrant 1 */}
          <div
            className={cn(baseImageClasses, "z-10")}
            style={{ transform: tlTransform, opacity: tlOpacity }}
          >
            <img
              src={images.topLeft}
              alt="Quadrant Top Left"
              className="size-full object-cover grayscale brightness-90 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white font-mono">
              <span className="text-[10px] uppercase font-bold text-emerald-400">
                {captions?.topLeft?.tag || "01 — INSPECTION"}
              </span>
              <h4 className="text-xs sm:text-sm font-black uppercase">
                {captions?.topLeft?.title || "LABORATORY STRENGTH AUDIT"}
              </h4>
              <p className="text-[10px] text-zinc-300 hidden sm:block">
                {captions?.topLeft?.subtitle || "Hydrostatic & Burst Proof Test"}
              </p>
            </div>
          </div>

          {/* Bottom Right: Quadrant 2 */}
          <div
            className={cn(baseImageClasses, "z-20")}
            style={{ transform: brTransform, opacity: brOpacity }}
          >
            <img
              src={images.bottomRight}
              alt="Quadrant Bottom Right"
              className="size-full object-cover grayscale brightness-90 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white font-mono">
              <span className="text-[10px] uppercase font-bold text-amber-400">
                {captions?.bottomRight?.tag || "02 — HALLMARKING"}
              </span>
              <h4 className="text-xs sm:text-sm font-black uppercase">
                {captions?.bottomRight?.title || "6-CHAR LASER HUID ASSAY"}
              </h4>
              <p className="text-[10px] text-zinc-300 hidden sm:block">
                {captions?.bottomRight?.subtitle || "AHC Verified Fineness Registry"}
              </p>
            </div>
          </div>

          {/* Bottom Left: Quadrant 3 */}
          <div
            className={cn(baseImageClasses, "z-30")}
            style={{ transform: blTransform, opacity: blOpacity }}
          >
            <img
              src={images.bottomLeft}
              alt="Quadrant Bottom Left"
              className="size-full object-cover grayscale brightness-90 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white font-mono">
              <span className="text-[10px] uppercase font-bold text-cyan-400">
                {captions?.bottomLeft?.tag || "03 — COMPLIANCE"}
              </span>
              <h4 className="text-xs sm:text-sm font-black uppercase">
                {captions?.bottomLeft?.title || "QCO GAZETTE ENFORCEMENT"}
              </h4>
              <p className="text-[10px] text-zinc-300 hidden sm:block">
                {captions?.bottomLeft?.subtitle || "Mandatory ISI Scheme-I Orders"}
              </p>
            </div>
          </div>

          {/* Top Right: Quadrant 4 (Hero - Choreographs & Expands to Full Screen) */}
          <div
            className={cn(
              baseImageClasses,
              "z-40 origin-center bg-zinc-950 border-2 border-black"
            )}
            style={{
              transform: trTransform,
              width: trWidth,
              height: trHeight,
              borderRadius: trBorderRadius,
            }}
          >
            <img
              src={images.topRight}
              alt="Hero Quadrant"
              className="size-full object-cover brightness-95 contrast-110"
            />

            {/* Micro Initial Caption */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 p-6 flex flex-col justify-between text-white font-mono"
              style={{ opacity: 1 - heroContentOpacity }}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold text-white bg-white/20 px-2 py-0.5 rounded-full border border-white/30 backdrop-blur-xs">
                  {captions?.topRight?.tag || "04 — CONVERGENCE"}
                </span>
                <span className="text-[10px] text-zinc-400">HERO QUADRANT</span>
              </div>
              <div>
                <h4 className="text-sm sm:text-lg font-black uppercase text-white">
                  {captions?.topRight?.title || "NATIONAL CERTIFICATION EMBLEM"}
                </h4>
                <p className="text-[11px] text-zinc-300">
                  {captions?.topRight?.subtitle || "Keep scrolling to unveil the full verification matrix"}
                </p>
              </div>
            </div>

            {/* Expanded Hero Experience Overlay (Revealed at scroll >= 0.75) */}
            <div
              className="absolute inset-0 bg-black/75 backdrop-blur-md p-6 sm:p-12 flex flex-col justify-between text-white font-mono pointer-events-auto"
              style={{
                opacity: heroContentOpacity,
                transform: `scale(${heroContentScale})`,
                pointerEvents: sp > 0.8 ? "auto" : "none",
              }}
            >
              {/* Top Banner inside Expanded Hero */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-700/80 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-sm">
                    BIS
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      NATIONAL BUREAU OF INDIAN STANDARDS
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono">
                      AUTHENTICATED GAZETTE VERIFICATION NETWORK
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>100% OPERATIONAL TELEMETRY</span>
                  </span>
                </div>
              </div>

              {/* Center Inspection Matrix inside Expanded Hero */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-auto py-6">
                <div className="bg-zinc-900/90 border border-zinc-700 rounded-2xl p-5 space-y-2">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                    01 — ISI MONOGRAM
                  </span>
                  <p className="text-sm font-black text-white">7-Digit CM/L Code Validation</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Direct validation of factory location, registered product category, and active expiry date in the Gazette.
                  </p>
                </div>

                <div className="bg-zinc-900/90 border border-zinc-700 rounded-2xl p-5 space-y-2">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                    02 — GOLD HUID TRACEABILITY
                  </span>
                  <p className="text-sm font-black text-white">6-Character Micro Laser Etch</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Trace exact fineness (22K916, 18K750) and official AHC centre registration number to prevent karatage fraud.
                  </p>
                </div>

                <div className="bg-zinc-900/90 border border-zinc-700 rounded-2xl p-5 space-y-2">
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
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-zinc-700/80">
                <div className="text-xs text-zinc-400">
                  <span className="text-white font-bold">Statutory Guarantee:</span> All data queries verified against official Gazette notifications.
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href="#verif-quick-tool"
                    className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors text-center"
                  >
                    Proceed To Verification Matrix ↓
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Scroll Prompt Bottom Indicator */}
        <div className="relative z-50 text-center pointer-events-auto">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 bg-white/80 px-3 py-1 rounded-full border border-zinc-300 backdrop-blur-xs">
            {sp < 0.65 ? "Scroll down to converge quadrants ↓" : "Choreography expanded to full inspection view"}
          </span>
        </div>

      </div>
    </div>
  );
};
