import RoadmapBuilder from '@/components/RoadmapBuilder';
import {pageMetadata} from '@/lib/site';
export const metadata=pageMetadata('Your OpenAI Learning Roadmap','Plan practical OpenAI learning by goal, experience, and weekly study time.','/roadmap');
export default function Roadmap(){return <><section className="container pageHero"><div className="eyebrow">LEARN · PRACTICE · DEMONSTRATE</div><h1>Your path to <em>practical OpenAI skills.</em></h1><p>Choose a direction and build a realistic study plan with official courses and practical projects. Start with a 90-day planning horizon; allow longer when your schedule or starting point requires it.</p></section><RoadmapBuilder/></>}
