# HybridGenAI Academy

## Purpose and current scope
An independent HybridGenAI Academy platform operated by Hybrid Cloud Services LLC. The current direction is Oracle-customer delivery and AI automation, with OpenAI and Oracle prioritized for the first six months, followed by staged Anthropic, xAI, AWS, Azure, and Google research or learning tracks. Provider-issued credentials and partnership claims remain separate from Academy completion records.

## Implemented
- Searchable Codex starter library: 26 online guides, individual Markdown/text downloads, a complete Markdown bundle, and browser print/PDF support.
- Personalized learning roadmap with five goal profiles, experience/time-based schedules, practical deliverables, and a downloadable study plan.
- OpenAI-focused homepage, learning hub, credential guide, about page, and proposed independent guided-training catalog.
- A sourced snapshot of 14 official OpenAI Academy courses with learning outcomes, search, and pathway filters.
- Public/partner program and credential directories covering eight verified routes with access requirements and official sources.
- Official resource links, review date, and distinctions between Academy completion credentials and the separate restricted OpenAI Certified experience.
- Redwood accents, restrained headings, readable text, responsive navigation, and reduced-motion support.
- Native sharing with copy/manual fallbacks, print styling, and social preview metadata/image.
- Direct Forum and Academy event links, provider communication/support destinations, and downloadable calendar reminders.
- PostgreSQL-backed inquiries for proposed independent training.
- Original team-enablement expansion foundation: four proposed programs, delivery method, preparation requirements, enterprise inquiry path, and navigation entry point at `/openai-training/team-enablement`.
- Enterprise inquiry qualification: additive program-interest, team-size, timeframe, and desired-outcome fields with migration `db/migrations/002_team_enablement_inquiries.sql`.
- Staged Academy platform catalog at `/academy` covering provider sequence, track status, evidence states, and independent-provider disclosures.
- Regional partner-center application surface at `/partner-centers` with instructor, legal, privacy, delivery, and quality gates.

## Product boundaries
HybridGenAI is not a provider academy and claims no partnership or certification authority unless separately evidenced. Official learning and provider credentials remain controlled by each provider. Proposed HybridGenAI workshops and practice tests do not provide provider credentials. Private accounts, payments, job matching, partner administration, and tenant-scoped portals require authentication, authorization, privacy controls, and reviewed persistence before implementation.

The old database schema includes unused platform tables. They are legacy scaffolding, not product commitments; no data was dropped during the scope change. Old public routes redirect to the learning hub.

## Documentation
- `AGENTS.md`: coding instructions and current scope.
- `README.md`: setup and feature overview.
- `docs/ARCHITECTURE.md`: runtime and data boundaries.
- `docs/DESIGN_SYSTEM.md`: layout, readability, and motion.
- `docs/OPENAI_CONTENT.md`: source review and sharing configuration.
- `docs/DEVELOPMENT.md` and `docs/DEPLOYMENT.md`: local and Docker operations.
- `docs/IMPLEMENTATION_ROADMAP.md`: in-scope next steps.
- `docs/CODEX_HANDOFF.md`: continuation guidance.
- `docs/VERIFICATION.md`: dated verification evidence.
