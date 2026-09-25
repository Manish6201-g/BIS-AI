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
      {/* Huge Faint Background Typography */}
      <div 
        className="hero-giant-bg giant-bg-text absolute left-6 bottom-16 text-[18vw] text-zinc-950 opacity-[0.06] select-none pointer-events-none"
        aria-hidden="true"
      >
        BISmart
      </div>

      {/* Top Label */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="hero-label inline-flex items-center space-x-3 text-xs sm:text-sm font-mono tracking-widest text-zinc-500 uppercase pb-6">
          <span className="w-2 h-2 rounded-full bg-black" />
          <span>01 — WHAT IS BISmart AI</span>
        </div>

        {/* Oversized Editorial Headline */}
        <div className="overflow-hidden mt-2">
          <h1 className="editorial-headline text-5xl sm:text-7xl md:text-8xl lg:text-[7.2vw] text-black">
            <span className="inline-block hero-word mr-3 sm:mr-6">SMARTER</span>
            <span className="inline-block hero-word mr-3 sm:mr-6">ACCESS</span>
            <span className="inline-block hero-word mr-3 sm:mr-6 text-zinc-800">TO</span>
            <br className="hidden sm:inline" />
            <span className="inline-block hero-word mr-3 sm:mr-6 text-zinc-400">INDIAN</span>
            <span className="inline-block hero-word">STANDARDS.</span>
          </h1>
        </div>

        {/* Description */}
        <div className="mt-8 sm:mt-12 max-w-2xl">
          <p className="hero-desc text-base sm:text-xl text-zinc-600 font-normal leading-relaxed">
            BISmart AI brings artificial intelligence, standards discovery, product verification, 
            and official Bureau of Indian Standards (BIS) gazette intelligence together into one unified platform.
          </p>
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
              className="hero-cta-btn inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200"
            >
              <span>Ask AI Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/matcher"
              className="hero-cta-btn inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-zinc-300 bg-white text-black hover:border-black text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200"
            >
              <span>Find Standard</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
