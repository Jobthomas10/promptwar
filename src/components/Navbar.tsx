'use client';

import React, { useState } from 'react';
import { ShieldCheck, Search, FileText, Info, ArrowRight, Lock, Sparkles, Terminal } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onStartAnalysis: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onStartAnalysis }) => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [signInRole, setSignInRole] = useState<'journalist' | 'investigator' | 'researcher'>('journalist');

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-300 flex items-center justify-center shadow-sm group-hover:border-emerald-500 transition-all">
              <ShieldCheck className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-wider text-slate-900 flex items-center space-x-1.5">
                <span>VerifyAI</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">v2.4 Pro</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest -mt-1">FORENSIC MEDIA ENGINE</span>
            </div>
          </div>

          {/* Nav Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            {[
              { id: 'landing', label: 'Overview', icon: ShieldCheck },
              { id: 'analyze', label: 'Analyze', icon: Search },
              { id: 'dashboard', label: 'Workspace', icon: Terminal },
              { id: 'how-it-works', label: 'How It Works', icon: Info },
              { id: 'report', label: 'Report Demo', icon: FileText },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSignInModal(true)}
              className="text-xs font-medium text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center space-x-1"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('analyze');
                onStartAnalysis();
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Start Analysis</span>
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </header>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-emerald-200 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-lg font-bold"
            >
              ✕
            </button>
            <div className="flex items-center space-x-2 text-emerald-700 mb-2">
              <ShieldCheck className="w-6 h-6" />
              <span className="font-bold text-lg text-slate-900">VerifyAI Intelligence Portal</span>
            </div>
            <p className="text-xs text-slate-600 mb-6">
              Access accredited media authentication workspace, batch APIs, and official audit log history.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-700 font-medium block mb-1.5">Select Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['journalist', 'investigator', 'researcher'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setSignInRole(role)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs capitalize border font-medium ${
                        signInRole === role 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-700 font-medium block mb-1">Press / Organization Email</label>
                <input 
                  type="email" 
                  placeholder="investigator@newsroom.org" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 font-medium block mb-1">Security Key / Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                onClick={() => {
                  setShowSignInModal(false);
                  setActiveTab('dashboard');
                }}
                className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1.5 shadow-md"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Enter Workspace</span>
              </button>

              <div className="text-center">
                <span className="text-[11px] text-slate-500">
                  Demo Mode Enabled — Instant passwordless entry available
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

