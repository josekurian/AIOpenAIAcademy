// Editorial snapshot, not a live provider catalog. Recheck sources before updating.
export const reviewedOn = 'October 25, 2026';
export const academySource = 'https://help.openai.com/en/articles/20001270-openai-academy-courses';
export const academyCatalog = 'https://academy.openai.com/pages/courses';
export const certifiedSource = 'https://help.openai.com/en/articles/20001151-openai-certified-app';
export const teacherSource = 'https://academy.openai.com/en/public/clubs/k-12-education-aacga/resources/chatgpt-foundations-for-teachers';
export const categories = ['All courses', 'Foundations', 'API', 'Codex', 'Leadership', 'Education'] as const;
export type LearningCategory = typeof categories[number];
export const officialCourses: {title: string; duration: string; category: LearningCategory; outcome: string}[] = [
  {title: 'AI Foundations', duration: '60–75 min', category: 'Foundations', outcome: 'Prompting, context, and responsible AI use.'},
  {title: 'Applied AI Foundations', duration: '75–90 min', category: 'Foundations', outcome: 'Repeatable workflows with review checkpoints.'},
  {title: 'Agents and Workflows', duration: '75–90 min', category: 'Foundations', outcome: 'Agent delegation and human oversight.'},
  {title: 'Scope AI Solutions', duration: '30 min', category: 'API', outcome: 'Use-case selection and solution planning.'},
  {title: 'Evaluate AI Applications', duration: '70 min', category: 'API', outcome: 'Evaluation design and failure analysis.'},
  {title: 'Design and Build Agentic Systems', duration: '110 min', category: 'API', outcome: 'Agent roles, tools, and handoffs.'},
  {title: 'Build with Retrieval-Augmented Generation', duration: '100 min', category: 'API', outcome: 'Retrieval pipelines and answer evaluation.'},
  {title: 'Optimize AI Application Performance', duration: '30 min', category: 'API', outcome: 'Production quality, speed, and cost tradeoffs.'},
  {title: 'Get Started with Codex', duration: '80 min', category: 'Codex', outcome: 'Repository tasks and verification.'},
  {title: 'Extend Codex Workflows', duration: '90 min', category: 'Codex', outcome: 'Reusable team coding workflows.'},
  {title: 'Scale Codex Across Governed Teams and Systems', duration: '100 min', category: 'Codex', outcome: 'Parallel work and governance.'},
  {title: 'AI Leadership', duration: '180 min', category: 'Leadership', outcome: 'Strategy, governance, and adoption.'},
  {title: 'AI for Educators', duration: '45 min', category: 'Education', outcome: 'Lessons, assessments, and classroom communication.'},
  {title: 'AI for College Students', duration: '45 min', category: 'Education', outcome: 'Study, writing, and critical review.'},
];
export const learningResources = [
  {title: 'ChatGPT walkthroughs', label: 'GUIDED PRACTICE', description: 'Explore short tutorials for everyday tasks, documents, connected tools, voice, and shareable sites.', href: 'https://developers.openai.com/training'},
  {title: 'ChatGPT & Codex documentation', label: 'PRODUCT GUIDES', description: 'Keep the official product reference close as you learn new features and set up your workspace.', href: 'https://learn.chatgpt.com/docs'},
  {title: 'OpenAI API quickstart', label: 'DEVELOPER STARTER', description: 'Start with the official setup guide before attempting a first API project. Product usage may carry separate costs.', href: 'https://developers.openai.com/api/docs/quickstart'},
  {title: 'Agent development', label: 'BUILDING SYSTEMS', description: 'Use the official agents guide as a reference while designing a small, bounded prototype.', href: 'https://developers.openai.com/api/docs/guides/agents'},
];
