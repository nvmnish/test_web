import fs from 'node:fs';
import path from 'node:path';

// Generate complete, pristine Sanity seed matching the exact state of the site
export function generateSeedDocs() {
  const docs: any[] = [];

  // 1. Global Site Settings
  docs.push({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: 'GLS. — Marketing for People Too Busy Doing the Work',
    siteDescription: 'Content and messaging advisory for founders, operators, and in-house teams by Sheri Otto.',
    contactEmail: 'sheri@growthlanestrategies.com',
    bookingUrl: 'https://calendar.app.google/sample',
    linkedinUrl: 'https://linkedin.com/in/sheriotto',
    footerNote: 'Growth Lane Strategies. Content and messaging advisory by Sheri Otto.',
  });

  // 2. Global Footer
  docs.push({
    _id: 'footer',
    _type: 'footer',
    companyName: 'Growth Lane Strategies',
    shortBio: 'Content and messaging advisory by Sheri Otto.',
    contactEmail: 'sheri@growthlanestrategies.com',
    linkedinUrl: 'https://linkedin.com/in/sheriotto',
  });

  // 3. Homepage (Both canonical 'homePage' and legacy 'page-home')
  const homeData = {
    _type: 'homePage',
    title: 'Homepage',
    heroHeadline: 'Marketing for people too busy doing the work.',
    heroSubheadline:
      'I turn operating insight into market authority. You talk for 45 minutes; I build the narrative backbone, voice bank, and demand engine that puts you in front of the right buyers.',
    heroPrimaryCta: 'Book a 20-min gap check',
    heroSecondaryCta: 'Tell me what feels heavy',
    quote1ClientName: 'Shelia',
    quote1Quote: "“We've gone from zero postings. I never post.”",
    quote1Timeframe: 'Three months into working together',
    quote1Paragraph:
      "She told me no for two months. Too busy, too nervous, not her thing. We started in June anyway. By September, a distant contact's barber saw her content, which immediately led to a dentist contracting her for three commercial projects and a custom home build.",
    quote1Tag: 'Commercial Architecture & Building',
    quote1CtaText: 'See how content can compound for you',
    quote2ClientName: 'Roslyn',
    quote2Quote: "“I had no idea. I'm so excited.”",
    quote2Timeframe: 'Hearing her enrollment number out loud',
    quote2Paragraph:
      'Her Harrisburg campus had room for 125 children and sat at 28% full. We started in March. By June 30 it was at 56%, and she had never run marketing of any kind before that. She found out on a call with me, because I stopped and asked her for the number.',
    quote2Tag: 'Campus Enrollment & Growth',
    quote2CtaText: 'See what this could look like for you',
    popupEnabled: true,
    popupBadge: 'free tool',
    popupHeadline: 'Transform Your B2B Email in Under 3 Seconds',
    popupButtonText: 'Fix My Email',
    sections: [
      {
        _key: 'sec-who-we-serve',
        _type: 'whoWeServeSection',
        heading: 'Who We Serve',
        marketingTeamsEyebrow: 'MARKETING TEAMS',
        marketingTeamsTitle: 'Your team is shipping everything. \nNothing is landing.',
        marketingTeamsParagraphs: [
          'You are in sprint meetings, status updates, and delivery cycles all day. What is due, what is blocked, who owns what. The work goes out on time and the market cannot feel any of it.',
          'I find the signal inside what your team already knows, then shape the message around what buyers need to hear before they will trust you and move.',
        ],
        marketingTeamsCta: 'See how it works',
        foundersEyebrow: 'FOUNDERS AND OWNERS',
        foundersTitle: 'You are the one everybody asks. \nNobody outside can tell.',
        foundersParagraphs: [
          'You built something. People rely on what you know. You are also the one holding it together, so content stays a thing you think about on the drive home and never do.',
          'I pull what is buried in your experience and turn it into something visible and steady, without adding one more thing you have to write yourself.',
        ],
        foundersCta: 'See how it works',
      },
      {
        _key: 'sec-metrics',
        _type: 'metricsSection',
        eyebrow: 'Verified Operating Impact',
        heading: 'Real Numbers From Leaders Who Stopped Hiding Behind Delivery',
        metrics: [
          {
            number: 26,
            suffix: '%',
            description:
              'pipeline growth at HubSpot, year over year, by tying demand work to revenue instead of activity',
            barPercentage: 55,
          },
          {
            number: 2,
            suffix: 'x',
            description:
              "enrollment at Dixon Academy's Harrisburg campus. 28% to 56% of 125 spots, by June 30. Roslyn's first time running any marketing at all.",
            barPercentage: 75,
          },
          {
            number: 3,
            suffix: ' months',
            description: "from Shelia's first post ever to a dentist calling her about three buildings",
            barPercentage: 60,
          },
        ],
      },
      {
        _key: 'sec-client-stories',
        _type: 'clientStoriesSection',
        heading: 'Client Stories',
        stories: [
          {
            _key: 'story-shelia',
            eyebrow: 'Client Story',
            quote: "“We've gone from zero postings. I never post.”",
            clientName: 'Shelia',
            timeframe: 'Three months into working together',
            paragraph:
              "She told me no for two months. Too busy, too nervous, not her thing. We started in June anyway. By September, a distant contact's barber saw her content, which immediately led to a dentist contracting her for three commercial projects and a custom home build.",
            photoTag: 'Commercial Architecture & Building',
            ctaText: 'See how content can compound for you',
            imagePlacement: 'right',
          },
          {
            _key: 'story-roslyn',
            eyebrow: 'Client Story',
            quote: "“I had no idea. I'm so excited.”",
            clientName: 'Roslyn',
            timeframe: 'Hearing her enrollment number out loud',
            paragraph:
              'Her Harrisburg campus had room for 125 children and sat at 28% full. We started in March. By June 30 it was at 56%, and she had never run marketing of any kind before that. She found out on a call with me, because I stopped and asked her for the number.',
            photoTag: 'Campus Enrollment & Growth',
            ctaText: 'See what this could look like for you',
            imagePlacement: 'left',
          },
        ],
      },
      {
        _key: 'sec-video-carousel',
        _type: 'videoCarouselSection',
        heading: "Don't take our word for it.",
        subheading: 'Hear it from the people who trusted us.',
        videos: [
          {
            _key: 'v-sandra',
            id: '1',
            clientName: 'Sandra',
            videoSrc: '/videos/Sandra.mp4',
            poster: '/images/Sandra.png',
          },
          {
            _key: 'v-alex',
            id: '2',
            clientName: 'Alex',
            videoSrc: '/videos/Alex.mp4',
            poster: '/images/Alex.png',
          },
          {
            _key: 'v-noname',
            id: '3',
            clientName: 'No Name',
            videoSrc: '/videos/noname.mp4',
            poster: '/images/noname.png',
          },
        ],
      },
      {
        _key: 'sec-comparison',
        _type: 'comparisonSection',
        heading: "Who we aren't",
        subheading: "Most content agencies look the same. Here's what makes working with GLS different.",
        rows: [
          {
            _key: 'row-1',
            dimension: 'OUTPUT',
            gls: 'Strategy-led content that builds authority',
            others: 'Volume-driven posts that fill a calendar',
          },
          {
            _key: 'row-2',
            dimension: 'VOICE',
            gls: 'Sounds exactly like you — no one guesses',
            others: 'Generic brand tone that could be anyone',
          },
          {
            _key: 'row-3',
            dimension: 'RESULTS',
            gls: 'Compounding visibility over time',
            others: 'Vanity metrics with no business impact',
          },
          {
            _key: 'row-4',
            dimension: 'FIT',
            gls: 'One on one with me or only 8 seats at a time',
            others: "Agency model: you're one of 40 accounts",
          },
          {
            _key: 'row-5',
            dimension: 'TAKEAWAY',
            gls: 'A system + clarity on messaging + done for you content',
            others: 'A disconnected calendar of random posts without compounding impact',
          },
        ],
      },
      {
        _key: 'sec-pricing',
        _type: 'pricingSection',
        heading: 'Pricing',
      },
      {
        _key: 'sec-faq',
        _type: 'faqSection',
        heading: 'Frequently Asked Questions',
      },
      {
        _key: 'sec-closing-cta',
        _type: 'closingCtaSection',
        eyebrow: 'The Working Philosophy',
        quote: '“I work with people who are great at what they do. My job is making sure the right people know it.”',
        author: 'Sheri Otto',
        role: 'Founder, GLS',
        headline: 'Your expertise deserves to be seen.',
        subheadline:
          "Stop letting what you know stay trapped inside client delivery and team meetings. Let's turn it into demand.",
        primaryCta: 'Book a 20-minute gap check',
        secondaryCta: 'Or tell me what feels heavy',
      },
    ],
    seoTitle: 'GLS. — Marketing for People Too Busy Doing the Work',
    seoDescription:
      'Content and messaging advisory for founders, operators, and in-house teams by Sheri Otto.',
  };

  docs.push({ _id: 'homePage', ...homeData });
  docs.push({ _id: 'page-home', ...homeData });

  // 4. About Page
  const aboutData = {
    _type: 'aboutPage',
    title: 'About Page',
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
        _key: 'p1',
        number: '01',
        title: 'The best marketing is what you already know',
        description:
          'You do not need a content strategy that invents who you are. The answers you give your clients on daily calls are already your most persuasive marketing.',
      },
      {
        _key: 'p2',
        number: '02',
        title: 'If it sounds like an agency wrote it, it fails',
        description:
          'Your peers and buyers can smell ghostwritten fluff instantly. Every sentence must sound like the owner in a room with a client, zero exceptions.',
      },
      {
        _key: 'p3',
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

  docs.push({ _id: 'aboutPage', ...aboutData });
  docs.push({ _id: 'page-about', ...aboutData });

  // 5. Case Studies Page
  const caseStudiesPageData = {
    _type: 'caseStudiesPage',
    title: 'Proof & Case Studies',
    eyebrow: 'Client Proof & Case Studies',
    headline: 'What happens when expertise gets seen',
    description:
      'Real numbers from founders, builders, and marketing leaders who stopped hiding behind delivery and let their perspective compound in public.',
    featuredStudies: [
      { _type: 'reference', _ref: 'study-shelia', _key: 'ref-shelia' },
      { _type: 'reference', _ref: 'study-roslyn', _key: 'ref-roslyn' },
      { _type: 'reference', _ref: 'study-candice', _key: 'ref-candice' },
      { _type: 'reference', _ref: 'study-diane', _key: 'ref-diane' },
    ],
    seoTitle: 'Case Studies & Proof — GLS. Executive Marketing Advisory',
    seoDescription:
      'Explore real case studies showing how founders and in-house teams turned executive expertise into pipeline and enrollment.',
  };

  docs.push({ _id: 'caseStudiesPage', ...caseStudiesPageData });
  docs.push({ _id: 'page-case-studies', ...caseStudiesPageData });

  // 6. Case Studies Collection
  docs.push(
    {
      _id: 'study-shelia',
      _type: 'caseStudy',
      client: 'Shelia',
      slug: { _type: 'slug', current: 'shelia' },
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
      order: 1,
    },
    {
      _id: 'study-roslyn',
      _type: 'caseStudy',
      client: 'Roslyn',
      slug: { _type: 'slug', current: 'roslyn' },
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
      order: 2,
    },
    {
      _id: 'study-candice',
      _type: 'caseStudy',
      client: 'Candice',
      slug: { _type: 'slug', current: 'candice' },
      role: 'Communications and Operations, Levantar',
      industry: 'Nonprofit · Redwood City',
      timeframe: 'Email Engine Sprint',
      headline: 'From 8 hours of staring at a blank cursor to a 1-hour voice-to-email engine',
      statNumber: '8x',
      statLabel: 'Time Saved Per Newsletter',
      quote: '"The words that Claude added, they\'re just helping tell the story." — Candice',
      storyParagraphs: [
        'Candice runs communications and operations for Levantar, a nonprofit in Redwood City. Her second newsletter was the one that would bring in sponsors and donors, and she had been putting it off. The first one took her eight hours.',
        'When I asked where the second one was, she said "I haven\'t started it. I don\'t have another eight hours."',
        'We sat down and built her an email engine in about an hour. She talks into her phone, it comes back with three versions, she picks and tweaks. She was nervous at first because she wanted to do all the writing herself. Then she saw the words coming back were hers.',
      ],
      quotes: ['"The words that Claude added, they\'re just helping tell the story." — Candice, using the engine on camera'],
      order: 3,
    },
    {
      _id: 'study-diane',
      _type: 'caseStudy',
      client: 'Diane Freeman',
      slug: { _type: 'slug', current: 'diane' },
      role: 'Founder, Bee Seen Social Media Marketing',
      industry: 'Social Media Agency · Saint Augustine',
      timeframe: 'Signal Bank Implementation',
      headline: 'Replacing the one-and-done client interview with an ever-expanding live Signal Bank',
      statNumber: '100%',
      statLabel: 'Client Retention & Momentum',
      quote: '"With the Signal Bank, the emotion is built into it." — Diane Freeman',
      storyParagraphs: [
        'Diane Freeman runs Bee Seen Social Media Marketing in Saint Augustine. She used to sit a client down once and pull everything out in one long interview, then work off that document until it ran dry.',
        'Now every client has a signal bank that grows every time she talks to them. Coffee chats, interviews, testimonials, all of it goes in. She keeps one for her own brand too.',
      ],
      quotes: [
        '"With the Signal Bank, the emotion is built into it." — Diane Freeman',
        '"My clients love it. They think I\'m like this genius. Really, you\'re the genius, and their content is getting traction." — Diane Freeman',
      ],
      order: 4,
    }
  );

  // 7. Free Tools & Resources Page
  const freeToolsPageData = {
    _type: 'freeToolsPage',
    title: 'Free Tools & Resources',
    eyebrow: 'Free Tools & Diagnostics',
    headline: 'Where does your message stall?',
    description:
      'Four diagnostic tools and frameworks we use with founders to identify voice leaks, approval friction, and market silence before building a strategy.',
    featuredTools: [
      { _type: 'reference', _ref: 'resource-heavy-audit', _key: 'ref-tool-1' },
      { _type: 'reference', _ref: 'resource-signal-extraction', _key: 'ref-tool-2' },
      { _type: 'reference', _ref: 'resource-positioning-matrix', _key: 'ref-tool-3' },
      { _type: 'reference', _ref: 'resource-headline-reframing', _key: 'ref-tool-4' },
    ],
    seoTitle: 'Free Executive Marketing Tools & Diagnostic Kits — GLS.',
    seoDescription:
      'Run internal diagnostics, grab our 45-minute oral extraction cheatsheet, and score your market differentiation with our free resources.',
  };

  docs.push({ _id: 'freeToolsPage', ...freeToolsPageData });
  docs.push({ _id: 'page-free-tools', ...freeToolsPageData });

  // 8. Free Tools Resources Collection (both resource-heavy-audit and resource-1)
  const resourcesData = [
    {
      id: 'heavy-audit',
      altId: 'resource-1',
      title: 'The "What Feels Heavy?" Diagnostic',
      category: 'Diagnostic Assessment',
      description:
        'Diagnose whether your bottleneck is voice drift, internal approval drag, or market indifference in under 2 minutes.',
      deliverable: 'Personalized Diagnostic Breakdown & Strategy Prescription',
      photoTagText: 'Format: 2-Minute Diagnostic Assessment',
      ctaText: 'Launch assessment',
      type: 'audit',
      featureList: [
        'Pinpoints whether your bottleneck is internal approval friction, tone dilution, or lack of pipeline attribution.',
        'Identifies the exact moments your commercial signal leaks on sales debriefs.',
        'Generates a personalized, tactical prescription tailored to founders vs. in-house marketing teams.',
        'Takes less than 2 minutes with zero generic corporate jargon.',
      ],
      reviews: [
        {
          _key: 'rev-1',
          filledStars: 5,
          quote:
            'We stopped wasting 8 hours a week debating newsletter copy. Within two days of applying this framework, our partners were speaking straight to high-value prospects.',
          name: 'Candice M.',
          role: 'Operations & Comms, Levantar',
        },
        {
          _key: 'rev-2',
          filledStars: 5,
          quote:
            'The clarity this diagnostic created was instantaneous. Our team finally stopped defaulting to generic agency slogans.',
          name: 'Marcus Chen',
          role: 'Managing Principal, Apex Architecture',
        },
      ],
      order: 1,
    },
    {
      id: 'signal-extraction',
      altId: 'resource-2',
      title: 'The 45-Minute Oral Extraction Cheatsheet',
      category: 'Framework & Prompts',
      description:
        'The exact conversational interview prompts we use to extract 6 weeks of category-defining essays from a single 45-minute founder conversation.',
      deliverable: 'PDF Guide + Notion Interview Template',
      photoTagText: 'Format: PDF Guide + Notion Interview Template',
      ctaText: 'Download framework (Instant access)',
      type: 'download',
      featureList: [
        'The exact 9 conversational questions we use during 45-minute recording sessions.',
        'How to pull counter-intuitive client war stories without sounding like a standard interview.',
        'Plug-and-play Notion template and step-by-step editorial assembly workflow.',
        'Transforms single recordings into 6 weeks of compounding authority essays.',
      ],
      reviews: [
        {
          _key: 'rev-1',
          filledStars: 5,
          quote:
            'Simple, direct, and completely devoid of marketing hype. It gave us our authentic company voice back.',
          name: 'Diane Freeman',
          role: 'Founder, Bee Seen Social Media',
        },
      ],
      order: 2,
    },
    {
      id: 'positioning-matrix',
      altId: 'resource-3',
      title: 'B2B Founder Differentiation Scorecard',
      category: 'Spreadsheet Calculator',
      description:
        'Score your current content against 5 core indicators of authority: lived proof, counter-intuitive insight, tone fidelity, clear positioning, and pipeline velocity.',
      deliverable: 'Google Sheets / Excel Self-Scorecard',
      photoTagText: 'Format: Google Sheets / Excel Self-Scorecard',
      ctaText: 'Get scorecard template',
      type: 'download',
      featureList: [
        '5 core diagnostic pillars: Lived Proof, Tone Fidelity, Operating Constraint, Differentiation, and Velocity.',
        'Automated weighted score generator for leadership teams.',
        'Clear indicators distinguishing between enterprise authority vs. commodity agency fluff.',
        'Includes Excel and Google Sheets ready-to-use templates.',
      ],
      reviews: [
        {
          _key: 'rev-1',
          filledStars: 5,
          quote:
            'Helped us cut out 40% of our vanity content that wasn\'t moving enterprise deals. Essential metric sheet.',
          name: 'Sarah Jennings',
          role: 'VP Marketing, CloudPath',
        },
      ],
      order: 3,
    },
    {
      id: 'headline-reframing',
      altId: 'resource-4',
      title: 'The "Nobody Cares" Messaging Teardown Guide',
      category: 'Editorial Guide',
      description:
        'A side-by-side swipe file of 12 real founder hooks reframed from dry corporate jargon into magnetic enterprise narratives.',
      deliverable: '18-Page Field Guide',
      photoTagText: 'Format: 18-Page Field Guide & Swipe File',
      ctaText: 'Download swipe guide',
      type: 'download',
      featureList: [
        '12 real before-and-after B2B positioning hooks analyzed side-by-side.',
        'How to replace "we help businesses grow" with high-margin category conviction.',
        'Formulas for framing controversial operating perspectives without alienating buyers.',
        '18-page downloadable PDF swipe file with executive commentary.',
      ],
      reviews: [
        {
          _key: 'rev-1',
          filledStars: 5,
          quote:
            'The before-and-after hooks alone saved our last launch campaign from sounding like every other AI-generated post.',
          name: 'Alex Vance',
          role: 'Managing Partner, Northstar Ventures',
        },
      ],
      order: 4,
    },
  ];

  for (const r of resourcesData) {
    const doc = {
      _type: 'resourceItem',
      title: r.title,
      slug: { _type: 'slug', current: r.id },
      category: r.category,
      description: r.description,
      deliverable: r.deliverable,
      photoTagText: r.photoTagText,
      ctaText: r.ctaText,
      type: r.type,
      featureList: r.featureList,
      reviews: r.reviews,
      order: r.order,
    };
    docs.push({ _id: `resource-${r.id}`, ...doc });
    docs.push({ _id: r.altId, ...doc });
  }

  // 9. Blog Page
  const blogPageData = {
    _type: 'blogPage',
    title: 'Blog / Journal',
    eyebrow: 'Field Notes & Essays',
    headline: 'Writing about the work',
    description:
      'Essays on positioning, founder-led messaging, demand architecture, and why so much B2B content gets shipped and forgotten.',
    featuredPost: { _type: 'reference', _ref: 'blog-1' },
    seoTitle: 'The GLS Journal — Marketing for Busy Leaders',
    seoDescription:
      'Tactical essays, message teardowns, and framework breakdowns for leaders who want their expertise to match their market visibility.',
  };

  docs.push({ _id: 'blogPage', ...blogPageData });
  docs.push({ _id: 'page-blog', ...blogPageData });

  // 10. Blog Posts Collection
  docs.push(
    {
      _id: 'blog-1',
      _type: 'blogPost',
      title: 'Why Nobody Outside Can Tell What Your Company Actually Does',
      slug: { _type: 'slug', current: 'why-nobody-outside-can-tell-what-your-company-actually-does' },
      excerpt:
        'You are answering 20 questions a day from clients and your team, but your public message sounds like a committee-approved press release. Here is where the signal is getting lost.',
      category: 'Positioning',
      readTime: '4 min read',
      publishedAt: '2026-09-14T00:00:00Z',
      dateString: 'Sep 14, 2026',
      featured: true,
    },
    {
      _id: 'blog-2',
      _type: 'blogPost',
      title: 'The 45-Minute Ghostwriting Trap (And Why Most AI Posts Fall Flat)',
      slug: { _type: 'slug', current: 'the-45-minute-ghostwriting-trap' },
      excerpt:
        'Why generic LinkedIn frameworks dilute hard-won founder authority, and how to capture lived operating experience verbatim instead.',
      category: 'Content Strategy',
      readTime: '6 min read',
      publishedAt: '2026-09-08T00:00:00Z',
      dateString: 'Sep 08, 2026',
      featured: false,
    },
    {
      _id: 'blog-3',
      _type: 'blogPost',
      title: 'How Shelia Landed 3 Commercial Projects from a Single Post',
      slug: { _type: 'slug', current: 'how-shelia-landed-3-commercial-projects' },
      excerpt:
        'A deep dive into how a zero-post builder turned client conversations into an organic pipeline that brought developers straight to her inbox.',
      category: 'Case Analysis',
      readTime: '5 min read',
      publishedAt: '2026-08-29T00:00:00Z',
      dateString: 'Aug 29, 2026',
      featured: false,
    },
    {
      _id: 'blog-4',
      _type: 'blogPost',
      title: 'When Marketing Ships Everything and Nothing Lands',
      slug: { _type: 'slug', current: 'when-marketing-ships-everything-and-nothing-lands' },
      excerpt:
        'Inside the sprint burnout of modern in-house marketing teams, and how to shift from task delivery to market trust.',
      category: 'In-House Teams',
      readTime: '7 min read',
      publishedAt: '2026-08-21T00:00:00Z',
      dateString: 'Aug 21, 2026',
      featured: false,
    },
    {
      _id: 'blog-5',
      _type: 'blogPost',
      title: 'The 3 Numbers Every B2B Founder Needs in Their Head Before a Call',
      slug: { _type: 'slug', current: 'the-3-numbers-every-b2b-founder-needs-in-their-head-before-a-call' },
      excerpt:
        'How clarity on your benchmark customer, your core constraint, and your real unit economics turns casual conversations into enterprise buyers.',
      category: 'Sales Alignment',
      readTime: '4 min read',
      publishedAt: '2026-08-12T00:00:00Z',
      dateString: 'Aug 12, 2026',
      featured: false,
    }
  );

  // 11. Pricing Tiers
  docs.push(
    {
      _id: 'tier-work-with-me',
      _type: 'pricingTier',
      id: 'work-with-me-directly',
      title: 'Work with me directly',
      subtitle: 'Ongoing. Starts at $4,000 a month. Two spots open.',
      price: '$4,000',
      cadence: '/ month',
      description: 'You talk. I turn it into a presence.',
      featureHeader: 'Every month:',
      features: [
        'Two working calls a week, where I pull your message out of you',
        'Your positioning sharpened and kept current',
        'Content created and posted for you across two accounts, three times a week',
        'Your own voice bank, built from our calls, so nothing you say gets lost',
      ],
      footerNote: 'You do not write anything.',
      idealFor: 'Best for: the owner or operator who knows what they know and has no time to say it.',
      ctaText: 'Work with me directly',
      order: 1,
    },
    {
      _id: 'tier-signal-room',
      _type: 'pricingTier',
      id: 'the-signal-room',
      title: 'The Signal Room',
      subtitle: 'Six months. $500 a month. Eight seats.',
      price: '$500',
      cadence: '/ month',
      description: 'For marketers and owners who want to run this themselves.',
      featureHeader: 'Every month:',
      features: [
        'Weekly group call where we work on your actual content',
        'One implementation week a month, where we build the thing',
        'A resource library you keep',
        'AI does the heavy lifting, so nobody writes from scratch',
      ],
      footerNote: '$4,000 a month if I do it for you. $500 a month to learn to run it yourself.',
      idealFor: 'Best for: the marketer or agency owner who wants the method, not the service.',
      ctaText: 'Join The Signal Room',
      order: 2,
    }
  );

  // 12. FAQ Items
  const faqQuestions = [
    {
      id: 'faq-1',
      question: 'How much time do I actually have to spend on this?',
      answer:
        'When working with me directly, two short calls a week where I pull your message out of you. We hop on a recorded conversation where I interview you on recent customer wins, tough operating decisions, or industry developments. You do not write a single word, outline, or draft. I extract the signal, write the pieces, and post them for you.',
    },
    {
      id: 'faq-2',
      question: 'What if I’ve never posted publicly or feel uncomfortable being "visible"?',
      answer:
        'Most of my best clients felt the exact same way. Shelia had zero posts in her entire career before we started. We do not do cringe engagement bait, personal oversharing, or fake vulnerability. We talk purely about the craftsmanship of your work, the problems you solve, and how you think. That is what serious buyers respect.',
    },
    {
      id: 'faq-3',
      question: 'How do you capture how I talk without it sounding generic?',
      answer:
        'I do not use generic questionnaires or content templates. Every piece originates from verbatim audio transcripts of our conversations. I map your specific vocabulary, pacing, mental models, and contrarian perspectives. If you use concise sentences, the copy uses concise sentences. If you speak in structured analogies, we preserve that.',
    },
    {
      id: 'faq-4',
      question: 'Do you work with in-house marketing teams or just solo founders?',
      answer:
        'Both. For marketing teams, the biggest frustration is often that the team ships endless content, but nobody outside can feel it. I work alongside CMOs and marketing teams to establish the core narrative backbone, elevate the founder’s voice, and ensure demand generation actually connects to revenue instead of activity.',
    },
    {
      id: 'faq-5',
      question: 'How soon should we expect inbound inquiries or pipeline impact?',
      answer:
        'Consistency compounds. Most clients see qualitative feedback (prospects mentioning posts on sales calls, peers reaching out) within the first 30 days. Direct inbound opportunities and commercial inquiries generally begin landing in month 2 to 3, as seen with Shelia and Roslyn.',
    },
    {
      id: 'faq-6',
      question: 'Is there a long-term contract?',
      answer:
        'No. Everything is month-to-month after an initial 60-day setup sprint. If you feel like the message is working and pipeline is compounding, we keep going. If you ever want to pause or bring it entirely in-house, you own every framework, transcript, and asset we ever created together.',
    },
    {
      id: 'faq-7',
      question: 'What happens during the 20-minute gap check call?',
      answer:
        'We review where your message is currently stalling — whether it is a founder time constraint, a lack of clear differentiation, or content that gets likes but zero inbound revenue. You walk away with 2-3 specific message adjustments you can implement immediately, whether we work together or not.',
    },
    {
      id: 'faq-8',
      question: 'I am a lot smaller than HubSpot.',
      answer:
        'Good. Most of what worked at that scale was a team of a hundred solving a coordination problem you do not have. What carries over is finding the one thing your buyers need to hear. Shelia runs a construction firm and had never posted anything in her life. Three months in, a dentist called her about three buildings.',
    },
    {
      id: 'faq-9',
      question: 'I already have someone making content.',
      answer:
        'Then you probably do not need me. If the calendar is written and the posts go out and the pipeline is moving, that is working. Where I help is the other version, where everything ships on schedule and nothing lands.',
    },
    {
      id: 'faq-10',
      question: 'I do not have time to be part of this.',
      answer:
        'One or two calls a week. That is the whole ask. I pull the material out of those conversations rather than sending you a homework packet. Writing your own content is exactly the thing you already are not doing, so I do not build a plan that depends on you starting.',
    },
    {
      id: 'faq-11',
      question: 'How do I know this is not just posting more?',
      answer:
        'You do not, until you see the gap analysis. That is why the first step is twenty minutes and not a proposal. I show you where your audience is searching, where your competitors are quiet, and which of those spaces you can own. If nothing turns up, I will say so.',
    },
  ];

  faqQuestions.forEach((q, idx) => {
    docs.push({
      _id: q.id,
      _type: 'faqItem',
      question: q.question,
      answer: q.answer,
      order: idx + 1,
    });
  });

  // 13. Newsletter Page
  const newsletterData = {
    _type: 'newsletterPage',
    title: 'Newsletter Page',
    eyebrow: 'Fortnightly Executive Briefing',
    titleField: 'The Signal Letter',
    subtitle:
      'No generic motivational tips. Just 1 field-tested positioning teardown and 2 framework adjustments every other Tuesday morning.',
    seoTitle: 'The Signal Letter — Fortnightly Executive Briefing by GLS.',
    seoDescription:
      'No generic motivational tips. Just 1 field-tested positioning teardown and 2 framework adjustments every other Tuesday morning.',
  };

  docs.push({ _id: 'newsletterPage', ...newsletterData });
  docs.push({ _id: 'page-newsletter', ...newsletterData });

  // 14. Contact Page
  const contactData = {
    _type: 'contactPage',
    title: 'Contact Page',
    eyebrow: 'Work With Me · Direct Executive Advisory',
    headline: 'Start a Conversation',
    subheadline:
      'Whether you are evaluating the full Executive Content Engine, an Advisory Sprint, or simply need an objective sounding board on your category messaging, get in touch. Sheri personally reviews all executive inquiries within one business day.',
    email: 'sheri@growthlanestrategies.com',
    location: 'Charlotte, NC (Serving clients globally)',
    seoTitle: 'Work With Me — Contact GLS Advisory & Sheri Otto',
    seoDescription:
      'Start a direct conversation with Sheri Otto on executive thought leadership, narrative matrix strategy, or the Executive Content Engine.',
  };

  docs.push({ _id: 'contactPage', ...contactData });
  docs.push({ _id: 'page-contact', ...contactData });

  return docs;
}

// Generate ndjson string and write to file
const docs = generateSeedDocs();
const ndjson = docs.map((d) => JSON.stringify(d)).join('\n') + '\n';

const outPath = path.resolve(process.cwd(), 'data/sanity-seed.ndjson');
fs.writeFileSync(outPath, ndjson, 'utf-8');
console.log(`Successfully generated ${docs.length} seed documents into ${outPath}`);
