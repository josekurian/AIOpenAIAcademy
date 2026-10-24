# Full platform implementation roadmap

## Architecture and isolation
One source monorepo with separate containers for `web`, `api` (FastAPI when introduced), `worker`, `postgres`, `redis` and optional `object-store` for local development. Production deploys should isolate network boundaries, credentials, tenant data, backup and scaling policies. Avoid duplicating source per city: use a versioned shared template and tenant-specific content/configuration. Franchise sites can be deployed independently using distinct Compose project names, environment files, hostnames and isolated data stores where contractually required; central SaaS tenancy is the default for easier upgrades.

## Phase 1 (implemented foundation)
Marketing site, city skeletons, programs, employer/franchise inquiries, private Postgres and Docker Compose.

## Phase 2 — security and operations
- Implement OIDC authentication, MFA for staff, role/permission model and audited administration.
- Apply server-side tenant checks, RLS policies, data retention and consent, spam protection and request throttling.
- Add migrations, CI checks, observability, backups, secret rotation, TLS reverse proxy and test environments.
- Publish reviewed privacy, terms, accessibility and franchise disclosure pages.

## Phase 3 — learner and instructor platform
- Course authoring, content versioning, cohorts, calendars, enrollments, Stripe-like payment provider with webhook verification.
- Student progress, lessons, labs, assignments, instructor approvals, scheduling and evaluations.
- Accessibility, accommodations, refunds and learner support workflows.

## Phase 4 — assessments and credentials
- Question banks, rubric scoring, timed exams, integrity controls, appeals and renewals.
- Academy-issued verifiable credentials with revocation. Distinguish completion badges from formal certifications.
- Official vendor certification preparation only within authorized use and published examination objectives.

## Phase 5 — AI labs and OpenAI training
- Provider-neutral AI gateway with OpenAI integration, budgets, per-student quotas, tracing and evaluations.
- Python/API, prompt design, RAG, pgvector, MCP, tool-using agents, multi-agent workflows, multimodal, speech, security, governance and model evaluation.
- Instructor-reviewed agent exercises; no unrestricted agent access to secrets, billing or SaaS production tenants.
- Curriculum registry: version, provider, objective, prerequisites, lab environment, release/retirement and validation date. Revalidate as APIs and training offerings evolve.

## Phase 6 — job placement and employer marketplace
- Consent-based career profiles, resume/portfolio builder, verified employers, moderated job postings and applicant tracking.
- Employer search, job matching with explainability and opt-out, interviews, events, coaching and reporting.
- Fairness, privacy and anti-discrimination review; no employment or salary guarantees.

## Phase 7 — corporate training
- Organization accounts, SSO, private cohorts, team enrollment, purchase orders, contracts, seat management, dashboards and reports.
- Enterprise connectors to Oracle, SAP and Microsoft use isolated demo tenants and least privilege.

## Phase 8 — franchise platform
- Prospect CRM, territory interest, due diligence, legal gating, FDD tracking, operator onboarding and brand governance.
- Per-city site generation from shared template, local programs, instructors, approved testimonials, schedules and location verification.
- Royalty and revenue reporting, regional support, quality audits, brand asset library, instructor standards.
- No sale or franchise solicitation until legal review and state-by-state registration/disclosure obligations are satisfied.

## Phase 9 — expansion and scale
- Regional deployment options, CDN, async job queues, object storage, background workers, cost controls, failover and disaster recovery.
- Multi-region only when measured demand and legal/data residency requirements justify complexity.

## Course catalog expansion taxonomy
Foundations, ChatGPT productivity, prompt engineering, OpenAI API/Python, RAG, embeddings/vector search, AI agents, agent orchestration, MCP, A2A interoperability, multimodal, voice, realtime, evaluations, LLMOps, observability, AI security/red-teaming, governance, AI solution architecture, Oracle Fusion AI, SAP Business AI, Microsoft Copilot, cloud deployment, AI instructor training, executive enablement. All are *proposed courses*, not official OpenAI certifications.

## Acceptance gates
Each phase requires threat model updates, migration review, automated tests, accessible UI checks, authorization/tenant boundary tests, operational runbooks and rollback strategy. Do not claim production readiness from a successful local build alone.
