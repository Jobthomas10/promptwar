'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { TrustSection } from '@/components/TrustSection';
import { MediaTypesSection } from '@/components/MediaTypesSection';
import { WhyVeritas } from '@/components/WhyVeritas';
import { MediaUploader } from '@/components/MediaUploader';
import { AnalysisProgress } from '@/components/AnalysisProgress';
import { VerdictCard } from '@/components/VerdictCard';
import { EvidenceBreakdown } from '@/components/EvidenceBreakdown';
import { ImageOverlay } from '@/components/ImageOverlay';
import { AudioWaveform } from '@/components/AudioWaveform';
import { VideoTimeline } from '@/components/VideoTimeline';
import { SourceTimeline } from '@/components/SourceTimeline';
import { ContextVerification } from '@/components/ContextVerification';
import { MediaComparison } from '@/components/MediaComparison';
import { EvidenceExplorer } from '@/components/EvidenceExplorer';
import { GenAIExplanationPanel } from '@/components/GenAIExplanationPanel';
import { VerificationReport } from '@/components/VerificationReport';
import { UserDashboard } from '@/components/UserDashboard';
import { AboutHowItWorks } from '@/components/AboutHowItWorks';
import { MOCK_ANALYSES } from '@/lib/mockData';
import { AnalysisResult, MediaType } from '@/lib/types';
import { AlertTriangle, ShieldCheck, FileText } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<MediaType>('image');
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult>(MOCK_ANALYSES['demo-video-deepfake']);
  const [stagedAnalysis, setStagedAnalysis] = useState<AnalysisResult | null>(null);
  const [resultsSubTab, setResultsSubTab] = useState<'overview' | 'forensics' | 'timeline' | 'context' | 'comparison' | 'explorer' | 'ai_assistant'>('overview');

  const handleStartProcessing = (analysisData: AnalysisResult) => {
    setStagedAnalysis(analysisData);
    setActiveTab('processing');
  };

  const handleScanComplete = () => {
    if (stagedAnalysis) {
      setCurrentAnalysis(stagedAnalysis);
    }
    setActiveTab('results');
  };

  const handleLoadPreset = (preset: AnalysisResult) => {
    setStagedAnalysis(preset);
    setActiveTab('processing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Sticky Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onStartAnalysis={() => setActiveTab('analyze')}
      />

      {/* Main Content Area */}
      <main className="flex-grow">

        {/* 1. LANDING PAGE */}
        {activeTab === 'landing' && (
          <div className="space-y-0 animate-in fade-in duration-300">
            <Hero 
              onStartAnalysis={() => setActiveTab('analyze')}
              onSeeHowItWorks={() => setActiveTab('how-it-works')}
              onLoadPreset={handleLoadPreset}
              onStartProcessing={handleStartProcessing}
            />
            <TrustSection onStartAnalysis={() => setActiveTab('analyze')} />
            <MediaTypesSection 
              onStartAnalysis={(type) => {
                if (type) setMediaTypeFilter(type);
                setActiveTab('analyze');
              }}
              onLoadPreset={handleLoadPreset}
            />
            <WhyVeritas />
          </div>
        )}

        {/* 2. ANALYZE MEDIA PAGE */}
        {activeTab === 'analyze' && (
          <div className="animate-in fade-in duration-300">
            <MediaUploader 
              initialType={mediaTypeFilter}
              onStartProcessing={handleStartProcessing}
              onLoadPreset={handleLoadPreset}
            />
          </div>
        )}

        {/* 3. ANALYSIS PROCESSING PAGE */}
        {activeTab === 'processing' && (
          <div className="animate-in fade-in duration-300">
            <AnalysisProgress 
              targetResult={stagedAnalysis || currentAnalysis}
              onComplete={handleScanComplete}
            />
          </div>
        )}

        {/* 4. VERIFICATION RESULTS DASHBOARD */}
        {activeTab === 'results' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
            
            {/* Top Results Navigation Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
                  ACTIVE CASE #{currentAnalysis.id}
                </span>
                <h1 className="text-2xl font-black text-slate-900">
                  Verification Dashboard: {currentAnalysis.filename}
                </h1>
              </div>

              {/* Sub-tab switcher */}
              <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm overflow-x-auto w-full sm:w-auto">
                {[
                  { id: 'overview', label: 'Overview & Evidence' },
                  { id: 'forensics', label: 'Media Forensics' },
                  { id: 'timeline', label: 'Source Timeline' },
                  { id: 'context', label: 'Context Claims' },
                  { id: 'comparison', label: 'Media Comparison' },
                  { id: 'explorer', label: 'Evidence Explorer' },
                  { id: 'ai_assistant', label: 'GenAI Assistant' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setResultsSubTab(t.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${
                      resultsSubTab === t.id
                        ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-Tab 1: Overview & Verdict */}
            {resultsSubTab === 'overview' && (
              <div className="space-y-8">
                <VerdictCard analysis={currentAnalysis} />
                <EvidenceBreakdown analysis={currentAnalysis} />
                
                {/* Embedded Media Specific Forensics */}
                {currentAnalysis.mediaType === 'image' && <ImageOverlay analysis={currentAnalysis} />}
                {currentAnalysis.mediaType === 'audio' && <AudioWaveform analysis={currentAnalysis} />}
                {currentAnalysis.mediaType === 'video' && <VideoTimeline analysis={currentAnalysis} />}

                {/* Final Recommendation Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-3">
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="font-extrabold text-sm uppercase tracking-wider font-mono">
                      FINAL INVESTIGATIVE RECOMMENDATION
                    </span>
                  </div>

                  <p className="text-sm text-slate-800 font-semibold leading-relaxed">
                    {currentAnalysis.finalRecommendation}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-xs text-amber-700 font-mono font-medium flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Important: Automated analysis is probabilistic and should not replace human verification.</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setActiveTab('report')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition-all flex items-center space-x-2 shadow-md"
                  >
                    <FileText className="w-4 h-4 text-white" />
                    <span>Generate Full Journalistic Report</span>
                  </button>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Forensics */}
            {resultsSubTab === 'forensics' && (
              <div>
                {currentAnalysis.mediaType === 'image' && <ImageOverlay analysis={currentAnalysis} />}
                {currentAnalysis.mediaType === 'audio' && <AudioWaveform analysis={currentAnalysis} />}
                {currentAnalysis.mediaType === 'video' && <VideoTimeline analysis={currentAnalysis} />}
              </div>
            )}

            {/* Sub-Tab 3: Timeline */}
            {resultsSubTab === 'timeline' && <SourceTimeline analysis={currentAnalysis} />}

            {/* Sub-Tab 4: Context */}
            {resultsSubTab === 'context' && <ContextVerification analysis={currentAnalysis} />}

            {/* Sub-Tab 5: Comparison */}
            {resultsSubTab === 'comparison' && <MediaComparison analysis={currentAnalysis} />}

            {/* Sub-Tab 6: Explorer */}
            {resultsSubTab === 'explorer' && <EvidenceExplorer analysis={currentAnalysis} />}

            {/* Sub-Tab 7: AI Assistant */}
            {resultsSubTab === 'ai_assistant' && <GenAIExplanationPanel analysis={currentAnalysis} />}

          </div>
        )}

        {/* 5. LOGGED-IN DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in duration-300">
            <UserDashboard 
              onNewAnalysis={() => setActiveTab('analyze')}
              onSelectAnalysis={(res) => {
                setCurrentAnalysis(res);
                setActiveTab('results');
                setResultsSubTab('overview');
              }}
            />
          </div>
        )}

        {/* 6. VERIFICATION REPORT */}
        {activeTab === 'report' && (
          <div className="animate-in fade-in duration-300">
            <VerificationReport analysis={currentAnalysis} />
          </div>
        )}

        {/* 7. ABOUT / HOW IT WORKS */}
        {activeTab === 'how-it-works' && (
          <div className="animate-in fade-in duration-300">
            <AboutHowItWorks onStartAnalysis={() => setActiveTab('analyze')} />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

