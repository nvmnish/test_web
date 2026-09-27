import { sanityClient } from './client';
import { urlForImage } from './image';
import {
  homePageQuery,
  aboutPageQuery,
  caseStudiesPageQuery,
  allCaseStudiesQuery,
  freeToolsPageQuery,
  allResourcesQuery,
  newsletterPageQuery,
  contactPageQuery,
  blogPageQuery,
  allBlogPostsQuery,
  allFaqsQuery,
  allPricingTiersQuery,
  allClientStoriesQuery,
  siteSettingsQuery,
} from './queries';
import {
  METRICS,
  VIDEO_TESTIMONIALS,
  PRICING_TIERS,
  COMPARISON_DATA,
  FAQ_ITEMS,
} from '../../data/content';

// Safe fetch wrapper with timeout/fallback
async function safeFetch<T = any>(query: string, fallback: any = null): Promise<any> {
  try {
    const data = await sanityClient.fetch(query);
    if (data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)) {
      return data;
    }
    return fallback;
  } catch {
    // Graceful fallback if dataset is empty or offline
    return fallback;
  }
}

// 1. Homepage & Sections Data
export async function getHomePageData() {
  const defaultHome = {
    heroHeadline: 'Marketing for people too busy doing the work.',
    heroSubheadline:
      'I turn operating insight into market authority. You talk for 45 minutes; I build the narrative backbone, voice bank, and demand engine that puts you in front of the right buyers.',
    heroPrimaryCta: 'Book a 20-min gap check',
    heroSecondaryCta: 'Tell me what feels heavy',
    sections: null as any[] | null,
    seoTitle: 'GLS. — Marketing for People Too Busy Doing the Work',
    seoDescription:
      'Content and messaging advisory for founders, operators, and in-house teams by Sheri Otto.',
  };

  const rawHomeDocs = await safeFetch(homePageQuery, null);
  const homeDocsList: any[] = Array.isArray(rawHomeDocs)
    ? rawHomeDocs
    : rawHomeDocs
      ? [rawHomeDocs]
      : [];
  
  // Primary home document (prefer explicitly edited homePage, fallback to page-home)
  const primaryHome = homeDocsList.find((d: any) => d._id === 'homePage') || homeDocsList[0] || null;
  const seededHome = homeDocsList.find((d: any) => d._id === 'page-home') || homeDocsList[0] || null;

  // Also query case studies to fetch client photos for Shelia and Roslyn
  const caseStudyPhotosQuery = `*[_type == "caseStudy" && client in ["Shelia", "Roslyn"]]{
    client,
    clientPhoto{ ..., asset-> },
    "clientPhotoUrl": clientPhoto.asset->url
  }`;
  const caseStudyPhotos = await safeFetch(caseStudyPhotosQuery, []);
  const sheliaCasePhoto = Array.isArray(caseStudyPhotos)
    ? caseStudyPhotos.find((c: any) => c.client?.toLowerCase() === 'shelia')?.clientPhotoUrl
    : null;
  const roslynCasePhoto = Array.isArray(caseStudyPhotos)
    ? caseStudyPhotos.find((c: any) => c.client?.toLowerCase() === 'roslyn')?.clientPhotoUrl
    : null;

  // Active client quotes configuration
  const clientQuotes = {
    quote1: {
      clientName: primaryHome?.quote1ClientName || seededHome?.quote1ClientName || 'Shelia',
      quote: primaryHome?.quote1Quote || seededHome?.quote1Quote || '“We’ve gone from zero postings. I never post.”',
      timeframe: primaryHome?.quote1Timeframe || seededHome?.quote1Timeframe || 'Three months into working together',
      paragraph: primaryHome?.quote1Paragraph || seededHome?.quote1Paragraph || 'She told me no for two months. Too busy, too nervous, not her thing. We started in June anyway. By September, a distant contact\'s barber saw her content, which immediately led to a dentist contracting her for three commercial projects and a custom home build.',
      photoUrl: primaryHome?.quote1PhotoUrl || seededHome?.quote1PhotoUrl || sheliaCasePhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
      tag: primaryHome?.quote1Tag || seededHome?.quote1Tag || 'Commercial Architecture & Building',
      ctaText: primaryHome?.quote1CtaText || seededHome?.quote1CtaText || 'See how content can compound for you',
    },
    quote2: {
      clientName: primaryHome?.quote2ClientName || seededHome?.quote2ClientName || 'Roslyn',
      quote: primaryHome?.quote2Quote || seededHome?.quote2Quote || '“I had no idea. I’m so excited.”',
      timeframe: primaryHome?.quote2Timeframe || seededHome?.quote2Timeframe || 'Hearing her enrollment number out loud',
      paragraph: primaryHome?.quote2Paragraph || seededHome?.quote2Paragraph || 'Her Harrisburg campus had room for 125 children and sat at 28% full. We started in March. By June 30 it was at 56%, and she had never run marketing of any kind before that. She found out on a call with me, because I stopped and asked her for the number.',
      photoUrl: primaryHome?.quote2PhotoUrl || seededHome?.quote2PhotoUrl || roslynCasePhoto || 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=80',
      tag: primaryHome?.quote2Tag || seededHome?.quote2Tag || 'Campus Enrollment & Growth',
      ctaText: primaryHome?.quote2CtaText || seededHome?.quote2CtaText || 'See what this could look like for you',
    },
  };

  const faqs = await safeFetch(allFaqsQuery, FAQ_ITEMS);
  const pricingTiers = await safeFetch(allPricingTiersQuery, PRICING_TIERS);
  const clientStories = await safeFetch(allClientStoriesQuery, null);

  const rawSections = (primaryHome?.sections && primaryHome.sections.length > 0)
    ? primaryHome.sections
    : (seededHome?.sections && seededHome.sections.length > 0)
      ? seededHome.sections
      : null;

  return {
    hero: {
      headline: primaryHome?.heroHeadline || seededHome?.heroHeadline || defaultHome.heroHeadline,
      subheadline: primaryHome?.heroSubheadline || seededHome?.heroSubheadline || defaultHome.heroSubheadline,
      primaryCta: primaryHome?.heroPrimaryCta || seededHome?.heroPrimaryCta || defaultHome.heroPrimaryCta,
      secondaryCta: primaryHome?.heroSecondaryCta || seededHome?.heroSecondaryCta || defaultHome.heroSecondaryCta,
      heroImage: primaryHome?.heroImage || seededHome?.heroImage || null,
      heroBackgroundImage: primaryHome?.heroBackgroundImage || seededHome?.heroBackgroundImage || null,
    },
    clientQuotes,
    sections: (() => {
      if (Array.isArray(rawSections)) {
        // Attach quotesData to clientStoriesSection so it has both custom and defaults
        const enriched = rawSections.map((s: any) => {
          if (s._type === 'clientStoriesSection') {
            return {
              ...s,
              ...clientQuotes,
            };
          }
          return s;
        });

        const compIdx = enriched.findIndex((s: any) => s._type === 'comparisonSection');
        const priceIdx = enriched.findIndex((s: any) => s._type === 'pricingSection');
        if (compIdx !== -1 && priceIdx !== -1 && priceIdx < compIdx) {
          const ordered = [...enriched];
          const [compItem] = ordered.splice(compIdx, 1);
          ordered.splice(priceIdx, 0, compItem);
          return ordered;
        }
        return enriched;
      }
      return rawSections;
    })(),
    whoWeServe: rawSections?.find((s: any) => s._type === 'whoWeServeSection') || null,
    comparison: rawSections?.find((s: any) => s._type === 'comparisonSection') || null,
    closingCta: rawSections?.find((s: any) => s._type === 'closingCtaSection') || null,
    faqs,
    pricingTiers,
    clientStories,
    metrics: rawSections?.find((s: any) => s._type === 'metricsSection')?.metrics || METRICS,
    videoTestimonials: rawSections?.find((s: any) => s._type === 'videoCarouselSection') || { videos: VIDEO_TESTIMONIALS },
    comparisonData: rawSections?.find((s: any) => s._type === 'comparisonSection')?.rows || COMPARISON_DATA,
    seo: {
      title: primaryHome?.seoTitle || seededHome?.seoTitle || defaultHome.seoTitle,
      description: primaryHome?.seoDescription || seededHome?.seoDescription || defaultHome.seoDescription,
    },
  };
}

