# Regional partner container template

This template packages the Academy as an isolated regional deployment. The included defaults describe a proposed Hybrid Labs pilot for Cochin, India, using `hybridlabs.dev` as a configuration value. They do not prove domain ownership, partnership approval, franchise rights, or provider authorization.

## Local run

From the repository root, create a separate environment file outside Git or export the required variables:

```bash
export POSTGRES_PASSWORD='use-a-unique-local-value'
docker compose -f deployment/regional-partner-template/docker-compose.yml up --build -d
```

Open `http://localhost:3182/academy` and `http://localhost:3182/partner-centers`.

## Partner onboarding controls

Before using this for a real regional operator, replace the sample values and complete legal-entity verification, instructor review, privacy and retention review, data-processing terms, DNS/TLS, backups and restore tests, monitoring, support ownership, content licensing, pricing, revenue-share terms, and a written approval decision. Use a unique database volume and secrets for every partner.

## Customization

Override `PARTNER_DISPLAY_NAME`, `PARTNER_DOMAIN`, `PARTNER_CITY`, `PARTNER_OPERATOR`, `PARTNER_STATUS`, `NEXT_PUBLIC_SITE_URL`, and `WEB_PORT`. The image is built from the same Academy source, while the partner identity is supplied as build-time configuration.

Private accounts, payments, learner records, job matching, partner administration, and franchise management are not enabled by this template. They require authentication, authorization, tenant isolation, and reviewed migrations first.
