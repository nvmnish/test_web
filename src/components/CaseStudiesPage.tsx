import React from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';
import { Navbar, PageView } from './Navbar';

interface CaseStudiesPageProps {
  onNavigate?: (page: PageView) => void;
  onOpenBooking?: () => void;
}

interface CaseStudy {
  id: string;
  client: string;
  role: string;
  industry?: string;
  timeframe: string;
  headline?: string;
  statNumber?: string;
  statLabel?: string;
  quote?: string;
  quotes?: string[];
  challenge?: string;
  approach?: string;
  outcome?: string;
  cardColor?: string;
  storyParagraphs?: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'shelia',
    client: 'Shelia',
    role: 'Managing Principal & Founder',
    industry: 'Commercial Construction & Architecture',
    timeframe: '3 Months In',
    headline: 'From zero online presence to 3 commercial projects and a custom home build',
    statNumber: '3x',
    statLabel: 'Commercial Projects Originated',
    quote: "We've gone from zero postings. I never post. She told me no for two months. Too busy, too nervous, not her thing. We started in June anyway.",
    challenge: 'Shelia had decades of pristine building expertise but felt overwhelmed by writing, social algorithms, and self-promotion. Zero content was reaching potential enterprise developers.',
    approach: 'Bi-weekly 45-minute audio conversations capturing her actual site walkthroughs, material constraints, and contractor management philosophy into crisp, authoritative essays.',
    outcome: "A distant contact's barber saw her content, connecting her to a regional dentist who awarded three major commercial expansion contracts and a strip mall build across town.",
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
    quote: "Her Harrisburg campus has room for 125 children. It sat at 28% full. By June 30 it was at 56%, and she had never run marketing before.",
    challenge: 'A brand-new Harrisburg campus built for 125 children sat mostly empty due to reliance on slow word-of-mouth and zero regional brand awareness.',
    approach: 'Structured narrative campaigns showcasing the academy curriculum, teacher retention philosophy, and parents’ emotional peace of mind directly on local channels.',
    outcome: 'Campus enrollment surged from 28% to 56% within one quarter, generating a sustained waiting list for the upcoming academic year.',
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

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onNavigate, onOpenBooking }) => {
  const handleBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };
  return (
    <div className="min-h-screen bg-[#FFF9F3] text-[#1E2E2A] font-sans antialiased flex flex-col">
      {/* Universal Transparent Navbar */}
      <Navbar
        onOpenBooking={handleBooking}
        onNavigate={onNavigate}
        theme="dark-text"
      />

      {/* Hero */}
      <section className="py-12 sm:py-20 max-w-5xl mx-auto px-6 sm:px-10 text-center">
        <span className="text-xs uppercase tracking-widest text-[#536357] font-semibold mb-3 block">
          Client Proof &amp; Case Studies
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif italic text-[#0D4049] tracking-tight">
          What happens when expertise gets seen
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[#536357] font-sans max-w-2xl mx-auto leading-relaxed">
          Real numbers from founders, builders, and marketing leaders who stopped hiding behind delivery and let their perspective compound in public.
        </p>
      </section>

      {/* Case Studies Deep Dive List */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 pb-24 space-y-16 flex-1">
        {CASE_STUDIES.map((study, index) => (
          <div
            key={study.id}
            className="bg-[#FFFDF9] rounded-[2.25rem] p-8 sm:p-12 lg:p-14 shadow-sm"
          >
            {/* Top Row: Meta Header (Industry tag and metric box removed) */}
            <div className="pb-6 border-b border-[#536357]/15">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#536357]">
                  {study.timeframe}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4049]">
                {study.client} · <span className="text-[#536357] font-normal font-sans text-lg">{study.role}</span>
              </h3>
            </div>

            {/* Card Content: Either Narrative Story with Quotes or Structured 3-Pillar Breakdown */}
            {study.storyParagraphs ? (
              <div className="py-8 space-y-6 font-sans">
                <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#281B0C]/90 font-sans">
                  {study.storyParagraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {study.quotes && study.quotes.length > 0 && (
                  <div className="pt-2 space-y-3">
                    {study.quotes.map((q, qIdx) => (
                      <p
                        key={qIdx}
                        className="text-base sm:text-lg italic font-serif text-[#0D4049] bg-[#A9D6D4]/20 p-5 rounded-2xl border-l-4 border-[#0D4049]"
                      >
                        {q}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Headline & Quote */}
                <div className="py-8 border-b border-[#536357]/15">
                  <h4 className="text-xl sm:text-2xl font-sans font-bold text-[#0D4049] mb-4">
                    &ldquo;{study.headline}&rdquo;
                  </h4>
                  <p className="text-base sm:text-lg italic font-serif text-[#0D4049] bg-[#A9D6D4]/20 p-5 rounded-2xl border-l-4 border-[#0D4049]">
                    {study.quote}
                  </p>
                </div>

                {/* Three Pillar Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 font-sans">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-[#536357] block mb-2">
                      01 · The Bottleneck
                    </span>
                    <p className="text-[#536357] text-sm leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-[#0D4049] block mb-2">
                      02 · The GLS Extraction
                    </span>
                    <p className="text-stone-700 text-sm leading-relaxed">
                      {study.approach}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-[#E19013] block mb-2">
                      03 · The Commercial Result
                    </span>
                    <p className="text-stone-800 text-sm leading-relaxed font-medium">
                      {study.outcome}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Action CTA */}
            <div className="mt-8 pt-6 border-t border-[#536357]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-[#536357]">
                Zero long-term retainers. Month-to-month executive partnership.
              </span>
              <button
                onClick={handleBooking}
                className="inline-flex items-center text-sm font-semibold text-[#0D4049] hover:text-[#08292E] cursor-pointer group"
              >
                <span className="border-b border-[#0D4049]/40 group-hover:border-[#0D4049]">
                  Check if this fits your company
                </span>
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
