'use client';

import React from 'react';

interface ConfidenceMeterProps {
  score: number; // 0 - 100
  evidenceStrength: 'HIGH' | 'MEDIUM' | 'LOW';
  size?: number;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ 
  score, 
  evidenceStrength, 
  size = 130 
}) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getMeterColor = (val: number) => {
    if (val >= 80) return '#f87171'; // Red alert
    if (val >= 60) return '#fbbf24'; // Amber warning
    return '#34d399'; // Emerald authentic
  };

  const meterColor = getMeterColor(score);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={meterColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black font-mono text-slate-900 tracking-tight">
          {score}%
        </span>
        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest -mt-1">
          CONFIDENCE
        </span>
      </div>

      <div className="mt-2">
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
          evidenceStrength === 'HIGH' 
            ? 'bg-rose-50 text-rose-700 border-rose-200' 
            : evidenceStrength === 'MEDIUM' 
            ? 'bg-amber-50 text-amber-700 border-amber-200' 
            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}>
          STRENGTH: {evidenceStrength}
        </span>
      </div>
    </div>
  );
};

