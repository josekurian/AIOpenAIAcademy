import {academyCatalog,academySource,certifiedSource} from '@/lib/openai-learning';
export const metadata={title:'OpenAI Updates & Support'};
export default function Support(){return <><section className="container pageHero"><div className="eyebrow">COMMUNITY · STAY CONNECTED</div><h1>Updates and help,<br/><span className="redwoodText">from the right place.</span></h1><p>Manage registration and communication preferences directly with the provider.</p></section><section className="container contentGrid">{[
 ['Training updates','Sign in to OpenAI Academy to enroll and review the communication preferences available to your account.',academyCatalog],
 ['Events & reminders','Register on the official event page. Calendar downloads on this site are one-time reminders, not automatic subscriptions.','https://forum.openai.com/public/events'],
 ['Course & badge support','Use the Academy help article to find the appropriate course-platform or credential-support contact.',academySource],
 ['OpenAI Certified access','Check the official access guidance and contact your OpenAI account representative about eligibility.',certifiedSource],
 ['OpenAI account support','Open the Help Center and use its chat bubble to start a support conversation.','https://help.openai.com/en/articles/6614161-how-can-i-contact-support'],
 ['Developer announcements','Read official updates and review notification options after signing in to the developer community.','https://community.openai.com/c/announcements/6'],
 ].map(([title,text,url])=><article className="contentBox" key={title}><h2>{title}</h2><p>{text}</p><a className="textLink" href={url}>Open official destination ↗</a></article>)}</section><p className="container supportNote">This independent site does not send email or push notifications, subscribe you to OpenAI updates, or access your provider accounts.</p></>}
