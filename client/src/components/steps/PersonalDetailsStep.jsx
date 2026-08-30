import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { User, Mail, Phone, MapPin, Github, Linkedin, Globe, FileText } from 'lucide-react';

export const PersonalDetailsStep = () => {
  const { formData, updatePersonal } = usePortfolio();
  const { personal } = formData;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Personal & Contact Details</h2>
        <p className="text-xs text-slate-500">Provide your basic contact information and executive summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personal.fullName || ''}
              onChange={(e) => updatePersonal('fullName', e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            />
          </div>
        </div>

        {/* Professional Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Job Title / Target Role
          </label>
          <input
            type="text"
            value={personal.title || ''}
            onChange={(e) => updatePersonal('title', e.target.value)}
            placeholder="e.g. Senior Full Stack MERN Developer"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={personal.email || ''}
              onChange={(e) => updatePersonal('email', e.target.value)}
              placeholder="alex@example.com"
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personal.phone || ''}
              onChange={(e) => updatePersonal('phone', e.target.value)}
              placeholder="+1 (555) 019-2834"
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personal.location || ''}
              onChange={(e) => updatePersonal('location', e.target.value)}
              placeholder="San Francisco, CA"
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">GitHub Profile URL</label>
          <div className="relative">
            <Github className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="url"
              value={personal.github || ''}
              onChange={(e) => updatePersonal('github', e.target.value)}
              placeholder="https://github.com/username"
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Profile URL</label>
          <div className="relative">
            <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="url"
              value={personal.linkedin || ''}
              onChange={(e) => updatePersonal('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            />
          </div>
        </div>

        {/* Portfolio Website */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Personal Website / Portfolio</label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="url"
              value={personal.website || ''}
              onChange={(e) => updatePersonal('website', e.target.value)}
              placeholder="https://yourportfolio.com"
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            />
          </div>
        </div>

      </div>

      {/* Professional Summary */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          Professional Summary
        </label>
        <textarea
          rows={4}
          value={personal.summary || ''}
          onChange={(e) => updatePersonal('summary', e.target.value)}
          placeholder="Brief overview of your technical background, core achievements, and expertise..."
          className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
        />
        <p className="text-[11px] text-slate-500 mt-1">Tip: Keep it 2-4 sentences highlighting primary technical stack & impact.</p>
      </div>

    </div>
  );
};
