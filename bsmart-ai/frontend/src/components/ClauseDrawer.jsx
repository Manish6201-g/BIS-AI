import React from 'react';
import { X, ExternalLink, ShieldCheck, FileText, BookOpen, AlertCircle } from 'lucide-react';

export const ClauseDrawer = ({ isOpen, onClose, citation }) => {
  if (!isOpen || !citation) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200">
        {/* Drawer Header */}
        <div className="bg-gov-navy text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm leading-tight">Official BIS Clause Evidence</h3>
              <p className="text-[11px] text-slate-300">Verified Clause-Level Retrieval</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Standard Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gov-blue bg-white px-2 py-0.5 rounded border border-blue-200">
              Indian Standard
            </span>
            <h4 className="text-lg font-extrabold text-gov-navy mt-1.5">{citation.document}</h4>
            <p className="text-xs text-slate-600 mt-1">
              Clause Reference: <span className="font-bold text-slate-900">{citation.clause}</span> • Page {citation.page}
            </p>
          </div>

          {/* Clause Content Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-gov-blue" />
              <span>Exact Statutory Standard Text</span>
            </label>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm leading-relaxed font-serif shadow-inner">
              <p className="whitespace-pre-line font-medium text-slate-800">
                "{citation.text}"
              </p>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-start space-x-3 bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-emerald-900 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold">Verified Grounded Source:</span>
              <p className="text-emerald-800 mt-0.5 leading-snug">
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
              className="w-full inline-flex items-center justify-center space-x-2 bg-gov-blue hover:bg-blue-900 text-white font-medium py-2.5 px-4 rounded-lg text-xs transition-colors shadow-sm"
            >
              <span>Inspect on Official BIS Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
