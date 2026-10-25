# Verification record

Verified locally on October 24, 2026, after the OpenAI-only scope change and redwood readability update.

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed without warnings |
| `npm test` | Passed, 6 tests including calendar encoding and reminder coverage |
| `npm run build` | Passed, including generated social image |
| `docker compose config --quiet` | Passed |
| Public-page layouts | Homepage, learning hub, credentials, guided training, and about checked at 320, 390, 768, 1024, and 1440px; no horizontal overflow |
| Heading size | Page headings stayed at or below 40px across those widths |
| Retired routes | Jobs, enterprise, franchise, and a city URL returned HTTP 308 to the OpenAI hub |
| Catalog | 14 courses; category filtering, keyword search, empty state, and reset passed |
| Share controls | Clipboard success, denied-permission manual fallback, and native-share cancellation passed |
| Mobile interaction | Navigation, credential FAQ, and registration anchor passed |
| Print | Navigation hidden in print media; guide PDF generation succeeded |
| Social preview | Open Graph image metadata present; generated PNG returned HTTP 200 and was visually inspected |
| Browser runtime | No page errors during the smoke checks |

Browser checks used temporary Playwright tooling and installed Chrome against the local production server on port 3100. They are not a committed end-to-end suite. Source review is documented in `docs/OPENAI_CONTENT.md`.

## Remaining verification
Full Docker deployment, persistent inquiry writes, backup restoration, load testing, comprehensive accessibility review, and public social-crawler rendering remain unverified. A real public HTTPS origin must be configured before deployment. Localhost preview links cannot be opened by remote recipients.

The existing database has legacy tables from the original broader platform concept. No database migration or destructive operation was performed. Public inquiry capture still needs the operational prerequisites described in the deployment guide.

## Events and communication follow-up
The event page was checked at 320, 390, 768, 1024, and 1440px with no horizontal overflow. Six sourced event cards rendered. The wildlife session displayed the correct Central daylight time. Its ICS download returned the expected filename, UTC start, and 15-minute alarm; unknown IDs returned 404. The header bell and mobile active-navigation state passed. Direct links route users to provider registration/support; no email or push subscription is implied.

## Category and registration update
Lint, typecheck, six tests, and production build passed after the category redesign. Browser checks passed at 320, 390, 768, 1024, and 1440px on the homepage, events, credentials, API pathway, and community with no horizontal overflow. Regional listing counts (18 total) and pathway course counts passed. Compact registration opening, Escape, legacy hash entry, optional-field collapse, and a mocked successful submission passed; no real inquiry was sent. Unknown event regions and calendar entries without announced end times returned 404. No browser runtime errors were observed. Desktop and mobile previews were inspected. Earlier six-event checks above describe the previous snapshot.

## Public and partner directories — October 25, 2026
Lint, typecheck, six tests, and production build passed. The production browser rendered all eight credential entries, active sidebar selection, official links, and expandable access details. Desktop screenshots were inspected; the credential directory had no horizontal overflow. Partner application wording was verified in the official browser page without submitting data. Restricted partner catalogs, live enrollment, and credential issuance were not tested.
