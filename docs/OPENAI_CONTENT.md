# OpenAI content and sharing

## Review record
Official sources reviewed October 24, 2026. This is a manually maintained snapshot, not an automated feed. The public catalog lists all 14 courses in the reviewed Academy help article; it does not claim to archive every event, video, or future offering.

| Source | Used for |
| --- | --- |
| [OpenAI Academy courses](https://help.openai.com/en/articles/20001270-openai-academy-courses) | Course names, approximate durations, completion credentials |
| [Academy catalog](https://academy.openai.com/pages/courses) | Provider catalog destination |
| [OpenAI Certified app](https://help.openai.com/en/articles/20001151-openai-certified-app) | Separate experience, eligibility, credential distribution |
| [Teachers course](https://academy.openai.com/en/public/clubs/k-12-education-aacga/resources/chatgpt-foundations-for-teachers) | K–12 course overview and provider link |
| [ChatGPT training](https://developers.openai.com/training) | Practical walkthroughs |
| [ChatGPT documentation](https://learn.chatgpt.com/docs) | Product references |
| [API quickstart](https://developers.openai.com/api/docs/quickstart) | Developer starting point |
| [Agents guide](https://developers.openai.com/api/docs/guides/agents) | Agent development reference |

## Editorial rules
Preserve source links near claims. Recheck dates, availability, and conditions rather than assuming an older launch announcement describes today's access. Do not copy provider lessons or assessments into this site. Do not invent prices, exam requirements, badge images, credential IDs, authorized-partner status, or guaranteed outcomes. Suggested practice projects are HybridGenAI editorial suggestions, not claimed official syllabi.

## Sharing setup
`components/ShareTools.tsx` uses the browser share sheet when supported, then clipboard, then a selectable URL. Cancellation is not reported as success. Local preview links get an explicit local-only message. Printing uses browser Print / Save as PDF and the currently filtered course list.

`app/opengraph-image.tsx` generates an original 1200×630 social card with independent-provider wording. Set `NEXT_PUBLIC_SITE_URL` to the actual public HTTPS origin before building; metadata then includes canonical URLs. Compose forwards this variable as a build argument. No public domain is assumed. Without it, previews use localhost metadata for local testing. Rebuild after changing it.

A GitHub repository is a source-sharing destination, not a deployed Next.js website. A public host and reachable HTTPS URLs are required for remote visitors and social preview crawlers.

## Events and provider communication
`/community` links directly to OpenAI Forum membership, the complete Forum event directory, replays, Academy events/resources, developer discussions, and support. The supplied wildlife event was verified on its official public page. Event data in `lib/events.ts` is a reviewed selection, not a synchronized feed. Provider schedules remain authoritative.

Event times are stored in UTC and displayed in America/Chicago, with daylight-saving changes handled by `Intl.DateTimeFormat`. Ended sessions are labeled as past, and reminder actions disappear. The event page renders dynamically to avoid permanently caching upcoming labels.

`/events/calendar/[slug]` returns a one-time ICS download with a 15-minute display alarm. Calendar software controls alert delivery. Imports neither register users nor subscribe them to schedule updates. The route returns 404 for unknown events. It does not accept arbitrary event data or external URLs.

No email, push, newsletter, or provider-account integration is configured. Registration and communication preferences are completed by visitors on the official platforms; this site does not subscribe or message anyone on their behalf.

Additional reviewed sources:
- [OpenAI Forum](https://forum.openai.com/)
- [Forum events](https://forum.openai.com/public/events)
- [Forum resources](https://forum.openai.com/public/content)
- [Academy events](https://academy.openai.com/public/events)
- [Developer Community](https://community.openai.com/)
- [Official support instructions](https://help.openai.com/en/articles/6614161-how-can-i-contact-support)

## Regional schedule
The October 24 snapshot contains 18 listings: one Dallas–Fort Worth, one elsewhere in Texas, four out-of-state, five international, and seven online. `/events/[region]` groups these by week; this is not an exhaustive or recurring weekly schedule. International events with unannounced end times have no ICS download. In-person reminders preserve venue locations.

## Public and partner review — October 25, 2026
`lib/training-programs.ts` records eight publicly verifiable routes with individual source URLs: public Academy, Coursera teachers, OpenAI Certified, Partner Network, Frontier Alliances, TCS India, historical AI Foundations pilots, and Activator Labs. Partner-only catalogs were not accessible; no exhaustive certification claim is made. The Coursera teachers page contradicts itself (a module mentions a certificate, but its FAQ explicitly says no credentials); the guide exposes that conflict instead of promising a certificate. Current Help Center access guidance takes precedence over the December 2025 pilot announcement. Official Academy course outcomes and dates were refreshed.

## User roadmap adaptation
The supplied roadmap informed five independent learning profiles and four practice phases. Unrelated third-party article titles and other-vendor content were omitted. Study hours and sequences are HybridGenAI estimates, not official prerequisites, certification tracks, or promises of mastery. Existing verified Academy course data supplies recommendations and credential links. No new partner authorization or exam availability is inferred.

## Codex starter library — October 25, 2026
26 independent guides in `content/cheat-sheets.json` cover a one-hour setup lab, five quick references, and twenty use cases. Official CLI, desktop quickstart, AGENTS.md, and API quickstart pages were opened and checked. Current CLI commands come from the official reference. Guides are suggested exercises, not official courses or credentials; environment examples are not claimed to be executed across all stacks. Markdown and plain-text downloads share the same source as the online pages. PDF uses the browser print dialog, not a generated PDF download.
