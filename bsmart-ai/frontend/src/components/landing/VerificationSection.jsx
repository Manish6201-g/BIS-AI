import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Search, QrCode, Building2, MapPin, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ISI_SAMPLES = [
  {
    cml: 'CM/L-8400123',
    standard: 'IS 2347:2017',
    product: 'Domestic Pressure Cooker',
    manufacturer: 'Hawkins Cookers Limited',
    location: 'Thane, Maharashtra',
    validUpto: '31-DEC-2027',
    status: 'OPERATIVE'
  },
  {
    cml: 'CM/L-1294820',
    standard: 'IS 14543:2016',
    product: 'Packaged Drinking Water',
    manufacturer: 'AquaPure Beverages India Pvt Ltd',
    location: 'Noida, Uttar Pradesh',
    validUpto: '15-AUG-2026',
    status: 'OPERATIVE'
  }
];

const HUID_SAMPLES = [
  {
    huid: 'AB89K2',
    purity: '22K 916 (91.6% Pure Gold)',
    article: 'Necklace Chain / Handcrafted',
    center: 'Manak Bhawan Central Assaying Center',
    location: 'Connaught Place, New Delhi',
    jeweller: 'Tanishq Jewellers Reg: DEL-J-98214',
    status: 'AUTHENTIC'
  },
  {
    huid: 'XY41Q9',
    purity: '18K 750 (75.0% Fine Gold)',
    article: 'Diamond Studded Ring',
    center: 'BIS Certified AHC Gold Test Lab',
    location: 'Zaveri Bazaar, Mumbai',
    jeweller: 'Kalyan Jewellers Reg: MH-J-44102',
    status: 'AUTHENTIC'
  }
];

