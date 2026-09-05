'use client';

import React from 'react';
import { VerificationReport } from '@/components/VerificationReport';
import { MOCK_ANALYSES } from '@/lib/mockData';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function ReportPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-slate-100 font-sans">
      <Navbar 
        activeTab="report" 
        setActiveTab={() => router.push('/')} 
        onStartAnalysis={() => router.push('/')}
      />
      <main className="flex-grow py-8">
        <VerificationReport analysis={MOCK_ANALYSES['demo-video-deepfake']} />
      </main>
      <Footer setActiveTab={() => router.push('/')} />
    </div>
  );
}
