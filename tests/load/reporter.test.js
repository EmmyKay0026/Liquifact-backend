const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  createLoadReport,
  renderMarkdownReport,
  writeLoadReport,
  roundMetric,
  readPercentile,
} = require('./reporter');

describe('createLoadReport', () => {
  it('summarizes successful and failed endpoints', () => {
    const report = createLoadReport([
      {
        name: 'health',
        result: {
          requests: { total: 100, average: 55.4321 },
          latency: { average: 12.345, p50: 11, p97_5: 20.4, p99: 25.7 },
          errors: 0,
          non2xx: 0,
          timeouts: 0,
        },
      },
      {
        name: 'escrow',
        error: new Error('Connection reset'),
      },
    ]);

    expect(report.endpoints[0].throughputRps).toBe(55.43);
    expect(report.endpoints[0].latencyP95Ms).toBe(20.4);
    expect(report.endpoints[1].ok).toBe(false);
    expect(report.totals.okCount).toBe(1);
    expect(report.totals.failedCount).toBe(1);
  });
});

describe('renderMarkdownReport', () => {
  it('includes tabular metrics and failures', () => {
    const markdown = renderMarkdownReport({
      generatedAt: '2026-03-23T10:00:00.000Z',
      totals: { okCount: 1, failedCount: 1 },
      endpoints: [
        {
          name: 'health',
          ok: true,
          requests: 100,
          throughputRps: 50,
          latencyAvgMs: 10,
          latencyP50Ms: 9,
          latencyP95Ms: 15,
          latencyP99Ms: 20,
          errorCount: 0,
          non2xxCount: 0,
          timeoutCount: 0,
        },
        {
          name: 'invoices-list',
          ok: false,
          error: 'Unauthorized',
        },
      ],
    });

    expect(markdown).toMatch(/# Load Baseline Report/);
    expect(markdown).toMatch(/\| health \| ok \| 100 \| 50 \|/);
    expect(markdown).toMatch(/Error for `invoices-list`: Unauthorized/);
  });
});

describe('writeLoadReport', () => {
  it('persists JSON and Markdown artifacts', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'liquifact-load-'));
    const report = {
      generatedAt: '2026-03-23T10:00:00.000Z',
      totals: { okCount: 1, failedCount: 0 },
      endpoints: [],
    };

    const artifacts = writeLoadReport(report, tmpDir);

    expect(fs.existsSync(artifacts.jsonPath)).toBe(true);
    expect(fs.existsSync(artifacts.markdownPath)).toBe(true);
    expect(fs.readFileSync(artifacts.jsonPath, 'utf8')).toMatch(/2026-03-23T10:00:00.000Z/);
  });
});

describe('roundMetric', () => {
  it('rounds to two decimals', () => {
    expect(roundMetric(10.126)).toBe(10.13);
    expect(roundMetric(10.121)).toBe(10.12);
    expect(roundMetric(null)).toBeNull();
  });
});

describe('readPercentile', () => {
  it('falls back to the next available latency percentile', () => {
    expect(readPercentile({ p97_5: 17 }, ['p95', 'p97_5'])).toBe(17);
    expect(readPercentile({ p99: 9 }, ['p95', 'p99'])).toBe(9);
    expect(readPercentile({}, ['p95'])).toBeNull();
  });
});
