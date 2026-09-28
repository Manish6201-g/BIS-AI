import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  QrCode, 
  Building2, 
  MapPin, 
  Award,
  AlertTriangle,
  ShieldAlert,
  Scale,
  FileText,
  PhoneCall,
  ExternalLink,
  Flame,
  Zap,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ISI_SAMPLES = [
  {
    cml: 'CM/L-8400123',
    standard: 'IS 2347:2017',
    product: 'Domestic Pressure Cooker',
    manufacturer: 'Hawkins Cookers Limited',
    location: 'Thane, Maharashtra',
    validUpto: '31-DEC-2027',
    status: 'OPERATIVE',
    badge: 'GENUINE LICENCE'
  },
  {
    cml: 'CM/L-1294820',
    standard: 'IS 14543:2016',
    product: 'Packaged Drinking Water',
    manufacturer: 'AquaPure Beverages India Pvt Ltd',
    location: 'Noida, Uttar Pradesh',
    validUpto: '15-AUG-2026',
    status: 'OPERATIVE',
    badge: 'GENUINE LICENCE'
  },
  {
    cml: 'CM/L-7123456',
    standard: 'IS 4151:2015',
    product: 'Protective Two-Wheeler Helmet',
    manufacturer: 'Steelbird Hi-Tech India Ltd',
    location: 'Baddi, Himachal Pradesh',
    validUpto: '30-JUN-2028',
    status: 'OPERATIVE',
    badge: 'GENUINE LICENCE'
  },
  {
    cml: 'CM/L-5009988',
    standard: 'IS 302-2-201',
    product: 'Electric Immersion Water Heater',
    manufacturer: 'Unregistered Generic Electricals',
    location: 'Unknown Facility',
    validUpto: 'EXPIRED (12-JAN-2023)',
    status: 'SUSPENDED',
    badge: 'EXPIRED / INVALID'
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
    status: 'AUTHENTIC',
    badge: 'CERTIFIED HALLMARK'
  },
  {
    huid: 'XY41Q9',
    purity: '18K 750 (75.0% Fine Gold)',
    article: 'Diamond Studded Ring',
    center: 'BIS Certified AHC Gold Test Lab',
    location: 'Zaveri Bazaar, Mumbai',
    jeweller: 'Kalyan Jewellers Reg: MH-J-44102',
    status: 'AUTHENTIC',
    badge: 'CERTIFIED HALLMARK'
  },
  {
    huid: 'X9Y1Z2',
    purity: '24K 999 (99.9% Fine Bullion)',
    article: '10g Minted Investment Bar',
    center: 'National Bullion Assaying Facility',
    location: 'Ahmedabad, Gujarat',
    jeweller: 'MMTC-PAMP India Reg: GUJ-B-10023',
    status: 'AUTHENTIC',
    badge: 'CERTIFIED HALLMARK'
  },
  {
    huid: 'ZZ9999',
    purity: 'UNKNOWN GRADE',
    article: 'Unverified Gold Bangle',
    center: 'No Matching Center Found',
    location: 'Unregistered Origin',
    jeweller: 'Unregistered Retailer',
    status: 'INVALID',
    badge: 'NON-CONFORMING'
  }
];

