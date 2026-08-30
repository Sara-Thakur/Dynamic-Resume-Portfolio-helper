/**
 * Utility for ATS Keyword Analysis & Score Calculation
 */

const DOMAIN_KEYWORDS_DATABASE = [
  'javascript', 'typescript', 'react', 'react.js', 'next.js', 'vue.js', 'angular',
  'node.js', 'express', 'express.js', 'mongodb', 'mongoose', 'sql', 'postgresql',
  'mysql', 'rest api', 'graphql', 'html5', 'css3', 'tailwind css', 'bootstrap',
  'redux', 'zustand', 'context api', 'git', 'github', 'docker', 'kubernetes',
  'aws', 'azure', 'gcp', 'cicd', 'ci/cd', 'unit testing', 'jest', 'cypress',
  'system design', 'agile', 'scrum', 'web security', 'oauth', 'jwt', 'microservices',
  'webpack', 'vite', 'performance optimization', 'responsive design', 'python',
  'java', 'c++', 'data structures', 'algorithms', 'object-oriented programming'
];

// Common stop words to ignore during keyword extraction
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'to', 'in', 'on',
  'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through',
  'during', 'before', 'after', 'above', 'below', 'from', 'up', 'down', 'out',
  'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there',
  'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
  'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same',
  'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should',
  'now', 'experience', 'ability', 'work', 'working', 'team', 'role', 'looking',
  'candidate', 'strong', 'knowledge', 'years', 'skills', 'good', 'must', 'have'
]);

/**
 * Normalizes text and extracts tokens / keywords
 */
export const extractKeywords = (text) => {
  if (!text) return [];
  
  // Clean text and split by word boundaries
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s.#+-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word));

  const foundKeywords = new Set();

  // 1. Check multi-word known domain tech terms
  DOMAIN_KEYWORDS_DATABASE.forEach(kw => {
    if (text.toLowerCase().includes(kw)) {
      foundKeywords.add(kw);
    }
  });

  // 2. Add remaining significant words
  words.forEach(word => {
    if (word.length >= 3) {
      foundKeywords.add(word);
    }
  });

  return Array.from(foundKeywords);
};

/**
 * Calculates ATS match percentage and lists matched vs missing keywords
 */
export const calculateAtsScore = (portfolioData, jobDescription) => {
  if (!jobDescription || jobDescription.trim().length === 0) {
    return {
      score: 0,
      matchedKeywords: [],
      missingKeywords: [],
      suggestions: ['Paste a job description to calculate your ATS match score.'],
    };
  }

  // Extract all text from portfolio data
  const resumeTextParts = [];

  if (portfolioData.personal?.summary) {
    resumeTextParts.push(portfolioData.personal.summary);
  }
  if (portfolioData.personal?.title) {
    resumeTextParts.push(portfolioData.personal.title);
  }

  (portfolioData.skills || []).forEach(skill => {
    if (typeof skill === 'string') resumeTextParts.push(skill);
    else if (skill?.name) resumeTextParts.push(skill.name);
  });

  (portfolioData.experience || []).forEach(exp => {
    if (exp.role) resumeTextParts.push(exp.role);
    if (exp.company) resumeTextParts.push(exp.company);
    if (exp.description) resumeTextParts.push(exp.description);
  });

  (portfolioData.projects || []).forEach(proj => {
    if (proj.title) resumeTextParts.push(proj.title);
    if (proj.description) resumeTextParts.push(proj.description);
    if (proj.techStack) {
      const stack = Array.isArray(proj.techStack) ? proj.techStack.join(' ') : proj.techStack;
      resumeTextParts.push(stack);
    }
  });

  (portfolioData.education || []).forEach(edu => {
    if (edu.degree) resumeTextParts.push(edu.degree);
    if (edu.fieldOfStudy) resumeTextParts.push(edu.fieldOfStudy);
  });

  const combinedResumeText = resumeTextParts.join(' ').toLowerCase();

  // Extract JD Keywords
  const jdKeywords = extractKeywords(jobDescription);

  if (jdKeywords.length === 0) {
    return {
      score: 0,
      matchedKeywords: [],
      missingKeywords: [],
      suggestions: ['Please provide a more detailed job description.'],
    };
  }

  const matchedKeywords = [];
  const missingKeywords = [];

  jdKeywords.forEach(kw => {
    if (combinedResumeText.includes(kw.toLowerCase())) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const rawMatchRate = (matchedKeywords.length / jdKeywords.length) * 100;
  const score = Math.min(100, Math.max(0, Math.round(rawMatchRate)));

  // Generate actionable tips
  const suggestions = [];
  if (score >= 80) {
    suggestions.push('Excellent match! Your resume covers most key requirements.');
  } else if (score >= 60) {
    suggestions.push('Good match! Consider incorporating a few missing domain keywords into your experience descriptions.');
  } else {
    suggestions.push('Low match. Try adding missing technical skills and keywords directly to your skills & summary section.');
  }

  if (missingKeywords.length > 0) {
    const topMissing = missingKeywords.slice(0, 5).join(', ');
    suggestions.push(`Consider adding these missing keywords if relevant to your experience: ${topMissing}`);
  }

  return {
    score,
    matchedKeywords,
    missingKeywords,
    suggestions,
  };
};
