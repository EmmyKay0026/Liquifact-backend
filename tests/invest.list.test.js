'use strict';

const request = require('supertest');
const { createApp } = require('../src/index');
const jwt = require('jsonwebtoken');

const TEST_SECRET = process.env.JWT_SECRET || 'test-secret';
const validToken = jwt.sign({ id: 'user_investor', role: 'investor' }, TEST_SECRET, { expiresIn: '1h' });

describe('Investment Opportunities API', () => {
  let app;

  beforeAll(() => {
    app = createApp({ enableTestRoutes: true });
  });

  describe('GET /api/invest/opportunities', () => {
    it('should return 401 if no token is provided', async () => {
      const response = await request(app).get('/api/invest/opportunities');
      expect(response.status).toBe(401);
    });

    it('should return 200 with list of opportunities when authenticated', async () => {
      const response = await request(app)
        .get('/api/invest/opportunities')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.message).toBe('Investment opportunities retrieved successfully.');
    });

    it('should match the required JSON shape (DTO) aligned to Soroban reads', async () => {
      const response = await request(app)
        .get('/api/invest/opportunities')
        .set('Authorization', `Bearer ${validToken}`);

      const item = response.body.data[0];
      
      // Mandatory DTO fields per #135
      expect(item).toHaveProperty('invoiceId');
      expect(item).toHaveProperty('fundedBpsOfTarget');
      expect(item).toHaveProperty('maturityAt');
      expect(item).toHaveProperty('yieldBpsDisplay');
      expect(item).toHaveProperty('onChain');
      
      // On-chain pointers
      expect(item.onChain).toHaveProperty('escrowAddress');
      expect(item.onChain).toHaveProperty('ledgerIndex');
      
      // Type checks
      expect(typeof item.invoiceId).toBe('string');
      expect(typeof item.fundedBpsOfTarget).toBe('number');
      expect(typeof item.yieldBpsDisplay).toBe('number');
      expect(typeof item.onChain.escrowAddress).toBe('string');
    });

    it('should support pagination via page and limit query params', async () => {
      const response = await request(app)
        .get('/api/invest/opportunities?page=1&limit=1')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.meta).toMatchObject({
        page: 1,
        limit: 1,
        total: 3,
        totalPages: 3
      });
    });

    it('should handle edge-case pagination inputs gracefully', async () => {
      const response = await request(app)
        .get('/api/invest/opportunities?page=invalid&limit=-50')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      // Fallback logic in service: page -> 1, limit -> 1 (min)
      expect(response.body.meta.page).toBe(1);
      expect(response.body.meta.limit).toBe(1);
    });
  });
});
