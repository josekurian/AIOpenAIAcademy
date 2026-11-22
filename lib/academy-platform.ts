export type ProviderStatus = 'priority' | 'planned' | 'research';

export type AcademyTrack = {
  slug: string;
  provider: string;
  title: string;
  status: ProviderStatus;
  audience: string;
  focus: string[];
  evidence: string;
  disclosure: string;
};

export const providerSequence = [
  {period: 'Months 0–6', providers: 'OpenAI + Oracle', purpose: 'Launch around Oracle customer workflows, OpenAI learning, and original practical labs.'},
  {period: 'Months 7–9', providers: 'Anthropic', purpose: 'Add independently authored learning and certification preparation after source and terms review.'},
  {period: 'Months 10–18', providers: 'xAI, AWS, Azure + Google', purpose: 'Expand only where demand, current source material, instructors, and provider terms support quality delivery.'},
] as const;

export const academyTracks: AcademyTrack[] = [
  {slug: 'openai', provider: 'OpenAI', title: 'OpenAI practitioner pathway', status: 'priority', audience: 'Business, technical, and delivery teams', focus: ['ChatGPT workflows', 'API application design', 'Codex development', 'Evaluation and responsible use'], evidence: 'Course completion, original practice results, reviewed lab evidence, and an optional Academy completion record.', disclosure: 'OpenAI controls its own course access and credentials. Academy learning is independent and does not grant OpenAI certification.'},
  {slug: 'oracle', provider: 'Oracle', title: 'Oracle AI automation pathway', status: 'priority', audience: 'Oracle Fusion, SaaS, PaaS, and OCI customers', focus: ['Fusion process discovery', 'OCI AI foundations', 'Governance and security', 'Automation delivery evidence'], evidence: 'Customer-approved lab, architecture brief, review checklist, and implementation handover.', disclosure: 'Oracle product and certification terms are controlled by Oracle. Academy records are independent completion evidence.'},
  {slug: 'anthropic', provider: 'Anthropic', title: 'Anthropic practitioner pathway', status: 'planned', audience: 'Teams evaluating Claude-enabled workflows', focus: ['Prompt and context design', 'Tool boundaries', 'Evaluation', 'Responsible deployment'], evidence: 'Original labs and independent assessment after source and terms review.', disclosure: 'This planned track is not evidence of Anthropic partnership, certification authority, or exam access.'},
  {slug: 'xai', provider: 'xAI', title: 'xAI implementation pathway', status: 'planned', audience: 'Teams with an approved xAI use case', focus: ['Model selection', 'Workflow evaluation', 'Integration boundaries', 'Operational review'], evidence: 'Provider-neutral project evidence plus reviewed implementation work.', disclosure: 'Planned independent preparation; no xAI-issued credential is represented.'},
  {slug: 'cloud', provider: 'AWS, Azure + Google', title: 'Cloud AI integration pathway', status: 'research', audience: 'Cloud and platform delivery teams', focus: ['Cloud architecture', 'Identity and data boundaries', 'Evaluation operations', 'Cost and reliability'], evidence: 'Architecture review, lab record, and provider-specific preparation where verified.', disclosure: 'Provider-specific certification requirements must be checked with the relevant provider before enrollment.'},
];

export const evidenceStates = [
  ['Self-reported', 'Learner-provided claim', 'Not independently verified'],
  ['Practice record', 'Original Academy practice activity', 'Study evidence only; not a credential'],
  ['Academy completion', 'Program and assessment completion', 'Independent HybridGenAI Academy record'],
  ['Provider-issued', 'Credential issued by the provider', 'Record only after issuer and evidence are verified'],
] as const;

export function statusLabel(status: ProviderStatus) {
  return status === 'priority' ? 'Priority launch' : status === 'planned' ? 'Planned expansion' : 'Research gate';
}
