import React from 'react';
import { useWaterData } from '../hooks/useWaterData';
import { Header } from './Header';
import { ExecutiveOverview } from './ExecutiveOverview';
import { ZoneCard } from './ZoneCard';
import { AICommandCenter } from './AICommandCenter';
import { ForecastAnalytics } from './ForecastAnalytics';
import { CitizenComplaints } from './CitizenComplaints';
import { SustainabilityDashboard } from './SustainabilityDashboard';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { SmartCityMap } from './SmartCityMap';
import { MapPin, Activity } from 'lucide-react';

export function Dashboard() {
  const {
    data, complaints, historicalData, lastUpdated,
    cityHealthScore, criticalZones, totalComplaints, tankersAvailable
  } = useWaterData();

  return (
    <div className="min-h-screen">
      <Header lastUpdated={lastUpdated} />

      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 space-y-8">

        {/* Executive Overview */}
        <ExecutiveOverview
          cityHealthScore={cityHealthScore}
          criticalZones={criticalZones}
          totalComplaints={totalComplaints}
          tankersAvailable={tankersAvailable}
          data={data}
        />

        {/* Smart City Live Map */}
        <SmartCityMap data={data} />

        {/* Zone Monitoring */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-google-blue" />
            <h2 className="text-lg font-bold uppercase tracking-[0.15em] text-slate-300">Live Zone Monitoring</h2>
            <span className="flex items-center gap-1.5 text-[10px] text-safe-green font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-safe-green animate-pulse"></span>
              REAL-TIME
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map(zone => <ZoneCard key={zone.id} zone={zone} />)}
          </div>
        </section>

        {/* AI Command Intelligence */}
        <AICommandCenter data={data} complaints={complaints} />

        {/* Forecast & Analytics */}
        <ForecastAnalytics historicalData={historicalData} data={data} />

        {/* Citizen Complaint Center */}
        <CitizenComplaints complaints={complaints} />

        {/* Sustainability Impact */}
        <SustainabilityDashboard data={data} />

        {/* Architecture Diagram */}
        <ArchitectureDiagram />

        {/* Footer */}
        <footer className="border-t border-slate-800/50 pt-6 pb-8 text-center">
          <p className="text-gradient-blue font-bold text-lg">AquaStream AI</p>
          <p className="text-xs text-slate-600 mt-1">
            AI-Powered Urban Water Crisis Prevention & Smart Resource Allocation Platform
          </p>
          <p className="text-[10px] text-slate-700 mt-2">
            Bengaluru Smart Cities Mission • Powered by Google Gemini AI • Built for Google Solution Challenge 2026
          </p>
        </footer>

      </main>
    </div>
  );
}
