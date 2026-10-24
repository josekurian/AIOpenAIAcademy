import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('learning catalog and inquiry foundation exist',()=>{for(const f of ['lib/catalog.ts','app/openai-training/page.tsx','app/api/leads/route.ts','db/schema.sql'])assert.ok(fs.existsSync(f),f)});
test('docker database is not publicly exposed',()=>{const c=fs.readFileSync('docker-compose.yml','utf8');const db=c.split('\n  db:')[1].split('\nvolumes:')[0];assert.ok(!db.includes('ports:'));});
test('retired public routes redirect to OpenAI learning',()=>{
  for (const path of ['jobs','enterprise','franchise','centers/[city]']) {
    assert.match(fs.readFileSync(`app/${path}/page.tsx`,'utf8'),/permanentRedirect\('\/openai-training'\)/);
  }
});
