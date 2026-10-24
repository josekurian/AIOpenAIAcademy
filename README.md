# HybridGenAI Academy — Dockerized website foundation

Independent AI education platform for Hybrid Cloud Services LLC. This repository is an **implemented public-site MVP foundation**, not an official OpenAI platform or a completed LMS.

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

## Scope and features
This site is exclusively for OpenAI training and credentials: ChatGPT, Codex, and the OpenAI API. It includes an official learning-resource guide, a searchable 14-course snapshot, credential explanations, and proposed independent HybridGenAI workshops. No OpenAI affiliation or certification authority is claimed.

The interface uses readable text, restrained headings, redwood, green, and orange accents, category navigation with submenus, reduced-motion support, share/copy controls, print layouts, and generated social previews. Old career, franchise, enterprise, and city routes redirect to the learning guide.

The inquiry API is implemented, but production lead capture still needs consent, abuse controls, retention workflows, monitoring, TLS, and tested backups. No LMS, authentication, payment, or official examination service is implemented. Legacy database tables are unused scaffolding, not active features.

## Shareable deployment
Set `NEXT_PUBLIC_SITE_URL` to your real public HTTPS origin before building. Docker Compose forwards it to the image build. Localhost links only work on the local computer; GitHub source publication does not deploy the website. See [content and sharing](docs/OPENAI_CONTENT.md).

## Development commands
Use Node.js 22. Run `npm ci`, `npm run dev`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`. Stop the dev server before a production build.

See `docs/IMPLEMENTATION_ROADMAP.md` and `docs/CODEX_HANDOFF.md` for phased expansion.

## Project documentation

Start with [PROJECT.md](PROJECT.md) for scope and the full documentation map, [AGENTS.md](AGENTS.md) for coding instructions, and [CONTRIBUTING.md](CONTRIBUTING.md) for change workflow. See [development](docs/DEVELOPMENT.md), [deployment](docs/DEPLOYMENT.md), and [verification](docs/VERIFICATION.md) for actionable checks and known limits.
