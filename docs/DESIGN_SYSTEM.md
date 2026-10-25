# Interface conventions

## Direction
Use a calm, light academy workspace: warm white surfaces and redwood accents, thin borders, restrained shadows, generous spacing, and clear calls to action. Preserve truthful availability language and independent-provider disclosures.

## Shared shell
The desktop sidebar is fixed on the left. At widths of 900px or below it becomes a toggleable drawer beneath the header. Use real links and `aria-current="page"` for the active destination. Retired career, enterprise, franchise, and city routes redirect to the OpenAI guide. New destinations must be backed by working pages.

The drawer must close on link selection, backdrop activation, or Escape. Escape returns focus to its trigger; Tab stays within the open navigation controls. Background scrolling is locked while open and restored on close or desktop resize. Keep the skip link and `main-content` target.

## Components
Reuse `.container`, `.section`, `.sectionHeader`, `.cards`, `.featureCard`, `.courseCard`, `.button`, `.pageHero`, and `.leadForm` rather than introducing unrelated component styles. Maintain clear heading hierarchy and visible keyboard focus. Do not rely only on color to communicate errors or availability.

## Motion budget
Use CSS transform and opacity for short entrances and hover feedback. Card lifts should remain a few pixels. Hero floating motion should be slow and slight. Avoid scroll hijacking, rapid blinking, large parallax effects, or heavy animation libraries. Respect `prefers-reduced-motion: reduce` by removing animation and smooth scrolling.

## Review sizes
Check at 1440px, 1024px, 900px, 768px, 390px, and 320px. Look for clipping, horizontal overflow, small text, wrapped actions, long page titles, and drawer behavior after resizing. Check keyboard access and 200% zoom. Subtle colors still need readable contrast; visual smoke checks are not a full accessibility audit.

## Readability and scope
Use redwood `#914d3e` for key phrases, primary buttons, and selected navigation. Body copy should be dark and generally 15–16px; page headings should stay around 29–40px. Avoid oversized promotional headlines. Public content is exclusively about OpenAI training and credentials.

## Category navigation and accents
Use Training, Credentials, Events, and Community accordion menus with focused subpages. Dallas–Fort Worth is the local event region. Keep the homepage concise. Muted green `#34705b` and orange `#a8561e` highlight selected headings alongside redwood actions. Registration stays in the top-right header and opens a compact native dialog; optional fields remain collapsed. Preserve Escape dismissal, focus restoration, mobile sizing, and reduced-motion support.

## Text weight update — October 25, 2026
Use bold navigation and headings, semibold paragraph text, and darker secondary copy for readability. Keep the existing restrained heading scale and green/orange/redwood accents. Small homepage and registration disclosures use at least 12px; navigation uses 14px. Avoid pale, thin labels.

Top-bar breadcrumbs use bold 16px dark text (14px on compact desktop/tablet widths). Card access labels use bold 13px text with stronger contrast and wrapping. Preserve the mobile header layout.
