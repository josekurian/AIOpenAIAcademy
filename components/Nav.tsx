'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {ArrowUpRight, BookOpen, ChevronRight, GraduationCap, House, Info, Menu, Compass, Sparkles, Bell, X} from 'lucide-react';

const groups = [
  {label: 'OPENAI LEARNING', links: [
    {href: '/', label: 'Overview', icon: House},
    {href: '/openai-training', label: 'OpenAI training', icon: BookOpen},
    {href: '/certifications', label: 'Certifications & badges', icon: GraduationCap},
    {href: '/events', label: 'Events & updates', icon: Bell},
    {href: '/courses', label: 'Guided training', icon: Compass},
    {href: '/about', label: 'About this guide', icon: Info},
  ]},
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);
  const title = groups.flatMap(group => group.links).find(link => active(link.href))?.label || 'Academy';

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === 'Tab') {
        const items = [toggle.current, ...Array.from(panel.current?.querySelectorAll<HTMLElement>('a') || [])].filter(Boolean) as HTMLElement[];
        const index = items.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && index <= 0) { event.preventDefault(); items.at(-1)?.focus(); }
        else if (!event.shiftKey && index === items.length - 1) { event.preventDefault(); items[0]?.focus(); }
      }
    }
    const desktop = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);

  function navigate() { setOpen(false); }

  return <>
    <a href="#main-content" className="skipLink">Skip to content</a>
    <header className="topbar">
      <button ref={toggle} className="menuToggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="academy-sidebar" onClick={() => setOpen(!open)}>{open ? <X size={21}/> : <Menu size={21}/>}</button>
      <div className="breadcrumb"><span>Academy</span><ChevronRight size={14}/><strong>{title}</strong></div>
      <div className="topbarActions"><Link href="/events" className="iconButton" aria-label="OpenAI events and updates" onClick={navigate}><Bell size={18}/></Link><Link href="/courses#registration" className="button primary registrationLink" onClick={navigate}>Registration <ArrowUpRight size={16}/></Link></div>
    </header>
    {open && <div className="navBackdrop" onClick={() => {setOpen(false); toggle.current?.focus();}} aria-hidden="true"/>}
    <aside ref={panel} id="academy-sidebar" className={`sidebar${open ? ' isOpen' : ''}`} aria-label="Academy sidebar">
      <Link className="brand" href="/" onClick={navigate}><span className="brandMark"><Sparkles size={22}/></span><span>HybridGenAI<small>ACADEMY</small></span></Link>
      <div className="sidebarIntro">Your guide to learning with OpenAI.</div>
      <nav aria-label="Main navigation">{groups.map(group => <div className="navGroup" key={group.label}><p className="navLabel">{group.label}</p>{group.links.map(({href, label, icon: Icon}) => <Link href={href} key={href} className={`navItem${active(href) ? ' active' : ''}`} aria-current={active(href) ? 'page' : undefined} onClick={navigate}><Icon size={18}/><span>{label}</span>{active(href) && <span className="activeDot"/>}</Link>)}</div>)}</nav>
      <div className="sidebarNote"><span className="noteIcon"><GraduationCap size={22}/></span><h3>Your next chapter.</h3><p>Explore OpenAI skills, one step at a time.</p><Link href="/openai-training" onClick={navigate}>Explore the guide <ArrowUpRight size={16}/></Link></div>
      <div className="sidebarBottom"><span/> Made for lifelong learners</div>
    </aside>
  </>;
}
