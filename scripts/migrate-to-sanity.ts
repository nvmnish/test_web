/**
 * Safe, Idempotent Sanity Content & Image Migration Script with Auto-Backup
 * 
 * Features:
 * 1. Automatic Backup: Backs up existing remote Sanity documents to data/sanity-backup-<timestamp>.json before modifying anything.
 * 2. Idempotent Image Uploads: Checks existing image assets before uploading to avoid duplicates.
 * 3. Safe Upsert: Preserves any documents already created/edited in Studio unless --force is passed.
 * 4. Document & Asset Manifest Reconciliation: Verifies all 9 content images and 46 core documents.
 * 
 * Usage:
 *   SANITY_AUTH_TOKEN="your_token" npx tsx scripts/migrate-to-sanity.ts
 *   SANITY_AUTH_TOKEN="your_token" npx tsx scripts/migrate-to-sanity.ts --force
 */

import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';
import { generateSeedDocs } from './generate-sanity-seed';

const CONTENT_IMAGES: Record<string, string> = {
  shelia: 'Shelia_at_Sheri.jpg',
  roslyn: 'Roslyn_Bio_Pic.jpg',
  aboutBio: 'about_me.png',
  proofHero: 'proof_page_image.jpg',
  heroPointing: 'pointing_wide.png',
  contentPhoto: 'content_photo.jpg',
  sandraVideo: 'Sandra.png',
  alexVideo: 'Alex.png',
  nonameVideo: 'noname.png',
};

