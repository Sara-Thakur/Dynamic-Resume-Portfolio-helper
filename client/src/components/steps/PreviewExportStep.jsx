import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ExportPDFButton } from '../ExportPDFButton';
import { Globe, Copy, Check, ExternalLink, Loader2, Sparkles, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PreviewExportStep = () => {
  const { formData, publishedSlug, publishPortfolio, isSaving, saveError } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [slug, setSlug] = useState(publishedSlug || '');

  const handlePublish = async () => {
    const generatedSlug = await publishPortfolio();
    if (generatedSlug) {
      setSlug(generatedSlug);
    }
  };

  const publicUrl = slug
    ? `${window.location.origin}/portfolio/${slug}`
    : '';

  const handleCopyLink = () => {
    if (!publicUrl) return;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Preview & Final Export</h2>
        <p className="text-xs text-slate-500">
          Review your completed document, download an ATS-optimized PDF, or publish your live portfolio URL.
        </p>
      </div>

      {/* Primary Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* PDF Download Card */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sky-700 font-bold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>ATS Resume Document</span>
            </div>
            <p className="text-xs text-slate-500">
              Download your formatted resume as a high-density, ATS-parseable PDF document.
            </p>
          </div>

          <div className="pt-2">
            <ExportPDFButton elementId="resume-preview" />
          </div>
        </div>

        {/* Shareable Public Portfolio Card */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sky-700 font-bold text-sm mb-1">
              <Globe className="w-4 h-4 text-sky-600" />
              <span>Shareable Live Portfolio URL</span>
            </div>
            <p className="text-xs text-slate-500">
              Save portfolio data to MongoDB database and generate a public shareable URL slug.
            </p>
          </div>

          <div>
            {!slug ? (
              <button
                onClick={handlePublish}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing Portfolio...</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Publish & Generate URL</span>
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-2 rounded-xl">
                  <input
                    type="text"
                    readOnly
                    value={publicUrl}
                    className="flex-1 bg-transparent text-xs font-mono text-slate-800 outline-none px-1"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors"
                    title="Copy shareable link"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <a
                    href={publicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 font-semibold text-sky-600 hover:underline"
                  >
                    <span>Visit Live URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {copied && <span className="text-[11px] font-bold text-emerald-600">Copied to clipboard!</span>}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {saveError && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
          ⚠️ {saveError}
        </div>
      )}

      {/* Summary Checklist */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Portfolio Completion Checklist</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700">
          <div className="flex items-center gap-1.5">
            <span className={formData.personal?.fullName ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
              {formData.personal?.fullName ? '✓' : '○'} Personal Details
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={formData.skills?.length > 0 ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
              {formData.skills?.length > 0 ? '✓' : '○'} Technical Skills ({formData.skills?.length || 0})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={formData.experience?.length > 0 ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
              {formData.experience?.length > 0 ? '✓' : '○'} Experience ({formData.experience?.length || 0})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={formData.projects?.length > 0 ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
              {formData.projects?.length > 0 ? '✓' : '○'} Projects ({formData.projects?.length || 0})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={formData.education?.length > 0 ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
              {formData.education?.length > 0 ? '✓' : '○'} Education ({formData.education?.length || 0})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={formData.atsData?.score > 0 ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
              {formData.atsData?.score > 0 ? `✓ ATS Match (${formData.atsData.score}%)` : '○ ATS Check'}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
