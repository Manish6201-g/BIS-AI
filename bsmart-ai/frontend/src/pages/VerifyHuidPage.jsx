import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  QrCode, 
  Camera, 
  ShieldCheck, 
  ExternalLink,
  Award
} from 'lucide-react';
import { verificationService } from '../services/api';

export const VerifyHuidPage = () => {
  const [huid, setHuid] = useState('AA1234');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const demoHUIDs = [
    { label: "22K Gold Bangle (Valid)", code: "AA1234", desc: "22K 916 (Mumbai AHC)" },
    { label: "18K Gold Necklace (Valid)", code: "B7K89M", desc: "18K 750 (Chennai AHC)" },
    { label: "24K Gold Coin (Valid)", code: "X9Y1Z2", desc: "24K 999 (Delhi Lab)" },
    { label: "Invalid Code Format", code: "123", desc: "Wrong format" },
    { label: "Unregistered HUID", code: "ZZ9999", desc: "Not in registry" }
  ];

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    if (!huid.trim()) return;

    setLoading(true);
    try {
      const res = await verificationService.verifyHUID(huid.trim());
      setResult(res.data);
    } catch (err) {
      console.error("HUID error:", err);
    } finally {
      setLoading(false);
    }
  };

  const simulateQRScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setHuid("B7K89M");
      handleVerify();
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">BIS Hallmarking Portal</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-navy mt-1">
          Verify Gold Jewellery (6-Digit HUID)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          The Hallmark Unique Identification (HUID) is a 6-character alphanumeric code laser-etched onto every piece of certified gold jewellery sold in India. Check the purity grade and assaying centre credentials.
        </p>
      </div>

      {/* Hallmark 3-Mark Visual Guide Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-100/40 to-yellow-50 border border-amber-300/60 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center space-x-2 mb-3">
          <Award className="w-5 h-5 text-amber-700" />
          <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wide">
            The 3 Mandatory Marks on Genuine BIS Hallmarked Gold
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-4">
          <div className="bg-white/90 p-4 rounded-xl border border-amber-200 shadow-xs">
            <div className="text-2xl mb-1">🔺</div>
            <h4 className="text-xs font-bold text-slate-900">1. BIS Standard Mark</h4>
            <p className="text-[11px] text-slate-600 mt-1">Official triangular logo of Bureau of Indian Standards</p>
          </div>

          <div className="bg-white/90 p-4 rounded-xl border border-amber-200 shadow-xs">
            <div className="text-xl font-black text-amber-800 mb-1">22K 916</div>
            <h4 className="text-xs font-bold text-slate-900">2. Purity & Fineness</h4>
            <p className="text-[11px] text-slate-600 mt-1">22K916 (91.6%), 18K750 (75%), 14K585 (58.5%)</p>
          </div>

          <div className="bg-white/90 p-4 rounded-xl border border-amber-200 shadow-xs">
            <div className="text-xl font-mono font-black text-gov-blue tracking-widest mb-1">AA1234</div>
            <h4 className="text-xs font-bold text-slate-900">3. 6-Character HUID</h4>
            <p className="text-[11px] text-slate-600 mt-1">Unique laser-etched alphanumeric identifier</p>
          </div>
        </div>
      </div>

      {/* Quick Demo Test Buttons */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Demo Test Records:
        </label>
        <div className="flex flex-wrap gap-2">
          {demoHUIDs.map((d, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setHuid(d.code);
                setResult(null);
              }}
              className="text-xs bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              {d.label} ({d.code})
            </button>
          ))}
        </div>
      </div>

      {/* Input Form & Camera QR Scanner Simulation */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Enter 6-Character Alphanumeric HUID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={6}
                value={huid}
                onChange={(e) => setHuid(e.target.value.toUpperCase())}
                placeholder="e.g. AA1234 or B7K89M"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-mono tracking-widest uppercase font-bold"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Look closely with a magnifying glass on the inner curve of the ring or back of the clasp.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading || scanning}
              className="bg-gov-navy hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center space-x-2 shadow-xs transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching Hallmarking Registry...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-amber-400" />
                  <span>Verify HUID Authenticity</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={simulateQRScan}
              disabled={scanning}
              className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center space-x-2 transition-colors"
            >
              <QrCode className="w-4 h-4 text-amber-700" />
              <span>{scanning ? "Scanning Camera / QR..." : "Simulate QR Scan"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Verification Result */}
      {result && (
        <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          {/* Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              {result.status === 'VERIFIED' ? (
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-amber-600" />
                </div>
              ) : result.status === 'UNVERIFIED' ? (
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-amber-600" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center">
                  <XCircle className="w-7 h-7" />
                </div>
              )}

              <div>
                <h2 className="text-xl font-extrabold text-gov-navy">
                  {result.status === 'VERIFIED' ? '✓ BIS Hallmarking Authenticity Verified' :
                   result.status === 'UNVERIFIED' ? '⚠ HUID Not Registered in Portal' :
                   '❌ Invalid HUID Format'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  HUID Code: <span className="font-mono font-extrabold text-slate-900 text-sm tracking-wider">{result.huid}</span>
                </p>
              </div>
            </div>

            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
              result.status === 'VERIFIED' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
              result.status === 'UNVERIFIED' ? 'bg-slate-100 text-slate-700' :
              'bg-red-100 text-red-800'
            }`}>
              {result.status}
            </span>
          </div>

          {/* Details */}
          {result.is_valid && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-1">
                <span className="text-amber-800 font-bold uppercase tracking-wider text-[10px]">Article Type</span>
                <p className="text-sm font-bold text-slate-900">{result.article_type}</p>
                <p className="text-amber-900 font-extrabold text-base mt-1">{result.purity_fineness}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Assaying & Hallmarking Centre (AHC)</span>
                <p className="text-xs font-bold text-slate-900">{result.hallmarking_centre}</p>
                <p className="text-slate-600 font-mono mt-0.5">AHC Reg: {result.ahc_registration_number}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Hallmarking Date</span>
                <p className="text-xs font-bold text-slate-900">{result.hallmarking_date}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Registered Jeweller</span>
                <p className="text-xs font-bold text-slate-900">ID: {result.jeweller_registration_number}</p>
                <p className="text-[11px] text-slate-500">Authorized Retail Partner</p>
              </div>
            </div>
          )}

          {/* Remarks */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-800 block mb-1">Official Finding:</span>
            <p className="text-slate-600 leading-relaxed">{result.remarks}</p>
          </div>
        </div>
      )}
    </div>
  );
};
