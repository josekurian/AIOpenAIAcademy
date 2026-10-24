import Link from 'next/link';
import {ArrowUpRight, Award, BadgeCheck, Building2} from 'lucide-react';
import {RegistrationButton} from '@/components/RegistrationWidget';
import ShareTools from '@/components/ShareTools';
import {academySource, certifiedSource, reviewedOn} from '@/lib/openai-learning';
import {pageMetadata} from '@/lib/site';
export const metadata = pageMetadata('OpenAI Certificates, Badges & Certification Guide', 'Understand OpenAI Academy completion credentials, invite-only OpenAI Certified access, and independent OpenAI-focused preparation.', '/certifications');

export default function Credentials() {
  return <>
    <section className="container pageHero credentialHero"><div className="eyebrow">LEARN WITH CLARITY</div><h1>Know what your<br/><em>credential stands for.</em></h1><p>A course badge, a completion certificate, and a certification can mean different things. Choose your learning route with the issuer and requirements in view.</p><div className="reviewStamp"><span/>Sources reviewed {reviewedOn}</div><ShareTools title="OpenAI credential guide | HybridGenAI Academy"/></section>
    <section className="container credentialGrid">
      <article className="credentialCard"><div className="credentialIcon"><Award/></div><span className="softBadge">OpenAI Academy</span><h2>Course badges & completion certificates</h2><p>Complete a course and pass its assessment at 80% or above for a badge. Eligible pathways add completion certificates. Neither is a certification.</p><dl><dt>Pathways</dt><dd>Foundations · Codex · API</dd><dt>Credential platform</dt><dd>Accredible</dd></dl><a className="textLink" href={academySource}>Read official requirements <ArrowUpRight size={15}/></a></article>
      <article className="credentialCard featuredCredential"><div className="credentialIcon"><BadgeCheck/></div><span className="softBadge">Invitation required</span><h2>OpenAI Certified in ChatGPT</h2><p>A separate Coursera-powered experience for invited ChatGPT Enterprise and Edu workspaces. Eligible completions can receive OpenAI-issued credentials through Coursera and Credly.</p><dl><dt>Access</dt><dd>Contact your OpenAI account representative.</dd><dt>Setup</dt><dd>An administrator enables access; learners connect the app with Coursera. Credly is needed to receive credentials.</dd></dl><a className="textLink" href={certifiedSource}>Check access & requirements <ArrowUpRight size={15}/></a></article>
      <article className="credentialCard"><div className="credentialIcon"><Building2/></div><span className="softBadge neutralBadge">Planned · Independent</span><h2>Independent OpenAI training</h2><p>HybridGenAI’s proposed workshops offer guided practice with ChatGPT, Codex, and the OpenAI API. They do not award an OpenAI credential.</p><dl><dt>Focus</dt><dd>Practical exercises and learning support.</dd><dt>Credential enrollment</dt><dd>Always check the official provider. Training here does not grant access to restricted certification programs.</dd></dl><a className="textLink" href="#credential-interest">Ask about guided training <ArrowUpRight size={15}/></a></article>
    </section>
    <section className="container credentialTopicLinks"><Link className="resourceCard" href="/certifications/badges"><h2>Academy badges</h2><p>Course and pathway requirements →</p></Link><Link className="resourceCard" href="/certifications/certified"><h2>OpenAI Certified</h2><p>Access and provider guidance →</p></Link><Link className="resourceCard" href="/certifications/questions"><h2>Common questions</h2><p>What to check before enrolling →</p></Link></section>
    <section className="container smallRegistrationCTA" id="credential-interest"><div><h2>Looking for guided practice?</h2><p>Register interest in independent HybridGenAI training.</p></div><RegistrationButton/></section>
  </>;
}
