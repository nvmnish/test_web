import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Navbar, PageView } from './Navbar';
import { SectionRenderer } from './SectionRenderer';
import { BlogPostPage, BlogPostData } from './BlogPostPage';

interface BlogPageProps {
  onNavigate?: (page: PageView) => void;
  onOpenBooking?: () => void;
  data?: any;
}

interface ArticlePlaceholder extends BlogPostData {
  featured?: boolean;
}

const ARTICLES: ArticlePlaceholder[] = [
  {
    id: 'why-nobody-outside-can-tell-what-your-company-actually-does',
    title: 'Why Nobody Outside Can Tell What Your Company Actually Does',
    excerpt: 'You are answering 20 questions a day from clients and your team, but your public message sounds like a committee-approved press release. Here is where the signal is getting lost.',
    category: 'Positioning',
    readTime: '4 min read',
    date: 'Sep 14, 2026',
    featured: true,
    coverImage: '/assets/images/content_photo.jpg',
    bodyParagraphs: [
      {
        type: 'subheading',
        text: 'The Internal Clarity vs. External Fog Paradox',
      },
      {
        type: 'paragraph',
        text: 'Inside your company, you and your senior team speak with surgical precision. When a prospective enterprise client asks about system integration, security parameters, or timeline guarantees, your answers are grounded, specific, and backed by years of operating scar tissue.',
      },
      {
        type: 'paragraph',
        text: 'Then someone clicks over to your homepage or opens your corporate brochure. What do they find? "We deliver synergistic, agile transformation for the modern hybrid organization." A sentence so utterly devoid of friction that it could describe 10,000 different consulting agencies.',
      },
      {
        type: 'quote',
        text: '“When you try to sound like an enterprise company, you end up sounding like a committee in a conference room. High-value buyers don’t hire committees; they hire leaders with conviction.”',
      },
      {
        type: 'heading',
        text: 'Where the Commercial Signal Gets Leaked',
      },
      {
        type: 'paragraph',
        text: 'The signal is lost because most B2B positioning is written backwards. Instead of capturing what happens on real sales calls and technical delivery debriefs, founders hire a branding agency to "invent" a message. That agency holds focus groups, looks at competitor landing pages, and normalizes every sharp edge until the message is completely safe—and entirely unmemorable.',
      },
      {
        type: 'bulletList',
        items: [
          'Fear of disqualifying unqualified prospects: In an effort to keep the top of funnel wide, you use umbrella terms that mean nothing to the top 5% of ideal buyers.',
          'Delegating narrative to copywriters with zero operating context: Writing without lived experience always defaults to adjectives instead of mechanisms.',
          'Treating positioning as marketing collateral instead of executive strategy: Your positioning isn\'t a tagline; it is the reason a buyer chooses you over doing nothing.',
        ],
      },
      {
        type: 'heading',
        text: 'The 3-Step Extraction Reset',
      },
      {
        type: 'paragraph',
        text: 'Step 1: Record your next three client kickoff calls. Listen for the exact words the client uses to describe the problem right before they signed.',
      },
      {
        type: 'paragraph',
        text: 'Step 2: Identify your single most controversial operational belief. What do you do that competitors refuse to do because it requires real work?',
      },
      {
        type: 'paragraph',
        text: 'Step 3: Replace every generic adjective on your site with a verifiable operating constraint.',
      },
    ],
  },
  {
    id: 'the-45-minute-ghostwriting-trap',
    title: 'The 45-Minute Ghostwriting Trap (And Why Most AI Posts Fall Flat)',
    excerpt: 'Why generic LinkedIn frameworks dilute hard-won founder authority, and how to capture lived operating experience verbatim instead.',
    category: 'Content Strategy',
    readTime: '6 min read',
    date: 'Sep 08, 2026',
    coverImage: '/assets/images/content_photo.jpg',
    bodyParagraphs: [
      {
        type: 'subheading',
        text: 'The Rise of the Ghostwriting Factory',
      },
      {
        type: 'paragraph',
        text: 'Over the last two years, LinkedIn feeds have been overrun by a predictable formula: a dramatic hook about waking up at 4:30 AM, followed by a numbered list of five habits, ending with "Agree?".',
      },
      {
        type: 'paragraph',
        text: 'For a founder selling a $100,000 advisory engagement or a complex SaaS contract, this kind of content is not just ineffective—it is brand suicide. Your prospective buyers are CFOs, VP of Engineering, and Board Chairs. When they see their peer posting generic motivational clichés, their perceived authority instantly drops.',
      },
      {
        type: 'quote',
        text: '“High-ticket buyers do not evaluate you based on posting frequency. They evaluate you based on the depth of your operational judgment.”',
      },
      {
        type: 'heading',
        text: 'The Verbatim Voice Bank Alternative',
      },
      {
        type: 'paragraph',
        text: 'Rather than outsourcing your writing to someone who guesses your thoughts, the only scalable model is an oral extraction engine: 45 minutes of recorded voice debriefing real client problems. We capture the cadence, colloquialisms, and direct insights, and format them into rigorous category essays.',
      },
    ],
  },
  {
    id: 'how-shelia-landed-3-commercial-projects',
    title: 'How Shelia Landed 3 Commercial Projects from a Single Post',
    excerpt: 'A deep dive into how a zero-post builder turned client conversations into an organic pipeline that brought developers straight to her inbox.',
    category: 'Case Analysis',
    readTime: '5 min read',
    date: 'Aug 29, 2026',
    coverImage: '/assets/images/content_photo.jpg',
  },
  {
    id: 'when-marketing-ships-everything-and-nothing-lands',
    title: 'When Marketing Ships Everything and Nothing Lands',
    excerpt: 'Inside the sprint burnout of modern in-house marketing teams, and how to shift from task delivery to market trust.',
    category: 'In-House Teams',
    readTime: '7 min read',
    date: 'Aug 21, 2026',
    coverImage: '/assets/images/content_photo.jpg',
  },
  {
    id: 'the-3-numbers-every-b2b-founder-needs',
    title: 'The 3 Numbers Every B2B Founder Needs in Their Head Before a Call',
    excerpt: 'How clarity on your benchmark customer, your core constraint, and your real unit economics turns casual conversations into enterprise buyers.',
    category: 'Sales Alignment',
    readTime: '4 min read',
    date: 'Aug 12, 2026',
    coverImage: '/assets/images/content_photo.jpg',
  },
  {
    id: 'doubling-academy-enrollment',
    title: 'Doubling Academy Enrollment: The Story Behind Dixon Early Academy',
    excerpt: 'Roslyn never ran marketing before June. By the end of the quarter her enrollment jumped from 28% to 56%. Here is the operational cadence behind the shift.',
    category: 'Case Analysis',
    readTime: '5 min read',
    date: 'Jul 28, 2026',
    coverImage: '/assets/images/content_photo.jpg',
  },
  {
    id: 'stop-posting-tips',
    title: 'Stop Posting Tips: Why High-Ticket Buyers Ignore Generic How-Tos',
    excerpt: 'Enterprise leaders do not buy from top-10 lists. They buy when someone articulates the silent friction inside their quarterly boardroom.',
    category: 'Positioning',
    readTime: '6 min read',
    date: 'Jul 15, 2026',
    coverImage: '/assets/images/content_photo.jpg',
  },
  {
    id: 'the-executive-narrative-matrix',
    title: 'The Executive Narrative Matrix: From Chaos to Consistent Pipeline',
    excerpt: 'The exact framework we use during our 45-minute recording sessions to extract category-defining thought leadership.',
    category: 'Methodology',
    readTime: '5 min read',
    date: 'Jul 04, 2026',
    coverImage: '/assets/images/content_photo.jpg',
  },
];

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onOpenBooking, data }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<ArticlePlaceholder | null>(null);

  const handleBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const articlesList: ArticlePlaceholder[] = data?.posts && data.posts.length > 0
    ? data.posts.map((p: any) => ({
        id: p._id || p.id || p.title,
        title: p.title,
        excerpt: p.excerpt || '',
        category: p.category || 'Positioning',
        readTime: p.readTime || '4 min read',
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : (p.date || 'Recent'),
        featured: p.featured,
      }))
    : ARTICLES;

  const categories = ['All', ...Array.from(new Set(articlesList.map(a => a.category).filter(Boolean)))];

  const filtered = activeCategory === 'All' 
    ? articlesList 
    : articlesList.filter(a => a.category === activeCategory);

  const heroHeadline = data?.heroHeadline || 'The GLS Journal';
  const heroSubheadline = data?.heroSubheadline || 'Tactical essays, message teardowns, and framework breakdowns for leaders who want their expertise to match their market visibility.';

  // Check URL on mount / update
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const articleParam = new URLSearchParams(window.location.search).get('article');
      if (articleParam) {
        const found = articlesList.find((a) => String(a.id) === articleParam);
        if (found) setSelectedArticle(found);
      }
    }
  }, [articlesList]);

  // When an article is clicked, open standard full-page blog post template
  if (selectedArticle) {
    return (
      <BlogPostPage
        post={selectedArticle}
        onBack={() => {
          setSelectedArticle(null);
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.delete('article');
            window.history.pushState(null, '', url.pathname + (url.search ? url.search : ''));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onNavigate={onNavigate}
        onOpenBooking={handleBooking}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F3] text-[#1E2E2A] font-sans antialiased flex flex-col">
      {/* Universal Transparent Navbar (dark text theme) */}
      <Navbar
        onOpenBooking={handleBooking}
        onNavigate={onNavigate}
        theme="dark-text"
      />

      {/* Hero Intro */}
      <section className="py-12 sm:py-20 max-w-5xl mx-auto px-6 sm:px-10 text-center">
        <span className="text-xs uppercase tracking-widest text-[#536357] font-semibold mb-3 block">
          Editorial &amp; Insights
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif italic text-[#0D4049] tracking-tight">
          {heroHeadline}
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[#536357] font-sans max-w-xl mx-auto leading-relaxed">
          {heroSubheadline}
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0D4049] text-white shadow-xs'
                  : 'bg-white border border-[#536357]/20 text-[#536357] hover:border-[#0D4049]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Articles */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 pb-24 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => {
            const getBadgeClass = (category: string) => {
              switch (category) {
                case 'Positioning':
                  return 'bg-[#A9D6D4]/40 text-[#0D4049]';
                case 'Content Strategy':
                  return 'bg-[#BDC67A]/35 text-[#0D4049]';
                case 'In-House Teams':
                  return 'bg-[#536357]/20 text-[#536357]';
                case 'Case Analysis':
                  return 'bg-[#E19013]/25 text-[#E19013]';
                default:
                  return 'bg-[#BDC67A]/30 text-[#0D4049]';
              }
            };

            return (
              <article
                key={article.id}
                onClick={() => {
                  setSelectedArticle(article);
                  if (typeof window !== 'undefined') {
                    const url = new URL(window.location.href);
                    url.searchParams.set('article', String(article.id));
                    window.history.pushState(null, '', url.toString());
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="bg-[#FFFDF9] rounded-lg p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-none hover:shadow-xl cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[0.7rem] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm ${getBadgeClass(article.category)}`}>
                      {article.category}
                    </span>
                    <div className="flex items-center text-xs text-[#536357]/80 gap-1 font-sans">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0D4049] leading-snug group-hover:text-[#0D4049]/85 transition-colors mb-3">
                    {article.title}
                  </h3>

                  <p className="text-[#536357] text-xs sm:text-sm leading-relaxed font-sans line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#536357]/15 flex items-center justify-between">
                  <span className="text-xs text-[#536357] font-sans">{article.date}</span>
                  <span className="text-xs font-semibold text-[#0D4049] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Dynamic Sections from Sanity Page Builder */}
      {data?.sections && (
        <SectionRenderer 
          sections={data.sections} 
          onOpenBooking={handleBooking} 
          onNavigate={onNavigate} 
        />
      )}
    </div>
  );
};
