import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Layers, 
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { matcherService } from '../services/api';
import { ClauseDrawer } from '../components/ClauseDrawer';

export const ProductMatcherPage = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('Pressure Cooker');
  const [category, setCategory] = useState('Kitchen Appliances');
  const [material, setMaterial] = useState('Aluminium Alloy / Stainless Steel');
  const [capacity, setCapacity] = useState('5 Litres');
  const [intendedUse, setIntendedUse] = useState('Domestic food cooking under steam pressure');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Clause drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeClause, setActiveClause] = useState(null);

  const sampleProducts = [
    { name: "Pressure Cooker", cat: "Kitchen Appliances", mat: "Aluminium / SS 304", cap: "5 Litres" },
    { name: "Ordinary Portland Cement", cat: "Civil Construction", mat: "Clinker & Gypsum", cap: "50 kg bag" },
    { name: "Packaged Drinking Water", cat: "Food & Beverages", mat: "PET bottle", cap: "1 Litre" },
    { name: "Gold Jewellery Ring", cat: "Precious Metals", mat: "Gold 22 Karat", cap: "8 grams" },
    { name: "Lithium-ion Power Bank", cat: "Electronics / CRS", mat: "Lithium Polymer", cap: "10000 mAh" }
  ];

  const handleMatch = async (e) => {
    if (e) e.preventDefault();
    if (!productName.trim()) return;

    setLoading(true);
    try {
      const response = await matcherService.matchProduct({
        product_name: productName,
        category,
        material,
        capacity,
        intended_use: intendedUse
      });
      setResult(response.data);
    } catch (err) {
      console.error("Match error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = (sample) => {
    setProductName(sample.name);
    setCategory(sample.cat);
    setMaterial(sample.mat);
    setCapacity(sample.cap);
    setResult(null);
  };

  const handleStartCertification = () => {
    if (!result || !result.matched_standard) return;
    navigate('/certification', {
      state: {
        product_name: result.product_name,
        is_number: result.matched_standard.is_number
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Title & Introduction */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>02 — PRODUCT-TO-STANDARD RESOLUTION</span>
        </div>
        <h1 className="editorial-headline text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-black mt-1 leading-none">
          FIND APPLICABLE INDIAN STANDARDS
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-3xl leading-relaxed">
          Input your product specifications to resolve the official standard, mandatory certification rules, 
          applicable Quality Control Orders (QCOs), and crucial statutory testing clauses.
        </p>
      </div>

      {/* Quick Test Samples Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-300 flex items-center space-x-2 overflow-x-auto shadow-xs">
        <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">
          PRESETS:
        </span>
        {sampleProducts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleLoadSample(p)}
            className="font-mono text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 hover:border-black rounded-lg px-3 py-1.5 font-bold whitespace-nowrap transition-colors cursor-pointer"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Input Form & Resolution Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-[24px] border border-zinc-300 shadow-xs h-fit space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <div className="flex items-center space-x-2 font-mono">
              <Search className="w-4 h-4 text-black" />
              <span className="text-xs font-bold uppercase tracking-wider text-black">Product Specifications</span>
            </div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase">STEP 1 OF 2</span>
          </div>

          <form onSubmit={handleMatch} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block font-bold uppercase text-zinc-700 mb-1 tracking-wider text-[11px]">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Pressure Cooker, Cement, Steel Pipe"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs text-black font-mono placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white uppercase transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase text-zinc-700 mb-1 tracking-wider text-[11px]">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Kitchenware"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs text-black font-mono placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white uppercase transition-all"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-zinc-700 mb-1 tracking-wider text-[11px]">Capacity / Size</label>
                <input
                  type="text"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="e.g. 5 Litres, 50 kg"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs text-black font-mono placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white uppercase transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase text-zinc-700 mb-1 tracking-wider text-[11px]">Primary Material</label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. Aluminium Alloy / Stainless Steel"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs text-black font-mono placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white uppercase transition-all"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-zinc-700 mb-1 tracking-wider text-[11px]">Intended Use</label>
              <textarea
                rows={2}
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
                placeholder="e.g. Domestic cooking under pressure"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs text-black font-mono placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-zinc-800 disabled:opacity-40 text-white font-mono font-bold uppercase py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Matching Standards Database...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>IDENTIFY APPLICABLE STANDARD</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">
          {!result && !loading && (
            <div className="bg-white p-10 rounded-[24px] border border-zinc-300 text-center space-y-3 shadow-xs">
              <BookOpen className="w-12 h-12 text-zinc-400 mx-auto" />
              <h3 className="font-mono text-sm font-bold uppercase tracking-wide text-black">No Standard Matched Yet</h3>
              <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
                Fill out the product information on the left or select a quick preset product to resolve its official Indian Standard.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fadeIn">
              {/* Primary Match Card */}
              <div className="bg-white border-2 border-black rounded-[24px] p-6 sm:p-8 shadow-xs relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-zinc-200">
                  <div className="flex items-center space-x-2">
                    <span className="bg-black text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-md uppercase">
                      MATCHED STANDARD
                    </span>
                    {result.mandatory_certification && (
                      <span className="bg-red-50 text-red-900 border border-red-200 text-[11px] font-mono font-bold px-2.5 py-1 rounded-md uppercase">
                        MANDATORY QCO
                      </span>
                    )}
                  </div>

                  {/* Retrieval Confidence Indicator */}
                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{(result.confidence_score * 100).toFixed(0)}% CONFIDENCE</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 block uppercase">
                      Gazette Grounded
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-mono font-black text-black tracking-tight">
                  {result.matched_standard?.is_number || "Not Found"}
                </h2>
                <p className="text-sm font-bold uppercase text-zinc-700 mt-1">
                  {result.matched_standard?.title}
                </p>

                {/* Why this standard? */}
                <div className="mt-4 pt-4 border-t border-zinc-200">
                  <h4 className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    Statutory Applicability Rationale:
                  </h4>
                  <p className="text-xs text-zinc-700 leading-relaxed bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                    {result.why_this_standard}
                  </p>
                </div>

                {/* Statutory QCO Box */}
                {result.applicable_qco && (
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-amber-950">
                    <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <span className="font-mono font-bold uppercase tracking-wider text-amber-900 block text-[11px]">
                        MANDATORY QUALITY CONTROL ORDER (QCO):
                      </span>
                      <p className="text-zinc-800 font-semibold leading-snug">{result.applicable_qco}</p>
                      <span className="font-mono text-[10px] text-amber-800 block pt-1">{result.qco_enforcement_date}</span>
                    </div>
                  </div>
                )}

                {/* Key Technical Requirements */}
                {result.key_requirements && result.key_requirements.length > 0 && (
                  <div className="mt-5 space-y-2">
                    <h4 className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                      Important Mandatory Test Specifications:
                    </h4>
                    <div className="space-y-1.5">
                      {result.key_requirements.map((req, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-zinc-800 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Relevant Clauses */}
                {result.relevant_clauses && result.relevant_clauses.length > 0 && (
                  <div className="mt-5 space-y-2">
                    <h4 className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                      Crucial Compliance Clauses:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {result.relevant_clauses.map((cl, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setActiveClause({
                              document: result.matched_standard?.is_number || "IS Standard",
                              clause: cl.clause_number,
                              page: 5,
                              text: cl.summary,
                              source_url: "https://www.services.bis.gov.in"
                            });
                            setDrawerOpen(true);
                          }}
                          className="bg-white hover:bg-zinc-50 p-3.5 rounded-xl border border-zinc-200 hover:border-black transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                        >
                          <div>
                            <span className="font-mono text-xs font-bold text-black">{cl.clause_number}: {cl.title}</span>
                            <p className="text-xs text-zinc-600 mt-0.5">{cl.summary}</p>
                          </div>
                          <span className="font-mono text-[11px] text-zinc-500 group-hover:text-black font-bold ml-2 underline shrink-0">
                            INSPECT
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps & Action Bar */}
                <div className="mt-6 pt-5 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                  <button
                    onClick={handleStartCertification}
                    className="inline-flex items-center space-x-2 bg-black hover:bg-zinc-800 text-white font-bold px-5 py-3 rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                  >
                    <span>Launch Certification Scheme</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://www.services.bis.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-600 hover:text-black font-bold inline-flex items-center space-x-1"
                  >
                    <span>GAZETTE RECORD</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Clause Drawer */}
      <ClauseDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        citation={activeClause}
      />
    </div>
  );
};
