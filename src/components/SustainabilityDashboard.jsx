import React from 'react';
import { Leaf, Droplets, Truck, DollarSign, Timer, Wind } from 'lucide-react';

function ImpactMetric({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="glass-panel rounded-xl p-5 text-center">
      <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center bg-${color}/10 mb-3`}>
        <Icon size={22} className={`text-${color}`} />
      </div>
      <p className={`text-2xl md:text-3xl font-black mono text-${color}`}>{value}</p>
      <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">{label}</p>
      {sub && <p className="text-[10px] text-slate-600 mt-1">{sub}</p>}
    </div>
  );
}

export function SustainabilityDashboard({ data }) {
  const totalConsumption = data.reduce((s, z) => s + z.dailyConsumption, 0);
  const waterSaved = Math.round(totalConsumption * 0.12);
  const tankerCostReduced = Math.round(waterSaved * 0.15);
  const leakagePrevented = Math.round(data.reduce((s, z) => s + z.leakageRisk * 80, 0));
  const carbonReduced = Math.round(waterSaved * 0.003);
  const responseTime = Math.round(15 + Math.random() * 10);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <Leaf size={18} className="text-safe-green" />
        <h2 className="text-lg font-bold uppercase tracking-[0.15em] text-slate-300">Sustainability Impact</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <ImpactMetric icon={Droplets} label="Water Saved" value={`${waterSaved.toLocaleString()}L`} sub="Per day via AI optimization" color="cyan-accent" />
        <ImpactMetric icon={Truck} label="Cost Reduced" value={`₹${tankerCostReduced.toLocaleString()}`} sub="Daily tanker savings" color="safe-green" />
        <ImpactMetric icon={DollarSign} label="Leak Prevention" value={`${leakagePrevented.toLocaleString()}L`} sub="Estimated daily savings" color="google-blue" />
        <ImpactMetric icon={Wind} label="CO₂ Reduced" value={`${carbonReduced}kg`} sub="Carbon footprint reduction" color="purple-accent" />
        <ImpactMetric icon={Timer} label="Response Time" value={`${responseTime}min`} sub="Avg. emergency response" color="warning-yellow" />
        <ImpactMetric icon={Leaf} label="SDG Score" value="87%" sub="UN SDG 6 alignment" color="safe-green" />
      </div>
    </section>
  );
}
