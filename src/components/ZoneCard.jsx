import React from 'react';
import { Droplets, Users, Building2, GraduationCap, Hospital, AlertTriangle, ShieldAlert, CloudRain, Truck, Clock } from 'lucide-react';

function MiniStat({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={12} className={`text-${color || 'slate-500'}`} />
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className={`text-xs font-semibold text-${color || 'slate-300'} ml-auto mono`}>{value}</span>
    </div>
  );
}

export function ZoneCard({ zone }) {
  const isCritical = zone.waterLevel < 25;
  const isWarning = zone.waterLevel < 50 && !isCritical;

  const badgeColor = zone.criticality === 'Critical'
    ? 'bg-critical-red/15 text-critical-red border-critical-red/30'
    : zone.criticality === 'High'
    ? 'bg-warning-yellow/15 text-warning-yellow border-warning-yellow/30'
    : zone.criticality === 'Medium'
    ? 'bg-cyan-accent/15 text-cyan-accent border-cyan-accent/30'
    : 'bg-safe-green/15 text-safe-green border-safe-green/30';

  const barColor = isCritical
    ? 'bg-gradient-to-r from-critical-red to-red-400'
    : isWarning
    ? 'bg-gradient-to-r from-warning-yellow to-amber-400'
    : 'bg-gradient-to-r from-google-blue to-cyan-accent';

  const timeSinceSupply = Math.round((Date.now() - new Date(zone.lastSupply).getTime()) / 3600000);

  return (
    <div className={`glass-panel glass-panel-hover rounded-xl p-5 transition-all duration-300 group ${isCritical ? 'border-critical-red/30 glow-red' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-google-blue transition-colors">
            {zone.name}
          </h3>
          <p className="text-[10px] text-slate-600 mt-0.5 mono">ID: {zone.id.toUpperCase()} • {zone.lat.toFixed(2)}°N, {zone.lng.toFixed(2)}°E</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${badgeColor}`}>
          {zone.criticality}
        </span>
      </div>

      {/* Water Level Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-slate-400 flex items-center gap-1"><Droplets size={12} /> Water Level</span>
          <span className={`font-bold mono ${isCritical ? 'text-critical-red' : 'text-white'}`}>{zone.waterLevel}%</span>
        </div>
        <div className="h-2.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor} ${isCritical ? 'shadow-[0_0_10px_rgba(239,68,68,0.6)]' : ''}`}
            style={{ width: `${zone.waterLevel}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="space-y-2 border-t border-slate-800/50 pt-3">
        <MiniStat icon={Users} label="Population" value={zone.populationDensity.toLocaleString()} />
        <MiniStat icon={Hospital} label="Hospitals" value={zone.hospitalCount} color={zone.hospitalCount > 5 ? 'warning-yellow' : 'slate-300'} />
        <MiniStat icon={GraduationCap} label="Schools" value={zone.schoolCount} />
        <MiniStat icon={Building2} label="Apartments" value={zone.apartmentDensity} />
        <MiniStat icon={Truck} label="Tanker Dep." value={`${zone.tankerDependency}%`} color={zone.tankerDependency > 50 ? 'critical-red' : 'slate-300'} />
        <MiniStat icon={ShieldAlert} label="Leakage Risk" value={`${zone.leakageRisk}%`} color={zone.leakageRisk > 50 ? 'critical-red' : zone.leakageRisk > 30 ? 'warning-yellow' : 'safe-green'} />
        <MiniStat icon={AlertTriangle} label="Theft Risk" value={`${zone.theftRisk}%`} color={zone.theftRisk > 40 ? 'warning-yellow' : 'slate-300'} />
        <MiniStat icon={CloudRain} label="Harvest Pot." value={`${zone.rainHarvestPotential}%`} color="cyan-accent" />
        <MiniStat icon={Clock} label="Last Supply" value={`${timeSinceSupply}h ago`} color={timeSinceSupply > 24 ? 'critical-red' : 'slate-300'} />
      </div>

      {/* Emergency Priority */}
      <div className="mt-3 pt-3 border-t border-slate-800/50">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Emergency Priority</span>
          <span className={`text-sm font-black mono ${zone.emergencyPriority > 60 ? 'text-critical-red' : zone.emergencyPriority > 40 ? 'text-warning-yellow' : 'text-safe-green'}`}>
            {zone.emergencyPriority}
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden mt-1">
          <div
            className={`h-full rounded-full transition-all duration-700 ${zone.emergencyPriority > 60 ? 'bg-critical-red' : zone.emergencyPriority > 40 ? 'bg-warning-yellow' : 'bg-safe-green'}`}
            style={{ width: `${zone.emergencyPriority}%` }}
          />
        </div>
      </div>
    </div>
  );
}
