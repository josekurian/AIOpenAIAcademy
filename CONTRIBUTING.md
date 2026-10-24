# Contributing

Read `AGENTS.md` and `PROJECT.md` first. Keep changes focused on the requested outcome and preserve truthful product claims. The roadmap provides dependency order, not a requirement to bundle unrelated phases into one change.

Use the existing TypeScript, App Router, shared components, and plain CSS conventions. Keep public content in the shared catalog where applicable. Prefer small dependencies and server components. Never include credentials or real learner/lead records in examples or tests.

For a change, describe the user-visible problem and outcome, validate using `docs/DEVELOPMENT.md`, and update the relevant documentation. Include database migration and rollback details when applicable. Report unverified behavior explicitly, especially database writes and Docker deployment. Avoid claiming broad test coverage from the three structural smoke tests.

Pull request descriptions should state the problem, final behavior, verification performed, and material limitations. Follow the repository's actual version-control setup; initialize or publish a remote only when requested.
