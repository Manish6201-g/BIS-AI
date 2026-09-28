import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  ShieldCheck, 
  Building2, 
  FileText, 
  Calendar,
  ExternalLink,
  Info
} from 'lucide-react';
import { verificationService } from '../services/api';

export const VerifyIsiPage = () => {
  const [cmlNumber, setCmlNumber] = useState('8400123');
  const [productHint, setProductHint] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const demoLicenses = [
    { label: "Hawkins Cookers (Valid)", cml: "8400123", hint: "Pressure Cooker", status: "VERIFIED" },
    { label: "UltraTech Cement (Valid)", cml: "7123456", hint: "OPC Cement", status: "VERIFIED" },
    { label: "Bisleri Water (Valid)", cml: "6001122", hint: "Packaged Drinking Water", status: "VERIFIED" },
    { label: "Expired Heater (Mismatch)", cml: "5009988", hint: "Water Heater", status: "EXPIRED" },
    { label: "Unknown Licence", cml: "1122334", hint: "Toys", status: "UNVERIFIED" }
  ];

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    if (!cmlNumber.trim()) return;

    setLoading(true);
    try {
      const res = await verificationService.verifyISI(cmlNumber, productHint);
      setResult(res.data);
    } catch (err) {
      console.error("Verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDemo = (d) => {
    setCmlNumber(d.cml);
    setProductHint(d.hint);
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>04 — STATUTORY LICENCE AUTHENTICATION</span>
        </div>
        <h1 className="editorial-headline text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-black mt-1 leading-none">
          VERIFY ISI MARK & CM/L LICENCE
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-2xl leading-relaxed">
          The Bureau of Indian Standards mandates a unique 7-digit Certification Marks Licence (CM/L) number under every authentic ISI monogram. Check whether a licence is genuinely operative.
        </p>
      </div>

      {/* Quick Demo Test Buttons */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-300 shadow-xs space-y-2 font-mono">
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
          PRESET AUDIT SAMPLES:
        </label>
        <div className="flex flex-wrap gap-2">
          {demoLicenses.map((d, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectDemo(d)}
              className="text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 hover:border-black px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer"
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Input Box */}
      <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-zinc-300 shadow-xs">
        <form onSubmit={handleVerify} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block font-bold uppercase text-zinc-700 mb-1 tracking-wider text-[11px]">
                7-Digit CM/L Licence Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={cmlNumber}
                onChange={(e) => setCmlNumber(e.target.value)}
                placeholder="e.g. 8400123 or CM/L-8400123"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-black uppercase focus:outline-none focus:border-black focus:bg-white font-mono transition-all"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-zinc-700 mb-1 tracking-wider text-[11px]">
                Product Description (Optional)
              </label>
              <input
                type="text"
                value={productHint}
                onChange={(e) => setProductHint(e.target.value)}
                placeholder="e.g. Pressure Cooker"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-black uppercase focus:outline-none focus:border-black focus:bg-white font-mono transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-black hover:bg-zinc-800 text-white font-mono font-bold uppercase py-3 px-6 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Querying Gazette Registry...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>VERIFY LICENCE AUTHENTICITY</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Presentation */}
      {result && (
        <div className="bg-white border-2 border-black rounded-[24px] p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          {/* Status Header Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200">
            <div className="flex items-center space-x-3">
              {result.status === 'VERIFIED' ? (
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-2xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
              ) : result.status === 'UNVERIFIED' ? (
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shadow-2xs">
                  <AlertTriangle className="w-7 h-7" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-center shadow-2xs">
                  <XCircle className="w-7 h-7" />
                </div>
              )}

              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight">
                  {result.status === 'VERIFIED' ? '✓ Genuine BIS Licence (Verified)' :
                   result.status === 'UNVERIFIED' ? '⚠ Record Not Found in Mirror Registry' :
                   '❌ Invalid or Expired CM/L Licence'}
                </h2>
                <p className="text-xs font-mono text-zinc-500 mt-0.5">
                  CM/L NUMBER: <span className="font-bold text-black">{result.cml_number}</span>
                </p>
              </div>
            </div>

            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase border ${
              result.status === 'VERIFIED' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' :
              result.status === 'UNVERIFIED' ? 'bg-amber-50 border-amber-200 text-amber-900' :
              'bg-red-50 border-red-200 text-red-900'
            }`}>
              {result.operative_status || result.status}
            </span>
          </div>

          {/* Details Grid */}
          {result.is_valid && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                <span className="text-zinc-400 font-bold block uppercase tracking-wider text-[10px]">Manufacturer Name</span>
                <p className="text-sm font-bold text-black">{result.manufacturer_name}</p>
                <p className="text-zinc-600 font-sans mt-1">{result.factory_address}</p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                <span className="text-zinc-400 font-bold block uppercase tracking-wider text-[10px]">Certified Product</span>
                <p className="text-sm font-bold text-black">{result.product_name}</p>
                <p className="text-zinc-700 font-semibold mt-1">Conforms to: {result.is_standard}</p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                <span className="text-zinc-400 font-bold block uppercase tracking-wider text-[10px]">Licence Validity</span>
                <p className="text-xs font-medium text-zinc-800">
                  Valid from: <span className="font-bold">{result.valid_from}</span> to <span className="font-bold">{result.valid_until}</span>
                </p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                <span className="text-zinc-400 font-bold block uppercase tracking-wider text-[10px]">Official Authority</span>
                <p className="text-xs font-medium text-zinc-700">{result.source}</p>
              </div>
            </div>
          )}

          {/* Remarks & Advisory */}
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs font-mono">
            <span className="font-bold text-black block mb-1 uppercase tracking-wider text-[11px]">Advisory / Remarks:</span>
            <p className="text-zinc-700 leading-relaxed font-sans">{result.remarks}</p>
          </div>

          <div className="pt-2 text-right">
            <a
              href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono font-bold text-zinc-600 hover:text-black uppercase inline-flex items-center space-x-1"
            >
              <span>Cross-verify on BIS National Conformity Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
