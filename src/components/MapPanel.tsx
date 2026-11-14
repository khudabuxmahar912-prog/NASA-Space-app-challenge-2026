import React, { useEffect, useRef, useState } from 'react';
import { Layers, Sliders, Eye, EyeOff, AlertCircle } from 'lucide-react';

type LayerKey = 'hhhh' | 'hvhv' | 'ratio' | 'ratiodb';

interface LayerConfig {
  id: LayerKey;
  name: string;
  description: string;
  url: string;
}

const TILE_BASE =
  'https://apbfchultmtjqzdbncsq.supabase.co/storage/v1/object/public/induspulse-tiles/tiles';

const RASTER_LAYERS: LayerConfig[] = [
  {
    id: 'hhhh',
    name: 'HHHH Backscatter',
    description: 'Horizontal-Transmit, Horizontal-Receive polarization.',
    url: `${TILE_BASE}/HHHH/{z}/{x}/{y}.png`
  },
  {
    id: 'hvhv',
    name: 'HVHV Backscatter',
    description: 'Cross-polarization, often more sensitive to vegetation and volume scattering.',
    url: `${TILE_BASE}/HVHV/{z}/{x}/{y}.png`
  },
  {
    id: 'ratio',
    name: 'Polarization Ratio',
    description: 'Derived ratio between the two polarization channels.',
    url: `${TILE_BASE}/polarization-ratio/{z}/{x}/{y}.png`
  },
  {
    id: 'ratiodb',
    name: 'Polarization Ratio (dB)',
    description: 'The same ratio on a decibel scale for easier contrast comparison.',
    url: `${TILE_BASE}/polarization-ratio-db/{z}/{x}/{y}.png`
  }
];

export const MapPanel: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tileError, setTileError] = useState<boolean>(false);

  const [activeLayer, setActiveLayer] = useState<LayerKey>('hhhh');
  const [opacity, setOpacity] = useState<number>(85);
  const [isLayerVisible, setIsLayerVisible] = useState<boolean>(true);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    try {
      const maplibregl = (window as any).maplibregl;
      if (!maplibregl) {
        setError('MapLibre script failed to load.');
        return;
      }

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'base-tiles': {
              type: 'raster',
              tiles: ['https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
            }
          },
          layers: [
            {
              id: 'base-layer',
              type: 'raster',
              source: 'base-tiles',
              minzoom: 0,
              maxzoom: 19
            }
          ]
        },
        center: [68.25, 25.8],
        zoom: 10,
        minZoom: 8,
        maxZoom: 14,
        pitch: 0
      });

      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        setMapLoaded(true);
        addOrUpdateRasterLayer('hhhh');
      });

      map.current.on('error', (e: any) => {
        const status = e?.error?.status;
        if (e?.sourceId === 'nisar-raster-source' && status !== 404) {
          setTileError(true);
        }
        console.warn('MapLibre:', e?.error?.message ?? e);
      });
    } catch (err) {
      console.error('Initialization error:', err);
      setError('Error initializing interactive map.');
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addOrUpdateRasterLayer = (layerKey: LayerKey) => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    const cfg = RASTER_LAYERS.find((l) => l.id === layerKey);
    if (!cfg) return;

    setTileError(false);

    const sourceId = 'nisar-raster-source';
    const layerId = 'nisar-raster-layer';

    if (map.current.getLayer(layerId)) map.current.removeLayer(layerId);
    if (map.current.getSource(sourceId)) map.current.removeSource(sourceId);

    map.current.addSource(sourceId, {
      type: 'raster',
      tiles: [cfg.url],
      tileSize: 256,
      minzoom: 10,
      maxzoom: 12,
      attribution: 'NASA-ISRO NISAR L2 GCOV (processed by Orbital Intelligence)'
    });

    map.current.addLayer({
      id: layerId,
      type: 'raster',
      source: sourceId,
      paint: {
        'raster-opacity': isLayerVisible ? opacity / 100 : 0
      }
    });
  };

  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    addOrUpdateRasterLayer(activeLayer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLayer, mapLoaded]);

  useEffect(() => {
    if (!map.current || !map.current.getLayer('nisar-raster-layer')) return;
    map.current.setPaintProperty(
      'nisar-raster-layer',
      'raster-opacity',
      isLayerVisible ? opacity / 100 : 0
    );
  }, [opacity, isLayerVisible]);

  return (
    <div className="relative w-full h-full min-h-[540px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 flex flex-col">
      {!mapLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-20 font-mono text-xs text-indigo-400 animate-pulse">
          INITIALIZING NISAR MAPLIBRE ENGINE...
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-20 font-mono text-xs text-rose-400">
          {error}
        </div>
      )}

      {tileError && (
        <div className="absolute top-4 right-16 z-10 bg-amber-900/90 border border-amber-700 text-amber-100 text-xs font-mono px-3 py-2 rounded-lg">
          Some raster tiles are unavailable here.
        </div>
      )}

      <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-4 shadow-xl w-72 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
            <Layers className="w-4 h-4" />
            <span className="font-semibold uppercase">Raster Layers</span>
          </div>
          <button
            onClick={() => setIsLayerVisible(!isLayerVisible)}
            className="text-slate-400 hover:text-white transition-colors"
            title={isLayerVisible ? 'Hide Layer' : 'Show Layer'}
          >
            {isLayerVisible ? (
              <Eye className="w-4 h-4 text-emerald-400" />
            ) : (
              <EyeOff className="w-4 h-4 text-rose-400" />
            )}
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          {RASTER_LAYERS.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                activeLayer === layer.id
                  ? 'bg-indigo-600/30 border border-indigo-500/50 text-indigo-200 shadow-inner'
                  : 'bg-slate-950/50 border border-slate-800/60 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <span>{layer.name}</span>
              {activeLayer === layer.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-800">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" /> Opacity
            </span>
            <span className="text-indigo-300">{opacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      <div ref={mapContainer} className="w-full h-full flex-1 min-h-[540px]" />

      <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-slate-300 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pointer-events-none z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="font-mono text-indigo-300">
            {RASTER_LAYERS.find((l) => l.id === activeLayer)?.name}:
          </span>
          <span className="text-slate-400 truncate">
            {RASTER_LAYERS.find((l) => l.id === activeLayer)?.description}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-mono shrink-0">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Display stretch (P2-P98), not measurements</span>
        </div>
      </div>
    </div>
  );
};