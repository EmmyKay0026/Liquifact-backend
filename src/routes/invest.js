'use strict';

/**
 * @fileoverview Investment opportunity routes for the Investor portal.
 * @module routes/invest
 */

const express = require('express');
const router = express.Router();
const investService = require('../services/investService');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../logger');

/**
 * @route GET /api/invest/opportunities
 * @desc Get a paginated list of investable opportunities from the projection DB.
 * @access Private (Investors)
 */
router.get('/opportunities', authenticateToken, async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await investService.getOpportunities({ page, limit });

    logger.info({ 
      requestId: req.id, 
      count: result.data.length,
      total: result.meta.total 
    }, 'Retrieved investment opportunities');

    return res.json({
      ...result,
      message: 'Investment opportunities retrieved successfully.',
    });
  } catch (error) {
    // Standard error handling middleware will catch and format this
    next(error);
  }
});

module.exports = router;
