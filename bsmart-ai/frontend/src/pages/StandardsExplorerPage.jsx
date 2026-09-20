import React, { useState, useEffect } from 'react';
import { 
  Search, 
  FileText, 
  Shield, 
  Filter, 
  ExternalLink, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { standardsService } from '../services/api';
import { ClauseDrawer } from '../components/ClauseDrawer';

export const StandardsExplorerPage = () => {
  const [standards, setStandards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [mandatoryOnly, setMandatoryOnly] = useState(false);

  // Clause modal state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeClause, setActiveClause] = useState(null);

  const categories = [
    "All Categories",
    "Mechanical Engineering & Consumer Products",
    "Civil Engineering & Construction Materials",
    "Food & Agriculture Standards",
    "Metallurgical Engineering",
    "Hallmarking & Precious Metals",
    "Electronics & Information Technology (CRS)",
    "Consumer Products & Toys Safety"
  ];

  const fetchStandards = async () => {
    setLoading(true);
    try {
      const cat = categoryFilter === "All Categories" ? "" : categoryFilter;
      const res = await standardsService.search(searchQuery, cat, mandatoryOnly);
      setStandards(res.data);
    } catch (err) {
      console.error("Fetch standards error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandards();
  }, [categoryFilter, mandatoryOnly]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStandards();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-gov-blue uppercase tracking-wider">BIS Repository</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-navy mt-1">
          Indian Standards (IS) Directory & Clause Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Browse verified Indian Standards published under the authority of the Bureau of Indian Standards. Inspect granular clauses, quality specifications, and testing protocols.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by IS code (e.g. IS 2347, IS 269) or keyword..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue"
            />
          </div>

          <div className="w-full sm:w-64">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-gov-blue font-medium"
            >
              {categories.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-gov-blue hover:bg-blue-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-xs transition-colors whitespace-nowrap"
          >
            Search Standards
          </button>
        </form>

        <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 text-xs">
          <label className="flex items-center space-x-2 cursor-pointer text-slate-700 font-medium">
            <input
              type="checkbox"
              checked={mandatoryOnly}
              onChange={(e) => setMandatoryOnly(e.target.checked)}
              className="rounded border-slate-300 text-gov-blue focus:ring-gov-blue w-4 h-4"
            />
            <span>Show Only Standards under Mandatory Quality Control Order (QCO)</span>
          </label>
        </div>
      </div>

      {/* Standards List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            <div className="w-6 h-6 border-2 border-gov-blue border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <span className="text-xs font-medium">Loading standards from knowledge repository...</span>
          </div>
        ) : standards.length === 0 ? (
          <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No Standards Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try broadening your search query or changing filters.</p>
          </div>
        ) : (
          standards.map((std) => (
            <div
              key={std.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="bg-gov-navy text-white text-xs font-black px-3 py-1 rounded-md font-mono">
                    {std.is_number}
                  </span>
                  {std.mandatory_status && (
                    <span className="bg-red-100 text-red-800 text-[11px] font-bold px-2 py-0.5 rounded">
                      Mandatory QCO
                    </span>
                  )}
                  <span className="bg-blue-50 text-gov-blue text-[11px] font-semibold px-2 py-0.5 rounded">
                    {std.category}
                  </span>
                </div>

                <a
                  href={std.source_url || "https://www.services.bis.gov.in"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-500 hover:text-gov-blue inline-flex items-center space-x-1"
                >
                  <span>Official BIS Document</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <h3 className="text-base font-bold text-gov-navy">{std.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{std.scope}</p>
              </div>

              {std.qco_reference && (
                <div className="bg-amber-50/70 border border-amber-200 p-2.5 rounded-lg text-xs flex items-center space-x-2 text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span><strong>Statutory Order:</strong> {std.qco_reference}</span>
                </div>
              )}

              {/* Clauses Preview */}
              {std.clauses && std.clauses.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Key Standard Clauses (Click to inspect verbatim text):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {std.clauses.map((cl) => (
                      <button
                        key={cl.id}
                        onClick={() => {
                          setActiveClause({
                            document: std.is_number,
                            clause: `Clause ${cl.clause_number}`,
                            page: cl.page_number,
                            text: cl.content,
                            source_url: std.source_url
                          });
                          setDrawerOpen(true);
                        }}
                        className="text-xs bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-gov-blue border border-slate-200 hover:border-blue-300 px-2.5 py-1 rounded-lg font-medium transition-colors text-left"
                      >
                        <strong className="text-gov-blue">Clause {cl.clause_number}:</strong> {cl.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Clause Inspection Drawer */}
      <ClauseDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        citation={activeClause}
      />
    </div>
  );
};
