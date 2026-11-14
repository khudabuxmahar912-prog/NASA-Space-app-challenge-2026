
import { Header } from "./components/Header";
import { Layers, MapPin, Database, Activity, Info } from "lucide-react";

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header />

      {/* Main Dashboard Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
        {/* Left Sidebar: Controls & Layer Management (1 Column) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-semibold text-sm tracking-wide text-indigo-400 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Radar Layer Controls
            </h2>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
              L2 GCOV
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition cursor-pointer">
              <div className="font-medium text-slate-200">
                27 October 2026 Scene
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                Track 41 | Frame 14 (HH, HV)
              </div>
            </div>
            <div className="p-3 bg-slate-800/30 rounded-lg border border-slate-800 opacity-60">
              <div className="font-medium text-slate-400">
                Baseline Comparison (Planned)
              </div>
              <div className="text-xs text-slate-500 font-mono mt-1">
                Pending Colab Processing
              </div>
            </div>
          </div>

          <div className="mt-auto bg-indigo-950/30 border border-indigo-900/40 rounded-lg p-3 text-xs text-indigo-300">
            <p className="font-medium flex items-center gap-1 mb-1">
              <Info className="w-3.5 h-3.5" /> Scientific Notice
            </p>
            Surface change analytics require multi-date interferometry. Single
            observation displays verified radar backscatter.
          </div>
        </div>

        {/* Center/Right Main Area: Interactive Map & Observation Panel (3 Columns) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Map Placeholder */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center relative min-h-[400px] shadow-xl overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            <div className="z-10 text-center space-y-3 p-6 max-w-md">
              <div className="w-16 h-16 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center mx-auto text-indigo-400 shadow-inner">
                <MapPin className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Lower Indus Basin AOI Placeholder
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                MapLibre GL JS integration ready. Bounding box configured for
                Sindh corridor (Sukkur to Keti Bandar / Indus Delta).
              </p>
              <div className="inline-block bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs font-mono text-indigo-300">
                WKT: POLYGON((67.0 24.0, 69.5 24.0, ...))
              </div>
            </div>
          </div>

          {/* Bottom Observation Panel Placeholder */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-xl">
            <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-lg border border-slate-800">
              <Database className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-xs text-slate-400">Dataset Size</div>
                <div className="text-sm font-bold font-mono text-white">
                  6.40 GB (HDF5)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-lg border border-slate-800">
              <Activity className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xs text-slate-400">Data Maturity</div>
                <div className="text-sm font-bold text-emerald-400">
                  VALIDATED (Production)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-lg border border-slate-800">
              <MapPin className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-xs text-slate-400">Primary Corridor</div>
                <div className="text-sm font-bold text-white">
                  Sukkur → Indus Delta
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
