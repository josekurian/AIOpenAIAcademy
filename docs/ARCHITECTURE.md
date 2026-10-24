# Current architecture

## Runtime
Next.js 15 App Router with React 19 and TypeScript serves pages and HTTP handlers in one Node.js service. PostgreSQL 17 is the database in Docker Compose. The UI uses plain CSS and Lucide icons. There is no Python API, worker, Redis, AI gateway, authentication service, or payment integration yet.

## Request paths
- `app/layout.tsx` wraps all pages with `components/Nav.tsx`, the main landmark, and footer.
- `components/Nav.tsx` owns route-aware sidebar state and mobile keyboard behavior.
- `app/globals.css` contains the shared design and responsive styles, including reduced motion.
- `app/page.tsx` is the homepage. `/courses`, `/certifications`, `/jobs`, `/enterprise`, `/franchise`, and `/about` provide public information.
- `app/centers/[city]/page.tsx` generates city pages from `lib/catalog.ts`. All listed centers are planned.
- `lib/catalog.ts` is currently the public content source. The `programs` database table is not synchronized with it.

## Inquiry flow
`components/LeadForm.tsx` posts JSON to `/api/leads`. The route validates with Zod and inserts a parameterized query into `leads` through the reusable `pg` pool in `lib/db.ts`.

Valid stored submissions return HTTP 201. Invalid data returns 400. A populated honeypot returns success without saving a row. JSON parsing or database failures currently return 503. The form displays pending, success, and failure states. There is no email delivery or CRM integration.

`GET /api/health` runs `SELECT 1` and returns 200 when connected, otherwise 503. This is database readiness, not proof that the schema or inquiry workflow works.

## Storage and isolation
Compose exposes the web service at host port 3180 by default; the database has no published host port. The named `academy_pgdata` volume holds PostgreSQL data. `db/schema.sql` initializes fresh databases and seeds planned centers. It does not migrate existing databases.

The schema has future-facing tables, but no authentication, tenant enforcement, RLS policies, or migration framework. Do not assume organizations or centers provide isolation merely because they have IDs.

## Extension rules
Introduce authorization and tested data boundaries before private portals. Use additive, versioned migrations with recovery plans. Keep city templates shared. Introduce Python services, queues, or storage systems only when an implemented feature requires them. Future architecture in the roadmap is a target, not a description of this deployment.
