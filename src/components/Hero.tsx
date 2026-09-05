'use client';

import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Sparkles, Play, Image as ImageIcon, Music, Film, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MOCK_ANALYSES, generateCustomAnalysis } from '@/lib/mockData';
import { AnalysisResult, MediaType } from '@/lib/types';

interface HeroProps {
  onStartAnalysis: () => void;
  onSeeHowItWorks: () => void;
  onLoadPreset: (preset: AnalysisResult) => void;
  onStartProcessing?: (analysis: AnalysisResult) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis, onSeeHowItWorks, onLoadPreset, onStartProcessing }) => {
  const [urlInput, setUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    let type: MediaType = 'image';
    if (file.type.startsWith('audio/')) type = 'audio';
    else if (file.type.startsWith('video/')) type = 'video';
    else if (file.name.match(/\.(mp4|webm|mov|avi)$/i)) type = 'video';
    else if (file.name.match(/\.(mp3|wav|ogg|m4a)$/i)) type = 'audio';

    const formattedSize = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    const resOrDur = type === 'image' ? 'Original Resolution' : type === 'video' ? 'Video Stream' : 'Audio Stream';

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            mediaType: type,
            mediaUrl: dataUrl,
            fileSize: formattedSize,
            resolutionOrDuration: resOrDur,
            scanProfile: 'auto'
          })
        });
        const json = await res.json();
        if (json.success && json.data) {
          if (onStartProcessing) onStartProcessing(json.data);
          else onStartAnalysis();
          return;
        }
      } catch (err) {
        console.error('API analysis error:', err);
      }

      const generated = generateCustomAnalysis(
        file.name, 
        type, 
        dataUrl, 
        formattedSize, 
        resOrDur,
        'auto'
      );

      if (onStartProcessing) {
        onStartProcessing(generated);
      } else {
        onStartAnalysis();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    } else {
      onStartAnalysis();
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) {
      onStartAnalysis();
      return;
    }
    const isVid = urlInput.includes('youtube') || urlInput.includes('mp4') || urlInput.includes('video');
    const isAud = urlInput.includes('wav') || urlInput.includes('mp3') || urlInput.includes('audio');
    const type: MediaType = isVid ? 'video' : isAud ? 'audio' : 'image';

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'URL_Media_Scan',
          mediaType: type,
          mediaUrl: urlInput,
          fileSize: 'Remote Stream',
          resolutionOrDuration: 'Web Stream',
          scanProfile: 'auto'
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        if (onStartProcessing) onStartProcessing(json.data);
        else onStartAnalysis();
        return;
      }
    } catch (err) {
      console.error('URL API error:', err);
    }

    const generated = generateCustomAnalysis('URL_Media_Scan', type, urlInput, 'Remote URL', 'Web Stream', 'auto');
    if (onStartProcessing) {
      onStartProcessing(generated);
    } else {
      onStartAnalysis();
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 forensic-grid forensic-radial-glow border-b border-slate-200">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={heroFileInputRef} 
        onChange={handleFileInputChange} 
        accept="image/*,audio/*,video/*" 
        className="hidden" 
      />

      {/* Background glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase tracking-wider">GenAI Media Forensic Platform</span>
          </div>
          <div className="hidden sm:inline-flex items-center space-x-1.5 text-xs text-slate-500 font-mono">
            <span>DETECT</span>
            <span>→</span>
            <span>EXPLAIN</span>
            <span>→</span>
            <span>TRACE</span>
            <span>→</span>
            <span>VERIFY</span>
          </div>
        </div>

        {/* Hero Title & Subtext */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
            Don't Trust It. <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 bg-clip-text text-transparent">Verify It.</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Analyze images, audio, and video for signs of AI generation, manipulation, and misleading context. Insert your media to run instant neural verification.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => heroFileInputRef.current?.click()}
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all shadow-md flex items-center space-x-2 group"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Analyze Media File</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onSeeHowItWorks}
              className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-sm hover:text-slate-900 hover:border-slate-400 shadow-sm transition-all flex items-center space-x-2"
            >
              <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>See How It Works</span>
            </button>
          </div>
        </div>

        {/* Interactive Media Upload Panel */}
        <div className="max-w-3xl mx-auto">
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => heroFileInputRef.current?.click()}
            className={`relative rounded-2xl bg-white border transition-all duration-300 p-8 text-center overflow-hidden shadow-xl cursor-pointer ${
              dragActive 
                ? 'border-emerald-500 bg-emerald-50/50 ring-4 ring-emerald-500/20' 
                : 'border-slate-200 hover:border-emerald-400'
            }`}
          >
            {/* Animated Scanning Sweep Bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-80 animate-pulse" />

            <div className="relative z-10 flex flex-col items-center space-y-4">
              
              {/* Icon drop badge */}
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-inner group">
                <Upload className="w-7 h-7 text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-wide">
                  CLICK OR DROP MEDIA FILE HERE
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload an image, audio file, or video to initiate instant AI forensic scanning
                </p>
              </div>

              {/* Format badges */}
              <div className="flex items-center space-x-4 py-1">
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>IMAGE</span>
                </div>
                <span className="text-slate-300 font-mono">•</span>
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono">
                  <Music className="w-3.5 h-3.5 text-teal-600" />
                  <span>AUDIO</span>
                </div>
                <span className="text-slate-300 font-mono">•</span>
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono">
                  <Film className="w-3.5 h-3.5 text-indigo-600" />
                  <span>VIDEO</span>
                </div>
              </div>

              {/* URL Input field */}
              <form onSubmit={handleUrlSubmit} onClick={(e) => e.stopPropagation()} className="w-full max-w-md flex items-center space-x-2 pt-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste a media URL (e.g., https://...)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 font-semibold text-xs hover:bg-emerald-600 hover:text-white transition-colors flex-shrink-0"
                >
                  Analyze URL
                </button>
              </form>

              {/* File upload action button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); heroFileInputRef.current?.click(); }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 border border-emerald-700 text-white font-semibold text-xs hover:bg-emerald-700 transition-all flex items-center space-x-2 shadow-md"
                >
                  <Upload className="w-3.5 h-3.5 text-white" />
                  <span>Select & Insert File</span>
                </button>
              </div>

            </div>

          </div>

          {/* Quick Demo Presets bar */}
          <div className="mt-6 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Try Demo Presets (Instant Telemetry)</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono">No upload required</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { 
                  id: 'demo-video-deepfake', 
                  title: 'Deepfake Video', 
                  tag: 'LIKELY MANIPULATED', 
                  color: 'text-amber-700 bg-amber-50 border-amber-200',
                  icon: Film
                },
                { 
                  id: 'demo-image-synthetic', 
                  title: 'Diffusion AI Image', 
                  tag: 'SYNTHETIC 94%', 
                  color: 'text-rose-700 bg-rose-50 border-rose-200',
                  icon: ImageIcon
                },
                { 
                  id: 'demo-audio-voiceclone', 
                  title: 'AI Voice Clone', 
                  tag: 'MANIPULATED 84%', 
                  color: 'text-amber-700 bg-amber-50 border-amber-200',
                  icon: Music
                },
                { 
                  id: 'demo-image-authentic', 
                  title: 'Authentic Photo', 
                  tag: 'AUTHENTIC 92%', 
                  color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
                  icon: CheckCircle2
                },
              ].map((preset) => {
                const Icon = preset.icon;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onLoadPreset(MOCK_ANALYSES[preset.id])}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-emerald-400 text-left transition-all group"
                  >
                    <div className="flex items-center space-x-1.5 text-xs text-slate-900 font-medium group-hover:text-emerald-600 transition-colors">
                      <Icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-600" />
                      <span className="truncate">{preset.title}</span>
                    </div>
                    <div className={`text-[10px] font-mono mt-1 px-1.5 py-0.5 rounded border inline-block ${preset.color}`}>
                      {preset.tag}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
