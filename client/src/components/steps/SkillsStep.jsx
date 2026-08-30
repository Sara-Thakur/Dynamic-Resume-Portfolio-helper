import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Code2, Tag } from 'lucide-react';

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Tools & DevOps', 'Other'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const SkillsStep = () => {
  const { formData, addSkill, removeSkill, updateSkill } = usePortfolio();
  const { skills = [] } = formData;

  const [newSkillName, setNewSkillName] = useState('');
  const [newCategory, setNewCategory] = useState('Frontend');
  const [newLevel, setNewLevel] = useState('Advanced');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      name: newSkillName.trim(),
      category: newCategory,
      level: newLevel,
    });
    setNewSkillName('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Technical & Professional Skills</h2>
        <p className="text-xs text-slate-500">Add technical skills grouped by domain category for maximum ATS visibility.</p>
      </div>

      {/* Add New Skill Bar */}
      <form onSubmit={handleAddSkill} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="e.g. React.js, Express, Docker..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="w-full sm:w-36">
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-32">
          <select
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-lg transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </form>

      {/* Dynamic Skill List */}
      {skills.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <Code2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-500">No skills added yet.</p>
          <p className="text-[11px] text-slate-400">Use the bar above to add skills dynamically.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-xl shadow-2xs hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="px-2.5 py-0.5 bg-sky-50 text-sky-700 font-bold text-[11px] rounded-md border border-sky-100 shrink-0">
                    {skill.category || 'Skill'}
                  </span>
                  <input
                    type="text"
                    value={skill.name || ''}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    className="font-semibold text-sm text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-sky-500 focus:outline-none px-1"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={skill.level || 'Intermediate'}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-slate-50 text-slate-600 focus:ring-1 focus:ring-sky-500"
                  >
                    {LEVELS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                    title="Remove skill"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
