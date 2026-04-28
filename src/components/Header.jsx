import React from 'react';
import { Satellite, Shield, Clock, Wifi, Trophy } from 'lucide-react';

export function Header({ lastUpdated }) {
  return (
    <header className="relative border-b border-slate-800/50 bg-city-darker/90 backdrop-blur-xl sticky top-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-google-blue/5 via-transparent to-purple-accent/5"></div>
      
      {/* Hackathon Banner */}
      <div className="w-full bg-gradient-to-r from-google-blue via-purple-accent to-google-blue py-1 text-center relative z-10">
        <p className="text-[10px] md:text-xs font-bold text-white tracking-[0.2em] uppercase flex items-center justify-center gap-2">
          <Trophy size={12} /> Built for Google Solution Challenge 2026 — Smart Resource Allocation Hackathon
        </p>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-google-blue to-purple-accent flex items-center justify-center glow-blue">
                <Satellite className="text-white" size={24} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-safe-green animate-pulse border-2 border-city-darker"></div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gradient-blue">
                AquaStream AI
              </h1>
              <p className="text-[10px] md:text-xs text-slate-400 font-semibold tracking-[0.1em] uppercase mt-0.5">
                <span className="text-critical-red">Not Reactive.</span> <span className="text-safe-green">Predictive.</span> • AI Urban Water Crisis Prevention
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 glass-panel rounded-lg px-3 py-2">
              <Wifi size={12} className="text-safe-green" />
              <span className="text-safe-green font-semibold">LIVE</span>
            </div>
            <div className="flex items-center gap-2 glass-panel rounded-lg px-3 py-2 border-google-blue/30 bg-google-blue/5">
              <Shield size={12} className="text-google-blue" />
              <span className="text-google-blue font-bold">Gemini 1.5 Flash</span>
            </div>
            <div className="flex items-center gap-2 glass-panel rounded-lg px-3 py-2">
              <Clock size={12} className="text-slate-400" />
              <span className="text-slate-400 mono">{lastUpdated.toLocaleTimeString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
