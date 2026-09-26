import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';

/**
 * Codezen Cubic-Bezier Easing Solver: cubicBezier(0.76, 0, 0.24, 1)
 */
function solveCubicBezier(t) {
  const o = 2.28;
  const l = 3 * (0.24 - 0.76) - o;
  const u = 1 - o - l;
  const d = 0;
  const f = 3 - d;
  const p = 1 - d - f;
  let y = t;
  for (let b = 0; b < 8; b++) {
    const w = ((u * y + l) * y + o) * y - t;
    const slope = (3 * u * y + 2 * l) * y + o;
    if (Math.abs(slope) < 1e-7) break;
    y -= w / slope;
  }
  return ((p * y + f) * y + d) * y;
}

const DOMAINS_DATA = [
  {
    text: 'STANDARDS COGNITION',
    items: [
      { name: 'Grounded RAG', badge: '99.8% ACCURACY' },
      { name: '12+ Indic Languages', badge: 'BHASHINI NLP' },
      { name: 'Semantic Cross-Search', badge: 'VECTOR EMBEDDINGS' },
      { name: 'Clause Citation Graph', badge: 'ZERO HALLUCINATION' },
      { name: 'Gazette Ingestion', badge: 'REAL-TIME MIRROR' },
    ],
  },
  {
    text: 'LABORATORY TESTING & QCO',
    items: [
      { name: 'Mandatory QCO Enforcer', badge: '150+ ORDERS' },
      { name: 'Schedule-II Protocols', badge: 'ISO/IEC 17025' },
      { name: 'LIMS Lab Dispatch', badge: 'AUTOMATED WORKFLOW' },
      { name: 'Form-V Audit Trails', badge: 'STATUTORY AUDIT' },
      { name: 'Sample Chain-of-Custody', badge: 'TAMPER-PROOF' },
    ],
  },
  {
    text: 'CITIZEN VERIFICATION',
    items: [
      { name: 'Scheme-I ISI Mark', badge: '7-DIGIT CM/L' },
      { name: 'Hallmark Gold HUID', badge: '6-CHAR REGISTRY' },
      { name: 'Mobile Scan API', badge: 'SUB-50MS LOOKUP' },
      { name: 'Anti-Counterfeit Beacon', badge: 'TAMPER DETECT' },
      { name: 'Public Grievance Portal', badge: 'BIS CARE V2' },
    ],
  },
  {
    text: 'REGULATORY APIS & SANDBOX',
    items: [
      { name: 'REST OpenAPI v3', badge: 'DEVELOPER SPEC' },
      { name: 'Knowledge Graph Neo4j', badge: 'CLAUSE RELATION' },
      { name: 'Statutory Webhooks', badge: 'EVENT STREAM' },
      { name: 'Enterprise SDKs', badge: 'PYTHON / TYPESCRIPT' },
      { name: 'Zero-Knowledge Proofs', badge: 'CRYPTOGRAPHIC' },
    ],
  },
];

/**
 * Domain Drawer Row with Slide-up Animated Marquee
 */
