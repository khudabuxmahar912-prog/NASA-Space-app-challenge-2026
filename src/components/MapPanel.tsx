import React, { useEffect, useRef, useState } from 'react';

interface TileOverlay {
  id: string;
  url: string;
  coordinates: number[][];
}

interface MapPanelProps {
  activeLayer: string;
  opacity: number;
}

export const MapPanel: React.FC<MapPanelProps> = ({ activeLayer, opacity }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  const getTileOverlays = (layer: string): TileOverlay[] => [
    {
      id: `tile-3`,
      url: `https://apbfchultmtjqzdbncsq.supabase.co/storage/v1/object/public/induspulse-tiles/tiles/${layer}/10/3/3.png`,
      coordinates: [[67.30, 26.20], [67.70, 26.20], [67.70, 25.80], [67.30, 25.80]]
    },
    {
      id: `tile-4`,
      url: `https://apbfchultmtjqzdbncsq.supabase.co/storage/v1/object/public/induspulse-tiles/tiles/${layer}/10/3/4.png`,
      coordinates: [[67.70, 26.20], [68.10, 26.20], [68.10, 25.80], [67.70, 25.80]]
    },
    {
      id: `tile-5`,
      url: `https://apbfchultmtjqzdbncsq.supabase.co/storage/v1/object/public/induspulse-tiles/tiles/${layer}/10/3/5.png`,
      coordinates: [[68.10, 26.20], [68.50, 26.20], [68.50, 25.80], [68.10, 25.80]]
    }
  ];

  useEffect(() => {
    if (mapInstance.current || !mapContainer.current) return;

    try {
      const maplibregl = (window as any).maplibregl;
      if (!maplibregl) return;

      const currentTiles = getTileOverlays(activeLayer);

      const sources: Record<string, any> = {
        'osm-tiles': {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
        }
      };

      const layers: any[] = [
        {
          id: 'osm-layer',
          type: 'raster',
          source: 'osm-tiles',
          minzoom: 0,
          maxzoom: 19
        }
      ];

      currentTiles.forEach((tile) => {
        sources[tile.id] = {
          type: 'image',
          url: tile.url,
          coordinates: tile.coordinates
        };
        layers.push({
          id: `${tile.id}-layer`,
          type: 'raster',
          source: tile.id,
          paint: {
            'raster-opacity': opacity,
            'raster-fade-duration': 0
          }
        });
      });

      mapInstance.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources,
          layers
        },
        center: [67.78, 25.95],
        zoom: 10,
      });

      mapInstance.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      mapInstance.current.on('load', () => {
        setMapLoaded(true);
      });

    } catch (err) {
      console.error('Map initialization error:', err);
    }

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !mapLoaded) return;

    const tiles = getTileOverlays(activeLayer);
    tiles.forEach((tile) => {
      const source = mapInstance.current.getSource(tile.id);
      if (source) {
        source.updateImage({ url: tile.url });
      }
    });

    tiles.forEach((tile) => {
      if (mapInstance.current.getLayer(`${tile.id}-layer`)) {
        mapInstance.current.setPaintProperty(`${tile.id}-layer`, 'raster-opacity', opacity);
      }
    });
  }, [activeLayer, opacity, mapLoaded]);

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col shadow-2xl">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 z-30 font-mono text-xs text-indigo-400 animate-pulse">
          INITIALIZING MAPLIBRE GL GEOSPATIAL ENGINE...
        </div>
      )}

      <div className="absolute top-3 right-16 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-200 shadow-lg flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
        Lower Indus Basin (AOI)
      </div>

      <div ref={mapContainer} className="w-full h-full absolute inset-0" />

      <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 z-20 flex flex-col gap-1 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-24 h-1 bg-slate-300 rounded-full" />
        </div>
        <span className="text-[10px] text-slate-400">50 km</span>
      </div>

      <div className="absolute bottom-4 right-4 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-2xl text-[11px] font-mono text-slate-300 z-20 shadow-xl flex flex-col gap-1.5">
        <span className="text-slate-100 font-bold uppercase tracking-wider">HHHH Backscatter (dB)</span>
        <div className="flex items-center gap-2">
          <span className="w-48 h-3 bg-gradient-to-r from-blue-600 via-emerald-400 via-yellow-400 to-red-600 rounded-md border border-slate-600" />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 px-0.5">
          <span>-25</span>
          <span>-15</span>
          <span>-5</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
};