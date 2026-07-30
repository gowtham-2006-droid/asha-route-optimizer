import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet marker icons default asset paths
delete L.Icon.Default.prototype._getIconUrl;

const createCustomIcon = (color, text = '') => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid #ffffff;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        font-family: sans-serif;
      ">
        ${text}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const workerIcon = L.divIcon({
  className: 'worker-leaflet-marker',
  html: `
    <div style="
      background: linear-gradient(135deg, #0284c7, #4f46e5);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 3px solid #ffffff;
      box-shadow: 0 0 14px rgba(2,132,199,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
    ">
      👩‍⚕️
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 19]
});

// Auto-center map helper
function RecenterMap({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) map.setView(center, 14);
  }, [center, map]);
  return null;
}

export default function RouteMap({ stops, workerLocation, onExplainRisk }) {
  const defaultCenter = [17.3980, 78.5420];
  const center = workerLocation ? [workerLocation.latitude, workerLocation.longitude] : defaultCenter;

  const getMarkerColor = (stop) => {
    if (stop.is_emergency) return '#dc2626'; // Bright Red
    switch (stop.risk_band?.toLowerCase()) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'moderate': return '#eab308';
      case 'low': default: return '#22c55e';
    }
  };

  // Generate polyline positions
  const polylinePositions = [
    [center[0], center[1]],
    ...stops.map(s => [s.latitude, s.longitude])
  ];

  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-slate-800 relative shadow-xl">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-full z-10 bg-slate-950"
      >
        <RecenterMap center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Route Polyline */}
        <Polyline
          positions={polylinePositions}
          pathOptions={{
            color: '#38bdf8',
            weight: 4,
            dashArray: '8, 8',
            opacity: 0.85
          }}
        />

        {/* Worker Position */}
        {workerLocation && (
          <Marker position={[workerLocation.latitude, workerLocation.longitude]} icon={workerIcon}>
            <Popup className="custom-popup">
              <div className="p-1 font-sans">
                <p className="font-bold text-slate-900">ASHA Worker: Lakshmi Devi</p>
                <p className="text-xs text-slate-600">Current GPS Position</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Patient Stop Markers */}
        {stops.map((stop) => (
          <Marker
            key={stop.stop_id || stop.patient_id}
            position={[stop.latitude, stop.longitude]}
            icon={createCustomIcon(getMarkerColor(stop), stop.is_emergency ? '🚨' : stop.sequence)}
          >
            <Popup className="custom-popup">
              <div className="p-2 font-sans max-w-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-slate-900 text-sm">{stop.patient_name}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${
                    stop.is_emergency ? 'bg-red-600' : 'bg-sky-600'
                  }`}>
                    {stop.is_emergency ? 'EMERGENCY' : `Stop #${stop.sequence}`}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-1">{stop.village}</p>
                <div className="flex items-center justify-between text-xs text-slate-700 bg-slate-100 p-1.5 rounded mb-2">
                  <span>Risk Score: <strong>{stop.risk_score}/100</strong> ({stop.risk_band})</span>
                  <span>ETA: <strong>{stop.estimated_arrival}</strong></span>
                </div>
                <button
                  onClick={() => onExplainRisk(stop.patient_id)}
                  className="w-full text-center py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold"
                >
                  AI Risk Explanation ✨
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
