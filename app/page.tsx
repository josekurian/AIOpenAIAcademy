import Link from 'next/link';
import {ArrowUpRight, BookOpen, Code2, GraduationCap, CalendarDays, MapPin, MessageCircle, Sparkles, ArrowRight} from 'lucide-react';
import {pageMetadata} from '@/lib/site';
export const metadata = pageMetadata('OpenAI Training & Credentials', 'Your independent starting point for OpenAI courses, credential guidance, and events in Dallas–Fort Worth and beyond.', '/');
export default function Home() {
  return <div className="landingPage">
    <section className="container welcomeHero"><div className="welcomeCopy"><div className="eyebrow"><span className="liveDot"/>LEARN SOMETHING THAT MOVES YOU FORWARD</div><h1>Your next step with OpenAI.<br/><em>A little clearer.</em></h1><p>Discover training, understand credentials, and find your next event. One thoughtful starting point.</p><div className="actions"><Link className="button primary" href="/roadmap">Build your learning plan <ArrowRight size={17}/></Link><Link className="welcomeSecondary" href="/events/local"><MapPin size={16}/>Explore DFW events</Link></div><span className="welcomeNote">ChatGPT · Codex · OpenAI API</span></div>
    <div className="learningCanvas" aria-label="Explore ChatGPT, Codex, and OpenAI credentials"><div className="canvasOrbit orbitOuter"/><div className="canvasOrbit orbitInner"/><div className="canvasCore"><Sparkles size={28}/><span>Make room<br/>for possibility.</span></div><Link href="/openai-training/foundations" className="canvasTile tileChat"><span><BookOpen size={20}/></span><div><small>START HERE</small><b>ChatGPT</b></div><ArrowUpRight size={15}/></Link><Link href="/openai-training/codex" className="canvasTile tileCode"><span><Code2 size={20}/></span><div><small>BUILD SOMETHING</small><b>Codex & code</b></div><ArrowUpRight size={15}/></Link><Link href="/certifications" className="canvasTile tileCredentials"><span><GraduationCap size={20}/></span><div><small>KNOW YOUR PATH</small><b>Credentials</b></div><ArrowUpRight size={15}/></Link><span className="canvasDot dotOne"/><span className="canvasDot dotTwo"/></div>
    </section>
    <section className="container landingExplore"><div className="landingSectionTitle"><h2>What would you like to explore?</h2><span>Details, when you need them.</span></div><div className="landingPaths">{[
      {icon:<BookOpen/>,number:'01',title:'Training',text:'Find the right OpenAI course.',href:'/openai-training'},
      {icon:<GraduationCap/>,number:'02',title:'Credentials',text:'Understand badges and certification.',href:'/certifications'},
      {icon:<CalendarDays/>,number:'03',title:'Events',text:'Learn locally, online, or abroad.',href:'/events'},
      {icon:<MessageCircle/>,number:'04',title:'Community',text:'Connect with official resources.',href:'/community'},
    ].map(item=><Link className="landingPath" href={item.href} key={item.title}><div className="pathTop"><span className="pathIcon">{item.icon}</span><small>{item.number}</small></div><h3>{item.title}</h3><p>{item.text}</p><ArrowUpRight className="pathArrow" size={18}/></Link>)}</div></section>
    <section className="container landingLocal"><div className="localBadge"><MapPin size={21}/></div><div><span className="eyebrow">ROOTED IN DALLAS–FORT WORTH</span><h2>Local learning. A wider world.</h2><p>Browse DFW, other Texas, out-of-state, international, and online sessions.</p></div><Link href="/events" className="textLink">See the weekly schedule <ArrowRight size={16}/></Link></section>
    <p className="container landingDisclosure">Independent guidance by HybridGenAI Academy. Not affiliated with OpenAI; official courses and credentials remain with their providers.</p>
  </div>;
}
