import {certificationPracticeTests} from '@/lib/certification-pools';

export type PracticeQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export type PracticeTest = {
  slug: string;
  title: string;
  level: 'Foundation' | 'Developer' | 'Advanced';
  description: string;
  disclaimer: string;
  questions: PracticeQuestion[];
};

const basePracticeTests: PracticeTest[] = [
  {
    slug: 'chatgpt-foundations',
    title: 'ChatGPT Foundations practice test',
    level: 'Foundation',
    description: 'Practice prompting, context, verification, and responsible use in everyday workflows.',
    disclaimer: 'Independent HybridGenAI practice only. This is not an OpenAI exam and does not issue an OpenAI credential.',
    questions: [
      {id: 'foundations-1', prompt: 'Which prompt gives an assistant the clearest task boundary?', choices: ['Make this better.', 'Rewrite this customer update in 120 words, keeping the dates and names unchanged.', 'Do what you think is best.', 'Summarize everything.'], answer: 1, explanation: 'A useful prompt names the task, constraints, and facts that must remain unchanged.'},
      {id: 'foundations-2', prompt: 'What should you do before relying on a consequential generated answer?', choices: ['Assume a confident tone means it is correct.', 'Remove all context and ask again.', 'Check important claims against appropriate primary sources.', 'Publish it immediately.'], answer: 2, explanation: 'Human review and source checking remain necessary for important decisions.'},
      {id: 'foundations-3', prompt: 'What is the safest way to share sensitive information with a general-purpose assistant?', choices: ['Paste all records for better context.', 'Use the minimum necessary information and follow your organization’s policy.', 'Post it in a public prompt library.', 'Use a shorter password.'], answer: 1, explanation: 'Data minimization and applicable organizational policy reduce unnecessary exposure.'},
      {id: 'foundations-4', prompt: 'Which workflow is most repeatable?', choices: ['Prompt once and never review.', 'Define inputs, request an output format, review, and revise against a checklist.', 'Change the goal every turn.', 'Hide the acceptance criteria.'], answer: 1, explanation: 'Explicit inputs, output structure, and review criteria make a workflow easier to repeat.'},
    ],
  },
  {
    slug: 'api-rag-evaluation',
    title: 'OpenAI API, retrieval, and evaluation practice test',
    level: 'Developer',
    description: 'Practice system boundaries, retrieval grounding, tool safety, and evaluation design.',
    disclaimer: 'Independent HybridGenAI practice only. This is not an OpenAI exam, certification, or provider assessment.',
    questions: [
      {id: 'api-1', prompt: 'What is the main purpose of retrieval in a RAG application?', choices: ['Guarantee every answer is true.', 'Supply relevant, reviewable context to help ground an answer.', 'Replace application authorization.', 'Store API keys in documents.'], answer: 1, explanation: 'Retrieval can provide relevant context, but the application still needs source checks and access control.'},
      {id: 'api-2', prompt: 'Which content should an application normally keep out of model prompts?', choices: ['A task description.', 'Relevant user-provided context.', 'Secrets and unnecessary personal data.', 'A response schema.'], answer: 2, explanation: 'Secrets and unnecessary personal data should not be sent to a model.'},
      {id: 'api-3', prompt: 'What is a good first evaluation set?', choices: ['Only successful examples.', 'Representative, edge, and known-failure cases with expected criteria.', 'A single prompt tested once.', 'Unreviewed production data copied into Git.'], answer: 1, explanation: 'A balanced evaluation set reveals both normal behavior and failure modes.'},
      {id: 'api-4', prompt: 'How should a tool-capable agent handle a destructive operation?', choices: ['Run it automatically whenever suggested.', 'Require authorization, validate inputs, and provide a review or rollback path.', 'Hide the tool call from logs.', 'Use an administrator credential by default.'], answer: 1, explanation: 'Authorization, validation, auditability, and recovery are core safety boundaries.'},
    ],
  },
  {
    slug: 'codex-responsible-development',
    title: 'Codex and responsible development practice test',
    level: 'Advanced',
    description: 'Practice repository boundaries, test evidence, review, and secure delivery with coding agents.',
    disclaimer: 'Independent HybridGenAI practice only. This is not an OpenAI exam or Codex certification.',
    questions: [
      {id: 'codex-1', prompt: 'What should an agent do before changing a repository?', choices: ['Read the project instructions and inspect the relevant files.', 'Delete tests to reduce failures.', 'Assume the default branch is disposable.', 'Commit any generated secrets.'], answer: 0, explanation: 'Repository instructions and local evidence establish the safe scope of a change.'},
      {id: 'codex-2', prompt: 'Which is the strongest delivery statement?', choices: ['It probably works.', 'The build passed, so production is guaranteed.', 'The requested tests passed; deployment, security, and runtime limits are documented separately.', 'No verification is needed for generated code.'], answer: 2, explanation: 'Good delivery reports distinguish automated evidence from unverified runtime concerns.'},
      {id: 'codex-3', prompt: 'What is the correct response to a discovered secret in a repository?', choices: ['Copy it into another file.', 'Commit it with a warning.', 'Stop exposure, rotate it, remove it from tracked content, and review access.', 'Print it in the deployment log.'], answer: 2, explanation: 'Secrets require containment and rotation, not redistribution.'},
      {id: 'codex-4', prompt: 'When is a database migration safest?', choices: ['After a backup and restore test, with an additive rollback-aware plan.', 'When it drops unknown tables.', 'When it runs against the only production volume first.', 'When no version is recorded.'], answer: 0, explanation: 'Backups, restore evidence, versioning, and additive changes reduce migration risk.'},
    ],
  },
];

export const practiceTests: PracticeTest[] = [...basePracticeTests, ...certificationPracticeTests];

export function getPracticeTest(slug: string) {
  return practiceTests.find((test) => test.slug === slug);
}
