# Codex implementation handoff

Workspace: `/Users/josekurian/AIOpenAIAcademy`. Read `AGENTS.md` and `PROJECT.md` first.

## Latest direction
The public website is for OpenAI training and credentials only. Keep careers, franchise, centers, and other-vendor training removed. Legacy URLs redirect to `/openai-training`. Use restrained heading sizes, readable body text, and redwood accents.

## Content
Official course data is an editorial snapshot in `lib/openai-learning.ts`; the credential guide links directly to official requirements. Review sources before updates, and record the date actually checked. HybridGenAI workshops are independent and proposed. Do not imply OpenAI affiliation, credential issuance, or access to invitation-only offerings.

## Delivery
Run lint, type checking, tests, build, and relevant browser checks. Verify sharing fallbacks, print output, mobile filters, and old-route redirects when changing those features. Set `NEXT_PUBLIC_SITE_URL` to the real public HTTPS origin at build time before deployment. Localhost links cannot be opened by remote recipients.

## Remaining boundaries
Inquiry persistence and full Docker deployment need integration verification. Public lead collection needs consent and abuse controls. Legacy database tables remain unused; do not delete persistent data during UI work. Follow `docs/IMPLEMENTATION_ROADMAP.md` only for requested work, not automatic platform expansion.
