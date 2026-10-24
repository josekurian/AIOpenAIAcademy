import type {Metadata} from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import './globals.css';
import {siteUrl} from '@/lib/site';
export const metadata:Metadata={
  metadataBase: new URL(siteUrl || 'http://localhost:3100'),
  title:{default:'OpenAI Training & Credentials | HybridGenAI Academy',template:'%s | HybridGenAI Academy'},
  description:'Independent guidance on OpenAI training, ChatGPT, Codex, API learning, badges, and certification requirements.',
  openGraph:{type:'website',siteName:'HybridGenAI Academy',title:'OpenAI Training & Credentials',description:'Find your OpenAI learning path. An independent guide by HybridGenAI Academy.',images:[{url:'/opengraph-image',width:1200,height:630,alt:'HybridGenAI Academy — OpenAI learning guide'}]},
  twitter:{card:'summary_large_image',images:['/opengraph-image']},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Nav/><div className="appContent"><main id="main-content" tabIndex={-1}>{children}</main><footer className="footer"><div><b>HybridGenAI Academy</b><p>OpenAI learning. Clear pathways. Practical skills.</p><small>Independent education provider operated by Hybrid Cloud Services LLC. No OpenAI affiliation or authorization is claimed.</small></div><div><Link href="/about">About</Link><Link href="/openai-training">OpenAI training</Link><Link href="/certifications">Credentials</Link><Link href="/events">Events & updates</Link><Link href="/courses">Guided training</Link></div></footer></div></body></html>}
