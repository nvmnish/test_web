import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Navbar, PageView } from './Navbar';

interface BlogPageProps {
  onNavigate?: (page: PageView) => void;
  onOpenBooking?: () => void;
}

interface ArticlePlaceholder {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured?: boolean;
}

const ARTICLES: ArticlePlaceholder[] = [
  {
    id: 1,
    title: 'Why Nobody Outside Can Tell What Your Company Actually Does',
    excerpt: 'You are answering 20 questions a day from clients and your team, but your public message sounds like a committee-approved press release. Here is where the signal is getting lost.',
    category: 'Positioning',
    readTime: '4 min read',
    date: 'Sep 14, 2026',
    featured: true,
  },
  {
    id: 2,
    title: 'The 45-Minute Ghostwriting Trap (And Why Most AI Posts Fall Flat)',
    excerpt: 'Why generic LinkedIn frameworks dilute hard-won founder authority, and how to capture lived operating experience verbatim instead.',
    category: 'Content Strategy',
    readTime: '6 min read',
    date: 'Sep 08, 2026',
  },
  {
    id: 3,
    title: 'How Shelia Landed 3 Commercial Projects from a Single Post',
    excerpt: 'A deep dive into how a zero-post builder turned client conversations into an organic pipeline that brought developers straight to her inbox.',
    category: 'Case Analysis',
    readTime: '5 min read',
    date: 'Aug 29, 2026',
  },
  {
    id: 4,
    title: 'When Marketing Ships Everything and Nothing Lands',
    excerpt: 'Inside the sprint burnout of modern in-house marketing teams, and how to shift from task delivery to market trust.',
    category: 'In-House Teams',
    readTime: '7 min read',
    date: 'Aug 21, 2026',
  },
  {
    id: 5,
    title: 'The 3 Numbers Every B2B Founder Needs in Their Head Before a Call',
    excerpt: 'How clarity on your benchmark customer, your core constraint, and your real unit economics turns casual conversations into enterprise buyers.',
    category: 'Sales Alignment',
    readTime: '4 min read',
    date: 'Aug 12, 2026',
  },
  {
    id: 6,
    title: 'Doubling Academy Enrollment: The Story Behind Dixon Early Academy',
    excerpt: 'Roslyn never ran marketing before June. By the end of the quarter her enrollment jumped from 28% to 56%. Here is the operational cadence behind the shift.',
    category: 'Case Analysis',
    readTime: '5 min read',
    date: 'Jul 28, 2026',
  },
  {
    id: 7,
    title: 'Stop Posting Tips: Why High-Ticket Buyers Ignore Generic How-Tos',
    excerpt: 'Enterprise leaders do not buy from top-10 lists. They buy when someone articulates the silent friction inside their quarterly boardroom.',
    category: 'Positioning',
    readTime: '6 min read',
    date: 'Jul 15, 2026',
  },
  {
    id: 8,
    title: 'The Executive Narrative Matrix: From Chaos to Consistent Pipeline',
    excerpt: 'The exact framework we use during our 45-minute recording sessions to extract category-defining thought leadership.',
    category: 'Methodology',
    readTime: '5 min read',
    date: 'Jul 04, 2026',
  },
];

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<ArticlePlaceholder | null>(null);

  const handleBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const categories = ['All', 'Positioning', 'Content Strategy', 'In-House Teams', 'Case Analysis'];

  const filtered = activeCategory === 'All' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === activeCategory);

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
          The GLS Journal
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[#536357] font-sans max-w-xl mx-auto leading-relaxed">
          Tactical essays, message teardowns, and framework breakdowns for leaders who want their expertise to match their market visibility.
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

      {/* Article Detail View Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] rounded-[2rem] max-w-2xl w-full p-8 sm:p-12 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 text-[#536357] hover:text-[#0D4049] text-sm font-semibold cursor-pointer"
            >
              ✕ Close
            </button>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0D4049] bg-[#BDC67A]/35 px-3 py-1 rounded-sm inline-block mb-4">
              {selectedArticle.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4049] mb-4 leading-snug">
              {selectedArticle.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-[#536357] font-sans mb-8">
              <span>{selectedArticle.date}</span>
              <span>·</span>
              <span>{selectedArticle.readTime}</span>
              <span>·</span>
              <span>By Sheri Otto</span>
            </div>
            <div className="prose prose-stone max-w-none text-[#536357] leading-relaxed space-y-4 font-sans text-sm sm:text-base">
              <p className="text-base sm:text-lg font-medium text-[#0D4049]">
                {selectedArticle.excerpt}
              </p>
              <p>
                When you run an active company, the daily operational gravity is immense. You answer client inquiries, unblock team leads, and navigate delivery deadlines. By the time 6:00 PM arrives, the thought of sitting down to author a high-signal article feels exhausting.
              </p>
              <p>
                This is why most leaders default to generic inspirational soundbites or delegate posting to junior marketing associates who lack the lived experience of steering a multi-million-dollar operation.
              </p>
              <p className="bg-[#A9D6D4]/20 p-4 rounded-xl border border-[#A9D6D4] text-[#0D4049] italic font-serif text-lg">
                &ldquo;Real thought leadership isn&apos;t written from a whiteboard. It is extracted from the friction of your everyday business decisions.&rdquo;
              </p>
              <p>
                To fix this, shift away from writing from scratch. Spend 45 minutes bi-weekly speaking into a recording device while reacting to three specific client interactions from the past fortnight. That recording contains the raw commercial signal your future clients need to hear before they reach out.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#536357]/20 flex justify-between items-center">
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  handleBooking();
                }}
                className="bg-[#0D4049] hover:bg-[#08292E] text-white px-6 py-3 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Discuss this with Sheri
              </button>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-[#536357] hover:text-[#0D4049] text-xs sm:text-sm cursor-pointer"
              >
                Back to articles
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of 8 Placeholders */}
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
                onClick={() => setSelectedArticle(article)}
                className="bg-[#FFFDF9] rounded-[1.75rem] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-none hover:shadow-xl cursor-pointer group"
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
    </div>
  );
};
