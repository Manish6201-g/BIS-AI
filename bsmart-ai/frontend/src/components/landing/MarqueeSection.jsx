import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const MarqueeSection = () => {
  const marqueeContainerRef = useRef(null);
  const marqueeTextRef = useRef(null);

  useGSAP(() => {
    // Horizontal scroll scrub tied to viewport scroll
    gsap.to(marqueeTextRef.current, {
      xPercent: -45,
      ease: 'none',
      scrollTrigger: {
        trigger: marqueeContainerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
  }, { scope: marqueeContainerRef });

  return (
    <section
      ref={marqueeContainerRef}
      data-theme="dark"
      className="bg-black text-white py-24 sm:py-36 border-b border-zinc-900 relative overflow-hidden select-none"
    >
      <div className="flex w-full whitespace-nowrap">
        <div
          ref={marqueeTextRef}
          className="flex flex-shrink-0 items-center text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-black tracking-tighter uppercase will-change-transform"
        >
          <span className="text-white mx-8">SMART STANDARDS</span>
          <span className="text-zinc-600 mx-4">—</span>
          <span className="text-outline-light mx-8 hover:text-white transition-colors duration-300">
            SMARTER DECISIONS
          </span>
          <span className="text-zinc-600 mx-4">—</span>
          <span className="text-white mx-8">SMARTER INDIA</span>
          <span className="text-zinc-600 mx-4">—</span>
          <span className="text-outline-light mx-8 hover:text-white transition-colors duration-300">
            STATUTORY GROUNDING
          </span>
          <span className="text-zinc-600 mx-4">—</span>
          <span className="text-white mx-8">BISMART AI</span>
        </div>
      </div>
    </section>
  );
};
