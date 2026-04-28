import { useState, useEffect } from 'react';

const INITIAL_NEIGHBORHOODS = [
  { id: 'n1', name: 'Basavanagudi', waterLevel: 65, populationDensity: 12000, criticality: 'Medium' },
  { id: 'n2', name: 'Jayanagar', waterLevel: 80, populationDensity: 15000, criticality: 'Low' },
  { id: 'n3', name: 'Koramangala', waterLevel: 22, populationDensity: 18000, criticality: 'High' },
  { id: 'n4', name: 'Indiranagar', waterLevel: 45, populationDensity: 14000, criticality: 'Medium' },
  { id: 'n5', name: 'Whitefield', waterLevel: 15, populationDensity: 20000, criticality: 'Critical' },
  { id: 'n6', name: 'Malleshwaram', waterLevel: 55, populationDensity: 11000, criticality: 'Low' },
];

export function useWaterData() {
  const [data, setData] = useState(INITIAL_NEIGHBORHOODS);

  useEffect(() => {
    // Simulate live data feed changing every 5 seconds
    const interval = setInterval(() => {
      setData(prevData => prevData.map(zone => {
        // Randomly fluctuate water level by -5 to +2
        let change = Math.floor(Math.random() * 8) - 5;
        let newLevel = Math.max(0, Math.min(100, zone.waterLevel + change));
        
        // Recalculate criticality
        let newCriticality = 'Low';
        if (newLevel < 20) newCriticality = 'Critical';
        else if (newLevel < 40) newCriticality = 'High';
        else if (newLevel < 60) newCriticality = 'Medium';

        return {
          ...zone,
          waterLevel: newLevel,
          criticality: newCriticality
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { data };
}
