'use client';

import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, XCircle, Info, HelpCircle } from 'lucide-react';
import { AnalysisResult, ContextClaim } from '@/lib/types';

interface ContextVerificationProps {
  analysis: AnalysisResult;
}

export const ContextVerification: React.FC<ContextVerificationProps> = ({ analysis }) => {
  const [filterRel, setFilterRel] = useState<string>('all');

  const getRelationshipBadge = (rel: ContextClaim['relationship']) => {
    switch (rel) {
      case 'supports':
        return { label: 'SUPPORTS CLAIM', color: 'bg-emerald-50 text-emerald-800 border-emerald-300', icon: CheckCircle2 };
      case 'contradicts':
        return { label: 'CONTRADICTS CLAIM', color: 'bg-rose-50 text-rose-800 border-rose-300', icon: XCircle };
      case 'context':
        return { label: 'PROVIDES CONTEXT', color: 'bg-amber-50 text-amber-800 border-amber-300', icon: Info };
      default:
        return { label: 'UNRELATED', color: 'bg-slate-100 text-slate-700 border-slate-300', icon: HelpCircle };
    }
  };

  const filteredClaims = filterRel === 'all' 
    ? analysis.contextClaims 
    : analysis.contextClaims.filter((c) => c.relationship === filterRel);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6 text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
            CONTEXTUAL CLAIM CROSS-REFERENCE
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-0.5">
            What does the surrounding context say?
          </h3>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {['all', 'contradicts', 'supports', 'context', 'unrelated'].map((rel) => (
            <button
              key={rel}
              onClick={() => setFilterRel(rel)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize transition-all ${
                filterRel === rel 
                  ? 'bg-emerald-600 text-white font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {rel}
            </button>
          ))}
        </div>
      </div>

      {analysis.contextClaims.length === 0 ? (
        <div className="p-8 text-center bg-amber-50 rounded-xl border border-amber-200 space-y-2">
          <HelpCircle className="w-8 h-8 text-amber-600 mx-auto" />
          <h4 className="text-base font-extrabold text-amber-900 font-mono uppercase">
            No reliable source found
          </h4>
          <p className="text-xs text-amber-800 max-w-md mx-auto font-medium">
            VerifyAI fact-check database found no prior debunks or registered primary news reporting matching this specific media file. Exercise caution before sharing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredClaims.map((claim) => {
            const relBadge = getRelationshipBadge(claim.relationship);
            const Icon = relBadge.icon;

            return (
              <div 
                key={claim.id} 
                className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3 hover:border-emerald-400 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase flex items-center space-x-1 ${relBadge.color}`}>
                    <Icon className="w-3 h-3" />
                    <span>{relBadge.label}</span>
                  </span>

                  <span className="text-xs font-mono text-slate-500 font-medium">
                    Published: {claim.date}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    {claim.title}
                  </h4>
                  <p className="text-xs font-mono text-emerald-700 font-bold">
                    Publisher: {claim.publisher}
                  </p>
                </div>

                <blockquote className="p-3 rounded-lg bg-white border-l-2 border-emerald-500 text-xs text-slate-700 italic font-sans leading-relaxed shadow-sm">
                  "{claim.excerpt}"
                </blockquote>

                {claim.url !== '#' && (
                  <div className="pt-1 flex justify-end">
                    <a 
                      href={claim.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs font-mono text-emerald-700 hover:underline inline-flex items-center space-x-1 font-bold"
                    >
                      <span>Read Full Fact-Check Article</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
