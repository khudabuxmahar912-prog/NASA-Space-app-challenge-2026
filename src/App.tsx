import React, { useState } from 'react';
import { Header } from './components/Header';
import { MapPanel } from './components/MapPanel';
import { Layers, ShieldAlert, Database, Cpu, ExternalLink, CheckCircle2, ChevronRight, Info, BookOpen, X, Satellite } from 'lucide-react';

export default function App() {
  const [activeLayer, setActiveLayer] = useState<string>('polarization-ratio-db');
  const [opacity, setOpacity] = useState<number>(0.88);
  const [activeTab, setActiveTab] = useState<string>('explorer');
  const [modalType, setModalType] = useState<'none' | 'about' | 'methodology' | 'learnMore'>('none');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      
      {/* Global Background Watermark - Fixed Position behind everything */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30 overflow-hidden">
        <img 
          src="/watermark.png.jpeg" 
          alt="NASA Earth Watermark" 
          className="w-[95%] max-w-[1600px] object-contain filter contrast-150 brightness-110"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* STICKY TOP BAR (Yeh scroll karne par upar hi fixed rahega) */}
      <div className="sticky top-0 z-50 flex flex-col w-full bg-slate-950/95 border-b border-slate-800 shadow-xl">
          <Header 
            activeTab={activeTab} 
            onTabStatusChange={(tab: string) => setActiveTab(tab)} 
            onOpenModal={(modal: 'about' | 'methodology' | 'learnMore') => setModalType(modal)} 
          />

          {/* Top Metadata Stats Bar */}
          <div className="px-6 py-3 bg-slate-900/90 border-t border-slate-800 backdrop-blur-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
            <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl flex flex-col gap-1 shadow-inner">
              <span className="text-[10px] uppercase text-slate-400 font-semibold">Acquisition ID</span>
              <span className="text-indigo-300 truncate">NISAR_L2_PR_GCOV_034_092...</span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl flex flex-col gap-1 shadow-inner">
              <span className="text-[10px] uppercase text-slate-400 font-semibold">Acquisition Date (UTC)</span>
              <span className="text-slate-200">30 Oct 2026 • 14:14:14</span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl flex flex-col gap-1 shadow-inner">
              <span className="text-[10px] uppercase text-slate-400 font-semibold">Radar Layers</span>
              <span className="text-emerald-400 font-medium">4 Available[span_0](start_span)[span_0](end_span)</span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl flex flex-col gap-1 shadow-inner">
              <span className="text-[10px] uppercase text-slate-400 font-semibold">Instrument</span>
              <span className="text-amber-300">L-Band (NISAR)</span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl flex flex-col gap-1 shadow-inner">
              <span className="text-[10px] uppercase text-slate-400 font-semibold">AOI Bounds</span>
              <span className="text-slate-300 text-[10px]">67.4999°E - 68.0662°E</span>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-xl flex items-center justify-between shadow-inner">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase text-emerald-400 font-semibold">System Online</span>
                <span className="text-[10px] text-emerald-300/80">Live Data Access</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>
        </div>

        {/* SCROLLABLE MAIN DASHBOARD CONTENT (Sirf yeh hissa scroll hoga) */}
        <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-[1850px] w-full mx-auto">
          
          {/* Left Sidebar: Radar Layer Controls & Opacity */}
          <aside className="lg:col-span-1 bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-5 shadow-xl h-fit">
            
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <Layers className="w-5 h-5 text-indigo-400" />
              <h2 className="font-bold text-slate-200 tracking-wide text-sm">Radar Layer Controls</h2>
            </div>

            {/* 4 Layer Selector Cards */}
            <div className="flex flex-col gap-2.5">
              {[
                { id: 'HHHH', label: 'HHHH', desc: 'HH Co-Polarization' },
                { id: 'HVHV', label: 'HVHV', desc: 'HV Cross-Polarization' },
                { id: 'polarization-ratio', label: 'Polarization Ratio', desc: 'HHHH / HVHV' },
                { id: 'polarization-ratio-db', label: 'Polarization Ratio (dB)', desc: '10 × log₁₀(PR)' }
              ].map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    activeLayer === layer.id
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs font-bold font-mono ${activeLayer === layer.id ? 'text-indigo-300' : 'text-slate-200'}`}>
                      {layer.label}
                    </span>
                    <span className="text-[11px] text-slate-400">{layer.desc}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${activeLayer === layer.id ? 'border-indigo-400 bg-indigo-500' : 'border-slate-600'}`}>
                    {activeLayer === layer.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Opacity Control Slider */}
            <div className="flex flex-col gap-2 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>Opacity Control</span>
                <span className="text-indigo-400 font-bold">{Math.round(opacity * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Map Information */}
            <div className="flex flex-col gap-2 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">Map Information</span>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>Coordinates: 67.7321° E, 25.7436° N</div>
                <div>Zoom Level: 10.8</div>
              </div>
            </div>

            {/* Data Source Badge */}
            <div className="bg-emerald-950/20 border border-emerald-500/30 p-3.5 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-emerald-300">Data Source</span>
                <span className="text-[11px] text-slate-400">Supabase Storage (induspulse-tiles)[span_1](start_span)[span_1](end_span)</span>
              </div>
            </div>

            {/* View Data Lineage Button */}
            <button 
              onClick={() => setModalType('methodology')}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Data Lineage</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </aside>

          {/* Right Main Area: Map & Side Info Panels */}
          <section className="lg:col-span-3 flex flex-col gap-6">
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Map Panel (takes 2 columns) */}
              <div className="xl:col-span-2 flex flex-col">
                <MapPanel activeLayer={activeLayer} opacity={opacity} />
              </div>

              {/* Right Sidebar Cards */}
              <div className="xl:col-span-1 flex flex-col gap-4">
                
                {/* About INDUSPULSE Card */}
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
                      <Info className="w-4 h-4" />
                      About INDUSPULSE
                    </div>
                    <span className="text-xs font-bold text-red-500">NASA</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    INDUSPULSE is a NASA Space Apps project that explores real NISAR radar observations over the Lower Indus Basin using advanced polarimetric analysis[span_2](start_span)[span_2](end_span).
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                    <div><strong>Mission:</strong> NISAR (NASA-ISRO)</div>
                    <div><strong>Product:</strong> L2 GCOV</div>
                    <div><strong>Band:</strong> L-Band</div>
                  </div>
                  <button 
                    onClick={() => setModalType('learnMore')}
                    className="mt-1 py-2 px-3 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 text-xs font-medium hover:bg-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Scientific Insights */}
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                    <Cpu className="w-4 h-4" />
                    Scientific Insights
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    HHHH layer shows stronger backscatter in urban and agricultural regions, while HVHV highlights surface roughness and volume scattering.
                  </p>
                </div>

                {/* Limitations Card */}
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
                    <ShieldAlert className="w-4 h-4" />
                    Limitations
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-slate-300 space-y-1">
                    <li>Single acquisition (no time series)[span_3](start_span)[span_3](end_span)</li>
                    <li>Requires independent validation[span_4](start_span)[span_4](end_span)</li>
                    <li>Interpretations are exploratory[span_5](start_span)[span_5](end_span)</li>
                  </ul>
                  <div 
                    onClick={() => setModalType('learnMore')}
                    className="text-[10px] text-indigo-400 font-medium cursor-pointer hover:underline text-right"
                  >
                    Full Details →
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pipeline */}
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
                  <Database className="w-4 h-4" />
                  Data Processing Pipeline
                </div>
                <div className="text-[10px] font-mono text-slate-300 flex items-center justify-between gap-1 pt-2">
                  <div className="bg-slate-950 p-2 rounded-lg text-center flex-1 border border-slate-800">NISAR GCOV</div>
                  <span>→</span>
                  <div className="bg-slate-950 p-2 rounded-lg text-center flex-1 border border-slate-800">GeoTIFF</div>
                  <span>→</span>
                  <div className="bg-slate-950 p-2 rounded-lg text-center flex-1 border border-slate-800">Supabase</div>
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  Key Features
                </div>
                <div className="text-[11px] text-slate-300 space-y-1 font-mono">
                  <div>✓ 4 Radar Layers (HHHH, HVHV, PR, PR dB)[span_6](start_span)[span_6](end_span)</div>
                  <div>✓ Interactive MapLibre Visualization[span_7](start_span)[span_7](end_span)</div>
                  <div>✓ Real Scientific Metadata & Lineage</div>
                </div>
              </div>

              {/* References */}
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                  <BookOpen className="w-4 h-4" />
                  References
                </div>
                <div className="text-[10px] text-slate-400 space-y-1 truncate font-mono">
                  <div>NASA NISAR: science.nasa.gov/mission/nisar</div>
                  <div>ASF GCOV Guide: nisar-docs.asf.alaska.edu</div>
                </div>
              </div>

            </div>

          </section>

        </main>
      </div>

      {/* MODAL OVERLAY */}
      {modalType !== 'none' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-slate-100 font-bold text-base">
                {modalType === 'about' && <Info className="w-5 h-5 text-indigo-400" />}
                {modalType === 'methodology' && <BookOpen className="w-5 h-5 text-emerald-400" />}
                {modalType === 'learnMore' && <Satellite className="w-5 h-5 text-amber-400" />}
                <span>
                  {modalType === 'about' && 'About INDUSPULSE & NASA Mission'}
                  {modalType === 'methodology' && 'Scientific Methodology & Data Lineage'}
                  {modalType === 'learnMore' && 'INDUSPULSE Deep-Dive: NISAR L-Band GCOV Briefing'}
                </span>
              </div>
              <button 
                onClick={() => setModalType('none')}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed font-mono">
              {modalType === 'about' && (
                <>
                  <div className="bg-indigo-950/30 border border-indigo-500/30 p-4 rounded-xl space-y-2">
                    <h3 className="font-bold text-indigo-300 text-sm">NASA-ISRO SAR (NISAR) Mission</h3>
                    <p className="text-slate-300">
                      NISAR is a joint Earth-observing mission between NASA and the Indian Space Research Organisation (ISRO) designed to map Earth using advanced L-band and S-band synthetic aperture radar.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-200">Study Region: Lower Indus Basin (Sindh, Pakistan)</h4>
                    <p className="text-slate-400">
                      The Lower Indus Basin corridor spans agricultural and arid zones around Nawabshah, Hyderabad, and Sukkur. INDUSPULSE utilizes Level-2 Geocoded Polarimetric Covariance (GCOV) data to analyze backscatter responses.
                    </p>
                  </div>
                </>
              )}

              {modalType === 'methodology' && (
                <>
                  <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl space-y-2">
                    <h3 className="font-bold text-emerald-300 text-sm">Polarimetric Processing Workflow</h3>
                    <p className="text-slate-300">
                      Raw HDF5 granules from Alaska Satellite Facility (ASF) were processed into intermediate GeoTIFF layers before generating optimized visualization PNG tiles hosted on Supabase storage[span_8](start_span)[span_8](end_span).
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-200">Mathematical Formulations</h4>
                    <ul className="list-disc pl-4 space-y-1 text-slate-400">
                      <li><strong>Linear Polarization Ratio:</strong> PR = HHHH / HVHV[span_9](start_span)[span_9](end_span)</li>
                      <li><strong>Decibel Conversion:</strong> PR_dB = 10 * log10(PR)[span_10](start_span)[span_10](end_span)</li>
                    </ul>
                  </div>
                </>
              )}

              {modalType === 'learnMore' && (
                <>
                  <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-xl space-y-2">
                    <h3 className="font-bold text-amber-300 text-sm">Project Architecture & Scientific Scope</h3>
                    <p className="text-slate-300">
                      INDUSPULSE provides judges and researchers with direct exploratory access to real NASA NISAR L-band GCOV observations over Sindh, Pakistan[span_11](start_span)[span_11](end_span).
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-200">Why L-Band SAR Matters for the Lower Indus Basin</h4>
                    <p className="text-slate-400">
                      L-band microwaves penetrate deep into vegetation canopies and dry soils, making it exceptionally powerful for examining agricultural structures, soil moisture contrasts, and surface roughness across Nawabshah and Hyderabad.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button 
                onClick={() => setModalType('none')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}