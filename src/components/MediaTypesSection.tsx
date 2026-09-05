'use client';

import React from 'react';
import { Image as ImageIcon, Music, Film, CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_ANALYSES } from '@/lib/mockData';
import { AnalysisResult } from '@/lib/types';

interface MediaTypesSectionProps {
  onStartAnalysis: (mediaType?: 'image' | 'audio' | 'video') => void;
  onLoadPreset: (preset: AnalysisResult) => void;
}

export const MediaTypesSection: React.FC<MediaTypesSectionProps> = ({ onStartAnalysis, onLoadPreset }) => {
  const cards = [
    {
      id: 'image',
      title: 'Image Forensics',
      icon: ImageIcon,
      presetId: 'demo-image-synthetic',
      description: 'Analyze visual artifacts, metadata, manipulation patterns, faces, lighting, shadows, compression, and other signals.',
      features: [
        'AI-generation detection',
        'Metadata inspection (EXIF / C2PA)',
        'Manipulation & heatmap detection',
        'Reverse source matching'
      ],
      cta: 'Analyze Image'
    },
    {
      id: 'audio',
      title: 'Audio Forensics',
      icon: Music,
      presetId: 'demo-audio-voiceclone',
      description: 'Analyze speech, frequency patterns, voice consistency, background noise, and synthetic speech indicators.',
      features: [
        'AI voice clone detection',
        'Spectrogram & formant analysis',
        'Speaker & noise consistency',
        'Transcript & timestamp tagging'
      ],
      cta: 'Analyze Audio'
    },
    {
      id: 'video',
      title: 'Video Forensics',
      icon: Film,
      presetId: 'demo-video-deepfake',
      description: 'Analyze frames, faces, motion, lip synchronization, audio synchronization, and temporal inconsistencies.',
      features: [
        'Deepfake & face swap detection',
        'Per-frame landmark analysis',
        'Lip-sync latency graph',
        'Audio/video sync verification'
      ],
      cta: 'Analyze Video'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-widest block mb-2">
            MULTI-MODAL VERIFICATION CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Tailored Forensics for Every Media Type
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Different media formats require distinct technical models. VerifyAI applies specialized detection pipelines designed for images, audio tracks, and full video streams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {card.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {card.features.map((feat, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => onStartAnalysis(card.id as any)}
                    className="w-full py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-700 font-bold text-xs hover:bg-emerald-600 hover:text-white transition-colors flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onLoadPreset(MOCK_ANALYSES[card.presetId])}
                    className="w-full py-1.5 text-[11px] text-slate-500 hover:text-slate-900 font-mono transition-colors"
                  >
                    View Sample {card.title} Telemetry →
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
