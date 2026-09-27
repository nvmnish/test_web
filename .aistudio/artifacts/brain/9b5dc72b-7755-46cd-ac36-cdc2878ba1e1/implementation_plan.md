# Implementation Plan: Local-First Zero-Code Sanity CMS & Cloudflare SSR Deployment

Convert the Growth Lane Strategies (GLS) website into a dynamic, content-driven application powered by Sanity CMS. **Milestone 1 focuses entirely on local development**: running the Astro frontend and Sanity Studio concurrently on localhost, verifying real-time content authoring, asset uploads (images, videos, downloadable PDF/ZIP files), resource creation, draft previewing, and footer management upon standard browser refresh without touching code or restarting servers. **Milestone 2 deploys this verified system to Cloudflare SSR**.

---

## 1. Local Development Architecture & Dual-Server Workflow (Milestone 1)

### Dual-Server Setup
| Service | Working Directory | Command | Local URL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Astro Frontend** | `/` (Project Root) | `npm run dev` | `http://localhost:3000` | Serves the website with on-demand SSR rendering from Sanity. |
| **Sanity Studio** | `/studio` | `npm run dev` | `http://localhost:3333` | Sanity Studio desk interface for editing content, uploading assets, and managing sections. |

### Dataset Environment Transparency
- **Default Dataset**: `production` on Project ID `dzwbnapy`.
- **Operating Note**: Both local Astro (`localhost:3000`) and local Sanity Studio (`localhost:3333`) connect to this configured project and dataset.
  - *Direct Impact*: Because both local development and the deployed Cloudflare site query the same dataset (`production`), any changes published in local Studio will be visible on both localhost and the deployed site upon page refresh.
  - *Draft Isolation*: Edits kept in draft state remain completely isolated to authenticated preview sessions and do not affect public visitors on either localhost or Cloudflare.

---

## 2. Dynamic Content Flow & Instant Publishing Mechanism

### Why Instant Publishing Works Without Rebuilding
1. **On-Demand SSR (`output: 'server'`)**:
   - Astro pages execute on each incoming request (`SSR`).
   - The server queries Sanity using `@sanity/client` with `useCdn: false`.
2. **Instant Reflection**:
   - In Sanity Studio (`localhost:3333`), clicking **Publish** commits data to Sanity's live documents API.
   - In the browser (`localhost:3000`), a standard **Browser Refresh** triggers an immediate SSR query that fetches the freshly published data from Sanity.
   - **Zero Code Changes, Zero Rebuilds, Zero Server Restarts**: Content editors never run terminal commands or restart processes.

### File & Media Uploads
- Direct Sanity Asset Storage:
  - **Images**: Sanity `image` field with hotspot/crop support. Rendered via `@sanity/image-url`.
  - **Downloads**: Sanity `file` field (`pdf`, `zip`, `docx`, `xlsx`). Resolved via asset URL to Sanity CDN (e.g., `https://cdn.sanity.io/files/dzwbnapy/...`).
  - **Videos**: Supported via Sanity `file` upload (for hosted MP4s) or external video URL string (Vimeo, YouTube, Wistia).
  - No repository commits or code additions required to add new media or lead magnets.

---

## 3. Dedicated Footer Singleton (`footer`)

To ensure site-wide footer management without touching code, a dedicated singleton document `footer` is created in Sanity:

### Schema Fields
1. **Brand Identity**:
   - `brandName`: "Growth Lane Strategies"
   - `logoImage`: Uploadable logo image asset.
   - `brandStatement`: "Positioning, messaging, and content strategy for B2B founders and in-house marketing leaders."
2. **Grouped Navigation Links**:
   - Array of `linkGroup` items, each containing:
     - `groupTitle`: e.g. "Services", "Resources", "Company".
     - `links`: Array of objects (`label`, `url`, `isExternal`).
   - Editors can **add, remove, rename, and reorder** both groups and individual links.
3. **Contact & Socials**:
   - `contactEmail`: "sheri@growthlanestrategies.com"
   - `socialLinks`: Array of `{ platform, url }` (e.g. LinkedIn).
4. **Legal & Copyright**:
   - `copyrightText`: "© 2026 Growth Lane Strategies. All rights reserved."
   - `legalLinks`: Array of `{ label, url }` (e.g. "Privacy Policy", "Terms").

### Component Connection
- `src/components/Footer.tsx` receives this structured data across all pages.
- Fallback content matches the exact current hardcoded footer.
- Mobile layout (collapsible or stacked), typography, and animations are strictly preserved.

---

## 4. Reconciled Content & Asset Manifest

### Reconciled Content Inventory
- **Homepage (`homePage`)**:
  - `hero`: Headline, subheadline, primary CTA, secondary CTA, cutout hero photo (`pointing_wide.png`).
  - `metrics`: 3 verified operating numbers (26%, 2x, 3 months), descriptions, suffixes.
  - `whoWeServe`: Marketing Teams & Founders cards (eyebrows, headlines, 2 paragraphs each, CTAs).
  - `clientStories`: Shelia & Roslyn proof narratives, quotes, timeframes, tags, client photos (`Shelia_at_Sheri.jpg`, `Roslyn_Bio_Pic.jpg`).
  - `videoTestimonials`: Carousel heading, subheading, and 3 video items with client names, video URLs, and poster images (`Sandra.png`, `Alex.png`, `noname.png`).
  - `comparison`: "Who We Aren't" heading, subheading, 5 structured comparison rows.
  - `pricing`: 2 pricing tiers ($4k direct work, $500 Signal Room, cadences, features, disclaimers, CTAs).
  - `faqs`: 11 questions and detailed answers.
  - `closingCta`: Working philosophy quote, author, role, landscape presentation photo (`content_photo.jpg`), punchline, CTAs.
