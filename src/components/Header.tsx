import React from 'react';
import { Shield, MapPin, Satellite, LayoutDashboard, Info, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabStatusChange: (tab: string) => void;
  onOpenModal: (modal: 'about' | 'methodology' | 'learnMore') => void;
}

export const Header: React.FC<HeaderProps> = ({ onTabStatusChange, onOpenModal }) => {
  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4 flex flex-wrap items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      {/* Brand, Big Logo & Title */}
      <div className="flex items-center gap-4">
        {/* Professional Large Logo */}
        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-indigo-500/40 bg-slate-900 flex items-center justify-center shadow-lg flex-shrink-0">
          <img 
            src="/logo.png.jpeg" 
            alt="NASA Space Apps Faisalabad" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">NASA</span>
            <span className="text-[11px] font-mono tracking-wider text-slate-400">SPACE APPS CHALLENGE 2026</span>
          </div>
          {/* Main Title - Large & Prominent */}
          <h1 className="text-2xl md:text-3xl font-black tracking-wider text-white flex items-center gap-2.5">
            INDUSPULSE 
            <span className="text-indigo-400 font-light text-xs md:text-sm tracking-normal">| Explore • Analyze • Validate</span>
          </h1>
        </div>
      </div>

      {/* Quick Meta Pills - Sleek & Clean */}
      <div className="hidden xl:flex items-center gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2 rounded-xl text-slate-300">
          <Shield className="w-3.5 h-3.5 text-indigo-400" />
          <span>Team: Orbital Intelligence</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2 rounded-xl text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Lower Indus Basin Sindh, Pakistan</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2 rounded-xl text-slate-300">
          <Satellite className="w-3.5 h-3.5 text-amber-400" />
          <span>NISAR L-Band GCOV</span>
        </div>
      </div>

      {/* Top Nav Buttons */}
      <div className="flex items-center gap-2.5">
        <button 
          onClick={() => onTabStatusChange('explorer')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>
        <button 
          onClick={() => onOpenModal('about')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer"
        >
          <Info className="w-4 h-4 text-indigo-400" />
          About
        </button>
        <button 
          onClick={() => onOpenModal('methodology')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          Methodology
        </button>
      </div>
    </header>
  );
};