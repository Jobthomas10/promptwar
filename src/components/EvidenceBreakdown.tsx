'use client';

import React, { useState } from 'react';
import { Cpu, ChevronRight, Info, AlertTriangle } from 'lucide-react';
import { AnalysisResult, EvidenceItem } from '@/lib/types';
import { EvidenceModal } from './EvidenceModal';

interface EvidenceBreakdownProps {
  analysis: AnalysisResult;
}

export const EvidenceBreakdown: React.FC<EvidenceBreakdownProps> = ({ analysis }) => {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);

  const keyMetrics = [
    { label: 'AI-generation indicators', score: analysis.aiGenerationScore, strength: analysis.aiGenerationScore > 80 ? 'Strong' : 'Moderate' },
    { label: 'Manipulation indicators', score: analysis.manipulationScore, strength: analysis.manipulationScore > 75 ? 'High' : 'Low' },
    { label: 'Source consistency', score: analysis.sourceConsistencyScore, strength: analysis.sourceConsistencyScore > 70 ? 'Strong' : 'Weak' },
    { label: 'Metadata consistency', score: analysis.metadataConsistencyScore, strength: analysis.metadataConsistencyScore > 60 ? 'High' : 'Low' },
    { label: 'Provenance status', text: analysis.provenanceStatus, isText: true }
  ];

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
              EVIDENCE-BASED FORENSICS
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              Why did we reach this assessment?
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono font-medium">
            {analysis.evidences.length} Signals Captured
          </span>
        </div>

        {/* Top Categorical Scores Summary Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {keyMetrics.map((m, idx) => (
            <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-mono font-bold block truncate">{m.label}</span>
              {'isText' in m ? (
                <div className="text-xs font-bold text-emerald-700 font-mono mt-1 truncate">
                  {m.text}
                </div>
              ) : (
                <div className="mt-1 space-y-1">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-base font-black text-slate-900">{m.score}%</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{m.strength}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        m.score! > 80 ? 'bg-rose-500' : m.score! > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${m.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Individual Clickable Evidence Items */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
            Click any evidence item to inspect technical proof & uncertainties:
          </h4>

          <div className="grid grid-cols-1 gap-3">
            {analysis.evidences.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setSelectedEvidence(ev)}
                className="w-full text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-emerald-400 p-4 rounded-xl transition-all duration-200 group flex items-center justify-between shadow-sm"
              >
                <div className="flex items-start space-x-3.5 pr-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {ev.title}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ANOMALY: {ev.score}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {ev.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono text-emerald-700 group-hover:translate-x-0.5 transition-transform flex-shrink-0 font-bold">
                  <span>Inspect</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      <EvidenceModal 
        item={selectedEvidence} 
        onClose={() => setSelectedEvidence(null)} 
      />
    </>
  );
};

