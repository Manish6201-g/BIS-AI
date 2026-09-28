import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  Save, 
  Download, 
  Building2, 
  CheckSquare, 
  Clock, 
  AlertTriangle,
  FileCheck,
  Printer
} from 'lucide-react';
import { certificationService } from '../services/api';

const STEPS = [
  { id: 1, title: "Select Product", short: "Product" },
  { id: 2, title: "Applicable Standard", short: "Standard" },
  { id: 3, title: "Certification Scope", short: "Scheme" },
  { id: 4, title: "Applicable QCO", short: "QCO" },
  { id: 5, title: "Factory Details", short: "Factory" },
  { id: 6, title: "Required Documents", short: "Documents" },
  { id: 7, title: "Testing Equipment", short: "Testing" },
  { id: 8, title: "Portal Guidance", short: "Submission" },
  { id: 9, title: "Pre-Audit Checklist", short: "Checklist" },
  { id: 10, title: "Compliance Summary", short: "Summary" }
];

export const CertificationWizardPage = () => {
  const location = useLocation();
  const initialProduct = location.state?.product_name || "Domestic Pressure Cooker";
  const initialStandard = location.state?.is_number || "IS 2347:2017";

  const [currentStep, setCurrentStep] = useState(1);
  const [workflowId, setWorkflowId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  // Form State across steps
  const [formData, setFormData] = useState({
    product_name: initialProduct,
    is_number: initialStandard,
    product_category: "Mechanical & Kitchen Appliances",
    brand_name: "Apex Chef",
    mandatory_confirmed: true,
    qco_name: "Pressure Cookers (Quality Control) Order, 2020",
    factory_name: "Apex Manufacturing Industries Pvt Ltd",
    factory_address: "Plot 42, Sector 8, IMT Manesar, Gurugram, Haryana 122051",
    manufacturing_capacity: "10,000 units / month",
    contact_person: "Priya Patel (Director of Quality)",
    documents: {
      form_v: true,
      factory_layout: true,
      machinery_list: true,
      lab_equipment: true,
      calibration_certs: true,
      msme_udyam: true
    },
    testing: {
      hydrostatic_test_bench: true,
      burst_pressure_apparatus: true,
      handle_temp_pyrometer: true,
      chem_analysis_raw_material: true
    },
    checklist: {
      sit_implemented: true,
      qualified_chemist_employed: true,
      calibration_valid_6_months: true,
      sample_batch_produced: true
    }
  });

  // Start workflow on mount
  useEffect(() => {
    const initWorkflow = async () => {
      try {
        const res = await certificationService.start(formData.product_name, formData.is_number);
        setWorkflowId(res.data.id);
      } catch (e) {
        console.warn("Could not start workflow session on backend:", e);
      }
    };
    initWorkflow();
  }, []);

  const handleNext = async () => {
    if (currentStep < 10) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (workflowId) {
        try {
          await certificationService.updateStep(workflowId, currentStep, formData);
        } catch (e) {
          console.warn("Step update failed:", e);
        }
      }
      if (next === 10) {
        generateFinalSummary();
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const generateFinalSummary = async () => {
    setLoading(true);
    try {
      if (workflowId) {
        const res = await certificationService.getSummary(workflowId);
        setSummaryData(res.data);
      }
    } catch (e) {
      console.warn("Summary generation fallback:", e);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>06 — Scheme-I Compliance & ISI Certification</span>
        </div>
        <h1 className="editorial-headline text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
          BIS Certification & ISI Mark Workflow Wizard
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-3xl leading-relaxed">
          Comprehensive 10-step guided statutory compliance pipeline for Scheme-I (Product Certification) as prescribed by the Bureau of Indian Standards.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-300 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs font-bold text-black uppercase tracking-wider">
            Step {currentStep} of 10: {STEPS[currentStep - 1].title}
          </span>
          <span className="font-mono text-xs font-bold text-zinc-600">
            {Math.round((currentStep / 10) * 100)}% COMPLETED
          </span>
        </div>

        {/* Bar */}
        <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden mb-5 border border-zinc-200">
          <div 
            className="bg-black h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 10) * 100}%` }}
          ></div>
        </div>

        {/* Step Circles */}
        <div className="grid grid-cols-10 gap-1 text-center">
          {STEPS.map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(s.id)}
              className="flex flex-col items-center group focus:outline-none cursor-pointer"
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all ${
                s.id === currentStep 
                  ? 'bg-black text-white ring-2 ring-zinc-400' 
                  : s.id < currentStep 
                  ? 'bg-zinc-800 text-white' 
                  : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
              }`}>
                {s.id < currentStep ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : s.id}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 mt-1.5 hidden sm:block truncate max-w-full">
                {s.short}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Wizard Content Body */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-300 shadow-2xs min-h-[420px]">
        {/* Step 1: Select Product */}
        {currentStep === 1 && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="editorial-headline text-lg font-bold text-black uppercase">Step 1: Product Selection & Category</h3>
            <p className="text-xs text-zinc-600 font-mono">Specify the product manufactured or imported into India.</p>
            
            <div className="space-y-3.5 pt-2">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Product Description</label>
                <input
                  type="text"
                  value={formData.product_name}
                  onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-black font-mono focus:border-black focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Brand / Trade Name</label>
                <input
                  type="text"
                  value={formData.brand_name}
                  onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-black font-mono focus:border-black focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Product Category</label>
                <input
                  type="text"
                  value={formData.product_category}
                  onChange={(e) => setFormData({ ...formData, product_category: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-black font-mono focus:border-black focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Applicable Standard */}
        {currentStep === 2 && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="editorial-headline text-lg font-bold text-black uppercase">Step 2: Applicable Indian Standard</h3>
            <p className="text-xs text-zinc-600 font-mono">Official BIS specification governing testing and conformity.</p>

            <div className="bg-zinc-50 border border-zinc-300 rounded-xl p-4">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Identified IS Code</span>
              <h4 className="text-xl font-mono font-black text-black mt-1">{formData.is_number}</h4>
              <p className="text-xs text-zinc-600 font-mono mt-1">
                Prescribes critical parameters including mechanical strength, safety release, and thermal insulation.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Modify Standard (if applicable)</label>
              <input
                type="text"
                value={formData.is_number}
                onChange={(e) => setFormData({ ...formData, is_number: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-black font-mono focus:border-black focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>
        )}

        {/* Step 3: Mandatory Certification Check */}
        {currentStep === 3 && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="editorial-headline text-lg font-bold text-black uppercase">Step 3: Certification Scheme Status</h3>
            <p className="text-xs text-zinc-600 font-mono">Conformity assessment scheme classification.</p>

            <div className="bg-zinc-50 border border-zinc-300 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-black" />
                <span className="font-mono font-bold text-sm text-black uppercase">Scheme-I (ISI Mark Scheme)</span>
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed font-mono">
                Requires factory inspection, sample testing in manufacturer's lab, independent testing in BIS lab, and grant of CM/L licence.
              </p>
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs font-mono space-y-1">
              <span className="font-bold text-black uppercase tracking-wider">Legal Note:</span>
              <p className="text-zinc-600">
                It is illegal under Section 17 of the BIS Act 2016 to manufacture, store, or sell mandatory products without a valid BIS licence.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Quality Control Order */}
        {currentStep === 4 && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="editorial-headline text-lg font-bold text-black uppercase">Step 4: Statutory Quality Control Order (QCO)</h3>
            <p className="text-xs text-zinc-600 font-mono">Governing Central Government Gazette Notification.</p>

            <div className="bg-zinc-50 border border-zinc-300 rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Applicable Order</span>
              <h4 className="text-base font-bold text-black">{formData.qco_name}</h4>
              <p className="text-xs text-zinc-600 font-mono">
                Issued by the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry.
              </p>
            </div>

            <div className="text-xs font-mono text-zinc-600">
              <span className="font-bold text-black uppercase">Exemptions:</span> Goods manufactured exclusively for export are exempt from the QCO provisions.
            </div>
          </div>
        )}

        {/* Step 5: Manufacturer & Factory Details */}
        {currentStep === 5 && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="editorial-headline text-lg font-bold text-black uppercase">Step 5: Manufacturer & Manufacturing Premises</h3>
            <p className="text-xs text-zinc-600 font-mono">Factory location where the product will be produced.</p>

            <div className="space-y-3.5 pt-2">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Company / Unit Legal Name</label>
                <input
                  type="text"
                  value={formData.factory_name}
                  onChange={(e) => setFormData({ ...formData, factory_name: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-black font-mono focus:border-black focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Factory Physical Address</label>
                <textarea
                  rows={2}
                  value={formData.factory_address}
                  onChange={(e) => setFormData({ ...formData, factory_address: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-black font-mono focus:border-black focus:bg-white transition-all shadow-inner"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Monthly Production Capacity</label>
                  <input
                    type="text"
                    value={formData.manufacturing_capacity}
                    onChange={(e) => setFormData({ ...formData, manufacturing_capacity: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-black font-mono focus:border-black focus:bg-white transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Quality Manager Contact</label>
                  <input
                    type="text"
                    value={formData.contact_person}
                    onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-black font-mono focus:border-black focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Required Documents Checklist */}
        {currentStep === 6 && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="editorial-headline text-lg font-bold text-black uppercase">Step 6: Official Required Documents</h3>
            <p className="text-xs text-zinc-600 font-mono">Ensure all mandatory attachments are prepared in PDF format.</p>

            <div className="space-y-2 pt-2">
              {[
                { key: 'form_v', label: 'Form-V Electronic Application on Manakonline' },
                { key: 'factory_layout', label: 'Factory Layout Plan & Plant Machinery List' },
                { key: 'machinery_list', label: 'List of In-House Testing Equipment with Calibration Records' },
                { key: 'lab_equipment', label: 'Manufacturing Process Flowchart from Raw Material to Finished Goods' },
                { key: 'calibration_certs', label: 'Consent to Operate (CTO) from State Pollution Control Board' },
                { key: 'msme_udyam', label: 'MSME Udyam Registration Certificate (for 50% fee concession)' }
              ].map((doc, idx) => (
                <label key={idx} className="flex items-center space-x-3 p-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.documents[doc.key]}
                    onChange={(e) => setFormData({
                      ...formData,
                      documents: { ...formData.documents, [doc.key]: e.target.checked }
                    })}
                    className="w-4 h-4 text-black accent-black rounded border-zinc-300 focus:ring-black cursor-pointer"
                  />
                  <span className="text-xs font-mono font-medium text-zinc-800">{doc.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Testing Requirements */}
        {currentStep === 7 && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="editorial-headline text-lg font-bold text-black uppercase">Step 7: Factory Lab & Testing Apparatus</h3>
            <p className="text-xs text-zinc-600 font-mono">
              The Scheme of Inspection and Testing (SIT) requires in-house equipment for daily routine tests.
            </p>

            <div className="space-y-2 pt-2">
              {[
                { key: 'hydrostatic_test_bench', label: 'Hydrostatic Proof Pressure Test Bench (Up to 5 kgf/cm²)' },
                { key: 'burst_pressure_apparatus', label: 'Safety Valve Burst Pressure Testing Apparatus' },
                { key: 'handle_temp_pyrometer', label: 'Surface Temperature Pyrometer for Handle Insulation Test' },
                { key: 'chem_analysis_raw_material', label: 'Raw Material Chemical Test Certificate (IS 21 / IS 6911)' }
              ].map((t, idx) => (
                <label key={idx} className="flex items-center space-x-3 p-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.testing[t.key]}
                    onChange={(e) => setFormData({
                      ...formData,
                      testing: { ...formData.testing, [t.key]: e.target.checked }
                    })}
                    className="w-4 h-4 text-black accent-black rounded border-zinc-300 focus:ring-black cursor-pointer"
                  />
                  <span className="text-xs font-mono font-medium text-zinc-800">{t.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 8: Portal Guidance */}
        {currentStep === 8 && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="editorial-headline text-lg font-bold text-black uppercase">Step 8: Application Guidance (Manakonline)</h3>
            <p className="text-xs text-zinc-600 font-mono">Steps for filing application on the national portal.</p>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                <span className="font-bold text-black uppercase tracking-wider block mb-1">1. Choose Application Option:</span>
                <p className="text-zinc-600">
                  <strong>Option 1 (Normal Procedure):</strong> Factory inspection is conducted first by BIS auditor; sample drawn for testing. Licence granted in ~60 to 90 days.
                </p>
                <p className="text-zinc-600 mt-1">
                  <strong>Option 2 (Simplified Procedure):</strong> Independent test report from BIS-recognized lab submitted with application. Licence granted in ~30 days.
                </p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                <span className="font-bold text-black uppercase tracking-wider block mb-1">2. Statutory Fee Schedule:</span>
                <p className="text-zinc-600">Application Fee: ₹1,000 | Audit Fee: ₹7,000/day | Annual Licence Fee: ₹1,000.</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 9: Pre-Audit Checklist */}
        {currentStep === 9 && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="editorial-headline text-lg font-bold text-black uppercase">Step 9: Pre-Audit Readiness Checklist</h3>
            <p className="text-xs text-zinc-600 font-mono">Ensure factory is audit-ready before BIS auditor visit.</p>

            <div className="space-y-2 pt-2">
              {[
                { key: 'sit_implemented', label: 'Scheme of Inspection and Testing (SIT) register maintained with log entries' },
                { key: 'qualified_chemist_employed', label: 'Competent and qualified technical personnel / chemist deployed' },
                { key: 'calibration_valid_6_months', label: 'All testing gauges calibrated by NABL accredited laboratory' },
                { key: 'sample_batch_produced', label: 'Complete production batch ready for auditor sample selection & sealing' }
              ].map((c, idx) => (
                <label key={idx} className="flex items-center space-x-3 p-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.checklist[c.key]}
                    onChange={(e) => setFormData({
                      ...formData,
                      checklist: { ...formData.checklist, [c.key]: e.target.checked }
                    })}
                    className="w-4 h-4 text-black accent-black rounded border-zinc-300 focus:ring-black cursor-pointer"
                  />
                  <span className="text-xs font-mono font-medium text-zinc-800">{c.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 10: Compliance Summary */}
        {currentStep === 10 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <span className="font-mono text-[11px] font-bold text-black uppercase bg-zinc-100 px-3 py-1 rounded-full border border-zinc-300">
                  Ready for Submission
                </span>
                <h3 className="editorial-headline text-xl font-bold uppercase text-black mt-2">
                  BIS Compliance Summary Report
                </h3>
              </div>

              <button
                onClick={handlePrint}
                className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download PDF</span>
              </button>
            </div>

            {/* Printable summary box */}
            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-300 space-y-4 text-xs font-mono print:bg-white print:border-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Product Name:</span>
                  <span className="text-sm font-bold text-black">{formData.product_name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Applicable Standard:</span>
                  <span className="text-sm font-bold text-black">{formData.is_number}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Manufacturer Unit:</span>
                  <span className="font-medium text-zinc-800">{formData.factory_name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Premises:</span>
                  <span className="font-medium text-zinc-800">{formData.factory_address}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200">
                <span className="font-bold text-black uppercase tracking-wider block mb-2">Statutory QCO Compliance:</span>
                <p className="text-zinc-700 bg-white p-3 rounded-lg border border-zinc-200">
                  Covered under <strong>{formData.qco_name}</strong>. Certified ISI mark is compulsory for commercial distribution in India.
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-200">
                <span className="font-bold text-black uppercase tracking-wider block mb-1">Documentation Status:</span>
                <p className="text-black font-semibold">
                  ✓ Form-V, Factory Layout, Machinery List, In-house Testing Bench, and SIT procedures verified.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase text-zinc-800 hover:bg-zinc-200 disabled:opacity-30 border border-zinc-300 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <button
          onClick={handleNext}
          className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-mono font-bold uppercase bg-black hover:bg-zinc-800 text-white shadow-xs cursor-pointer"
        >
          <span>{currentStep === 10 ? "Finish & Return" : "Save & Proceed"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
