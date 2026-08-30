import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export const EducationStep = () => {
  const { formData, addEducation, removeEducation, updateEducation } = usePortfolio();
  const { education = [] } = formData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Education & Academic Background</h2>
          <p className="text-xs text-slate-500">Specify degrees, university degrees, or technical certifications.</p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-lg transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
          <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-500">No education history added yet.</p>
          <button
            onClick={addEducation}
            className="mt-2 text-xs font-semibold text-sky-600 hover:underline"
          >
            + Add education details
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div
              key={edu.id || index}
              className="bg-white border border-slate-200 p-4 sm:p-5 rounded-xl shadow-2xs space-y-4 relative group"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                  Education #{index + 1}
                </span>

                <button
                  onClick={() => removeEducation(edu.id)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 font-medium px-2 py-1 rounded-md hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Institution / University</label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="e.g. UC Berkeley / Stanford University"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Degree Title</label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="e.g. Bachelor of Science"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Field of Study / Major</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy || ''}
                    onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Start Year</label>
                    <input
                      type="text"
                      value={edu.startDate || ''}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      placeholder="2016"
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">End Year</label>
                    <input
                      type="text"
                      value={edu.endDate || ''}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      placeholder="2020"
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">GPA (Opt.)</label>
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="3.8 / 4.0"
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
