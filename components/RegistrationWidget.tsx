'use client';
import {useEffect,useRef} from 'react';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,X} from 'lucide-react';
import LeadForm from '@/components/LeadForm';
export function RegistrationButton({children='Register interest',className='button primary'}:{children?:React.ReactNode;className?:string}){return <button className={className} onClick={()=>window.dispatchEvent(new Event('academy:register'))}>{children}</button>;}
export default function RegistrationWidget(){
 const dialog=useRef<HTMLDialogElement>(null);const trigger=useRef<HTMLButtonElement>(null);const pathname=usePathname();
 useEffect(()=>{function show(){if(dialog.current&&!dialog.current.open)dialog.current.showModal();}function hash(){if(window.location.hash==='#registration')show();}window.addEventListener('academy:register',show);window.addEventListener('hashchange',hash);hash();return()=>{window.removeEventListener('academy:register',show);window.removeEventListener('hashchange',hash);};},[pathname]);

 return <><button ref={trigger} className="button primary registrationLink" aria-haspopup="dialog" onClick={()=>dialog.current?.showModal()}>Register interest <ArrowUpRight size={15}/></button><dialog ref={dialog} className="registrationPopover" aria-labelledby="registration-title" onClick={event=>{if(event.target===dialog.current){const rect=dialog.current.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.current.close();}}}><div className="registrationHeading"><div><span className="eyebrow">HYBRIDGENAI TRAINING</span><h2 id="registration-title">Register your interest</h2></div><button className="iconButton" aria-label="Close registration" onClick={()=>dialog.current?.close()}><X size={18}/></button></div><p className="registrationIntro">Hear about proposed guided training.</p><LeadForm kind="student" compact/><p className="registrationDisclosure">Independent HybridGenAI inquiry. Not an OpenAI account, course enrollment, or certification booking.</p></dialog></>;
}
