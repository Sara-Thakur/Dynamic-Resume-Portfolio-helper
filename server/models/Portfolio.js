const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    personal: {
      fullName: { type: String, required: true },
      title: { type: String, default: '' },
      email: { type: String, required: true },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      website: { type: String, default: '' },
      summary: { type: String, default: '' },
    },
    skills: [
      {
        id: String,
        category: { type: String, default: 'General' },
        name: { type: String, required: true },
        level: { type: String, default: 'Intermediate' },
      },
    ],
    experience: [
      {
        id: String,
        company: String,
        role: String,
        location: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        description: String,
      },
    ],
    projects: [
      {
        id: String,
        title: String,
        description: String,
        techStack: [String],
        githubUrl: String,
        liveUrl: String,
      },
    ],
    education: [
      {
        id: String,
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: String,
        endDate: String,
        gpa: String,
      },
    ],
    atsData: {
      jobDescription: { type: String, default: '' },
      score: { type: Number, default: 0 },
      matchedKeywords: [String],
      missingKeywords: [String],
    },
    template: {
      type: String,
      default: 'modern',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Portfolio', PortfolioSchema);