export const VerificationSection = () => {
  const sectionRef = useRef(null);
  const [isiIdx, setIsiIdx] = useState(0);
  const [huidIdx, setHuidIdx] = useState(0);
  const [isIsiScanning, setIsIsiScanning] = useState(false);
  const [isHuidScanning, setIsHuidScanning] = useState(false);

  const triggerIsiScan = (newIdx) => {
    setIsIsiScanning(true);
    setIsiIdx(newIdx);
    setTimeout(() => setIsIsiScanning(false), 900);
  };

  const triggerHuidScan = (newIdx) => {
    setIsHuidScanning(true);
    setHuidIdx(newIdx);
    setTimeout(() => setIsHuidScanning(false), 900);
  };

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

  const activeIsi = ISI_SAMPLES[isiIdx];
  const activeHuid = HUID_SAMPLES[huidIdx];

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="bg-tech-dotted-white text-black py-28 sm:py-36 px-6 sm:px-12 border-b border-zinc-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header with Editorial Typography */}
        <div className="verif-header max-w-4xl mb-16 sm:mb-24">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[11px] tracking-widest text-zinc-600 uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>05 — CITIZEN CONSUMER SAFETY & VERIFICATION</span>
          </div>
          <h2 className="editorial-headline text-4xl sm:text-6xl md:text-8xl text-black">
            UNDERSTAND <br />
            WHAT YOU <br />
            <span className="text-zinc-400">ARE BUYING.</span>
          </h2>
          <p className="text-base sm:text-xl text-zinc-600 font-normal leading-relaxed mt-6 max-w-2xl">
            Protect your family against substandard, counterfeit goods. BISmart AI provides instant statutory verification 
            of manufacturer licences and gold purity hallmarking directly from official gazette registries.
          </p>
        </div>

        {/* Large Editorial Cards Grid */}
        <div className="verif-grid grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Card 1: ISI CM/L Verification */}
          <div className="verif-card bg-white border border-zinc-300 rounded-[32px] p-8 sm:p-12 flex flex-col justify-between shadow-xs hover:border-black transition-all duration-300 relative group overflow-hidden">
            {/* Top Bar */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    SCHEME-I AUTHENTICITY
                  </span>
                </div>
                <span className="font-mono text-[11px] bg-zinc-100 text-zinc-600 px-2.5 py-0.5 rounded border border-zinc-200">
                  7-DIGIT CM/L
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                  ISI MARK LICENCE VERIFIER
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal mt-2">
                  Every genuine ISI marked item—from pressure cookers to steel rods and helmets—must display a 
                  unique 7-digit CM/L number. Input any licence to check operative status and manufacturer identity.
                </p>
              </div>

              {/* Sample Switcher Tabs */}
              <div className="flex items-center space-x-2 pt-2">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">TEST SAMPLES:</span>
                {ISI_SAMPLES.map((s, i) => (
                  <button
                    key={s.cml}
                    onClick={() => triggerIsiScan(i)}
                    className={`font-mono text-xs px-3 py-1 rounded-md transition-all cursor-pointer ${
                      isiIdx === i 
                        ? 'bg-black text-white shadow-xs' 
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {s.cml}
                  </button>
                ))}
              </div>

              {/* Holographic Verification Badge Simulation */}
              <div className="relative bg-zinc-900 text-white rounded-2xl p-5 font-mono text-xs overflow-hidden border border-zinc-800 shadow-md">
                {/* Laser scan line effect */}
                {isIsiScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] animate-pulse top-0 left-0 right-0 animate-bounce duration-700" />
                )}

                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <QrCode className="w-4 h-4 text-cyan-400" />
                    <span className="text-zinc-300 font-bold">{activeIsi.cml}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{activeIsi.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 text-[11px]">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">APPLICABLE STANDARD</span>
                    <span className="text-white font-semibold">{activeIsi.standard}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">PRODUCT CATEGORY</span>
                    <span className="text-zinc-300 truncate block">{activeIsi.product}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">MANUFACTURER</span>
                    <span className="text-zinc-300 truncate block">{activeIsi.manufacturer}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">VALID UNTIL</span>
                    <span className="text-cyan-400">{activeIsi.validUpto}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/verify-isi"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-all duration-200 group shadow-sm hover:shadow-md"
              >
                <span>Launch Full CM/L Verifier</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2: Gold HUID Hallmarking */}
          <div className="verif-card bg-white border border-zinc-300 rounded-[32px] p-8 sm:p-12 flex flex-col justify-between shadow-xs hover:border-black transition-all duration-300 relative group overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-black" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    GOLD PRECIOUS METALS
                  </span>
                </div>
                <span className="font-mono text-[11px] bg-zinc-100 text-zinc-600 px-2.5 py-0.5 rounded border border-zinc-200">
                  6-CHAR HUID
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                  GOLD HUID HALLMARKING
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal mt-2">
                  Mandatory for all 22K (916), 18K (750), and 14K (585) gold jewellery in India. Decode the 6-character 
                  alphanumeric laser hallmark to verify assaying center testing and exact gold purity.
                </p>
              </div>

              {/* Sample Switcher Tabs */}
              <div className="flex items-center space-x-2 pt-2">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">TEST SAMPLES:</span>
                {HUID_SAMPLES.map((s, i) => (
                  <button
                    key={s.huid}
                    onClick={() => triggerHuidScan(i)}
                    className={`font-mono text-xs px-3 py-1 rounded-md transition-all cursor-pointer ${
                      huidIdx === i 
                        ? 'bg-black text-white shadow-xs' 
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    HUID-{s.huid}
                  </button>
                ))}
              </div>

              {/* Holographic Verification Badge Simulation */}
              <div className="relative bg-zinc-900 text-white rounded-2xl p-5 font-mono text-xs overflow-hidden border border-zinc-800 shadow-md">
                {/* Laser scan line effect */}
                {isHuidScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#fbbf24] animate-pulse top-0 left-0 right-0 animate-bounce duration-700" />
                )}

                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 font-bold tracking-widest">HUID: {activeHuid.huid}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{activeHuid.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 text-[11px]">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">PURITY GRADE</span>
                    <span className="text-amber-400 font-semibold">{activeHuid.purity}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">ARTICLE</span>
                    <span className="text-zinc-300 truncate block">{activeHuid.article}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-zinc-500 block text-[10px]">ASSAYING & HALLMARKING CENTRE (AHC)</span>
                    <span className="text-zinc-300 truncate block">{activeHuid.center}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/verify-huid"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-all duration-200 group shadow-sm hover:shadow-md"
              >
                <span>Launch Gold Hallmark Verifier</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
