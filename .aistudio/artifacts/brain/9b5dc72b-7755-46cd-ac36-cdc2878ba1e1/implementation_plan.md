# Sanity CMS Integration Plan: Page-by-Page Elementor-Style Flexibility

This revised plan structures **Sanity Studio** (Project ID: `dzwbnapy`, Dataset: `production`) directly mirroring the website's navigation bar, giving non-technical clients the flexibility of a **WordPress + Elementor** experience (adding, removing, editing, and dragging sections, photos, videos, quotes, and blog/resource entries) without altering the existing bespoke design, colors, typography, or performance.

---

## 1. Studio Architecture & Navigation Structure

Using Sanity Studio Desk Structure (`sanity/structure`), the sidebar will directly mirror the website's navigation bar with clear, friendly icons:

```
📁 Sanity Studio Navigation
├── 🏠 Home Page (Hero controls + Drag-and-drop section builder)
├── 🏆 Proof / Case Studies (Page header settings + Case study entries)
├── 💰 Pricing (Header settings + Pricing tier cards)
├── 👤 About Me (Bio quote, history, photo assets, sub-sections)
├── ✍️ Blog (Page settings + Articles collection: add/edit/reorder/delete)
├── 🛠️ Free Tools (Page settings + Resources collection: add/edit/reorder/delete)
├── 📬 Newsletter (Headline, frequency badge, form copy, perks)
├── 💬 Work With Me / Contact (Contact copy, tiers preview, booking text)
└── ⚙️ Site Settings & Global SEO (Brand logo, footer notes, default metadata)
```

---

## 2. Flexible Page Builder & Section Schemas

Each page in Sanity will feature a **Page Builder** array (`type: 'array', of: [...]`) enabling non-technical users to:
- **Add** any section or subsection anywhere on the page
- **Drag to reorder** sections up or down
- **Delete / Disable** any section without breaking layout
- **Replace** any photo, background image, video URL/poster, or quote

### Home Page Controls (`pageHome`)
- **Hero Section**:
  - `title`: Main headline (default: *"Content and messaging advisory for founders, operators, and in-house teams who are too busy doing the work to talk about it."*)
  - `body`: Introduction paragraph
  - `heroImage`: Foreground cutout photo (default: `pointing_wide.png` with alt text)
  - `backgroundImage`: Hero background graphic (default: `bg.png`)
  - `ctaPrimaryText` & `ctaSecondaryText`
  - `metrics`: Orderable list of 3 metric counters (HubSpot 26%, Dixon Academy 2x, Shelia 3 months)
- **Home Page Sections (Reorderable / Removable Array)**:
  1. `whoWeServeSection`: Headings, Card 1 (Marketing Teams: title, body, cta), Card 2 (Founders & Owners: title, body, cta).
  2. `clientStoriesSection`: Featured proof quotes and mint card stories (Shelia & Roslyn).
  3. `videoCarouselSection`: Video player items with video file/URL and custom poster image.
  4. `pricingSection`: Selectable pricing tiers to display.
  5. `comparisonSection`: Us vs Them comparison rows (OUTPUT, VOICE, RESULTS, FIT, TAKEAWAY).
  6. `faqSection`: Expandable accordion FAQ items.
  7. `closingCtaSection`: Final CTA banner, headline, button label, and wide photo (`content_photo.jpg`).
  8. `richTextSection`: Custom headline + text block (for adding new custom copy anywhere).
  9. `mediaHighlightSection`: Custom full-width or side-by-side photo/video block with caption.

### Proof / Case Studies Page (`pageCaseStudies` + `caseStudy` documents)
- Page header title, subtitle, and intro text.
- **Case Study Collection**: Full CRUD (add new, reorder, delete) for case studies:
  - Client name, role, organization/industry, timeframe.
  - Headline, big stat number (e.g. `3x`, `2x`), stat label.
  - Challenge, approach, and outcome text blocks.
  - Pull quotes array (e.g. *"We've gone from zero postings. I never post."*).
  - Client photo / thumbnail image.

### Blog Page (`pageBlog` + `blogPost` documents)
- Page header title, category filter tags.
- **Blog Post Collection**: Full CRUD for articles:
  - Title & auto-generated URL slug.
  - Excerpt & category tag (e.g. *Positioning*, *Content Strategy*, *Case Analysis*).
  - Read time (e.g. *4 min read*), publication date.
  - Featured post toggle.
  - Cover image with alt text.
  - Full article content (rich portable text for paragraphs, quotes, subheadings).

### Free Tools Page (`pageFreeTools` + `toolItem` documents)
- Page header title, description.
- **Resources Collection**: Full CRUD for downloadable tools & assessments:
  - Title (e.g. *The "What Feels Heavy?" Diagnostic*, *45-Minute Oral Extraction Cheatsheet*).
  - Category badge, description paragraph.
  - Deliverable description (e.g. *PDF Guide + Notion Interview Template*).
  - CTA button text & Action type (`audit` modal trigger or direct `download` link/file).
  - Downloadable asset / file upload or external resource URL.

