'use client';

import React, { useState } from 'react';
import { Columns, ZoomIn, ZoomOut, CheckCircle2, AlertCircle } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

interface MediaComparisonProps {
  analysis: AnalysisResult;
}

export const MediaComparison: React.FC<MediaComparisonProps> = ({ analysis }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const diffs = analysis.comparisonDiffs || [
    { region: 'Facial Visemes', type: 'modified', description: 'Mouth boundary warped to fit synthesized audio track.' },
    { region: 'Audio Track', type: 'added', description: 'Voice clone audio track inserted over muted original background audio.' },
    { region: 'Podium Scenery', type: 'unchanged', description: 'Podium and background scenery match 2026-08-14 archival broadcast.' }
  ];

  const diffPct = analysis.comparisonDiffPercentage || 24;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
            COMPARATIVE DIFF INSPECTOR
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-0.5">
            Side-by-Side Media Comparison
          </h3>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-slate-500 font-bold">MODIFICATION VARIANCE:</span>
          <span className="text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            {diffPct}% DIFF
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 font-medium">
        <div className="flex items-center space-x-2">
          <Columns className="w-4 h-4 text-emerald-600" />
          <span>Synchronized Dual-Viewport Inspection</span>
        </div>

        <div className="flex items-center space-x-1">
          <button 
            onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.2))}
            className="p-1 hover:text-slate-900"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-emerald-700 font-bold">{Math.round(zoomLevel * 100)}%</span>
          <button 
            onClick={() => setZoomLevel(Math.min(2.0, zoomLevel + 0.2))}
            className="p-1 hover:text-slate-900"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Side-by-Side Dual Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left: Analyzed Media */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden p-3 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono border-b border-slate-200 pb-2">
            <span className="text-rose-600 font-bold flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>ANALYZED MEDIA (CURRENT)</span>
            </span>
            <span className="text-slate-500 font-medium">{analysis.filename}</span>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
            <div style={{ transform: `scale(${zoomLevel})` }} className="w-full h-full transition-transform">
              <img 
                src={analysis.mediaUrl} 
                alt="Analyzed Media" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-mono font-bold">
                SUSPECT FILE
              </div>
            </div>
          </div>
        </div>

        {/* Right: Potential Original */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden p-3 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono border-b border-slate-200 pb-2">
            <span className="text-emerald-700 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>POTENTIAL ORIGINAL ARCHIVE</span>
            </span>
            <span className="text-slate-500 font-medium">2026-08-14 Wire Broadcast</span>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
            <div style={{ transform: `scale(${zoomLevel})` }} className="w-full h-full transition-transform">
              <img 
                src={analysis.comparisonOriginalUrl || analysis.mediaUrl} 
                alt="Potential Original" 
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-mono font-bold">
                ARCHIVAL REFERENCE
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Difference Breakdown Badges */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
          Detected Regional & Acoustic Differences:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {diffs.map((diff, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-900">{diff.region}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                  diff.type === 'added' 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : diff.type === 'removed' 
                    ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                    : diff.type === 'modified' 
                    ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {diff.type}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                {diff.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

