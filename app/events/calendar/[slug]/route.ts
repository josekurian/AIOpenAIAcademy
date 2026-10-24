import {events} from '@/lib/events';
import {eventCalendar} from '@/lib/calendar.mjs';
export async function GET(_request: Request, {params}: {params: Promise<{slug:string}>}) {
  const {slug} = await params;
  const event = events.find(item => item.slug === slug);
  if (!event || !event.end) return new Response('Event not found', {status:404});
  return new Response(eventCalendar({...event, end:event.end}), {headers:{
    'Content-Type':'text/calendar; charset=utf-8',
    'Content-Disposition':`attachment; filename="${event.slug}.ics"`,
    'Cache-Control':'no-store',
  }});
}
