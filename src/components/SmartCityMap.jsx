import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Map as MapIcon } from 'lucide-react';

export function SmartCityMap({ data }) {
  // Center map on Bengaluru
  const center = [12.9716, 77.5946];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <MapIcon size={18} className="text-google-blue" />
        <h2 className="text-lg font-bold uppercase tracking-[0.15em] text-slate-300">Live City Map</h2>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden h-[450px] relative border-slate-700/50">
        <MapContainer 
          center={center} 
          zoom={12} 
          scrollWheelZoom={false} 
          className="w-full h-full bg-city-darker"
          zoomControl={false}
        >
          {/* Free Dark Theme Tiles from CartoDB */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {data.map((zone) => {
            const isCritical = zone.waterLevel < 25;
            const color = isCritical ? '#EF4444' : zone.waterLevel < 50 ? '#F59E0B' : '#10B981';

            return (
              <CircleMarker
                key={zone.id}
                center={[zone.lat, zone.lng]}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: 0.6,
                  weight: 2
                }}
                radius={isCritical ? 14 : 10}
              >
                <Popup className="custom-popup">
                  <div className="p-1">
                    <h3 className="font-bold text-slate-800">{zone.name}</h3>
                    <p className="text-sm">Water Level: <span style={{ color, fontWeight: 'bold' }}>{zone.waterLevel}%</span></p>
                    <p className="text-xs text-slate-500 mt-1">Status: {zone.criticality}</p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Legend Overlay */}
        <div className="absolute bottom-4 right-4 z-[400] bg-city-darker/90 backdrop-blur-md border border-slate-700/50 rounded-lg p-3">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Zone Status</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-critical-red shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              <span className="text-xs text-slate-300">Critical (&lt;25%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-warning-yellow"></span>
              <span className="text-xs text-slate-300">Warning (&lt;50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-safe-green"></span>
              <span className="text-xs text-slate-300">Safe (&gt;50%)</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add some global styles for the leaflet popup to match our dark theme */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-popup .leaflet-popup-content-wrapper {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          color: #f1f5f9;
          border: 1px solid rgba(100, 116, 139, 0.3);
          border-radius: 8px;
        }
        .custom-popup .leaflet-popup-tip {
          background: rgba(15, 23, 42, 0.95);
        }
        .custom-popup h3 {
          color: #fff !important;
        }
      `}} />
    </section>
  );
}
