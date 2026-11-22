import {Building2, CheckCircle2} from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import {pageMetadata} from '@/lib/site';
import {partnerConfig, partnerIsConfigured} from '@/lib/partner-config';

export const metadata = pageMetadata('Regional Partner Centers', 'Apply to discuss a controlled HybridGenAI Academy training and delivery center.', '/partner-centers');

export default function PartnerCenters() {
  return <>
    <section className="container pageHero"><div className="eyebrow">REGIONAL DELIVERY · APPLICATION</div><h1>{partnerIsConfigured ? `${partnerConfig.displayName} · ${partnerConfig.city}` : 'Build a local Academy presence'} with <em>quality gates.</em></h1><p>The regional-center program supports instructor-led delivery, learner support, enterprise enablement, and qualified project referrals. It is an application process, not a promise of franchise approval or exclusivity.</p>{partnerIsConfigured && <div className="reviewStamp">Template status: {partnerConfig.status} · Domain: {partnerConfig.domain}</div>}</section>
    <section className="container sourceBanner"><Building2 size={21}/><p>Every center must use original curriculum, protect learner and customer data, name accountable instructors, and pass legal, privacy, content, and delivery review before launch.</p></section>
    <section className="section container"><div className="contentGrid"><article className="contentBox"><h2>Application gates</h2><ul><li>Verified legal entity and accountable operator</li><li>Named instructors with reviewed capability evidence</li><li>Venue or controlled online-delivery plan</li><li>Local compliance, privacy, and safeguarding review</li><li>Quarterly quality and policy review</li></ul></article><article className="contentBox"><h2>What the center can deliver</h2><ul><li>OpenAI and Oracle priority learning paths</li><li>Original labs using synthetic or approved material</li><li>Instructor-led cohorts and office hours</li><li>Completion reporting and learner support</li><li>Qualified project referrals without employment promises</li></ul></article></div></section>
    <section className="container learningCTA"><div><h2>Discuss a regional center.</h2><p>Tell us the city, legal entity, instructor capacity, and intended learner or customer audience. Submission starts a review; it does not create approval, territory rights, or a contract.</p></div><div className="formWrap"><LeadForm kind="franchise"/></div></section>
    <p className="container sourceNotes"><CheckCircle2 size={16}/> Academy completion records are independent. Provider partnerships, official certifications, franchise rights, and territory claims require separate written approval.</p>
  </>;
}