// 2. About Page Data
export async function getAboutPageData() {
  const defaultAbout = {
    eyebrow: 'About GLS & Sheri Otto',
    headlineQuote:
      '“I work with people who are great at what they do. My job is making sure the right people know it..”',
    bioLead:
      'I am Sheri Otto. I run positioning, executive narrative, and demand architecture for founders, operators, and in-house marketing leaders.',
    bioParagraphs: [
      'I spent about ten years in growth marketing. Most recently at Redwood Software, where I drove 26% year over year pipeline growth. Before that, HubSpot, where I co-hosted INBOUND\'s first live webinar on LinkedIn. I do this full time now, from just outside Charlotte.',
      'What I do now is the same thing I did there, minus the committee. I find the story that is already inside the work and build the system that keeps telling it.',
      'Most content advisory fails for a predictable reason: traditional agencies sell you senior strategists and hand off execution to junior copywriters who know nothing about your business. Or they rely on AI prompts that sound like generic motivational tropes.',
      'At GLS, we partner deeply with only 3 to 6 clients at a time. I personally do the work with you. You talk for 45 minutes bi-weekly; the rest gets shaped, polished, and shipped.',
    ],
    principlesTitle: 'How I Think About This Work',
    principles: [
      {
        number: '01',
        title: 'The best marketing is what you already know',
        description:
          'You do not need a content strategy that invents who you are. The answers you give your clients on daily calls are already your most persuasive marketing.',
      },
      {
        number: '02',
        title: 'If it sounds like an agency wrote it, it fails',
        description:
          'Your peers and buyers can smell ghostwritten fluff instantly. Every sentence must sound like the owner in a room with a client, zero exceptions.',
      },
      {
        number: '03',
        title: 'Consistency beats intensity',
        description:
          'A single viral post means nothing without pipeline. Compounding visibility over 90 days creates an engine that turns casual readers into high-intent buyers.',
      },
    ],
    seoTitle: 'About Sheri Otto & GLS. — Marketing Advisory',
    seoDescription:
      'Learn about Sheri Otto and the three GLS principles behind messaging that sounds like you.',
  };

  const data = await safeFetch(aboutPageQuery, null);

  return {
    eyebrow: data?.eyebrow || defaultAbout.eyebrow,
    headlineQuote: data?.headlineQuote || defaultAbout.headlineQuote,
    bioLead: data?.bioLead || defaultAbout.bioLead,
    bioParagraphs: data?.bioParagraphs?.length ? data.bioParagraphs : defaultAbout.bioParagraphs,
    bioImage: data?.bioImage || null,
    principlesTitle: data?.principlesTitle || defaultAbout.principlesTitle,
    principles: data?.principles?.length ? data.principles : defaultAbout.principles,
    sections: data?.sections || null,
    seo: {
      title: data?.seoTitle || defaultAbout.seoTitle,
      description: data?.seoDescription || defaultAbout.seoDescription,
    },
  };
}

