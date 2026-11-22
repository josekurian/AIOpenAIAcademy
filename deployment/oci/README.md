# OCI Always Free Academy deployment

This directory contains the repeatable deployment and observability assets for AIOpenAIAcademy.

The intended target is a dedicated `VM.Standard.A1.Flex` instance in the `adminHybridGenai` tenancy, using the existing `jobs-vcn` public subnet only after confirming ownership. The scripts do not upgrade the tenancy, reuse existing database volumes, or modify the shared `GenAIInstance` host.

## Files

- `launch-free-academy.sh` — creates a dedicated NSG and launches the free-tier A1 instance.
- `deploy-to-host.sh` — copies the repository and starts the isolated Compose project on the target host.
- `create-observability.sh` — creates the Academy Notifications topic and compute/object-storage baseline alarms. The load-balancer alarm is intentionally omitted because the isolated target has no load balancer by default.
- `smoke-test.sh` — validates application HTTP behavior, health, redirects, and selected content.
- `monitoring/academy-dashboard-spec.json` — dashboard widget and alarm specification used as the human-reviewable source of truth.

## Safety

Run the scripts with the `adminHGA` profile and explicit IDs. They are designed for a new Academy target. Do not point them at `GenAIInstance`, existing application volumes, or existing production databases.

Before any public release, set a real `NEXT_PUBLIC_SITE_URL`, replace the example database password, confirm DNS/TLS, verify notifications, and complete the restore test. `ACADEMY_WEB_PORT=80` is suitable only for the isolated HTTP smoke-test stage; use a TLS reverse proxy and a domain before public production use.
