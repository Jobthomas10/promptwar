'use client';

import React from 'react';
import { GitBranch, ExternalLink, Calendar, ShieldCheck, AlertCircle, ArrowDown } from 'lucide-react';
import { AnalysisResult, SourceNode } from '@/lib/types';

interface SourceTimelineProps {
  analysis: AnalysisResult;
}

export const SourceTimeline: React.FC<SourceTimelineProps> = ({ analysis }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6 text-slate-900">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
            PROVENANCE & ORIGIN TRACING
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-0.5">
            Where did this come from?
          </h3>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 font-medium">
          <span>Source Matches Found:</span>
          <span className="text-emerald-700 font-bold">{analysis.sources.length} Nodes</span>
        </div>
      </div>

      {/* Timeline Node Flow */}
      {analysis.sources.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-600 font-mono text-xs">
          No earlier matching media versions found in historical press wire archives.
        </div>
      ) : (
        <div className="relative py-4 max-w-4xl mx-auto space-y-6">
          
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-400 to-green-600 opacity-40 hidden sm:block" />

          {analysis.sources.map((node, index) => (
            <div key={node.id} className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 group">
              
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center text-emerald-700 font-black font-mono text-xs z-10 shadow-md group-hover:bg-emerald-600 group-hover:text-white transition-colors flex-shrink-0">
                {index + 1}
              </div>

              <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-emerald-400 transition-all space-y-2">
                
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-900">{node.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                      node.type === 'original' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : node.type === 'social_media' 
                        ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {node.type.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{node.date}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {node.contextSummary}
                </p>

                <div className="flex flex-wrap items-center justify-between text-xs font-mono pt-2 text-slate-500 border-t border-slate-200">
                  <div>Author/Publisher: <span className="text-slate-900 font-bold">{node.author}</span></div>
                  <div>Visual Similarity: <span className="text-emerald-700 font-bold">{node.similarityScore}%</span></div>
                  <div>
                    {node.url !== '#' && (
                      <a 
                        href={node.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-emerald-700 hover:underline inline-flex items-center space-x-1 font-bold"
                      >
                        <span>Open Source URL</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};
