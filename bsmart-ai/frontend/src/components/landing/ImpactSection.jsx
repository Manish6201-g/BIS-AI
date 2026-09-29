import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Animated Counter Metric matching statutory rf implementation
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
 * ImpactSection matching statutory MV / IV component layout
 */
export const ImpactSection = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-black text-white py-16 sm:py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/10 relative z-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-20 sm:mb-24 flex items-center justify-between border-b border-white/10 pb-6">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            {t('impact_title')}
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            {t('impact_telemetry')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-14 sm:gap-y-24 md:gap-y-36">
          <CounterMetric
            value={20000}
            suffix="+"
            label={t('impact_is_label')}
            description={t('impact_is_desc')}
          />
          <CounterMetric
            value={150}
            suffix="+"
            label={t('impact_qco_label')}
            description={t('impact_qco_desc')}
          />
          <CounterMetric
            value={100}
            suffix="%"
            label={t('impact_precision_label')}
            description={t('impact_precision_desc')}
          />
          <CounterMetric
            value={11}
            suffix=" Subsystems"
            label={t('impact_arch_label')}
            description={t('impact_arch_desc')}
          />
        </div>
      </div>
    </section>
  );
};