// 3. Case Studies Page Data
export async function getCaseStudiesPageData() {
  const defaultStudies = [
    {
      id: 'shelia',
      client: 'Shelia',
      role: 'Managing Principal & Founder',
      industry: 'Commercial Construction & Architecture',
      timeframe: '3 Months In',
      headline: 'From zero online presence to 3 commercial projects and a custom home build',
      statNumber: '3x',
      statLabel: 'Commercial Projects Originated',
      quote:
        "We've gone from zero postings. I never post. She told me no for two months. Too busy, too nervous, not her thing. We started in June anyway.",
      challenge:
        'Shelia had decades of pristine building expertise but felt overwhelmed by writing, social algorithms, and self-promotion. Zero content was reaching potential enterprise developers.',
      approach:
        'Bi-weekly 45-minute audio conversations capturing her actual site walkthroughs, material constraints, and contractor management philosophy into crisp, authoritative essays.',
      outcome:
        "A distant contact's barber saw her content, connecting her to a regional dentist who awarded three major commercial expansion contracts and a strip mall build across town.",
    },
    {
      id: 'roslyn',
      client: 'Roslyn',
      role: 'Founder & Head of School',
      industry: 'Early Childhood Education & Academies',
      timeframe: '4 Months In',
      headline: 'Doubling campus enrollment from 28% to 56% without prior marketing history',
      statNumber: '2x',
      statLabel: 'Enrollment Capacity Doubled',
      quote:
        'Her Harrisburg campus has room for 125 children. It sat at 28% full. By June 30 it was at 56%, and she had never run marketing before.',
      challenge:
        'A brand-new Harrisburg campus built for 125 children sat mostly empty due to reliance on slow word-of-mouth and zero regional brand awareness.',
      approach:
        'Structured narrative campaigns showcasing the academy curriculum, teacher retention philosophy, and parents’ emotional peace of mind directly on local channels.',
      outcome:
        'Campus enrollment surged from 28% to 56% within one quarter, generating a sustained waiting list for the upcoming academic year.',
    },
    {
      id: 'candice',
      client: 'Candice',
      role: 'Communications and Operations, Levantar',
      industry: 'Nonprofit · Redwood City',
      timeframe: 'Email Engine Sprint',
      storyParagraphs: [
        'Candice runs communications and operations for Levantar, a nonprofit in Redwood City. Her second newsletter was the one that would bring in sponsors and donors, and she had been putting it off. The first one took her eight hours.',
        'When I asked where the second one was, she said "I haven\'t started it. I don\'t have another eight hours."',
        'We sat down and built her an email engine in about an hour. She talks into her phone, it comes back with three versions, she picks and tweaks. She was nervous at first because she wanted to do all the writing herself. Then she saw the words coming back were hers.',
      ],
      quotes: [
        '"The words that Claude added, they\'re just helping tell the story." — Candice, using the engine on camera',
      ],
    },
    {
      id: 'diane',
      client: 'Diane Freeman',
      role: 'Founder, Bee Seen Social Media Marketing',
      industry: 'Social Media Agency · Saint Augustine',
      timeframe: 'Signal Bank Implementation',
      storyParagraphs: [
        'Diane Freeman runs Bee Seen Social Media Marketing in Saint Augustine. She used to sit a client down once and pull everything out in one long interview, then work off that document until it ran dry.',
        'Now every client has a signal bank that grows every time she talks to them. Coffee chats, interviews, testimonials, all of it goes in. She keeps one for her own brand too.',
      ],
      quotes: [
        '"With the Signal Bank, the emotion is built into it." — Diane Freeman',
        '"My clients love it. They think I\'m like this genius. Really, you\'re the genius, and their content is getting traction." — Diane Freeman',
      ],
    },
  ];

  const page = await safeFetch(caseStudiesPageQuery, null);
  const allStudies = await safeFetch(allCaseStudiesQuery, []);

  let rawStudies: any[] = [];
  if (page?.featuredStudies?.length > 0) {
    const featuredIds = new Set(page.featuredStudies.map((s: any) => s._id));
    const remaining = (allStudies || []).filter((s: any) => !featuredIds.has(s._id));
    rawStudies = [...page.featuredStudies, ...remaining];
  } else if (allStudies?.length > 0) {
    rawStudies = allStudies;
  } else {
    rawStudies = defaultStudies;
  }

  const studies = rawStudies.map((s: any) => ({
    ...s,
    id: s.id || s.slug?.current || s._id,
    clientPhotoUrl: s.clientPhotoUrl || (s.clientPhoto ? (urlForImage(s.clientPhoto) ?? undefined) : undefined),
  }));

  return {
    eyebrow: page?.eyebrow || 'Client Proof & Case Studies',
    headline: page?.headline || 'What happens when expertise gets seen',
    description:
      page?.description ||
      'Real numbers from founders, builders, and marketing leaders who stopped hiding behind delivery and let their perspective compound in public.',
    studies,
    sections: page?.sections || null,
    seo: {
      title: page?.seoTitle || 'Case Studies & Proof — GLS.',
      description:
        page?.seoDescription ||
        'Real numbers and client breakdowns from founders who stopped hiding behind delivery.',
    },
  };
}

