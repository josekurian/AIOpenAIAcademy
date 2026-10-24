import test from 'node:test';
import assert from 'node:assert/strict';
import {eventCalendar} from '../lib/calendar.mjs';
const event = {slug:'wildlife',title:'Codex and wildlife',provider:'OpenAI Forum',start:'2026-10-29T17:15:00Z',end:'2026-10-29T18:00:00Z',url:'https://forum.openai.com/public/events/example'};
test('calendar preserves UTC schedule, independent registration notice, and 15-minute reminder',()=>{
 const calendar=eventCalendar(event,'2026-10-24T17:00:00Z');
 assert.match(calendar,/DTSTART:20261029T171500Z\r\n/);
 assert.match(calendar,/DTEND:20261029T180000Z\r\n/);
 assert.match(calendar,/TRIGGER:-PT15M/);
 assert.match(calendar.replace(/\r\n /g,''),/Not an RSVP/);
 assert.ok(calendar.endsWith('END:VCALENDAR\r\n'));
});
test('calendar escapes text and folds UTF-8 lines without changing the title',()=>{
 const title='Résumé, science; review\\notes\n'+'🐾'.repeat(50);
 const calendar=eventCalendar({...event,title});
 for(const line of calendar.split('\r\n'))assert.ok(Buffer.byteLength(line)<=75);
 const unfolded=calendar.replace(/\r\n /g,'');
 assert.ok(unfolded.includes('SUMMARY:Résumé\\, science\\; review\\\\notes\\n'+'🐾'.repeat(50)));
 assert.equal(unfolded.split('BEGIN:VEVENT').length,2);
});

test('in-person reminders preserve the venue instead of labeling the event online',()=>{
 const calendar=eventCalendar({...event,location:'Dallas College, Dallas; TX'});
 assert.match(calendar,/LOCATION:Dallas College\\, Dallas\\; TX/);
});
