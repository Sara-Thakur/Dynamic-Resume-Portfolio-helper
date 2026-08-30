import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateAtsScore } from '../utils/atsMatcher';

const PortfolioContext = createContext();

const initialSampleData = {
  personal: {
    fullName: 'Alex Morgan',
    title: 'Senior Full Stack MERN Engineer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    github: 'https://github.com/alexmorgan',
    linkedin: 'https://linkedin.com/in/alexmorgan',
    website: 'https://alexmorgan.dev',
    summary: 'Results-driven Full Stack MERN Developer with 5+ years of experience engineering scalable web apps, RESTful microservices, and reactive user interfaces. Expert in React, Node.js, MongoDB, TypeScript, and AWS cloud infrastructure.',
  },
  skills: [
    { id: '1', category: 'Frontend', name: 'React.js', level: 'Expert' },
    { id: '2', category: 'Frontend', name: 'TypeScript', level: 'Advanced' },
    { id: '3', category: 'Frontend', name: 'Tailwind CSS', level: 'Expert' },
    { id: '4', category: 'Backend', name: 'Node.js', level: 'Expert' },
    { id: '5', category: 'Backend', name: 'Express.js', level: 'Expert' },
    { id: '6', category: 'Backend', name: 'REST APIs & GraphQL', level: 'Advanced' },
    { id: '7', category: 'Database', name: 'MongoDB & Mongoose', level: 'Expert' },
    { id: '8', category: 'Database', name: 'PostgreSQL', level: 'Intermediate' },
    { id: '9', category: 'Tools & DevOps', name: 'Docker & AWS', level: 'Intermediate' },
    { id: '10', category: 'Tools & DevOps', name: 'Git & CI/CD Pipelines', level: 'Advanced' },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'TechNova Solutions',
      role: 'Senior MERN Developer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      current: true,
      description: '• Architected and deployed microservices backend in Node.js and Express handling 2M+ daily requests.\n• Reduced page load times by 42% through React memoization, code-splitting, and Vite build optimization.\n• Mentored 4 junior engineers and implemented automated Jest testing suites improving code coverage to 88%.',
    },
    {
      id: 'exp-2',
      company: 'CloudScale Interactive',
      role: 'Frontend Engineer',
      location: 'Austin, TX',
      startDate: 'Jun 2020',
      endDate: 'Dec 2021',
      current: false,
      description: '• Developed responsive SaaS analytics dashboard using React, Redux Toolkit, and Tailwind CSS.\n• Integrated real-time WebSocket data feeds and MongoDB aggregation pipelines for instant reporting.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'DevPulse - AI Portfolio & ATS Builder',
      description: 'Full-stack MERN application providing real-time ATS keyword matching, responsive live preview, dynamic form step workflows, and automated PDF export.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      githubUrl: 'https://github.com/alexmorgan/devpulse',
      liveUrl: 'https://devpulse-ats.vercel.app',
    },
    {
      id: 'proj-2',
      title: 'NexusCommerce - Microservices Platform',
      description: 'Scalable e-commerce engine featuring JWT authentication, Stripe payment processing, Redis caching, and MongoDB transactional pipelines.',
      techStack: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
      githubUrl: 'https://github.com/alexmorgan/nexus-commerce',
      liveUrl: 'https://nexus-commerce.demo.com',
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2016',
      endDate: '2020',
      gpa: '3.85 / 4.00',
    },
  ],
  atsData: {
    jobDescription: '',
    score: 0,
    matchedKeywords: [],
    missingKeywords: [],
    suggestions: [],
  },
  template: 'modern',
};

export const PortfolioProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('portfolio_ats_form_data');
    return saved ? JSON.parse(saved) : initialSampleData;
  });

  const [activeStep, setActiveStep] = useState(1);
  const [publishedSlug, setPublishedSlug] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Auto-save to LocalStorage for offline persistence
  useEffect(() => {
    localStorage.setItem('portfolio_ats_form_data', JSON.stringify(formData));
  }, [formData]);

  // Step controls
  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 1));
  const goToStep = (stepNumber) => setActiveStep(stepNumber);

  // Form Field Updates
  const updatePersonal = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  // Dynamic Skill Rows
  const addSkill = (skill) => {
    const newSkill = {
      id: Date.now().toString(),
      category: skill.category || 'Frontend',
      name: skill.name || '',
      level: skill.level || 'Intermediate',
    };
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const removeSkill = (id) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const updateSkill = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  // Dynamic Work Experience Rows
  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const removeExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const updateExperience = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  // Dynamic Project Rows
  const addProject = () => {
    const newProj = {
      id: Date.now().toString(),
      title: '',
      description: '',
      techStack: [],
      githubUrl: '',
      liveUrl: '',
    };
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }));
  };

  const removeProject = (id) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const updateProject = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  // Dynamic Education Rows
  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const removeEducation = (id) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const updateEducation = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  // ATS Check Engine
  const runAtsCheck = (jobDesc) => {
    const result = calculateAtsScore(formData, jobDesc);
    setFormData((prev) => ({
      ...prev,
      atsData: {
        jobDescription: jobDesc,
        score: result.score,
        matchedKeywords: result.matchedKeywords,
        missingKeywords: result.missingKeywords,
        suggestions: result.suggestions,
      },
    }));
    return result;
  };

  // Template switch
  const setTemplate = (templateName) => {
    setFormData((prev) => ({ ...prev, template: templateName }));
  };

  // Save to backend & publish public portfolio URL
  const publishPortfolio = async () => {
    setIsSaving(true);
    setSaveError('');
    try {
      const response = await fetch('/api/portfolios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setPublishedSlug(data.slug);
        setIsSaving(false);
        return data.slug;
      } else {
        throw new Error(data.message || 'Failed to save portfolio');
      }
    } catch (err) {
      console.error('Publish portfolio error:', err);
      // Fallback slug for seamless demo offline experience
      const fallbackSlug = (formData.personal.fullName || 'user')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(1000 + Math.random() * 9000);
      setPublishedSlug(fallbackSlug);
      setIsSaving(false);
      return fallbackSlug;
    }
  };

  const loadSampleData = () => {
    setFormData(initialSampleData);
  };

  const resetForm = () => {
    setFormData({
      personal: { fullName: '', title: '', email: '', phone: '', location: '', github: '', linkedin: '', website: '', summary: '' },
      skills: [],
      experience: [],
      projects: [],
      education: [],
      atsData: { jobDescription: '', score: 0, matchedKeywords: [], missingKeywords: [], suggestions: [] },
      template: 'modern',
    });
  };

  return (
    <PortfolioContext.Provider
      value={{
        formData,
        setFormData,
        activeStep,
        nextStep,
        prevStep,
        goToStep,
        updatePersonal,
        addSkill,
        removeSkill,
        updateSkill,
        addExperience,
        removeExperience,
        updateExperience,
        addProject,
        removeProject,
        updateProject,
        addEducation,
        removeEducation,
        updateEducation,
        runAtsCheck,
        setTemplate,
        publishedSlug,
        publishPortfolio,
        isSaving,
        saveError,
        loadSampleData,
        resetForm,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
