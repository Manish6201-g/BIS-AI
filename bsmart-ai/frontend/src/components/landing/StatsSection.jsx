import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const StatsSection = () => {
  const sectionRef = useRef(null);

  const stats = [
    {
      num: "01",
      title: "AI ASSISTANCE",
      desc: "Understand complex Indian Standards using bilingual natural-language interaction and voice synthesis."
    },
    {
      num: "02",
      title: "STANDARDS DISCOVERY",
      desc: "Find relevant BIS standards, technical specifications, and laboratory test criteria in seconds."
    },
    {
      num: "03",
      title: "PRODUCT VERIFICATION",
      desc: "Verify 7-digit ISI CM/L licence numbers and decode 6-character laser-engraved gold HUID hallmarking."
    },
    {
      num: "04",
      title: "STATUTORY COMPLIANCE",
      desc: "Track mandatory Quality Control Orders (QCOs), enforcement timelines, and legal penalties."
    }
  ];

  useGSAP(() => {
    // Scroll entrance for title
    gsap.from('.stats-header', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      }
    });

    // Staggered scroll entrance for stat blocks
    gsap.from('.stat-block', {
      y: 60,
      opacity: 0,
      duration: 0.85,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top 75%',
        once: true,
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="bg-black text-white py-28 sm:py-36 px-6 sm:px-12 border-b border-zinc-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="stats-header max-w-3xl mb-16 sm:mb-24">
          <div className="font-mono text-xs sm:text-sm tracking-widest text-zinc-500 uppercase mb-3">
            BISmart AI / CAPABILITIES
          </div>
          <h2 className="editorial-headline text-4xl sm:text-6xl md:text-7xl text-white">
            AI-POWERED <br />
            <span className="text-zinc-400">STANDARDS.</span>
          </h2>
        </div>

        {/* 4 Stat Blocks Grid with Giant Numbers */}
        <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((st, i) => (
            <div key={i} className="stat-block border-t border-zinc-800 pt-8 space-y-4">
              <div className="font-mono text-5xl sm:text-6xl lg:text-7xl font-black text-zinc-500 hover:text-white transition-colors duration-300">
                {st.num}
              </div>
              <h3 className="text-base sm:text-lg font-black tracking-wide uppercase text-white">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
