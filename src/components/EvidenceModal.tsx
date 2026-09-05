'use client';

import React from 'react';
import { X, ShieldAlert, AlertCircle, CheckCircle2 } from 'lucide-react';
import { EvidenceItem } from '@/lib/types';

interface EvidenceModalProps {
  item: EvidenceItem | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 pr-8">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider">
              EVIDENCE TELEMETRY DEEP DIVE • {item.category.toUpperCase()}
            </div>
            <h3 className="text-lg font-black text-slate-900 leading-snug">
              {item.title}
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-mono font-bold block">DETECTION ANOMALY INDEX</span>
            <span className="text-2xl font-black font-mono text-slate-900">{item.score}%</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${
            item.strength === 'HIGH' 
              ? 'bg-rose-50 text-rose-700 border-rose-200' 
              : item.strength === 'MEDIUM' 
              ? 'bg-amber-50 text-amber-700 border-amber-200' 
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}>
            SIGNAL STRENGTH: {item.strength}
          </span>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
            Technical Finding Analysis
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {item.detailText}
          </p>

          <div className="space-y-1.5 pt-2">
            {item.findings.map((f, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-2 text-amber-800 text-xs leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold font-mono uppercase block text-[10px] text-amber-700">
              UNCERTAINTY & LIMITATIONS DISCLAIMER
            </span>
            {item.uncertaintyDisclaimer}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-md"
          >
            Close Explanation
          </button>
        </div>

      </div>
    </div>
  );
};

