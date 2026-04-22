const {
  DEFAULT_BASE_URL,
  loadLoadTestConfig,
  getLoadScenarios,
  buildAuthHeaders,
  assertSafeBaseUrl,
  parsePositiveInteger,
} = require('./config');

describe('loadLoadTestConfig', () => {
  it('uses safe defaults', () => {
    const config = loadLoadTestConfig({});

    expect(config.baseUrl).toBe(DEFAULT_BASE_URL);
    expect(config.durationSeconds).toBe(15);
    expect(config.connections).toBe(10);
    expect(config.timeoutSeconds).toBe(10);
    expect(config.authToken).toBeNull();
    expect(config.escrowInvoiceId).toBe('placeholder-invoice');
  });

  it('rejects remote targets by default', () => {
    expect(() => loadLoadTestConfig({ LOAD_BASE_URL: 'https://api.example.com' })).toThrow(
      /Remote load targets are blocked by default/,
    );
  });

  it('allows remote targets with explicit opt-in', () => {
    const config = loadLoadTestConfig({
      LOAD_BASE_URL: 'https://api.example.com',
      ALLOW_REMOTE_LOAD_BASELINES: 'true',
    });

    expect(config.baseUrl).toBe('https://api.example.com');
  });
});

describe('getLoadScenarios', () => {
  it('builds the canonical endpoint set', () => {
    const scenarios = getLoadScenarios({
      authToken: 'secret',
      escrowInvoiceId: 'invoice-123',
    });

    expect(scenarios.map((scenario) => scenario.path)).toEqual([
      '/health',
      '/api/invoices',
      '/api/escrow/invoice-123',
    ]);
    expect(scenarios[1].headers.Authorization).toMatch(/^Bearer /);
  });
});

describe('buildAuthHeaders', () => {
  it('omits authorization when no token is provided', () => {
    expect(buildAuthHeaders(null)).toEqual({});
    expect(buildAuthHeaders('abc')).toEqual({ Authorization: 'Bearer abc' });
  });
});

describe('assertSafeBaseUrl', () => {
  it('accepts local targets', () => {
    expect(() => assertSafeBaseUrl('http://127.0.0.1:3001', false)).not.toThrow();
    expect(() => assertSafeBaseUrl('http://localhost:3001', false)).not.toThrow();
  });
});

describe('parsePositiveInteger', () => {
  it('validates numeric inputs', () => {
    expect(parsePositiveInteger('5', 10, 'VALUE')).toBe(5);
    expect(parsePositiveInteger(undefined, 10, 'VALUE')).toBe(10);
    expect(() => parsePositiveInteger('0', 10, 'VALUE')).toThrow(/VALUE must be a positive integer/);
    expect(() => parsePositiveInteger('abc', 10, 'VALUE')).toThrow(/VALUE must be a positive integer/);
  });
});
