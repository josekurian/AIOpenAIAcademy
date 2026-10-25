'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {ArrowUpRight, BookOpen, ChevronDown, ChevronRight, GraduationCap, House, Menu, Sparkles, Bell, X, MessageCircle, MapPin} from 'lucide-react';
import {navigation} from '@/lib/navigation';
import RegistrationWidget from '@/components/RegistrationWidget';
const icons = [BookOpen, GraduationCap, Bell, MessageCircle];
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string,boolean>>({});
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const currentGroup = navigation.find(group => group.items.some(item => item.href === pathname || (item.href === '/cheat-sheets' && pathname.startsWith('/cheat-sheets/'))));
  const title = pathname === '/' ? 'Welcome' : currentGroup?.items.find(item => item.href === pathname)?.label || (pathname.startsWith('/cheat-sheets/') ? 'Codex guide' : 'Academy');
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {setOpen(false);toggle.current?.focus();}
      if (event.key === 'Tab') {
        const controls = Array.from(panel.current?.querySelectorAll<HTMLElement>('a, button') || []).filter(item => item.getClientRects().length > 0);
        const items = [toggle.current, ...controls].filter(Boolean) as HTMLElement[];
        const index = items.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && index <= 0) {event.preventDefault();items.at(-1)?.focus();}
        else if (!event.shiftKey && (index === items.length - 1 || index < 0)) {event.preventDefault();items[0]?.focus();}
      }
    }
    const desktop = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = () => {if (desktop.matches) setOpen(false);};
    desktop.addEventListener('change',closeOnDesktop);
    document.addEventListener('keydown',onKey);
    return () => {document.body.style.overflow=previous;document.removeEventListener('keydown',onKey);desktop.removeEventListener('change',closeOnDesktop);};
  },[open]);
  function navigate() {setOpen(false);setExpanded({});}
  return <>
    <a className="skipLink" href="#main-content">Skip to content</a>
    <header className="topbar"><button ref={toggle} className="menuToggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="academy-sidebar" onClick={()=>setOpen(!open)}>{open?<X size={21}/>:<Menu size={21}/>}</button><div className="breadcrumb"><span>{currentGroup?.label || 'Academy'}</span><ChevronRight size={14}/><strong>{title}</strong></div><div className="topbarActions" inert={open}><Link className="iconButton" href="/events/local" aria-label="Dallas–Fort Worth events" onClick={navigate}><MapPin size={18}/></Link><RegistrationWidget/></div></header>
    {open && <div className="navBackdrop" onClick={()=>{setOpen(false);toggle.current?.focus();}} aria-hidden="true"/>}
    <aside ref={panel} id="academy-sidebar" className={`sidebar${open?' isOpen':''}`} aria-label="Academy sidebar"><Link className="brand" href="/" onClick={navigate}><span className="brandMark"><Sparkles size={22}/></span><span>HybridGenAI<small>ACADEMY</small></span></Link><div className="sidebarIntro">A focused guide to OpenAI learning.</div>
      <nav aria-label="Main navigation"><Link href="/" className={`navItem${pathname==='/'?' active':''}`} aria-current={pathname==='/'?'page':undefined} onClick={navigate}><House size={18}/><span>Home</span></Link><p className="navLabel categoryLabel">EXPLORE BY CATEGORY</p>{navigation.map((group,index)=>{
        const Icon=icons[index];const selected=currentGroup?.label===group.label;const isExpanded=expanded[group.label] ?? selected;
        return <div className="navCategory" key={group.label}><button className={`navCategoryToggle${selected?' selected':''}`} aria-expanded={isExpanded} aria-controls={`submenu-${index}`} onClick={()=>setExpanded(previous=>({...previous,[group.label]:!isExpanded}))}><Icon size={18}/><span>{group.label}</span><ChevronDown className={isExpanded?'rotated':''} size={15}/></button><div id={`submenu-${index}`} className="navSubmenu" hidden={!isExpanded}>{group.items.map(item=><Link href={item.href} key={item.href} onClick={navigate} aria-current={pathname===item.href?'page':undefined} className={pathname===item.href?'active':''}>{item.label}{pathname===item.href&&<span className="activeDot"/>}</Link>)}</div></div>;
      })}</nav>
      <Link className="localNavCard" href="/events/local" onClick={navigate}><MapPin size={18}/><span><small>YOUR LOCAL AREA</small>Dallas–Fort Worth</span><ArrowUpRight size={14}/></Link><div className="sidebarBottom"><span/> Independent learning guide</div>
    </aside>
  </>;
}
