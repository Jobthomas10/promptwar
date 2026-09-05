'use client';

import React, { useState } from 'react';
import { Eye, Layers, FileText, Search, ZoomIn, ZoomOut } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

interface ImageOverlayProps {
  analysis: AnalysisResult;
}

export const ImageOverlay: React.FC<ImageOverlayProps> = ({ analysis }) => {
  const [viewMode, setViewMode] = useState<'overlay' | 'original'>('overlay');
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
            VISUAL FORENSICS & HEATMAP ANALYSIS
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-0.5">
            Image Region & Metadata Inspector
          </h3>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setViewMode('overlay')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              viewMode === 'overlay'
                ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Evidence Overlay</span>
          </button>

          <button
            onClick={() => setViewMode('original')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              viewMode === 'original'
                ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Original Image</span>
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center p-4 min-h-[360px]">
        
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-1 bg-white/90 backdrop-blur-md p-1 rounded-lg border border-slate-200 shadow-sm">
          <button 
            onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.2))}
            className="p-1.5 text-slate-500 hover:text-slate-900"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono text-emerald-700 font-bold px-2">{Math.round(zoomLevel * 100)}%</span>
          <button 
            onClick={() => setZoomLevel(Math.min(2.0, zoomLevel + 0.2))}
            className="p-1.5 text-slate-500 hover:text-slate-900"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="relative overflow-hidden transition-transform duration-300" style={{ transform: `scale(${zoomLevel})` }}>
          <img 
            src={analysis.mediaUrl} 
            alt="Forensic Image View" 
            className="max-h-[480px] w-auto rounded-lg object-contain shadow-md"
          />

          {viewMode === 'overlay' && (
            <>
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 via-transparent to-amber-500/20 mix-blend-color-dodge pointer-events-none" />

              <div className="absolute top-[28%] left-[42%] w-[24%] h-[30%] border-2 border-rose-500 bg-rose-500/20 rounded-lg animate-pulse pointer-events-none">
                <span className="absolute -top-5 left-0 bg-rose-600 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow">
                  ANATOMY ANOMALY (91%)
                </span>
              </div>

              <div className="absolute bottom-[20%] right-[15%] w-[30%] h-[25%] border-2 border-amber-500 bg-amber-500/20 rounded-lg pointer-events-none">
                <span className="absolute -top-5 left-0 bg-amber-600 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow">
                  NOISE LATTICE (88%)
                </span>
              </div>
            </>
          )}
        </div>

      </div>

      {/* EXIF Metadata & History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-700 border-b border-slate-200 pb-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>EXIF & CONTAINER METADATA INSPECTOR</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {analysis.metadataFields.map((field, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">{field.key}:</span>
                <span className={`font-bold ${
                  field.status === 'suspicious' 
                    ? 'text-amber-700' 
                    : field.status === 'missing' 
                    ? 'text-rose-600' 
                    : field.status === 'verified' 
                    ? 'text-emerald-700' 
                    : 'text-slate-900'
                }`}>
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-700 border-b border-slate-200 pb-2">
            <Search className="w-4 h-4 text-emerald-600" />
            <span>REVERSE SEARCH & PROVENANCE INDEX</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 font-mono">Reverse Image Search Query</div>
              <p className="text-slate-600 text-[11px] mt-0.5">Matched 4 archival newsroom sources published prior to current upload date.</p>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 font-mono">C2PA Cryptographic Signature</div>
              <p className="text-slate-600 text-[11px] mt-0.5">{analysis.provenanceStatus}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

