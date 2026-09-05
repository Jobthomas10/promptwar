'use client';

import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface AboutHowItWorksProps {
  onStartAnalysis: () => void;
}

export const AboutHowItWorks: React.FC<AboutHowItWorksProps> = ({ onStartAnalysis }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>TECHNICAL ARCHITECTURE & ETHICS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How VerifyAI Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          VerifyAI is built around an evidence-first architecture that combines multi-modal neural models, camera hardware verification, reverse-source index matching, and contextual claim cross-referencing.
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 font-mono font-black">
            01
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Latent Diffusion 2D Fourier Noise Inspection
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Generative image models generate images in latent space, leaving high-frequency periodic grid artifacts in the spatial frequency domain. Real camera CMOS sensors generate Poisson shot noise without periodic lattice spikes.
          </p>
        </div>

        {/* 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 font-mono font-black">
            02
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Spectral Voice Clone Formant Analysis
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Neural text-to-speech voice clones lack human vocal cord micro-tremors (shimmer and jitter). VerifyAI analyzes fundamental pitch stability, phase continuity at splice points, and room impulse response mismatch to flag synthesized audio segments.
          </p>
        </div>

        {/* 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 font-mono font-black">
            03
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Hardware Provenance & Cryptographic C2PA
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Where present, VerifyAI verifies Coalition for Content Provenance and Authenticity (C2PA) cryptographic signatures embedded by certified camera hardware and authorized editing software (Adobe, Leica, Canon, Sony).
          </p>
        </div>

        {/* 4 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 font-mono font-black">
            04
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Contextual Reverse Search & Debunk Claim Matching
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Where available, VerifyAI verifies end-to-end Coalition for Content Provenance and Authenticity (C2PA) cryptographic manifests signed directly by digital camera hardware at the moment of exposure.
          </p>
        </div>

      </div>

      {/* Probabilistic Disclaimer Callout */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white border border-emerald-500 space-y-3 shadow-xl">
        <h3 className="text-sm font-mono font-bold text-emerald-200 uppercase tracking-widest">
          Ethics & Probabilistic Guardrails
        </h3>
        <p className="text-xs text-emerald-50 leading-relaxed font-normal">
          No automated AI detector can guarantee 100% certainty. VerifyAI will never output a simple "Fake" or "Real" label. We present individual evidence signals with explicit strength indicators and uncertainty disclaimers, giving human investigators the evidence needed to make informed decisions.
        </p>

        <div className="pt-2 flex justify-center">
          <button
            onClick={onStartAnalysis}
            className="px-6 py-2.5 rounded-xl bg-white text-emerald-800 font-extrabold text-xs hover:bg-emerald-50 transition-all flex items-center space-x-2 shadow-md"
          >
            <span>Run Forensic Scan</span>
            <ArrowRight className="w-4 h-4 text-emerald-800" />
          </button>
        </div>
      </div>

    </div>
  );
};

