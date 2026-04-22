'use strict';

/**
 * Invest Service
 * Handles data retrieval for investment opportunities with pagination and 
 * DTO mapping aligned to Soroban on-chain state.
 * 
 * @module services/investService
 */

/**
 * @typedef {Object} InvestmentOpportunity
 * @property {string} invoiceId - Unique identifier of the underlying invoice.
 * @property {number} fundedBpsOfTarget - Progress towards funding target in basis points (10000 = 100%).
 * @property {string} maturityAt - ISO timestamp when the investment matures.
 * @property {number} yieldBpsDisplay - Expected return in basis points (e.g. 500 = 5%).
 * @property {Object} onChain - Pointers to blockchain state.
 * @property {string} onChain.escrowAddress - Stellar/Soroban escrow contract address.
 * @property {string} onChain.ledgerIndex - The last ledger index synchronized for this opportunity.
 */

// In-memory projection of investable items.
// In a real environment, this would be updated via event-listeners from Stellar.
const opportunities = [
  {
    invoiceId: 'inv_7788',
    fundedBpsOfTarget: 2500, // 25% funded
    maturityAt: '2026-06-15T00:00:00Z',
    yieldBpsDisplay: 850, // 8.5%
    onChain: {
      escrowAddress: 'CABCDE1234567890FGHIJKLMN',
      ledgerIndex: '124450',
    },
  },
  {
    invoiceId: 'inv_2244',
    fundedBpsOfTarget: 9500, // 95% funded
    maturityAt: '2026-05-20T00:00:00Z',
    yieldBpsDisplay: 700, // 7.0%
    onChain: {
      escrowAddress: 'CZXCVB0987654321QWERTYUIO',
      ledgerIndex: '124455',
    },
  },
  {
    invoiceId: 'inv_9900',
    fundedBpsOfTarget: 0, // 0% funded
    maturityAt: '2026-09-01T00:00:00Z',
    yieldBpsDisplay: 1200, // 12%
    onChain: {
      escrowAddress: 'CPOLKJHGFDSA4321MNBVCXZA',
      ledgerIndex: '124460',
    },
  },
];

/**
 * Retrieves paginated list of investment opportunities.
 *
 * @param {Object} [options={}] - Pagination and filtering options.
 * @param {number} [options.page=1] - Page number (1-based).
 * @param {number} [options.limit=10] - Items per page.
 * @returns {Promise<{data: InvestmentOpportunity[], meta: Object}>}
 */
async function getOpportunities({ page = 1, limit = 10 } = {}) {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitSize = Math.max(1, Math.min(100, parseInt(limit, 10) || 10)); // Cap limit at 100
  
  const start = (pageNum - 1) * limitSize;
  const end = start + limitSize;
  
  const paginatedData = opportunities.slice(start, end);
  
  return {
    data: paginatedData,
    meta: {
      total: opportunities.length,
      page: pageNum,
      limit: limitSize,
      totalPages: Math.ceil(opportunities.length / limitSize),
    },
  };
}

module.exports = {
  getOpportunities,
  opportunities, // Export for tests
};
