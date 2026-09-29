import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const StatsSection = () => {
  const { t } = useLanguage();

  const numbers = [
    { num: "20,000+", label: t('stats_num_is') },
    { num: "150+", label: t('stats_num_qco') },
    { num: "100%", label: t('stats_num_rag') },
    { num: "11", label: t('stats_num_sub') }
  ];

  return (
    <section className="relative w-full bg-white text-black min-h-[75vh] flex flex-col justify-center border-b border-black/10 select-none">
      <div className="relative z-10 flex flex-col h-full max-w-[1600px] mx-auto w-full">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* 01 — What We Are */}
          <div className="md:col-span-7 flex flex-col justify-center px-6 md:px-14 lg:px-16 py-12 md:py-16 md:border-r border-black/10 gap-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-black/40 flex items-center gap-2">
              <span className="w-5 h-px bg-black/20 inline-block" />
              {t('stats_tag_what')}
            </p>
            <h2
              className="font-black uppercase leading-[0.9] tracking-tighter text-[#050505]"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
            >
              {t('stats_title_1')}<br />
              <span className="text-[#4b5155]">{t('stats_title_2')}</span><br />
              {t('stats_title_3')}
            </h2>
            <p className="text-sm md:text-base text-black/60 leading-relaxed max-w-md font-sans">
              {t('stats_desc')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="h-px w-16 bg-[#4b5155]/60" />
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-black/40">
                {t('stats_motto')}
              </span>
              <span className="h-px flex-1 bg-black/10" />
            </div>
          </div>

          {/* 02 — By The Numbers */}
          <div className="md:col-span-5 flex flex-col justify-center px-6 md:px-12 py-12 md:py-16 gap-1">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-black/40 mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-black/20 inline-block" />
              {t('stats_tag_numbers')}
            </p>
            <div className="flex flex-col gap-0">
              {numbers.map((u) => (
                <div
                  key={u.num}
                  className="flex items-center justify-between py-4 border-b border-black/10 group cursor-default"
                >
                  <span
                    className="font-black tabular-nums leading-none text-[#4b5155] group-hover:text-black transition-colors"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                  >
                    {u.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/40 text-right">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
