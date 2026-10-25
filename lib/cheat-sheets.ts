import data from '@/content/cheat-sheets.json';
export const cheatSheets=data;
export function guideMarkdown(guide:typeof data[number]){return `# ${guide.title}\n\n${guide.summary}\n\nIndependent HybridGenAI learning guide. Reviewed ${guide.reviewed}. These are suggested exercises, not official OpenAI courses or credentials. Setup examples have not been executed in every environment.\n\n${guide.sections.map(s=>`## ${s.title}\n\n${s.body}`).join('\n\n')}\n\n## Official references\n\n${guide.sources.map(s=>`- ${s}`).join('\n')}\n`;}
