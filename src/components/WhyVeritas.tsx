'use client';

import React from 'react';
import { AlertTriangle, ShieldCheck, FileSearch, Scale, HelpCircle } from 'lucide-react';

export const WhyVeritas: React.FC = () => {
  const points = [
    {
      title: 'Real Media can be presented with a False Claim',
      description: 'Authentic news footage re-shared in a new context creates severe disinformation without using any AI models at all.',
      icon: AlertTriangle,
    },
    {
      title: 'AI-Generated Media can be Harmless or Fictional',
      description: 'Architectural renderings, satirical art, or synthetic illustrative graphics are not inherently malicious or fraudulent.',
      icon: HelpCircle,
    },
    {
      title: 'Real Footage can be Edited Deceptively',
      description: 'Cropping, speed alteration, audio splicing, or selective trimming on real recordings can distort truth more than deepfakes.',
      icon: Scale,
    },
    {
      title: 'Media can be Taken Out of Context',
      description: 'Geographic, chronological, or situational misattribution is the #1 vector of online media manipulation today.',
      icon: FileSearch,
    },
    {
      title: 'Missing Metadata Does Not Mean Something is Fake',
      description: 'Social platforms routinely strip EXIF and C2PA headers for privacy. Missing metadata is inconclusive, not proof of fraud.',
      icon: ShieldCheck,
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-widest block mb-2">
            PHILOSOPHICAL FOUNDATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Because "AI-generated" isn't the same as "false."
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Simplistic "AI detectors" return a binary percentage that misleads investigators. VerifyAI operates as an evidence synthesis engine because truth lives in context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-400 transition-all duration-300 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            );
          })}

          {/* Core Philosophy Summary Card */}
          <div className="bg-emerald-900 border border-emerald-700 text-white rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center space-x-2 text-emerald-300 mb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
                <span className="font-extrabold text-sm tracking-wider font-mono text-emerald-200">VerifyAI CORE TENET</span>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                Never present an AI probability as absolute truth. Always clearly distinguish between AI-generated, AI-assisted, manipulated, misleading context, and likely authentic media.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-800 text-[11px] font-mono text-emerald-300 font-bold">
              EVIDENCE-FIRST INVESTIGATION ENGINE
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