// 4. Free Tools & Resources Page Data
export async function getFreeToolsPageData() {
  const defaultTools = [
    {
      id: 'heavy-audit',
      title: 'The "What Feels Heavy?" Diagnostic',
      category: 'Diagnostic Assessment',
      description:
        'Diagnose whether your bottleneck is voice drift, internal approval drag, or market indifference in under 2 minutes.',
      deliverable: 'Personalized Diagnostic Breakdown & Strategy Prescription',
      photoTagText: 'Format: 2-Minute Diagnostic Assessment',
      ctaText: 'Launch assessment',
      type: 'audit',
    },
    {
      id: 'signal-extraction',
      title: 'The 45-Minute Oral Extraction Cheatsheet',
      category: 'Framework & Prompts',
      description:
        'The exact conversational interview prompts we use to extract 6 weeks of category-defining essays from a single 45-minute founder conversation.',
      deliverable: 'PDF Guide + Notion Interview Template',
      photoTagText: 'Format: PDF Guide + Notion Interview Template',
      ctaText: 'Download framework (Instant access)',
      type: 'download',
    },
    {
      id: 'positioning-matrix',
      title: 'B2B Founder Differentiation Scorecard',
      category: 'Spreadsheet Calculator',
      description:
        'Score your current content against 5 core indicators of authority: lived proof, counter-intuitive insight, tone fidelity, clear positioning, and pipeline velocity.',
      deliverable: 'Google Sheets / Excel Self-Scorecard',
      photoTagText: 'Format: Google Sheets / Excel Self-Scorecard',
      ctaText: 'Get scorecard template',
      type: 'download',
    },
    {
      id: 'headline-reframing',
      title: 'The "Nobody Cares" Messaging Teardown Guide',
      category: 'Editorial Guide',
      description:
        'A side-by-side swipe file of 12 real founder hooks reframed from dry corporate jargon into magnetic enterprise narratives.',
      deliverable: '18-Page Field Guide',
      photoTagText: 'Format: 18-Page Field Guide & Swipe File',
      ctaText: 'Download swipe guide',
      type: 'download',
    },
  ];

  const page = await safeFetch(freeToolsPageQuery, null);
  const allTools = await safeFetch(allResourcesQuery, []);

  let rawTools: any[] = [];
  if (page?.featuredTools?.length > 0) {
    const featuredIds = new Set(page.featuredTools.map((t: any) => t._id));
    const remaining = (allTools || []).filter((t: any) => !featuredIds.has(t._id));
    rawTools = [...page.featuredTools, ...remaining];
  } else if (allTools?.length > 0) {
    rawTools = allTools;
  } else {
    rawTools = defaultTools;
  }

  const tools = rawTools.map((t: any) => ({
    ...t,
    id: t.id || t.slug?.current || t._id,
    _id: t._id,
    title: t.title,
    category: t.category,
    description: t.description,
    deliverable: t.deliverable,
    photoTagText: t.photoTagText || (t.deliverable ? `Format: ${t.deliverable}` : 'Format: Instant Download & Templates'),
    ctaText: t.ctaText || 'Download framework',
    type: t.type || 'download',
    featureList: t.featureList && t.featureList.length > 0 ? t.featureList : undefined,
    reviews: t.reviews && t.reviews.length > 0 ? t.reviews : undefined,
    image: t.imageUrl || (t.coverImage ? (urlForImage(t.coverImage) ?? undefined) : undefined) || t.image,
    downloadFileUrl: t.downloadFileUrl || t.downloadFile?.asset?.url,
    externalUrl: t.externalUrl,
    order: t.order ?? 0,
  }));

  return {
    eyebrow: page?.eyebrow || 'Free Tools & Diagnostics',
    headline: page?.headline || 'Where does your message stall?',
    description:
      page?.description ||
      'Four diagnostic tools and frameworks we use with founders to identify voice leaks, approval friction, and market silence before building a strategy.',
    tools,
    sections: page?.sections || null,
    seo: {
      title: page?.seoTitle || 'Free Tools & Diagnostics — GLS.',
      description:
        page?.seoDescription ||
        'Free diagnostics, scorecards, and extraction frameworks for founders and marketing leaders.',
    },
  };
}

