---
title: "API: Replace `/api/invoices` placeholder with persisted invoice list + status filters"
labels: ["area:api", "type:feature", "stack:nodejs"]
type: Task
---

## Description

Add a data layer (choose SQLite or Postgres; justify in ADR) so `GET/POST /api/invoices` returns real records with verification states (pending, approved, on_chain).

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.
- Idempotency keys for `POST` optional but document decision.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-invoices-persist`
- Implement and validate:
  - `src/routes/invoices.js` (new) or `src/index.js` refactor
  - `migrations/…` (if used)
  - `tests/invoices.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): persist invoice records and list filters
```


++++++

---
title: "Stellar: Soroban RPC config (`SOROBAN_RPC_URL`, `NETWORK_PASSPHRASE`) with fail-fast health"
labels: ["area:stellar", "type:feature", "stack:stellar"]
type: Task
---

## Description

Centralize Stellar config in a module, validate on boot, and expose a `/health` section showing RPC reachability (not secrets).

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/stellar-soroban-config`
- Implement and validate:
  - `src/config/stellar.js`
  - `src/index.js`
  - `tests/health.stellar.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(stellar): validate soroban rpc configuration at boot
```


++++++

---
title: "Escrow API: Map `GET /api/escrow/:invoiceId` to `LiquifactEscrow` on-chain read calls"
labels: ["area:api", "type:test", "stack:nodejs"]
type: Task
---

## Description

For a given invoice, resolve the deployed **contract id** and read on-chain `get_escrow`, `get_legal_hold`, and related getters to return JSON a UI can use.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.
- If contract id mapping is not yet in DB, stub with a secure allowlist in env for dev only.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-escrow-onchain-read`
- Implement and validate:
  - `src/services/escrowRead.js`
  - `src/index.js`
  - `tests/escrow.read.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): read liquifact escrow state from soroban
```


++++++

---
title: "OpenAPI 3 spec for all public JSON endpoints and publish `/openapi.json`"
labels: ["area:api", "type:docs", "stack:openapi"]
type: Task
---

## Description

Add machine-readable OpenAPI for `health`, `invoices`, `escrow` and wire `/docs` redirect or static page if cost-effective.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b docs/api-openapi-3`
- Implement and validate:
  - `openapi.yaml` (or `openapi.json`)
  - `src/index.js` route
  - `README.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
docs(api): add openapi 3 for liquifact json endpoints
```


++++++

---
title: "Security: CORS + JSON body size limits for production profile"
labels: ["area:api", "type:security", "stack:secrets"]
type: Task
---

## Description

Harden CORS to configured origins, cap body size, and add basic request logging without leaking secrets.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.
- Document env vars: `CORS_ORIGINS`.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b chore/api-hardening-cors-limits`
- Implement and validate:
  - `src/index.js` or `src/middleware/security.js`
  - `tests/security.middleware.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
fix(api): tighten cors and request body limits for prod
```


++++++

---
title: "Escrow event ingest: store latest contract events in DB for `invoiceId` (Horizon/websockets strategy)"
labels: ["area:escrow", "type:sync", "stack:stellar"]
type: Task
---

## Description

Propose a durable indexer approach for Stellar: poll `/ledgers` / filtered streams vs captive-core (document). Persist events needed for off-chain state projection.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.
- **Do not** guess secret keys; use read-only Stellar key if you need a signing account, separate issue.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/indexer-escrow-events`
- Implement and validate:
  - `src/jobs/escrowIndexer.js`
  - `src/index.js` (opt-in start)
  - DB schema for events / projections

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(escrow): persist stellar events for liquifact escrows
```


++++++

---
title: "CI: GitHub Actions to run Jest, lint, and (optional) integration tests with stubbed Stellar"
labels: ["area:api", "type:chore", "stack:ci"]
type: Task
---

## Description

Add a workflow mirroring the frontend pattern; use Node 20+ and cache npm. Fail on lint + tests.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b ci/backend-workflow`
- Implement and validate:
  - .github/workflows/ci.yml
  - package.json scripts (test, lint) if missing

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
ci: add node test and lint pipeline for liquifact backend
```


++++++

---
title: "Test harness: `supertest` for `/health`, `/api`, 404, and 500 error handler"
labels: ["area:api", "type:feature", "stack:nodejs"]
type: Task
---

## Description

Add integration tests in-process server boot; test JSON shapes and CORS preflight in minimal cases.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b test/api-supertest-core`
- Implement and validate:
  - `tests/server.test.js`
  - `package.json` devDependencies

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
test(api): supertest coverage for health and 404/500
```


++++++

---
title: "Input validation: Zod (or joi) schemas for invoice create + pagination query params"
labels: ["area:stellar", "type:feature", "stack:stellar"]
type: Task
---

## Description

Reject malformed payloads with structured 400 JSON: `{error, fieldErrors}` pattern.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-zod-invoices`
- Implement and validate:
  - `src/schemas/invoice.js`
  - `src/index.js` or routes
  - `tests/validation.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): add zod validation for invoice create
```


