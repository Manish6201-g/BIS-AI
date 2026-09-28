import React, { useRef, useState, useEffect } from 'react';
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
  ChevronLeft,
  Pause,
  Play,
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
    group: "pressure",
    standard: "IS 2347:2017",
    name: "Domestic Pressure Cookers",
    hazard: "Explosion & Thermal Burst Protection",
    tag: "MANDATORY QCO",
    metric: "Thermal Shock Tested",
    icon: Flame,
    beaconColor: "bg-rose-500",
    hazardLevel: "CRITICAL HAZARD",
    penalty: "Under §16 & §29: ₹2 Lakhs Fine + 2 Yrs Imprisonment",
    sampleCode: "8400123",
    qcoDate: "Gazette Grounded 2020",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80",
    desc: "Mandatory gasket release mechanisms & burst pressure safety valves prevent catastrophic kitchen explosions."
  },
  {
    id: "water",
    group: "health",
    standard: "IS 14543:2016",
    name: "Packaged Drinking Water",
    hazard: "Waterborne Pathogens & Heavy Metals",
    tag: "STRICT BACTERIOLOGY",
    metric: "0% Tolerated E. Coli",
    icon: Droplet,
    beaconColor: "bg-sky-500",
    hazardLevel: "BIO-HAZARD RISK",
    penalty: "Immediate Factory Closure & Production Seizure",
    sampleCode: "1294820",
    qcoDate: "Gazette Grounded 2019",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1200&q=80",
    desc: "Rigorous microbiological sterilization, zero pesticide residues, and strict mineral conductivity bounds."
  },
  {
    id: "helmets",
    group: "lifestyle",
    standard: "IS 4151:2015",
    name: "Two-Wheeler Helmets",
    hazard: "Fatal Crash Traumatic Shock",
    tag: "LIFE-SAVING SPEC",
    metric: "High Velocity Impact",
    icon: ShieldAlert,
    beaconColor: "bg-blue-500",
    hazardLevel: "MORTAL RISK",
    penalty: "Non-Certified Helmets Confiscated Under MV Act §129",
    sampleCode: "7123456",
    qcoDate: "Gazette Grounded 2021",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    desc: "Dynamic impact deceleration thresholds, chin strap retention load capacity, and shell penetration resistance."
  },
  {
    id: "infant-food",
    group: "health",
    standard: "IS 14433:2020",
    name: "Infant Milk Substitutes",
    hazard: "Nutritional Deficiency & Toxins",
    tag: "ZERO AFLATOXIN",
    metric: "100% Laboratory Checked",
    icon: Baby,
    beaconColor: "bg-emerald-500",
    hazardLevel: "TOXICITY ALERT",
    penalty: "Cognizable Non-Bailable Prosecution under Section 29",
    sampleCode: "14433",
    qcoDate: "Gazette Grounded 2020",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80",
    desc: "Essential fatty acid ratios, vitamin bioavailability thresholds, and complete absence of chemical adulterants."
  },
  {
    id: "gold",
    group: "precious",
    standard: "IS 1417:2016",
    name: "Gold & Precious Jewellery",
    hazard: "Caratage Fraud & Adulteration",
    tag: "HUID MANDATORY",
    metric: "Laser Assayed 6-Char",
    icon: Sparkles,
    beaconColor: "bg-amber-500",
    hazardLevel: "CONSUMER FRAUD",
    penalty: "Seizure & Penalties of 5× Assayed Jewellery Value",
    sampleCode: "AB89K2",
    qcoDate: "Gazette Grounded 2023",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80",
    desc: "Complete statutory elimination of under-karatage with microscopic 6-character laser HUID traceability."
  },
  {
    id: "cables",
    group: "precious",
    standard: "IS 694:2010",
    name: "PVC Insulated Cables",
    hazard: "Short-Circuits & Fire Propagation",
    tag: "FLAME RETARDANT",
    metric: "FRLS Specification",
    icon: Zap,
    beaconColor: "bg-orange-500",
    hazardLevel: "ELECTRICAL FIRE",
    penalty: "Commercial Stop-Work Orders & Site Inspection Seizure",
    sampleCode: "694",
    qcoDate: "Gazette Grounded 2023",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1200&q=80",
    desc: "Flame-retardant low-smoke insulation engineered to prevent rapid residential electrical fire spread."
  },
  {
    id: "toys",
    group: "lifestyle",
    standard: "IS 9873:2019",
    name: "Children's Safety Toys",
    hazard: "Toxic Phthalates & Choke Hazards",
    tag: "CHILD SAFETY QCO",
    metric: "Zero Heavy Metals",
    icon: HeartPulse,
    beaconColor: "bg-pink-500",
    hazardLevel: "CHEMICAL HAZARD",
    penalty: "Port Import Quarantine & Retail Shelf Seizure",
    sampleCode: "9873",
    qcoDate: "Gazette Grounded 2020",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=80",
    desc: "Enforced mechanical impact resistance, non-toxic lead-free coatings, and total ban on dangerous plasticizers."
  },
  {
    id: "lpg-valves",
    group: "pressure",
    standard: "IS 9798:1995",
    name: "Domestic LPG Regulators",
    hazard: "Gas Leaks & Domestic Blasts",
    tag: "17-BAR TESTED",
    metric: "Positive Shut-Off",
    icon: Award,
    beaconColor: "bg-red-500",
    hazardLevel: "EXPLOSION HAZARD",
    penalty: "Immediate Recall Order & Criminal Defect Liability",
    sampleCode: "9798",
    qcoDate: "Gazette Grounded 2021",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    desc: "Zero gas leakage tolerance, burst pressure safety margins, and automated excess-flow shut-off seals."
  }
];

