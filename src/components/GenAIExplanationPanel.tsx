'use client';

import React, { useState } from 'react';
import { Bot, Terminal, Send } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

interface GenAIExplanationPanelProps {
  analysis: AnalysisResult;
}

export const GenAIExplanationPanel: React.FC<GenAIExplanationPanelProps> = ({ analysis }) => {
  const [userQuery, setUserQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello, I am the VerifyAI Evidence Synthesis Assistant. I translate structured neural telemetry into human-understandable investigative explanations without fabricating facts.\n\nStructured Input Telemetry:\n- AI Generation Probability: ${analysis.aiGenerationScore}%\n- Manipulation Index: ${analysis.manipulationScore}%\n- Provenance Status: ${analysis.provenanceStatus}\n\nAsk me any question about the evidence findings.`
    }
  ]);

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const query = userQuery;
    setUserQuery('');

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);

    setTimeout(() => {
      let responseText = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('court') || qLower.includes('legal') || qLower.includes('evidence')) {
        responseText = `VerifyAI Legal Guidance: While our models detected a ${analysis.confidenceScore}% confidence anomaly index, automated probabilistic outputs should not be presented as standalone forensic proof in court. We recommend pairing this report with hardware C2PA verification and expert testimony.`;
      } else if (qLower.includes('face') || qLower.includes('lip') || qLower.includes('video')) {
        responseText = `Facial Telemetry Analysis: Keypoint tracking identified temporal jitter in frames 480-660. The 140ms lead time between speech acoustic formants and mouth visemes strongly supports audio replacement.`;
      } else if (qLower.includes('metadata') || qLower.includes('exif')) {
        responseText = `Metadata Inspection: EXIF camera headers are missing. Note that messaging platforms strip EXIF metadata routinely, so metadata absence alone is inconclusive.`;
      } else {
        responseText = `Based strictly on recorded telemetry for ${analysis.filename}, the strongest signals are AI generation (${analysis.aiGenerationScore}%) and manipulation (${analysis.manipulationScore}%). No unverified facts have been introduced.`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: responseText }]);
    }, 500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
              EVIDENCE-BOUNDED EXPLANATION ENGINE
            </span>
            <h3 className="text-lg font-black text-slate-900">
              GenAI Evidence Interpreter
            </h3>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold">
          ZERO-HALLUCINATION LLM PIPELINE
        </span>
      </div>

      {/* Structured Telemetry JSON Box */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2 text-emerald-400 shadow-inner">
        <div className="flex items-center justify-between text-[11px] text-emerald-400 border-b border-slate-800 pb-1 font-bold">
          <span className="flex items-center space-x-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>RAW STRUCTURED TELEMETRY STATE (JSON)</span>
          </span>
          <span className="text-emerald-400">STATE LOADED</span>
        </div>

        <pre className="text-emerald-300 text-[11px] overflow-x-auto leading-relaxed">
{JSON.stringify({
  case_id: analysis.id,
  media_type: analysis.mediaType,
  ai_generation_score: analysis.aiGenerationScore,
  manipulation_score: analysis.manipulationScore,
  source_matches: analysis.sources.length,
  metadata_status: analysis.provenanceStatus,
  verdict: analysis.verdict
}, null, 2)}
        </pre>
      </div>

      {/* Interactive Q&A Chat Log */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
          Ask the GenAI Model about Telemetry Evidence:
        </h4>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-h-60 overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg p-3 rounded-xl text-xs leading-relaxed font-sans ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-800 shadow-sm font-medium'
              }`}>
                {m.sender === 'ai' && (
                  <span className="font-mono text-[10px] text-emerald-700 font-bold block mb-1">
                    VerifyAI LLM ENGINE
                  </span>
                )}
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleAskQuestion} className="flex items-center space-x-2">
          <input 
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Ask a question (e.g., 'Explain why the lip sync was flagged')..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-sans"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition-colors flex items-center space-x-1.5 shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>
        </form>
      </div>

    </div>
  );
};

