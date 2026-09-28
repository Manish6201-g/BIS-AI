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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>05 — Gold Precious Metals Hallmarking</span>
        </div>
        <h1 className="editorial-headline text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
          Verify Gold Jewellery (6-Digit HUID)
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
          The Hallmark Unique Identification (HUID) is a 6-character alphanumeric code laser-etched onto every piece of certified gold jewellery sold in India. Query the central assaying registry for purity grade and assaying centre credentials.
        </p>
      </div>

      {/* Hallmark 3-Mark Visual Guide Card */}
      <div className="bg-white border border-zinc-300 rounded-2xl p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-black" />
            <h3 className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider">
              Mandatory Identification Marks on BIS Hallmarked Gold
            </h3>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">IS 1417 : 2016 Compliant</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-5">
          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
            <div className="text-2xl mb-1">🔺</div>
            <h4 className="text-xs font-mono font-bold text-zinc-900 uppercase">1. BIS Standard Mark</h4>
            <p className="text-[11px] text-zinc-600 mt-1">Official triangular logo of Bureau of Indian Standards</p>
          </div>

          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
            <div className="text-xl font-mono font-black text-black mb-1">22K 916</div>
            <h4 className="text-xs font-mono font-bold text-zinc-900 uppercase">2. Purity & Fineness</h4>
            <p className="text-[11px] text-zinc-600 mt-1">22K916 (91.6%), 18K750 (75%), 14K585 (58.5%)</p>
          </div>

          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
            <div className="text-xl font-mono font-black text-black tracking-widest mb-1">AA1234</div>
            <h4 className="text-xs font-mono font-bold text-zinc-900 uppercase">3. 6-Character HUID</h4>
            <p className="text-[11px] text-zinc-600 mt-1">Unique laser-etched alphanumeric identifier</p>
          </div>
        </div>
      </div>

      {/* Quick Demo Test Buttons */}
      <div className="bg-white p-4 rounded-xl border border-zinc-300 shadow-2xs space-y-2.5">
        <label className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
          Preset Audit Samples:
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
              className="text-xs font-mono bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
            >
              {d.label} <span className="font-bold text-black">({d.code})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form & Camera QR Scanner Simulation */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-300 shadow-2xs">
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
              Enter 6-Character Alphanumeric HUID <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={6}
                value={huid}
                onChange={(e) => setHuid(e.target.value.toUpperCase())}
                placeholder="e.g. AA1234 or B7K89M"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-3 text-base text-zinc-900 focus:outline-none focus:border-black focus:bg-white font-mono tracking-widest uppercase font-bold transition-all shadow-inner"
              />
            </div>
            <p className="text-[11px] font-mono text-zinc-500 mt-1.5">
              Inspection Note: Inspect with 10x magnification on inner curve or clasp.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="submit"
              disabled={loading || scanning}
              className="bg-black hover:bg-zinc-800 text-white font-mono text-xs font-bold uppercase py-2.5 px-6 rounded-xl flex items-center space-x-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Querying Registry...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-white" />
                  <span>Verify HUID Authenticity</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={simulateQRScan}
              disabled={scanning}
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 font-mono text-xs font-bold uppercase py-2.5 px-4 rounded-xl flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-zinc-700" />
              <span>{scanning ? "Scanning Camera / QR..." : "Simulate QR Scan"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Verification Result */}
      {result && (
        <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          {/* Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200">
            <div className="flex items-center space-x-3">
              {result.status === 'VERIFIED' ? (
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 text-black flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-black" />
                </div>
              ) : result.status === 'UNVERIFIED' ? (
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-red-100 border border-red-200 text-red-700 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              )}

              <div>
                <h2 className="editorial-headline text-lg sm:text-xl font-bold uppercase text-black">
                  {result.status === 'VERIFIED' ? '✓ BIS Hallmarking Authenticity Verified' :
                   result.status === 'UNVERIFIED' ? '⚠ HUID Not Registered in Portal' :
                   '❌ Invalid HUID Format'}
                </h2>
                <p className="text-xs font-mono text-zinc-500 mt-0.5">
                  HUID Code: <span className="font-mono font-bold text-black text-sm tracking-wider">{result.huid}</span>
                </p>
              </div>
            </div>

            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              result.status === 'VERIFIED' ? 'bg-black text-white' :
              result.status === 'UNVERIFIED' ? 'bg-zinc-200 text-zinc-800' :
              'bg-red-600 text-white'
            }`}>
              {result.status}
            </span>
          </div>

          {/* Details */}
          {result.is_valid && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Article Type</span>
                <p className="text-sm font-bold text-black">{result.article_type}</p>
                <p className="text-black font-black text-base mt-1">{result.purity_fineness}</p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Assaying & Hallmarking Centre (AHC)</span>
                <p className="text-xs font-bold text-black">{result.hallmarking_centre}</p>
                <p className="text-zinc-600 mt-0.5">AHC Reg: {result.ahc_registration_number}</p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Hallmarking Date</span>
                <p className="text-xs font-bold text-black">{result.hallmarking_date}</p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Registered Jeweller</span>
                <p className="text-xs font-bold text-black">ID: {result.jeweller_registration_number}</p>
                <p className="text-[11px] text-zinc-500">Authorized Retail Partner</p>
              </div>
            </div>
          )}

          {/* Remarks */}
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
            <span className="font-mono font-bold text-black uppercase tracking-wider block mb-1">Official Finding:</span>
            <p className="text-zinc-700 leading-relaxed font-mono">{result.remarks}</p>
          </div>
        </div>
      )}
    </div>
  );
};
