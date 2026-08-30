import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { User, Code2, Briefcase, FolderGit2, GraduationCap, Target, Eye, ChevronRight, ChevronLeft } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Personal', icon: User },
  { id: 2, label: 'Skills', icon: Code2 },
  { id: 3, label: 'Experience', icon: Briefcase },
  { id: 4, label: 'Projects', icon: FolderGit2 },
  { id: 5, label: 'Education', icon: GraduationCap },
  { id: 6, label: 'ATS Matcher', icon: Target },
  { id: 7, label: 'Preview & Export', icon: Eye },
];

export const StepNavigation = () => {
  const { activeStep, goToStep, prevStep, nextStep } = usePortfolio();

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Step Tabs Progress */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;

            return (
              <button
                key={step.id}
                onClick={() => goToStep(step.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                    : isCompleted
                    ? 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isCompleted
                      ? 'bg-sky-200 text-sky-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {step.id}
                </div>
                <Icon className="w-3.5 h-3.5 hidden sm:inline" />
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Back / Next Quick Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            onClick={prevStep}
            disabled={activeStep === 1}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              activeStep === 1
                ? 'opacity-40 cursor-not-allowed bg-slate-50 text-slate-400 border-slate-200'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-xs'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={nextStep}
            disabled={activeStep === 7}
            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm transition-all ${
              activeStep === 7
                ? 'opacity-40 cursor-not-allowed bg-slate-400'
                : 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