- **About Page (`aboutPage`)**:
  - Bio quote, 4 narrative paragraphs, portrait image (`about_me.png`), 3 working principles.
- **Case Studies (`caseStudiesPage` & `caseStudy`)**:
  - Hero headline, description, cover photo (`proof_page_image.jpg`), and 4 case studies (Shelia, Roslyn, Candice, Diane Freeman) with challenges, approaches, and results.
- **Free Tools & Resources (`freeToolsPage` & `resourceItem`)**:
  - 4 diagnostic tools (Heavy Audit, Signal Extraction, Cold Email Redesign, B2B Positioning Diagnostic) with descriptions, deliverable tags, cover images, and direct downloadable file assets.
  - **Dynamic Resource Inclusion**: Newly published resources in Studio automatically appear on `/free-tools` sorted by creation date without manual page editing.
- **Blog (`blogPage` & `blogPost`)**:
  - 5 thought-leadership essays with categories, read times, published dates, cover images, and portable text body.
- **Modular Sections (`page`)**:
  - Generic page document supporting customizable landing pages with unique slugs and a 14-block predefined section library.
- **Navigation (`navigation`) & Footer (`footer`)**:
  - Header nav items, CTAs, and footer singleton.

---

## 5. Implementation Milestones

### Milestone 1: Local Development & Verification (Localhost First)
1. **Setup Dual Environment**:
   - Ensure root `package.json` has `"dev": "astro dev --port 3000 --host 0.0.0.0"`.
   - Ensure `/studio/package.json` has `"dev": "sanity dev --port 3333 --host 0.0.0.0"`.
2. **Dataset Backup & Migration Execution**:
   - Export backup of dataset `production` to `data/sanity-backup.tar.gz`.
   - Run `npm run sanity:migrate` to upload the 9 content images to Sanity and create all documents with stable, deterministic IDs.
3. **Studio Schema & Asset Upload Validation**:
   - Verify Studio UI renders singletons (`Homepage`, `About`, `Footer`, `Navigation`), collection lists (`Case Studies`, `Resources`, `Blog Posts`), and custom `Pages`.
   - Enable Sanity `file` field on `resourceItem` for direct upload of PDFs, ZIPs, and guides.
4. **Draft Preview on Localhost**:
   - Implement `/api/preview` endpoint using server-side token with `drafts` perspective.
   - Verify unpublished draft changes appear only when preview cookie/token is active.
5. **Local Verification Checklist**:
   - [ ] Run both dev servers simultaneously (`localhost:3000` and `localhost:3333`).
   - [ ] Create a new Resource in Studio with an uploaded PDF and published status $\rightarrow$ refresh `localhost:3000/free-tools` $\rightarrow$ verify it appears automatically and download link works.
   - [ ] Replace an existing image in Studio (e.g. Hero portrait) $\rightarrow$ publish $\rightarrow$ refresh `localhost:3000` $\rightarrow$ verify new image renders in exact layout.
   - [ ] Edit a footer link group and copyright text in Studio $\rightarrow$ publish $\rightarrow$ refresh `localhost:3000` $\rightarrow$ verify footer updates site-wide.
   - [ ] Verify draft preview: edit a draft without publishing $\rightarrow$ check standard site (shows old content) $\rightarrow$ check preview mode (shows draft).

---

### Milestone 2: Cloudflare Deployment & Parity Verification
1. **Cloudflare SSR Configuration**:
   - Add `@astrojs/cloudflare` adapter to `astro.config.mjs` with `output: 'server'`.
   - Configure `wrangler.toml` for Cloudflare Workers/Pages deployment.
2. **Environment Secrets**:
   - Set `SANITY_PROJECT_ID=dzwbnapy`, `SANITY_DATASET=production`, and `SANITY_API_READ_TOKEN` in Cloudflare dashboard / wrangler secrets.
3. **Cloudflare Deployment Verification**:
   - Deploy to Cloudflare.
   - Repeat Milestone 1 verification checklist on the live Cloudflare URL.
   - Confirm caching behavior: `Cache-Control: no-cache, no-store, must-revalidate` on SSR HTML ensuring instant updates upon browser refresh.

---

## 6. Development Boundary & Routine Studio Editing

### Routine Tasks Managed 100% in Studio (Zero Code / Zero Deployments)
- Editing any text, headline, quote, FAQ, pricing number, or disclaimer across any page.
- Uploading and replacing photos, hero images, case study covers, and video posters.
- Uploading downloadable files (PDFs, templates, checklists) and embedding video URLs.
- Creating, editing, publishing, and unpublishing blog posts, case studies, and resources.
- Adding, reordering, hiding, and duplicating predefined sections on modular pages.
- Creating entirely new landing pages at custom URL paths (e.g., `/lp/workshop`).
- Editing navigation menus, button labels, contact emails, and footer link groups.

### Tasks Requiring Developer Assistance
- Creating completely new visual components or section layouts not present in the current design system.
- Modifying CSS stylesheets, Tailwind configuration, or brand typography fonts.
- Changing third-party transactional integrations (e.g. switching email providers or payment gateways).
