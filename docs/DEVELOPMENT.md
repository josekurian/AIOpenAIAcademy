# Development and validation

## Local app
Use Node.js 22 and the committed lockfile:

```bash
npm ci
npm run dev
```

The development server defaults to port 3000. Use `npm run dev -- --port 3100` when needed. Marketing pages render without PostgreSQL; inquiry writes and database readiness do not. Set `DATABASE_URL` in `.env.local` to a reachable development database if running outside Compose. Compose supplies this variable itself using the internal `db` hostname, which the host Mac cannot resolve.

Do not overwrite an existing `.env`. Keep credentials out of source, logs, screenshots, and documentation. Use project-local Next.js, PostCSS, and ESLint configurations.

## Checks
```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Node tests check file presence, absence of a published database port, retired-route redirect coverage, and calendar UTC timestamps, reminder alarms, text escaping, and UTF-8 line folding. They do not test API persistence, authentication, browser interactions, or Docker health. Add behavioral tests when implementing those features.

Stop the dev server before building, because both use `.next`. For production smoke testing, build and then run `npm run start -- --port 3100`. Type checking uses the generated Next type definitions when available.

## Browser checklist
- Follow every sidebar route and confirm the active link, title, and content.
- Check desktop, tablet, and narrow phone widths for horizontal overflow.
- Open the mobile drawer, navigate, close with Escape, verify focus restoration, and Tab through the menu.
- Resize an open drawer into desktop layout; verify scrolling is restored.
- Enable reduced motion; hero and card animation must stop.
- Check skip link, visible focus, form labels, and disabled submit state.
- With a disposable local database, check successful persistence, validation rejection, honeypot behavior, and database-down errors. Use synthetic lead data only.

## Troubleshooting
A 503 health response usually indicates an unavailable database or missing `DATABASE_URL`. A successful health response does not check table existence. A missing schema on an existing volume requires a reviewed migration; re-running Compose does not re-run initialization SQL.

If builds use configuration from a parent folder, confirm the repository's local configuration files are present. Do not edit unrelated parent projects to fix this repository.
