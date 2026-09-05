'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, HelpCircle, AlertCircle, FileText, Info } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';
import { ConfidenceMeter } from './ConfidenceMeter';

interface VerdictCardProps {
  analysis: AnalysisResult;
}

export const VerdictCard: React.FC<VerdictCardProps> = ({ analysis }) => {
  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'STRONG_EVIDENCE_SYNTHETIC':
        return {
          badge: 'bg-red-500/20 text-red-400 border border-red-500/40',
          icon: AlertTriangle
        };
      case 'LIKELY_MANIPULATED':
        return {
          badge: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
          icon: AlertCircle
        };
      case 'LIKELY_AUTHENTIC':
        return {
          badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
          icon: CheckCircle2
        };
      default:
        return {
          badge: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40',
          icon: HelpCircle
        };
    }
  };

  const style = getVerdictStyle(analysis.verdict);
  const VerdictIcon = style.icon;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="font-extrabold text-sm text-slate-900 uppercase tracking-wider font-mono">
            VERIFICATION RESULT ASSESSMENT
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 font-medium">
          <span>CASE ID:</span>
          <span className="text-emerald-700 font-bold">{analysis.id}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Media Preview */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="w-full aspect-video rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative shadow-inner group flex items-center justify-center">
            {analysis.mediaType === 'audio' ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-white border border-emerald-300 flex items-center justify-center text-emerald-600 mb-2 shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-900 font-bold">{analysis.filename}</span>
                <span className="text-[10px] font-mono text-slate-500 mt-1">{analysis.resolutionOrDuration}</span>
              </div>
            ) : (
              <img 
                src={analysis.mediaUrl} 
                alt="Analyzed Media" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            
            <div className="absolute top-2 left-2 px-2 py-1 rounded bg-slate-900 text-white text-[10px] font-mono font-bold uppercase">
              {analysis.mediaType.toUpperCase()}
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] font-mono text-slate-200">
              {analysis.fileSize}
            </div>
          </div>
        </div>

        {/* Right Column: Assessment */}
        <div className="lg:col-span-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
          
          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-xs ${style.badge}`}>
              <VerdictIcon className="w-4 h-4" />
              <span>{analysis.verdictLabel}</span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {analysis.verdictLabel}
            </h2>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {analysis.whatThisMeans}
            </p>

            <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-[11px] text-slate-500 font-mono pt-1">
              <Info className="w-3.5 h-3.5 text-emerald-600" />
              <span>Synthesis based on {analysis.evidences?.length || 0} technical forensic signals</span>
            </div>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto flex justify-center border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6">
            <ConfidenceMeter 
              score={analysis.confidenceScore} 
              evidenceStrength={analysis.evidenceStrength} 
            />
          </div>

        </div>

      </div>

      {/* "What this means" Box */}
      <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3 text-slate-700">
        <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-extrabold text-emerald-800 uppercase font-mono tracking-wider">
            What this means
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {analysis.whatThisMeans}
          </p>
        </div>
      </div>

    </div>
  );
};

