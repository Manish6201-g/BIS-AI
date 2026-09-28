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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>03 — NATIONAL GAZETTE REPOSITORY</span>
        </div>
        <h1 className="editorial-headline text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-black mt-1 leading-none">
          INDIAN STANDARDS (IS) DIRECTORY
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-3xl leading-relaxed">
          Browse verified Indian Standards published under statutory gazettes. Inspect granular clauses, mandatory parameters, and laboratory test protocols.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-[24px] border border-zinc-300 shadow-xs space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by IS code (e.g. IS 2347, IS 269) or keyword..."
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-black placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white uppercase transition-all"
            />
          </div>

          <div className="w-full sm:w-72">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-mono text-black focus:outline-none focus:border-black font-medium cursor-pointer"
            >
              {categories.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-black hover:bg-zinc-800 text-white font-mono text-xs font-bold uppercase px-6 py-2.5 rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>SEARCH STANDARDS</span>
          </button>
        </form>

        <div className="flex items-center space-x-2 pt-3 border-t border-zinc-100 text-xs font-mono">
          <label className="flex items-center space-x-2 cursor-pointer text-zinc-700 font-bold">
            <input
              type="checkbox"
              checked={mandatoryOnly}
              onChange={(e) => setMandatoryOnly(e.target.checked)}
              className="rounded border-zinc-400 accent-black text-black focus:ring-black w-4 h-4 cursor-pointer"
            />
            <span className="uppercase text-[11px] tracking-wide">Show Only Mandatory Quality Control Orders (QCO)</span>
          </label>
        </div>
      </div>

      {/* Standards List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-zinc-500 bg-white rounded-[24px] border border-zinc-300 font-mono">
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-2.5"></div>
            <span className="text-xs uppercase font-bold tracking-wider">Synchronizing gazetted standards repository...</span>
          </div>
        ) : standards.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 bg-white rounded-[24px] border border-zinc-300 font-mono space-y-2">
            <BookOpen className="w-10 h-10 text-zinc-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold uppercase text-black">No Standards Found</h3>
            <p className="text-xs text-zinc-600 font-sans">Try broadening your search query or changing filters.</p>
          </div>
        ) : (
          standards.map((std) => (
            <div
              key={std.id}
              className="bg-white p-6 sm:p-7 rounded-[24px] border border-zinc-300 shadow-xs hover:border-black transition-all space-y-4 group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-black text-white text-xs font-black px-3 py-1 rounded-md font-mono">
                    {std.is_number}
                  </span>
                  {std.mandatory_status && (
                    <span className="bg-red-50 text-red-900 border border-red-200 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded uppercase">
                      MANDATORY QCO
                    </span>
                  )}
                  <span className="bg-zinc-100 text-zinc-800 border border-zinc-200 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded uppercase">
                    {std.category}
                  </span>
                </div>

                <a
                  href={std.source_url || "https://www.services.bis.gov.in"}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-zinc-500 hover:text-black font-bold uppercase inline-flex items-center space-x-1"
                >
                  <span>GAZETTE NOTIFICATION</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <h3 className="text-lg font-black uppercase text-black tracking-tight">{std.title}</h3>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed font-normal">{std.scope}</p>
              </div>

              {std.qco_reference && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs flex items-center space-x-2 text-amber-950 font-mono">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span><strong>STATUTORY ORDER:</strong> {std.qco_reference}</span>
                </div>
              )}

              {/* Clauses Preview */}
              {std.clauses && std.clauses.length > 0 && (
                <div className="pt-3 border-t border-zinc-100">
                  <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">
                    KEY STANDARD CLAUSES (CLICK TO INSPECT RECORD):
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
                        className="text-xs font-mono bg-zinc-50 hover:bg-zinc-100 text-zinc-800 hover:text-black border border-zinc-200 hover:border-black px-3 py-1.5 rounded-xl font-bold transition-all text-left shadow-2xs cursor-pointer"
                      >
                        <strong className="text-black">Clause {cl.clause_number}:</strong> {cl.title}
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
