import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink } from 'lucide-react';

export const LivePreview = ({ previewData = null, hideControls = false }) => {
  const { formData: contextData, setTemplate } = usePortfolio();
  const formData = previewData || contextData;
  const { personal, skills, experience, projects, education, template = 'modern' } = formData;

  // Group skills by category
  const skillsByCategory = (skills || []).reduce((acc, skill) => {
    const cat = skill.category || 'Technical Skills';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full bg-slate-100/70 border-l border-slate-200">
      
      {/* Template Selector & Info Bar (Hidden when exporting or in standalone public view) */}
      {!hideControls && (
        <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 shadow-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Template:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setTemplate('modern')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  template === 'modern' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Modern Clean
              </button>
              <button
                onClick={() => setTemplate('minimal')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  template === 'minimal' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Minimal ATS
              </button>
              <button
                onClick={() => setTemplate('classic')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  template === 'classic' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Executive
              </button>
            </div>
          </div>

          <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 hidden sm:inline">
            ● Live Syncing
          </span>
        </div>
      )}

      {/* Live Resume Sheet Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center">
        
        <div
          id="resume-preview"
          className={`w-full max-w-[800px] bg-white rounded-none shadow-xl border border-slate-200 p-8 sm:p-10 transition-all ${
            template === 'minimal'
              ? 'font-serif text-slate-900'
              : template === 'classic'
              ? 'font-sans text-slate-800'
              : 'font-sans text-slate-900'
          }`}
        >
          {/* ================= HEADER SECTION ================= */}
          <header className={`pb-6 mb-6 ${template === 'modern' ? 'border-b-2 border-sky-600' : 'border-b border-slate-300'}`}>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-1">
              {personal.fullName || 'Your Name'}
            </h1>
            
            {personal.title && (
              <p className={`text-lg font-semibold mb-3 ${template === 'modern' ? 'text-sky-700' : 'text-slate-700'}`}>
                {personal.title}
              </p>
            )}

            {/* Contact Details Bar */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs font-medium text-slate-600">
              {personal.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                  <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                </div>
              )}
              {personal.github && (
                <div className="flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <a href={personal.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                </div>
              )}
              {personal.website && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <a href={personal.website} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
                </div>
              )}
            </div>
          </header>

          {/* ================= SUMMARY SECTION ================= */}
          {personal.summary && (
            <section className="mb-6 page-break-inside-avoid">
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 ${template === 'modern' ? 'text-sky-700' : 'text-slate-800'}`}>
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                {personal.summary}
              </p>
            </section>
          )}

          {/* ================= TECHNICAL SKILLS SECTION ================= */}
          {skills && skills.length > 0 && (
            <section className="mb-6 page-break-inside-avoid">
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${template === 'modern' ? 'text-sky-700' : 'text-slate-800'}`}>
                Technical Skills
              </h2>
              <div className="space-y-2">
                {Object.entries(skillsByCategory).map(([category, items]) => (
                  <div key={category} className="text-xs sm:text-sm">
                    <span className="font-bold text-slate-900">{category}: </span>
                    <span className="text-slate-700">
                      {items.map(s => (typeof s === 'string' ? s : s.name)).join(' • ')}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ================= WORK EXPERIENCE SECTION ================= */}
          {experience && experience.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-3 ${template === 'modern' ? 'text-sky-700' : 'text-slate-800'}`}>
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id || exp.company} className="page-break-inside-avoid">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                      <div>
                        <span className="font-bold text-sm text-slate-900">{exp.role}</span>
                        {exp.company && <span className="text-sm font-semibold text-slate-700"> — {exp.company}</span>}
                      </div>
                      <div className="text-xs font-medium text-slate-500">
                        {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''} {exp.current ? 'Present' : exp.endDate}
                        {exp.location ? ` | ${exp.location}` : ''}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed pl-2 border-l-2 border-slate-200">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ================= PROJECTS SECTION ================= */}
          {projects && projects.length > 0 && (
            <section className="mb-6">
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-3 ${template === 'modern' ? 'text-sky-700' : 'text-slate-800'}`}>
                Key Projects
              </h2>
              <div className="space-y-3.5">
                {projects.map((proj) => (
                  <div key={proj.id || proj.title} className="page-break-inside-avoid">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{proj.title}</span>
                        {proj.techStack && proj.techStack.length > 0 && (
                          <span className="text-xs font-medium text-slate-500">
                            ({Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-sky-700">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                            Code <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                            Live Demo <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && (
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ================= EDUCATION SECTION ================= */}
          {education && education.length > 0 && (
            <section className="mb-4 page-break-inside-avoid">
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${template === 'modern' ? 'text-sky-700' : 'text-slate-800'}`}>
                Education & Qualifications
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id || edu.institution} className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="font-bold text-sm text-slate-900">{edu.degree}</span>
                      {edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                      {edu.institution && <span className="text-slate-600"> — {edu.institution}</span>}
                      {edu.gpa && <span className="text-xs font-medium text-slate-500"> (GPA: {edu.gpa})</span>}
                    </div>
                    <div className="text-xs text-slate-500">
                      {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};
