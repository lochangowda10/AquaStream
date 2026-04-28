import React, { useState } from 'react';
import { BrainCircuit, Truck, Zap, AlertTriangle, TrendingUp, Droplets, Shield, CloudRain, MessageSquareWarning } from 'lucide-react';
import { allocateTankers, predictCrisis, detectLeakages, detectTheft, analyzeRainwater } from '../services/geminiService';

function AITab({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
        active
          ? 'bg-google-blue text-white shadow-[0_0_15px_rgba(66,133,244,0.4)]'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

function LoadingState() {
  return (
    <div className="space-y-3 animate-pulse p-4">
      <div className="flex items-center gap-3">
        <BrainCircuit className="text-google-blue animate-spin" size={24} />
        <span className="text-google-blue font-semibold">Gemini AI Processing Live Telemetry...</span>
      </div>
      <div className="h-3 bg-slate-800 rounded w-3/4"></div>
      <div className="h-3 bg-slate-800 rounded w-1/2"></div>
      <div className="h-3 bg-slate-800 rounded w-2/3"></div>
    </div>
  );
}

function AllocationView({ result }) {
  return (
    <div className="space-y-4">
      <div className="bg-city-darker rounded-lg p-4 border border-slate-800">
        <h4 className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">AI Strategy</h4>
        <p className="text-slate-200 text-sm leading-relaxed">{result.overallStrategy}</p>
      </div>
      {result.emergencyAlerts?.length > 0 && (
        <div className="space-y-2">
          {result.emergencyAlerts.map((alert, i) => (
            <div key={i} className="flex items-center gap-2 bg-critical-red/10 border border-critical-red/20 rounded-lg px-3 py-2">
              <AlertTriangle size={14} className="text-critical-red flex-shrink-0 animate-glow-pulse" />
              <span className="text-critical-red text-xs font-medium">{alert}</span>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {result.allocations.map((a, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-bold text-sm">{a.neighborhood}</span>
              <span className="bg-google-blue text-white px-2.5 py-1 rounded-md text-xs font-bold mono glow-blue">
                {a.tankersAllocated} 🚛
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">{a.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PredictionView({ result }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-city-darker rounded-lg p-4 border border-slate-800">
        <div className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
          result.cityRiskLevel === 'Critical' ? 'bg-critical-red/20 text-critical-red' :
          result.cityRiskLevel === 'High' ? 'bg-warning-yellow/20 text-warning-yellow' :
          'bg-safe-green/20 text-safe-green'
        }`}>
          City Risk: {result.cityRiskLevel}
        </div>
        <p className="text-slate-300 text-sm flex-1">{result.executiveSummary}</p>
      </div>
      <div className="space-y-3">
        {result.predictions.map((p, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-bold">{p.zone}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold mono ${p.crisisProbability > 60 ? 'text-critical-red' : p.crisisProbability > 35 ? 'text-warning-yellow' : 'text-safe-green'}`}>
                  {p.crisisProbability}% risk
                </span>
                <span className="text-xs text-slate-500">• {p.timeline}</span>
              </div>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
              <div className={`h-full rounded-full ${p.crisisProbability > 60 ? 'bg-critical-red' : p.crisisProbability > 35 ? 'bg-warning-yellow' : 'bg-safe-green'}`} style={{ width: `${p.crisisProbability}%` }} />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.preventiveActions.map((a, j) => (
                <span key={j} className="text-[10px] bg-slate-800/80 text-slate-400 px-2 py-1 rounded">{a}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeakageView({ result }) {
  return (
    <div className="space-y-4">
      <div className="bg-city-darker rounded-lg p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Total Estimated Loss</h4>
          <span className="text-critical-red font-bold mono">{result.totalEstimatedLoss}</span>
        </div>
        <p className="text-slate-300 text-sm">{result.summary}</p>
      </div>
      {result.leakages.map((l, i) => (
        <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">{l.zone}</span>
            <span className={`text-xs font-bold mono ${l.leakageProbability > 60 ? 'text-critical-red' : 'text-warning-yellow'}`}>
              {l.leakageProbability}% probability
            </span>
          </div>
          <p className="text-xs text-cyan-accent mono mb-2">Est. Loss: {l.estimatedLoss}</p>
          <div className="space-y-1">
            {l.indicators.map((ind, j) => (
              <p key={j} className="text-xs text-slate-400">• {ind}</p>
            ))}
          </div>
          <p className="text-xs text-google-blue mt-2 font-medium">→ {l.recommendedAction}</p>
        </div>
      ))}
    </div>
  );
}

function TheftView({ result }) {
  return (
    <div className="space-y-4">
      <div className="bg-city-darker rounded-lg p-4 border border-slate-800">
        <p className="text-slate-300 text-sm">{result.summary}</p>
      </div>
      {result.theftAlerts.map((t, i) => (
        <div key={i} className="bg-slate-900/50 border border-critical-red/20 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">{t.zone}</span>
            <span className="text-critical-red font-bold mono text-sm">Anomaly: {t.anomalyScore}%</span>
          </div>
          <p className="text-xs text-warning-yellow mb-2">Suspected: {t.suspectedSource}</p>
          <div className="space-y-1">
            {t.evidence.map((e, j) => (
              <p key={j} className="text-xs text-slate-400">• {e}</p>
            ))}
          </div>
          <p className="text-xs text-google-blue mt-2 font-medium">→ {t.actionRequired}</p>
        </div>
      ))}
    </div>
  );
}

function RainwaterView({ result }) {
  return (
    <div className="space-y-4">
      <div className="bg-city-darker rounded-lg p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Citywide Potential</h4>
          <span className="text-safe-green font-bold mono">{result.citywidePotential}</span>
        </div>
        <p className="text-slate-300 text-sm">{result.summary}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {result.recommendations.map((r, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-bold">{r.zone}</span>
              <span className="text-safe-green font-bold mono text-sm">{r.harvestingScore}%</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div><span className="text-slate-500">Yield:</span> <span className="text-cyan-accent mono">{r.estimatedYield}</span></div>
              <div><span className="text-slate-500">Cost:</span> <span className="text-warning-yellow mono">{r.costEstimate}</span></div>
              <div><span className="text-slate-500">Rooftop:</span> <span className="text-slate-300 mono">{r.rooftopArea}</span></div>
              <div><span className="text-slate-500">ROI:</span> <span className="text-safe-green mono">{r.roi}</span></div>
            </div>
            <div className="space-y-1">
              {r.recommendations.slice(0, 2).map((rec, j) => (
                <p key={j} className="text-[10px] text-slate-400">• {rec}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AICommandCenter({ data }) {
  const [activeTab, setActiveTab] = useState('allocate');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});

  const tabs = [
    { id: 'allocate', label: 'Tanker Dispatch', icon: Truck },
    { id: 'predict', label: 'Crisis Prediction', icon: TrendingUp },
    { id: 'leakage', label: 'Leakage Detection', icon: Droplets },
    { id: 'theft', label: 'Theft Detection', icon: Shield },
    { id: 'rainwater', label: 'Rainwater Harvest', icon: CloudRain },
  ];

  const runAnalysis = async () => {
    setLoading(true);
    let result;
    switch (activeTab) {
      case 'allocate': result = await allocateTankers(data); break;
      case 'predict': result = await predictCrisis(data); break;
      case 'leakage': result = await detectLeakages(data); break;
      case 'theft': result = await detectTheft(data); break;
      case 'rainwater': result = await analyzeRainwater(data); break;
    }
    setResults(prev => ({ ...prev, [activeTab]: result }));
    setLoading(false);
  };

  const currentResult = results[activeTab];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrainCircuit size={18} className="text-google-blue" />
          <h2 className="text-lg font-bold uppercase tracking-[0.15em] text-slate-300">AI Command Intelligence</h2>
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden border-google-blue/20">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-google-blue via-purple-accent to-cyan-accent"></div>

        <div className="p-4 border-b border-slate-800/50 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <AITab
                key={tab.id}
                label={tab.label}
                icon={tab.icon}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="group relative px-5 py-2.5 font-bold text-white rounded-lg bg-google-blue hover:bg-google-blue-dark transition-all glow-blue disabled:opacity-60 disabled:cursor-not-allowed text-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="flex items-center gap-2 relative z-10">
              <Zap size={14} className={loading ? 'animate-pulse' : ''} />
              {loading ? 'Analyzing...' : 'Run AI Analysis'}
            </span>
          </button>
        </div>

        <div className="p-5 min-h-[200px]">
          {loading ? <LoadingState /> :
           !currentResult ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <BrainCircuit size={48} className="mb-3 opacity-30" />
              <p className="text-sm">Select an analysis module and click "Run AI Analysis" to begin</p>
            </div>
          ) :
           activeTab === 'allocate' ? <AllocationView result={currentResult} /> :
           activeTab === 'predict' ? <PredictionView result={currentResult} /> :
           activeTab === 'leakage' ? <LeakageView result={currentResult} /> :
           activeTab === 'theft' ? <TheftView result={currentResult} /> :
           <RainwaterView result={currentResult} />
          }
        </div>
      </div>
    </section>
  );
}
