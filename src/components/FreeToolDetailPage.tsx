import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Download, Sparkles, ShieldCheck, Star } from 'lucide-react';
import { Navbar, PageView } from './Navbar';

const SHERI_PORTRAIT = '/images/pointing_wide.png';


export interface ReviewItem {
  filledStars?: number;
  quote: string;
  name: string;
  role?: string;
}

export interface FreeToolItem {
  id: string;
  _id?: string;
  title: string;

  category: string;
  description: string;
  deliverable: string;
  ctaText: string;
  type?: 'audit' | 'download';
  image?: string;
  photoTagText?: string;
  featureList?: string[];
  reviews?: ReviewItem[];
}

interface FreeToolDetailPageProps {
  tool: FreeToolItem;

  onBack: () => void;
  onNavigate?: (page: PageView) => void;
  onOpenBooking?: () => void;
  onOpenHeavyAuditModal?: () => void;
}

export const FreeToolDetailPage: React.FC<FreeToolDetailPageProps> = ({
  tool,
  onBack,
  onNavigate,
  onOpenBooking,
  onOpenHeavyAuditModal,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  // Curated lists of inclusions for each tool
  const defaultLists: Record<string, string[]> = {
    'heavy-audit': [
      'Pinpoints whether your bottleneck is internal approval friction, tone dilution, or lack of pipeline attribution.',
      'Identifies the exact moments your commercial signal leaks on sales debriefs.',
      'Generates a personalized, tactical prescription tailored to founders vs. in-house marketing teams.',
      'Takes less than 2 minutes with zero generic corporate jargon.',
    ],
    'signal-extraction': [
      'The exact 9 conversational questions we use during 45-minute recording sessions.',
      'How to pull counter-intuitive client war stories without sounding like a standard interview.',
      'Plug-and-play Notion template and step-by-step editorial assembly workflow.',
      'Transforms single recordings into 6 weeks of compounding authority essays.',
    ],
    'positioning-matrix': [
      '5 core diagnostic pillars: Lived Proof, Tone Fidelity, Operating Constraint, Differentiation, and Velocity.',
      'Automated weighted score generator for leadership teams.',
      'Clear indicators distinguishing between enterprise authority vs. commodity agency fluff.',
      'Includes Excel and Google Sheets ready-to-use templates.',
    ],
    'headline-reframing': [
      '12 real before-and-after B2B positioning hooks analyzed side-by-side.',
      'How to replace "we help businesses grow" with high-margin category conviction.',
      'Formulas for framing controversial operating perspectives without alienating buyers.',
      '18-page downloadable PDF swipe file with executive commentary.',
    ],
  };

  const features = tool.featureList && tool.featureList.length > 0
    ? tool.featureList
    : defaultLists[tool.id] || [
        'Tactical executive framework built directly from real client engagements.',
        'Zero fluff, zero generic ChatGPT formulas—grounded in operating reality.',
        'Step-by-step instructions designed to implement in under 45 minutes.',
        'Instant access delivered straight to your email.',
      ];

  const defaultReviews: ReviewItem[] = [
    {
      filledStars: 5,
      quote: 'We stopped wasting 8 hours a week debating newsletter copy. Within two days of applying this framework, our partners were speaking straight to high-value prospects.',
      name: 'Candice M.',
      role: 'Operations & Comms, Levantar',
    },
    {
      filledStars: 5,
      quote: 'The clarity this diagnostic created was instantaneous. Our team finally stopped defaulting to generic agency slogans.',
      name: 'Marcus Chen',
      role: 'Managing Principal, Apex Architecture',
    },
    {
      filledStars: 5,
      quote: 'Simple, direct, and completely devoid of marketing hype. It gave us our authentic company voice back.',
      name: 'Diane Freeman',
      role: 'Founder, Bee Seen Social Media',
    },
  ];

  const reviewsList = tool.reviews && tool.reviews.length > 0 ? tool.reviews : defaultReviews;

  // Specific preview graphics / mockups
  const toolImages: Record<string, string> = {
    'heavy-audit': '/assets/images/content_photo.jpg',
    'signal-extraction': '/assets/images/content_photo.jpg',
    'positioning-matrix': '/assets/images/content_photo.jpg',
    'headline-reframing': '/assets/images/content_photo.jpg',
  };

  const previewImg = tool.image || toolImages[tool.id] || '/assets/images/content_photo.jpg';
  const tagText = tool.photoTagText || `Format: ${tool.deliverable}` || 'Format: Instant Download & Templates';

  return (
    <div className="min-h-screen bg-[#FFF9F3] text-[#1E2E2A] font-sans antialiased flex flex-col selection:bg-[#B8C87A]/40 selection:text-[#162A26]">
      {/* Universal Transparent Navbar */}
      <Navbar
        onOpenBooking={handleBooking}
        onNavigate={onNavigate}
        theme="dark-text"
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 sm:px-10 py-10 sm:py-16">
        {/* Back Link */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0D4049] hover:text-[#08292E] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to all free tools &amp; diagnostics</span>
          </button>
        </div>

        {/* 1. Headline on Top */}
        <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#536357] block mb-3">
            {tool.category} · Free Executive Tool
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-[#0D4049] tracking-tight leading-[1.15] mb-5">
            {tool.title}
          </h1>
          <p className="text-base sm:text-lg text-[#536357] font-sans leading-relaxed">
            {tool.description}
          </p>
        </header>

        {/* 2. Two-Column Element: Image on Left, What's included + Access Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Image on the Left: Rectangular card (not square) with rounded-lg corners */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="relative rounded-lg overflow-hidden bg-white p-4 sm:p-5 border border-[#536357]/15 shadow-sm group">
              <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#0D4049] relative">
                <img
                  src={previewImg}
                  alt={tool.title}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D4049]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  {/* Customizable Green Tag on Photo */}
                  <span className="text-[0.68rem] uppercase tracking-widest font-bold px-2.5 py-1 rounded-none bg-[#BDC67A] text-[#0D4049] inline-block mb-1 shadow-xs">
                    {tagText}
                  </span>
                  <p className="text-xs font-sans text-white/90">
                    Immediate digital download &amp; interactive access
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 'What's included in this tool' with card removed, then Access Card right underneath */}
          <div className="lg:col-span-6 space-y-8">
            {/* Card removed from 'What's included in this tool' */}
            <div className="bg-transparent border-0 p-0 shadow-none">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0D4049] mb-5">
                What is included in this tool:
              </h2>
              <ul className="space-y-4">
                {features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#BDC67A]/35 text-[#0D4049] shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm sm:text-base text-[#1E2E2A] leading-relaxed font-sans">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-[#536357]/15 flex items-center gap-2 text-xs text-[#536357]">
                <ShieldCheck className="w-4 h-4 text-[#0D4049]" />
                <span>100% Free · No sales calls required · Instant delivery</span>
              </div>
            </div>

            {/* Positioned right underneath the list: Card with Email and Name with less rounded corners (rounded-lg) */}
            <div className="bg-white rounded-lg p-7 sm:p-9 border border-[#0D4049]/20 shadow-md">
              {isSubmitted ? (
                <div className="space-y-4 py-4 text-center animate-fadeIn">
                  <div className="w-14 h-14 bg-[#A9D6D4]/30 text-[#0D4049] rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#0D4049]">
                    Access Sent, {name || 'Leader'}!
                  </h3>
                  <p className="text-sm text-[#536357] font-sans leading-relaxed max-w-sm mx-auto">
                    We have dispatched the <strong className="text-[#0D4049]">{tool.title}</strong> directly to <strong className="text-[#0D4049]">{email}</strong>. Check your inbox in the next 60 seconds.
                  </p>
                  {tool.type === 'audit' && (
                    <div className="pt-2">
                      <button
                        onClick={() => onOpenHeavyAuditModal && onOpenHeavyAuditModal()}
                        className="bg-[#0D4049] hover:bg-[#08292E] text-white px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                      >
                        <Sparkles className="w-4 h-4 text-[#BDC67A]" />
                        <span>Launch Interactive Diagnostic Now</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <span className="text-xs uppercase tracking-widest text-[#536357] font-bold block mb-1.5">
                      Free Instant Access
                    </span>
                    <h3 className="text-2xl font-serif italic text-[#0D4049]">
                      Where should we send your copy?
                    </h3>
                    <p className="text-xs text-[#536357] mt-1 font-sans">
                      Enter your name and email below for immediate framework access.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
                    <div>
                      <label className="block text-xs font-bold text-[#0D4049] uppercase tracking-wider mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. David Sterling"
                        className="w-full px-4 py-3 rounded-md border border-[#536357]/25 bg-[#FFFDF9] text-sm text-[#0D4049] placeholder:text-[#536357]/50 focus:outline-none focus:border-[#0D4049] shadow-xs"
                      />
                    </div>

                    <div>
                      {/* Changed from 'Work Email Address' to just 'Email' */}
                      <label className="block text-xs font-bold text-[#0D4049] uppercase tracking-wider mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="david@company.com"
                        className="w-full px-4 py-3 rounded-md border border-[#536357]/25 bg-[#FFFDF9] text-sm text-[#0D4049] placeholder:text-[#536357]/50 focus:outline-none focus:border-[#0D4049] shadow-xs"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0D4049] hover:bg-[#08292E] text-white py-3.5 px-6 rounded-full font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                      >
                        {isSubmitting ? (
                          <span>Preparing access...</span>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Get Free Instant Access Now</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[0.7rem] text-center text-[#536357]/75 pt-1">
                      Strictly 0 spam. We respect your attention and never share your email.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Reviews Section: 5 stars on top, quote in Figtree after 5 stars, name below it (2 or 3 reviews) */}
        <section className="mb-16 pt-8 border-t border-[#536357]/15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {reviewsList.map((rev, idx) => {
              const starsCount = rev.filledStars ?? 5;
              return (
                <div key={idx} className="bg-white/70 p-6 rounded-lg border border-[#536357]/10 flex flex-col justify-between space-y-4 shadow-xs">
                  {/* 5 Stars on Top */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-4 h-4 ${
                          starIdx <= starsCount
                            ? 'text-[#BDC67A] fill-[#BDC67A]'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote in Figtree font */}
                  <blockquote className="font-['Figtree',sans-serif] italic text-sm sm:text-[0.95rem] text-[#0D4049] leading-relaxed flex-1">
                    &ldquo;{rev.quote}&rdquo;
                  </blockquote>

                  {/* Name below it */}
                  <div className="pt-2 border-t border-[#536357]/10">
                    <p className="font-['Figtree',sans-serif] font-bold text-xs sm:text-sm text-[#0D4049]">
                      {rev.name}
                    </p>
                    {rev.role && (
                      <p className="font-['Figtree',sans-serif] text-[0.72rem] text-[#536357]">
                        {rev.role}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Bottom Part: No card background, spans width of image + what's included list,
               circle on the left side, text section with 'book a call' CTA */}
        <section className="pt-10 sm:pt-14 border-t border-[#536357]/20 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 bg-transparent">
          {/* Circle to the left side */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#0D4049] border-2 border-[#BDC67A] shrink-0 shadow-md">
            <img
              src={SHERI_PORTRAIT}
              alt="Sheri Otto"
              className="w-full h-full object-cover object-center"
            />
          </div>



          {/* Text section with Book a Call CTA */}
          <div className="space-y-3 flex-1 text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-[#536357] font-bold block">
              1-on-1 Narrative Advisory
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif italic text-[#0D4049]">
              Want to walk through your tool diagnosis live?
            </h3>
            <p className="text-sm sm:text-base text-[#536357] font-sans leading-relaxed max-w-2xl">
              Sheri Otto offers 20-minute working sessions to help founders and marketing heads evaluate their positioning gaps and build an authoritative voice bank.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleBooking}
                className="bg-[#0D4049] hover:bg-[#08292E] text-white px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Book a gap call with Sheri</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
