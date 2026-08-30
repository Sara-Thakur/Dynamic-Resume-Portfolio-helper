import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { StepNavigation } from '../components/StepNavigation';
import { LivePreview } from '../components/LivePreview';

import { PersonalDetailsStep } from '../components/steps/PersonalDetailsStep';
import { SkillsStep } from '../components/steps/SkillsStep';
import { ExperienceStep } from '../components/steps/ExperienceStep';
import { ProjectsStep } from '../components/steps/ProjectsStep';
import { EducationStep } from '../components/steps/EducationStep';
import { AtsCheckerStep } from '../components/steps/AtsCheckerStep';
import { PreviewExportStep } from '../components/steps/PreviewExportStep';

import { Eye, Edit3 } from 'lucide-react';

export const BuilderPage = () => {
  const { activeStep } = usePortfolio();
  const [mobileTab, setMobileTab] = useState('form'); // 'form' | 'preview'

  const renderActiveStep = () => {
    switch (activeStep) {
      case 1: return <PersonalDetailsStep />;
      case 2: return <SkillsStep />;
      case 3: return <ExperienceStep />;
      case 4: return <ProjectsStep />;
      case 5: return <EducationStep />;
      case 6: return <AtsCheckerStep />;
      case 7: return <PreviewExportStep />;
      default: return <PersonalDetailsStep />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-slate-50">
      
      {/* Step Navigation Bar */}
      <StepNavigation />

      {/* Mobile Preview / Form Switcher Bar */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-2 flex justify-center gap-2">
        <button
          onClick={() => setMobileTab('form')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
            mobileTab === 'form' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Form</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
            mobileTab === 'preview' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Split-Screen Main Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
        
        {/* Left Side: Dynamic Multi-Step Form */}
        <div className={`lg:col-span-6 xl:col-span-5 p-4 sm:p-6 lg:p-8 overflow-y-auto ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            {renderActiveStep()}
          </div>
        </div>

        {/* Right Side: Live Responsive Resume Preview */}
        <div className={`lg:col-span-6 xl:col-span-7 h-full overflow-hidden ${mobileTab === 'form' ? 'hidden lg:block' : 'block'}`}>
          <LivePreview />
        </div>

      </div>

    </div>
  );
};
