'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, CheckCircle2, Loader2, Circle, Terminal } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

interface AnalysisProgressProps {
  targetResult: AnalysisResult;
  onComplete: () => void;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ targetResult, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(12);

  const steps = [
    { label: 'Media received', detail: 'Received media payload & validated container format.' },
    { label: 'File integrity checked', detail: 'Calculated SHA-256 hash & inspected stream bitrates.' },
    { label: 'Metadata extracted', detail: 'Audited EXIF tags, GPS headers, and C2PA manifests.' },
    { label: 'AI-generation analysis', detail: 'Running multi-scale 2D Fourier noise & latent diffusion models.' },
    { label: 'Manipulation analysis', detail: 'Scanning facial keypoint drift & audio-visual lip-sync visemes.' },
    { label: 'Source tracing', detail: 'Performing high-dimensional vector search across press archives.' },
    { label: 'Context analysis', detail: 'Cross-referencing claims database & fact-check wire reports.' },
    { label: 'Evidence synthesis', detail: 'Synthesizing probabilistic findings into explainable verdict report.' }
  ];

  useEffect(() => {
    const totalSteps = steps.length;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < totalSteps - 1) {
          const next = prev + 1;
          const pct = Math.round(((next + 1) / totalSteps) * 100);
          setProgressPercent(pct);
          return next;
        } else {
          clearInterval(interval);
          setProgressPercent(100);
          setTimeout(() => {
            onComplete();
          }, 800);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="relative w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Analyzing your media
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-medium">
              TARGET FILE: <span className="text-emerald-700 font-bold">{targetResult.filename}</span> ({targetResult.mediaType.toUpperCase()})
            </p>
          </div>
        </div>

        {/* Scanning Animation Bar */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-between text-xs font-mono text-slate-700 font-bold">
            <span>FORENSIC SCAN IN PROGRESS</span>
            <span className="text-emerald-700 font-extrabold">{progressPercent}%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-100 border border-slate-200 overflow-hidden p-0.5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 transition-all duration-300 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Steps Checklist */}
        <div className="space-y-3 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-200">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div 
                key={index}
                className={`flex items-start space-x-3 transition-all ${
                  isCompleted ? 'text-emerald-700' : isCurrent ? 'text-emerald-800' : 'text-slate-400'
                }`}
              >
                <div className="mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-emerald-600 animate-spin flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold font-mono ${
                      isCompleted ? 'text-slate-900' : isCurrent ? 'text-emerald-800 font-extrabold' : 'text-slate-500'
                    }`}>
                      {step.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-semibold">
                      {isCompleted ? 'DONE' : isCurrent ? 'EXECUTING...' : 'PENDING'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-normal font-medium">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Telemetry Terminal Box */}
        <div className="bg-slate-900 rounded-xl p-3.5 border border-slate-800 font-mono text-[11px] text-emerald-400 space-y-1 shadow-inner">
          <div className="flex items-center space-x-1.5 text-emerald-400 pb-1 border-b border-slate-800 font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>MODEL TELEMETRY LOG</span>
          </div>
          <div className="text-slate-300">[INFO] Extracting spatial frequency noise tensors...</div>
          <div className="text-slate-300">[INFO] Evaluating face alignment score: {targetResult.aiGenerationScore}% neural weight</div>
          <div className="text-emerald-400 font-bold">[ACTIVE] Model output stream status: VerifyAI CLOUD AGENT OK</div>
        </div>

      </div>
    </div>
  );
};

