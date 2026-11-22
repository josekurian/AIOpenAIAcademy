import type {Metadata} from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import './globals.css';
import './practice.css';
import {siteUrl} from '@/lib/site';
import {partnerConfig} from '@/lib/partner-config';
export const metadata:Metadata={
  metadataBase: new URL(siteUrl || 'http://localhost:3100'),
  title:{default:`OpenAI Training & Credentials | ${partnerConfig.displayName}`,template:`%s | ${partnerConfig.displayName}`},
  description:`Independent guidance on OpenAI training, Oracle AI automation, practical learning, and credential requirements from ${partnerConfig.displayName}.`,
  openGraph:{type:'website',siteName:partnerConfig.displayName,title:'AI Training & Credentials',description:`Independent learning and delivery pathways from ${partnerConfig.displayName}.`,images:[{url:'/opengraph-image',width:1200,height:630,alt:`${partnerConfig.displayName} learning guide`}]},
  twitter:{card:'summary_large_image',images:['/opengraph-image']},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Nav/><div className="appContent"><main id="main-content" tabIndex={-1}>{children}</main><footer className="footer"><div><b>{partnerConfig.displayName}</b><p>OpenAI learning. Oracle delivery context. Practical skills.</p><small>Independent education and enablement operated by {partnerConfig.operator}. No provider affiliation, authorization, certification authority, or franchise approval is claimed.</small></div><div><Link href="/about">About</Link><Link href="/academy">Academy platform</Link><Link href="/openai-training">Training</Link><Link href="/certifications">Credentials</Link><Link href="/partner-centers">Regional centers</Link><Link href="/community">Community</Link></div></footer></div></body></html>}