++++++

---
title: "Webhooks: emit `escrow_funded` / `escrow_settled` webhooks to merchant URLs with HMAC signatures"
labels: ["area:api", "type:test", "stack:nodejs"]
type: Task
---

## Description

Event-driven webhooks for integrating SMEs; idempotency and retries left to queue in follow-up, but this issue defines signing + spec.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-webhooks-escrow`
- Implement and validate:
  - `src/services/webhooks.js`
  - `tests/webhooks.signing.test.js`
  - `docs/webhooks.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): hmac webhooks for escrow state transitions
```


++++++

---
title: "Stellar: resolve contract id by **invoice** using registry allowlist and env mapping file"
labels: ["area:api", "type:docs", "stack:openapi"]
type: Task
---

## Description

For early phases, use `ESCROW_ADDR_BY_INVOICE` in env; document rotation and multi-env separation.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b config/escrow-address-mapping`
- Implement and validate:
  - `src/config/escrowMap.js`
  - `.env.example`
  - `README.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(config): invoice to escrow address mapping for reads
```


++++++

---
title: "Soroban: robust error mapping from RPC `invoke` failures to user-safe messages"
labels: ["area:api", "type:security", "stack:secrets"]
type: Task
---

## Description

Map common Soroban/transaction errors to 502/400 without leaking node internals. Include a correlation id.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/soroban-error-mapping`
- Implement and validate:
  - `src/services/sorobanClient.js`
  - `tests/soroban.errors.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(soroban): map contract call errors to safe http responses
```


++++++

---
title: "Rate limit: per-IP + per-API key for public endpoints (express-rate-limit)"
labels: ["area:escrow", "type:sync", "stack:stellar"]
type: Task
---

## Description

Add a practical default that protects the placeholder APIs when exposed publicly, with `RATE_LIMIT` envs.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b chore/rate-limit-api`
- Implement and validate:
  - `src/middleware/rateLimit.js`
  - `src/index.js`
  - `tests/rateLimit.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
fix(api): add rate limiting to public express routes
```


++++++

---
title: "API versioning: `/v1/...` prefix and deprecation strategy for unversioned paths"
labels: ["area:api", "type:chore", "stack:ci"]
type: Task
---

## Description

Add `/v1/health` + `/v1/...` routes or redirect policy; keep backward compatibility for `GET /api` with warning header.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b docs/api-v1-versioning`
- Implement and validate:
  - `src/routes/v1/…`
  - `README.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): add v1 route namespace with compatibility policy
```


++++++

---
title: "Service auth: `X-API-KEY` for service-to-service calls (SME backoffice) with hashed keys in DB"
labels: ["area:api", "type:feature", "stack:nodejs"]
type: Task
---

## Description

Add optional API key auth to mutating admin routes, stored hashed, rotatable, with audit log entries.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b security/api-key-auth`
- Implement and validate:
  - `src/middleware/apiKey.js`
  - `migrations/…`
  - `tests/apiKey.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(security): api key auth for admin service routes
```


++++++

