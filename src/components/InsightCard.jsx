import React from 'react';
import { BrainCircuit, Truck } from 'lucide-react';

export function InsightCard({ insights, loading }) {
  if (loading) {
    return (
      <div className="glass-panel rounded-xl p-6 mt-6 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <BrainCircuit className="text-google-blue animate-spin-slow" size={24} />
          <h2 className="text-xl font-bold text-white">AI Analyzing Live Data...</h2>
        </div>
        <div className="h-4 bg-slate-700 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
      </div>
    );
  }

  if (!insights) return null;

  if (insights.error) {
    return (
      <div className="glass-panel rounded-xl p-6 mt-6 border-critical-red/50">
        <h2 className="text-xl font-bold text-critical-red mb-2">Error</h2>
        <p className="text-slate-300">{insights.error}</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl p-6 mt-6 border-google-blue/50 shadow-[0_0_30px_rgba(66,133,244,0.15)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-google-blue via-purple-500 to-google-blue"></div>
      
      <div className="flex items-center gap-3 mb-4">
        <BrainCircuit className="text-google-blue" size={24} />
        <h2 className="text-2xl font-bold text-white">Smart Dispatch Strategy</h2>
      </div>

      <div className="mb-6 bg-city-darker rounded-lg p-4 border border-slate-700">
        <h3 className="text-sm text-slate-400 mb-2 uppercase tracking-widest font-semibold">AI Reasoning</h3>
        <p className="text-slate-200 leading-relaxed text-sm md:text-base">
          {insights.reasoning}
        </p>
      </div>

      <div>
        <h3 className="text-sm text-slate-400 mb-3 uppercase tracking-widest font-semibold flex items-center gap-2">
          <Truck size={16} /> Tanker Allocations (15 Total)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {insights.allocations.map((alloc, idx) => (
            <div key={idx} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 flex justify-between items-center">
              <span className="text-slate-200 font-medium">{alloc.neighborhood}</span>
              <span className="bg-google-blue text-white px-2 py-1 rounded text-sm font-bold shadow-[0_0_10px_rgba(66,133,244,0.5)]">
                {alloc.tankersAllocated}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