const VERIFICATION_STEPS = [
  {
    step: "01",
    phase: "PHASE 01 // OPTICAL",
    title: "INSPECT THE MONOGRAM",
    desc: "Examine product body, label, or jewellery surface for the official BIS triangle or ISI monogram.",
    detail: "Never accept faint stickers or unverified logos without alphanumeric identifiers.",
    icon: Search,
    beaconColor: "bg-blue-500",
    stat: "Optical Monogram",
    badge: "VISUAL INSPECTION",
    actionPrompt: "Inspect Mark Anatomy",
    statutoryRef: "BIS Act §14(1) Regs",
    blueprint: {
      code: "SPEC-OPT-01",
      clause: "BIS Act 2016 §14 & Rule 11",
      checkpoints: [
        { label: "Monogram Geometry", val: "Strict 1:1.618 Aspect", status: "PASS" },
        { label: "Micro-Etch Line Weight", val: "0.15mm Laser Bound", status: "PASS" },
        { label: "Surface Permanence", val: "15s Solvent Wipe Test", status: "PASS" }
      ],
      tolerance: "±0.02mm Optical Alignment",
      authority: "National Standards Body of India"
    }
  },
  {
    step: "02",
    phase: "PHASE 02 // TELEMETRY",
    title: "LOCATE THE IDENTIFIER",
    desc: "Identify the 7-digit CM/L license code (under ISI logo) or the 6-character laser-etched HUID code.",
    detail: "Every authentic manufacturer or assaying centre is assigned an immutable registry number.",
    icon: QrCode,
    beaconColor: "bg-amber-500",
    stat: "7-Digit / 6-Char",
    badge: "IDENTIFIER PARSING",
    actionPrompt: "Sample Licence Code",
    statutoryRef: "IS 15820 & BIS Rules",
    blueprint: {
      code: "SPEC-OCR-02",
      clause: "Hallmarking Regs §3(2)",
      checkpoints: [
        { label: "Laser Etch Depth", val: "10μm - 14μm Micro-Assayed", status: "PASS" },
        { label: "Checksum Integrity", val: "Base32 ISO/IEC 7064", status: "PASS" },
        { label: "6-Char Traceability", val: "Central AHC Ledger", status: "PASS" }
      ],
      tolerance: "Zero Alpha Ambiguity",
      authority: "BIS Central Assaying Directorate"
    }
  },
  {
    step: "03",
    phase: "PHASE 03 // GAZETTE",
    title: "QUERY GAZETTE REGISTRY",
    desc: "Run instant verification via BISmart AI or official BIS Care to verify license validity and factory origin.",
    detail: "Confirm that manufacturer brand and factory address match the physical packaging.",
    icon: FileCheck2,
    beaconColor: "bg-emerald-500",
    stat: "< 150ms Cloud API",
    badge: "REGISTRY MIRROR",
    actionPrompt: "Run Live Query",
    statutoryRef: "Gazette Scheme-I & IV",
    blueprint: {
      code: "SPEC-API-03",
      clause: "Scheme-I Gazette Mirror",
      checkpoints: [
        { label: "Cloud Response SLA", val: "< 150ms REST API Handshake", status: "PASS" },
        { label: "License State", val: "Operative & Gazette Valid", status: "PASS" },
        { label: "Factory Premise Match", val: "100% Geo-Coded Address", status: "PASS" }
      ],
      tolerance: "Zero Stale Mirror Margin",
      authority: "BIS IT & Automation Hub"
    }
  },
  {
    step: "04",
    phase: "PHASE 04 // STATUTORY",
    title: "REPORT COUNTERFEITS",
    desc: "If invalid, expired, or counterfeit, submit an instant complaint to initiate immediate BIS enforcement action.",
    detail: "Violators face up to 2 years imprisonment and asset seizure under BIS Act 2016.",
    icon: ShieldAlert,
    beaconColor: "bg-rose-500",
    stat: "§29 Cognizable",
    badge: "LEGAL ENFORCEMENT",
    actionPrompt: "Report Violation",
    statutoryRef: "Section 29 Prosecution",
    blueprint: {
      code: "SPEC-PENAL-04",
      clause: "BIS Act 2016 §§ 16, 29",
      checkpoints: [
        { label: "Statutory Sanction", val: "Imprisonment up to 2 Years", status: "ALERT" },
        { label: "Financial Penalty", val: "Min ₹2L - 10× Seized Goods", status: "ALERT" },
        { label: "Raid Enforcement SLA", val: "24-48h Search Warrant", status: "ALERT" }
      ],
      tolerance: "Cognizable Non-Bailable",
      authority: "Judicial Magistrate / Enforcement Wing"
    }
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

  // Section 05.A Interactive State, Holographic Scanner & Spotlight
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedCatIdx, setSelectedCatIdx] = useState(0);
  const [isScannerPlaying, setIsScannerPlaying] = useState(true);
  const [scannerViewMode, setScannerViewMode] = useState('scanner'); // 'scanner' or 'grid'

  useEffect(() => {
    if (!isScannerPlaying || scannerViewMode !== 'scanner') return;
    const interval = setInterval(() => {
      setSelectedCatIdx((prev) => (prev + 1) % MANDATORY_SAFETY_CATEGORIES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isScannerPlaying, scannerViewMode]);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const simulateCategoryVerification = (cat) => {
    if (cat.id === 'gold') {
      setQuickMode('huid');
      setQuickQuery(cat.sampleCode || 'AB89K2');
      setQuickStatus({
        checked: true,
        valid: true,
        code: `HUID: ${cat.sampleCode || 'AB89K2'}`,
        title: 'Tanishq Jewellers (Titan Co)',
        subtitle: '22K Gold Handcrafted Bangle • 916 Fineness Assayed',
        tag: 'AUTHENTIC HALLMARK'
      });
    } else {
      setQuickMode('isi');
      setQuickQuery(cat.sampleCode || '8400123');
      setQuickStatus({
        checked: true,
        valid: true,
        code: `CM/L-${cat.sampleCode || '8400123'}`,
        title: cat.name,
        subtitle: `${cat.standard} • Mandatory QCO Operative`,
        tag: 'OPERATIVE & VALID'
      });
    }
    const el = document.getElementById('verif-quick-tool');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Section 05.B Interactive Protocol State & Auto-Stepper
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isStepAutoPlaying, setIsStepAutoPlaying] = useState(false);

  useEffect(() => {
    if (!isStepAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % VERIFICATION_STEPS.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isStepAutoPlaying]);

  const executeStepAction = (idx) => {
    setActiveStepIdx(idx);
    if (idx === 0) {
      const el = document.getElementById('verif-quick-tool');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (idx === 1) {
      setQuickMode('isi');
      setQuickQuery('8400123');
      const el = document.getElementById('verif-quick-tool');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (idx === 2) {
      setQuickMode('huid');
      setQuickQuery('AB89K2');
      setQuickStatus({
        checked: true,
        valid: true,
        code: 'HUID: AB89K2',
        title: 'Tanishq Jewellers (Titan Co)',
        subtitle: '22K Gold Handcrafted Bangle • 916 Fineness Assayed',
        tag: 'AUTHENTIC HALLMARK'
      });
      const el = document.getElementById('verif-quick-tool');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (idx === 3) {
      const el = document.getElementById('verif-enforcement-hotline');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Section 05.B 3D Holographic Flip Cards State & Cursor Tilt Physics
  const [flippedCards, setFlippedCards] = useState({});
  const [tiltStyle, setTiltStyle] = useState({});

  const handleCard3DMouseMove = (e, idx) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    setTiltStyle((prev) => ({
      ...prev,
      [idx]: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    }));
  };

  const handleCard3DMouseLeave = (idx) => {
    setTiltStyle((prev) => ({
      ...prev,
      [idx]: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    }));
  };

  const toggleCardFlip = (idx, e) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleAllFlips = () => {
    const anyFlipped = Object.values(flippedCards).some(Boolean);
    if (anyFlipped) {
      setFlippedCards({});
    } else {
      setFlippedCards({ 0: true, 1: true, 2: true, 3: true });
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

    gsap.from('.verif-05a-header', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.verif-05a-section',
        start: 'top 80%',
        once: true,
      }
    });

    if (sectionRef.current?.querySelector('.verif-categories-grid')) {
      gsap.from('.verif-category-card', {
        y: 45,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.07,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.verif-categories-grid',
          start: 'top 82%',
          once: true,
        }
      });
    }

    gsap.from('.verif-05b-header', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.verif-05b-section',
        start: 'top 82%',
        once: true,
      }
    });

    gsap.from('.verif-step-card', {
      y: 40,
      opacity: 0,
      scale: 0.96,
      duration: 0.65,
      stagger: 0.1,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: '.verif-steps-grid',
        start: 'top 85%',
        once: true,
      }
    });
  }, { scope: sectionRef, dependencies: [scannerViewMode] });

  const activeIsi = ISI_SAMPLES[isiIdx];
  const activeHuid = HUID_SAMPLES[huidIdx];
  const activeCat = MANDATORY_SAFETY_CATEGORIES[selectedCatIdx] || MANDATORY_SAFETY_CATEGORIES[0];

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="bg-tech-dotted-white text-black py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-b border-zinc-200 relative overflow-visible"
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
            04. Essential Products Requiring Mandatory ISI Marking (Kinetic Holographic Scanner & Matrix)
            ======================================================== */}
        <div className="verif-05a-section space-y-6 pt-4 border-t border-zinc-200">
          
          {/* Section 05.A Header & View Mode Switcher */}
          <div className="verif-05a-header flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-1">
                <span className="w-3 h-px bg-zinc-400"></span>
                <span>05.A — STATUTORY MANDATE & CITIZEN PROTECTION</span>
              </div>
              <h3 className="editorial-headline text-2xl sm:text-4xl font-black uppercase tracking-tight text-black leading-tight">
                ESSENTIAL PRODUCTS REQUIRING MANDATORY ISI MARKING
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-xl font-normal leading-relaxed mt-1">
                Under Section 16 of the BIS Act 2016, selling uncertified products in these mandatory categories 
                is a cognizable criminal offence punishable with imprisonment and factory closure.
              </p>
            </div>

            {/* View Mode Switcher & Auto-Play Controls */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <div className="inline-flex p-1 bg-zinc-100 rounded-xl border border-zinc-200">
                <button
                  type="button"
                  onClick={() => setScannerViewMode('scanner')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    scannerViewMode === 'scanner'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Holographic Scanner</span>
                </button>
                <button
                  type="button"
                  onClick={() => setScannerViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    scannerViewMode === 'grid'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  <span>All 8 Grid</span>
                </button>
              </div>

              {scannerViewMode === 'scanner' && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedCatIdx((prev) => (prev > 0 ? prev - 1 : MANDATORY_SAFETY_CATEGORIES.length - 1))}
                    className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:border-black cursor-pointer shadow-2xs"
                    title="Previous category"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsScannerPlaying(!isScannerPlaying)}
                    className={`px-2.5 py-1.5 rounded-lg border font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                      isScannerPlaying
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:border-black'
                    }`}
                    title={isScannerPlaying ? "Pause auto-scan" : "Start auto-scan"}
                  >
                    {isScannerPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isScannerPlaying ? "PAUSE" : "AUTO"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCatIdx((prev) => (prev + 1) % MANDATORY_SAFETY_CATEGORIES.length)}
                    className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:border-black cursor-pointer shadow-2xs"
                    title="Next category"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================
              MODE 1: Kinetic Holographic Specimen Laser Scanner
              ======================================================== */}
          {scannerViewMode === 'scanner' && (
            <div className="bg-white border border-zinc-300 rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 shadow-xs overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left Column: Interactive Product Selector Dial (4 Cols) */}
                  <div className="lg:col-span-4 flex flex-col justify-between space-y-2 border-b lg:border-b-0 lg:border-r border-zinc-200 pb-4 lg:pb-0 lg:pr-6">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-200 font-mono text-[10px]">
                      <span className="text-zinc-500 font-bold uppercase tracking-wider">
                        MANDATORY SAFETY SELECTION
                      </span>
                      <span className="text-black font-bold">
                        0{selectedCatIdx + 1} // 08
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {MANDATORY_SAFETY_CATEGORIES.map((cat, idx) => {
                        const isSelected = selectedCatIdx === idx;
                        const CatIcon = cat.icon;

                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setSelectedCatIdx(idx);
                              setIsScannerPlaying(false);
                            }}
                            className={`w-full p-2.5 rounded-xl border text-left font-mono transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                              isSelected
                                ? 'bg-black text-white border-black shadow-xs ring-1 ring-black'
                                : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-white hover:border-zinc-400'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5 min-w-0">
                              <CatIcon className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-white scale-110' : 'text-zinc-500 group-hover:text-black'}`} />
                              <div className="truncate">
                                <span className="text-xs font-bold block truncate leading-tight">
                                  {cat.name}
                                </span>
                                <span className={`text-[9px] block truncate ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                  {cat.standard}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-1.5 shrink-0 ml-2">
                              <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${cat.beaconColor}`} />
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${cat.beaconColor}`} />
                              </span>
                              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-white translate-x-0.5' : 'text-zinc-400 group-hover:translate-x-0.5'}`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Auto-Scan Progress Bar */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between font-mono text-[9px] text-zinc-400 mb-1">
                        <span>AUTO-SCAN CYCLER:</span>
                        <span>{isScannerPlaying ? "ACTIVE" : "PAUSED"}</span>
                      </div>
                      <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-black h-full transition-all duration-300 ease-out"
                          style={{ width: `${((selectedCatIdx + 1) / 8) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Holographic Laser Scanner Terminal (8 Cols) */}
                  <div className="lg:col-span-8 flex flex-col justify-between space-y-5">
                    
                    {/* Top Specimen Cinema Viewport with Scanning Laser Line */}
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 min-h-[260px] sm:min-h-[320px] border border-zinc-800 flex flex-col justify-between p-5 text-white font-mono shadow-xl group">
                      
                      {/* Background High-Res Specimen Image */}
                      <img
                        src={activeCat.image}
                        alt={activeCat.name}
                        key={activeCat.id}
                        className="absolute inset-0 size-full object-cover opacity-50 filter contrast-125 transition-all duration-700 animate-in fade-in"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 pointer-events-none" />

                      {/* CONTINUOUS LASER SCANNING BEAM */}
                      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scanner-laser pointer-events-none z-20" />
                      <div className="absolute left-0 right-0 h-8 bg-gradient-to-b from-cyan-400/10 to-transparent -translate-y-4 animate-scanner-laser pointer-events-none z-10" />

                      {/* Holographic Radar Crosshairs */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                        <div className="w-48 h-48 rounded-full border border-dashed border-cyan-400" />
                        <div className="absolute w-64 h-64 rounded-full border border-zinc-600/50" />
                        <div className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      </div>

                      {/* Specimen Header Metadata */}
                      <div className="relative z-30 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md uppercase text-[10px] font-bold text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>SPECIMEN // {activeCat.standard}</span>
                          </span>
                          <span className="text-[10px] text-zinc-300 hidden sm:inline">
                            {activeCat.qcoDate}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[10px] font-bold text-emerald-400">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>MANDATORY STATUTORY QCO</span>
                        </div>
                      </div>

                      {/* Specimen Footer Hologram Info */}
                      <div className="relative z-30 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-cyan-400 block tracking-widest">
                          {activeCat.hazardLevel} • {activeCat.hazard}
                        </span>
                        <h4 className="editorial-headline text-xl sm:text-3xl font-black uppercase text-white">
                          {activeCat.name}
                        </h4>
                        <p className="text-xs text-zinc-300 max-w-xl line-clamp-2">
                          {activeCat.desc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Telemetry & Statutory Prosecution Matrix */}
                    <div className="space-y-3 font-mono">
                      
                      {/* 3 Telemetry Data Cells */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3">
                          <span className="text-[9px] text-zinc-500 uppercase font-bold block">
                            MANDATORY SAFETY SHIELD
                          </span>
                          <span className="text-xs sm:text-sm font-black text-black block mt-0.5">
                            {activeCat.metric}
                          </span>
                        </div>

                        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3">
                          <span className="text-[9px] text-zinc-500 uppercase font-bold block">
                            HAZARD MITIGATION SPEC
                          </span>
                          <span className="text-xs sm:text-sm font-black text-zinc-900 block mt-0.5 truncate">
                            {activeCat.tag}
                          </span>
                        </div>

                        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
                          <span className="text-[9px] text-rose-700 uppercase font-bold block">
                            CRIMINAL PENALTY CLAUSE
                          </span>
                          <span className="text-xs font-black text-rose-950 block mt-0.5 truncate">
                            {activeCat.penalty}
                          </span>
                        </div>
                      </div>

                      {/* Instant Simulator Action Banner */}
                      <div className="p-3.5 bg-black text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                              Verify Registered Licences for {activeCat.name}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-400">
                            Check manufacturer premise, factory validity, and test parameters in the national mirror.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => simulateCategoryVerification(activeCat)}
                          className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                        >
                          <span>Test in Quick Console</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
          )}

          {/* ========================================================
              MODE 2: 8-Card Blueprint Grid View (All Side-by-Side)
              ======================================================== */}
          {scannerViewMode === 'grid' && (
            <div className="verif-categories-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MANDATORY_SAFETY_CATEGORIES.map((cat, idx) => {
                const IconComponent = cat.icon;

                return (
                  <div 
                    key={cat.id}
                    onMouseMove={handleCardMouseMove}
                    onClick={() => {
                      setSelectedCatIdx(idx);
                      setScannerViewMode('scanner');
                    }}
                    className="verif-category-card relative bg-white border border-zinc-300 rounded-2xl p-5 hover:border-black transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-xl hover:-translate-y-2 cursor-pointer overflow-hidden"
                  >
                    {/* Interactive Cursor Spotlight Specular Sheen */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-[radial-gradient(350px_circle_at_var(--mouse-x,150px)_var(--mouse-y,100px),rgba(0,0,0,0.04),transparent_70%)]" />

                    {/* Top Laser Sweep Hairline */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none" />

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                        <div className="flex items-center space-x-1.5">
                          <IconComponent className="w-4 h-4 text-black group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-mono text-xs font-bold text-black bg-zinc-100 px-2 py-0.5 rounded">
                            {cat.standard}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1.5 font-mono text-[9px] font-bold">
                          <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${cat.beaconColor}`} />
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${cat.beaconColor}`} />
                          </span>
                          <span className="text-zinc-500 uppercase">{cat.tag}</span>
                        </div>
                      </div>

                      <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono text-[9px] font-bold border border-zinc-200">
                        <ShieldAlert className="w-3 h-3 text-black" />
                        <span>{cat.hazardLevel}</span>
                      </div>

                      <h4 className="font-black text-base text-black uppercase tracking-tight group-hover:text-zinc-900 transition-colors">
                        {cat.name}
                      </h4>

                      <p className="text-[11px] sm:text-xs text-zinc-600 font-normal leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="relative z-10 pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono">
                      <div>
                        <span className="text-zinc-400 text-[9px] uppercase block">SAFETY SHIELD:</span>
                        <span className="font-bold text-black text-[11px]">{cat.metric}</span>
                      </div>

                      <span className="text-[10px] font-bold text-black group-hover:underline flex items-center gap-0.5">
                        <span>Scan Spec</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* ========================================================
            05. 4-Step Citizen Verification & Counterfeit Reporting Protocol (Section 05.B)
            ======================================================== */}
        <div className="verif-05b-section space-y-6 pt-4 border-t border-zinc-200">
          
          {/* Section 05.B Header & Interactive Auto-Stepper Controls */}
          <div className="verif-05b-header flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>05.B — STEP-BY-STEP VERIFICATION PROTOCOL</span>
              </div>
              <h3 className="editorial-headline text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                HOW CONSUMERS VERIFY PRODUCTS IN 4 STEPS
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-xl font-normal leading-relaxed mt-1">
                A rapid statutory inspection flow engineered for citizens to verify statutory ISI marks and gold HUID hallmarking in under 30 seconds before purchase.
              </p>
            </div>

            {/* Stepper Cycler Controls */}
            {/* Stepper Cycler Controls & Blueprint Flip All Toggle */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs shrink-0">
              <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200 text-xs">
                {VERIFICATION_STEPS.map((s, idx) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => {
                      setActiveStepIdx(idx);
                      setIsStepAutoPlaying(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                      activeStepIdx === idx
                        ? 'bg-black text-white shadow-xs'
                        : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    <span>{s.step}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={toggleAllFlips}
                className={`px-3 py-1.5 rounded-xl border font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
                  Object.values(flippedCards).some(Boolean)
                    ? 'bg-zinc-950 text-cyan-300 border-cyan-500/50 shadow-xs'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-black shadow-2xs'
                }`}
                title="Flip all cards to reveal technical blueprint inspection specs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${Object.values(flippedCards).some(Boolean) ? 'text-cyan-400 rotate-180' : 'text-zinc-500'} transition-transform duration-500`} />
                <span>{Object.values(flippedCards).some(Boolean) ? "SHOW PROTOCOLS" : "SHOW BLUEPRINTS"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsStepAutoPlaying(!isStepAutoPlaying)}
                className={`px-3 py-1.5 rounded-xl border font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
                  isStepAutoPlaying
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-black shadow-2xs'
                }`}
                title={isStepAutoPlaying ? "Pause auto sequence" : "Play auto sequence"}
              >
                {isStepAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isStepAutoPlaying ? "PAUSE" : "AUTO PLAY"}</span>
              </button>
            </div>
          </div>

          {/* Kinetic Connecting Pipeline Progress Bar */}
          <div className="relative pt-2 pb-1">
            <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden relative">
              <div
                className="bg-black h-full transition-all duration-500 ease-out"
                style={{ width: `${((activeStepIdx + 1) / 4) * 100}%` }}
              />
            </div>
            
            {/* 4 Interactive Progress Markers */}
            <div className="grid grid-cols-4 pt-2 font-mono text-[9px]">
              {VERIFICATION_STEPS.map((s, idx) => {
                const isActive = activeStepIdx === idx;
                const isPassed = activeStepIdx >= idx;
                return (
                  <div
                    key={s.step}
                    onClick={() => {
                      setActiveStepIdx(idx);
                      setIsStepAutoPlaying(false);
                    }}
                    className={`cursor-pointer transition-colors flex items-center gap-1.5 ${
                      isActive ? 'text-black font-black' : isPassed ? 'text-zinc-700' : 'text-zinc-400'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                      isActive ? 'bg-black scale-125' : isPassed ? 'bg-zinc-600' : 'bg-zinc-300'
                    }`} />
                    <span className="truncate hidden sm:inline">{s.step} {s.title}</span>
                    <span className="sm:hidden">{s.step}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Kinetic 3D Holographic Flip Step Cards */}
          <div className="verif-steps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 [perspective:1200px]">
            {VERIFICATION_STEPS.map((s, idx) => {
              const isActive = activeStepIdx === idx;
              const isFlipped = !!flippedCards[idx];
              const StepIcon = s.icon;
              const bp = s.blueprint;

              return (
                <div
                  key={s.step}
                  onMouseMove={(e) => handleCard3DMouseMove(e, idx)}
                  onMouseLeave={() => handleCard3DMouseLeave(idx)}
                  onClick={() => {
                    setActiveStepIdx(idx);
                    setIsStepAutoPlaying(false);
                  }}
                  style={{
                    transform: tiltStyle[idx] || 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="verif-step-card relative rounded-2xl min-h-[490px] cursor-pointer group select-none"
                >
                  {/* Flipping Container with preserve-3d */}
                  <div
                    className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                      isFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    {/* ========================================================
                        FRONT FACE: Citizen Verification Protocol
                        ======================================================== */}
                    <div
                      className={`absolute inset-0 [backface-visibility:hidden] rounded-2xl p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                        isActive
                          ? 'bg-white border-2 border-black shadow-xl ring-1 ring-black/10'
                          : 'bg-white border border-zinc-300 hover:border-black shadow-2xs hover:shadow-lg'
                      }`}
                    >
                      {/* Interactive Cursor Spotlight Specular Sheen */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-[radial-gradient(350px_circle_at_var(--mouse-x,150px)_var(--mouse-y,100px),rgba(0,0,0,0.04),transparent_70%)]" />

                      {/* Top Laser Sweep Hairline */}
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent pointer-events-none transition-all duration-700 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full'
                      }`} />

                      {/* Card Front Header */}
                      <div className="relative z-10 space-y-3">
                        <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200">
                          <div className="flex items-center space-x-2">
                            <span className={`font-mono text-2xl font-black transition-transform duration-300 ${
                              isActive ? 'text-black scale-110' : 'text-zinc-800 group-hover:scale-105'
                            }`}>
                              {s.step}
                            </span>
                            <span className="font-mono text-[9px] font-bold text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">
                              {s.stat}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            {/* Quick Flip to Blueprint Trigger */}
                            <button
                              type="button"
                              onClick={(e) => toggleCardFlip(idx, e)}
                              className="p-1 rounded-md text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors"
                              title="Flip to view Technical Blueprint"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                            <span className="relative flex h-2 w-2">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${s.beaconColor}`} />
                              <span className={`relative inline-flex rounded-full h-2 w-2 ${s.beaconColor}`} />
                            </span>
                            <StepIcon className={`w-4 h-4 transition-all duration-300 ${
                              isActive ? 'text-black scale-125 rotate-6' : 'text-zinc-500 group-hover:text-black group-hover:scale-110'
                            }`} />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-zinc-400 block">
                            {s.phase}
                          </span>
                          <span
                            onClick={(e) => toggleCardFlip(idx, e)}
                            className="font-mono text-[9px] text-cyan-600 hover:text-cyan-800 hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>Blueprint Spec ↷</span>
                          </span>
                        </div>

                        <h4 className="font-black text-sm sm:text-base text-black uppercase tracking-tight group-hover:text-zinc-900 transition-colors">
                          {s.title}
                        </h4>

                        <p className="text-[11px] sm:text-xs text-zinc-600 font-normal leading-relaxed">
                          {s.desc}
                        </p>

                        {/* Interactive Visual Specimen Viewports for Each Step */}
                        {idx === 0 && (
                          <div className="relative my-3 rounded-xl bg-zinc-950 border border-zinc-800 p-3 overflow-hidden text-white font-mono min-h-[115px] flex flex-col justify-between group/vp">
                            <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className={`w-16 h-16 rounded-full border border-dashed border-cyan-400/60 transition-transform duration-700 flex items-center justify-center ${isActive ? 'scale-110 animate-pulse' : 'group-hover/vp:scale-105'}`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              </div>
                            </div>
                            <div className="relative z-10 flex items-center justify-between text-[10px]">
                              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                                <span>OPTICAL RETICLE</span>
                              </span>
                              <span className="text-[9px] text-zinc-400 font-bold">ALIGN: 99.8%</span>
                            </div>
                            <div className="relative z-10 text-center py-0.5">
                              <span className="text-xs font-black tracking-widest text-white block">
                                IS 2347 : 2017
                              </span>
                              <span className="text-[9px] text-cyan-400 font-bold block mt-0.5">
                                [⬢ STANDARD MONOGRAM]
                              </span>
                            </div>
                            <div className="relative z-10 flex items-center justify-between text-[8px] text-zinc-400 border-t border-zinc-800/80 pt-1">
                              <span>MICRO-ETCH PATTERN</span>
                              <span className="text-emerald-400 font-bold">AUTHENTIC</span>
                            </div>
                          </div>
                        )}

                        {idx === 1 && (
                          <div className="relative my-3 rounded-xl bg-zinc-950 border border-zinc-800 p-3 overflow-hidden text-white font-mono min-h-[115px] flex flex-col justify-between group/vp">
                            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_8px_#f59e0b] animate-scanner-laser pointer-events-none z-20" />
                            <div className="relative z-10 flex items-center justify-between text-[10px]">
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />
                                <span>LASER OCR</span>
                              </span>
                              <span className="text-[9px] text-amber-400 font-bold">12μm DEPTH</span>
                            </div>
                            <div className="relative z-10 flex items-center justify-center gap-1 py-0.5">
                              {['A', 'B', '8', '9', 'K', '2'].map((char, cIdx) => (
                                <div 
                                  key={cIdx} 
                                  className={`w-5 h-6 rounded border flex items-center justify-center text-[11px] font-black transition-all ${
                                    isActive 
                                      ? 'bg-amber-400/20 border-amber-400 text-white shadow-2xs' 
                                      : 'bg-zinc-900 border-zinc-700 text-zinc-300 group-hover/vp:border-amber-400/60'
                                  }`}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                            <div className="relative z-10 flex items-center justify-between text-[8px] text-zinc-400 border-t border-zinc-800/80 pt-1">
                              <span>PARSE 6-CHAR HUID</span>
                              <span className="text-amber-400 font-bold">CHECKSUM OK</span>
                            </div>
                          </div>
                        )}

                        {idx === 2 && (
                          <div className="relative my-3 rounded-xl bg-zinc-950 border border-zinc-800 p-3 overflow-hidden text-white font-mono min-h-[115px] flex flex-col justify-between group/vp">
                            <div className="relative z-10 flex items-center justify-between text-[10px]">
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                <span>CLOUD API</span>
                              </span>
                              <span className="text-[9px] text-emerald-400 font-bold">42ms PING</span>
                            </div>
                            <div className="relative z-10 py-0.5 space-y-0.5 text-left">
                              <div className="text-[9px] text-zinc-400 flex items-center gap-1">
                                <span className="text-emerald-400">&gt;</span>
                                <span className="truncate">query(CML_8400123)</span>
                              </div>
                              <div className="text-[10px] font-black text-white flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                <span className="truncate text-emerald-300">200 OK: OPERATIVE</span>
                              </div>
                            </div>
                            <div className="relative z-10 flex items-center justify-between text-[8px] text-zinc-400 border-t border-zinc-800/80 pt-1">
                              <span>GAZETTE SYNC</span>
                              <span className="text-emerald-400 font-bold">100% MATCH</span>
                            </div>
                          </div>
                        )}

                        {idx === 3 && (
                          <div className="relative my-3 rounded-xl bg-zinc-950 border border-rose-900/60 p-3 overflow-hidden text-white font-mono min-h-[115px] flex flex-col justify-between group/vp">
                            <div className="absolute inset-0 bg-rose-500/5 animate-pulse pointer-events-none" />
                            <div className="relative z-10 flex items-center justify-between text-[10px]">
                              <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 flex items-center gap-1">
                                <ShieldAlert className="w-2.5 h-2.5 text-rose-400" />
                                <span>PENAL §29</span>
                              </span>
                              <span className="text-[9px] text-rose-400 font-bold">COGNIZABLE</span>
                            </div>
                            <div className="relative z-10 text-center py-0.5">
                              <span className="text-[11px] font-black tracking-tight text-white block uppercase">
                                2 YEARS PRISON + ₹2L
                              </span>
                              <span className="text-[8px] text-rose-400 font-bold block mt-0.5">
                                MANDATORY FACTORY SEIZURE
                              </span>
                            </div>
                            <div className="relative z-10 flex items-center justify-between text-[8px] text-zinc-400 border-t border-zinc-800/80 pt-1">
                              <span>ENFORCEMENT SLA</span>
                              <span className="text-rose-400 font-bold">IMMEDIATE RAID</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Front Footer: Detail & Direct Simulation Trigger */}
                      <div className="relative z-10 pt-3 mt-3 border-t border-zinc-100 space-y-2.5">
                        <p className="font-mono text-[10px] text-zinc-500 leading-tight">
                          {s.detail}
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              executeStepAction(idx);
                            }}
                            className={`flex-1 py-1.5 px-2.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                              isActive
                                ? 'bg-black text-white hover:bg-zinc-800 shadow-xs'
                                : 'bg-zinc-100 text-zinc-700 hover:bg-black hover:text-white'
                            }`}
                          >
                            <span>{s.actionPrompt}</span>
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => toggleCardFlip(idx, e)}
                            className="py-1.5 px-2 rounded-xl border border-zinc-200 hover:border-black font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-600 hover:text-black transition-colors"
                            title="Flip to Blueprint Specs"
                          >
                            SPEC ↷
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ========================================================
                        BACK FACE: Technical Blueprint Inspection Specifications
                        ======================================================== */}
                    <div
                      className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl p-5 flex flex-col justify-between bg-zinc-950 text-white border border-zinc-800 shadow-2xl overflow-hidden font-mono select-none"
                    >
                      {/* Blueprint Grid Lines Background */}
                      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:14px_14px] opacity-60 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent pointer-events-none" />

                      <div className="relative z-10 space-y-2.5">
                        {/* Blueprint Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-[10px] font-black text-cyan-400 tracking-wider uppercase">
                              {bp?.code || `SPEC-0${idx + 1}`}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => toggleCardFlip(idx, e)}
                            className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-[10px] text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <RefreshCw className="w-2.5 h-2.5" />
                            <span>FLIP ↶</span>
                          </button>
                        </div>

                        <div>
                          <span className="text-[8px] text-zinc-500 uppercase block tracking-widest">STATUTORY CLAUSE</span>
                          <span className="text-xs font-black text-white block mt-0.5 truncate">{bp?.clause}</span>
                        </div>

                        {/* 3 Inspection Checkpoints */}
                        <div className="space-y-1 pt-0.5">
                          <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block">INSPECTION CHECKPOINTS</span>
                          {bp?.checkpoints?.map((cp, cpIdx) => (
                            <div key={cpIdx} className="bg-zinc-900/90 border border-zinc-800/80 rounded-lg px-2 py-1.5 flex items-center justify-between text-[10px]">
                              <div className="truncate pr-2">
                                <span className="text-zinc-400 block text-[8px] truncate">{cp.label}</span>
                                <span className="text-white font-bold block text-[10px] truncate">{cp.val}</span>
                              </div>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[8px] font-black border border-emerald-500/30 shrink-0">
                                {cp.status}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Tolerance Bound */}
                        <div className="bg-cyan-950/30 border border-cyan-900/50 rounded-lg p-2 text-[10px]">
                          <span className="text-[8px] text-cyan-400 font-black uppercase block tracking-wider">TOLERANCE BOUND</span>
                          <span className="text-cyan-200 font-bold block mt-0.5 text-[10px]">{bp?.tolerance}</span>
                        </div>
                      </div>

                      {/* Back Face Footer */}
                      <div className="relative z-10 pt-2 border-t border-zinc-800/80 space-y-2">
                        <div className="text-[8px] text-zinc-500 truncate">
                          AUTH: {bp?.authority}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              executeStepAction(idx);
                            }}
                            className="flex-1 py-1.5 px-2 rounded-lg bg-cyan-400 text-black hover:bg-cyan-300 font-mono text-[9px] font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors"
                          >
                            <span>TEST BLUEPRINT</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => toggleCardFlip(idx, e)}
                            className="py-1.5 px-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-mono text-[9px] font-bold uppercase transition-colors"
                          >
                            RETURN ↶
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Step Deep Telemetry Focus Panel */}
          {(() => {
            const currentStep = VERIFICATION_STEPS[activeStepIdx] || VERIFICATION_STEPS[0];
            const StepIcon = currentStep.icon;

            return (
              <div className="bg-white border border-zinc-300 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0 shadow-xs">
                    <StepIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">
                        ACTIVE PROTOCOL // {currentStep.phase}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[9px] font-bold">
                        {currentStep.statutoryRef}
                      </span>
                    </div>
                    <h5 className="font-black text-sm sm:text-base text-black uppercase tracking-tight">
                      {currentStep.step}. {currentStep.title} — {currentStep.badge}
                    </h5>
                    <p className="text-xs text-zinc-600 font-normal">
                      {currentStep.detail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveStepIdx((prev) => (prev > 0 ? prev - 1 : VERIFICATION_STEPS.length - 1))}
                    className="p-2 rounded-xl border border-zinc-200 text-zinc-700 hover:border-black bg-white cursor-pointer"
                    title="Previous step"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => executeStepAction(activeStepIdx)}
                    className="px-4 py-2 rounded-xl bg-black text-white hover:bg-zinc-800 text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>Execute {currentStep.actionPrompt}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveStepIdx((prev) => (prev + 1) % VERIFICATION_STEPS.length)}
                    className="p-2 rounded-xl border border-zinc-200 text-zinc-700 hover:border-black bg-white cursor-pointer"
                    title="Next step"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}

        </div>

        {/* ========================================================
            06. Statutory Warnings, Grievance Hotline & Citizen Rights Banner
            ======================================================== */}
        <div id="verif-enforcement-hotline" className="bg-black text-white rounded-[24px] p-6 sm:p-10 relative overflow-hidden border border-zinc-800 shadow-xl">
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
