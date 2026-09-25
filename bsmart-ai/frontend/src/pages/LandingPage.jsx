import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Shield, 
  Search, 
  MessageSquare, 
  Sparkles, 
  ArrowUpRight, 
  HelpCircle, 
  ChevronDown, 
  Check 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// GSAP Magnetic Button Component
const MagneticButton = ({ children, className, to, onClick }) => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.35;
    const y = (e.clientY - (top + height / 2)) * 0.35;
    gsap.to(btnRef.current, { x, y, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
  };

  if (to) {
    return (
      <Link
        ref={btnRef}
        to={to}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </button>
  );
};

// Background Cyber Particles for Hero Depth
const CyberParticles = () => {
  const particles = [
    { left: '8%', top: '22%', size: 3, duration: 6, delay: 0 },
    { left: '22%', top: '68%', size: 2, duration: 8, delay: 1 },
    { left: '78%', top: '16%', size: 3.5, duration: 7, delay: 0.5 },
    { left: '88%', top: '62%', size: 2.5, duration: 9, delay: 2 },
    { left: '42%', top: '82%', size: 3, duration: 6.5, delay: 1.5 },
    { left: '16%', top: '48%', size: 2, duration: 7.5, delay: 3 },
    { left: '68%', top: '78%', size: 3.5, duration: 8.5, delay: 2.5 },
    { left: '32%', top: '18%', size: 2, duration: 5.5, delay: 1.2 },
    { left: '82%', top: '42%', size: 2.5, duration: 7.2, delay: 0.8 },
    { left: '6%', top: '78%', size: 3, duration: 9.5, delay: 1.8 },
    { left: '52%', top: '22%', size: 2, duration: 6.8, delay: 2.2 },
    { left: '62%', top: '52%', size: 2.5, duration: 8.1, delay: 0.3 }
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -32, 0],
            opacity: [0.15, 0.7, 0.15],
            scale: [0.9, 1.25, 0.9]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut'
          }}
          className="absolute rounded-full bg-emerald-400"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: '0 0 12px rgba(16, 185, 129, 0.7)'
          }}
        />
      ))}
    </div>
  );
};

