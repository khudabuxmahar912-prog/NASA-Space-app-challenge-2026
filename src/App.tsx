import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { MapPanel } from './components/MapPanel';
import { Layers, ShieldAlert, Cpu, Database, Compass } from 'lucide-react';

const METADATA_URL =
  'https://apbfchultmtjqzdbncsq.supabase.co/storage/v1/object/public/induspulse-tiles/tiles/INDUSPULSE_Tiles_Metadata.json';

const NA = 'Not provided in metadata';

type Meta = {
  target_granule?: string;
  crs_web?: string;
  layers?: Record<string, unknown>;
  [key: string]: unknown;
};

const show = (v: unknown): string =>
  v === undefined || v === null || v === '' ? NA : String(v);

export default function App() {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [metaError, setMetaError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(METADATA_URL, { signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Meta) => setMeta(data))
      .catch((e: Error) => {
        if (e.name !== 'AbortError') setMetaError(e.message);
      });
    return () => ctrl.abort();
  }, []);

  const acquisition =
    meta?.acquisition_date !== undefined
      ? show(meta.acquisition_date)
      : meta?.acquisition_start !== undefined
        ? `${show(meta.acquisition_start)} to ${show(meta.acquisition_end)}`
        : NA;

  const trackFrame =
    meta?.track !== undefined || meta?.frame !== undefined
      ? `Track ${show(meta?.track)} | Frame ${show(meta?.frame)}`
      : NA;

  const layerNames = meta?.layers ? Object.keys(meta.layers).join(', ') : NA;

  const rows: [string, string][] = [
    ['Granule ID:', show(meta?.granule_id)],
    ['Acquired:', acquisition],
    ['Orbit:', show(meta?.orbit_direction)],
    ['Track / Frame:', trackFrame],
    ['Layers:', layerNames],
    ['Web CRS:', show(meta?.crs_web)],
    ['Pixel spacing:', show(meta?.pixel_spacing)]
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Header />

      <main className="flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-[1750px] w-full mx-auto">
        <aside className="lg:col-span-1 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-6 shadow-xl">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="font-semibold text-slate-200 tracking-wide">Radar Layer Controls</h2>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Data Source
            </label>
            <div className="bg-slate-950/60 border border-indigo-500/30 rounded-xl p-3.5 flex flex-col gap-1.5 shadow-inner">
              <span className="text-sm font-medium text-indigo-300">NASA-ISRO NISAR L2 GCOV</span>
              <p className="text-xs text-slate-400">Geocoded Polarimetric Covariance</p>
              <p className="text-xs text-slate-500">Target: {show(meta?.target_granule)}</p>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <Cpu className="w-4 h-4" />
              <span>DATA INFORMATION</span>
            </div>
            {metaError && (
              <p className="text-xs text-amber-300 font-mono">
                Metadata could not be loaded ({metaError}).
              </p>
            )}
            {!meta && !metaError && (
              <p className="text-xs text-slate-500 font-mono">Loading metadata...</p>
            )}
            <ul className="text-xs space-y-2 text-slate-300 font-mono">
              {rows.map(([label, value], i) => (
                <li
                  key={label}
                  className={`flex justify-between gap-3 ${
                    i < rows.length - 1 ? 'border-b border-slate-800/60 pb-1.5' : ''
                  }`}
                >
                  <span className="text-slate-500 shrink-0">{label}</span>
                  <span className={`text-right break-words ${value === NA ? 'italic text-slate-500' : ''}`}>
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto bg-slate-950/80 border border-amber-500/20 rounded-xl p-3.5 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-amber-300 block mb-0.5 font-medium">Scientific Integrity Rule</strong>
              This is a single NISAR acquisition, so no temporal change is shown. Layer colours are a
              display stretch, not original measurements. Dark or bright areas are not confirmed water
              or settlements.
            </div>
          </div>
        </aside>

        <section className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex-1 min-h-[520px] flex flex-col">
            <MapPanel />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3.5 shadow-lg">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-mono block">Product</span>
                <span className="text-sm font-semibold text-slate-200">NISAR L2 GCOV</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3.5 shadow-lg">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-mono block">Data Maturity</span>
                <span className="text-sm font-semibold text-slate-300">{show(meta?.data_maturity)}</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3.5 shadow-lg">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-mono block">Study Area</span>
                <span className="text-sm font-semibold text-slate-200">Lower Indus Basin, Sindh</span>
                <span className="text-[11px] text-slate-500 block">
                  Map covers only the part inside the NISAR scene
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}