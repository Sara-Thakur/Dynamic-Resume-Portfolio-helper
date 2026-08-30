import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Target, CheckCircle2, XCircle, Sparkles, Lightbulb, ArrowRight } from 'lucide-react';

export const AtsCheckerStep = () => {
  const { formData, runAtsCheck, goToStep } = usePortfolio();
  const { atsData = {} } = formData;

  const [jobDescription, setJobDescription] = useState(atsData.jobDescription || '');
  const [analyzed, setAnalyzed] = useState(Boolean(atsData.score > 0 || atsData.jobDescription));

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;
    runAtsCheck(jobDescription);
    setAnalyzed(true);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return { bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-200', fill: '#10b981' };
    if (score >= 60) return { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200', fill: '#f59e0b' };
    return { bg: 'bg-rose-500', text: 'text-rose-600', border: 'border-rose-200', fill: '#f43f5e' };
  };

  const scoreInfo = getScoreColor(atsData.score || 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">ATS Keyword Matcher & Score Scanner</h2>
        <p className="text-xs text-slate-500">
          Paste the target job description below. Our ATS algorithm scans your skills, experience, and projects to calculate your match score.
        </p>
      </div>

      {/* Input Job Description Box */}
      <form onSubmit={handleAnalyze} className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Target Job Description (JD) Text
          </label>
          <textarea
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste target job requirement, technical stack, or job posting text here..."
            className="w-full p-3 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-sky-500 font-mono text-slate-800"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            {jobDescription.length > 0 ? `${jobDescription.length} characters analyzed` : 'No text entered'}
          </p>

          <button
            type="submit"
            disabled={!jobDescription.trim()}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
          >
            <Target className="w-4 h-4" />
            <span>Calculate Match Score</span>
          </button>
        </div>
      </form>

      {/* Analysis Results Display */}
      {analyzed && (
        <div className="space-y-6 pt-4 border-t border-slate-200">
          
          {/* Score Meter Banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center gap-6">
            
            {/* Visual Gauge Circle */}
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="transition-all duration-1000 ease-out"
                  strokeWidth="3.5"
                  strokeDasharray={`${atsData.score || 0}, 100`}
                  strokeLinecap="round"
                  stroke={scoreInfo.fill}
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className={`text-2xl font-black ${scoreInfo.text}`}>
                  {atsData.score || 0}%
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  ATS Score
                </span>
              </div>
            </div>

            {/* Score Breakdown Summary */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h3 className="text-base font-bold text-slate-900">
                {atsData.score >= 80
                  ? '🎯 Highly Optimized for ATS!'
                  : atsData.score >= 60
                  ? '⚡ Moderate Match - Optimization Suggested'
                  : '⚠️ Low Keyword Compatibility'}
              </h3>
              <p className="text-xs text-slate-600">
                Identified <span className="font-bold text-emerald-600">{atsData.matchedKeywords?.length || 0}</span> matching domain terms and <span className="font-bold text-rose-500">{atsData.missingKeywords?.length || 0}</span> missing key terms.
              </p>

              {/* Action Suggestions */}
              {atsData.suggestions && atsData.suggestions.length > 0 && (
                <div className="bg-sky-50 border border-sky-100 p-3 rounded-xl space-y-1">
                  <div className="flex items-center gap-1 text-sky-800 font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>Optimization Tips:</span>
                  </div>
                  {atsData.suggestions.map((tip, i) => (
                    <p key={i} className="text-[11px] text-sky-900 leading-snug">
                      • {tip}
                    </p>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Matched vs Missing Domain Keywords Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Matched Keywords */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs border-b border-slate-100 pb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Matched Keywords ({atsData.matchedKeywords?.length || 0})</span>
              </div>

              {atsData.matchedKeywords && atsData.matchedKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {atsData.matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded-md"
                    >
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No matching keywords detected.</p>
              )}
            </div>

            {/* Missing Keywords */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>Missing Domain Keywords ({atsData.missingKeywords?.length || 0})</span>
                </div>
                <button
                  onClick={() => goToStep(2)}
                  className="text-[11px] font-semibold text-sky-600 hover:underline flex items-center gap-0.5"
                >
                  <span>Add to Skills</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {atsData.missingKeywords && atsData.missingKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {atsData.missingKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold rounded-md"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No missing keywords! Great coverage.</p>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
};