### About Me Page (`pageAbout`)
- Headline quote: *“I work with people who are great at what they do...”*
- Profile photo & workspace photo uploads with instant replacement.
- Body paragraphs (Redwood Software, HubSpot history, operating principles).
- Reorderable subsections (e.g. Principles cards, media highlights).

### Pricing Page (`pagePricing` + `pricingTier` documents)
- Pricing Tiers (Work with me directly, The Signal Room):
  - Tier title, price, cadence, subtitle.
  - Monthly feature checklist items (add, remove, reorder features).
  - Footer note & "Best for" description.
  - Button text and tier identifier for booking navigation.

### Newsletter Page (`pageNewsletter`)
- Header badge, title (*The Signal Letter*), subtitle, and value proposition bullet points.
- Confirmation message after submission.

### Contact / Work With Me Page (`pageContact`)
- Contact headline, email display, booking intro, and direct links.

---

## 3. Implementation Steps

### Step 1: Dependencies & Studio Setup
- Install `@sanity/image-url` in root project.
- Structure `studio/schemaTypes/` with modular schemas:
  - `pageHome.ts`, `pageAbout.ts`, `pageCaseStudies.ts`, `pageBlog.ts`, `pageFreeTools.ts`, `pagePricing.ts`, `pageNewsletter.ts`, `pageContact.ts`
  - Collections: `caseStudy.ts`, `blogPost.ts`, `toolItem.ts`, `pricingTier.ts`, `faqItem.ts`, `videoTestimonial.ts`, `comparisonRow.ts`
  - Blocks: `heroBlock.ts`, `richTextBlock.ts`, `mediaBlock.ts`, `whoWeServeBlock.ts`, `clientStoriesBlock.ts`, `videoCarouselBlock.ts`, `faqBlock.ts`, `comparisonBlock.ts`, `closingCtaBlock.ts`
- Implement custom Desk Structure in `studio/sanity.config.ts` mapping directly to the 8 Navbar items + Site Settings.

### Step 2: Sanity Data Layer (`src/lib/sanity/`)
- `client.ts`: Configures Sanity client for Project `dzwbnapy` / Dataset `production`.
- `image.ts`: Helper `urlForImage(source)` resolving Sanity image CDN URLs, with fallback to local assets.
- `queries.ts`: GROQ queries for all pages, sections, and collections.
- `api.ts`: Fetch functions with **automatic fallback** to existing `src/data/content.ts` and component defaults if Sanity dataset is empty.

### Step 3: Dynamic Section Renderer (`DynamicSection.tsx`)
- A lightweight section dispatcher component that maps Sanity section blocks into the existing React components (`<Hero>`, `<WhoWeServe>`, `<ClientStories>`, `<VideoCarousel>`, `<Pricing>`, `<ComparisonTable>`, `<FAQSection>`, `<ClosingCta>`).
- If an editor reorders sections in Sanity, the page renders them in that exact custom order.
- If a section is removed from the array, it is gracefully omitted from the layout.
- If no Sanity sections are defined, it renders the default layout identically to the existing site.

### Step 4: Page Integration (Astro & React)
- Wire Sanity data fetching into:
  - `src/pages/index.astro` and `src/App.tsx`
  - `src/pages/case-studies.astro` and `src/components/CaseStudiesPage.tsx`
  - `src/pages/blog.astro` and `src/components/BlogPage.tsx`
  - `src/pages/free-tools.astro` and `src/components/FreeToolsPage.tsx`
  - `src/pages/about.astro` and `src/components/AboutPage.tsx`
  - `src/pages/pricing.astro` and `src/components/Pricing.tsx`
  - `src/pages/newsletter.astro` and `src/components/NewsletterPage.tsx`
  - `src/pages/contact.astro` and `src/components/ContactPage.tsx`

### Step 5: Migration Utilities & Seed Data
- Create `data/sanity-seed.ndjson` populated with all current site copy, case studies, blog posts, and resources ready to import with one command.
- Create `scripts/export-ndjson.ts` so all current content is backed up and easily seeded.

---

## 4. Verification Plan

1. **Studio Verification**: Check both `/studio` embedded route in Astro and standalone `studio/` directory. Confirm the 8 Navbar pages and collections appear with clean, intuitive editor controls.
2. **Visual Fidelity Verification**: Ensure 100% match with existing design, typography, colors, animations, and responsive layouts.
3. **Build & Lint Verification**: Run `npm run build` (`astro build`) and `npm run lint` (`tsc --noEmit`) to guarantee zero compilation errors.
4. **Fallback Test**: Verify the site renders seamlessly even without Sanity API tokens or when offline.
