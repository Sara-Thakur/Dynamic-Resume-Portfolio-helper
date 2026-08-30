import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, FolderGit2, Github, ExternalLink } from 'lucide-react';

export const ProjectsStep = () => {
  const { formData, addProject, removeProject, updateProject } = usePortfolio();
  const { projects = [] } = formData;

  const handleTechStackChange = (id, rawInput) => {
    // Convert comma-separated string into array of trimmed strings
    const stackArray = rawInput.split(',').map((item) => item.trim()).filter(Boolean);
    updateProject(id, 'techStack', stackArray);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Featured Projects</h2>
          <p className="text-xs text-slate-500">Highlight full-stack software applications and key open-source contributions.</p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-lg transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
          <FolderGit2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-500">No project entries added yet.</p>
          <button
            onClick={addProject}
            className="mt-2 text-xs font-semibold text-sky-600 hover:underline"
          >
            + Add your first project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, index) => (
            <div
              key={proj.id || index}
              className="bg-white border border-slate-200 p-4 sm:p-5 rounded-xl shadow-2xs space-y-4 relative group"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                  Project #{index + 1}
                </span>

                <button
                  onClick={() => removeProject(proj.id)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 font-medium px-2 py-1 rounded-md hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={proj.title || ''}
                    onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                    placeholder="e.g. DevPulse AI Resume Builder"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack || ''}
                    onChange={(e) => handleTechStackChange(proj.id, e.target.value)}
                    placeholder="e.g. React, Node.js, Express, MongoDB, Tailwind"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">GitHub Repository Link</label>
                  <input
                    type="url"
                    value={proj.githubUrl || ''}
                    onChange={(e) => updateProject(proj.id, 'githubUrl', e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Live Demo / Deployed URL</label>
                  <input
                    type="url"
                    value={proj.liveUrl || ''}
                    onChange={(e) => updateProject(proj.id, 'liveUrl', e.target.value)}
                    placeholder="https://project.vercel.app"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project Overview & Key Highlights
                </label>
                <textarea
                  rows={2}
                  value={proj.description || ''}
                  onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  placeholder="Full-stack web application providing real-time ATS keyword matching, live split-screen preview, and custom PDF export."
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
