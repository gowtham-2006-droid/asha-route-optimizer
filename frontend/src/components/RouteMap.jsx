import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Sparkles, MapPin, Navigation } from 'lucide-react';

export default function RouteMap({ stops, workerLocation, onExplainRisk }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize Leaflet map centered at Ramanthapur, Hyderabad
      const initialLat = workerLocation?.latitude || 17.3980;
      const initialLng = workerLocation?.longitude || 78.5400;

      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: true
      }).setView([initialLat, initialLng], 14);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    const boundsPoints = [];

    // 1. Worker Location Marker
    if (workerLocation) {
      const workerPos = [workerLocation.latitude, workerLocation.longitude];
      boundsPoints.push(workerPos);

      const workerIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="relative flex items-center justify-center w-10 h-10 bg-sky-600 rounded-full border-2 border-white shadow-xl shadow-sky-500/50">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40"></span>
            <span class="text-white text-xs font-bold">ASHA</span>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      L.marker(workerPos, { icon: workerIcon })
        .addTo(layerGroup)
        .bindPopup(`
          <div class="p-2 text-xs font-sans">
            <strong class="text-slate-900 block font-bold">ASHA Worker: Lakshmi Devi</strong>
            <span class="text-slate-500 text-[10px]">Sector: Ramanthapur Hub</span>
          </div>
        `);
    }

    // 2. Patient Route Sequence Markers
    const activeStops = stops.filter(s => s.status !== 'visited');
    const polylineCoords = [];

    if (workerLocation) {
      polylineCoords.push([workerLocation.latitude, workerLocation.longitude]);
    }

    activeStops.forEach((stop) => {
      const pos = [stop.latitude, stop.longitude];
      polylineCoords.push(pos);
      boundsPoints.push(pos);

      let colorClass = 'bg-emerald-500 shadow-emerald-500/50';
      let borderClass = 'border-emerald-400';
      if (stop.risk_band === 'Critical') {
        colorClass = 'bg-red-600 shadow-red-600/60 animate-bounce';
        borderClass = 'border-red-400';
      } else if (stop.risk_band === 'High') {
        colorClass = 'bg-amber-500 shadow-amber-500/50';
        borderClass = 'border-amber-400';
      } else if (stop.risk_band === 'Moderate') {
        colorClass = 'bg-yellow-500 shadow-yellow-500/50';
        borderClass = 'border-yellow-300';
      }

      const markerIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="relative flex items-center justify-center w-8 h-8 ${colorClass} rounded-full border-2 ${borderClass} shadow-lg text-white text-xs font-extrabold">
            ${stop.is_emergency ? '🚨' : `#${stop.sequence}`}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const popupContent = document.createElement('div');
      popupContent.className = 'p-2 text-xs font-sans space-y-1';
      popupContent.innerHTML = `
        <div class="flex items-center justify-between gap-2 border-b pb-1">
          <strong class="text-slate-900 font-bold">${stop.patient_name}</strong>
          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${
            stop.risk_band === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
          }">${stop.risk_band} (${stop.risk_score})</span>
        </div>
        <div class="text-[11px] text-slate-600">
          📍 ${stop.village}<br/>
          ⏰ ETA: <strong>${stop.estimated_arrival}</strong> (${stop.distance_km} km)
        </div>
        <div class="pt-1 flex gap-1">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${stop.latitude},${stop.longitude}" target="_blank" class="px-2 py-1 bg-sky-600 text-white rounded text-[10px] font-bold text-center block w-full">
            🗺️ Open Google Maps
          </a>
        </div>
      `;

      L.marker(pos, { icon: markerIcon })
        .addTo(layerGroup)
        .bindPopup(popupContent);
    });

    // 3. Draw Correct Route Polyline Sequence
    if (polylineCoords.length > 1) {
      L.polyline(polylineCoords, {
        color: '#0284c7', // Sky-600
        weight: 4,
        opacity: 0.8,
        dashArray: '8, 8',
        lineJoin: 'round'
      }).addTo(layerGroup);
    }

    // 4. Auto-Fit Bounds so route and markers are perfectly framed
    if (boundsPoints.length > 0) {
      map.fitBounds(boundsPoints, { padding: [40, 40], maxZoom: 16 });
    }

  }, [stops, workerLocation]);

  return (
    <div className="relative w-full h-full min-h-[450px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl glass-card">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-[11px] text-slate-300 space-y-1.5 shadow-xl">
        <span className="font-bold text-white text-xs block mb-1">Route Legend</span>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-sky-600 border border-white" />
          <span>ASHA Start Location</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-600 border border-white" />
          <span>🔴 Stop #1 Critical Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 border border-white" />
          <span>🟠 High Urgency</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white" />
          <span>🟢 Moderate / Low</span>
        </div>
      </div>
    </div>
  );
}
