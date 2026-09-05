'use client';

import React, { useState } from 'react';
import { Layers, Eye, Cpu, GitBranch, FileSearch, ShieldCheck } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';
import { EvidenceModal } from './EvidenceModal';

interface EvidenceExplorerProps {
  analysis: AnalysisResult;
}

export const EvidenceExplorer: React.FC<EvidenceExplorerProps> = ({ analysis }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedEv, setSelectedEv] = useState<any | null>(null);

  const categories = [
    { id: 'all', label: 'All Evidence Signals', icon: Layers },
    { id: 'visual', label: 'Visual & Anatomical', icon: Eye },
    { id: 'technical', label: 'Technical & Metadata', icon: Cpu },
    { id: 'ai_detection', label: 'Neural AI Detection', icon: ShieldCheck },
    { id: 'source', label: 'Source Provenance', icon: GitBranch },
    { id: 'context', label: 'Surrounding Context', icon: FileSearch },
  ];

  const explorerItems = [
    {
      id: 'ex-v1',
      category: 'visual',
      title: 'Lighting & Shadow Angle Consistency',
      score: 84,
      strength: 'HIGH',
      summary: 'Conflicting specular ray vectors detected on subjects in frame.',
      detailText: 'Specular ray estimations calculate primary ambient light sources at 42° and -78°, impossible for natural outdoor sunlight.',
      uncertaintyDisclaimer: 'Non-planar reflecting surfaces can distort highlight angles.',
      findings: ['Contradictory shadow angles', 'Corneal highlight mismatch']
    },
    {
      id: 'ex-v2',
      category: 'visual',
      title: 'Anatomical Joint Boundary Verification',
      score: 91,
      strength: 'HIGH',
      summary: 'Foreground hand contains non-standard 6-finger joint structure.',
      detailText: 'Pose estimation neural network flagged digital phalanges count anomaly on left hand.',
      uncertaintyDisclaimer: 'Motion blur can blend fingers, but static high-resolution PNG confirms anatomical defect.',
      findings: ['6 distinct fingers detected', 'Non-standard knuckle crease line']
    },
    {
      id: 'ex-t1',
      category: 'technical',
      title: 'C2PA Cryptographic Provenance Manifest',
      score: 100,
      strength: 'HIGH',
      summary: 'No C2PA provenance header or camera hardware key embedded.',
      detailText: 'The file container exhibits standard generic PNG chunk structure without signed hardware keys.',
      uncertaintyDisclaimer: 'Social media platforms strip C2PA headers by default during compression.',
      findings: ['Missing camera hardware serial', 'C2PA manifest absent']
    },
    {
      id: 'ex-t2',
      category: 'technical',
      title: 'Codec Stream & Encoder Inspection',
      score: 74,
      strength: 'MEDIUM',
      summary: 'FFmpeg re-encoding tags present in container.',
      detailText: 'Video stream metadata indicates libavformat export.',
      uncertaintyDisclaimer: 'Re-encoding occurs in legitimate editing workflows as well.',
      findings: ['FFmpeg Lavf header', 'Dropped frame flag']
    },
    {
      id: 'ex-a1',
      category: 'ai_detection',
      title: '2D Latent Diffusion Frequency Noise',
      score: 98,
      strength: 'HIGH',
      summary: '2D Fourier spectrum reveals high-frequency grid artifacts unique to Midjourney v6.',
      detailText: 'Periodic grid spikes at radial frequencies r=0.34 match generative diffusion upscalers.',
      uncertaintyDisclaimer: 'Extreme compression can alter spatial noise curves.',
      findings: ['Periodic noise grid', 'Absence of camera sensor PRNU']
    },
    {
      id: 'ex-s1',
      category: 'source',
      title: 'Reverse Image Search Archive Check',
      score: 12,
      strength: 'LOW',
      summary: 'Zero earlier matching web instances found prior to upload date.',
      detailText: 'Searched 12 major image archives; image appeared first on prompt forum.',
      uncertaintyDisclaimer: 'Unpublished real photos will also return 0 reverse matches.',
      findings: ['Zero pre-2026 matches', 'First seen on AI prompt gallery']
    },
    {
      id: 'ex-c1',
      category: 'context',
      title: 'Fact-Check Wire Cross-Reference',
      score: 92,
      strength: 'HIGH',
      summary: '2 accredited fact-checking wire debunks contradict viral post claims.',
      detailText: 'International Fact-Checking Network confirmed audio was synthesized.',
      uncertaintyDisclaimer: 'Requires ongoing manual reviewer updates.',
      findings: ['Fact-check debunk published', 'Official press transcript contradicts claim']
    }
  ];

  const filtered = activeCategory === 'all' 
    ? explorerItems 
    : explorerItems.filter((i) => i.category === activeCategory);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6 text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
            DEEP EVIDENCE AUDIT MATRIX
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-0.5">
            Evidence Explorer
          </h3>
        </div>

        <div className="text-xs font-mono text-slate-600 font-bold">
          Total Forensic Signals: <span className="text-emerald-700">{explorerItems.length} Metrics</span>
        </div>
      </div>

      {/* Categorical Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                isActive
                  ? 'bg-emerald-600 text-white font-extrabold shadow-md'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-emerald-400 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Evidence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedEv(item)}
            className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-emerald-400 transition-all cursor-pointer space-y-2 group shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-800 font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                {item.category.toUpperCase()}
              </span>

              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                item.score > 80 
                  ? 'bg-rose-50 text-rose-800 border border-rose-200' 
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                SCORE: {item.score}%
              </span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              {item.title}
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {item.summary}
            </p>

            <div className="pt-2 text-[11px] font-mono text-emerald-700 font-bold flex items-center space-x-1">
              <span>Inspect Telemetry & Limitations →</span>
            </div>
          </div>
        ))}
      </div>

      <EvidenceModal item={selectedEv} onClose={() => setSelectedEv(null)} />

    </div>
  );
};
