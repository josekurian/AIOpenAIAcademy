# HybridGenAI Academy

## Purpose
Provide practical AI education for individual learners and enterprise teams, with a future path to assessed academy credentials, career support, and a centrally maintained training-center network. Operated by Hybrid Cloud Services LLC as an independent education provider.

## Current product boundary
The project is a public marketing and inquiry foundation. It contains eight proposed training programs, eight planned city pages, credentials information, career-service information, corporate training, and franchise-interest pages. Shared navigation provides desktop sidebar links and a keyboard-accessible mobile drawer. Inquiry submissions are implemented through PostgreSQL; availability depends on database configuration.

The schema anticipates future learner, cohort, enrollment, credential, organization, job, and franchise records. Those tables do not constitute a working LMS or marketplace. Authentication, payments, course delivery, exams, credential verification, matching, AI tutoring, and operator portals are not implemented.

## Priorities
1. Complete the public-site experience and verify inquiry behavior in a local database environment.
2. Deliver Phase 2 operational foundations: authentication strategy, permission boundaries, migrations, consent, abuse controls, monitoring, and backup/restore procedures.
3. Implement a narrow learner MVP with real course access and progress, after the supporting boundaries are tested.
4. Expand assessments, AI labs, placement, corporate accounts, and operator tooling in the dependency order in the roadmap.

Keep one maintained codebase with configured city content. Use independent deployments only when isolation or operating requirements justify them; do not create manually edited city forks.

## Success criteria
Visitors can understand the proposed offerings, navigate on desktop and mobile, and submit an inquiry when the database is available. The interface remains usable by keyboard and with reduced motion. Public content accurately distinguishes planned services from available ones. Future releases demonstrate authorization, data separation, operational recovery, and tested user workflows before claiming readiness.

## Documentation map
| Document | Source of truth for |
| --- | --- |
| `AGENTS.md` | Repository instructions for coding agents |
| `README.md` | Setup and entry points |
| `docs/ARCHITECTURE.md` | Current runtime, routes, and data flow |
| `docs/DESIGN_SYSTEM.md` | Interface and motion conventions |
| `docs/DEVELOPMENT.md` | Local development and validation |
| `docs/DEPLOYMENT.md` | Docker operations and deployment limits |
| `docs/IMPLEMENTATION_ROADMAP.md` | Future phase dependencies |
| `docs/CODEX_HANDOFF.md` | Continuation guidance |
| `docs/VERIFICATION.md` | Dated evidence and unverified areas |
| `CONTRIBUTING.md` | Change and review workflow |

Use `PROJECT.md` and `AGENTS.md` with this capitalization; avoid competing lowercase copies.
