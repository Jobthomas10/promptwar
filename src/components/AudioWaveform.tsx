'use client';

import React, { useState } from 'react';
import { Play, Pause, Music, Activity, FileText, AlertTriangle, Volume2 } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

interface AudioWaveformProps {
  analysis: AnalysisResult;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({ analysis }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMode, setActiveMode] = useState<'waveform' | 'spectrogram'>('waveform');
  const [playbackTime, setPlaybackTime] = useState(8);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6 text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
            SPECTRAL AUDIO FORENSICS
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-0.5">
            Voice Clone & Frequency Analysis
          </h3>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveMode('waveform')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeMode === 'waveform'
                ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Waveform</span>
          </button>

          <button
            onClick={() => setActiveMode('spectrogram')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeMode === 'spectrogram'
                ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Spectrogram</span>
          </button>
        </div>
      </div>

      {/* Main Player & Waveform Visualizer */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold hover:bg-emerald-700 transition-all shadow-md"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 ml-0.5 fill-white" />}
            </button>

            <div>
              <span className="font-bold text-sm text-slate-900 font-mono block">{analysis.filename}</span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">
                00:08 / {analysis.resolutionOrDuration.split('•').pop()?.trim() || '00:21'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>44.1 kHz PCM</span>
          </div>
        </div>

        {/* Waveform vs Spectrogram Visual Canvas */}
        <div className="relative h-36 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center p-4 shadow-inner">
          
          {activeMode === 'waveform' ? (
            <div className="w-full h-full flex items-center justify-between space-x-1">
              {Array.from({ length: 48 }).map((_, i) => {
                const isSuspiciousRange = i >= 16 && i <= 24;
                const isCurrentScrubber = i === 18;
                const barHeight = Math.floor(20 + Math.sin(i * 0.5) * 35 + (isSuspiciousRange ? 30 : 0));

                return (
                  <div
                    key={i}
                    onClick={() => setPlaybackTime(Math.round((i / 48) * 21))}
                    className={`flex-1 rounded-full transition-all cursor-pointer ${
                      isCurrentScrubber
                        ? 'bg-white shadow-md ring-2 ring-emerald-400'
                        : isSuspiciousRange
                        ? 'bg-rose-500 hover:bg-rose-400'
                        : 'bg-emerald-500/70 hover:bg-emerald-400'
                    }`}
                    style={{ height: `${barHeight}%` }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              <div className="absolute left-[34%] top-0 bottom-0 w-[18%] bg-rose-500/30 border-x-2 border-rose-500 flex items-center justify-center">
                <span className="text-[9px] font-mono font-bold bg-slate-950 text-rose-400 px-2 py-0.5 rounded border border-rose-500/40 shadow-xs">
                  FORMANT SHIFT ANOMALY
                </span>
              </div>
            </div>
          )}

          <div className="absolute bottom-2 inset-x-4 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-1">
            <span>00:00</span>
            <span className="text-rose-400 font-bold bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40">
              SUSPICIOUS: 00:08 - 00:11
            </span>
            <span>00:21</span>
          </div>

        </div>

      </div>

      {/* Suspicious Segment & Transcript */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>DETECTED ANOMALY SEGMENT</span>
          </div>
          <div className="text-xs font-mono text-rose-900 font-bold">
            Timestamp: 00:08 – 00:11
          </div>
          <p className="text-xs text-rose-700 leading-relaxed font-medium">
            "Voice characteristics and background noise change unusually within this segment. Synthetic pitch formants detected."
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-700">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>SPEECH TRANSCRIPT ANALYSIS</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-mono font-medium">
            {analysis.audioTranscript || "Speech transcript generated via automatic speech recognition models."}
          </p>
        </div>

      </div>

    </div>
  );
};
