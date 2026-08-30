const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Portfolio = require('../models/Portfolio');
const mongoose = require('mongoose');

// In-memory fallback cache in case MongoDB is unreachable during dev/demo
const memoryCache = new Map();

// Helper to generate unique slug
const generateUniqueSlug = async (name) => {
  const baseSlug = slugify(name || 'portfolio', { lower: true, strict: true }) || 'user';
  const randomHex = Math.floor(1000 + Math.random() * 9000);
  const slug = `${baseSlug}-${randomHex}`;
  return slug;
};

// @route   GET /api/health
// @desc    Health check endpoint for Render/hosting platforms
// @access  Public
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// @route   POST /api/portfolios
// @desc    Create or update portfolio and generate shareable slug
// @access  Public
router.post('/portfolios', async (req, res) => {
  try {
    const { personal, skills, experience, projects, education, atsData, template, slug: existingSlug } = req.body;

    if (!personal || !personal.fullName || !personal.email) {
      return res.status(400).json({ message: 'Full name and email are required.' });
    }

    let slug = existingSlug;
    if (!slug) {
      slug = await generateUniqueSlug(personal.fullName);
    }

    const portfolioData = {
      slug,
      personal,
      skills: skills || [],
      experience: experience || [],
      projects: projects || [],
      education: education || [],
      atsData: atsData || { jobDescription: '', score: 0, matchedKeywords: [], missingKeywords: [] },
      template: template || 'modern',
    };

    // Store in memory cache as well
    memoryCache.set(slug, portfolioData);

    if (mongoose.connection.readyState === 1) {
      const existing = await Portfolio.findOne({ slug });
      if (existing) {
        Object.assign(existing, portfolioData);
        await existing.save();
        return res.status(200).json({ success: true, slug, portfolio: existing });
      } else {
        const newPortfolio = new Portfolio(portfolioData);
        await newPortfolio.save();
        return res.status(201).json({ success: true, slug, portfolio: newPortfolio });
      }
    } else {
      // Return successfully using memoryCache fallback
      return res.status(200).json({
        success: true,
        slug,
        portfolio: portfolioData,
        note: 'Saved in local server fallback mode (MongoDB pending)',
      });
    }
  } catch (error) {
    console.error('Error saving portfolio:', error);
    res.status(500).json({ message: 'Server error saving portfolio', error: error.message });
  }
});

// @route   GET /api/portfolios/:slug
// @desc    Get portfolio data by public slug
// @access  Public
router.get('/portfolios/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    if (mongoose.connection.readyState === 1) {
      const portfolio = await Portfolio.findOne({ slug });
      if (portfolio) {
        return res.status(200).json({ success: true, portfolio });
      }
    }

    // Check memory cache fallback
    if (memoryCache.has(slug)) {
      return res.status(200).json({ success: true, portfolio: memoryCache.get(slug) });
    }

    return res.status(404).json({ message: 'Portfolio not found for this URL slug.' });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ message: 'Server error fetching portfolio', error: error.message });
  }
});

module.exports = router;
