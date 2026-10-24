/** @param {string} value */
function escapeText(value) {
  return value.replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
}
/** Fold UTF-8 lines without splitting a character (RFC 5545).
 * @param {string} value
 */
function foldLine(value) {
  const lines = []; let line = '';
  for (const character of value) {
    if (Buffer.byteLength(line + character, 'utf8') > 75) { lines.push(line); line = ' '; }
    line += character;
  }
  lines.push(line); return lines.join('\r\n');
}
/** @param {string} value */
function timestamp(value) { return new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z'); }
/**
 * @param {{slug:string,title:string,start:string,end:string,url:string,provider:string,location?:string}} event
 * @param {string} [createdAt]
 */
export function eventCalendar(event, createdAt = new Date().toISOString()) {
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//HybridGenAI Academy//Independent Event Reminders//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT', `UID:hybridgenai-${escapeText(event.slug)}`, `DTSTAMP:${timestamp(createdAt)}`,
    `DTSTART:${timestamp(event.start)}`, `DTEND:${timestamp(event.end)}`, `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(`Register with ${event.provider}: ${event.url}\nIndependent calendar copy. Not an RSVP. Confirm schedule changes with the provider.`)}`,
    `URL:${event.url}`, `LOCATION:${escapeText(event.location || 'Online - see official event page')}`,
    'BEGIN:VALARM', 'TRIGGER:-PT15M', 'ACTION:DISPLAY', `DESCRIPTION:${escapeText(event.title)}`, 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR',
  ].map(foldLine).join('\r\n') + '\r\n';
}
