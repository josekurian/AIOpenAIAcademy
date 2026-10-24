import type {Metadata} from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import './globals.css';
export const metadata:Metadata={title:{default:'HybridGenAI Academy | Enterprise AI Training',template:'%s | HybridGenAI Academy'},description:'Independent enterprise AI education, hands-on labs, certification preparation, corporate training and future training center opportunities.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Nav/><div className="appContent"><main id="main-content" tabIndex={-1}>{children}</main><footer className="footer"><div><b>HybridGenAI Academy</b><p>Practical AI education for enterprise builders.</p><small>Independent education provider operated by Hybrid Cloud Services LLC. No OpenAI affiliation or authorization is claimed.</small></div><div><Link href="/about">About</Link><Link href="/courses">Courses</Link><Link href="/jobs">Career services</Link><Link href="/franchise">Training centers</Link></div></footer></div></body></html>}
