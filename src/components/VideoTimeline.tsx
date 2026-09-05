'use client';

import React, { useState } from 'react';
import { Film, Play, Pause, AlertTriangle, UserCheck, Activity, Layers } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

interface VideoTimelineProps {
  analysis: AnalysisResult;
}

export const VideoTimeline: React.FC<VideoTimelineProps> = ({ analysis }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFrame, setActiveFrame] = useState(2);
  const [showFaceBoxes, setShowFaceBoxes] = useState(true);

  const frames = [
    { time: '00:02', frame: 120, status: 'authentic', score: 12 },
    { time: '00:08', frame: 480, status: 'suspicious', score: 92, note: 'Lip-sync Latency Lead (140ms)' },
    { time: '00:11', frame: 660, status: 'suspicious', score: 88, note: 'Face Mesh Boundary Jitter' },
    { time: '00:19', frame: 1140, status: 'suspicious', score: 84, note: 'Micro-Blink Interval Anomaly' },
    { time: '00:28', frame: 1680, status: 'authentic', score: 18 },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6 text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
            TEMPORAL VIDEO & LIP-SYNC FORENSICS
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-0.5">
            Deepfake & Frame Synchronicity Analysis
          </h3>
        </div>

        <button
          onClick={() => setShowFaceBoxes(!showFaceBoxes)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
            showFaceBoxes 
              ? 'bg-emerald-600 text-white font-extrabold shadow-sm' 
              : 'text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>{showFaceBoxes ? 'Face Bounding Active' : 'Face Mesh Off'}</span>
        </button>
      </div>

      {/* Main Video View & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Video Player Display Left */}
        <div className="lg:col-span-7">
          <div className="relative rounded-xl bg-slate-900 border border-slate-800 overflow-hidden aspect-video flex items-center justify-center group shadow-md">
            <img 
              src={analysis.mediaUrl} 
              alt="Video Scrubber Frame" 
              className="w-full h-full object-cover"
            />

            {showFaceBoxes && (
              <div className="absolute top-[22%] left-[38%] w-[26%] h-[40%] border-2 border-emerald-400 bg-emerald-500/10 rounded-lg pointer-events-none flex flex-col justify-between p-1">
                <span className="bg-emerald-600 text-white text-[8px] font-mono font-bold px-1 rounded w-fit">
                  TRACKING: FACE_01
                </span>
                <span className="bg-rose-600 text-white text-[8px] font-mono font-bold px-1 rounded w-fit">
                  VISEME ANOMALY 91%
                </span>
              </div>
            )}

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-white text-white" /> : <Play className="w-6 h-6 ml-1 fill-white text-white" />}
            </button>

            <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-slate-950/90 border border-slate-800 text-[10px] font-mono text-emerald-400 font-bold">
              FRAME: 480 / 1920 (00:08)
            </div>
          </div>
        </div>

        {/* Temporal Lip-Sync Drift Graph Right */}
        <div className="lg:col-span-5 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-xs font-mono font-bold text-emerald-700 flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>AUDIO-VISUAL LIP LATENCY GRAPH</span>
            </span>
            <span className="text-[10px] font-mono text-rose-600 font-bold">SPIKE: +140ms</span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            Cross-modal transformer measures acoustic spectrum vs lip aperture. A non-uniform 140ms lead time occurs between 00:08 and 00:11.
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold">
              <span>00:00</span>
              <span className="text-rose-600 font-bold">00:08 - 00:11 ANOMALY</span>
              <span>00:32</span>
            </div>

            <div className="h-20 w-full bg-white rounded-lg border border-slate-200 flex items-end p-2 space-x-1 shadow-inner">
              {[10, 12, 14, 18, 88, 94, 91, 85, 30, 20, 84, 80, 25, 15, 12].map((val, i) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-t transition-all ${
                    val > 60 ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Frame Scrubber Bar */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-mono text-slate-600 uppercase tracking-widest font-bold">
          Keyframe Thumbnails & Temporal Anomaly Markers:
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {frames.map((f, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFrame(idx)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                activeFrame === idx 
                  ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' 
                  : 'border-slate-200 bg-white hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="text-slate-900 font-bold">{f.time}</span>
                <span className={`px-1.5 py-0.5 rounded font-bold ${
                  f.status === 'suspicious' ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {f.score}%
                </span>
              </div>
              
              <div className="text-[10px] font-mono text-slate-500 font-medium truncate">
                Frame {f.frame}
              </div>
              {f.note && (
                <div className="text-[9px] text-amber-700 font-mono font-bold mt-1 truncate">
                  {f.note}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
