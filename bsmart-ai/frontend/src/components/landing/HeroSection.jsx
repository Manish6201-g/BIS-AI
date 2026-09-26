import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    // 1. Page Load Intro Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl
      .from('.hero-label', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
      })
      .from('.hero-word', {
        y: '100%',
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
      }, '-=0.4')
      .from('.hero-desc', {
        y: 25,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5')
      .from('.hero-divider-line', {
        scaleX: 0,
        duration: 1.1,
        ease: 'power3.inOut',
        transformOrigin: 'left center',
      }, '-=0.6')
      .from('.hero-sub-bar', {
        y: 15,
        opacity: 0,
        duration: 0.6,
      }, '-=0.5')
      .from('.hero-cta-btn', {
        scale: 0.92,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      }, '-=0.4');

    // 2. Giant background wordmark scroll scrub
    gsap.to('.hero-giant-bg', {
      x: -120,
      opacity: 0.04,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      }
    });

  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      data-theme="light"
      className="bg-tech-dotted-white text-black min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 relative overflow-hidden border-b border-zinc-200"
    >
      {/* Radial Spotlight Glow & Huge Faint Background Typography */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_60%_35%,rgba(16,185,129,0.08),transparent_60%)]" />
      <div 
        className="hero-giant-bg giant-bg-text absolute left-6 bottom-16 text-[18vw] text-zinc-950 opacity-[0.05] select-none pointer-events-none"
        aria-hidden="true"
      >
        BISmart
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headlines & CTAs */}
        <div className="lg:col-span-8 space-y-6 text-left">
          {/* Top Label & Live Status Badge */}
          <div className="hero-label flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-zinc-600 uppercase bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              <span>01 — WHAT IS BISmart AI</span>
            </div>
            <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>SIH26107 REGULATORY PLATFORM</span>
            </div>
          </div>

          {/* Oversized Editorial Headline */}
          <div className="overflow-hidden pt-2">
            <h1 className="editorial-headline text-5xl sm:text-7xl md:text-8xl lg:text-[6.8vw] text-black">
              <span className="inline-block hero-word mr-3 sm:mr-6">SMARTER</span>
              <span className="inline-block hero-word mr-3 sm:mr-6">ACCESS</span>
              <span className="inline-block hero-word mr-3 sm:mr-6 text-zinc-800">TO</span>
              <br className="hidden sm:inline" />
              <span className="inline-block hero-word mr-3 sm:mr-6 text-zinc-400">INDIAN</span>
              <span className="inline-block hero-word">STANDARDS.</span>
            </h1>
          </div>

          {/* Description */}
          <div className="max-w-2xl pt-2">
            <p className="hero-desc text-base sm:text-xl text-zinc-600 font-normal leading-relaxed">
              BISmart AI brings artificial intelligence, standards discovery, product verification, 
              and official Bureau of Indian Standards (BIS) gazette intelligence together into one unified platform.
            </p>
          </div>
        </div>

        {/* Right Column: CodeZen-Inspired Interactive 3D Sonar Radar Widget (Desktop) */}
        <div className="hidden lg:flex lg:col-span-4 justify-center items-center">
          <div className="relative w-72 h-72 xl:w-80 xl:h-80 flex items-center justify-center">
            {/* Concentric Pulsing Radar Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-zinc-300 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-zinc-200" />
            <div className="absolute inset-14 rounded-full border border-dashed border-emerald-400/30 animate-[spin_20s_linear_infinite_reverse]" />
            <div className="absolute inset-24 rounded-full border border-zinc-200" />

            {/* Radar Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-200/80" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-zinc-200/80" />

            {/* Radar Rotating Sweep Line */}
            <div 
              className="absolute inset-0 rounded-full origin-center animate-[spin_4s_linear_infinite]"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg 315deg, rgba(16,185,129,0.2) 360deg)',
              }}
            />

            {/* Central Core with Status Ping */}
            <div className="relative z-10 w-24 h-24 rounded-2xl bg-white border border-zinc-200 shadow-xl flex flex-col items-center justify-center p-2 text-center">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">GAZETTE</span>
              <span className="text-sm font-black text-black">ONLINE</span>
              <span className="inline-flex items-center space-x-1 mt-1 text-[9px] font-mono text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>20K+ IS</span>
              </span>
            </div>

            {/* Floating Orbiting Data Chips */}
            <div className="absolute -top-3 left-6 bg-white border border-zinc-200 shadow-sm rounded-full px-2.5 py-1 text-[10px] font-mono font-bold text-zinc-700">
              QCO: ACTIVE
            </div>
            <div className="absolute -bottom-2 right-4 bg-white border border-zinc-200 shadow-sm rounded-full px-2.5 py-1 text-[10px] font-mono font-bold text-zinc-700">
              11 LANGUAGES
            </div>
          </div>
        </div>
      </div>

      {/* Expanding Hairline & Bottom Row */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-12 sm:pt-16">
        <div className="hero-divider-line w-full h-px bg-zinc-300" />

        <div className="hero-sub-bar pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="font-mono text-xs sm:text-sm tracking-[0.25em] text-zinc-500 uppercase">
            DISCOVER · VERIFY · UNDERSTAND
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/assistant"
              className="hero-cta-btn inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 group"
            >
              <span>Ask AI Assistant</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/matcher"
              className="hero-cta-btn inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-zinc-300 bg-white text-black hover:border-black text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 group"
            >
              <span>Find Standard</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
