# Docker deployment runbook

## Local startup
Requires Docker Desktop or a compatible Docker Engine with Compose. From the project root, create `.env` from `.env.example` only if it does not exist. Set a unique strong `POSTGRES_PASSWORD`; review `WEB_PORT` (default 3180), `POSTGRES_USER`, and `POSTGRES_DB`.

```bash
docker compose config --quiet
docker compose up --build -d
docker compose ps
curl --fail http://localhost:3180/api/health
```

Use your configured web port if different. Avoid printing the fully resolved Compose configuration because it contains credentials. Inspect logs locally without copying personal data or secrets into tickets.

The web container waits for database health at startup. PostgreSQL is not published to the host. This network configuration alone is not a complete security boundary. The current image runs the Next server without a reverse proxy or production hardening.

## Data lifecycle
`db/schema.sql` runs only on first initialization of an empty PostgreSQL volume. Preserve the volume during routine updates. Never use `docker compose down -v` as a routine troubleshooting step: it deletes persistent data. Schema changes require migrations; the repository does not yet provide a migration runner.

Before any data-changing release, create an access-controlled database backup using your deployment's credentials, restore it into an isolated database, and record the result. A backup is not verified until restoration succeeds. Do not store dumps in the repository. Define retention, encryption, recovery targets, and an owner before production use.

## Release and rollback
Run the development checks, build a versioned image, and validate against a disposable database before deploying. Record the image version and database migration version. Roll back application images only when the current schema is compatible; do not assume code rollback reverses database changes.

## Public sharing
Set `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin before building. Compose forwards it as a build argument. Rebuild when the origin changes, and verify canonical links and `/opengraph-image` from outside the host network. Localhost is not remotely shareable.

## Public launch gates
Consent and privacy notices, request abuse controls, retention/deletion processes, observability, tested backups, TLS, incident ownership, reviewed public claims, and appropriate authorization remain outstanding. Authentication and tenant enforcement must precede private portals. Local build success does not establish production readiness or verify Docker deployment.