// 3D Parallax Drone/Radar HUD Centerpiece with GSAP Magnetic Interaction
const HeroCenterpiece = () => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 140, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 140, damping: 18 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="gsap-hero-hud relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96 flex items-center justify-center cursor-pointer select-none"
    >
      {/* Outer Rotating Dashed Orbital Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        className="absolute inset-0 rounded-full border border-dashed border-emerald-500/35"
      />

      {/* Reverse Counter-Rotating Technical Ring with Ticks */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        className="absolute inset-4 rounded-full border border-zinc-800"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
      </motion.div>

      {/* Pulsing Concentric Radar Wave */}
      <motion.div
        animate={{ scale: [1, 1.07, 1], opacity: [0.25, 0.65, 0.25] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-16 rounded-full border border-emerald-500/30 shadow-[0_0_35px_rgba(16,185,129,0.25)]"
      />

      {/* Active Sonar Ripples */}
      <div className="sonar-wave-1" />
      <div className="sonar-wave-2" />

      {/* 4 Floating Thruster HUD Rings */}
      {/* Top Left: IS Standard */}
      <motion.div
        animate={{ y: [-4, 4, -4], x: [-2, 2, -2] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 -left-3 thruster-ring bg-zinc-950/90 shadow-lg"
      >
        <span className="text-[10px] font-mono text-emerald-400 font-black">IS</span>
      </motion.div>

      {/* Top Right: QCO Mandate */}
      <motion.div
        animate={{ y: [4, -4, 4], x: [2, -2, 2] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 -right-3 thruster-ring bg-zinc-950/90 shadow-lg"
      >
        <span className="text-[10px] font-mono text-cyan-400 font-black">QCO</span>
      </motion.div>

      {/* Bottom Left: ISI Mark */}
      <motion.div
        animate={{ y: [3, -5, 3], x: [-1, 2, -1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-3 -left-3 thruster-ring bg-zinc-950/90 shadow-lg"
      >
        <span className="text-[10px] font-mono text-emerald-400 font-black">ISI</span>
      </motion.div>

      {/* Bottom Right: HUID Hallmarking */}
      <motion.div
        animate={{ y: [-4, 3, -4], x: [2, -1, 2] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-3 -right-3 thruster-ring bg-zinc-950/90 shadow-lg"
      >
        <span className="text-[10px] font-mono text-amber-400 font-black">HUID</span>
      </motion.div>

      {/* Centerpiece Radar Enter Button */}
      <MagneticButton
        to="/assistant"
        className="relative group z-20"
      >
        <div className="radar-enter-btn bg-black/90 border border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.35)]">
          {/* Radar Sweep Rotating Conic Beam */}
          <div className="radar-sweep-beam" />
          <div className="radar-ring" />
          <div className="radar-ring-inner" />

          <div className="relative z-10 flex flex-col items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400 mb-1 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-mono text-xs font-black text-white tracking-widest">ENTER</span>
            <span className="text-[8px] font-mono text-emerald-400 tracking-wider">AI SYSTEM</span>
          </div>
        </div>
      </MagneticButton>
    </motion.div>
  );
};

// Infinite Running Outline Typography Marquee
const InfiniteMarquee = () => {
  const items = [
    "BISMART MILESTONES",
    "STANDARDS INTELLIGENCE",
    "QUALITY CONTROL ORDERS",
    "CONFORMITY ASSESSMENT",
    "ANTI-HALLUCINATION RAG",
    "NATIONAL REGULATION"
  ];

  return (
    <section className="bg-black py-8 border-b border-zinc-900 overflow-hidden select-none" aria-hidden="true">
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex flex-shrink-0 items-center whitespace-nowrap text-4xl sm:text-7xl font-black"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity
          }}
        >
          {items.concat(items).concat(items).map((txt, idx) => (
            <React.Fragment key={idx}>
              <span className="marquee-text-outline mx-6 hover:text-white transition-colors cursor-default">
                {txt}
              </span>
              <span className="text-emerald-400 font-black mx-4">•</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Interactive 3D Stacking Card Item with GSAP Stacking Class & Cursor Spotlight
const StackCardItem = ({ card, idx }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 6;
    const rotY = ((x - centerX) / centerX) * 6;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      className="gsap-stack-card stack-card-wrapper card-perspective-container"
      style={{
        top: `calc(90px + ${idx * 26}px)`,
        zIndex: 10 + idx,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`stack-card-inner relative overflow-hidden transition-all duration-200 ${card.borderColor}`}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          boxShadow: isHovered
            ? '0 35px 80px rgba(0, 0, 0, 0.95), 0 0 40px rgba(16, 185, 129, 0.18)'
            : '0 25px 60px rgba(0, 0, 0, 0.85)',
        }}
      >
        {/* Dynamic Cursor Spotlight Glare */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(550px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.08), transparent 50%)`,
            }}
          />
        )}

        <div className="relative z-10">
          {/* Card Top Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div className="flex items-center space-x-6">
              <span className={`huge-number ${card.numberColor}`}>{card.id}</span>
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-white tracking-wide uppercase">
                  {card.title}
                </h3>
                <span className={`inline-block mt-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}>
                  {card.tag}
                </span>
              </div>
            </div>

            <MagneticButton to={card.link} className="cz-pill-btn self-start sm:self-auto group">
              <span>{card.cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
          </div>

          {/* Card Body Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 items-center">
            {/* Left Column Graphic Preview */}
            <div className="md:col-span-5 bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 min-h-[190px] flex flex-col justify-between shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>MODULE PREVIEW</span>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-bold">ACTIVE</span>
                </div>
              </div>

              {card.graphicType === 'rag' && (
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-cyan-300 shadow-xs">
                    [1] IS 2347:2017 — Clause 5.1
                  </div>
                  <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 text-[10px] leading-relaxed">
                    "Safety relief device must operate between 1.5x and 3.0x nominal working pressure."
                  </div>
                </div>
              )}

              {card.graphicType === 'matcher' && (
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-purple-300">
                    <span>Product: Pressure Cooker</span>
                    <span className="font-bold">→ IS 2347</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/80 text-[10px] text-zinc-400">
                    QCO Status: <strong className="text-amber-400">MANDATORY</strong> (DPIIT Order)
                  </div>
                </div>
              )}

              {card.graphicType === 'wizard' && (
                <div className="space-y-2 font-mono text-[11px]">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span>Step 01: Application Form-V</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span>Step 02: In-House Testing Lab</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-500">
                    <span className="w-3.5 h-3.5 flex items-center justify-center">○</span>
                    <span>Step 03: Factory Audit Assessment</span>
                  </div>
                </div>
              )}

              {card.graphicType === 'verify' && (
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-300 flex justify-between">
                    <span>CM/L-8400123</span>
                    <span className="text-emerald-400 font-bold">VERIFIED</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/80 text-[10px] text-zinc-400">
                    Mfr: Hawkins Cookers Ltd • Operative
                  </div>
                </div>
              )}

              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest pt-2">
                OFFICIAL BIS CONNECT MIRROR
              </div>
            </div>

            {/* Right Column Description */}
            <div className="md:col-span-7 space-y-4">
              <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                {card.desc}
              </p>

              <div className="flex items-center space-x-3 pt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-zinc-400">Instant Execution • Zero Manual Work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LandingPage = () => {
  const { t } = useLanguage();
  const pageContainerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeAccordion, setActiveAccordion] = useState(0);

  // Mouse move for glowing ambient aura in hero
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const stackCards = [
    {
      id: "001",
      title: "GROUNDED RAG ENGINE",
      tag: "100% Anti-Hallucination / Exact Clause Citations",
      desc: "Every response is legally anchored in official BIS gazettes, specifications, and amendments. Inspect exact clause numbers (e.g., [1] IS 2347:2017 Clause 5.1) directly with interactive drawer previews.",
      cta: "Launch Assistant",
      link: "/assistant",
      borderColor: "neon-border-cyan",
      badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-800",
      numberColor: "text-cyan-400",
      graphicType: "rag"
    },
    {
      id: "002",
      title: "PRODUCT-TO-STANDARD MATCHER",
      tag: "Semantic AI Resolution / Mandatory QCOs",
      desc: "Search by commercial product name, material composition, or capacity. The engine maps items to mandatory Indian Standards (IS Code), identifies DPIIT Quality Control Orders, and displays enforcement deadlines.",
      cta: "Find My Standard",
      link: "/matcher",
      borderColor: "neon-border-purple",
      badgeColor: "text-purple-400 bg-purple-950/60 border-purple-800",
      numberColor: "text-purple-400",
      graphicType: "matcher"
    },
    {
      id: "003",
      title: "SCHEME-I CERTIFICATION WIZARD",
      tag: "10-Step Interactive Manufacturer Roadmap",
      desc: "Guided operational workflow for MSMEs and industrial manufacturers: application filing, factory testing checklists, independent lab evaluations, technical documentation, and audit readiness reports.",
      cta: "Start 10-Step Wizard",
      link: "/certification",
      borderColor: "neon-border-emerald",
      badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800",
      numberColor: "text-emerald-400",
      graphicType: "wizard"
    },
    {
      id: "004",
      title: "AUTHENTICITY VERIFICATION ENGINE",
      tag: "7-Digit ISI CM/L & 6-Digit Gold HUID Checks",
      desc: "Protect Indian citizens against counterfeit, uncertified products. Verify genuine 7-digit CM/L licence numbers and decode 6-character laser-engraved HUID hallmarking codes on 22K/18K gold jewellery in seconds.",
      cta: "Verify Product",
      link: "/verify-isi",
      borderColor: "neon-border-amber",
      badgeColor: "text-amber-400 bg-amber-950/60 border-amber-800",
      numberColor: "text-amber-400",
      graphicType: "verify"
    }
  ];

  const accordionItems = [
    {
      domain: "TECHNICAL ARCHITECTURE",
      title: "Bhashini Multilingual Speech & Vector Retrieval",
      summary: "Full end-to-end voice and text pipeline supporting Hindi, Punjabi, Tamil, and 8 additional Indian languages with hybrid lexical + semantic embedding search."
    },
    {
      domain: "OPERATIONAL COMPLIANCE",
      title: "Quality Control Orders & DPIIT Gazette Registry",
      summary: "Statutory order tracking covering electricals, steel, chemicals, toys, and cookware, flagging mandatory enforcement dates and legal consequences."
    },
    {
      domain: "CONFORMITY ASSESSMENT",
      title: "Scheme-I, Scheme-II, and Compulsory Registration (CRS)",
      summary: "Covers standard mark issuance, factory testing protocols, surveillance audits, and laboratory test sample validation."
    }
  ];

  const faqs = [
    {
      q: "What is BISmart AI?",
      a: "BISmart AI is an intelligent platform developed for SIH26107 to help Indian manufacturers, businesses, and consumers effortlessly navigate Indian Standards (IS), mandatory certification schemes, and product authenticity verification."
    },
    {
      q: "How does the anti-hallucination engine protect against incorrect regulatory claims?",
      a: "Our RAG architecture retrieves only verified BIS standards and gazette notifications. If an answer cannot be grounded in official clauses, the AI explicitly reports that sufficient reliable information was not found."
    },
    {
      q: "Can I use voice interaction in Indian languages like Hindi?",
      a: "Yes! Powered by a Bhashini-compatible speech architecture, users can speak queries in Hindi or other regional languages and receive bilingual or native responses with audio synthesis."
    },
    {
      q: "What is an ISI Mark CM/L number?",
      a: "A Certification Marks Licence (CM/L) is a unique 7-digit number issued by BIS to certified manufacturers. It must appear below the ISI mark on genuine consumer products."
    }
  ];

  // GSAP ScrollTrigger & Timelines Setup
  useGSAP(() => {
    // 1. Hero Intro Sequence
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    heroTl
      .from('.gsap-hero-badge', {
        y: -25,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
      })
      .from('.gsap-hero-title', {
        y: 45,
        opacity: 0,
        duration: 0.9,
      }, '-=0.4')
      .from('.gsap-hero-desc', {
        y: 25,
        opacity: 0,
        duration: 0.7,
      }, '-=0.5')
      .from('.gsap-hero-cta', {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      }, '-=0.4')
      .from('.gsap-hero-hud', {
        scale: 0.85,
        opacity: 0,
        duration: 1.1,
        ease: 'back.out(1.2)',
      }, '-=0.8');

    // 2. Section 2 Animated Numerical Counters
    const counters = [
      { target: 20000, suffix: '+', selector: '#stat-0' },
      { target: 150, suffix: '+', selector: '#stat-1' },
      { target: 100, suffix: '%', selector: '#stat-2' },
      { target: 11, suffix: '', selector: '#stat-3' },
    ];

    counters.forEach((item) => {
      const obj = { val: 0 };
      const el = document.querySelector(item.selector);
      if (el) {
        gsap.to(obj, {
          val: item.target,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item.selector,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.val).toLocaleString() + item.suffix;
          },
        });
      }
    });

    // 3. GSAP ScrollTrigger 3D Stacking Cards Scrub
    const cards = gsap.utils.toArray('.gsap-stack-card');
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 0.93 - (cards.length - 1 - i) * 0.02,
          opacity: 0.45,
          filter: 'blur(2px)',
          transformOrigin: 'center top',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top 65%',
            end: 'top 25%',
            scrub: 0.5,
          },
        });
      }
    });

  }, { scope: pageContainerRef });

  return (
    <div ref={pageContainerRef} className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* ========================================================
          SECTION 1: DARK CYBERNETIC HERO (CODEZEN AESTHETIC)
          ======================================================== */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative min-h-[92vh] flex items-center justify-center cz-grid-dark px-4 sm:px-6 lg:px-8 py-16 overflow-hidden border-b border-zinc-900"
      >
        {/* Floating Ambient Dust Particles */}
        <CyberParticles />

        {/* Ambient Cursor Aura */}
        <div 
          className="pointer-events-none absolute w-[450px] h-[450px] rounded-full blur-[100px] opacity-25 transition-all duration-300 z-0"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.8), rgba(139,92,246,0.5), transparent)',
            left: `${mousePos.x - 225}px`,
            top: `${mousePos.y - 225}px`
          }}
        />

        {/* Right Vertical Floating Links Rail */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center space-y-6 text-[10px] font-mono tracking-widest text-zinc-500 uppercase"
        >
          <span className="[writing-mode:vertical-rl] hover:text-emerald-400 transition-colors cursor-pointer">
            <Link to="/assistant">ASSISTANT</Link>
          </span>
          <span className="w-px h-6 bg-zinc-800" />
          <span className="[writing-mode:vertical-rl] hover:text-emerald-400 transition-colors cursor-pointer">
            <Link to="/matcher">MATCHER</Link>
          </span>
          <span className="w-px h-6 bg-zinc-800" />
          <span className="[writing-mode:vertical-rl] hover:text-emerald-400 transition-colors cursor-pointer">
            <Link to="/certification">CERTIFY</Link>
          </span>
          <span className="w-px h-6 bg-zinc-800" />
          <span className="[writing-mode:vertical-rl] hover:text-emerald-400 transition-colors cursor-pointer">
            <Link to="/verify-isi">VERIFY</Link>
          </span>
        </motion.div>

        <div className="max-w-6xl w-full mx-auto relative z-10">
          {/* Top Emerald Badge */}
          <div className="gsap-hero-badge flex justify-center sm:justify-start mb-6">
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SIH26107 • STANDARDS INTELLIGENCE</span>
              <span className="text-zinc-600">|</span>
              <Link to="/assistant" className="text-zinc-300 font-bold flex items-center space-x-1 hover:text-white transition-colors cursor-pointer">
                <span>DISCOVER</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Headline Area */}
            <div className="lg:col-span-7 text-center sm:text-left space-y-5">
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
                BUREAU OF INDIAN STANDARDS • AI ASSISTANT
              </div>
              <h1 className="gsap-hero-title text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.92]">
                STANDARDS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  INTELLIGENCE.
                </span>
              </h1>
              <p className="gsap-hero-desc text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed">
                National regulatory platform for Indian Standards (IS), mandatory Quality Control Orders (QCOs), 10-step ISI licensing, and product authenticity verification.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
                <MagneticButton
                  to="/assistant"
                  className="gsap-hero-cta px-6 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask BIS Assistant</span>
                </MagneticButton>

                <MagneticButton
                  to="/matcher"
                  className="gsap-hero-cta px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2"
                >
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>Find My Standard</span>
                </MagneticButton>
              </div>
            </div>

            {/* Right Centerpiece: Glowing 4-Ring HUD & Radar Enter */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-6">
              <HeroCenterpiece />
              <div className="text-[11px] font-mono text-zinc-500 mt-4 tracking-widest text-center uppercase">
                4 PILLARS OF COMPLIANCE • REAL-TIME
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: HIGH-CONTRAST EDITORIAL SPLIT (CRISP WHITE)
          ======================================================== */}
      <section className="bg-white text-black py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: 01 What We Are */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 lg:border-r lg:border-zinc-200 lg:pr-12"
          >
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-500 block">
              01 — WHAT WE ARE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black leading-[0.95]">
              INTELLIGENT <br />
              COMPLIANCE FOR <br />
              INDIAN STANDARDS.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              BISmart AI is an authoritative regulatory assistant engineered for Smart India Hackathon (SIH26107). It bridges technical standards, mandatory DPIIT Quality Control Orders, and citizen safety verification using exact clause-grounded retrieval.
            </p>
            <div className="pt-2 text-xs font-mono text-zinc-400 tracking-wider uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>GROUNDED • VERIFIABLE • STATUTORY</span>
            </div>
          </motion.div>

          {/* Right Column: 02 By The Numbers Grid with GSAP Counters */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-500 block">
              02 — BY THE NUMBERS
            </span>
            <div className="grid grid-cols-2 gap-8 pt-2">
              {[
                { id: "stat-0", init: "20,000+", label: "Standards Indexed" },
                { id: "stat-1", init: "150+", label: "Mandatory QCOs" },
                { id: "stat-2", init: "100%", label: "Clause Accuracy" },
                { id: "stat-3", init: "11", label: "Bhashini Languages" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="border-b border-zinc-200 pb-6 transition-transform"
                >
                  <div id={stat.id} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black font-mono">
                    {stat.init}
                  </div>
                  <div className="text-xs font-mono text-zinc-500 tracking-wider uppercase mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: INFINITE RUNNING OUTLINE TYPOGRAPHY MARQUEE
          ======================================================== */}
      <InfiniteMarquee />

      {/* ========================================================
          SECTION 4: STICKY STACKING 3D CARDS (GSAP SCROLLTRIGGER PHYSICS)
          ======================================================== */}
      <section className="bg-black py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-2"
          >
            REGULATORY CAPABILITIES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white"
          >
            CORE PLATFORM MODULES
          </motion.h2>
          <p className="text-xs font-mono text-zinc-500 mt-2 uppercase tracking-wider">
            Scroll to experience GSAP-powered card stacking physics
          </p>
        </div>

        {/* The 4 Stacking Cards with GSAP Physics */}
        <div className="space-y-12">
          {stackCards.map((card, idx) => (
            <StackCardItem key={card.id} card={card} idx={idx} />
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 5: BRUTALIST DOMAIN ACCORDION & SECONDARY MARQUEE
          ======================================================== */}
      <section className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center sm:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 block">
              SYSTEM CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black mt-1">
              BUILD. DEVELOP. GROW.
            </h2>
          </div>

          <div className="divide-y divide-zinc-200">
            {accordionItems.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveAccordion(activeAccordion === idx ? -1 : idx)}
                className="py-6 cursor-pointer group transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                      {item.domain}
                    </span>
                    <h3 className="text-base sm:text-2xl font-extrabold text-black group-hover:text-emerald-600 transition-colors flex items-center space-x-2">
                      <span>{item.title}</span>
                      <motion.div
                        animate={{ rotate: activeAccordion === idx ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeAccordion === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeAccordion === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                        {item.summary}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: FAQ SECTION
          ======================================================== */}
      <section className="bg-black py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <HelpCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-wide">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-wider">
              Authoritative Guidance & SIH26107 Compliance
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3, borderColor: 'rgba(16, 185, 129, 0.4)' }}
                className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800 transition-all shadow-lg"
              >
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-emerald-400 font-mono text-xs">#0{i + 1}</span>
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 leading-relaxed font-normal">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: GIANT KINETIC FOOTER (CODEZEN FOOTER STYLE)
          ======================================================== */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="font-black text-lg text-white uppercase tracking-tight">BISmart AI</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                AI Regulatory Assistant developed for SIH26107. Standardizing national compliance across Indian manufacturing and citizen consumer protection.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                NAVIGATE
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li><Link to="/assistant" className="hover:text-emerald-400 transition-colors">AI Assistant</Link></li>
                <li><Link to="/matcher" className="hover:text-emerald-400 transition-colors">Find Standard</Link></li>
                <li><Link to="/certification" className="hover:text-emerald-400 transition-colors">10-Step Wizard</Link></li>
                <li><Link to="/verify-isi" className="hover:text-emerald-400 transition-colors">Verify ISI Mark</Link></li>
                <li><Link to="/verify-huid" className="hover:text-emerald-400 transition-colors">Verify Gold HUID</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                CHANNELS
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li><a href="https://www.bis.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400">BIS Official Portal ↗</a></li>
                <li><a href="https://www.manakonline.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400">Manakonline e-Services ↗</a></li>
                <li><a href="https://dpiit.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400">DPIIT Quality Orders ↗</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                COLOPHON
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                Smart India Hackathon 2026. Problem Statement SIH26107. Clause Grounding & RAG Architecture.
              </p>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE • DEMO MODE</span>
              </div>
            </div>
          </div>

          {/* Huge Outline Brand Typography with Kinetic Hover Sheen */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-10 border-t border-zinc-900/80"
          >
            <div className="footer-giant-text hover:opacity-100 transition-opacity duration-500">
              BISMART
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-zinc-600 pt-6">
              <span>© 2026 BISMART AI. ALL RIGHTS RESERVED.</span>
              <span className="mt-2 sm:mt-0">DEVELOPED FOR BUREAU OF INDIAN STANDARDS • SIH26107</span>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};
