import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  CheckCircle2, 
  XCircle, 
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
  X, 
  ChevronRight, 
  Info, 
  Droplet, 
  Baby, 
  HeartPulse, 
  FileCheck2, 
  BadgeCheck, 
  RefreshCw 
} from 'lucide-react';
import { ScrollChoreography } from '../ui/scroll-choreography';

gsap.registerPlugin(ScrollTrigger);

const CHOREOGRAPHY_IMAGES = {
  topLeft: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
  bottomRight: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80",
  bottomLeft: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
  topRight: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
};

const CHOREOGRAPHY_CAPTIONS = {
  topLeft: {
    tag: "01 — PROOF TESTING",
    title: "SCHEME-I FACTORY INSPECTION",
    subtitle: "Hydrostatic test bench & thermal safety audit"
  },
  bottomRight: {
    tag: "02 — HALLMARKING",
    title: "6-CHAR LASER HUID ASSAY",
    subtitle: "AHC verified gold fineness (22K916 / 18K750)"
  },
  bottomLeft: {
    tag: "03 — GAZETTE REGISTRY",
    title: "STATUTORY QCO MANDATES",
    subtitle: "Cognizable consumer protection under Section 16"
  },
  topRight: {
    tag: "04 — CONVERGENCE",
    title: "CENTRAL BIS AUTHENTICITY EMBLEM",
    subtitle: "Scroll to expand full verification matrix"
  }
};

const ISI_SAMPLES = [
  {
    cml: 'CM/L-8400123',
    standard: 'IS 2347:2017',
    product: 'Domestic Pressure Cooker',
    manufacturer: 'Hawkins Cookers Limited',
    location: 'Thane, Maharashtra',
    validUpto: '31-DEC-2027',
    status: 'OPERATIVE',
    badge: 'GENUINE LICENCE',
    scope: 'Aluminium & Stainless Steel, 3L to 10L Capacity'
  },
  {
    cml: 'CM/L-1294820',
    standard: 'IS 14543:2016',
    product: 'Packaged Drinking Water',
    manufacturer: 'AquaPure Beverages India Pvt Ltd',
    location: 'Noida, Uttar Pradesh',
    validUpto: '15-AUG-2026',
    status: 'OPERATIVE',
    badge: 'GENUINE LICENCE',
    scope: 'Sterilized Packaged Water in 20L Food-Grade Containers'
  },
  {
    cml: 'CM/L-7123456',
    standard: 'IS 4151:2015',
    product: 'Protective Two-Wheeler Helmet',
    manufacturer: 'Steelbird Hi-Tech India Ltd',
    location: 'Baddi, Himachal Pradesh',
    validUpto: '30-JUN-2028',
    status: 'OPERATIVE',
    badge: 'GENUINE LICENCE',
    scope: 'Full-Face Protective Helmets with Micrometric Buckle'
  },
  {
    cml: 'CM/L-5009988',
    standard: 'IS 302-2-201',
    product: 'Electric Immersion Water Heater',
    manufacturer: 'Unregistered Generic Electricals',
    location: 'Unknown Facility',
    validUpto: 'EXPIRED (12-JAN-2023)',
    status: 'SUSPENDED',
    badge: 'EXPIRED / INVALID',
    scope: 'Unauthorized commercial distribution under QCO order'
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
    badge: 'CERTIFIED HALLMARK',
    assayDate: '14-FEB-2025'
  },
  {
    huid: 'XY41Q9',
    purity: '18K 750 (75.0% Fine Gold)',
    article: 'Diamond Studded Ring',
    center: 'BIS Certified AHC Gold Test Lab',
    location: 'Zaveri Bazaar, Mumbai',
    jeweller: 'Kalyan Jewellers Reg: MH-J-44102',
    status: 'AUTHENTIC',
    badge: 'CERTIFIED HALLMARK',
    assayDate: '02-JAN-2025'
  },
  {
    huid: 'X9Y1Z2',
    purity: '24K 999 (99.9% Fine Bullion)',
    article: '10g Minted Investment Bar',
    center: 'National Bullion Assaying Facility',
    location: 'Ahmedabad, Gujarat',
    jeweller: 'MMTC-PAMP India Reg: GUJ-B-10023',
    status: 'AUTHENTIC',
    badge: 'CERTIFIED HALLMARK',
    assayDate: '28-NOV-2024'
  },
  {
    huid: 'ZZ9999',
    purity: 'UNKNOWN GRADE',
    article: 'Unverified Gold Bangle',
    center: 'No Matching Center Found',
    location: 'Unregistered Origin',
    jeweller: 'Unregistered Retailer',
    status: 'INVALID',
    badge: 'NON-CONFORMING',
    assayDate: 'N/A'
  }
];

