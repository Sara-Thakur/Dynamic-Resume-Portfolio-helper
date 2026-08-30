import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LivePreview } from '../components/LivePreview';
import { ExportPDFButton } from '../components/ExportPDFButton';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink, Briefcase, GraduationCap, Code2, ArrowLeft, Download, Sparkles } from 'lucide-react';

export const PublicPortfolioPage = () => {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' | 'resume'

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/portfolios/${slug}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setPortfolio(data.portfolio);
        } else {
          // Fallback check local storage if offline demo
          const localData = localStorage.getItem('portfolio_ats_form_data');
          if (localData) {
            setPortfolio(JSON.parse(localData));
          } else {
            setError('Portfolio link expired or not found.');
          }
        }
      } catch (err) {
        console.error('Error fetching public portfolio:', err);
        const localData = localStorage.getItem('portfolio_ats_form_data');
        if (localData) {
          setPortfolio(JSON.parse(localData));
        } else {
          setError('Network error fetching portfolio.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold text-slate-600">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-900">Portfolio Not Found</h2>
          <p className="text-xs text-slate-500">{error || 'The requested URL slug does not exist.'}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Create Your Own Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  const { personal = {}, skills = [], experience = [], projects = [], education = [] } = portfolio;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-16">
      
      {/* Top Banner */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-sky-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Builder</span>
          </Link>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'portfolio' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Portfolio
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'resume' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ATS Resume View
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {activeTab === 'resume' ? (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
          <div className="flex justify-end">
            <ExportPDFButton />
          </div>
          <LivePreview previewData={portfolio} hideControls={true} />
        </div>
      ) : (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 space-y-10">
          
          {/* HERO SECTION */}
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-700 text-xs font-bold rounded-full border border-sky-100">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Available for Opportunities</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {personal.fullName || 'Software Engineer'}
              </h1>

              {personal.title && (
                <p className="text-xl sm:text-2xl font-semibold text-sky-600">
                  {personal.title}
                </p>
              )}

              {personal.summary && (
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                  {personal.summary}
                </p>
              )}
            </div>

            {/* Contact & Links Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 rounded-xl text-xs font-semibold border border-slate-200 hover:border-sky-200 transition-all"
                >
                  <Mail className="w-4 h-4 text-sky-600" />
                  <span>{personal.email}</span>
                </a>
              )}

              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white rounded-xl text-xs font-semibold border border-slate-200 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}

              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-sky-600 text-slate-700 hover:text-white rounded-xl text-xs font-semibold border border-slate-200 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}

              {personal.website && (
                <a
                  href={personal.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-emerald-600 text-slate-700 hover:text-white rounded-xl text-xs font-semibold border border-slate-200 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </section>

          {/* TECHNICAL SKILLS SECTION */}
          {skills && skills.length > 0 && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Code2 className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-slate-900">Technical Expertise</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={skill.id || index}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  >
                    <span>{typeof skill === 'string' ? skill : skill.name}</span>
                    {skill.level && (
                      <span className="text-[10px] text-sky-700 bg-sky-100/60 px-1.5 py-0.5 rounded-md">
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* WORK EXPERIENCE SECTION */}
          {experience && experience.length > 0 && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Briefcase className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-slate-900">Professional Experience</h2>
              </div>

              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id || index} className="relative pl-6 border-l-2 border-slate-200 space-y-2">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-sky-600"></div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-base font-bold text-slate-900">
                        {exp.role} <span className="text-sky-600 font-medium">@ {exp.company}</span>
                      </h3>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''} {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>

                    {exp.description && (
                      <p className="text-xs sm:text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FEATURED PROJECTS SECTION */}
          {projects && projects.length > 0 && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Sparkles className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-slate-900">Featured Projects</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj, index) => (
                  <div
                    key={proj.id || index}
                    className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col justify-between space-y-3 hover:border-sky-300 transition-colors"
                  >
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      {proj.techStack && (
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(proj.techStack) ? proj.techStack : [proj.techStack]).map((tech, tIdx) => (
                            <span key={tIdx} className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-1 text-xs font-semibold">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-slate-700 hover:text-slate-900"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Code</span>
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-sky-600 hover:text-sky-800"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EDUCATION SECTION */}
          {education && education.length > 0 && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <GraduationCap className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-slate-900">Education</h2>
              </div>

              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={edu.id || index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</h3>
                      <p className="text-xs text-slate-500">{edu.institution} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
      )}

    </div>
  );
};
