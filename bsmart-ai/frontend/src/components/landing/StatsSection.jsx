import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const StatsSection = () => {
  const sectionRef = useRef(null);

  const stats = [
    {
      num: "20,000+",
      subNum: "01",
      title: "STANDARDS INDEXED",
      desc: "Comprehensive database covering technical specifications, testing thresholds, and gazette notifications across all industries.",
      tag: "IS CODES SPECIFICATIONS"
    },
    {
      num: "100%",
      subNum: "02",
      title: "GROUNDING ACCURACY",
      desc: "Every AI response is mapped to specific verified legal clauses with real-time drawer inspection. Zero unverified assertions.",
      tag: "ANTI-HALLUCINATION RAG"
    },
    {
      num: "150+",
      subNum: "03",
      title: "MANDATORY QCOS",
      desc: "Direct monitoring of DPIIT Quality Control Orders with enforcement calendars, manufacturing scope, and legal compliance mandates.",
      tag: "STATUTORY ENFORCEMENT"
    },
    {
      num: "11",
      subNum: "04",
      title: "INDIAN LANGUAGES",
      desc: "Bhashini-powered speech-to-text and multilingual neural translation enabling voice-driven queries in regional languages.",
      tag: "BHASHINI AI VOICE & TEXT"
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
      y: 50,
      opacity: 0,
      duration: 0.8,
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
      className="bg-black text-white py-24 sm:py-32 px-6 sm:px-12 border-b border-zinc-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="stats-header max-w-3xl mb-16 sm:mb-20">
          <div className="font-mono text-xs sm:text-sm tracking-widest text-zinc-500 uppercase mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>BISmart AI / ECOSYSTEM SCALE</span>
          </div>
          <h2 className="editorial-headline text-4xl sm:text-6xl md:text-7xl text-white">
            NATIONAL <br />
            <span className="text-zinc-400">BENCHMARKS.</span>
          </h2>
        </div>

        {/* 4 Stat Blocks Grid with Giant Numbers */}
        <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((st, i) => (
            <div 
              key={i} 
              className="stat-block bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                    METRIC {st.subNum}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-full uppercase">
                    ACTIVE
                  </span>
                </div>

                <div className="font-mono text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                  {st.num}
                </div>

                <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-200">
                  {st.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900 font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                {st.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
