import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('catalog and center templates exist',()=>{for(const f of ['lib/catalog.ts','app/centers/[city]/page.tsx','app/api/leads/route.ts','db/schema.sql'])assert.ok(fs.existsSync(f),f)});
test('docker database is not publicly exposed',()=>{const c=fs.readFileSync('docker-compose.yml','utf8');const db=c.split('\n  db:')[1].split('\nvolumes:')[0];assert.ok(!db.includes('ports:'));});
test('franchise disclosures exist',()=>{const s=fs.readFileSync('app/franchise/page.tsx','utf8');assert.match(s,/No franchise is being offered or sold/)});