const MANDATORY_SAFETY_CATEGORIES = [
  {
    id: "cookers",
    standard: "IS 2347:2017",
    name: "Domestic Pressure Cookers",
    hazard: "Explosion & Thermal Burst Protection",
    tag: "MANDATORY QCO",
    metric: "Thermal Shock Tested",
    icon: Flame,
    desc: "Mandatory gasket release mechanisms & burst pressure safety valves prevent catastrophic kitchen explosions."
  },
  {
    id: "water",
    standard: "IS 14543:2016",
    name: "Packaged Drinking Water",
    hazard: "Waterborne Pathogens & Heavy Metals",
    tag: "STRICT BACTERIOLOGY",
    metric: "0% Tolerated E. Coli",
    icon: Droplet,
    desc: "Rigorous microbiological sterilization, zero pesticide residues, and strict mineral conductivity bounds."
  },
  {
    id: "helmets",
    standard: "IS 4151:2015",
    name: "Two-Wheeler Helmets",
    hazard: "Fatal Crash Traumatic Shock",
    tag: "LIFE-SAVING SPEC",
    metric: "High Velocity Impact",
    icon: ShieldAlert,
    desc: "Dynamic impact deceleration thresholds, chin strap retention load capacity, and shell penetration resistance."
  },
  {
    id: "infant-food",
    standard: "IS 14433:2020",
    name: "Infant Milk Substitutes",
    hazard: "Nutritional Deficiency & Toxins",
    tag: "ZERO AFLATOXIN",
    metric: "100% Laboratory Checked",
    icon: Baby,
    desc: "Essential fatty acid ratios, vitamin bioavailability thresholds, and complete absence of chemical adulterants."
  },
  {
    id: "gold",
    standard: "IS 1417:2016",
    name: "Gold & Precious Jewellery",
    hazard: "Caratage Fraud & Adulteration",
    tag: "HUID MANDATORY",
    metric: "Laser Assayed 6-Char",
    icon: Sparkles,
    desc: "Complete statutory elimination of under-karatage with microscopic 6-character laser HUID traceability."
  },
  {
    id: "cables",
    standard: "IS 694:2010",
    name: "PVC Insulated Cables",
    hazard: "Short-Circuits & Fire Propagation",
    tag: "FLAME RETARDANT",
    metric: "FRLS Specification",
    icon: Zap,
    desc: "Flame-retardant low-smoke insulation engineered to prevent rapid residential electrical fire spread."
  },
  {
    id: "toys",
    standard: "IS 9873:2019",
    name: "Children's Safety Toys",
    hazard: "Toxic Phthalates & Choke Hazards",
    tag: "CHILD SAFETY QCO",
    metric: "Zero Heavy Metals",
    icon: HeartPulse,
    desc: "Enforced mechanical impact resistance, non-toxic lead-free coatings, and total ban on dangerous plasticizers."
  },
  {
    id: "lpg-valves",
    standard: "IS 9798:1995",
    name: "Domestic LPG Regulators",
    hazard: "Gas Leaks & Domestic Blasts",
    tag: "17-BAR TESTED",
    metric: "Positive Shut-Off",
    icon: Award,
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
    code: 'CM/L-8400123',
    title: 'Hawkins Cookers Limited',
    subtitle: 'Domestic Pressure Cooker • IS 2347:2017',
    tag: 'OPERATIVE & VALID'
  });

  const triggerIsiScan = (newIdx) => {
    setIsIsiScanning(true);
    setIsiIdx(newIdx);
    setTimeout(() => setIsIsiScanning(false), 700);
  };

  const triggerHuidScan = (newIdx) => {
    setIsHuidScanning(true);
    setHuidIdx(newIdx);
    setTimeout(() => setIsHuidScanning(false), 700);
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
        const isSeven = /^\d{7}$/.test(clean) || clean.startsWith('CM/L-');
        setQuickStatus({
          checked: true,
          valid: isSeven,
          code: clean.startsWith('CM/L-') ? clean : `CM/L-${clean}`,
          title: isSeven ? 'Bureau of Indian Standards Scheme-I Entry' : 'Non-Conforming Format',
          subtitle: isSeven ? 'Official Gazette Record Synchronized' : 'ISI CM/L must be exactly 7 numeric digits',
          tag: isSeven ? 'RECORD FOUND' : 'FORMAT ERROR'
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
        const isSix = /^[A-Za-z0-9]{6}$/.test(clean);
        setQuickStatus({
          checked: true,
          valid: isSix,
          code: `HUID: ${clean.toUpperCase()}`,
          title: isSix ? 'BIS Assaying & Hallmarking Record' : 'Invalid HUID Format',
          subtitle: isSix ? 'Traceable to Certified AHC Test Center' : 'HUID must be exactly 6 alphanumeric characters',
          tag: isSix ? 'HALLMARK LOGGED' : 'FORMAT ERROR'
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
      delay: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      }
    });

    gsap.from('.verif-card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
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
      className="bg-tech-dotted-white text-black py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-b border-zinc-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full space-y-8 sm:space-y-10">
        
        {/* ========================================================
            01. High-Density Split Header & Interactive Quick Verifier
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Headline, Advisory Banner, & Trust Metrics */}
          <div className="verif-header-content lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>05 — CITIZEN CONSUMER SAFETY & VERIFICATION</span>
              </div>

              <h2 className="editorial-headline text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-black leading-[0.92]">
                UNDERSTAND <br />
                WHAT YOU <br />
                <span className="text-zinc-400">ARE BUYING.</span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed max-w-xl">
                Protect your household against counterfeit goods and karatage fraud. 
                BISmart AI verifies manufacturer licences and gold purity hallmarking 
                directly against the live National Gazette of India.
              </p>
            </div>

            {/* Live Consumer Safety Advisory Notice */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start space-x-3 text-xs text-amber-950">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-mono text-[10px] font-bold text-amber-700 uppercase tracking-widest block">
                  STATUTORY CONSUMER PROTECTION NOTICE
                </span>
                <p className="leading-snug text-zinc-700 text-[11px] sm:text-xs">
                  Helmets (IS 4151), cookers (IS 2347), and packaged drinking water (IS 14543) without a genuine 
                  7-digit CM/L, and gold jewellery without 6-character laser HUID cannot be sold legally in India.
                </p>
              </div>
            </div>

            {/* 3 Key Metric Cells with Hairline Dividers */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-200/80">
              <div className="pr-2">
                <span className="font-mono text-lg sm:text-2xl font-black text-black block leading-none">45,000+</span>
                <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider block mt-1">
                  Active CM/L Licences
                </span>
              </div>
              <div className="px-2 border-l border-zinc-200">
                <span className="font-mono text-lg sm:text-2xl font-black text-black block leading-none">1,650+</span>
                <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider block mt-1">
                  Certified AHC Labs
                </span>
              </div>
              <div className="pl-2 border-l border-zinc-200">
                <span className="font-mono text-lg sm:text-2xl font-black text-black block leading-none">100%</span>
                <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider block mt-1">
                  Gazette Grounded
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Quick Verifier Console */}
          <div id="verif-quick-tool" className="verif-quick-box lg:col-span-5 bg-white border border-zinc-300 rounded-[24px] p-6 sm:p-7 shadow-xs hover:border-black transition-colors flex flex-col justify-between space-y-4">
            
            <div>
              {/* Header with Live Status */}
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-black" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    INSTANT REGISTRY QUERY
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>LIVE API</span>
                </span>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-100 rounded-xl mb-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => switchQuickMode('isi')}
                  className={`py-1.5 px-3 rounded-lg font-bold transition-all text-center cursor-pointer ${
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
                  className={`py-1.5 px-3 rounded-lg font-bold transition-all text-center cursor-pointer ${
                    quickMode === 'huid' 
                      ? 'bg-black text-white shadow-2xs' 
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  6-CHAR GOLD HUID
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleQuickVerify} className="space-y-2.5">
                <div className="relative">
                  <input
                    type="text"
                    value={quickQuery}
                    onChange={(e) => setQuickQuery(e.target.value)}
                    placeholder={quickMode === 'isi' ? "Enter 7-digit CM/L" : "Enter 6-char HUID"}
                    maxLength={quickMode === 'isi' ? 12 : 8}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-mono text-black placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white transition-all uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-lg bg-black text-white hover:bg-zinc-800 font-mono text-xs font-bold uppercase transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>CHECK</span>
                  </button>
                </div>

                {/* Preset Chips */}
                <div className="flex items-center space-x-1.5 text-[10px] font-mono text-zinc-500 overflow-x-auto pb-1">
                  <span className="shrink-0 text-zinc-400">PRESETS:</span>
                  {quickMode === 'isi' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => { setQuickQuery('8400123'); setTimeout(handleQuickVerify, 50); }}
                        className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer whitespace-nowrap"
                      >
                        Cooker (8400123)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setQuickQuery('1294820'); setTimeout(handleQuickVerify, 50); }}
                        className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer whitespace-nowrap"
                      >
                        Water (1294820)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setQuickQuery('7123456'); setTimeout(handleQuickVerify, 50); }}
                        className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer whitespace-nowrap"
                      >
                        Helmet (7123456)
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => { setQuickQuery('AB89K2'); setTimeout(handleQuickVerify, 50); }}
                        className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer whitespace-nowrap"
                      >
                        22K (AB89K2)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setQuickQuery('XY41Q9'); setTimeout(handleQuickVerify, 50); }}
                        className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer whitespace-nowrap"
                      >
                        18K (XY41Q9)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setQuickQuery('X9Y1Z2'); setTimeout(handleQuickVerify, 50); }}
                        className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer whitespace-nowrap"
                      >
                        24K (X9Y1Z2)
                      </button>
                    </>
                  )}
                </div>
              </form>

              {/* Quick Result Feedback Card */}
              {quickStatus.checked && (
                <div className={`mt-3 rounded-xl p-3 border transition-all ${
                  quickStatus.valid 
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
                    : 'bg-red-50/80 border-red-200 text-red-950'
                }`}>
                  <div className="flex items-center justify-between pb-1.5 border-b border-black/5">
                    <div className="flex items-center space-x-1.5 font-mono text-xs font-bold">
                      {quickStatus.valid ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                      <span>{quickStatus.code}</span>
                    </div>
                    <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      quickStatus.valid 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-red-600 text-white'
                    }`}>
                      {quickStatus.tag}
                    </span>
                  </div>
                  <div className="pt-1.5">
                    <p className="font-bold text-xs leading-tight">{quickStatus.title}</p>
                    <p className="text-[11px] opacity-80 mt-0.5 leading-snug">{quickStatus.subtitle}</p>
                  </div>
                </div>
              )}

              {/* Live Certified Registry Telemetry Feed (fills vertical space) */}
              <div className="mt-3 p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1.5 font-mono text-[10px]">
                <div className="flex items-center justify-between text-zinc-500 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>RECENT CITIZEN AUDIT LOG</span>
                  </span>
                  <span className="text-zinc-400">CENTRAL MIRROR</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-zinc-200/60 text-zinc-700">
                  <span className="truncate max-w-[200px] sm:max-w-none">Hawkins Pressure Cooker (IS 2347)</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">CM/L-8400123 ✓</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-zinc-200/60 text-zinc-700">
                  <span className="truncate max-w-[200px] sm:max-w-none">22K 916 Handcrafted Bangle</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">HUID: AA1234 ✓</span>
                </div>
              </div>
            </div>

            {/* Direct Verification Links */}
            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
              <Link 
                to={quickMode === 'isi' ? "/verify-isi" : "/verify-huid"}
                className="text-black font-bold hover:underline flex items-center space-x-1"
              >
                <span>OPEN FULL {quickMode === 'isi' ? "CM/L" : "HUID"} SUITE</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[10px] text-zinc-400">LATENCY &lt; 120ms</span>
            </div>

          </div>
        </div>

        {/* ========================================================
            02. Scroll Choreography: 4 Quadrants of Regulatory Assurance
            ======================================================== */}
        <div className="pt-4 sm:pt-8">
          <ScrollChoreography
            images={CHOREOGRAPHY_IMAGES}
            captions={CHOREOGRAPHY_CAPTIONS}
            badge="05.CHOREOGRAPHY — CITIZEN STATUTORY PROOF MATRIX"
            title="CHOREOGRAPHED REGULATORY PROOFS"
            subtitle="Scroll through the 4 verification quadrants as statutory telemetry converges into the national central authenticity emblem."
          />
        </div>

        {/* ========================================================
            03. Side-by-Side Genuine vs Counterfeit Spotting Guide
            ======================================================== */}
        <div className="bg-white border border-zinc-300 rounded-[28px] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-4">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-1">
                <span className="w-3 h-px bg-zinc-400"></span>
                <span>CONSUMER FRAUD PREVENTION MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
                HOW TO SPOT COUNTERFEIT GOODS & FAKE MARKS
              </h3>
            </div>
            <span className="font-mono text-[11px] text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
              4 Critical Inspection Points
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Guide 1: ISI Mark (Genuine vs Counterfeit) */}
            <div className="border border-zinc-200 rounded-2xl p-5 bg-zinc-50/50 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    ISI MARK (SCHEME-I)
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-500">MANDATORY UNDER QCO</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Genuine */}
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 space-y-2">
                  <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AUTHENTIC MARK</span>
                  </span>
                  <ul className="space-y-1.5 text-zinc-700 text-[11px] leading-snug">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>IS Code above:</strong> Specific standard code printed (e.g. IS 2347)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>7-Digit CM/L below:</strong> Unique numeric licence number</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>Factory Matched:</strong> Exact manufacturer premise on pack</span>
                    </li>
                  </ul>
                </div>

                {/* Counterfeit Red Flags */}
                <div className="bg-red-50/60 border border-red-200 rounded-xl p-3.5 space-y-2">
                  <span className="font-mono text-[10px] font-bold text-red-800 uppercase tracking-wider flex items-center gap-1">
                    <X className="w-3.5 h-3.5 text-red-600" />
                    <span>COMMON RED FLAGS</span>
                  </span>
                  <ul className="space-y-1.5 text-zinc-700 text-[11px] leading-snug">
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>No CM/L:</strong> Only logo without licence number</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Deceptive "ISO 9001":</strong> Management tag disguised as ISI</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Loose Stickers:</strong> Paper stickers peeled off easily</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Guide 2: Gold Hallmark (Genuine vs Counterfeit) */}
            <div className="border border-zinc-200 rounded-2xl p-5 bg-zinc-50/50 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-black" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    GOLD HALLMARKING (IS 1417)
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-500">MANDATORY 6-CHAR HUID</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Genuine */}
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 space-y-2">
                  <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AUTHENTIC 3-STAMP</span>
                  </span>
                  <ul className="space-y-1.5 text-zinc-700 text-[11px] leading-snug">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>BIS Triangle Mark:</strong> Clean triangular emblem of purity</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>Purity & Fineness:</strong> E.g. 22K916, 18K750, 14K585</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>6-Char Laser HUID:</strong> Unique microscopic code (e.g. AB89K2)</span>
                    </li>
                  </ul>
                </div>

                {/* Counterfeit Red Flags */}
                <div className="bg-red-50/60 border border-red-200 rounded-xl p-3.5 space-y-2">
                  <span className="font-mono text-[10px] font-bold text-red-800 uppercase tracking-wider flex items-center gap-1">
                    <X className="w-3.5 h-3.5 text-red-600" />
                    <span>ILLEGAL PRACTICES</span>
                  </span>
                  <ul className="space-y-1.5 text-zinc-700 text-[11px] leading-snug">
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Crude "916 KDM":</strong> Outlawed punch stamp without HUID</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Missing Triangle:</strong> Stamped numbers without BIS logo</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Untraceable HUID:</strong> Not registered on official AHC portal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            03. Dual Interactive Verification Simulators (ISI & Gold)
            ======================================================== */}
        <div className="verif-grid grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: ISI CM/L Verification Simulator */}
          <div className="verif-card bg-white border border-zinc-300 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-black transition-all duration-300 space-y-5">
            <div className="space-y-4">
              
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
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
                <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-black">
                  ISI MARK LICENCE VERIFIER
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mt-1">
                  Validate any 7-digit Certification Marks Licence (CM/L) number to check manufacturer identity, factory premise, and validity status.
                </p>
              </div>

              {/* Sample Switcher Tabs */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest shrink-0">SAMPLES:</span>
                {ISI_SAMPLES.map((s, i) => (
                  <button
                    key={s.cml}
                    onClick={() => triggerIsiScan(i)}
                    className={`font-mono text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
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
              <div className="relative bg-zinc-950 text-white rounded-2xl p-5 font-mono text-xs overflow-hidden border border-zinc-800 shadow-md space-y-3">
                {/* Laser scan line effect */}
                {isIsiScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_#22d3ee] top-0 left-0 right-0 animate-bounce duration-700" />
                )}

                <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800">
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

                <div className="grid grid-cols-2 gap-3 text-[11px]">
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
                    <span className="text-zinc-400">VALIDITY: <strong className={activeIsi.status === 'OPERATIVE' ? "text-cyan-400" : "text-red-400"}>{activeIsi.validUpto}</strong></span>
                    <span className="text-zinc-500">{activeIsi.badge}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button Strip */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-zinc-100">
              <Link
                to="/verify-isi"
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-black text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-all duration-200 group shadow-sm hover:shadow-md"
              >
                <span>Launch Full CM/L Verifier</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[11px] font-mono text-zinc-500 text-right sm:text-left">
                Scheme-I Nationwide Registry
              </span>
            </div>
          </div>

          {/* Card 2: Gold HUID Hallmarking Simulator */}
          <div className="verif-card bg-white border border-zinc-300 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-black transition-all duration-300 space-y-5">
            <div className="space-y-4">
              
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
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
                <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-black">
                  GOLD HUID HALLMARKING
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mt-1">
                  Decode the 6-character laser hallmark to authenticate purity ratios (22K916, 18K750, 14K585) and Assaying & Hallmarking Centre (AHC) test date.
                </p>
              </div>

              {/* Sample Switcher Tabs */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest shrink-0">SAMPLES:</span>
                {HUID_SAMPLES.map((s, i) => (
                  <button
                    key={s.huid}
                    onClick={() => triggerHuidScan(i)}
                    className={`font-mono text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
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
              <div className="relative bg-zinc-950 text-white rounded-2xl p-5 font-mono text-xs overflow-hidden border border-zinc-800 shadow-md space-y-3">
                {/* Laser scan line effect */}
                {isHuidScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_14px_#fbbf24] top-0 left-0 right-0 animate-bounce duration-700" />
                )}

                <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800">
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

                <div className="grid grid-cols-2 gap-3 text-[11px]">
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
                    <span className="text-zinc-400 truncate max-w-[240px] sm:max-w-none">{activeHuid.jeweller}</span>
                    <span className="text-zinc-500">{activeHuid.badge}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button Strip */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-zinc-100">
              <Link
                to="/verify-huid"
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-black text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-all duration-200 group shadow-sm hover:shadow-md"
              >
                <span>Launch Gold Hallmark Verifier</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[11px] font-mono text-zinc-500 text-right sm:text-left">
                Network: 1,650+ Certified AHCs
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            04. Essential Products Requiring Mandatory ISI Marking (8-Item Grid)
            ======================================================== */}
        <div className="space-y-6 pt-4 border-t border-zinc-200">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-1">
                <span className="w-3 h-px bg-zinc-400"></span>
                <span>05.A — STATUTORY MANDATE & CITIZEN PROTECTION</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-black">
                ESSENTIAL PRODUCTS REQUIRING MANDATORY ISI MARKING
              </h3>
            </div>
            <p className="text-xs text-zinc-600 max-w-md font-normal leading-relaxed">
              Under Section 16 of the BIS Act 2016, selling uncertified products in these mandatory categories 
              is a cognizable offence punishable with imprisonment and factory closure.
            </p>
          </div>

          {/* 8 Category High-Density Cards Grid */}
          <div className="verif-categories-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {MANDATORY_SAFETY_CATEGORIES.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <div 
                  key={cat.id}
                  className="verif-category-card bg-white border border-zinc-300 rounded-2xl p-4 sm:p-5 hover:border-black transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                      <div className="flex items-center space-x-1.5">
                        <IconComponent className="w-3.5 h-3.5 text-black" />
                        <span className="font-mono text-[11px] font-bold text-black bg-zinc-100 px-2 py-0.5 rounded">
                          {cat.standard}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] font-bold text-emerald-600 uppercase tracking-wider">
                        {cat.tag}
                      </span>
                    </div>

                    <h4 className="font-black text-sm sm:text-base text-black uppercase tracking-tight group-hover:text-cyan-700 transition-colors">
                      {cat.name}
                    </h4>

                    <p className="text-[11px] sm:text-xs text-zinc-600 font-normal leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-500 text-[10px] uppercase">SAFETY SHIELD:</span>
                    <span className="font-bold text-black text-[10px] sm:text-[11px]">{cat.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            05. 4-Step Citizen Verification & Counterfeit Reporting Protocol
            ======================================================== */}
        <div className="space-y-6 pt-4 border-t border-zinc-200">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-1">
                <span className="w-3 h-px bg-zinc-400"></span>
                <span>05.B — STEP-BY-STEP VERIFICATION PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-black">
                HOW CONSUMERS VERIFY PRODUCTS IN 4 STEPS
              </h3>
            </div>
            <p className="text-xs text-zinc-600 max-w-md font-normal leading-relaxed">
              Verify statutory compliance in under 30 seconds before completing any purchase online or at retail stores.
            </p>
          </div>

          <div className="verif-steps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {VERIFICATION_STEPS.map((s, idx) => (
              <div
                key={s.step}
                className="verif-step-card bg-white border border-zinc-300 rounded-2xl p-5 flex flex-col justify-between hover:border-black transition-all shadow-2xs relative"
              >
                <div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200">
                    <span className="font-mono text-xl sm:text-2xl font-black text-black">
                      {s.step}
                    </span>
                    {idx < 3 && (
                      <ChevronRight className="w-4 h-4 text-zinc-400 hidden lg:block" />
                    )}
                  </div>

                  <h4 className="font-black text-xs sm:text-sm text-black uppercase tracking-wide mt-2.5">
                    {s.title}
                  </h4>

                  <p className="text-[11px] sm:text-xs text-zinc-600 font-normal leading-relaxed mt-1.5">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-zinc-100">
                  <p className="font-mono text-[10px] text-zinc-500 leading-tight">
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            06. Statutory Warnings, Grievance Hotline & Citizen Rights Banner
            ======================================================== */}
        <div className="bg-black text-white rounded-[24px] p-6 sm:p-10 relative overflow-hidden border border-zinc-800 shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Warning Text */}
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>BIS ACT 2016 SECTION 15 & 29 ENFORCEMENT WARNING</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white">
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
            <div className="lg:col-span-4 flex flex-col space-y-2.5">
              <a
                href="tel:1915"
                className="inline-flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-white text-white transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <div className="text-left font-mono">
                    <span className="block text-[9px] text-zinc-400 uppercase">NATIONAL CONSUMER TOLL-FREE</span>
                    <span className="font-black text-xs sm:text-sm text-white">CALL 1915 (NCH HELPLINE)</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
              </a>

              <Link
                to="/assistant"
                className="inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white text-black hover:bg-cyan-400 transition-all font-mono text-xs font-bold uppercase group shadow-md"
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
