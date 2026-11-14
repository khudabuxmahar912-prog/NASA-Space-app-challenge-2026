import React from 'react';
import { Satellite, Radio, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-600 p-2 rounded-lg flex items-center justify-center">
          <Satellite className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
            INDUSPULSE <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/30 font-mono">NASA SPACE APPS CHALLENGE 2026</span>
          </h1>
          <p className="text-xs text-slate-400">NISAR-Powered Surface Change Explorer | Lower Indus Basin Corridor</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center space-x-6 text-xs text-slate-300 font-mono">
        <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded border border-slate-700">
          <Radio className="w-4 h-4 text-emerald-400" />
          <span>L-Band GCOV (Validated)</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded border border-slate-700">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>AOI: Sindh Corridor</span>
        </div>
      </div>
    </header>
  );
};