---
title: "SME KYC: attach `kycStatus` to invoice and enforce before funding endpoints"
labels: ["area:stellar", "type:feature", "stack:stellar"]
type: Task
---

## Description

Align with your compliance story; for now implement schema + gating in API, not a full KYC provider integration unless external keys exist in env (document as optional).

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b compliance/invoice-kyc-gating`
- Implement and validate:
  - `src/schemas/invoice.js`
  - `src/routes/…`
  - `tests/kyc.gating.test.js`
  - `docs/compliance.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(compliance): model kyc status and gate funding
```


++++++

---
title: "Soroban: submit funding transactions (server-orchestrated) via custodial or delegated signing (design + stub)"
labels: ["area:api", "type:test", "stack:nodejs"]
type: Task
---

## Description

**Design-only in code where signing keys are absent:** deliver an interface for `fund` and document custodial key management in `docs/ops-signing.md`.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b design/escrow-fund-flow-stub`
- Implement and validate:
  - `src/services/escrowSubmit.js` (no live signing without env)
  - `docs/ops-signing.md`
  - `tests/escrowSubmit.stub.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
docs(escrow): add custodial fund signing design stub
```


++++++

---
title: "Stellar: memo strategy for on-chain `invoiceId` to reduce ambiguity (separate from Soroban symbol)"
labels: ["area:api", "type:docs", "stack:openapi"]
type: Task
---

## Description

If using payments alongside Soroban, document memo + mapping; for Soroban-only, document that invoice id is contract-local.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b docs/stellar-memo-escrow`
- Implement and validate:
  - `docs/invoice-correlation.md`
  - `README.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
docs(stellar): document memo and invoice correlation strategy
```


++++++

---
title: "Data retention: job to purge PII in invoices after N days, legal holds respected"
labels: ["area:api", "type:security", "stack:secrets"]
type: Task
---

## Description

Add retention policy and dry-run; never delete on-chain, only off-chain PII in DB (clear definitions).

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b compliance/data-retention`
- Implement and validate:
  - `src/jobs/retentionPurge.js`
  - `docs/retention.md`
  - `tests/retention.dryRun.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(compliance): retention purge job for off-chain pii
```


++++++

---
title: "Audit log: DB table of admin actions and webhook deliveries (append-only)"
labels: ["area:escrow", "type:sync", "stack:stellar"]
type: Task
---

## Description

For operational transparency: who changed KYC, who rotated keys, webhook dispatch outcomes with redactions.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b security/audit-log`
- Implement and validate:
  - `migrations/…`
  - `src/middleware/auditLog.js`
  - `tests/auditLog.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(security): append-only audit log for admin actions
```


++++++

---
title: "Escrow: expose derived fields — APY, funded percent, days-to-maturity — computed server-side"
labels: ["area:api", "type:chore", "stack:ci"]
type: Task
---

## Description

Add computed fields in JSON to simplify UI, using ledger time assumptions documented; watch integer rounding.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-escrow-derived`
- Implement and validate:
  - `src/services/escrowDerived.js`
  - `tests/escrow.derived.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): return derived escrow display fields in json
```


++++++

---
title: "Soroban: batch read multiple contract ids for marketplace listing (cursor pagination for invoice query)"
labels: ["area:api", "type:feature", "stack:nodejs"]
type: Task
---

## Description

For `/api/invest/list`, implement batched on-chain read with concurrency limits, timeouts, and per-call failure isolation.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-escrow-batch-read`
- Implement and validate:
  - `src/services/escrowBatchRead.js`
  - `tests/escrow.batch.test.js` (mocked RPC)

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
perf(api): batch read escrow contracts for marketplace
```


++++++

---
title: "SME APIs: `POST /api/sme/invoice` upload (PDF) + off-chain store (S3-compatible) behind signed URL"
labels: ["area:stellar", "type:feature", "stack:stellar"]
type: Task
---

## Description

