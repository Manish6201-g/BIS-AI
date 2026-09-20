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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-gov-blue uppercase tracking-wider">Product Authenticity Check</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-navy mt-1">
          Verify ISI Mark & CM/L Licence Number
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          The Bureau of Indian Standards mandates a 7-digit Certification Marks Licence (CM/L) number under every authentic ISI logo. Check whether a licence is genuinely operative.
        </p>
      </div>

      {/* Quick Demo Test Buttons */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Demo Test Records:
        </label>
        <div className="flex flex-wrap gap-2">
          {demoLicenses.map((d, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectDemo(d)}
              className="text-xs bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-gov-blue border border-slate-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Input Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                7-Digit CM/L Licence Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={cmlNumber}
                onChange={(e) => setCmlNumber(e.target.value)}
                placeholder="e.g. 8400123 or CM/L-8400123"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Product Description (Optional)</label>
              <input
                type="text"
                value={productHint}
                onChange={(e) => setProductHint(e.target.value)}
                placeholder="e.g. Pressure Cooker"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-gov-blue"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gov-blue hover:bg-blue-900 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-xs transition-colors"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Checking BIS Central Registry...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Verify Licence Authenticity</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Presentation */}
      {result && (
        <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          {/* Status Header Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              {result.status === 'VERIFIED' ? (
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
              ) : result.status === 'UNVERIFIED' ? (
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center">
                  <XCircle className="w-7 h-7" />
                </div>
              )}

              <div>
                <h2 className="text-xl font-extrabold text-gov-navy">
                  {result.status === 'VERIFIED' ? '✓ Genuine BIS Licence (Verified)' :
                   result.status === 'UNVERIFIED' ? '⚠ Record Not Found in Mirror Registry' :
                   '❌ Invalid or Expired CM/L Licence'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  CM/L Number: <span className="font-mono font-bold text-slate-900">{result.cml_number}</span>
                </p>
              </div>
            </div>

            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
              result.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
              result.status === 'UNVERIFIED' ? 'bg-amber-100 text-amber-800' :
              'bg-red-100 text-red-800'
            }`}>
              {result.operative_status || result.status}
            </span>
          </div>

          {/* Details Grid */}
          {result.is_valid && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Manufacturer Name</span>
                <p className="text-sm font-bold text-slate-900">{result.manufacturer_name}</p>
                <p className="text-slate-600 mt-1">{result.factory_address}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Certified Product</span>
                <p className="text-sm font-bold text-gov-blue">{result.product_name}</p>
                <p className="text-slate-700 font-semibold mt-1">Conforms to: {result.is_standard}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Licence Validity</span>
                <p className="text-xs font-medium text-slate-800">
                  Valid from: <span className="font-bold">{result.valid_from}</span> to <span className="font-bold">{result.valid_until}</span>
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Official Authority</span>
                <p className="text-xs font-medium text-slate-700">{result.source}</p>
              </div>
            </div>
          )}

          {/* Remarks & Advisory */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-800 block mb-1">Advisory / Remarks:</span>
            <p className="text-slate-600 leading-relaxed">{result.remarks}</p>
          </div>

          <div className="pt-2 text-right">
            <a
              href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-gov-blue hover:text-blue-900 inline-flex items-center space-x-1"
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
