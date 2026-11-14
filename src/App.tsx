import React from 'react';
import { Header } from './components/Header';
import { MapPanel } from './components/MapPanel';
import { Layers, ShieldAlert, Cpu, Database, Compass } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Component */}
      <Header />

      {/* Main Content Workspace */}
      <main className="flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-[1750px] w-full mx-auto">
        
        {/* Left Sidebar: Radar Layer Controls & Metadata */}
        <aside className="lg:col-span-1 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-6 shadow-xl">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="font-semibold text-slate-200 tracking-wide">Radar Layer Controls</h2>
          </div>

          {/* Layer Controls Group */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400">Active Sensor Stream</label>
            <div className="bg-slate-950/60 border border-indigo-500/30 rounded-xl p-3.5 flex flex-col gap-1.5 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-300">L-Band GCOV (Validated)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-slate-400">NISAR L2 Geocoded Coherent Product</p>
            </div>
          </div>

          {/* Scene Metadata Card */}
          <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <Cpu className="w-4 h-4" />
              <span>ACQUISITION PARAMS</span>
            </div>
            <ul className="text-xs space-y-2 text-slate-300 font-mono">
              <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span className="text-slate-500">Date:</span>
                <span>27 October 2026</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span className="text-slate-500">Track / Frame:</span>
                <span>Track 41 | Frame 14</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span className="text-slate-500">Polarization:</span>
                <span>HH, HV (Dual-Pol)</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Processing:</span>
                <span className="text-amber-400">HDF5 / Colab Pipeline</span>
              </li>
            </ul>
          </div>

          {/* Scientific Compliance Notice */}
          <div className="mt-auto bg-slate-950/80 border border-amber-500/20 rounded-xl p-3.5 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-amber-300 block mb-0.5 font-medium">Scientific Integrity Rule</strong>
              Single-observation displays verified radar backscatter. Multi-date interferometry requires rigorous baseline comparison.
            </div>
          </div>
        </aside>

        {/* Right Workspace: Interactive Map & Dataset Info */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Interactive Map Component Container */}
          <div className="flex-1 min-h-[520px] flex flex-col">
            <MapPanel />
          </div>

          {/* Bottom Summary Cards Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3.5 shadow-lg">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-mono block">Dataset Volume</span>
                <span className="text-sm font-semibold text-slate-200">6.40 GB (HDF5 Granule)</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3.5 shadow-lg">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-mono block">Data Maturity</span>
                <span className="text-sm font-semibold text-emerald-300">VALIDATED (Production)</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3.5 shadow-lg">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-mono block">Primary Corridor</span>
                <span className="text-sm font-semibold text-slate-200">Sukkur → Indus Delta</span>
              </div>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}