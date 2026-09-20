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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Introduction */}
      <div>
        <span className="text-xs font-bold text-gov-blue uppercase tracking-wider">Product-to-Standard Matcher</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-navy mt-1">
          Find the Applicable Indian Standard (IS Code)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Input your product specifications to identify the official standard, mandatory certification rules, 
          applicable Quality Control Orders (QCOs), and crucial testing clauses.
        </p>
      </div>

      {/* Quick Test Samples Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center space-x-2 overflow-x-auto shadow-xs">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
          Quick Test Products:
        </span>
        {sampleProducts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleLoadSample(p)}
            className="text-xs bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-gov-blue border border-slate-200 rounded-lg px-3 py-1 font-medium whitespace-nowrap transition-colors"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Input Form & Resolution Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs h-fit space-y-4">
          <h3 className="text-sm font-bold text-gov-navy uppercase tracking-wider flex items-center space-x-2">
            <Search className="w-4 h-4 text-gov-blue" />
            <span>Product Specifications</span>
          </h3>

          <form onSubmit={handleMatch} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Pressure Cooker, Cement, Steel Pipe"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Kitchenware"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Capacity / Size</label>
                <input
                  type="text"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="e.g. 5 Litres, 50 kg"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Material</label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. Aluminium Alloy / Stainless Steel"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Intended Use</label>
              <textarea
                rows={2}
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
                placeholder="e.g. Domestic cooking under pressure"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gov-blue hover:bg-blue-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-xs transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Matching Standards Database...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Identify Applicable Standard</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">
          {!result && !loading && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-700">No Standard Matched Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Fill out the product information on the left or click one of the quick test products above to resolve its applicable Indian Standard.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fadeIn">
              {/* Primary Match Card */}
              <div className="bg-white border-2 border-blue-500/30 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-gov-navy text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">
                      Applicable Standard
                    </span>
                    {result.mandatory_certification && (
                      <span className="bg-red-100 text-red-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Mandatory BIS Certification
                      </span>
                    )}
                  </div>

                  {/* Retrieval Confidence Indicator with explicit disclaimer */}
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-700">
                      Retrieval Confidence: {(result.confidence_score * 100).toFixed(0)}%
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      Information retrieval score
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-gov-navy">
                  {result.matched_standard?.is_number || "Not Found"}
                </h2>
                <p className="text-sm font-semibold text-slate-700 mt-1">
                  {result.matched_standard?.title}
                </p>

                {/* Why this standard? */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Why this standard applies:
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {result.why_this_standard}
                  </p>
                </div>

                {/* Statutory QCO Box */}
                {result.applicable_qco && (
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start space-x-3 text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-amber-900">Quality Control Order (QCO):</span>
                      <p className="text-amber-800 mt-0.5 font-medium">{result.applicable_qco}</p>
                      <span className="text-[11px] text-amber-700 mt-0.5 block">{result.qco_enforcement_date}</span>
                    </div>
                  </div>
                )}

                {/* Key Technical Requirements */}
                {result.key_requirements && result.key_requirements.length > 0 && (
                  <div className="mt-5 space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Important Mandatory Requirements:
                    </h4>
                    <div className="space-y-1.5">
                      {result.key_requirements.map((req, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
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
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
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
                          className="bg-white hover:bg-blue-50/50 p-3 rounded-xl border border-slate-200 hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <span className="text-xs font-bold text-gov-blue">{cl.clause_number}: {cl.title}</span>
                            <p className="text-xs text-slate-600 mt-0.5">{cl.summary}</p>
                          </div>
                          <span className="text-[11px] text-gov-blue font-bold ml-2 underline shrink-0">
                            Inspect
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps & Action Bar */}
                <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={handleStartCertification}
                    className="inline-flex items-center space-x-2 bg-gov-blue hover:bg-blue-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs transition-colors"
                  >
                    <span>Start Certification Workflow</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://www.services.bis.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-slate-600 hover:text-gov-blue inline-flex items-center space-x-1"
                  >
                    <span>Official Gazette Document</span>
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
