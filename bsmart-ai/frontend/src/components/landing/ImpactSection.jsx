import React, { useState, useEffect, useRef } from 'react';

/**
 * Animated Counter Metric matching Codezen's exact rf implementation
 */
const CounterMetric = ({ value, suffix = '+', label, description }) => {
  const [count, setCount] = useState(0);
  const metricRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const duration = 1200;

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (metricRef.current) {
      observer.observe(metricRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={metricRef} className="flex flex-col items-start select-none">
      <span className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-400">
        {label}
      </span>
      <h3 className="mb-6 font-sans text-7xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none text-white">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="max-w-md font-sans text-sm sm:text-base leading-relaxed text-zinc-400">
        {description}
      </p>
    </div>
  );
};

/**
 * ImpactSection matching Codezen's exact MV / IV component layout
 */
export const ImpactSection = () => {
  return (
    <section className="w-full bg-black text-white py-32 px-6 md:px-12 lg:px-16 border-t border-white/10 relative z-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 sm:mb-24 flex items-center justify-between border-b border-white/10 pb-6">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            NATIONAL REGULATORY IMPACT
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            LIVE TELEMETRY ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-24 sm:gap-y-36">
          <CounterMetric
            value={20000}
            suffix="+"
            label="Indian Standards (IS)"
            description="Comprehensive national standards corpus catalogued with automated clause-level semantic embeddings and Gazette mirror updates."
          />
          <CounterMetric
            value={150}
            suffix="+"
            label="Mandatory QCO Schemes"
            description="Active Quality Control Orders enforced across consumer, industrial, and electrical product categories nationwide."
          />
          <CounterMetric
            value={100}
            suffix="%"
            label="Grounded Precision"
            description="Zero-hallucination statutory verification with exact clause citation hashes and cryptographic audit ledgers."
          />
          <CounterMetric
            value={11}
            suffix=" Subsystems"
            label="Statutory Architecture"
            description="End-to-end regulatory pipeline integrating multilingual Indic NLP, laboratory dispatch, and citizen anti-counterfeit scanning."
          />
        </div>
      </div>
    </section>
  );
};
