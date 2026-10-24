# HybridGenAI Academy — Dockerized website foundation

Independent AI education platform for Hybrid Cloud Services LLC. This repository is an **implemented public-site MVP foundation**, not the completed LMS, credentialing, placement, or franchise ERP system.

## Launch on macOS

```bash
mkdir -p /Users/josekurian/AIOpenAIAcademy
# Unzip the delivered archive into that directory, then:
cd /Users/josekurian/AIOpenAIAcademy
[ -f .env ] || cp .env.example .env
# Replace POSTGRES_PASSWORD with a strong random password
# Ensure Docker Desktop is running
docker compose up --build -d
curl http://localhost:3180/api/health
```

Open http://localhost:3180. The PostgreSQL container is private to the Compose network, and the app uses its own named database volume. This does not modify any existing project or container. Change WEB_PORT if 3180 is already occupied.

## Implemented
- Light responsive interface, persistent desktop sidebar, mobile navigation drawer, and reduced-motion-aware CSS animations
- Eight training program descriptions
- Independent credential/certification-preparation disclosure
- Job-placement support and employer-interest pages (no fake job postings)
- Enterprise training inquiry page
- Franchise exploration and lead collection page
- Eight reusable, city-specific landing pages (all clearly marked planned)
- PostgreSQL tables for training, enrollment, credentials, employer/job and franchise entities
- Database-backed lead submission API with validation and honeypot
- Dockerized Next.js app + PostgreSQL, health endpoint, basic tests

## Not yet implemented / must not be advertised as operational
- Learner login, authentication, payments, LMS, exams, credential issuance and verification
- Actual job board, employer matching, job placement, resume parsing, hiring workflow
- Instructor portal, corporate tenant portal, franchise operator administration
- AI tutor, coding sandboxes, OpenAI API integrations, MCP, RAG, analytics
- Rate limiting, email verification, consent capture, production anti-spam, complete accessibility/security audits
- Franchise legal documentation and registrations, OpenAI authorization, official vendor credentials

## Production prerequisites
Before public launch add: consent and privacy policy, retention/deletion workflows, rate limits and CAPTCHA/turnstile, email confirmation, monitoring, backups with restore drills, managed TLS, authorization, vulnerability checks, incident response, and legal review. Never publish speculative centers as operating locations.

## Development commands
Use Node.js 22. Run `npm ci`, `npm run dev`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`. Stop the dev server before a production build.

See `docs/IMPLEMENTATION_ROADMAP.md` and `docs/CODEX_HANDOFF.md` for phased expansion.

## Project documentation

Start with [PROJECT.md](PROJECT.md) for scope and the full documentation map, [AGENTS.md](AGENTS.md) for coding instructions, and [CONTRIBUTING.md](CONTRIBUTING.md) for change workflow. See [development](docs/DEVELOPMENT.md), [deployment](docs/DEPLOYMENT.md), and [verification](docs/VERIFICATION.md) for actionable checks and known limits.
