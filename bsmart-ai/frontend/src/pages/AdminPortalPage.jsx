import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  Layers,
  Lock,
  Plus
} from 'lucide-react';
import { adminService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AdminPortalPage = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  // Upload Form
  const [title, setTitle] = useState('');
  const [documentType, setDocumentType] = useState('Standard');
  const [isNumber, setIsNumber] = useState('');
  const [file, setFile] = useState(null);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await adminService.listDocuments();
      setDocuments(res.data);
    } catch (err) {
      console.error("Fetch docs error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    setUploadSuccess(null);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('document_type', documentType);
      if (isNumber) formData.append('is_number', isNumber);
      formData.append('file', file);

      const res = await adminService.uploadDocument(formData);
      setUploadSuccess(`Document ingested successfully! Created ${res.data.chunks_created} searchable clause chunks.`);
      setTitle('');
      setIsNumber('');
      setFile(null);
      fetchDocs();
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this document and its chunk vectors?")) return;
    try {
      await adminService.deleteDocument(docId);
      fetchDocs();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-300 bg-white font-mono text-[11px] tracking-widest text-zinc-700 uppercase shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>08 — Statutory Knowledge Ingestion & Audit</span>
        </div>
        <h1 className="editorial-headline text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
          Document Knowledge Base Ingestion & Chunking
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
          Upload official BIS standards, Quality Control Orders, manuals, and technical regulations. 
          The ingestion pipeline automatically detects clauses, page numbers, and indexes them for RAG retrieval.
        </p>
      </div>

      {/* Upload Box */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-300 shadow-2xs space-y-6 font-mono">
        <h3 className="editorial-headline text-base font-bold text-black uppercase tracking-wider flex items-center space-x-2">
          <UploadCloud className="w-4 h-4 text-black" />
          <span>Upload New Standard or Regulatory Document</span>
        </h3>

        {uploadSuccess && (
          <div className="p-3.5 bg-zinc-100 border border-zinc-300 rounded-xl text-black text-xs flex items-center space-x-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Document Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Domestic Pressure Cookers Specification"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black focus:bg-white shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">IS Standard Code (Optional)</label>
              <input
                type="text"
                value={isNumber}
                onChange={(e) => setIsNumber(e.target.value)}
                placeholder="e.g. IS 2347:2017"
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black focus:bg-white shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Document Category</label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black focus:bg-white font-medium cursor-pointer"
              >
                <option value="Standard">Indian Standard (IS)</option>
                <option value="QCO">Quality Control Order (QCO)</option>
                <option value="Product Manual">BIS Product Manual</option>
                <option value="Guideline">Testing & Inspection Scheme (SIT)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
              Select Document File (.txt, .pdf, .docx, .html) <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2 text-xs text-zinc-700 font-mono file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:font-bold file:bg-black file:text-white hover:file:bg-zinc-800 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="bg-black hover:bg-zinc-800 text-white font-mono font-bold uppercase py-2.5 px-6 rounded-xl text-xs flex items-center space-x-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Parsing Clauses & Indexing...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Ingest & Parse Document</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Ingested Documents Table */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-300 shadow-2xs space-y-4 font-mono">
        <h3 className="editorial-headline text-base font-bold text-black uppercase tracking-wider flex items-center space-x-2">
          <Database className="w-4 h-4 text-black" />
          <span>Ingested Regulatory Documents ({documents.length})</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 text-zinc-600 uppercase tracking-wider text-[10px] border-b border-zinc-200">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">IS Code</th>
                <th className="p-3">Type</th>
                <th className="p-3">Clause Chunks</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {documents.map((d) => (
                <tr key={d.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-3 font-semibold text-black">{d.title}</td>
                  <td className="p-3 font-mono font-bold text-black">{d.is_number || "—"}</td>
                  <td className="p-3 text-zinc-600">{d.document_type}</td>
                  <td className="p-3 font-mono font-bold text-black">{d.chunks_count} chunks</td>
                  <td className="p-3">
                    <span className="bg-black text-white font-mono font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                      {d.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="text-zinc-400 hover:text-red-600 p-1.5 rounded hover:bg-zinc-100 transition-colors cursor-pointer"
                      title="Delete document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
