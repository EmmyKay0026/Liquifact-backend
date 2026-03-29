/**
 * Authentication Middleware
 * Validates JWT tokens in the Authorization header.
 * @module middleware/auth
 */

const jwt = require('jsonwebtoken');
const { error: buildErrorResponse } = require('../utils/responseHelper');

/**
 * Middleware function to enforce authentication for protected routes.
 * It checks the "Authorization" header for a "Bearer <token>" pattern.
 * If valid, it attaches the decoded token payload to `req.user`.
 * 
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void}
 */
const authenticateToken = (req, res, next) => {
  /**
   * Sends a standardized unauthorized response.
   *
   * @param {string} message - Unauthorized message.
   * @returns {import('express').Response} Express response.
   */
  const sendUnauthorized = (message) => {
    res.header('Content-Type', 'application/problem+json');
    return res.status(401).json(buildErrorResponse(message, 'UNAUTHORIZED', null));
  };

  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return sendUnauthorized('Authentication token is required');
  }

  const tokenParts = authHeader.split(' ');
  
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return sendUnauthorized('Invalid Authorization header format. Expected "Bearer <token>"');
  }

  const token = tokenParts[1];
  const secret = process.env.JWT_SECRET || 'test-secret'; // Fallback for local testing if env is not completely set

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return sendUnauthorized('Token has expired');
      }
      return sendUnauthorized('Invalid token');
    }
    
    // Attach user info to the request pattern
    req.user = decoded;
    next();
  });
};

module.exports = { authenticateToken };
