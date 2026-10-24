# Repository instructions

## Start here
Read `PROJECT.md`, `README.md`, and `docs/CODEX_HANDOFF.md` before changing behavior. Consult `docs/ARCHITECTURE.md` for runtime boundaries and `docs/IMPLEMENTATION_ROADMAP.md` for future phases. The user's current request defines scope; the roadmap is not automatic authorization to implement every phase.

## Product truth
- This is HybridGenAI Academy's public-site foundation, operated by Hybrid Cloud Services LLC.
- Preserve the independent-provider disclosures. Do not imply OpenAI affiliation, official vendor certification, guaranteed employment, verified partners, or operating centers without supporting evidence.
- HybridGenAI catalog offerings and guided workshops are proposed; official OpenAI resources are separately sourced. Database tables are not proof of working learner, credential, employer, or franchise workflows.
- Never add fake dashboards, enrollment counts, testimonials, payments, or working-looking controls without their underlying behavior.

## Engineering conventions
- Use TypeScript and Next.js App Router. Keep pages server components; use client components only for browser state and interaction.
- Reuse the shared navigation, layout, catalog, and form. Keep retired routes redirected to `/openai-training`. Official resource data lives in `lib/openai-learning.ts`; proposed workshops live in `lib/catalog.ts`.
- PostgreSQL is the system of record. Parameterize SQL and validate API inputs on the server. Do not return internal errors or log lead content or secrets.
- The current database has no enforced tenant isolation. Do not expose account/admin functionality until authentication, authorization, and scoped data access exist.
- Avoid adding services or animation dependencies without a concrete need. Keep animations subtle and honor `prefers-reduced-motion`.
- Preserve keyboard navigation, visible focus, form labels, mobile menu behavior, and accurate `aria-current` state. Follow `docs/DESIGN_SYSTEM.md`.
- Use the lockfile with `npm ci`. Keep project tool configurations local so ancestor folders do not change build behavior.
- Do not overwrite local `.env` files. Never commit secrets, `.next`, dependency directories, database dumps, or personal lead data.

## Verification and delivery
Run `npm run typecheck`, `npm test`, and `npm run build` after meaningful changes. Run `npm run lint` for code changes. Read `docs/DEVELOPMENT.md` for browser checks. Do not run Next development and production builds against the same `.next` directory concurrently.

For database work, add versioned migrations and relevant integration tests; `db/schema.sql` only initializes a fresh volume. Do not reset populated volumes to apply schema changes. Confirm destructive operations with the user unless already explicitly authorized.

Report what changed, actual verification results, and unresolved limitations. A passing build does not verify Docker, database writes, security, accessibility, or production readiness. Update the relevant canonical document instead of copying status across multiple files.

## Current scope (October 24, 2026)
The user narrowed the entire public site to OpenAI training and credentials only. Do not restore careers, franchise, city-center, or other-vendor content. Use restrained heading sizes, readable body text, and warm redwood accents. Preserve official source dates and links; distinguish completion credentials from certification. No new source changes imply provider authorization.
