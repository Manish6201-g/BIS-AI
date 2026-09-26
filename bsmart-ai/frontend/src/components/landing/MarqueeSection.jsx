import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const MarqueeSection = () => {
  const marqueeContainerRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  useGSAP(() => {
    // Top track moves left on scroll
    gsap.to(track1Ref.current, {
      xPercent: -35,
      ease: 'none',
      scrollTrigger: {
        trigger: marqueeContainerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    // Bottom track moves right on scroll
    gsap.to(track2Ref.current, {
      xPercent: 35,
      ease: 'none',
      scrollTrigger: {
        trigger: marqueeContainerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  }, { scope: marqueeContainerRef });

  return (
    <section
      ref={marqueeContainerRef}
      data-theme="dark"
      className="bg-black text-white py-16 sm:py-24 border-b border-zinc-900 relative overflow-hidden select-none space-y-6"
    >
      {/* Track 1: Leftward Scrub */}
      <div className="flex w-full whitespace-nowrap overflow-hidden">
        <div
          ref={track1Ref}
          className="flex flex-shrink-0 items-center text-5xl sm:text-7xl md:text-8xl lg:text-[8vw] font-black tracking-tighter uppercase will-change-transform"
        >
          <span className="text-white mx-6 sm:mx-8">SMART STANDARDS</span>
          <span className="text-zinc-600 mx-3">—</span>
          <span className="text-outline-light mx-6 sm:mx-8 hover:text-white transition-colors duration-300">
            SMARTER DECISIONS
          </span>
          <span className="text-zinc-600 mx-3">—</span>
          <span className="text-white mx-6 sm:mx-8">SMARTER INDIA</span>
          <span className="text-zinc-600 mx-3">—</span>
          <span className="text-outline-light mx-6 sm:mx-8 hover:text-white transition-colors duration-300">
            STATUTORY GROUNDING
          </span>
          <span className="text-zinc-600 mx-3">—</span>
          <span className="text-white mx-6 sm:mx-8">BISmart AI</span>
        </div>
      </div>

      {/* Track 2: Rightward Scrub */}
      <div className="flex w-full whitespace-nowrap overflow-hidden">
        <div
          ref={track2Ref}
          className="flex flex-shrink-0 items-center text-3xl sm:text-5xl md:text-6xl lg:text-[5vw] font-bold tracking-tight uppercase text-zinc-500 will-change-transform"
          style={{ transform: 'translateX(-25%)' }}
        >
          <span className="mx-6 text-zinc-400">IS 2347 PRESSURE COOKER</span>
          <span className="text-emerald-500 mx-2">•</span>
          <span className="mx-6 text-zinc-300">DPIIT MANDATORY QCO</span>
          <span className="text-emerald-500 mx-2">•</span>
          <span className="mx-6 text-zinc-400">7-DIGIT CM/L VERIFICATION</span>
          <span className="text-emerald-500 mx-2">•</span>
          <span className="mx-6 text-zinc-300">6-CHARACTER HUID HALLMARKING</span>
          <span className="text-emerald-500 mx-2">•</span>
          <span className="mx-6 text-zinc-400">SCHEME-I FORM-V AUDIT</span>
        </div>
      </div>
    </section>
  );
};
