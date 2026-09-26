import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const TimelineSection = () => {
  const timelineRef = useRef(null);

  const steps = [
    {
      num: "01",
      title: "DISCOVER",
      desc: "Explore 20,000+ Indian Standards (IS Codes) and mandatory Quality Control Orders (QCOs) for any commercial product category."
    },
    {
      num: "02",
      title: "ASK",
      desc: "Interact with the intelligent assistant using bilingual voice or text in 11 Indian languages (Hindi, English, Tamil, Punjabi, etc.)."
    },
    {
      num: "03",
      title: "UNDERSTAND",
      desc: "Receive exact clause-level legal grounding with drawer previews of authentic gazetted specifications and laboratory test parameters."
    },
    {
      num: "04",
      title: "VERIFY",
      desc: "Validate 7-digit ISI CM/L licence numbers and decode 6-character laser-engraved gold HUID hallmarking codes instantly."
    }
  ];

  useGSAP(() => {
    // 1. Header entrance
    gsap.from('.timeline-header', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top 80%',
        once: true,
      }
    });

    // 2. Animated vertical connecting line scrubbed by scroll
    gsap.to('.timeline-progress-line', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 0.5,
      }
    });

    // 3. Staggered node entrance
    gsap.from('.timeline-step-item', {
      y: 50,
      opacity: 0,
      duration: 0.75,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 75%',
        once: true,
      }
    });
  }, { scope: timelineRef });

  return (
    <section
      ref={timelineRef}
      data-theme="light"
      className="bg-tech-dotted-white text-black py-28 sm:py-36 px-6 sm:px-12 border-b border-zinc-200 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="timeline-header max-w-3xl mb-16 sm:mb-24 text-center sm:text-left">
          <div className="font-mono text-xs sm:text-sm tracking-widest text-zinc-500 uppercase mb-3">
            03 — BISmart AI WORKFLOW
          </div>
          <h2 className="editorial-headline text-4xl sm:text-6xl md:text-7xl text-black">
            HOW BISmart AI <br />
            <span className="text-zinc-400">WORKS.</span>
          </h2>
        </div>

        {/* CodeZen Alternating Center-Line Timeline Container */}
        <div className="relative mx-auto max-w-5xl space-y-12 md:space-y-16 pt-8 pb-12 before:absolute before:inset-y-0 before:left-[15px] md:before:left-1/2 before:w-px before:bg-gradient-to-b before:from-transparent before:via-black/20 before:to-transparent">
          {/* Active Animated Connecting Line */}
          <div className="timeline-progress-line absolute left-[15px] md:left-1/2 top-4 bottom-4 w-px bg-black origin-top scale-y-0 will-change-transform z-0 -translate-x-1/2" />

          {/* Timeline Nodes */}
          {steps.map((s, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={s.num} 
                className="timeline-step-item relative flex flex-col md:flex-row md:justify-between group cursor-default"
              >
                {/* Left Side (Desktop): Step Number / Tag on Even, Content on Odd */}
                <div className={`hidden md:flex w-[calc(50%-3rem)] ${isEven ? 'justify-end text-right' : 'justify-start text-left'} pt-1`}>
                  {isEven ? (
                    <div className="space-y-1">
                      <span className="font-mono text-xs font-black text-black/40 uppercase tracking-[0.3em] group-hover:text-black transition-colors duration-300">
                        PHASE {s.num}
                      </span>
                      <h4 className="font-sans text-xl font-black text-[#050505] uppercase tracking-tight group-hover:-translate-x-1 transition-transform duration-300">
                        {s.title}
                      </h4>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal max-w-md group-hover:-translate-x-1 transition-transform duration-300">
                      {s.desc}
                    </p>
                  )}
                </div>

                {/* Center Magnetic Circle Node */}
                <div className="absolute left-[15px] md:left-1/2 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-black/20 flex items-center justify-center group-hover:scale-125 group-hover:border-black group-hover:shadow-md transition-all duration-300 z-10">
                  <span className="w-2 h-2 rounded-full bg-black/40 group-hover:bg-black transition-colors duration-300" />
                </div>

                {/* Right Side (Desktop & Mobile): Content on Even, Step Number on Odd */}
                <div className={`w-full md:w-[calc(50%-3rem)] pl-12 md:pl-0 flex flex-col items-start ${!isEven ? 'md:items-start text-left' : 'text-left'} gap-2`}>
                  {/* Mobile Step Badge */}
                  <span className="md:hidden font-mono text-[10px] font-black text-black/40 uppercase tracking-[0.25em]">
                    PHASE {s.num} — {s.title}
                  </span>

                  {isEven ? (
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal max-w-md group-hover:translate-x-1 transition-transform duration-300">
                      {s.desc}
                    </p>
                  ) : (
                    <div className="space-y-1">
                      <span className="hidden md:block font-mono text-xs font-black text-black/40 uppercase tracking-[0.3em] group-hover:text-black transition-colors duration-300">
                        PHASE {s.num}
                      </span>
                      <h4 className="hidden md:block font-sans text-xl font-black text-[#050505] uppercase tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                        {s.title}
                      </h4>
                      <p className="md:hidden text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal max-w-md">
                        {s.desc}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
