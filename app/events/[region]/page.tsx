import {notFound} from 'next/navigation';
import EventSchedule,{eventRegions} from '@/components/EventSchedule';
import type {EventRegion} from '@/lib/events';
import {pageMetadata} from '@/lib/site';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{region:string}>}){const {region}=await params;const item=eventRegions.find(item=>item.slug===region);return item?pageMetadata(`OpenAI Events — ${item.label}`,item.description,`/events/${region}`):{};}
export default async function RegionalEvents({params}:{params:Promise<{region:string}>}){const {region}=await params;const item=eventRegions.find(item=>item.slug===region);if(!item)notFound();return <><section className="container pageHero compactPageHero"><div className="eyebrow">EVENTS · YOUR NEXT LEARNING OPPORTUNITY</div><h1>{item.label}</h1><p>{item.description}</p></section><EventSchedule region={region as EventRegion}/></>}
