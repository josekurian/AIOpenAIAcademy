// Editorial snapshot, not a live provider catalog. Recheck sources before updating.
export const reviewedOn = 'October 24, 2026';
export const academySource = 'https://help.openai.com/en/articles/20001270-openai-academy-courses';
export const academyCatalog = 'https://academy.openai.com/pages/courses';
export const certifiedSource = 'https://help.openai.com/en/articles/20001151-openai-certified-app';
export const teacherSource = 'https://academy.openai.com/en/public/clubs/k-12-education-aacga/resources/chatgpt-foundations-for-teachers';
export const categories = ['All courses', 'Foundations', 'API', 'Codex', 'Leadership', 'Education'] as const;
export type LearningCategory = typeof categories[number];
export const officialCourses: {title: string; duration: string; category: LearningCategory}[] = [
  {title: 'AI Foundations', duration: '60–75 min', category: 'Foundations'},
  {title: 'Applied AI Foundations', duration: '75–90 min', category: 'Foundations'},
  {title: 'Agents and Workflows', duration: '75–90 min', category: 'Foundations'},
  {title: 'Scope AI Solutions', duration: '30 min', category: 'API'},
  {title: 'Evaluate AI Applications', duration: '70 min', category: 'API'},
  {title: 'Design and Build Agentic Systems', duration: '110 min', category: 'API'},
  {title: 'Build with Retrieval-Augmented Generation', duration: '100 min', category: 'API'},
  {title: 'Optimize AI Application Performance', duration: '30 min', category: 'API'},
  {title: 'Get Started with Codex', duration: '80 min', category: 'Codex'},
  {title: 'Extend Codex Workflows', duration: '90 min', category: 'Codex'},
  {title: 'Scale Codex Across Governed Teams and Systems', duration: '100 min', category: 'Codex'},
  {title: 'AI Leadership', duration: '180 min', category: 'Leadership'},
  {title: 'AI for Educators', duration: '45 min', category: 'Education'},
  {title: 'AI for College Students', duration: '45 min', category: 'Education'},
];
export const learningResources = [
  {title: 'ChatGPT walkthroughs', label: 'GUIDED PRACTICE', description: 'Explore short tutorials for everyday tasks, documents, connected tools, voice, and shareable sites.', href: 'https://developers.openai.com/training'},
  {title: 'ChatGPT & Codex documentation', label: 'PRODUCT GUIDES', description: 'Keep the official product reference close as you learn new features and set up your workspace.', href: 'https://learn.chatgpt.com/docs'},
  {title: 'OpenAI API quickstart', label: 'DEVELOPER STARTER', description: 'Start with the official setup guide before attempting a first API project. Product usage may carry separate costs.', href: 'https://developers.openai.com/api/docs/quickstart'},
  {title: 'Agent development', label: 'BUILDING SYSTEMS', description: 'Use the official agents guide as a reference while designing a small, bounded prototype.', href: 'https://developers.openai.com/api/docs/guides/agents'},
];
