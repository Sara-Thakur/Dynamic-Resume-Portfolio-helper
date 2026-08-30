import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';

export const ExperienceStep = () => {
  const { formData, addExperience, removeExperience, updateExperience } = usePortfolio();
  const { experience = [] } = formData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Work Experience</h2>
          <p className="text-xs text-slate-500">List your professional employment history with action verbs and key impact metrics.</p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-lg transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
          <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-500">No work experience entries yet.</p>
          <button
            onClick={addExperience}
            className="mt-2 text-xs font-semibold text-sky-600 hover:underline"
          >
            + Add your first position
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div
              key={exp.id || index}
              className="bg-white border border-slate-200 p-4 sm:p-5 rounded-xl shadow-2xs space-y-4 relative group"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                  Position #{index + 1}
                </span>

                <button
                  onClick={() => removeExperience(exp.id)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 font-medium px-2 py-1 rounded-md hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="e.g. Google / TechNova"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Job Title / Role</label>
                  <input
                    type="text"
                    value={exp.role || ''}
                    onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                    placeholder="e.g. Senior MERN Developer"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    placeholder="e.g. Remote / New York, NY"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate || ''}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="e.g. Jan 2022"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">End Date</label>
                    <input
                      type="text"
                      disabled={exp.current}
                      value={exp.current ? 'Present' : exp.endDate || ''}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="e.g. Dec 2023"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500 disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.current || false}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
                />
                <label htmlFor={`current-${exp.id}`} className="text-xs font-medium text-slate-700 cursor-pointer">
                  I currently work in this role
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Responsibilities & Achievements (Bullet Points)
                </label>
                <textarea
                  rows={3}
                  value={exp.description || ''}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="• Engineered microservices using Node.js handling 1M+ requests daily.&#10;• Reduced latency by 35% using Redis caching."
                  className="w-full p-3 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500 font-mono text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
