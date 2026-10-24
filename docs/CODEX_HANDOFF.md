# Codex implementation handoff

Project location: `/Users/josekurian/AIOpenAIAcademy`. The local Codex workspace can edit this checkout. Inspect the actual environment before assuming access in other sessions.

Start with `AGENTS.md` and `PROJECT.md`. Current architecture is in `docs/ARCHITECTURE.md`; dated checks and remaining verification are in `docs/VERIFICATION.md`. The current user request takes priority over the default continuation below.

You are the lead engineer for HybridGenAI Academy. Inspect the repository, README, roadmap, tests and existing code before making changes. Preserve functional pages and never invent OpenAI authorization, official credentials, customer results, franchise availability or employer partnerships. Treat every city as a planned landing page until independently verified.

**Default next platform phase (when requested):** Implement Phase 2 security and operations, then Phase 3 learner MVP, in small testable commits. Keep PostgreSQL as system of record and Docker Compose as local deployment contract. Introduce FastAPI only when the Python AI/lab services require it; avoid unnecessary services. Implement real authentication and authorization before exposing admin endpoints. Add migrations and tenant-level tests. Ensure no personal data crosses center/organization boundaries. Add request rate limiting, consent capture, privacy notices, backups and monitoring before public lead capture goes live.

**Franchise distribution:** Build a site-template package with city configuration (slug, name, address, verified operating status, approved contact details, local offerings). Implement a repeatable `docker compose -p academy_CITY` deployment profile with unique ports, credentials and volumes only when independent deployments are justified. Maintain shared source, automated updates and per-city isolation; do not fork and manually edit 50 copies.

**Verification:** Run `npm run typecheck`, `npm test`, `npm run build`, Docker Compose health checks and browser E2E tests. Report actual results, missing provider credentials and outstanding security gaps. Ask before destructive database migrations or external account actions.
