import React from 'react';
import { MessageSquareWarning, Clock, MapPin, AlertTriangle } from 'lucide-react';

export function CitizenComplaints({ complaints }) {
  const urgencyColors = {
    Critical: 'bg-critical-red/15 text-critical-red border-critical-red/30',
    High: 'bg-warning-yellow/15 text-warning-yellow border-warning-yellow/30',
    Medium: 'bg-cyan-accent/15 text-cyan-accent border-cyan-accent/30',
    Low: 'bg-safe-green/15 text-safe-green border-safe-green/30',
  };

  const statusColors = {
    Open: 'text-critical-red',
    'In Progress': 'text-warning-yellow',
    Resolved: 'text-safe-green',
  };

  const typeIcons = {
    'No Water Supply': '💧',
    'Leakage': '🔧',
    'Contamination': '⚠️',
    'Illegal Usage': '🚨',
    'Low Pressure': '📉',
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <MessageSquareWarning size={18} className="text-google-blue" />
        <h2 className="text-lg font-bold uppercase tracking-[0.15em] text-slate-300">Citizen Complaint Center</h2>
        <span className="bg-critical-red/20 text-critical-red text-[10px] font-bold px-2 py-0.5 rounded-full">
          {complaints.filter(c => c.status === 'Open').length} OPEN
        </span>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800/50">
                <th className="text-left py-3 px-4 text-slate-500 uppercase tracking-wider font-semibold">ID</th>
                <th className="text-left py-3 px-4 text-slate-500 uppercase tracking-wider font-semibold">Type</th>
                <th className="text-left py-3 px-4 text-slate-500 uppercase tracking-wider font-semibold">Zone</th>
                <th className="text-left py-3 px-4 text-slate-500 uppercase tracking-wider font-semibold">Description</th>
                <th className="text-left py-3 px-4 text-slate-500 uppercase tracking-wider font-semibold">Urgency</th>
                <th className="text-left py-3 px-4 text-slate-500 uppercase tracking-wider font-semibold">Status</th>
                <th className="text-left py-3 px-4 text-slate-500 uppercase tracking-wider font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {complaints.slice(0, 10).map((c, i) => (
                <tr key={i} className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 mono text-google-blue font-medium">{c.id}</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1.5">
                      <span>{typeIcons[c.type] || '📋'}</span>
                      <span className="text-slate-300">{c.type}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin size={10} className="text-slate-500" />
                      {c.zone}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 max-w-[250px] truncate">{c.description}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${urgencyColors[c.urgency]}`}>
                      {c.urgency}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${statusColors[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 mono">
                    {new Date(c.timestamp).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
