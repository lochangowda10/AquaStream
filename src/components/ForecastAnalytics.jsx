import React from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-city-dark/95 backdrop-blur-md border border-slate-700/50 rounded-lg p-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-1 font-semibold">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>
          {p.name}: <span className="font-bold mono">{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

export function ForecastAnalytics({ historicalData, data }) {
  const zoneComparison = data.map(z => ({
    name: z.name.substring(0, 6),
    waterLevel: z.waterLevel,
    leakageRisk: z.leakageRisk,
    theftRisk: z.theftRisk,
    emergencyPriority: z.emergencyPriority,
  }));

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <BarChart3 size={18} className="text-google-blue" />
        <h2 className="text-lg font-bold uppercase tracking-[0.15em] text-slate-300">Forecast & Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Water Level Trends */}
        <div className="glass-panel rounded-xl p-5">
          <h3 className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">7-Day Water Level Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={historicalData}>
              <defs>
                <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4285F4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4285F4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="avgLevel" name="Avg Level %" stroke="#4285F4" fillOpacity={1} fill="url(#colorLevel)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Tanker Deployment */}
        <div className="glass-panel rounded-xl p-5">
          <h3 className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">Tanker Deployment & Complaints</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
              <Bar dataKey="tankersSent" name="Tankers" fill="#4285F4" radius={[3, 3, 0, 0]} />
              <Bar dataKey="complaints" name="Complaints" fill="#F59E0B" radius={[3, 3, 0, 0]} />
              <Bar dataKey="leakages" name="Leakages" fill="#EF4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Zone Risk Comparison */}
        <div className="glass-panel rounded-xl p-5">
          <h3 className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">Zone-wise Risk Profile</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={zoneComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} width={50} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
              <Bar dataKey="waterLevel" name="Water %" fill="#06B6D4" radius={[0, 3, 3, 0]} barSize={6} />
              <Bar dataKey="leakageRisk" name="Leak Risk" fill="#EF4444" radius={[0, 3, 3, 0]} barSize={6} />
              <Bar dataKey="theftRisk" name="Theft Risk" fill="#F59E0B" radius={[0, 3, 3, 0]} barSize={6} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Consumption Trend */}
        <div className="glass-panel rounded-xl p-5">
          <h3 className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">Daily Consumption (KL)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="consumption" name="Consumption (L)" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
