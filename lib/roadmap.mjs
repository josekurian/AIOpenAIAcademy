export const goals = {
 trainer: {label:'Corporate trainer',courses:['AI Foundations','Applied AI Foundations','Agents and Workflows','AI Leadership'],project:'Deliver a 30-minute ChatGPT workshop with a facilitator guide, practice exercise, and learner feedback.',focus:'Clear explanations, reliable demonstrations, and adult learning.'},
 architect: {label:'Enterprise architect & consultant',courses:['Scope AI Solutions','Evaluate AI Applications','Design and Build Agentic Systems','AI Leadership'],project:'Produce an OpenAI solution blueprint with data flows, access controls, evaluation criteria, and an adoption proposal.',focus:'Integration design, governance, and measurable business value.'},
 developer: {label:'Developer & agent engineer',courses:['Get Started with Codex','Scope AI Solutions','Build with Retrieval-Augmented Generation','Evaluate AI Applications','Design and Build Agentic Systems','Optimize AI Application Performance'],project:'Build a small OpenAI API assistant using sample data, an evaluation set, and documented failure cases.',focus:'Coding, retrieval, tool use, evaluations, and safe deployment.'},
 leader: {label:'AI program & transformation leader',courses:['AI Foundations','Agents and Workflows','AI Leadership'],project:'Create a prioritized use-case backlog, a pilot plan, governance responsibilities, and an adoption scorecard.',focus:'Use-case selection, change management, and outcome measurement.'},
 educator: {label:'Educator & education trainer',courses:['AI Foundations','AI for Educators','AI for College Students'],project:'Create a lesson or staff workshop with learning objectives, a rubric, privacy safeguards, and human review.',focus:'Teaching practice, critical review, and institutional requirements.'},
};
export function buildRoadmap({goal='architect',level='intermediate',hours='6',budget='free'}={}){
 const chosen=Object.hasOwn(goals,goal)?goal:'architect';
 const experience=['beginner','intermediate','advanced'].includes(level)?level:'intermediate';
 const weekly=['3','6','10'].includes(hours)?Number(hours):6;
 const phases=[
  {title:'Build your foundation',hours:12,task:experience==='beginner'?'Begin with AI Foundations. Practice context, prompting, and checking answers with low-risk sample tasks.':'Review AI Foundations and identify gaps. Compare AI outputs against a documented standard.',deliverable:'A small library of tested prompts with examples of errors and corrections.'},
  {title:'Apply learning to a workflow',hours:16,task:'Choose one relevant workflow. Define inputs, review checkpoints, and success criteria; test it on representative examples.',deliverable:weekly===3?'One tested workflow with a short review log.':'Up to three tested workflows with a review log.'},
  {title:'Develop your specialization',hours:32,task:chosen==='developer'||chosen==='architect'?(experience==='beginner'?'Allow extra practice for Python and API basics before building a small prototype with sample data.':'Design a bounded prototype. Document permissions, error handling, evaluations, and operating costs.'):'Build a role-specific demonstration and practice explaining its limits, review steps, and responsible use.',deliverable:goals[chosen].project},
  {title:'Review, teach, and document',hours:12,task:'Review the work with a peer, revise weak areas, and assemble evidence. Check official course assessments and credential eligibility separately.',deliverable:'A portfolio case study showing your work, limitations, feedback, and next steps.'},
 ];
 if(experience==='beginner')phases[0].hours+=8;
 if(experience==='advanced')phases[0].hours=6;
 let week=1;
 const schedule=phases.map(phase=>{const weeks=Math.ceil(phase.hours/weekly);const result={...phase,startWeek:week,endWeek:week+weeks-1};week+=weeks;return result});
 return {goal:chosen,profile:goals[chosen],level:experience,weekly,totalWeeks:week-1,phases:schedule,budget:budget==='paid'?'paid':'free'};
}
