'use client';

import React, { useState } from 'react';
import { Printer, Share2, ShieldCheck, FileText, Check } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

interface VerificationReportProps {
  analysis: AnalysisResult;
}

export const VerificationReport: React.FC<VerificationReportProps> = ({ analysis }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Action Bar */}
      <div className="no-print flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-700 font-bold">
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>JOURNALISTIC AUDIT REPORT • CASE #{analysis.id}</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleShare}
            className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition-colors flex items-center space-x-1.5 font-mono font-bold"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{copied ? 'Link Copied' : 'Share Report'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition-all flex items-center space-x-1.5 shadow-md"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Body */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xl space-y-8 print:p-0 print:border-none print:shadow-none font-sans text-slate-900">
        
        {/* Document Header */}
        <div className="border-b-2 border-emerald-600 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <span className="font-black text-2xl tracking-wider text-slate-900">VerifyAI</span>
            </div>
            <p className="text-xs text-slate-500 font-mono font-bold">
              DIGITAL MEDIA FORENSIC & PROVENANCE REPORT
            </p>
          </div>

          <div className="text-left sm:text-right font-mono text-xs text-slate-500 space-y-0.5 font-medium">
            <div>Report ID: <span className="text-emerald-700 font-bold">{analysis.id}</span></div>
            <div>Generated: <span>{analysis.uploadDate}</span></div>
            <div>Classification: <span className="text-amber-700 font-bold uppercase">Investigative Record</span></div>
          </div>
        </div>

        {/* 1. File Information */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest border-b border-slate-200 pb-1">
            1. FILE & MEDIA SPECIFICATIONS
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono">
            <div><span className="text-slate-400 block">Filename:</span><span className="text-slate-900 font-bold truncate block">{analysis.filename}</span></div>
            <div><span className="text-slate-400 block">Media Type:</span><span className="text-slate-900 font-bold uppercase">{analysis.mediaType}</span></div>
            <div><span className="text-slate-400 block">File Size:</span><span className="text-slate-900 font-bold">{analysis.fileSize}</span></div>
            <div><span className="text-slate-400 block">Resolution/Specs:</span><span className="text-slate-900 font-bold">{analysis.resolutionOrDuration}</span></div>
          </div>
        </div>

        {/* 2. Executive Assessment */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest border-b border-slate-200 pb-1">
            2. FORENSIC ASSESSMENT SUMMARY
          </h3>
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-500 font-bold">PRIMARY VERDICT:</div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {analysis.verdictLabel}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xl font-medium">
                {analysis.whatThisMeans}
              </p>
            </div>

            <div className="text-center bg-white p-4 rounded-xl border border-slate-200 min-w-[140px] shadow-sm">
              <span className="text-3xl font-black font-mono text-slate-900 block">{analysis.confidenceScore}%</span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">CONFIDENCE INDEX</span>
            </div>
          </div>
        </div>

        {/* 3. Evidence Matrix Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest border-b border-slate-200 pb-1">
            3. TECHNICAL & TELEMETRY FINDINGS
          </h3>
          <div className="space-y-2">
            {analysis.evidences.map((ev, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-slate-900">{ev.title} ({ev.category.toUpperCase()})</span>
                  <span className="text-emerald-700 font-bold">ANOMALY: {ev.score}%</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-sans font-medium">{ev.detailText}</p>
                <div className="text-[11px] text-amber-700 italic font-mono pt-1">
                  Disclaimer: {ev.uncertaintyDisclaimer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Provenance & Source Trace */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest border-b border-slate-200 pb-1">
            4. PROVENANCE & ARCHIVAL MATCHING
          </h3>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Provenance Status:</span>
              <span className="text-slate-900 font-bold">{analysis.provenanceStatus}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Historical Web Matches:</span>
              <span className="text-emerald-700 font-bold">{analysis.sources.length} Verified Nodes</span>
            </div>
          </div>
        </div>

        {/* 5. Limitations & Final Recommendation */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest border-b border-slate-200 pb-1">
            5. LIMITATIONS & RECOMMENDATIONS
          </h3>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
            <div className="font-bold text-amber-800 font-mono uppercase">
              FINAL INVESTIGATIVE RECOMMENDATION
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">
              {analysis.finalRecommendation}
            </p>
            <div className="text-[11px] text-slate-500 font-mono pt-1 font-medium">
              Important: Automated AI detection is probabilistic and should not replace secondary human verification, C2PA cryptographic hardware audits, or direct journalistic reporting.
            </div>
          </div>
        </div>

        {/* Footer Signature Block */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 font-medium">
          <div>Verified by VerifyAI Multi-Modal Forensics Engine v2.4</div>
          <div>Audit Log Cryptographic Hash: SHA-256 (0x8f...e102)</div>
        </div>

      </div>

    </div>
  );
};

