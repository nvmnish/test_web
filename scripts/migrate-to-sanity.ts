/**
 * Sanity Migration Script
 * 
 * Usage:
 * SANITY_AUTH_TOKEN="your_write_token" npx tsx scripts/migrate-to-sanity.ts
 * 
 * Or using the Sanity CLI with the pre-generated seed file:
 * npx sanity dataset import data/sanity-seed.ndjson production
 */

import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';

async function migrate() {
  const token = process.env.SANITY_AUTH_TOKEN;
  const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'dzwbnapy';
  const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';

  console.log(`Checking Sanity connection for ${projectId}:${dataset}...`);

  if (!token) {
    console.log(`
ℹ️  No SANITY_AUTH_TOKEN provided.
You can import the pre-built seed documents directly using the Sanity CLI:

    cd studio
    npx sanity dataset import ../data/sanity-seed.ndjson production --replace

Or run this script with your token:
    SANITY_AUTH_TOKEN="your-editor-token" npx tsx scripts/migrate-to-sanity.ts
`);
    return;
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-03-01',
    token,
    useCdn: false,
  });

  const seedPath = path.resolve(process.cwd(), 'data/sanity-seed.ndjson');
  if (!fs.existsSync(seedPath)) {
    console.error(`Seed file not found at ${seedPath}`);
    return;
  }

  const lines = fs.readFileSync(seedPath, 'utf-8').split('\n').filter(Boolean);
  console.log(`Found ${lines.length} documents to migrate...`);

  for (const line of lines) {
    try {
      const doc = JSON.parse(line);
      const res = await client.createOrReplace(doc);
      console.log(`✅ Uploaded [${res._type}] ${res._id} - ${res.title || res.headline || res.client || res.siteTitle || ''}`);
    } catch (err: any) {
      console.error(`❌ Failed document:`, err?.message || err);
    }
  }

  console.log('Migration completed successfully!');
}

migrate().catch(console.error);