File upload to object storage, metadata only in DB, virus scan hook stub (document with TODO).

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/sme-pdf-upload`
- Implement and validate:
  - `src/routes/sme.js`
  - `src/services/storage.js`
  - `.env.example` keys
  - `tests/sme.upload.test.js` (mock s3)

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(sme): invoice pdf upload to object storage with metadata in db
```


++++++

---
title: "SME APIs: `GET /api/sme/invoice/:id` with authorization via wallet binding (design + stub)"
labels: ["area:api", "type:test", "stack:nodejs"]
type: Task
---

## Description

Define a binding process between Stellar address and user account. Implement stub validation until wallet auth is ready.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b auth/sme-wallet-bind-stub`
- Implement and validate:
  - `src/middleware/smeAuth.js`
  - `tests/smeAuth.stub.test.js`
  - `docs/wallet-auth.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(auth): sme wallet binding stub and invoice ownership checks
```


++++++

---
title: "Stellar: robust fee bump / retry for submitted Soroban transactions in async worker"
labels: ["area:api", "type:docs", "stack:openapi"]
type: Task
---

## Description

For future submitter module, add retry with exponential backoff for `tx_bad_seq` and timeout cases (mocked tests).

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b reliability/stellar-tx-retry`
- Implement and validate:
  - `src/workers/txSubmitter.js` (stubbed)
  - `tests/txSubmitter.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(stellar): retry and fee bump design for async submissions (mocked)
```


++++++

---
title: "DB migrations runner (node-pg-migrate or Prisma) — pick one, justify, and wire npm scripts"
labels: ["area:api", "type:security", "stack:secrets"]
type: Task
---

## Description

Keep migrations out of ad-hoc SQL. Document local dev: docker compose for Postgres (optional) vs SQLite for fast tests.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b chore/db-migrate-tooling`
- Implement and validate:
  - `docker-compose.dev.yml` (optional)
  - `migrations/…`
  - `README.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
chore: add database migrations and dev compose stack
```


++++++

---
title: "TypeScript migration plan for `src` (no big-bang): allow `.ts` incrementally (optional flag)"
labels: ["area:escrow", "type:sync", "stack:stellar"]
type: Task
---

## Description

Add tsconfig, compile step in dev if desired, or use JSDoc strict mode first — choose minimal viable approach.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b chore/ts-incremental-plan`
- Implement and validate:
  - `tsconfig.json` (optional)
  - `docs/typescript-plan.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
chore: plan incremental ts adoption for express api (jsdoc or tsconfig)
```


++++++

---
title: "Error model: `application/problem+json` for 4xx/5xx in hot paths (RFC 7807 light)"
labels: ["area:api", "type:chore", "stack:ci"]
type: Task
---

## Description

Unify error responses with `type`, `title`, `status`, and optional `instance` = request id header.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b chore/api-problem-json`
- Implement and validate:
  - `src/middleware/problemJson.js`
  - `tests/problems.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
refactor(api): rfc7807 style problem+json for errors
```


++++++

---
title: "Observability: request id middleware, structured JSON logs, and pino (or winston) integration"
labels: ["area:api", "type:feature", "stack:nodejs"]
type: Task
---

## Description

Add `x-request-id` and consistent log fields. Remove `console.log` in hot code paths in favor of logger.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b chore/obs-structured-logs`
- Implement and validate:
  - `src/middleware/requestId.js`
  - `src/logger.js`
  - `package.json`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(obs): structured logging and request ids for express
```


++++++

---
title: "Soroban: cache contract spec / footprint reads in Redis (optional) with strict TTLs"
labels: ["area:stellar", "type:feature", "stack:stellar"]
type: Task
---

## Description

For high-traffic read endpoints, implement Redis `GET` of computed summaries with invalidation on ledger gap > threshold. Document when disabled.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b perf/redis-escrow-cache-optional`
- Implement and validate:
  - `src/cache/redis.js`
  - `.env.example`
  - `tests/cache.redis.test.js` (ioredis mock optional)

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
perf(cache): optional redis for escrow read summaries
```


++++++

---
title: "Marketplace: search/sort for invoices by `yield_bps`, maturity, funded ratio (backed by DB, not on-chain only)"
labels: ["area:api", "type:test", "stack:nodejs"]
type: Task
---

## Description

Add indexes, query param validation, and test coverage for edge sorts.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-marketplace-query`
- Implement and validate:
  - `src/routes/marketplace.js`
  - `migrations/…` indexes
  - `tests/marketplace.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): marketplace list sorting and search
```


