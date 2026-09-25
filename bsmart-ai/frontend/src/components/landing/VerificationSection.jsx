import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const VerificationSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.verif-header', {
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

    gsap.from('.verif-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.verif-grid',
        start: 'top 75%',
        once: true,
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="bg-tech-dotted-white text-black py-28 sm:py-36 px-6 sm:px-12 border-b border-zinc-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header with Giant Typography */}
        <div className="verif-header max-w-4xl mb-16 sm:mb-24">
          <div className="font-mono text-xs sm:text-sm tracking-widest text-zinc-500 uppercase mb-3">
            05 — CITIZEN CONSUMER SAFETY
          </div>
          <h2 className="editorial-headline text-4xl sm:text-6xl md:text-8xl text-black">
            UNDERSTAND <br />
            WHAT YOU <br />
            <span className="text-zinc-400">ARE BUYING.</span>
          </h2>
          <p className="text-base sm:text-xl text-zinc-600 font-normal leading-relaxed mt-6 max-w-2xl">
            Protect your family against substandard, counterfeit goods. BISmart AI provides instant statutory verification 
            of manufacturer licences and gold purity hallmarking.
          </p>
        </div>

        {/* Large Editorial Cards Grid */}
        <div className="verif-grid grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Card 1: ISI CM/L Verification */}
          <div className="verif-card bg-white border border-zinc-300 rounded-[32px] p-8 sm:p-12 flex flex-col justify-between shadow-xs hover:border-black transition-colors duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-6 h-6 text-black" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    SCHEME-I AUTHENTICITY
                  </span>
                </div>
                <span className="font-mono text-xs text-zinc-400">7-DIGIT CM/L</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                ISI MARK LICENCE VERIFIER
              </h3>

              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                Every genuine ISI marked item—from packaged drinking water to steel rods and helmets—must display a 
                unique 7-digit CM/L number. Input any licence to check operative status, manufacturer identity, and address.
              </p>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 font-mono text-xs text-zinc-600 space-y-1">
                <div className="flex justify-between">
                  <span>SAMPLE: CM/L-8400123</span>
                  <span className="text-emerald-700 font-bold">OPERATIVE</span>
                </div>
                <div className="text-[11px] text-zinc-400 truncate">
                  Hawkins Cookers Ltd • Domestic Pressure Cooker IS 2347
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/verify-isi"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors group"
              >
                <span>Check CM/L Licence</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2: Gold HUID Hallmarking */}
          <div className="verif-card bg-white border border-zinc-300 rounded-[32px] p-8 sm:p-12 flex flex-col justify-between shadow-xs hover:border-black transition-colors duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-black" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    GOLD PRECIOUS METALS
                  </span>
                </div>
                <span className="font-mono text-xs text-zinc-400">6-CHARACTER HUID</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                GOLD HUID HALLMARKING
              </h3>

              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                Mandatory for all 22K (916), 18K (750), and 14K (585) gold jewellery in India. Decode the 6-character 
                alphanumeric laser hallmark to verify assaying center testing, jeweller registration, and exact purity.
              </p>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 font-mono text-xs text-zinc-600 space-y-1">
                <div className="flex justify-between">
                  <span>SAMPLE: 22K916 • HUID: AB89K2</span>
                  <span className="text-emerald-700 font-bold">AUTHENTIC</span>
                </div>
                <div className="text-[11px] text-zinc-400 truncate">
                  BIS Certified AHC Center • Delhi Central Hallmarking
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/verify-huid"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors group"
              >
                <span>Verify Gold Hallmark</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
