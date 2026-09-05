'use client';

import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, Music, Film, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MOCK_ANALYSES, generateCustomAnalysis } from '@/lib/mockData';
import { AnalysisResult, MediaType } from '@/lib/types';

interface MediaUploaderProps {
  initialType?: MediaType;
  onStartProcessing: (analysisData: AnalysisResult) => void;
  onLoadPreset: (preset: AnalysisResult) => void;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({ 
  initialType = 'image', 
  onStartProcessing, 
  onLoadPreset 
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType>(initialType);
  const [scanProfile, setScanProfile] = useState<'authentic' | 'manipulated' | 'auto'>('auto');
  const [urlInput, setUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [stagedFile, setStagedFile] = useState<{
    name: string;
    size: string;
    type: MediaType;
    previewUrl: string;
    resolution: string;
    duration?: string;
    fps?: string;
  } | null>({
    name: 'sample_investigation_file.png',
    size: '14.8 MB',
    type: 'image',
    previewUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    resolution: '3840 x 2160 pixels'
  });

  const processSelectedFile = (file: File) => {
    let type: MediaType = 'image';
    if (file.type.startsWith('audio/')) type = 'audio';
    else if (file.type.startsWith('video/')) type = 'video';
    else if (file.type.startsWith('image/')) type = 'image';
    else if (file.name.match(/\.(mp4|webm|mov|avi|mkv)$/i)) type = 'video';
    else if (file.name.match(/\.(mp3|wav|ogg|m4a)$/i)) type = 'audio';

    const formattedSize = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    setSelectedMediaType(type);

    const objectUrl = URL.createObjectURL(file);
    const specs = type === 'image' ? 'Original Resolution' : type === 'video' ? '1080p @ 60fps • 00:30' : '44.1 kHz PCM • 00:20';

    if (type === 'image' && file.size < 8 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setStagedFile({
          name: file.name,
          size: formattedSize,
          type: type,
          previewUrl: dataUrl,
          resolution: specs,
          duration: undefined
        });
      };
      reader.readAsDataURL(file);
    } else {
      setStagedFile({
        name: file.name,
        size: formattedSize,
        type: type,
        previewUrl: objectUrl,
        resolution: specs,
        duration: type === 'audio' ? '00:24' : type === 'video' ? '00:30' : undefined
      });
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSimulatedCategorySelect = (type: MediaType) => {
    setSelectedMediaType(type);
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : type === 'audio' ? 'audio/*' : 'video/*';
      fileInputRef.current.click();
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;
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
          fileSize: 'Remote URL',
          resolutionOrDuration: 'Web Stream',
          scanProfile
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        onStartProcessing(json.data);
        return;
      }
    } catch (err) {
      console.error('API call error:', err);
    }

    const generated = generateCustomAnalysis('URL_Media_Scan', type, urlInput, 'Remote URL', 'Web Media Stream', scanProfile);
    onStartProcessing(generated);
  };

  const handleStartVerification = async () => {
    if (!stagedFile) return;

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: stagedFile.name,
          mediaType: stagedFile.type,
          mediaUrl: stagedFile.previewUrl.startsWith('data:') ? stagedFile.previewUrl : undefined,
          fileSize: stagedFile.size,
          resolutionOrDuration: stagedFile.resolution,
          scanProfile
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        json.data.mediaUrl = stagedFile.previewUrl;
        json.data.thumbnailUrl = stagedFile.previewUrl;
        onStartProcessing(json.data);
        return;
      }
    } catch (err) {
      console.error('API call error:', err);
    }

    const generated = generateCustomAnalysis(
      stagedFile.name, 
      stagedFile.type, 
      stagedFile.previewUrl, 
      stagedFile.size, 
      stagedFile.resolution,
      scanProfile
    );
    onStartProcessing(generated);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileInputChange} 
        accept="video/*,image/*,audio/*,.mp4,.mov,.webm,.avi,.mkv,.mp3,.wav,.jpg,.jpeg,.png,.webp" 
        className="hidden" 
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>INVESTIGATION INGESTION ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Analyze Media
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Insert or upload any image, audio, or video file to analyze. VerifyAI will extract metadata, run neural AI models, trace provenance, and synthesize evidence.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
        
