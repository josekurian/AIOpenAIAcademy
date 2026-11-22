import Link from 'next/link';
import {notFound} from 'next/navigation';
import PracticeTest from '@/components/PracticeTest';
import {getPracticeTest, practiceTests} from '@/lib/practice-tests';
import {pageMetadata} from '@/lib/site';

export function generateStaticParams() { return practiceTests.map((test) => ({slug: test.slug})); }
export async function generateMetadata({params}: {params: Promise<{slug: string}>}) { const {slug} = await params; const test = getPracticeTest(slug); return pageMetadata(test?.title ?? 'Practice test', 'Independent OpenAI learning practice test from HybridGenAI Academy.', `/practice-tests/${slug}`); }

export default async function PracticeTestPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const test = getPracticeTest(slug);
  if (!test) notFound();
  return <><section className="container compactPageHero"><Link className="textLink" href="/practice-tests">← All practice tests</Link><div className="eyebrow">{test.level.toUpperCase()} · STUDY MODE</div><h1>{test.title}</h1><p>{test.description}</p></section><section className="container practicePage"><PracticeTest test={test}/></section></>;
}
