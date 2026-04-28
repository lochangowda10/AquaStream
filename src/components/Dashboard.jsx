import React, { useState } from 'react';
import { useWaterData } from '../hooks/useWaterData';
import { NeighborhoodCard } from './NeighborhoodCard';
import { InsightCard } from './InsightCard';
import { allocateTankers } from '../services/geminiService';
import { Activity, Satellite, Zap } from 'lucide-react';

export function Dashboard() {
  const { data } = useWaterData();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSmartDispatch = async () => {
    setLoading(true);
    // Send current snapshot of data to Gemini
    const result = await allocateTankers(data);
    setInsights(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-city-darker bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-[#020617] p-4 md:p-8">
      
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-google-blue to-purple-400 tracking-tight flex items-center gap-3">
            <Satellite className="text-google-blue" size={40} />
            AquaStream AI
          </h1>
          <p className="text-slate-400 mt-2 font-medium tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-safe-green animate-pulse"></span>
            Bengaluru City Command Center
          </p>
        </div>

        <button 
          onClick={handleSmartDispatch}
          disabled={loading}
          className="group relative px-6 py-3 font-bold text-white rounded-lg bg-google-blue hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(66,133,244,0.4)] hover:shadow-[0_0_30px_rgba(66,133,244,0.6)] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <span className="flex items-center gap-2 relative z-10">
            <Zap size={18} className={loading ? "animate-pulse" : ""} />
            {loading ? "Processing..." : "Run Smart Dispatch"}
          </span>
        </button>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex items-center gap-2 text-slate-300 border-b border-slate-800 pb-2">
          <Activity size={20} className="text-google-blue" />
          <h2 className="text-xl font-semibold uppercase tracking-widest">Live Sector Telemetry</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(zone => (
            <NeighborhoodCard key={zone.id} data={zone} />
          ))}
        </div>

        <InsightCard insights={insights} loading={loading} />
        
      </main>
      
    </div>
  );
}