++++++

---
title: "SME: settlement reminders scheduler (email stub) 7 days pre-maturity"
labels: ["area:api", "type:docs", "stack:openapi"]
type: Task
---

## Description

Cancellable jobs per invoice, template strings externalized, dry-run in tests; real SMTP provider behind env (optional).

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b ops/settlement-email-stub`
- Implement and validate:
  - `src/jobs/maturityReminders.js`
  - `tests/maturityReminders.test.js`
  - `docs/email-ops.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(ops): pre-maturity settlement reminder job (email stubbed)
```


++++++

---
title: "Security: `helmet` and basic HTTP security headers for the Express app"
labels: ["area:api", "type:security", "stack:secrets"]
type: Task
---

## Description

Hardening defaults, configurable; tests ensure headers on `/health` and a sample API route.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b security/helmet-express`
- Implement and validate:
  - `src/index.js` or middleware
  - `tests/security.headers.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
fix(security): add helmet security headers to express
```


++++++

---
title: "Escrow: reconcile on-chain `funded_amount` with DB `fundedTotal` in nightly job + mismatch alerts"
labels: ["area:escrow", "type:sync", "stack:stellar"]
type: Task
---

## Description

Reconciliation is critical: detect drift and surface status in `/health` or a `/internal/reconcile` route behind auth (optional).

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b ops/escrow-reconciliation-nightly`
- Implement and validate:
  - `src/jobs/reconcileEscrow.js`
  - `tests/reconcile.mocks.test.js`
  - `docs/ops-reconcile.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(ops): nightly reconcile of escrow db and soroban funded amounts
```


++++++

---
title: "Soroban: simulation-first policy — simulate before any submit, record footprint"
labels: ["area:api", "type:chore", "stack:ci"]
type: Task
---

## Description

Utility module `simulateOrThrow` used by all submit paths; add tests for failing simulations.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/soroban-simulate-first`
- Implement and validate:
  - `src/services/sorobanSim.js`
  - `tests/soroban.sim.test.js` (mocked)

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(soroban): simulate all writes before submit with stored footprints
```


++++++

---
title: "Invoices: attach `invoice_hash` to PDF bytes (SHA-256) and allow integrity verification"
labels: ["area:api", "type:feature", "stack:nodejs"]
type: Task
---

## Description

Store hash, expose `GET` verification, protect against file tamper (document).

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b compliance/invoice-integrity`
- Implement and validate:
  - `src/routes/invoiceFile.js`
  - `tests/invoice.integrity.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(security): store sha256 of invoice files for integrity checks
```


++++++

---
title: "SME dashboard JSON: `GET /api/sme/metrics` — count open, funded, settled, defaulted (definitions)"
labels: ["area:stellar", "type:feature", "stack:stellar"]
type: Task
---

## Description

Clarify default/withdrawn semantics; align with on-chain `status` mapping table from contracts docs.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/sme-dashboard-metrics`
- Implement and validate:
  - `src/routes/sme/metrics.js`
  - `tests/sme.metrics.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(sme): dashboard summary metrics for invoice portfolio