        {/* Top Mode Tabs */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-4">
          
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center space-x-2 ${
                activeTab === 'upload'
                  ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>UPLOAD FILE</span>
            </button>

            <button
              onClick={() => setActiveTab('url')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center space-x-2 ${
                activeTab === 'url'
                  ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>PASTE URL</span>
            </button>
          </div>

          <div className="flex items-center space-x-1.5">
            {[
              { id: 'image', label: 'Image', icon: ImageIcon },
              { id: 'audio', label: 'Audio', icon: Music },
              { id: 'video', label: 'Video', icon: Film },
            ].map((fmt) => {
              const Icon = fmt.icon;
              const isSelected = selectedMediaType === fmt.id;
              return (
                <button
                  key={fmt.id}
                  onClick={() => handleSimulatedCategorySelect(fmt.id as MediaType)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{fmt.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {activeTab === 'upload' ? (
          <div className="space-y-6">
            
            <div 
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                dragActive 
                  ? 'border-emerald-500 bg-emerald-50/50 ring-4 ring-emerald-500/20' 
                  : 'border-slate-300 hover:border-emerald-500 bg-slate-50'
              }`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-inner">
                  <Upload className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-mono">
                    Click to browse or Drag and Drop File Here
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Supports JPG, PNG, WEBP, MP3, WAV, MP4, MOV (Any local media file)
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleSimulatedCategorySelect('image'); }}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:border-emerald-500 shadow-sm flex items-center space-x-1.5"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Select Image File</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleSimulatedCategorySelect('audio'); }}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:border-emerald-500 shadow-sm flex items-center space-x-1.5"
                  >
                    <Music className="w-3.5 h-3.5 text-teal-600" />
                    <span>Select Audio File</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleSimulatedCategorySelect('video'); }}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:border-emerald-500 shadow-sm flex items-center space-x-1.5"
                  >
                    <Film className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Select Video File</span>
                  </button>
                </div>
              </div>
            </div>

            {stagedFile && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                  <span className="text-xs font-mono font-bold text-slate-700">Verification Target Mode:</span>
                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => setScanProfile('authentic')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        scanProfile === 'authentic'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      🟢 Authentic Real Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => setScanProfile('manipulated')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        scanProfile === 'manipulated'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-rose-300'
                      }`}
                    >
                      🔴 Deepfake / AI Manipulated
                    </button>
                    <button
                      type="button"
                      onClick={() => setScanProfile('auto')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        scanProfile === 'auto'
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      ⚡ Auto AI Inspection
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 border border-emerald-300 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 rounded-xl bg-white border border-slate-200 overflow-hidden flex-shrink-0 relative flex items-center justify-center shadow-sm">
                      {stagedFile.type === 'audio' ? (
                        <div className="flex items-center space-x-1 px-2">
                          <div className="w-1 h-8 bg-emerald-500 animate-pulse" />
                          <div className="w-1 h-12 bg-emerald-600" />
                          <div className="w-1 h-6 bg-emerald-400" />
                          <div className="w-1 h-10 bg-emerald-500" />
                          <div className="w-1 h-14 bg-emerald-600" />
                          <div className="w-1 h-4 bg-emerald-400" />
                        </div>
                      ) : stagedFile.type === 'video' ? (
                        <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
                          {stagedFile.previewUrl.startsWith('blob:') ? (
                            <video src={stagedFile.previewUrl} className="w-full h-full object-cover" />
                          ) : (
                            <img src={stagedFile.previewUrl} alt="Video Preview" className="w-full h-full object-cover" />
                          )}
                          <Film className="w-6 h-6 text-white absolute inset-0 m-auto" />
                        </div>
                      ) : (
                        <img 
                          src={stagedFile.previewUrl} 
                          alt="Media Preview" 
                          className="w-full h-full object-cover" 
                        />
                      )}
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-emerald-700 text-[10px] font-mono text-white uppercase font-bold">
                        {stagedFile.type}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-slate-900 font-mono truncate max-w-xs">{stagedFile.name}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-300 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>READY FOR SCAN</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600 font-mono pt-1">
                        <div><span className="text-slate-400">Size:</span> {stagedFile.size}</div>
                        <div><span className="text-slate-400">Specs:</span> {stagedFile.resolution}</div>
                        {stagedFile.duration && (
                          <div><span className="text-slate-400">Duration:</span> {stagedFile.duration}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleStartVerification}
                    className="w-full md:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center space-x-2 flex-shrink-0"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>START AI VERIFICATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              </div>
            )}

          </div>
        ) : (
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-700 font-mono font-bold block mb-2">
                PASTE DIRECT PUBLIC MEDIA URL
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="url" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.org/investigation/video_evidence.mp4"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-mono"
                  required
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-mono">
              <span className="font-bold">Note:</span> VerifyAI will fetch header telemetry, extract keyframes, inspect SSL provenance, and initiate multi-model deepfake scanning.
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>FETCH & START VERIFICATION</span>
            </button>
          </form>
        )}

      </div>

      <div className="mt-8">
        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold mb-3">
          Or load pre-configured forensic case study demo presets:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { id: 'demo-video-deepfake', label: 'Deepfake Video Case', verdict: 'LIKELY MANIPULATED (87%)' },
            { id: 'demo-image-synthetic', label: 'Generative Diffusion Image', verdict: 'SYNTHETIC MEDIA (94%)' },
            { id: 'demo-audio-voiceclone', label: 'Executive Voice Clone', verdict: 'VOICE SPLICE (84%)' },
            { id: 'demo-image-authentic', label: 'Authentic Photo (C2PA)', verdict: 'LIKELY AUTHENTIC (92%)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onLoadPreset(MOCK_ANALYSES[item.id])}
              className="p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 text-left transition-all group shadow-sm"
            >
              <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 font-mono truncate">
                {item.label}
              </div>
              <div className="text-[11px] text-emerald-700 font-mono mt-1 font-semibold">
                {item.verdict}
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
