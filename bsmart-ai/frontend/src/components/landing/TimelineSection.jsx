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

        {/* Timeline Container */}
        <div className="timeline-container relative pl-8 sm:pl-16 space-y-16 sm:space-y-20">
          {/* Vertical Track Line */}
          <div className="absolute left-3 sm:left-5 top-4 bottom-4 w-px bg-zinc-200" />
          
          {/* Active Animated Connecting Line */}
          <div className="timeline-progress-line absolute left-3 sm:left-5 top-4 bottom-4 w-px bg-black origin-top scale-y-0 will-change-transform" />

          {/* Timeline Nodes */}
          {steps.map((s, idx) => (
            <div key={s.num} className="timeline-step-item relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10">
              {/* Connecting Dot */}
              <div className="absolute -left-8 sm:-left-16 top-1.5 flex items-center justify-center">
                <div className="w-6 sm:w-10 h-6 sm:h-10 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-xs">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-black" />
                </div>
              </div>

              {/* Node Content */}
              <div className="sm:w-1/3">
                <span className="font-mono text-xs sm:text-sm tracking-widest text-zinc-400 block mb-1">
                  STEP {s.num}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                  {s.title}
                </h3>
              </div>

              <div className="sm:w-2/3">
                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
