import Link from 'next/link';
import {practiceTests} from '@/lib/practice-tests';
import {pageMetadata} from '@/lib/site';

export const metadata = pageMetadata('OpenAI Practice Tests', 'Independent HybridGenAI practice tests for OpenAI learning topics. These are not official OpenAI exams or certifications.', '/practice-tests');

export default function PracticeTestsPage() {
  return <>
    <section className="container pageHero"><div className="eyebrow">INDEPENDENT STUDY PRACTICE</div><h1>Test your understanding.<br/><em>Keep the credential claim accurate.</em></h1><p>Use these short practice tests for ChatGPT, API and retrieval, and Codex learning. They provide feedback for study only.</p><div className="notice">HybridGenAI Academy is an independent provider. These tests are not issued, reviewed, or endorsed by OpenAI and do not grant OpenAI certification.</div></section>
    <section className="container practiceIndex"><div className="practiceIndexIntro"><h2>Choose a practice test</h2><p>Start with the level that matches your current learning plan. You can retake any test without creating an account.</p></div><div className="practiceTestGrid">{practiceTests.map((test) => <article className="contentBox" key={test.slug}><span className="pill">{test.level}</span><h2>{test.title}</h2><p>{test.description}</p><Link className="button secondary" href={`/practice-tests/${test.slug}`}>Start practice test →</Link></article>)}</div></section>
  </>;
}
