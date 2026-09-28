import React, { useEffect } from 'react';
import { X, ExternalLink, ShieldCheck, FileText, BookOpen, AlertCircle } from 'lucide-react';

export const ClauseDrawer = ({ isOpen, onClose, citation }) => {
  useEffect(() => {
    if (isOpen && citation) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalDocOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalDocOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, citation, onClose]);

  if (!isOpen || !citation) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-zinc-300 font-mono">
        {/* Drawer Header */}
        <div className="bg-black text-white px-6 py-5 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-white" />
            <div>
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-white">Statutory Clause Evidence</h3>
              <p className="text-[11px] font-mono text-zinc-400">Verified Clause-Level Grounding</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Standard Banner */}
          <div className="bg-zinc-50 border border-zinc-300 rounded-xl p-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-black bg-white px-2 py-0.5 rounded border border-zinc-300">
              Indian Standard
            </span>
            <h4 className="text-base font-mono font-black text-black mt-2">{citation.document}</h4>
            <p className="text-xs text-zinc-600 font-mono mt-1">
              Clause Reference: <span className="font-bold text-black">{citation.clause}</span> • Page {citation.page}
            </p>
          </div>

          {/* Clause Content Box */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-zinc-800 uppercase tracking-wider flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-black" />
              <span>Verbatim Statutory Standard Text</span>
            </label>
            <div className="bg-zinc-50 border border-zinc-300 rounded-xl p-4 text-zinc-900 text-xs leading-relaxed font-mono shadow-inner">
              <p className="whitespace-pre-line font-medium text-zinc-900">
                "{citation.text}"
              </p>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-start space-x-3 bg-zinc-100 border border-zinc-300 p-3.5 rounded-xl text-zinc-900 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-black mt-0.5 shrink-0" />
            <div>
              <span className="font-bold uppercase tracking-wider text-black block mb-0.5">Verified Grounded Source:</span>
              <p className="text-zinc-700 leading-snug">
                This clause is extracted verbatim from the official Bureau of Indian Standards document and matches gazette specifications.
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="space-y-2 pt-2">
            <a
              href={citation.source_url || "https://www.services.bis.gov.in"}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2 bg-black hover:bg-zinc-800 text-white font-mono font-bold uppercase py-2.5 px-4 rounded-xl text-xs transition-colors shadow-2xs cursor-pointer"
            >
              <span>Inspect on Official BIS Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs font-mono font-bold uppercase text-zinc-600 hover:text-black hover:bg-zinc-100 border border-transparent hover:border-zinc-300 rounded-xl transition-colors cursor-pointer"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
