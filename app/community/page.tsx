import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {communityLinks} from '@/lib/events';
import {pageMetadata} from '@/lib/site';
export const metadata=pageMetadata('OpenAI Forum & Learning Community','Direct links to the OpenAI Forum, Academy libraries, and developer discussions.','/community');
export default function Community(){return <><section className="container pageHero"><div className="eyebrow">COMMUNITY · OFFICIAL DESTINATIONS</div><h1>Learn with the community.</h1><p>Explore conversations, replays, and resources on OpenAI’s own platforms.</p><Link href="/community/support" className="textLink">Notifications & support →</Link></section><section className="container pathwayCatalog resourceGrid">{communityLinks.map(item=><a href={item.url} className="resourceCard" key={item.title}><span className="eyebrow">{item.label}</span><h2>{item.title}<ArrowUpRight size={18}/></h2><p>{item.description}</p><span className="resourceHost">{new URL(item.url).hostname}</span></a>)}</section></>}
