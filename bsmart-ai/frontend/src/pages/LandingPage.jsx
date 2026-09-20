import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  MessageSquare, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  CheckCheck, 
  Building, 
  Users, 
  FileText, 
  ChevronRight,
  HelpCircle,
  BarChart2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LandingPage = () => {
  const { t } = useLanguage();

  const stats = [
    { label: "Standards Indexed", value: "20,000+", sub: "Official BIS Specifications" },
    { label: "Grounding Accuracy", value: "100%", sub: "Verifiable Clause Citations" },
    { label: "Quality Control Orders", value: "150+", sub: "Statutory DPIIT Orders" },
    { label: "Indian Languages", value: "11", sub: "Bhashini AI Voice & Text" }
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "Multilingual AI Assistant",
      desc: "Ask queries in Hindi, English, Punjabi, Tamil and 7 more languages with instant voice or text support.",
      link: "/assistant",
      color: "bg-blue-50 text-gov-blue"
    },
    {
      icon: Search,
      title: "Product-to-Standard Matcher",
      desc: "Input your product details to instantly discover applicable IS codes, mandatory QCOs, and testing clauses.",
      link: "/matcher",
      color: "bg-amber-50 text-amber-700"
    },
    {
      icon: BookOpen,
      title: "Clause-Level Evidence Engine",
      desc: "Every AI response is backed by exact clause citations like [1] IS 2347:2017 — Clause 5.1 with live drawer inspection.",
      link: "/standards",
      color: "bg-purple-50 text-purple-700"
    },
    {
      icon: Award,
      title: "10-Step Certification Wizard",
      desc: "Guided roadmap for manufacturers: from Scheme-I ISI application, lab testing, factory audit to final licence.",
      link: "/certification",
      color: "bg-emerald-50 text-emerald-700"
    },
    {
      icon: CheckCircle2,
      title: "ISI Mark CM/L Verification",
      desc: "Validate 7-digit CM/L licence numbers to confirm genuine BIS certification and eliminate fake ISI marks.",
      link: "/verify-isi",
      color: "bg-teal-50 text-teal-700"
    },
    {
      icon: Sparkles,
      title: "HUID Gold Hallmark Verifier",
      desc: "Verify 6-character laser-engraved HUID codes on gold jewellery to guarantee 22K/18K purity and assay authenticity.",
      link: "/verify-huid",
      color: "bg-orange-50 text-orange-700"
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

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-gov-bg pt-12 pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* SIH Pill */}
          <div className="inline-flex items-center space-x-2 bg-amber-100/80 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
            <span>Smart India Hackathon 2026 • Problem SIH26107</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gov-navy tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            {t('hero_title')}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
            {t('hero_subtitle')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3.5 mt-8">
            <Link
              to="/assistant"
              className="inline-flex items-center space-x-2 bg-gov-blue hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>{t('btn_ask_ai')}</span>
            </Link>
            <Link
              to="/matcher"
              className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold px-6 py-3 rounded-xl text-sm shadow-xs transition-all"
            >
              <Search className="w-4 h-4 text-gov-blue" />
              <span>{t('btn_find_standard')}</span>
            </Link>
            <Link
              to="/verify-isi"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-xs transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('btn_verify_product')}</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            {stats.map((st, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-gov-navy">{st.value}</div>
                <div className="text-xs font-bold text-slate-800 mt-1">{st.label}</div>
                <div className="text-[11px] text-slate-500">{st.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Demo Journey Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-gov-blue uppercase tracking-wider">End-to-End Assistance Flow</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-navy mt-1">
            From Question to Verified Certification
          </h2>
          <p className="text-xs text-slate-600 mt-2">
            A seamless, integrated experience that connects citizen inquiry with authoritative regulatory compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          {[
            { step: "01", title: "QUESTION", desc: "Speak or type inquiry in 11 Indian languages" },
            { step: "02", title: "STANDARD", desc: "AI maps product to exact Indian Standard (IS Code)" },
            { step: "03", title: "CLAUSE", desc: "Direct citations with verifiable statutory text" },
            { step: "04", title: "CERTIFY", desc: "10-step wizard walks through Scheme-I licensing" },
            { step: "05", title: "VERIFY", desc: "Instant CM/L ISI and 6-digit HUID validation" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
              <span className="text-[11px] font-extrabold text-gov-blue bg-blue-50 px-2 py-0.5 rounded-full">
                STEP {item.step}
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-2">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Platform Capabilities</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-navy mt-1">
            Intelligent Tools for Standards & Safety
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gov-navy">{feat.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{feat.desc}</p>
                </div>
                <Link
                  to={feat.link}
                  className="mt-5 inline-flex items-center space-x-1 text-xs font-bold text-gov-blue hover:text-blue-800"
                >
                  <span>Explore Feature</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Consumer vs Industry Dedicated Dual Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Consumer Box */}
          <div className="bg-gradient-to-br from-blue-900 to-gov-navy text-white p-8 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-800 rounded-lg">
                <Users className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold">For Indian Consumers & Citizens</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Protect your family from substandard, hazardous counterfeit goods. Verify ISI licence numbers on kitchenware, packaged water, and laser-engraved HUID codes on gold jewellery.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-200 mb-6">
              <li className="flex items-center space-x-2">
                <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verify 7-digit CM/L mark authenticity in 1 click</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Check 6-character HUID for 22K 916 gold hallmarking purity</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ask everyday safety questions in Hindi and 10 regional languages</span>
              </li>
            </ul>
            <Link
              to="/verify-isi"
              className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-4 py-2 rounded-lg text-xs"
            >
              <span>Verify a Product Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Industry Box */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-slate-700 rounded-lg">
                <Building className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold">For Manufacturers & MSMEs</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Stay ahead of mandatory Quality Control Orders (QCOs). Navigate Scheme-I (ISI Mark) licensing requirements, factory testing checklists, and prepare for official technical audits.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-200 mb-6">
              <li className="flex items-center space-x-2">
                <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automatic product to applicable IS code resolution</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Statutory QCO enforcement tracking and deadline monitoring</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Download audit-ready pre-assessment compliance reports</span>
              </li>
            </ul>
            <Link
              to="/certification"
              className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-4 py-2 rounded-lg text-xs"
            >
              <span>Launch 10-Step Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <HelpCircle className="w-8 h-8 text-gov-blue mx-auto mb-2" />
          <h2 className="text-2xl font-extrabold text-gov-navy">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 mt-1">Official guidelines regarding Indian Standards and BIS compliance</p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900">{f.q}</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
