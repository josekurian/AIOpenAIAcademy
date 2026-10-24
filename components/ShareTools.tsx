'use client';
import {useState} from 'react';
import {Check, Copy, Printer, Share2} from 'lucide-react';

export default function ShareTools({title}: {title: string}) {
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  async function share(copyOnly = false) {
    const url = window.location.href;
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
    setMessage(''); setCopied(false); setManualUrl('');
    if (!copyOnly && navigator.share) {
      try { await navigator.share({title, url}); setMessage(local ? 'This is a local preview link. Others need a public deployment to open it.' : 'Share dialog opened.'); return; }
      catch (error) { if (error instanceof Error && error.name === 'AbortError') return; }
    }
    try {
      await navigator.clipboard.writeText(url); setCopied(true);
      setMessage(local ? 'Preview link copied. It works on this computer; use Print / PDF to share the guide before publishing.' : 'Link copied. Ready to share.');
    } catch { setManualUrl(url); setMessage('Copy this link manually, or use Print / PDF.'); }
  }
  return <div className="shareTools">
    <div className="shareButtons"><button className="button secondary" onClick={() => share()}><Share2 size={15}/>Share guide</button><button className="iconButton" aria-label="Copy page link" onClick={() => share(true)}>{copied ? <Check size={17}/> : <Copy size={17}/>}</button><button className="button secondary" onClick={() => window.print()}><Printer size={15}/>Print / PDF</button></div>
    <p role="status" aria-live="polite">{message}</p>
    {manualUrl && <label className="manualShare">Page link<input readOnly value={manualUrl} onFocus={event => event.currentTarget.select()}/></label>}
  </div>;
}