const MANDATORY_SAFETY_CATEGORIES = [
  {
    id: "cookers",
    standard: "IS 2347:2017",
    name: "Domestic Pressure Cookers",
    hazard: "Explosion & Burst Protection",
    tag: "MANDATORY QCO",
    metric: "Thermal Shock Tested",
    desc: "Mandatory gasket release mechanisms & burst pressure safety valves prevent catastrophic kitchen explosions."
  },
  {
    id: "water",
    standard: "IS 14543:2016",
    name: "Packaged Drinking Water",
    hazard: "Waterborne Pathogens & Heavy Metals",
    tag: "STRICT BACTERIOLOGY",
    metric: "0% Tolerated E. Coli",
    desc: "Rigorous microbiological sterilization, zero pesticide residues, and strict mineral conductivity bounds."
  },
  {
    id: "helmets",
    standard: "IS 4151:2015",
    name: "Two-Wheeler Helmets",
    hazard: "Fatal Crash Traumatic Shock",
    tag: "LIFE-SAVING SPEC",
    metric: "High Velocity Impact",
    desc: "Dynamic impact deceleration thresholds, chin strap retention load capacity, and shell penetration resistance."
  },
  {
    id: "infant-food",
    standard: "IS 14433:2020",
    name: "Infant Milk Substitutes",
    hazard: "Nutritional Deficiency & Toxins",
    tag: "ZERO AFLATOXIN",
    metric: "100% Laboratory Checked",
    desc: "Essential fatty acid ratios, vitamin bioavailability thresholds, and complete absence of chemical adulterants."
  },
  {
    id: "gold",
    standard: "IS 1417:2016",
    name: "Gold & Precious Jewellery",
    hazard: "Caratage Fraud & Adulteration",
    tag: "HUID MANDATORY",
    metric: "Laser Assayed 6-Char",
    desc: "Complete statutory elimination of under-caratage with microscopic 6-character laser HUID traceability."
  },
  {
    id: "cables",
    standard: "IS 694:2010",
    name: "PVC Insulated Cables",
    hazard: "Short-Circuits & Fire Propagation",
    tag: "FLAME RETARDANT",
    metric: "FRLS Specification",
    desc: "Flame-retardant low-smoke insulation engineered to prevent rapid residential electrical fire spread."
  },
  {
    id: "toys",
    standard: "IS 9873:2019",
    name: "Children's Safety Toys",
    hazard: "Toxic Phthalates & Choke Hazards",
    tag: "CHILD SAFETY QCO",
    metric: "Zero Heavy Metals",
    desc: "Enforced mechanical impact resistance, non-toxic lead-free coatings, and total ban on dangerous plasticizers."
  },
  {
    id: "lpg-valves",
    standard: "IS 9798:1995",
    name: "Domestic LPG Regulators",
    hazard: "Gas Leaks & Domestic Blasts",
    tag: "17-BAR TESTED",
    metric: "Positive Shut-Off",
    desc: "Zero gas leakage tolerance, burst pressure safety margins, and automated excess-flow shut-off seals."
  }
];

const VERIFICATION_STEPS = [
  {
    step: "01",
    title: "INSPECT THE MONOGRAM",
    desc: "Examine product body, label, or jewellery surface for the official BIS triangle or ISI monogram.",
    detail: "Never accept faint stickers or unverified logos without alphanumeric identifiers."
  },
  {
    step: "02",
    title: "LOCATE THE IDENTIFIER",
    desc: "Identify the 7-digit CM/L license code (under ISI logo) or the 6-character laser-etched HUID code.",
    detail: "Every authentic manufacturer or assaying centre is assigned an immutable registry number."
  },
  {
    step: "03",
    title: "QUERY GAZETTE REGISTRY",
    desc: "Run instant verification via BISmart AI or official BIS Care to verify license validity and factory origin.",
    detail: "Confirm that manufacturer brand and factory address match the physical packaging."
  },
  {
    step: "04",
    title: "REPORT COUNTERFEITS",
    desc: "If invalid, expired, or counterfeit, submit an instant complaint to initiate immediate BIS enforcement action.",
    detail: "Violators face up to 2 years imprisonment and asset seizure under BIS Act 2016."
  }
];

