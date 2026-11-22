export type TeamEnablementProgram = {
  title: string;
  audience: string;
  duration: string;
  outcome: string;
  focus: string[];
};

export const teamEnablementPrograms: TeamEnablementProgram[] = [
  {title: 'AI Workflow Accelerator', audience: 'Operations, finance, HR, sales, and project teams', duration: '2–4 weeks', outcome: 'A small set of reviewed ChatGPT workflows that your team can operate and improve.', focus: ['Workflow selection', 'Prompt and context design', 'Output review', 'Reusable team playbooks']},
  {title: 'Engineering AI Delivery Lab', audience: 'Software, data, and platform teams', duration: '4–6 weeks', outcome: 'A bounded Codex or OpenAI API project with tests, review gates, and documented limits.', focus: ['Repository context', 'API and tool boundaries', 'Testing and evaluation', 'Secure delivery practices']},
  {title: 'Industry Practice Lab', audience: 'Specialist teams with domain documents and approval requirements', duration: '3–5 weeks', outcome: 'A domain-specific prototype using approved or synthetic material and explicit human checkpoints.', focus: ['Domain vocabulary', 'Source checking', 'Privacy-aware examples', 'Approval and escalation steps']},
  {title: 'AI Trainer Readiness', audience: 'Internal trainers, educators, and enablement leads', duration: '3–4 weeks', outcome: 'A workshop plan, practice exercise, facilitation guide, and evidence-based teaching demonstration.', focus: ['Lesson design', 'Live demonstrations', 'Learner assessment', 'Responsible-use explanations']},
];

export const enablementMethod = [
  ['Select', 'Choose a real, permitted work task and define what success means.'],
  ['Demonstrate', 'Walk through the task with clear boundaries and a review checklist.'],
  ['Build', 'Create a small workflow or prototype with the team’s approved material.'],
  ['Evaluate', 'Test quality, missing context, failure cases, and human responsibilities.'],
  ['Reuse', 'Document the method, limits, and maintenance steps for future work.'],
] as const;
