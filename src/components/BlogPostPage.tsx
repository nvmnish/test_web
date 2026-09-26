import React from 'react';
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight } from 'lucide-react';
import { Navbar, PageView } from './Navbar';

export interface BlogPostData {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  authorName?: string;
  authorRole?: string;
  authorImage?: string;
  coverImage?: string;
  contentHtml?: string;
  headings?: { id: string; title: string }[];
  calloutHeadline?: string;
  calloutButtonText?: string;
  calloutButtonUrl?: string;
  calloutAboveText?: string;
  calloutBelowText?: string;
  bodyParagraphs?: Array<{
    type?: 'heading' | 'subheading' | 'paragraph' | 'quote' | 'bulletList' | 'linkCallout';
    text?: string;
    items?: string[];
    link?: { label: string; url: string };
  }>;
}

interface BlogPostPageProps {
  post: BlogPostData;
  onBack: () => void;
  onNavigate?: (page: PageView) => void;
  onOpenBooking?: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  onBack,
  onNavigate,
  onOpenBooking,
}) => {
  const handleBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const authorName = post.authorName || 'Sheri Otto';
  const authorRole = post.authorRole || 'Founder & Executive Narrative Strategist';
  const authorImg = post.authorImage || '/assets/images/sheri_otto_portrait.png';
  const coverImg = post.coverImage || '/assets/images/content_photo.jpg';

  const calloutHeadline = post.calloutHeadline || 'Want to diagnose where your current narrative stalls? You can evaluate your positioning with our free diagnostic scorecard.';
  const calloutButtonText = post.calloutButtonText || 'Explore Free Diagnostic Tools';
  const calloutButtonUrl = post.calloutButtonUrl || '/free-tools';
  const calloutAboveText = post.calloutAboveText;
  const calloutBelowText = post.calloutBelowText;

  const handleCalloutClick = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (url.includes('free-tools') || url === '#tools') {
      if (onNavigate) onNavigate('free-tools');
      else window.location.href = '/free-tools';
      return;
    }
    if (url.includes('case-studies')) {
      if (onNavigate) onNavigate('case-studies');
      else window.location.href = '/case-studies';
      return;
    }
    if (url.includes('booking') || url.includes('contact')) {
      handleBooking();
      return;
    }
    window.location.href = url;
  };

  // Default structured rich editorial content if post.bodyParagraphs is not supplied
  const defaultBody = [
    {
      type: 'subheading',
      text: 'The Dilemma: Trapped Operating Insight',
    },
    {
      type: 'paragraph',
      text: 'Every week, you answer 15 to 25 complex operational questions on client Zoom calls. You diagnose architecture flaws in seconds. You spot margin leakage before anyone else in the room. Your internal team relies on your judgment to close accounts and steady clients.',
    },
    {
      type: 'paragraph',
      text: 'Yet if a prospective buyer visits your company website, reads your corporate LinkedIn feed, or receives an SDR sequence, they encounter none of that sharpness. Instead, they read generic buzzwords: "We drive innovative scalable synergies for next-generation enterprises."',
    },
    {
      type: 'quote',
      text: '“If it sounds like an agency wrote it, it fails. Your market and enterprise peers can smell ghostwritten fluff within three seconds.”',
    },
    {
      type: 'heading',
      text: '1. Why Traditional Ghostwriting Dilutes Founder Signal',
    },
    {
      type: 'paragraph',
      text: 'Most executive thought leadership programs fall into a predictable trap: you hire a marketing agency or content shop. They put a junior copywriter on your account who has never negotiated an enterprise contract or managed a P&L. They ask you for a 30-minute brain dump, run it through ChatGPT or a standardized LinkedIn template, and return an essay packed with numbered lists that sounds like a college textbook.',
    },
    {
      type: 'paragraph',
      text: 'The result? Zero resonance. Your existing clients don’t recognize your voice, and target prospects scroll right past. To establish market authority, the words on the page must preserve your specific vocabulary, real war stories, and counter-intuitive perspective verbatim.',
    },
    {
      type: 'heading',
      text: '2. The 3 Signals High-Ticket Enterprise Buyers Actually Scan For',
    },
    {
      type: 'bulletList',
      items: [
        'Lived Proof & Specificity: Numbers, real friction points, and constraints that only someone actually doing the work would know.',
        'The Counter-Intuitive Reframe: Pointing out where conventional industry wisdom is actively costing people money.',
        'Tone Fidelity: Writing that sounds like two trusted operators having coffee after a board meeting, without posturing.',
      ],
    },
    {
      type: 'subheading',
      text: 'How to Build the System Without Adding 10 Hours to Your Week',
    },
    {
      type: 'paragraph',
      text: 'You do not need to sit down on Sunday night and stare at a blinking cursor for four hours. You already speak high-converting marketing every day. The key is establishing an oral extraction cadence: 45 minutes bi-weekly of conversational audio that gets shaped into executive essays, diagnostic frameworks, and pipeline assets.',
    },
    {
      type: 'linkCallout',
      text: calloutHeadline,
      link: { label: calloutButtonText, url: calloutButtonUrl },
    },
    {
      type: 'paragraph',
      text: 'When your public messaging matches the caliber of your internal delivery, you stop chasing low-margin pitches and start attracting buyers who already believe in your worldview before the first meeting begins.',
    },
  ];

  const bodyItems = post.bodyParagraphs && post.bodyParagraphs.length > 0
    ? post.bodyParagraphs
    : defaultBody;

  return (
    <article className="min-h-screen bg-[#FFF9F3] text-[#1E2E2A] font-sans antialiased flex flex-col selection:bg-[#B8C87A]/40 selection:text-[#162A26]">
      {/* Universal Transparent Navbar */}
      <Navbar
        onOpenBooking={handleBooking}
        onNavigate={onNavigate}
        theme="dark-text"
      />

      {/* Main Blog Post Article Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 sm:px-10 py-10 sm:py-16">
        {/* Back Link */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0D4049] hover:text-[#08292E] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to all essays &amp; journal</span>
          </button>
        </div>

        {/* Post Header */}
        <header className="mb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-none bg-[#BDC67A]/35 text-[#0D4049]">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#536357] font-['Figtree',sans-serif]">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
            <span className="text-[#536357]/40">·</span>
            <div className="flex items-center gap-1.5 text-xs text-[#536357] font-['Figtree',sans-serif]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
          </div>

          {/* Heading in FigTree font */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-['Figtree',sans-serif] font-bold text-[#0D4049] leading-[1.2] tracking-tight">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#536357] font-['Figtree',sans-serif] leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Byline */}
          <div className="pt-6 border-t border-[#536357]/15 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#0D4049] shrink-0 border border-[#0D4049]/20 shadow-xs">
                <img
                  src={authorImg}
                  alt={authorName}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <span className="block text-sm font-bold text-[#0D4049] font-['Figtree',sans-serif]">
                  {authorName}
                </span>
                <span className="block text-xs text-[#536357] font-['Figtree',sans-serif]">
                  {authorRole}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#536357] hover:text-[#0D4049] p-2 rounded-md hover:bg-black/5 transition-colors cursor-pointer"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </header>

        {/* Featured Cover Photo - Unrounded edges */}
        <div className="mb-12 rounded-none overflow-hidden aspect-16/9 bg-[#0D4049]/5 shadow-sm border border-[#536357]/10">
          <img
            src={coverImg}
            alt={post.title}
            className="w-full h-full object-cover object-center rounded-none"
          />
        </div>

        {/* Rich Article Body - Headings and subheadings in Figtree, quotes in accent serif, blue background removed */}
        <div className="prose prose-stone max-w-none space-y-7 text-[#281B0C]/90 font-['Figtree',sans-serif] text-base sm:text-lg leading-relaxed">
          {bodyItems.map((item, idx) => {
            if (item.type === 'heading') {
              return (
                <h2
                  key={idx}
                  className="text-2xl sm:text-3xl font-['Figtree',sans-serif] font-bold text-[#0D4049] pt-6 pb-1 tracking-tight"
                >
                  {item.text}
                </h2>
              );
            }
            if (item.type === 'subheading') {
              return (
                <h3
                  key={idx}
                  className="text-xl sm:text-2xl font-['Figtree',sans-serif] font-bold text-[#0D4049] pt-4 pb-1"
                >
                  {item.text}
                </h3>
              );
            }
            if (item.type === 'quote') {
              return (
                <blockquote
                  key={idx}
                  className="my-8 p-6 sm:p-8 bg-transparent border-l-4 border-[#BDC67A] font-serif italic text-xl sm:text-2xl text-[#0D4049] leading-relaxed shadow-none"
                >
                  {item.text}
                </blockquote>
              );
            }
            if (item.type === 'bulletList' && item.items) {
              return (
                <ul key={idx} className="my-6 space-y-3.5 pl-2">
                  {item.items.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <span className="text-[#0D4049] font-bold text-lg leading-none mt-1">→</span>
                      <span className="text-[#1E2E2A] text-base leading-relaxed font-['Figtree',sans-serif]">{bullet}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (item.type === 'linkCallout') {
              return (
                <div key={idx} className="my-10 space-y-3">
                  {/* Text section outside and above the box */}
                  {calloutAboveText && (
                    <p className="text-base text-[#536357] font-['Figtree',sans-serif] leading-relaxed">
                      {calloutAboveText}
                    </p>
                  )}

                  {/* Customizable Callout Box: #BDC67A, border removed, text white, unrounded */}
                  <div
                    className="p-7 sm:p-8 bg-[#BDC67A] border-0 rounded-none flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xs"
                  >
                    <p className="text-base sm:text-lg text-white font-medium leading-relaxed max-w-xl font-['Figtree',sans-serif]">
                      {item.text || calloutHeadline}
                    </p>
                    <button
                      onClick={() => handleCalloutClick(item.link?.url || calloutButtonUrl)}
                      className="bg-[#0D4049] hover:bg-[#08292E] text-white text-sm sm:text-base font-semibold px-6 py-3 rounded-full shrink-0 transition-all cursor-pointer inline-flex items-center gap-2 shadow-sm whitespace-nowrap active:scale-[0.98]"
                    >
                      <span>{item.link?.label || calloutButtonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Text section outside and below the box */}
                  {calloutBelowText && (
                    <p className="text-base text-[#536357] font-['Figtree',sans-serif] leading-relaxed">
                      {calloutBelowText}
                    </p>
                  )}
                </div>
              );
            }
            return (
              <p key={idx} className="leading-relaxed font-['Figtree',sans-serif]">
                {item.text}
              </p>
            );
          })}
        </div>

        {/* Bottom Callout & Author Bio Box - Unrounded box */}
        <section className="mt-16 pt-12 border-t border-[#536357]/20">
          <div className="bg-[#FFFDF9] rounded-none p-8 sm:p-12 border border-[#536357]/15 shadow-sm text-center sm:text-left flex flex-col sm:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-[#0D4049] shrink-0 border-2 border-[#A9D6D4]">
              <img
                src={authorImg}
                alt={authorName}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="space-y-3 flex-1 font-['Figtree',sans-serif]">
              <span className="text-xs uppercase tracking-widest text-[#536357] font-semibold block">
                Direct Executive Advisory
              </span>
              <h3 className="text-2xl sm:text-3xl font-['Figtree',sans-serif] font-bold text-[#0D4049]">
                Ready to stop hiding behind delivery?
              </h3>
              <p className="text-sm sm:text-base text-[#536357] leading-relaxed">
                Sheri Otto works with only 3 to 6 high-caliber leaders at a time to build authority engines that turn operating knowledge into sustainable enterprise inbound.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleBooking}
                  className="bg-[#0D4049] hover:bg-[#08292E] text-white px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all shadow-xs cursor-pointer inline-flex items-center gap-2 active:scale-[0.99]"
                >
                  <span>Book a 20-minute gap check</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </article>
  );
};
