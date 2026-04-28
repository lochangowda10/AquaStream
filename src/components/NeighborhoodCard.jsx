import React from 'react';
import { Droplets, Users, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function NeighborhoodCard({ data }) {
  const isCritical = data.waterLevel < 25;

  return (
    <div className={cn(
      "glass-panel rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:border-google-blue/30 group",
      isCritical ? "border-critical-red/50 shadow-critical-red/10" : ""
    )}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-google-blue transition-colors">
          {data.name}
        </h3>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase",
          data.criticality === 'Critical' ? "bg-critical-red/20 text-critical-red border border-critical-red/30" : 
          data.criticality === 'High' ? "bg-warning-yellow/20 text-warning-yellow border border-warning-yellow/30" : 
          "bg-safe-green/20 text-safe-green border border-safe-green/30"
        )}>
          {data.criticality}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1 text-slate-400">
            <span className="flex items-center gap-1"><Droplets size={14} /> Water Level</span>
            <span className={cn("font-medium", isCritical ? "text-critical-red" : "text-white")}>
              {data.waterLevel}%
            </span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-out",
                isCritical ? "bg-critical-red shadow-[0_0_10px_rgba(239,68,68,0.7)]" : "bg-google-blue"
              )}
              style={{ width: `${data.waterLevel}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 mb-1 flex items-center gap-1">
              <Users size={12} /> Population
            </span>
            <span className="text-sm font-semibold text-slate-200">
              {data.populationDensity.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