export const VerificationSection = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // ISI and HUID simulator index
  const [isiIdx, setIsiIdx] = useState(0);
  const [huidIdx, setHuidIdx] = useState(0);
  const [isIsiScanning, setIsIsiScanning] = useState(false);
  const [isHuidScanning, setIsHuidScanning] = useState(false);

  // Quick Verifier Widget State
  const [quickMode, setQuickMode] = useState('isi'); // 'isi' or 'huid'
  const [quickQuery, setQuickQuery] = useState('8400123');
  const [quickStatus, setQuickStatus] = useState({
    checked: true,
    valid: true,
    code: '8400123',
    title: 'Hawkins Cookers Limited',
    subtitle: 'Domestic Pressure Cooker • IS 2347:2017',
    tag: 'OPERATIVE & VALID'
  });

  const triggerIsiScan = (newIdx) => {
    setIsIsiScanning(true);
    setIsiIdx(newIdx);
    setTimeout(() => setIsIsiScanning(false), 800);
  };

  const triggerHuidScan = (newIdx) => {
    setIsHuidScanning(true);
    setHuidIdx(newIdx);
    setTimeout(() => setIsHuidScanning(false), 800);
  };

  const handleQuickVerify = (e) => {
    if (e) e.preventDefault();
    const clean = quickQuery.trim();
    if (!clean) return;

    if (quickMode === 'isi') {
      const match = ISI_SAMPLES.find(s => s.cml.includes(clean) || clean.includes(s.cml.replace('CM/L-', '')));
      if (match) {
        setQuickStatus({
          checked: true,
          valid: match.status === 'OPERATIVE',
          code: match.cml,
          title: match.manufacturer,
          subtitle: `${match.product} • ${match.standard}`,
          tag: match.status === 'OPERATIVE' ? 'OPERATIVE & VALID' : 'SUSPENDED / EXPIRED'
        });
      } else {
        setQuickStatus({
          checked: true,
          valid: clean.length === 7,
          code: clean.startsWith('CM/L-') ? clean : `CM/L-${clean}`,
          title: clean.length === 7 ? 'Bureau of Indian Standards Scheme-I Entry' : 'Non-Conforming Format',
          subtitle: clean.length === 7 ? 'Official Gazette Record Synchronized' : 'ISI CM/L must be exactly 7 numeric digits',
          tag: clean.length === 7 ? 'RECORD FOUND' : 'FORMAT ERROR'
        });
      }
    } else {
      const match = HUID_SAMPLES.find(s => s.huid.toLowerCase() === clean.toLowerCase());
      if (match) {
        setQuickStatus({
          checked: true,
          valid: match.status === 'AUTHENTIC',
          code: `HUID: ${match.huid}`,
          title: match.jeweller,
          subtitle: `${match.article} • ${match.purity}`,
          tag: match.status === 'AUTHENTIC' ? 'AUTHENTIC HALLMARK' : 'NON-CONFORMING'
        });
      } else {
        setQuickStatus({
          checked: true,
          valid: clean.length === 6,
          code: `HUID: ${clean.toUpperCase()}`,
          title: clean.length === 6 ? 'BIS Assaying & Hallmarking Record' : 'Invalid HUID Format',
          subtitle: clean.length === 6 ? 'Traceable to Certified AHC Test Center' : 'HUID must be exactly 6 alphanumeric characters',
          tag: clean.length === 6 ? 'HALLMARK LOGGED' : 'FORMAT ERROR'
        });
      }
    }
  };

  const switchQuickMode = (mode) => {
    setQuickMode(mode);
    if (mode === 'isi') {
      setQuickQuery('8400123');
      setQuickStatus({
        checked: true,
        valid: true,
        code: 'CM/L-8400123',
        title: 'Hawkins Cookers Limited',
        subtitle: 'Domestic Pressure Cooker • IS 2347:2017',
        tag: 'OPERATIVE & VALID'
      });
    } else {
      setQuickQuery('AB89K2');
      setQuickStatus({
        checked: true,
        valid: true,
        code: 'HUID: AB89K2',
        title: 'Tanishq Jewellers Reg: DEL-J-98214',
        subtitle: 'Necklace Chain / Handcrafted • 22K 916',
        tag: 'AUTHENTIC HALLMARK'
      });
    }
  };

  useGSAP(() => {
    gsap.from('.verif-header-content', {
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      }
    });

    gsap.from('.verif-quick-box', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.15,
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

    gsap.from('.verif-category-card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.verif-categories-grid',
        start: 'top 80%',
        once: true,
      }
    });

    gsap.from('.verif-step-card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.verif-steps-grid',
        start: 'top 80%',
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
      className="bg-tech-dotted-white text-black py-24 sm:py-32 px-6 sm:px-12 border-b border-zinc-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full space-y-20 sm:space-y-28">
        
        {/* ========================================================
            01. High-Density Split Header & Interactive Quick Verifier
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Editorial Headline & Context */}
          <div className="verif-header-content lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>05 — CITIZEN CONSUMER SAFETY & VERIFICATION</span>
            </div>

            <h2 className="editorial-headline text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-black leading-[0.92]">
              UNDERSTAND <br />
              WHAT YOU <br />
              <span className="text-zinc-400">ARE BUYING.</span>
            </h2>

            <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-xl">
              Protect your family against substandard, counterfeit goods and karatage fraud. 
              BISmart AI provides instant statutory verification of manufacturer licences and gold 
              hallmarking directly synchronized with the National Gazette of India.
            </p>

            {/* Micro Trust Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>BIS Act 2016 Compliant</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono text-[11px]">
                <Check className="w-3.5 h-3.5 text-cyan-600" />
                <span>Live Gazette Database</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono text-[11px]">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Certified AHC Network</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Quick Verifier Console */}
          <div className="verif-quick-box lg:col-span-5 bg-white border border-zinc-300 rounded-[28px] p-6 sm:p-8 shadow-xs hover:border-black transition-colors">
            
            {/* Header with Mode Switcher */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-5">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-black" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                  INSTANT REGISTRY QUERY
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                LIVE API
              </span>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-100 rounded-xl mb-4 font-mono text-xs">
              <button
                type="button"
                onClick={() => switchQuickMode('isi')}
                className={`py-2 px-3 rounded-lg font-bold transition-all text-center cursor-pointer ${
                  quickMode === 'isi' 
                    ? 'bg-black text-white shadow-2xs' 
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                7-DIGIT ISI CM/L
              </button>
              <button
                type="button"
                onClick={() => switchQuickMode('huid')}
                className={`py-2 px-3 rounded-lg font-bold transition-all text-center cursor-pointer ${
                  quickMode === 'huid' 
                    ? 'bg-black text-white shadow-2xs' 
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                6-CHAR GOLD HUID
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleQuickVerify} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder={quickMode === 'isi' ? "Enter 7-digit CM/L (e.g. 8400123)" : "Enter 6-char HUID (e.g. AB89K2)"}
                  maxLength={quickMode === 'isi' ? 12 : 8}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-3 text-sm font-mono text-black placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white transition-all uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg bg-black text-white hover:bg-zinc-800 font-mono text-xs font-bold uppercase transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <span>CHECK</span>
                </button>
              </div>

              {/* Sample Fast Pickers */}
              <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 pt-1 overflow-x-auto pb-1">
                <span className="shrink-0 text-zinc-400">PRESETS:</span>
                {quickMode === 'isi' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => { setQuickQuery('8400123'); setTimeout(handleQuickVerify, 50); }}
                      className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer"
                    >
                      Cooker (8400123)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setQuickQuery('1294820'); setTimeout(handleQuickVerify, 50); }}
                      className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer"
                    >
                      Water (1294820)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setQuickQuery('7123456'); setTimeout(handleQuickVerify, 50); }}
                      className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer"
                    >
                      Helmet (7123456)
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => { setQuickQuery('AB89K2'); setTimeout(handleQuickVerify, 50); }}
                      className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer"
                    >
                      22K (AB89K2)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setQuickQuery('XY41Q9'); setTimeout(handleQuickVerify, 50); }}
                      className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer"
                    >
                      18K (XY41Q9)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setQuickQuery('X9Y1Z2'); setTimeout(handleQuickVerify, 50); }}
                      className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer"
                    >
                      24K (X9Y1Z2)
                    </button>
                  </>
                )}
              </div>
            </form>

            {/* Quick Result Feedback Card */}
            {quickStatus.checked && (
              <div className={`mt-4 rounded-xl p-3.5 border transition-all ${
                quickStatus.valid 
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                  : 'bg-red-50/70 border-red-200 text-red-950'
              }`}>
                <div className="flex items-center justify-between pb-2 border-b border-black/5">
                  <div className="flex items-center space-x-1.5 font-mono text-xs font-bold">
                    {quickStatus.valid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                    <span>{quickStatus.code}</span>
                  </div>
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    quickStatus.valid 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-red-600 text-white'
                  }`}>
                    {quickStatus.tag}
                  </span>
                </div>
                <div className="pt-2">
                  <p className="font-bold text-xs leading-tight">{quickStatus.title}</p>
                  <p className="text-[11px] opacity-80 mt-0.5 leading-snug">{quickStatus.subtitle}</p>
                </div>
              </div>
            )}

            {/* 4 Trust Metrics Strip inside right box */}
            <div className="grid grid-cols-2 gap-3 pt-5 mt-5 border-t border-zinc-200 text-left">
              <div>
                <span className="font-mono text-base sm:text-lg font-black text-black">45,000+</span>
                <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">ACTIVE SCHEME-I LICENCES</span>
              </div>
              <div>
                <span className="font-mono text-base sm:text-lg font-black text-black">1,650+</span>
                <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">ASSAYING CENTRES (AHC)</span>
              </div>
              <div>
                <span className="font-mono text-base sm:text-lg font-black text-black">150+</span>
                <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">MANDATORY QCO ORDERS</span>
              </div>
              <div>
                <span className="font-mono text-base sm:text-lg font-black text-black">&lt; 150ms</span>
                <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">LIVE QUERY LATENCY</span>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            02. Dual High-Impact Verification Simulator Cards (ISI & Gold)
            ======================================================== */}
        <div className="verif-grid grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          
          {/* Card 1: ISI CM/L Verification */}
          <div className="verif-card bg-white border border-zinc-300 rounded-[32px] p-8 sm:p-12 flex flex-col justify-between shadow-xs hover:border-black transition-all duration-300 relative group overflow-hidden">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    SCHEME-I AUTHENTICITY
                  </span>
                </div>
                <span className="font-mono text-[11px] bg-zinc-100 text-zinc-700 px-2.5 py-0.5 rounded border border-zinc-200 font-bold">
                  7-DIGIT CM/L
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                  ISI MARK LICENCE VERIFIER
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal mt-2">
                  Every genuine ISI marked product—from pressure cookers to steel rods and automotive helmets—must 
                  display a unique 7-digit Certification Marks Licence (CM/L) number under the logo.
                </p>
              </div>

              {/* Authenticity Anatomy Breakdown Checklist */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-2.5">
                <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                  ANATOMY OF A VALID ISI MARK:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 font-medium">
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Indian Standard Code:</strong> Specific IS number printed above logo</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>7-Digit CM/L Code:</strong> Unique factory licence number below logo</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Factory Matching:</strong> Registered address identical to physical pack</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Operative Status:</strong> Active endorsement in official Gazette</span>
                  </div>
                </div>
              </div>

              {/* Sample Switcher Tabs */}
              <div className="flex items-center space-x-2 pt-1 overflow-x-auto pb-1">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest shrink-0">TEST SAMPLES:</span>
                {ISI_SAMPLES.map((s, i) => (
                  <button
                    key={s.cml}
                    onClick={() => triggerIsiScan(i)}
                    className={`font-mono text-xs px-3 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                      isiIdx === i 
                        ? 'bg-black text-white shadow-xs font-bold' 
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {s.cml}
                  </button>
                ))}
              </div>

              {/* Holographic Verification Badge Simulation */}
              <div className="relative bg-zinc-900 text-white rounded-2xl p-5 sm:p-6 font-mono text-xs overflow-hidden border border-zinc-800 shadow-md">
                {/* Laser scan line effect */}
                {isIsiScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_#22d3ee] top-0 left-0 right-0 animate-bounce duration-700" />
                )}

                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <QrCode className="w-4 h-4 text-cyan-400" />
                    <span className="text-white font-bold text-sm tracking-wider">{activeIsi.cml}</span>
                  </div>
                  <div className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeIsi.status === 'OPERATIVE'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      activeIsi.status === 'OPERATIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                    }`}></span>
                    <span>{activeIsi.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 pt-3.5 text-[11px]">
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
                    <span className="text-zinc-500 block text-[10px]">FACTORY PREMISE</span>
                    <span className="text-zinc-300 truncate block">{activeIsi.location}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-zinc-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-zinc-400">VALIDITY PERIOD: <strong className={activeIsi.status === 'OPERATIVE' ? "text-cyan-400" : "text-red-400"}>{activeIsi.validUpto}</strong></span>
                    <span className="text-zinc-500">{activeIsi.badge}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button Strip */}
            <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <Link
                to="/verify-isi"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-all duration-200 group shadow-sm hover:shadow-md"
              >
                <span>Launch Full CM/L Verifier</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[11px] font-mono text-zinc-500 text-right sm:text-left">
                Database: 45,000+ Licences Active
              </span>
            </div>
          </div>

          {/* Card 2: Gold HUID Hallmarking */}
          <div className="verif-card bg-white border border-zinc-300 rounded-[32px] p-8 sm:p-12 flex flex-col justify-between shadow-xs hover:border-black transition-all duration-300 relative group overflow-hidden">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-black" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    GOLD PRECIOUS METALS
                  </span>
                </div>
                <span className="font-mono text-[11px] bg-zinc-100 text-zinc-700 px-2.5 py-0.5 rounded border border-zinc-200 font-bold">
                  6-CHAR HUID
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                  GOLD HUID HALLMARKING
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal mt-2">
                  Mandatory for all 22K (916), 18K (750), and 14K (585) gold jewellery in India. Decode the 6-character 
                  alphanumeric laser hallmark to verify assaying centre testing and exact gold purity.
                </p>
              </div>

              {/* Authenticity Anatomy Breakdown Checklist */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-2.5">
                <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                  3 MANDATORY HALLMARK SYMBOLS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 font-medium">
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>BIS Triangle Mark:</strong> Primary statutory emblem of certified quality</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Purity & Fineness:</strong> 22K916, 18K750, or 14K585 stamped ratio</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>6-Char Laser HUID:</strong> Unique indelible alphanumeric identifier</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>AHC Traceability:</strong> Certified Assaying & Hallmarking Centre lab</span>
                  </div>
                </div>
              </div>

              {/* Sample Switcher Tabs */}
              <div className="flex items-center space-x-2 pt-1 overflow-x-auto pb-1">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest shrink-0">TEST SAMPLES:</span>
                {HUID_SAMPLES.map((s, i) => (
                  <button
                    key={s.huid}
                    onClick={() => triggerHuidScan(i)}
                    className={`font-mono text-xs px-3 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                      huidIdx === i 
                        ? 'bg-black text-white shadow-xs font-bold' 
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    HUID-{s.huid}
                  </button>
                ))}
              </div>

              {/* Holographic Verification Badge Simulation */}
              <div className="relative bg-zinc-900 text-white rounded-2xl p-5 sm:p-6 font-mono text-xs overflow-hidden border border-zinc-800 shadow-md">
                {/* Laser scan line effect */}
                {isHuidScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_14px_#fbbf24] top-0 left-0 right-0 animate-bounce duration-700" />
                )}

                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 font-bold text-sm tracking-widest">HUID: {activeHuid.huid}</span>
                  </div>
                  <div className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeHuid.status === 'AUTHENTIC'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      activeHuid.status === 'AUTHENTIC' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                    }`}></span>
                    <span>{activeHuid.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 pt-3.5 text-[11px]">
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
                  <div className="col-span-2 pt-1 border-t border-zinc-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-zinc-400 truncate max-w-[260px] sm:max-w-none">{activeHuid.jeweller}</span>
                    <span className="text-zinc-500">{activeHuid.badge}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button Strip */}
            <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <Link
                to="/verify-huid"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-all duration-200 group shadow-sm hover:shadow-md"
              >
                <span>Launch Gold Hallmark Verifier</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[11px] font-mono text-zinc-500 text-right sm:text-left">
                Network: 1,650+ Certified AHCs
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            03. Critical Consumer Safety Categories (High-Risk QCOs)
            ======================================================== */}
        <div className="space-y-8 pt-8 border-t border-zinc-200">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-2">
                <span className="w-4 h-px bg-zinc-400"></span>
                <span>05.A — STATUTORY MANDATE & CITIZEN PROTECTION</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                ESSENTIAL PRODUCTS REQUIRING MANDATORY ISI MARKING
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-md font-normal leading-relaxed">
              Under Section 16 of the BIS Act 2016, the Central Government mandates ISI certification 
              for high-risk goods. Selling uncertified products in these categories is a cognizable criminal offence.
            </p>
          </div>

          {/* 8 Category High-Density Cards Grid */}
          <div className="verif-categories-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MANDATORY_SAFETY_CATEGORIES.map((cat) => (
              <div 
                key={cat.id}
                className="verif-category-card bg-white border border-zinc-300 rounded-2xl p-5 hover:border-black transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                    <span className="font-mono text-[11px] font-bold text-black bg-zinc-100 px-2 py-0.5 rounded">
                      {cat.standard}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-emerald-600 uppercase tracking-wider">
                      {cat.tag}
                    </span>
                  </div>

                  <h4 className="font-black text-base text-black mt-3 uppercase tracking-tight group-hover:text-cyan-700 transition-colors">
                    {cat.name}
                  </h4>

                  <p className="text-xs text-zinc-600 font-normal leading-relaxed mt-2">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500 text-[10px] uppercase">SAFETY SHIELD:</span>
                  <span className="font-bold text-black">{cat.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            04. 4-Step Citizen Verification & Counterfeit Reporting Protocol
            ======================================================== */}
        <div className="space-y-8 pt-8 border-t border-zinc-200">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-2">
                <span className="w-4 h-px bg-zinc-400"></span>
                <span>05.B — STEP-BY-STEP VERIFICATION PROTOCOL</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                HOW CONSUMERS VERIFY PRODUCTS IN 4 STEPS
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-md font-normal leading-relaxed">
              Verify statutory compliance in under 30 seconds before completing any purchase online or at retail stores.
            </p>
          </div>

          <div className="verif-steps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VERIFICATION_STEPS.map((s, idx) => (
              <div
                key={s.step}
                className="verif-step-card bg-white border border-zinc-300 rounded-2xl p-6 flex flex-col justify-between hover:border-black transition-all shadow-2xs relative"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                    <span className="font-mono text-2xl font-black text-black">
                      {s.step}
                    </span>
                    {idx < 3 && (
                      <ChevronRight className="w-5 h-5 text-zinc-400 hidden lg:block" />
                    )}
                  </div>

                  <h4 className="font-black text-sm text-black uppercase tracking-wide mt-3">
                    {s.title}
                  </h4>

                  <p className="text-xs text-zinc-600 font-normal leading-relaxed mt-2">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100">
                  <p className="font-mono text-[10px] text-zinc-500 leading-tight">
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            05. Statutory Warnings, Grievance Hotline & Citizen Rights Banner
            ======================================================== */}
        <div className="bg-black text-white rounded-[28px] p-8 sm:p-12 relative overflow-hidden border border-zinc-800 shadow-xl">
          {/* Subtle Background Geometry */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-zinc-800/40 to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Warning Text */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>BIS ACT 2016 SECTION 15 & 29 ENFORCEMENT WARNING</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                SELLING COUNTERFEIT OR UNHALLMARKED GOODS IS A CRIMINAL OFFENCE
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-2xl">
                Any manufacturer, distributor, or retailer selling uncertified mandatory QCO products 
                or unhallmarked gold jewellery is subject to <strong>imprisonment up to 2 years</strong>, 
                a minimum fine of <strong>₹2,00,000</strong> (extendable up to 10 times the value of goods seized), 
                and mandatory factory closure under the Bureau of Indian Standards Act, 2016.
              </p>
            </div>

            {/* Right Action Stack */}
            <div className="lg:col-span-4 flex flex-col space-y-3">
              <a
                href="tel:1915"
                className="inline-flex items-center justify-between px-5 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-white text-white transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <div className="text-left font-mono">
                    <span className="block text-[10px] text-zinc-400 uppercase">NATIONAL CONSUMER TOLL-FREE</span>
                    <span className="font-black text-sm text-white">CALL 1915 (NCH HELPLINE)</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
              </a>

              <Link
                to="/assistant"
                className="inline-flex items-center justify-between px-5 py-3.5 rounded-xl bg-white text-black hover:bg-cyan-400 transition-all font-mono text-xs font-bold uppercase group shadow-md"
              >
                <div className="flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-black" />
                  <span>Report Violation to AI Assistant</span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
