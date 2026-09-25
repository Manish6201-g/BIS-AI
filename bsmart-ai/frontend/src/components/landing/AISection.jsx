import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AISection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.ai-headline', {
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

    gsap.from('.ai-dialogue-user', {
      x: -30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.ai-dialogue-box',
        start: 'top 75%',
        once: true,
      }
    });

    gsap.from('.ai-dialogue-response', {
      x: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.ai-dialogue-box',
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
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="ai-headline max-w-4xl mb-16 sm:mb-24">
          <div className="font-mono text-xs sm:text-sm tracking-widest text-zinc-500 uppercase mb-3">
            04 — ANTI-HALLUCINATION RETRIEVAL
          </div>
          <h2 className="editorial-headline text-4xl sm:text-6xl md:text-8xl text-white">
            INTELLIGENCE <br />
            FOR <span className="text-zinc-500">INDIAN</span> <br />
            STANDARDS.
          </h2>
          <p className="text-base sm:text-xl text-zinc-400 font-normal leading-relaxed mt-6 max-w-2xl">
            Our hybrid semantic vector retrieval searches only authentic Bureau of Indian Standards gazette notifications and Quality Control Orders. 
            Assertions lacking legal basis are strictly rejected.
          </p>
        </div>

        {/* Minimal High-End Editorial Dialogue Visual */}
        <div className="ai-dialogue-box bg-zinc-950 border border-zinc-800 rounded-[32px] p-6 sm:p-12 space-y-8 shadow-2xl">
          {/* User Query */}
          <div className="ai-dialogue-user max-w-2xl border-l-2 border-zinc-700 pl-6 py-1 space-y-2">
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
              USER INQUIRY
            </span>
            <p className="text-lg sm:text-2xl font-bold text-white tracking-tight">
              "What mandatory BIS standards and QCO orders apply to domestic pressure cookers?"
            </p>
          </div>

          {/* AI Response Card */}
          <div className="ai-dialogue-response max-w-3xl bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  BISmart AI GROUNDED ENGINE
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full uppercase">
                100% VERIFIED CITATION
              </span>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              Under <strong>IS 2347:2017</strong>, all domestic pressure cookers sold or imported in India require 
              mandatory <strong>Scheme-I ISI mark certification</strong>. This was made statutorily enforceable under the 
              <strong> Domestic Pressure Cooker (Quality Control) Order, 2020</strong> issued by DPIIT.
            </p>

            {/* Interactive Clause Citation Drawer Simulation */}
            <div className="bg-black/90 border border-cyan-500/30 rounded-xl p-4 font-mono text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-cyan-300">
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>[1] IS 2347:2017 Clause 5.1 — Thermal Safety Relief Mechanism</span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase">
                GAZETTE NOTIFICATION STATUTORY RECORD
              </span>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="font-mono text-xs text-zinc-500 tracking-wider">
              MULTILINGUAL BHASHINI VOICE & TEXT SUPPORT READY
            </div>
            <Link
              to="/assistant"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors self-start sm:self-auto"
            >
              <span>Ask Your Own Query</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