// 5. Blog Page Data
export async function getBlogPageData() {
  const defaultArticles = [
    {
      id: '1',
      title: 'Why Nobody Outside Can Tell What Your Company Actually Does',
      excerpt:
        'You are answering 20 questions a day from clients and your team, but your public message sounds like a committee-approved press release. Here is where the signal is getting lost.',
      category: 'Positioning',
      readTime: '4 min read',
      date: 'Sep 14, 2026',
      featured: true,
    },
    {
      id: '2',
      title: 'The 45-Minute Ghostwriting Trap (And Why Most AI Posts Fall Flat)',
      excerpt:
        'Why generic LinkedIn frameworks dilute hard-won founder authority, and how to capture lived operating experience verbatim instead.',
      category: 'Content Strategy',
      readTime: '6 min read',
      date: 'Sep 08, 2026',
    },
    {
      id: '3',
      title: 'How Shelia Landed 3 Commercial Projects from a Single Post',
      excerpt:
        'A deep dive into how a zero-post builder turned client conversations into an organic pipeline that brought developers straight to her inbox.',
      category: 'Case Analysis',
      readTime: '5 min read',
      date: 'Aug 29, 2026',
    },
    {
      id: '4',
      title: 'When Marketing Ships Everything and Nothing Lands',
      excerpt:
        'Inside the sprint burnout of modern in-house marketing teams, and how to shift from task delivery to market trust.',
      category: 'In-House Teams',
      readTime: '7 min read',
      date: 'Aug 21, 2026',
    },
    {
      id: '5',
      title: 'The 3 Numbers Every B2B Founder Needs in Their Head Before a Call',
      excerpt:
        'How clarity on your benchmark customer, your core constraint, and your real unit economics turns casual conversations into enterprise buyers.',
      category: 'Sales Alignment',
      readTime: '4 min read',
      date: 'Aug 12, 2026',
    },
  ];

  const page = await safeFetch(blogPageQuery, null);
  const posts = await safeFetch(allBlogPostsQuery, []);

  const articles =
    posts?.length > 0
      ? posts.map((p: any, idx: number) => ({
          id: p.slug || p._id || String(idx + 1),
          slug: p.slug || p._id,
          title: p.title,
          excerpt: p.excerpt,
          content: p.content,
          category: p.category || 'Positioning',
          readTime: p.readTime || '5 min read',
          date: p.dateString || (p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'),
          featured: p.featured || (idx === 0),
          coverImage: p.coverImage || null,
          image: p.imageUrl || (p.coverImage ? (urlForImage(p.coverImage) ?? undefined) : undefined),
        }))
      : defaultArticles;

  return {
    eyebrow: page?.eyebrow || 'Field Notes & Essays',
    headline: page?.headline || 'Writing about the work',
    description:
      page?.description ||
      'Essays on positioning, founder-led messaging, demand architecture, and why so much B2B content gets shipped and forgotten.',
    articles,
    sections: page?.sections || null,
    seo: {
      title: page?.seoTitle || 'Field Notes & Essays — GLS.',
      description:
        page?.seoDescription ||
        'Essays on positioning, founder-led messaging, demand architecture, and authority by Sheri Otto.',
    },
  };
}

// 6. Newsletter Page Data
export async function getNewsletterPageData() {
  const defaultNewsletter = {
    eyebrow: 'The Weekly Signal',
    headline: 'One message breakdown every Thursday morning.',
    description:
      'How founders turn raw operating knowledge into market authority. No fluff, no ChatGPT templates, no motivational quotes. Just real client teardowns and tactical positioning adjustments.',
    buttonText: 'Get The Signal',
    disclaimer: 'Sent to 1,200+ founders & operators. No spam, ever. Unsubscribe in one click.',
    benefits: [
      {
        title: '10-minute read',
        description: 'Dense, practical breakdowns designed for founders and operators who don\'t have time for fluff.',
      },
      {
        title: 'Real client copy teardowns',
        description: 'Before-and-after examples from actual client sprints showing how we turn jargon into pipeline.',
      },
      {
        title: 'Voice extraction prompts',
        description: 'The exact questions I use to pull clear positioning out of busy leaders in short working calls.',
      },
    ],
    recentEditions: [
      {
        issue: 'Issue #47',
        title: 'Why your best customer story isn\'t on your website',
        date: 'Thursday, Sep 18',
        snippet: 'The difference between what clients say on Zoom and what ends up on your case studies page.',
      },
      {
        issue: 'Issue #46',
        title: 'The three questions that kill "we help businesses grow"',
        date: 'Thursday, Sep 11',
        snippet: 'How to replace the sentence everyone writes with the one that actually creates a buying decision.',
      },
      {
        issue: 'Issue #45',
        title: 'How Shelia went from zero posts to three commercial projects',
        date: 'Thursday, Sep 4',
        snippet: 'The step-by-step breakdown of the content sprint that brought a dentist to a builder\'s inbox.',
      },
    ],
    seoTitle: 'The Weekly Signal Newsletter — GLS.',
    seoDescription:
      'Weekly message breakdowns and executive positioning notes by Sheri Otto.',
  };

  const data = await safeFetch(newsletterPageQuery, null);

  return {
    eyebrow: data?.eyebrow || defaultNewsletter.eyebrow,
    headline: data?.headline || defaultNewsletter.headline,
    description: data?.description || defaultNewsletter.description,
    buttonText: data?.buttonText || defaultNewsletter.buttonText,
    disclaimer: data?.disclaimer || defaultNewsletter.disclaimer,
    benefits: data?.benefits?.length ? data.benefits : defaultNewsletter.benefits,
    recentEditions: data?.recentEditions?.length ? data.recentEditions : defaultNewsletter.recentEditions,
    sections: data?.sections || null,
    seo: {
      title: data?.seoTitle || defaultNewsletter.seoTitle,
      description: data?.seoDescription || defaultNewsletter.seoDescription,
    },
  };
}

// 7. Contact Page Data
export async function getContactPageData() {
  const defaultContact = {
    eyebrow: 'Get in touch',
    headline: "Let's find the one thing you need to say.",
    description:
      'Whether you want to explore direct advisory, enroll your team in The Signal Room, or run a diagnostic on where your messaging stalls.',
    email: 'sheri@growthlanestrategies.com',
    location: 'Charlotte, North Carolina · Available Globally',
    bookingCtaText: 'Book a 20-minute gap check',
    bookingDescription:
      'No deck, no hard sell. We identify where your message is losing signal and give you 2-3 specific adjustments.',
    seoTitle: 'Contact Sheri Otto & GLS. — Marketing Advisory',
    seoDescription:
      'Get in touch with Sheri Otto for content, positioning, and narrative advisory.',
  };

  const data = await safeFetch(contactPageQuery, null);

  return {
    eyebrow: data?.eyebrow || defaultContact.eyebrow,
    headline: data?.headline || defaultContact.headline,
    description: data?.description || defaultContact.description,
    email: data?.email || defaultContact.email,
    location: data?.location || defaultContact.location,
    bookingCtaText: data?.bookingCtaText || defaultContact.bookingCtaText,
    bookingDescription: data?.bookingDescription || defaultContact.bookingDescription,
    sections: data?.sections || null,
    seo: {
      title: data?.seoTitle || defaultContact.seoTitle,
      description: data?.seoDescription || defaultContact.seoDescription,
    },
  };
}

// 8. Site Settings & Global SEO
export async function getSiteSettings() {
  const defaultSettings = {
    siteTitle: 'GLS. — Marketing for People Too Busy Doing the Work',
    siteDescription:
      'Content and messaging advisory for founders, operators, and in-house teams by Sheri Otto.',
    contactEmail: 'sheri@growthlanestrategies.com',
    linkedinUrl: 'https://linkedin.com/in/sheriotto',
    footerNote: 'Growth Lane Strategies. Content and messaging advisory by Sheri Otto.',
  };

  const data = await safeFetch(siteSettingsQuery, null);

  return {
    siteTitle: data?.siteTitle || defaultSettings.siteTitle,
    siteDescription: data?.siteDescription || defaultSettings.siteDescription,
    contactEmail: data?.contactEmail || defaultSettings.contactEmail,
    bookingUrl: data?.bookingUrl || null,
    linkedinUrl: data?.linkedinUrl || defaultSettings.linkedinUrl,
    footerNote: data?.footerNote || defaultSettings.footerNote,
    ogImage: data?.ogImage || null,
  };
}
