import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar = () => {
  const { loadSampleData, resetForm } = usePortfolio();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">DevPulse</span>
              <span className="text-xs bg-sky-100 text-sky-700 font-semibold px-2 py-0.5 rounded-full border border-sky-200">
                ATS Builder
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Dynamic Portfolio & ATS Resume Suite</p>
          </div>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={loadSampleData}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-sky-700 bg-slate-100 hover:bg-sky-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-sky-200 transition-all"
            title="Populate form with sample developer data"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Load Demo Data</span>
          </button>

          <button
            onClick={resetForm}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200 transition-all"
            title="Clear form inputs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

      </div>
    </header>
  );
};
