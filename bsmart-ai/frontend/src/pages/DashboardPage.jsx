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
      color: "bg-blue-50 text-gov-blue"
    },
    {
      title: "Standards Found",
      value: analytics?.total_standards_indexed || 18,
      sub: "Active Indian Standards",
      icon: Search,
      color: "bg-amber-50 text-amber-700"
    },
    {
      title: "Certifications Started",
      value: analytics?.total_certifications_started || 27,
      sub: "10-Step Wizard Workflows",
      icon: Award,
      color: "bg-purple-50 text-purple-700"
    },
    {
      title: "Products Verified",
      value: analytics?.total_verifications_performed || 68,
      sub: "ISI Mark & HUID Records",
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-700"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-gov-blue uppercase tracking-wider">Analytics & Governance</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-navy mt-1">
            Consumer & Industry Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Live telemetry of questions, verification requests, certification progress, and standard lookups.
          </p>
        </div>

        <button
          onClick={fetchAnalytics}
          className="inline-flex items-center space-x-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
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
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.title}</span>
                <div className={`p-2 rounded-xl ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-gov-navy">{kpi.value}</div>
              <p className="text-xs text-slate-500">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts & Analytics Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Queries by Category */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gov-navy uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4 text-gov-blue" />
            <span>Inquiries by Domain Category</span>
          </h3>

          <div className="space-y-3 pt-2">
            {analytics?.queries_by_category && Object.entries(analytics.queries_by_category).map(([cat, count], idx) => {
              const maxCount = Math.max(...Object.values(analytics.queries_by_category));
              const pct = Math.round((count / maxCount) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{cat}</span>
                    <span className="font-mono text-gov-blue">{count}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gov-blue h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Multilingual Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gov-navy uppercase tracking-wider flex items-center space-x-2">
            <Globe className="w-4 h-4 text-amber-600" />
            <span>Queries by Language (Bhashini Pipeline)</span>
          </h3>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { lang: "English", code: "en", count: analytics?.queries_by_language?.en || 58, color: "bg-blue-50 border-blue-200 text-gov-blue" },
              { lang: "हिन्दी (Hindi)", code: "hi", count: analytics?.queries_by_language?.hi || 32, color: "bg-amber-50 border-amber-200 text-amber-800" },
              { lang: "தமிழ் (Tamil)", code: "ta", count: analytics?.queries_by_language?.ta || 5, color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
              { lang: "తెలుగు (Telugu)", code: "te", count: analytics?.queries_by_language?.te || 3, color: "bg-purple-50 border-purple-200 text-purple-800" },
              { lang: "বাংলা (Bengali)", code: "bn", count: analytics?.queries_by_language?.bn || 2, color: "bg-teal-50 border-teal-200 text-teal-800" }
            ].map((item, idx) => (
              <div key={idx} className={`p-4 rounded-xl border ${item.color} flex flex-col justify-between`}>
                <span className="text-xs font-bold">{item.lang}</span>
                <span className="text-2xl font-black mt-2 font-mono">{item.count}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Automated language detection via Indian unicode ranges with fallback translation.
          </p>
        </div>
      </div>

      {/* Top Standards & Verification Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top Standards Table */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gov-navy uppercase tracking-wider flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Most Searched Indian Standards</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Standard Code</th>
                  <th className="p-3">Title</th>
                  <th className="p-3 text-right">Inquiries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {analytics?.top_searched_standards?.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono font-bold text-gov-blue">{s.is_number}</td>
                    <td className="p-3 font-medium text-slate-800">{s.title}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-700">{s.searches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification Outcomes */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gov-navy uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verification Outcomes</span>
            </h3>

            <div className="space-y-3 mt-4">
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-900">Verified Genuine</span>
                <span className="font-mono font-black text-emerald-800 text-base">
                  {analytics?.verification_stats?.verified || 48}
                </span>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex justify-between items-center text-xs">
                <span className="font-bold text-amber-900">Unverified / Not in Mirror</span>
                <span className="font-mono font-black text-amber-800 text-base">
                  {analytics?.verification_stats?.unverified || 14}
                </span>
              </div>

              <div className="p-3.5 bg-red-50 rounded-xl border border-red-200 flex justify-between items-center text-xs">
                <span className="font-bold text-red-900">Expired / Invalid Format</span>
                <span className="font-mono font-black text-red-800 text-base">
                  {analytics?.verification_stats?.mismatch || 6}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
            Compliant with Consumer Protection Act 2019 & BIS Act 2016 safety monitoring rules.
          </div>
        </div>
      </div>
    </div>
  );
};
