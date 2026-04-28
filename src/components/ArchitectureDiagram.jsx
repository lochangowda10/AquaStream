import React from 'react';
import { Network } from 'lucide-react';

export function ArchitectureDiagram() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <Network size={18} className="text-google-blue" />
        <h2 className="text-lg font-bold uppercase tracking-[0.15em] text-slate-300">System Architecture</h2>
      </div>

      <div className="glass-panel rounded-xl p-6 md:p-8 overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Architecture Flow */}
          <div className="flex items-start justify-between gap-3">
            {[
              { label: 'Citizens & Officers', sub: 'Web / Mobile', color: 'google-blue', emoji: '👥' },
              { label: 'React Dashboard', sub: 'Tailwind + Recharts', color: 'cyan-accent', emoji: '🖥️' },
              { label: 'Firebase', sub: 'Auth + Firestore + Hosting', color: 'warning-yellow', emoji: '🔥' },
              { label: 'Gemini AI', sub: 'Prediction + Allocation', color: 'purple-accent', emoji: '🧠' },
              { label: 'Cloud Functions', sub: 'Serverless Backend', color: 'safe-green', emoji: '⚡' },
              { label: 'BigQuery', sub: 'Analytics Engine', color: 'pink-accent', emoji: '📊' },
              { label: 'Google Maps', sub: 'Geo Visualization', color: 'critical-red', emoji: '🗺️' },
              { label: 'Action Center', sub: 'Government Response', color: 'google-blue', emoji: '🏛️' },
            ].map((node, i) => (
              <div key={i} className="flex items-center gap-2 flex-1 min-w-0">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-14 h-14 rounded-xl bg-${node.color}/10 border border-${node.color}/30 flex items-center justify-center text-2xl shadow-lg`}>
                    {node.emoji}
                  </div>
                  <p className={`text-[10px] font-bold text-${node.color} mt-2 text-center leading-tight`}>{node.label}</p>
                  <p className="text-[8px] text-slate-600 text-center">{node.sub}</p>
                </div>
                {i < 7 && (
                  <div className="flex-1 flex items-center min-w-[20px]">
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-700 to-slate-600"></div>
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-slate-600"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tech Stack Tags */}
          <div className="mt-8 pt-6 border-t border-slate-800/50">
            <h4 className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-3">Technology Stack</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'React 18', 'Tailwind CSS', 'Vite', 'Gemini 1.5 Flash', 'Firebase Firestore',
                'Firebase Auth', 'Firebase Hosting', 'Cloud Functions', 'BigQuery',
                'Google Maps API', 'Cloud Monitoring', 'Cloud Scheduler', 'Cloud Run',
                'Recharts', 'Lucide React', 'Node.js', 'Docker', 'Nginx',
              ].map((tech, i) => (
                <span key={i} className="text-[10px] bg-slate-800/80 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700/50 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