const DomainMenuItem = ({ text, items, isFirst }) => {
  const [isOpen, setIsOpen] = useState(false);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const part = trackRef.current.querySelector('.marquee-drawer__part');
    if (!part) return;

    const partWidth = part.offsetWidth;
    const duration = (partWidth / 120) * 1.5;

    tweenRef.current = gsap.to(trackRef.current, {
      x: -partWidth,
      duration: duration,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [items]);

  const toggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const close = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div
      className={`menu__item ${isOpen ? 'is-open' : ''}`}
      style={{ borderTop: isFirst ? 'none' : '1px solid rgba(0, 0, 0, 0.15)' }}
    >
      <a className="menu__item-link" href="#" onClick={toggle}>
        <span className="menu__item-text">{text}</span>
        <ArrowUpRight className="menu__item-arrow" />
      </a>

      <div className="marquee-drawer bg-black" onClick={close}>
        <div className="marquee-drawer__inner" ref={trackRef}>
          {[0, 1, 2, 3].map((rep) => (
            <div key={rep} className="marquee-drawer__part">
              {items.map((it, idx) => (
                <div key={idx} className="marquee-drawer__icon-box">
                  <span className="marquee-drawer__text">{it.name}</span>
                  <span className="marquee-drawer__badge">{it.badge}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Inner Mission View displayed inside the expanded 3D portal
 */
const MissionView = () => {
  return (
    <div className="w-full h-full bg-white text-black font-sans flex flex-col justify-between overflow-y-auto">
      <div className="w-full px-6 md:px-12 lg:px-16 pt-20 pb-10 bg-white z-10 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-y-8">
          <div className="md:col-span-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500 block">
              STATUTORY MANDATE
            </span>
          </div>
          <div className="md:col-span-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-black">
              Verify. Comply. Certify.
            </h2>
            <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-600 max-w-3xl leading-relaxed">
              India’s next-generation statutory regulatory intelligence ecosystem — orchestrating Indian Standards (IS), mandatory Quality Control Orders (QCO), and laboratory testing into verifiable, real-time national certification.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-black relative overflow-hidden flex-1 flex flex-col justify-center">
        <nav className="menu">
          {DOMAINS_DATA.map((domain, i) => (
            <DomainMenuItem
              key={domain.text}
              text={domain.text}
              items={domain.items}
              isFirst={i === 0}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

/**
 * Main PhilosophyPortal Component
 * Replicates Codezen's exact connecting SVG arc line & inverse 3D camera zoom aperture
 */
export const PhilosophyPortal = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const boxRef = useRef(null);
  const contentRef = useRef(null);
  const svgWrapRef = useRef(null);
  const sectionTopRef = useRef(0);
  const totalLengthRef = useRef(0);
  const animFrameRef = useRef(0);

  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const BOX_WIDTH = 340;
  const BOX_HEIGHT = 220;

  const calculateGeometry = useCallback(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);

    if (sectionRef.current) {
      sectionTopRef.current = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let pathString = '';

    if (mobile) {
      const startX = vw / 2;
      const startY = -10;
      const endX = vw / 2;
      const endY = vh / 2 - BOX_HEIGHT / 2;
      pathString = `M ${startX},${startY} L ${endX},${endY}`;
    } else {
      // Exact Codezen connection math from the 3000x1500 kinetic wheel
      const scale = vw / 3000;
      const startX = (1500 + 1100 * Math.cos((196 * Math.PI) / 180)) * scale;
      const endX = vw / 2 - BOX_WIDTH / 2;
      const endY = vh / 2;
      const radius = 1100 * scale;
      pathString = `M ${startX},0 A ${radius},${radius} 0 0,0 ${endX},${endY}`;
    }

    if (pathRef.current) {
      pathRef.current.setAttribute('d', pathString);
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) {
          totalLengthRef.current = len;
          pathRef.current.style.strokeDasharray = `${len}`;
          pathRef.current.style.strokeDashoffset = `${len}`;
        }
      } catch (err) {
        // SVG length fallback
      }
    }

    if (contentRef.current && sectionRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const totalH = vh * 1.2 + contentHeight;
      sectionRef.current.style.height = `${totalH}px`;
      sectionRef.current.style.minHeight = `${totalH}px`;
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    const onResize = () => calculateGeometry();
    requestAnimationFrame(() => {
      calculateGeometry();
      setTimeout(calculateGeometry, 200);
    });

    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [calculateGeometry]);

  useEffect(() => {
    if (!isReady) return;

    const handleScroll = () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      animFrameRef.current = requestAnimationFrame(() => {
        const pathEl = pathRef.current;
        const boxEl = boxRef.current;
        const contentEl = contentRef.current;
        const svgWrapEl = svgWrapRef.current;
        const totalLen = totalLengthRef.current;
        if (!boxEl || !contentEl) return;

        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const scrollY = window.scrollY;
        const P = scrollY - sectionTopRef.current;

        // 1. Draw SVG curved connecting line
        if (pathEl && svgWrapEl && totalLen > 0) {
          const strokeProgress = Math.min(Math.max((P + vh) / vh, 0), 1);
          pathEl.style.strokeDasharray = `${totalLen}`;
          pathEl.style.strokeDashoffset = `${(totalLen - strokeProgress * totalLen).toFixed(1)}`;
        }

        // 2. Control Portal Box visibility
        if (P < -vh * 0.35) {
          boxEl.style.visibility = 'hidden';
          boxEl.style.opacity = '0';
        } else {
          boxEl.style.visibility = 'visible';
          boxEl.style.opacity = '1';
        }

        // 3. Exact Codezen Aperture Zoom Math
        if (P <= 0) {
          boxEl.style.position = 'absolute';
          boxEl.style.top = '50vh';
          boxEl.style.transform = 'translate3d(0, 0, 0) scale(1)';
          if (svgWrapEl) {
            svgWrapEl.style.position = 'absolute';
            svgWrapEl.style.top = '0';
          }
          contentEl.style.transform = 'scale(1)';
          boxEl.style.overflow = 'hidden';
        } else {
          const zoomDuration = vh * 1.2;
          const H = Math.min(Math.max(P / zoomDuration, 0), 1);

          if (H < 1) {
            boxEl.style.position = 'fixed';
            boxEl.style.top = '50%';
            if (svgWrapEl) {
              svgWrapEl.style.position = 'fixed';
              svgWrapEl.style.top = '0';
            }
            boxEl.style.overflow = 'hidden';
          } else {
            boxEl.style.position = 'absolute';
            boxEl.style.top = `${zoomDuration + vh / 2}px`;
            if (svgWrapEl) {
              svgWrapEl.style.position = 'absolute';
              svgWrapEl.style.top = `${zoomDuration}px`;
            }
            boxEl.style.overflow = 'visible';
          }

          // Cubic-bezier smooth expansion
          const eased = solveCubicBezier(H);
          const scaleX = 1 + eased * (vw / BOX_WIDTH - 1);
          const scaleY = 1 + eased * (vh / BOX_HEIGHT - 1);

          boxEl.style.transform = `translate3d(0, 0, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
          contentEl.style.transform = `scale(${(1 / scaleX).toFixed(4)}, ${(1 / scaleY).toFixed(4)})`;

          // Fade out border smoothly as aperture expands
          const borderFade = Math.max(0, 1 - eased / 0.5);
          boxEl.style.borderWidth = borderFade < 0.01 ? '0px' : '2px';
          boxEl.style.borderColor = `rgba(0, 0, 0, ${borderFade.toFixed(3)})`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isReady]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-black font-sans z-30"
      style={{ minHeight: '320vh' }}
    >
      <div id="domains-anchor" style={{ position: 'absolute', top: '120vh', left: 0, height: '1px', width: '1px', pointerEvents: 'none' }} />

      {/* Connecting Curved Arc Stroke SVG */}
      <div
        ref={svgWrapRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 10,
          willChange: 'transform, top, position',
        }}
      >
        <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
          <path
            ref={pathRef}
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            style={{
              strokeWidth: isMobile ? '0.8vw' : '10px',
              strokeDasharray: '99999',
              strokeDashoffset: '99999',
            }}
          />
        </svg>
      </div>

      {/* Central Expanding Portal Card */}
      <div
        ref={boxRef}
        style={{
          position: 'absolute',
          top: '50vh',
          left: '50%',
          width: `${BOX_WIDTH}px`,
          height: `${BOX_HEIGHT}px`,
          marginLeft: `-${BOX_WIDTH / 2}px`,
          marginTop: `-${BOX_HEIGHT / 2}px`,
          background: 'white',
          border: '2px solid black',
          visibility: 'hidden',
          opacity: 0,
          zIndex: 50,
          overflow: 'hidden',
          transformOrigin: 'center center',
          willChange: 'transform, top, position',
        }}
      >
        {/* Counter-scaled 100vw x 100vh Inner Viewport */}
        <div
          ref={contentRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '100vh',
            marginLeft: '-50vw',
            marginTop: '-50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformOrigin: 'center center',
          }}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <MissionView />
          </div>
        </div>
      </div>
    </section>
  );
};
