'use client';

import React from 'react';
import { Search, Cpu, GitBranch, CheckCircle2, ArrowRight } from 'lucide-react';

interface TrustSectionProps {
  onStartAnalysis: () => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ onStartAnalysis }) => {
  const steps = [
    {
      num: '01',
      title: 'DETECT',
      icon: Search,
      description: 'Identify technical and visual/audio indicators associated with synthetic or manipulated media.',
      details: 'Diffusion noise patterns, facial landmark drift, room impulse mismatch, and spectral phase distortion.'
    },
    {
      num: '02',
      title: 'EXPLAIN',
      icon: Cpu,
      description: 'Translate complex model outputs into understandable evidence.',
      details: 'Human-readable forensic breakdowns without opaque black-box AI scores or fabricated certainty.'
    },
    {
      num: '03',
      title: 'TRACE',
      icon: GitBranch,
      description: 'Search for original sources, earlier versions, and related reporting.',
      details: 'Reverse image matching, timeline propagation tracking, and C2PA cryptographic hardware manifests.'
    },
    {
      num: '04',
      title: 'VERIFY',
      icon: CheckCircle2,
      description: 'Give users the context they need to make an informed decision.',
      details: 'Cross-reference surrounding claims, news wire debunks, and contextual statements before publication.'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-widest block mb-2">
            INTELLIGENCE METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Detection is only the beginning.
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            VerifyAI delivers an end-to-end investigative pipeline designed for journalists, fact-checkers, and cybersecurity professionals who need verifiable evidence, not guessing games.
          </p>
        </div>

        {/* 4 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-400 transition-all duration-300 group flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black font-mono text-slate-300 group-hover:text-emerald-600 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-wide font-mono">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 leading-normal">
                  <span className="text-slate-700 font-mono block mb-1">Key Signals:</span>
                  {step.details}
                </div>
              </div>
            );
          })}

        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartAnalysis}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
          >
            <span>Launch complete 4-stage forensic workflow</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