```


++++++

---
title: "Soroban: contract list refresh job when new `LiquifactEscrow` wasm version deployed (admin)"
labels: ["area:api", "type:test", "stack:nodejs"]
type: Task
---

## Description

Registry module with semver + `SCHEMA_VERSION` from chain reads; this is a deployment ops concern — document the procedure.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b ops/escrow-wasm-versioning`
- Implement and validate:
  - `docs/wasm-ops.md`
  - `src/config/escrowVersions.js` (optional)

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
docs(ops): procedure for new liquifact wasm deployment and version registry
```


++++++

---
title: "Investor: `GET /api/invest/opportunities` with pagination + DTOs aligned to Soroban reads"
labels: ["area:api", "type:docs", "stack:openapi"]
type: Task
---

## Description

List investable items from your projection DB with stable JSON shape: `invoiceId`, `fundedBpsOfTarget`, `maturityAt`, `yieldBpsDisplay`, and `onChain` pointers.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-invest-list`
- Implement and validate:
  - `src/routes/invest.js`
  - `tests/invest.list.test.js`
  - `migrations/…` if new tables

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): paginated invest opportunity list for marketplace
```


++++++

---
title: "SME: `PATCH /api/invoices/:id` to transition verification status with audit (admin-only or signed)"
labels: ["area:api", "type:security", "stack:secrets"]
type: Task
---

## Description

State machine: `pending` → `approved` → `linked_escrow` with who/when in audit log; no silent jumps.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-invoice-lifecycle`
- Implement and validate:
  - `src/routes/invoices.js`
  - `src/middleware/…` as needed
  - `tests/invoice.state.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(sme): invoice verification transition api with audit
```


++++++

---
title: "Soroban: decode `get_attestation_append_log` and expose digests in investor diligence payload"
labels: ["area:escrow", "type:sync", "stack:stellar"]
type: Task
---

## Description

For regulatory UX, return append-only attestation list with hex of each digest and index, aligned to `DataKey::AttestationAppendLog`.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.
- Redact nothing that is public already on-chain, but do not add off-chain PII in same object.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-attestation-digests`
- Implement and validate:
  - `src/services/escrowRead.js`
  - `tests/escrow.attestations.test.js` (mocked on-chain return)

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): expose on-chain attestation digests in diligence payload
```


++++++

---
title: "Observability: `GET /metrics` Prometheus for queue depth, Soroban latency histograms, error codes"
labels: ["area:api", "type:chore", "stack:ci"]
type: Task
---

## Description

Add `prom-client` and secure `/metrics` behind `METRICS_BEARER` or private network. Document in README.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b ops/prometheus-metrics`
- Implement and validate:
  - `src/metrics.js`
  - `src/index.js` (mount)
  - `tests/metrics.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(obs): add prometheus /metrics for api and rpc timings
```


++++++

---
title: "Soroban: legal hold read-through — `GET` includes `legalHold: boolean` and blocks optimistic UI in clients"
labels: ["area:api", "type:feature", "stack:nodejs"]
type: Task
---

## Description

Map `get_legal_hold` into escrow JSON and document client expectations for `502`-style gating of funding actions server-side (even before tx submit exists).

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-escrow-legal-hold`
- Implement and validate:
  - `src/services/escrowRead.js`
  - `tests/escrow.legalhold.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): project legal hold into escrow read json
```


++++++

---
title: "Multi-network: `STELLAR_NETWORK=TESTNET|MAINNET|FUTURENET` switch with `SOROBAN_RPC` per network (document matrix)"
labels: ["area:stellar", "type:feature", "stack:stellar"]
type: Task
---

## Description

Harden `src/config` so a single deploy cannot mix passphrases with wrong RPC. Add a boot-time assert.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b chore/stellar-network-matrix`
- Implement and validate:
  - `src/config/stellar.js`
  - `.env.example`
  - `README.md`
  - `tests/config.stellar.test.js`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
chore: enforce stellar network to rpc and passphrase matrix
```


++++++

---
title: "SME: `POST /api/sme/invoice` validation for counterparty, amount, due date, and Stellar `invoice_id` string rules (mirror on-chain `Symbol` subset)"
labels: ["area:api", "type:test", "stack:nodejs"]
type: Task
---

## Description

Enforce the same `invoice_id` charset/length as `MAX_INVOICE_ID_STRING_LEN` in contracts to prevent deploy mismatches later.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.
- Cross-link to `liquifact-contracts` `validate_invoice_id_string` policy.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b compliance/invoice-payload-validate`
- Implement and validate:
  - `src/schemas/invoice.js` (or zod file)
  - `tests/invoice_id.charset.test.js`
  - `docs/invoice-id.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(validation): align off-chain invoice id with soroban symbol rules
