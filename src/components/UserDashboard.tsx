'use client';

import React, { useState } from 'react';
import { Search, Plus, Terminal, Filter, Music } from 'lucide-react';
import { MOCK_ANALYSES } from '@/lib/mockData';
import { AnalysisResult } from '@/lib/types';

interface UserDashboardProps {
  onNewAnalysis: () => void;
  onSelectAnalysis: (result: AnalysisResult) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ onNewAnalysis, onSelectAnalysis }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterVerdict, setFilterVerdict] = useState<string>('all');

  const history = Object.values(MOCK_ANALYSES);

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.filename.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.mediaType === filterType;
    const matchesVerdict = filterVerdict === 'all' || (
      filterVerdict === 'manipulated' && (item.verdict === 'LIKELY_MANIPULATED' || item.verdict === 'STRONG_EVIDENCE_SYNTHETIC')
    ) || (
      filterVerdict === 'authentic' && item.verdict === 'LIKELY_AUTHENTIC'
    ) || (
      filterVerdict === 'verification' && item.verdict === 'NEEDS_VERIFICATION'
    );

    return matchesSearch && matchesType && matchesVerdict;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-emerald-600" />
            <span className="font-black text-2xl text-slate-900">Investigator Workspace</span>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1 font-medium">
            Logged in as <span className="text-emerald-700 font-bold">senior_investigator@newsroom.org</span> (Verified Press License)
          </p>
        </div>

        <button
          onClick={onNewAnalysis}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition-all shadow-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>New Media Analysis</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cases by filename or Case ID..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-mono"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
          <span className="text-xs font-mono text-slate-500 font-bold uppercase flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Type:</span>
          </span>

          {['all', 'image', 'audio', 'video'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                filterType === t 
                  ? 'bg-emerald-600 text-white font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
          <span className="text-xs font-mono text-slate-500 font-bold uppercase">Verdict:</span>
          {['all', 'manipulated', 'authentic', 'verification'].map((v) => (
            <button
              key={v}
              onClick={() => setFilterVerdict(v)}
              className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                filterVerdict === v 
                  ? 'bg-emerald-600 text-white font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

      </div>

      {/* History Grid Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
          Recent Cases ({filteredHistory.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectAnalysis(item)}
              className="bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-5 transition-all cursor-pointer group shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                    {item.id}
                  </span>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    item.verdict === 'STRONG_EVIDENCE_SYNTHETIC' || item.verdict === 'LIKELY_MANIPULATED'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : item.verdict === 'LIKELY_AUTHENTIC'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {item.confidenceScore}% CONFIDENCE
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {item.mediaType === 'audio' ? (
                      <Music className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <img src={item.mediaUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors truncate max-w-[180px]">
                      {item.filename}
                    </h4>
                    <div className="text-[11px] font-mono text-slate-500 font-medium uppercase">
                      {item.mediaType} • {item.uploadDate}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold font-mono text-slate-900">
                    {item.verdictLabel}
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 font-medium">
                    {item.whatThisMeans}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-emerald-700 font-bold flex items-center justify-between">
                <span>View Full Telemetry</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

