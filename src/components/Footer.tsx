'use client';

import React from 'react';
import { ShieldCheck, Terminal, Lock } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-emerald-950 border-t border-emerald-900 pt-12 pb-8 text-emerald-100/70 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-emerald-900">
          
          {/* Col 1 */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-bold text-base text-white tracking-wider">VerifyAI</span>
            </div>
            <p className="text-emerald-200/80 text-xs leading-relaxed">
              Don't trust it. Verify it. Advanced multi-modal forensics & synthetic media detection platform for investigators and fact-checkers.
            </p>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>FORENSIC ENGINE ONLINE • API v2.4</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3 font-mono text-emerald-400">
              Platform Features
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('analyze')} className="hover:text-white transition-colors">
                  AI Image Latent Diffusion Detector
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analyze')} className="hover:text-white transition-colors">
                  Audio Spectral Formant Analysis
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analyze')} className="hover:text-white transition-colors">
                  Video Deepfake & Lip-Sync Verification
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('report')} className="hover:text-white transition-colors">
                  C2PA Provenance & EXIF Audit
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('how-it-works')} className="hover:text-white transition-colors">
                  Explainable AI Telemetry Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3 font-mono text-emerald-400">
              Investigation Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>Workspace Dashboard</span>
                  <Terminal className="w-3 h-3 text-slate-500" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('how-it-works')} className="hover:text-white transition-colors">
                  Source Timeline & Provenance Node Graph
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('report')} className="hover:text-white transition-colors">
                  Journalism PDF Report Generator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('how-it-works')} className="hover:text-white transition-colors">
                  Contextual Debunk Claim Matching
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3 font-mono text-emerald-400">
              Ethics & Governance
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              Automated detection model results are probabilistic indicators designed to support, not replace, rigorous human investigation.
            </p>
            <div className="p-2.5 rounded-lg bg-emerald-900/60 border border-emerald-800 text-[11px] flex items-center space-x-2 text-emerald-200">
              <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Zero data training on uploaded private media files.</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} VerifyAI Forensic Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Verification Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Security & C2PA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
