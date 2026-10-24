import Link from 'next/link';
import EventSchedule from '@/components/EventSchedule';
import ShareTools from '@/components/ShareTools';
import {pageMetadata} from '@/lib/site';
export const metadata=pageMetadata('Weekly OpenAI Event Schedule','OpenAI events grouped by week: Dallas–Fort Worth, other Texas, out-of-state, international, and online registration links.','/events');
export const dynamic='force-dynamic';
export default function EventsPage(){return <><section className="container pageHero compactPageHero"><div className="eyebrow">EVENTS · LOCAL TO GLOBAL</div><h1>Make time for your next discovery.</h1><p>Find official sessions by week and location. Start in Dallas–Fort Worth or explore further afield.</p><Link href="/community/support" className="textLink">Notification & support options →</Link><ShareTools title="Weekly OpenAI events | HybridGenAI Academy"/></section><EventSchedule/></>}
