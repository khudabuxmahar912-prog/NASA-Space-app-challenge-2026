import React, { useEffect, useRef, useState } from 'react';

export const MapPanel: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    try {
      const maplibregl = (window as any).maplibregl;
      if (!maplibregl) {
        setError('MapLibre script failed to load.');
        return;
      }

      // Initialize MapLibre GL JS with highly stable OpenStreetMap raster tiles
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: [
                'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
          },
          layers: [
            {
              id: 'osm-layer',
              type: 'raster',
              source: 'osm-tiles',
              minzoom: 0,
              maxzoom: 19
            }
          ]
        },
        center: [68.25, 25.8], // Centered over Sindh / Lower Indus Basin corridor
        zoom: 6.2,
        pitch: 15,
      });

      // Add navigation controls (zoom, rotation)
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        setMapLoaded(true);
      });

      map.current.on('error', (e: any) => {
        console.error('MapLibre error:', e);
        setError('Failed to load map tiles.');
      });
    } catch (err) {
      console.error('Initialization error:', err);
      setError('Error initializing interactive map.');
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[480px] rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 flex flex-col">
      {/* Map Loading / Error Status Overlay */}
      {!mapLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-10 font-mono text-xs text-indigo-400 animate-pulse">
          INITIALIZING GLOBAL MAP ENGINE...
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-10 font-mono text-xs text-rose-400">
          {error}
        </div>
      )}

      {/* Map Container Element */}
      <div ref={mapContainer} className="w-full h-full flex-1 min-h-[480px]" />

      {/* Floating Status & Coordinates Badge */}
      <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 pointer-events-none shadow-lg flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>AOI: Lower Indus Basin (Global Map View)</span>
      </div>
    </div>
  );
};