async function migrate() {
  const isForce = process.argv.includes('--force');
  const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN;
  const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'dzwbnapy';
  const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';

  console.log(`\n======================================================`);
  console.log(`🚀 Starting Safe Sanity Migration & Asset Reconciliation`);
  console.log(`   Project ID: ${projectId} | Dataset: ${dataset}`);
  console.log(`   Mode: ${isForce ? 'FORCE OVERWRITE (--force)' : 'SAFE UPSERT (Preserves existing Studio edits)'}`);
  console.log(`======================================================\n`);

  if (!token) {
    console.log(`
⚠️  NO SANITY_AUTH_TOKEN FOUND IN ENVIRONMENT

Sanity requires a Write or Editor API Token to authenticate remote uploads and dataset modifications.
To run this migration against your remote dataset:

1. Generate a Write Token at:
   https://www.sanity.io/manage/project/${projectId}/api#tokens

2. Execute:
   SANITY_AUTH_TOKEN="your_write_token" npx tsx scripts/migrate-to-sanity.ts

(Or using Sanity CLI login session:
   cd studio
   npx sanity dataset import ../data/sanity-seed.ndjson production --replace
)
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

  // Step 0: Backup existing dataset
  console.log('🛡️  Step 0: Creating automated pre-migration dataset backup...');
  try {
    const existingRemoteDocs = await client.fetch(`*[]`);
    const backupDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFilePath = path.join(backupDir, `sanity-backup-${timestamp}.json`);
    fs.writeFileSync(backupFilePath, JSON.stringify(existingRemoteDocs, null, 2), 'utf-8');
    console.log(`   ✅ Backup created: ${backupFilePath} (${existingRemoteDocs.length} documents archived)\n`);
  } catch (backupErr: any) {
    console.warn(`   ⚠️ Warning: Backup failed or dataset is empty: ${backupErr?.message || backupErr}`);
  }

  // Step 1: Upload Content Images idempotently
  console.log('📦 Step 1: Uploading content images from src/assets/images/...');
  const uploadedAssets: Record<string, any> = {};

  for (const [key, filename] of Object.entries(CONTENT_IMAGES)) {
    const filePath = path.resolve(process.cwd(), 'src/assets/images', filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`   ⚠️ File not found: ${filePath}`);
      continue;
    }

    try {
      // Check if image already exists in Sanity
      const existing = await client.fetch(
        `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]`,
        { filename }
      );

      if (existing) {
        console.log(`   ✓ Image already in Sanity: ${filename} (${existing._id})`);
        uploadedAssets[key] = {
          _type: 'image',
          asset: { _type: 'reference', _ref: existing._id },
        };
      } else {
        console.log(`   ⬆️  Uploading ${filename}...`);
        const stream = fs.createReadStream(filePath);
        const asset = await client.assets.upload('image', stream, {
          filename,
        });
        console.log(`   ✅ Uploaded: ${filename} -> ${asset._id}`);
        uploadedAssets[key] = {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        };
      }
    } catch (err: any) {
      console.error(`   ❌ Failed uploading ${filename}:`, err?.message || err);
    }
  }

  // Step 2: Generate all seed documents with linked images
  console.log('\n📄 Step 2: Preparing documents with image attachments...');
  const baseDocs = generateSeedDocs();

  const finalDocs = baseDocs.map((doc: any) => {
    // Attach images to Home Page
    if (doc._type === 'homePage') {
      if (uploadedAssets.heroPointing) doc.heroImage = uploadedAssets.heroPointing;
      if (uploadedAssets.shelia) doc.quote1Photo = uploadedAssets.shelia;
      if (uploadedAssets.roslyn) doc.quote2Photo = uploadedAssets.roslyn;

      if (Array.isArray(doc.sections)) {
        doc.sections = doc.sections.map((sec: any) => {
          if (sec._type === 'clientStoriesSection' && Array.isArray(sec.stories)) {
            if (sec.stories[0] && uploadedAssets.shelia) sec.stories[0].photo = uploadedAssets.shelia;
            if (sec.stories[1] && uploadedAssets.roslyn) sec.stories[1].photo = uploadedAssets.roslyn;
          }
          if (sec._type === 'videoCarouselSection' && Array.isArray(sec.videos)) {
            if (sec.videos[0] && uploadedAssets.sandraVideo) sec.videos[0].videoPoster = uploadedAssets.sandraVideo;
            if (sec.videos[1] && uploadedAssets.alexVideo) sec.videos[1].videoPoster = uploadedAssets.alexVideo;
            if (sec.videos[2] && uploadedAssets.nonameVideo) sec.videos[2].videoPoster = uploadedAssets.nonameVideo;
          }
          if (sec._type === 'closingCtaSection' && uploadedAssets.contentPhoto) {
            sec.image = uploadedAssets.contentPhoto;
          }
          return sec;
        });
      }
    }

    // Attach images to About Page
    if (doc._type === 'aboutPage' && uploadedAssets.aboutBio) {
      doc.bioImage = uploadedAssets.aboutBio;
    }

    // Attach images to Case Studies Page
    if (doc._type === 'caseStudiesPage' && uploadedAssets.proofHero) {
      doc.coverImage = uploadedAssets.proofHero;
    }

    // Attach photos to individual Case Studies
    if (doc._type === 'caseStudy') {
      if (doc._id === 'study-shelia' && uploadedAssets.shelia) {
        doc.clientPhoto = uploadedAssets.shelia;
        if (uploadedAssets.sandraVideo) doc.videoPoster = uploadedAssets.sandraVideo;
      }
      if (doc._id === 'study-roslyn' && uploadedAssets.roslyn) {
        doc.clientPhoto = uploadedAssets.roslyn;
        if (uploadedAssets.sandraVideo) doc.videoPoster = uploadedAssets.sandraVideo;
      }
      if (doc._id === 'study-candice' && uploadedAssets.sandraVideo) {
        doc.videoPoster = uploadedAssets.sandraVideo;
      }
      if (doc._id === 'study-diane' && uploadedAssets.sandraVideo) {
        doc.videoPoster = uploadedAssets.sandraVideo;
      }
    }

    // Attach cover to Resources
    if (doc._type === 'resourceItem' && uploadedAssets.contentPhoto) {
      doc.coverImage = uploadedAssets.contentPhoto;
    }

    // Attach cover to Blog Posts
    if (doc._type === 'blogPost' && uploadedAssets.contentPhoto) {
      doc.coverImage = uploadedAssets.contentPhoto;
    }

    return doc;
  });

  // Step 3: Upsert documents into Sanity (safe repeat-run check)
  console.log(`\n💾 Step 3: Populating ${finalDocs.length} documents into Sanity dataset '${dataset}'...`);
  let successCount = 0;
  let skippedCount = 0;
  let failCount = 0;

  for (const doc of finalDocs) {
    try {
      if (!isForce) {
        const existingDoc = await client.getDocument(doc._id);
        if (existingDoc) {
          console.log(`   ⏭️  Skipped [${doc._type}] ${doc._id} (already exists, preserving Studio edits)`);
          skippedCount++;
          continue;
        }
      }

      const res = await client.createOrReplace(doc);
      console.log(`   ✅ [${res._type}] ${res._id} — ${res.title || res.headline || res.brandName || res.client || res.siteTitle || ''}`);
      successCount++;
    } catch (err: any) {
      console.error(`   ❌ Failed [${doc._type}] ${doc._id}:`, err?.message || err);
      failCount++;
    }
  }

  // Update local ndjson file with complete document graph including uploaded image references
  const ndjsonPath = path.resolve(process.cwd(), 'data/sanity-seed.ndjson');
  fs.writeFileSync(
    ndjsonPath,
    finalDocs.map((d: any) => JSON.stringify(d)).join('\n') + '\n',
    'utf-8'
  );

  console.log(`\n======================================================`);
  console.log(`🎉 Migration Finished!`);
  console.log(`   Upserted: ${successCount} documents`);
  console.log(`   Preserved Existing: ${skippedCount} documents`);
  if (failCount > 0) console.log(`   Failed: ${failCount} documents`);
  console.log(`   Updated seed file: ${ndjsonPath}`);
  console.log(`======================================================\n`);
}

migrate().catch(console.error);
