import React from 'react';
import { Activity, AlertTriangle, Truck, MessageSquareWarning, Droplets, TrendingDown } from 'lucide-react';

function StatCard({ icon: Icon, label, value, sub, color, glowClass }) {
  return (
    <div className={`glass-panel rounded-xl p-4 md:p-5 ${glowClass || ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${color}/10`}>
          <Icon size={20} className={`text-${color}`} />
        </div>
        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{label}</span>
      </div>
      <p className={`text-3xl md:text-4xl font-black text-${color} mt-2 mono`}>{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}

export function ExecutiveOverview({ cityHealthScore, criticalZones, totalComplaints, tankersAvailable, data }) {
  const avgLeakage = Math.round(data.reduce((s, z) => s + z.leakageRisk, 0) / data.length);
  const healthColor = cityHealthScore > 60 ? 'safe-green' : cityHealthScore > 35 ? 'warning-yellow' : 'critical-red';

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <Activity size={18} className="text-google-blue" />
        <h2 className="text-lg font-bold uppercase tracking-[0.15em] text-slate-300">Executive Overview</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        <StatCard
          icon={Droplets}
          label="City Health"
          value={`${cityHealthScore}%`}
          sub="Avg. water level"
          color={healthColor}
          glowClass={cityHealthScore < 35 ? 'glow-red' : ''}
        />
        <StatCard
          icon={AlertTriangle}
          label="Critical Zones"
          value={criticalZones}
          sub="Need immediate action"
          color={criticalZones > 2 ? 'critical-red' : 'warning-yellow'}
          glowClass={criticalZones > 2 ? 'glow-red' : ''}
        />
        <StatCard
          icon={Truck}
          label="Tankers Ready"
          value={tankersAvailable}
          sub="Available for dispatch"
          color="google-blue"
        />
        <StatCard
          icon={MessageSquareWarning}
          label="Open Complaints"
          value={totalComplaints}
          sub="Pending resolution"
          color="warning-yellow"
        />
        <StatCard
          icon={TrendingDown}
          label="Leakage Risk"
          value={`${avgLeakage}%`}
          sub="Citywide average"
          color={avgLeakage > 50 ? 'critical-red' : 'cyan-accent'}
        />
        <StatCard
          icon={Activity}
          label="Active Zones"
          value={data.length}
          sub="Under monitoring"
          color="safe-green"
        />
      </div>

      {criticalZones > 0 && (
        <div className="glass-panel rounded-xl p-4 border-critical-red/30 glow-red flex items-center gap-3 animate-[slideUp_0.5s_ease-out]">
          <AlertTriangle className="text-critical-red animate-glow-pulse flex-shrink-0" size={20} />
          <div>
            <p className="text-critical-red font-bold text-sm">⚠ EMERGENCY ALERT</p>
            <p className="text-slate-300 text-xs mt-0.5">
              {data.filter(z => z.criticality === 'Critical').map(z => z.name).join(', ')} — Water levels critically low. Immediate tanker dispatch and reservoir activation recommended.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