```


++++++

---
title: "Soroban: funding-close snapshot in API: expose `fundingCloseSnapshot` block when on-chain has `Some`"
labels: ["area:api", "type:docs", "stack:openapi"]
type: Task
---

## Description

Map `get_funding_close_snapshot` to JSON: `totalPrincipal`, `fundingTarget`, `closedAtLedger`, `closedAtSeq` for pro-rata tools.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-snapshot-dto`
- Implement and validate:
  - `src/services/escrowRead.js`
  - `tests/escrow.snapshot.dto.test.js` (mocked)

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): return funding close snapshot in escrow read dto
```


++++++

---
title: "Security: Sentry (or similar) for uncaught server errors, with PII scrubber + release tags"
labels: ["area:api", "type:security", "stack:secrets"]
type: Task
---

## Description

Add optional Sentry; scrub invoice bodies, tokens, and Stellar XDR. Document `SENTRY_DSN` pattern.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b chore/obs-sentry-optional`
- Implement and validate:
  - `src/observability/sentry.js` (optional import)
  - `src/index.js`
  - `README.md`

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(obs): optional sentry with pii scrub for express
```


++++++

---
title: "Soroban: investor commitment surface — from DB mirror, expose `claimNotBefore` and `investorEffectiveYieldBps` per funder (when indexed)"
labels: ["area:escrow", "type:sync", "stack:stellar"]
type: Task
---

## Description

This depends on per-address indexing or batched on-chain read; for MVP, document limits and return partials with `stale: true` if needed.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-investor-locks`
- Implement and validate:
  - `src/routes/investor.js`
  - `tests/investor.locks.test.js`
  - `docs/indexing.md` (short)

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): expose investor lock and effective yield bps in investor views
```


++++++

---
title: "E2E smoke script: `npm run e2e:api` with docker-compose of API + test Postgres and mocked Soroban"
labels: ["area:api", "type:chore", "stack:ci"]
type: Task
---

## Description

A reproducible one-command `docker compose` profile for new contributors, hitting `/health` and `GET /v1/escrow/…` (mocked).

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b chore/e2e-smoke-api`
- Implement and validate:
  - `docker-compose.e2e.yml` (optional at repo root)
  - `scripts/e2e-api.sh`
  - `README.md` section

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
chore: add e2e smoke compose for local api and db
```


++++++

---
title: "Soroban: funding token metadata (`symbol`, `decimals`) cached for `GET /api/escrow/…` to avoid double-rounding in UI"
labels: ["area:api", "type:feature", "stack:nodejs"]
type: Task
---

## Description

Fetch or cache Stellar `SEP-41` token details next to the escrow DTO; TTL + invalidation strategy documented. Mock in tests when RPC is unavailable.

## Requirements and context

- Work is scoped to **LiquiFact** `liquifact-backend` (Express); align with on-chain `LiquifactEscrow` and Stellar when relevant.
- Must be secure, tested, and documented; production-quality error handling and env docs.
- Never use cached decimals to compute principal on chain; on-chain is source of truth.

## Suggested execution

- Fork the repo and create a branch:
  - `git checkout -b feature/api-funding-token-meta`
- Implement and validate:
  - `src/services/tokenMeta.js` (new)
  - `src/services/escrowRead.js`
  - `tests/escrow.tokenMeta.test.js` (mocked)

- Open a PR with test output, API examples (`curl` or OpenAPI), and any **security notes** (input validation, auth, key handling).

## Guidelines

- Minimum **95%** line coverage on new/changed backend code (Jest or project-standard runner).
- No secrets in repo; use `.env` + deployment secrets only.
- **Timeframe:** 96 hours from assignment (unless otherwise agreed with maintainers).
- Align with the existing **Express** gateway in `src/index.js` unless the issue explicitly proposes a controlled refactor.

## Example commit message

```
feat(api): include funding token symbol and decimals in escrow dto
```

