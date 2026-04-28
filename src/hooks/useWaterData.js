import { useState, useEffect, useCallback } from 'react';

const ZONE_BASE_DATA = [
  {
    id: 'n1', name: 'Basavanagudi', lat: 12.9416, lng: 77.5712,
    waterLevel: 62, populationDensity: 12000, reservoirDependency: 72,
    dailyConsumption: 3400, hospitalCount: 4, schoolCount: 12,
    apartmentDensity: 280, tankerDependency: 35, rainHarvestPotential: 68,
  },
  {
    id: 'n2', name: 'Jayanagar', lat: 12.9299, lng: 77.5838,
    waterLevel: 78, populationDensity: 15000, reservoirDependency: 55,
    dailyConsumption: 4200, hospitalCount: 6, schoolCount: 18,
    apartmentDensity: 350, tankerDependency: 20, rainHarvestPotential: 72,
  },
  {
    id: 'n3', name: 'Koramangala', lat: 12.9352, lng: 77.6245,
    waterLevel: 22, populationDensity: 18000, reservoirDependency: 82,
    dailyConsumption: 5100, hospitalCount: 8, schoolCount: 15,
    apartmentDensity: 520, tankerDependency: 65, rainHarvestPotential: 55,
  },
  {
    id: 'n4', name: 'Indiranagar', lat: 12.9784, lng: 77.6408,
    waterLevel: 45, populationDensity: 14000, reservoirDependency: 68,
    dailyConsumption: 3800, hospitalCount: 5, schoolCount: 10,
    apartmentDensity: 410, tankerDependency: 45, rainHarvestPotential: 60,
  },
  {
    id: 'n5', name: 'Whitefield', lat: 12.9698, lng: 77.7500,
    waterLevel: 15, populationDensity: 20000, reservoirDependency: 90,
    dailyConsumption: 6200, hospitalCount: 3, schoolCount: 8,
    apartmentDensity: 680, tankerDependency: 78, rainHarvestPotential: 45,
  },
  {
    id: 'n6', name: 'Malleshwaram', lat: 13.0035, lng: 77.5647,
    waterLevel: 55, populationDensity: 11000, reservoirDependency: 48,
    dailyConsumption: 2900, hospitalCount: 7, schoolCount: 20,
    apartmentDensity: 190, tankerDependency: 25, rainHarvestPotential: 78,
  },
];

function computeDerived(zone) {
  const wl = zone.waterLevel;
  let criticality = 'Low';
  if (wl < 15) criticality = 'Critical';
  else if (wl < 25) criticality = 'High';
  else if (wl < 50) criticality = 'Medium';

  const emergencyPriority = Math.round(
    (100 - wl) * 0.35 +
    (zone.populationDensity / 200) * 0.2 +
    zone.hospitalCount * 2 +
    zone.tankerDependency * 0.15 +
    (zone.citizenComplaints || 0) * 0.3
  );

  const leakageRisk = Math.min(100, Math.round(
    (100 - wl) * 0.25 + zone.tankerDependency * 0.3 +
    (zone.citizenComplaints || 0) * 0.4 + Math.random() * 10
  ));

  const theftRisk = Math.min(100, Math.round(
    zone.apartmentDensity * 0.05 + (zone.dailyConsumption / 100) * 0.3 +
    Math.random() * 15
  ));

  const predicted7DayDemand = Math.round(zone.dailyConsumption * 7 * (1 + (100 - wl) / 200));
  const weatherImpact = Math.round(30 + Math.random() * 40);

  return {
    ...zone,
    criticality,
    emergencyPriority: Math.min(100, emergencyPriority),
    leakageRisk,
    theftRisk,
    predicted7DayDemand,
    weatherImpact,
    lastSupply: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
  };
}

function generateComplaints() {
  const types = ['No Water Supply', 'Leakage', 'Contamination', 'Illegal Usage', 'Low Pressure'];
  const zones = ZONE_BASE_DATA.map(z => z.name);
  const complaints = [];
  for (let i = 0; i < 12; i++) {
    complaints.push({
      id: `CMP-${1000 + i}`,
      zone: zones[Math.floor(Math.random() * zones.length)],
      type: types[Math.floor(Math.random() * types.length)],
      urgency: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
      status: ['Open', 'In Progress', 'Resolved'][Math.floor(Math.random() * 3)],
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 2).toISOString(),
      description: [
        'No water since 2 days in my apartment block',
        'Major pipeline leak near junction',
        'Water smells contaminated',
        'Unauthorized tanker filling observed',
        'Very low pressure, cannot reach upper floors',
        'Borewell dried up, need emergency supply',
        'Water color is yellowish',
        'Commercial complex using excess water',
        'Fire hydrant leaking for days',
        'Construction site diverting pipeline water',
        'Sewage mixing with drinking water suspected',
        'Tanker not arriving despite booking',
      ][i],
    });
  }
  return complaints;
}

function generateHistoricalData() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86400000);
    days.push({
      date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      avgLevel: Math.round(35 + Math.random() * 30),
      tankersSent: Math.round(8 + Math.random() * 10),
      complaints: Math.round(5 + Math.random() * 15),
      consumption: Math.round(22000 + Math.random() * 5000),
      leakages: Math.round(1 + Math.random() * 4),
    });
  }
  return days;
}

export function useWaterData() {
  const [data, setData] = useState(() =>
    ZONE_BASE_DATA.map(z => computeDerived({ ...z, citizenComplaints: Math.round(Math.random() * 20) }))
  );
  const [complaints, setComplaints] = useState(generateComplaints);
  const [historicalData] = useState(generateHistoricalData);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(zone => {
        let change = Math.floor(Math.random() * 8) - 5;
        let newLevel = Math.max(0, Math.min(100, zone.waterLevel + change));
        let newComplaints = Math.max(0, zone.citizenComplaints + Math.floor(Math.random() * 3) - 1);
        return computeDerived({
          ...zone,
          waterLevel: newLevel,
          citizenComplaints: newComplaints,
        });
      }));
      setLastUpdated(new Date());
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const cityHealthScore = Math.round(data.reduce((s, z) => s + z.waterLevel, 0) / data.length);
  const criticalZones = data.filter(z => z.criticality === 'Critical' || z.criticality === 'High').length;
  const totalComplaints = complaints.filter(c => c.status === 'Open').length;
  const tankersAvailable = 15;

  return {
    data,
    complaints,
    historicalData,
    lastUpdated,
    cityHealthScore,
    criticalZones,
    totalComplaints,
    tankersAvailable,
  };
}
