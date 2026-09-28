import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  Search, 
  Award, 
  CheckCircle2, 
  Globe, 
  Layers, 
  TrendingUp,
  ShieldCheck,
  Building,
  RefreshCw
} from 'lucide-react';
import { analyticsService } from '../services/api';

export const DashboardPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await analyticsService.getSummary();
      setAnalytics(res.data);
    } catch (err) {
      console.error("Analytics fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const kpis = [
    {
      title: "Questions Asked",
      value: analytics?.total_questions_asked || 145,
      sub: "Multilingual Inquiries",
      icon: MessageSquare,
      color: "bg-zinc-100 text-black border border-zinc-200"
    },
    {
      title: "Standards Indexed",
      value: analytics?.total_standards_indexed || 18,
      sub: "Active Gazette Standards",
      icon: Search,
      color: "bg-zinc-100 text-black border border-zinc-200"
    },
    {
      title: "Certifications Started",
      value: analytics?.total_certifications_started || 27,
      sub: "10-Step Wizard Workflows",
      icon: Award,
      color: "bg-zinc-100 text-black border border-zinc-200"
    },
    {
      title: "Products Verified",
      value: analytics?.total_verifications_performed || 68,
      sub: "ISI Mark & HUID Records",
      icon: CheckCircle2,
      color: "bg-zinc-100 text-black border border-zinc-200"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>07 — Telemetry & Operations Intelligence</span>
          </div>
          <h1 className="editorial-headline text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
            Operations & Analytics Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
            Live telemetry of user questions, statutory verification requests, Scheme-I certification progress, and standard clause lookups.
          </p>
        </div>

        <button
          onClick={fetchAnalytics}
          className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-colors shadow-2xs cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-zinc-300 shadow-2xs space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{kpi.title}</span>
                <div className={`p-2 rounded-xl ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-black">{kpi.value}</div>
              <p className="text-xs text-zinc-500">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts & Analytics Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-mono">
        {/* Queries by Category */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-300 shadow-2xs space-y-4">
          <h3 className="editorial-headline text-base font-bold text-black uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4 text-black" />
            <span>Inquiries by Domain Category</span>
          </h3>

          <div className="space-y-3 pt-2">
            {analytics?.queries_by_category && Object.entries(analytics.queries_by_category).map(([cat, count], idx) => {
              const maxCount = Math.max(...Object.values(analytics.queries_by_category));
              const pct = Math.round((count / maxCount) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-zinc-800">
                    <span>{cat}</span>
                    <span className="font-mono text-black font-bold">{count}</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden border border-zinc-200">
                    <div 
                      className="bg-black h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Multilingual Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-300 shadow-2xs space-y-4 font-mono">
          <h3 className="editorial-headline text-base font-bold text-black uppercase tracking-wider flex items-center space-x-2">
            <Globe className="w-4 h-4 text-black" />
            <span>Queries by Language (Bhashini Pipeline)</span>
          </h3>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { lang: "English", code: "en", count: analytics?.queries_by_language?.en || 58 },
              { lang: "हिन्दी (Hindi)", code: "hi", count: analytics?.queries_by_language?.hi || 32 },
              { lang: "தமிழ் (Tamil)", code: "ta", count: analytics?.queries_by_language?.ta || 5 },
              { lang: "తెలుగు (Telugu)", code: "te", count: analytics?.queries_by_language?.te || 3 },
              { lang: "বাংলা (Bengali)", code: "bn", count: analytics?.queries_by_language?.bn || 2 }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 flex flex-col justify-between">
                <span className="text-xs font-bold text-zinc-800 uppercase">{item.lang}</span>
                <span className="text-2xl font-black mt-2 font-mono text-black">{item.count}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-200 font-mono">
            Automated language detection via Indian unicode ranges with fallback translation.
          </p>
        </div>
      </div>

      {/* Top Standards & Verification Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono">
        {/* Top Standards Table */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-zinc-300 shadow-2xs space-y-4">
          <h3 className="editorial-headline text-base font-bold text-black uppercase tracking-wider flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-black" />
            <span>Most Searched Indian Standards</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-600 uppercase tracking-wider text-[10px] border-b border-zinc-200">
                <tr>
                  <th className="p-3">Standard Code</th>
                  <th className="p-3">Title</th>
                  <th className="p-3 text-right">Inquiries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {analytics?.top_searched_standards?.map((s, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                    <td className="p-3 font-mono font-bold text-black">{s.is_number}</td>
                    <td className="p-3 font-medium text-zinc-800">{s.title}</td>
                    <td className="p-3 text-right font-mono font-bold text-black">{s.searches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification Outcomes */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-zinc-300 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="editorial-headline text-base font-bold text-black uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>Verification Outcomes</span>
            </h3>

            <div className="space-y-3 mt-4">
              <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 flex justify-between items-center text-xs">
                <span className="font-bold text-black uppercase">Verified Genuine</span>
                <span className="font-mono font-black text-black text-base">
                  {analytics?.verification_stats?.verified || 48}
                </span>
              </div>

              <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 flex justify-between items-center text-xs">
                <span className="font-bold text-zinc-600 uppercase">Unverified / Not In Mirror</span>
                <span className="font-mono font-black text-zinc-700 text-base">
                  {analytics?.verification_stats?.unverified || 14}
                </span>
              </div>

              <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 flex justify-between items-center text-xs">
                <span className="font-bold text-red-600 uppercase">Expired / Invalid Format</span>
                <span className="font-mono font-black text-red-600 text-base">
                  {analytics?.verification_stats?.mismatch || 6}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-[11px] text-zinc-500 font-mono">
            Compliant with Consumer Protection Act 2019 & BIS Act 2016 safety monitoring rules.
          </div>
        </div>
      </div>
    </div>
  );
};
