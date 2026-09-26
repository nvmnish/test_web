import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { Navbar, PageView } from './Navbar';
import { SectionRenderer } from './SectionRenderer';

interface CaseStudiesPageProps {
  onNavigate?: (page: PageView) => void;
  onOpenBooking?: () => void;
  data?: any;
}

interface CaseStudy {
  id?: string;
  _id?: string;
  client: string;
  role?: string;
  industry?: string;
  timeframe?: string;
  headline?: string;
  statNumber?: string;
  statLabel?: string;
  quote?: string;
  quotes?: string[];
  challenge?: string;
  approach?: string;
  outcome?: string;
  storyParagraphs?: string[];
  videoSrc?: string;
  videoPoster?: string;
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
    videoSrc: '/videos/Sandra.mp4',
    videoPoster: '/images/Sandra.png',
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
    videoSrc: '/videos/Alex.mp4',
    videoPoster: '/images/Alex.png',
  },
  {
    id: 'candice',
    client: 'Candice',
    role: 'Communications and Operations, Levantar',
    industry: 'Nonprofit · Redwood City',
    timeframe: 'Email Engine Sprint',
    quote: '"The words that Claude added, they\'re just helping tell the story." — Candice, using the engine on camera',
    headline: 'Compressing eight-hour newsletter dread into a 45-minute verbal extraction workflow',
    storyParagraphs: [
      'Candice runs communications and operations for Levantar, a nonprofit in Redwood City. Her second newsletter was the one that would bring in sponsors and donors, and she had been putting it off. The first one took her eight hours.',
      'When I asked where the second one was, she said "I haven\'t started it. I don\'t have another eight hours."',
      'We sat down and built her an email engine in about an hour. She talks into her phone, it comes back with three versions, she picks and tweaks. She was nervous at first because she wanted to do all the writing herself. Then she saw the words coming back were hers.',
    ],
    videoSrc: '/videos/noname.mp4',
    videoPoster: '/images/noname.png',
  },
  {
    id: 'diane',
    client: 'Diane Freeman',
    role: 'Founder, Bee Seen Social Media Marketing',
    industry: 'Social Media Agency · Saint Augustine',
    timeframe: 'Signal Bank Implementation',
    quote: '"With the Signal Bank, the emotion is built into it. My clients think I\'m like this genius. Really, you\'re the genius, and their content is getting traction."',
    headline: 'Replacing one-time client intake documents with living signal banks',
    storyParagraphs: [
      'Diane Freeman runs Bee Seen Social Media Marketing in Saint Augustine. She used to sit a client down once and pull everything out in one long interview, then work off that document until it ran dry.',
      'Now every client has a signal bank that grows every time she talks to them. Coffee chats, interviews, testimonials, all of it goes in. She keeps one for her own brand too.',
    ],
    videoSrc: '/videos/Sandra.mp4',
    videoPoster: '/images/Sandra.png',
  },
];

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onNavigate, onOpenBooking, data }) => {
  // State for expanded cards
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    shelia: false,
  });

  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMutedVideos((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? false : !prev[id],
    }));
  };

  const handleBooking = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onOpenBooking) onOpenBooking();
    else window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const activeStudies: CaseStudy[] = data?.studies && data.studies.length > 0 ? data.studies : CASE_STUDIES;

  return (
    <div className="min-h-screen bg-[#FFF9F3] text-[#1E2E2A] font-sans antialiased flex flex-col">
      {/* Universal Transparent Navbar */}
      <Navbar
        onOpenBooking={() => handleBooking()}
        onNavigate={onNavigate}
        theme="dark-text"
      />

      {/* Hero */}
      <section className="py-12 sm:py-20 max-w-5xl mx-auto px-6 sm:px-10 text-center">
        <span className="text-xs uppercase tracking-widest text-[#536357] font-semibold mb-3 block">
          {data?.eyebrow || 'Client Proof & Case Studies'}
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif italic text-[#0D4049] tracking-tight">
          {data?.headline || 'What happens when expertise gets seen'}
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[#536357] font-sans max-w-2xl mx-auto leading-relaxed">
          {data?.description || 'Real numbers from founders, builders, and marketing leaders who stopped hiding behind delivery and let their perspective compound in public.'}
        </p>
      </section>

      {/* Case Studies Deep Dive List */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 pb-24 space-y-16 flex-1 w-full">
        {activeStudies.map((study, index) => {
          const cardId = study.id || study._id || `study-${index}`;
          const isExpanded = !!expandedCards[cardId];
          const isMuted = mutedVideos[cardId] ?? true;
          const displayQuote = study.quote || (study.quotes && study.quotes[0]) || '';

          // Determine start/preview of text box
          const previewText = study.storyParagraphs && study.storyParagraphs.length > 0
            ? study.storyParagraphs[0]
            : (study.challenge || study.approach || '');

          return (
            <article
              key={cardId}
              id={`case-study-${cardId}`}
              className="bg-[#FFFDF9] rounded-none p-8 sm:p-12 lg:p-14 shadow-[0_25px_65px_-12px_rgba(13,64,73,0.18)] border border-stone-200/60 transition-all duration-300"
            >
              {/* 1. Quote on top: Meta Header & prominent quote in #536357 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#536357]">
                    {study.timeframe || 'Case Study Sprint'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4049]">
                  {study.client} · <span className="text-[#536357] font-normal font-sans text-lg">{study.role}</span>
                </h3>

                {/* Separator line */}
                <div className="border-b border-[#536357]/20 pt-2" />

                {/* The Quote on top: #536357, no blue background */}
                {displayQuote && (
                  <div className="py-2">
                    <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-[1.85rem] text-[#536357] leading-relaxed">
                      &ldquo;{displayQuote.replace(/^["“”]|["“”]$/g, '')}&rdquo;
                    </blockquote>
                  </div>
                )}

                {/* Separator line */}
                <div className="border-b border-[#536357]/20" />
              </div>

              {/* 2. Content Row before and with expand:
                  Left side: Start of text box with an expand button below it.
                  Right side: Space next to text box with the Video testimonial. */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
                
                {/* Left side: Text box start + Expand button below it */}
                <div className="lg:col-span-7 flex flex-col justify-between font-sans">
                  {study.headline && (
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#0D4049] leading-snug mb-4">
                      {study.headline}
                    </h4>
                  )}

                  {/* Start of text box (visible before expand) */}
                  <div className="text-base sm:text-lg leading-relaxed text-[#281B0C]/90 font-sans space-y-4">
                    <p className="font-normal">{previewText}</p>

                    {/* Additional content revealed when expanded */}
                    {isExpanded && (
                      <div className="space-y-4 pt-2 border-t border-[#536357]/15 animate-fadeIn">
                        {study.storyParagraphs && study.storyParagraphs.length > 1 ? (
                          study.storyParagraphs.slice(1).map((para, pIdx) => (
                            <p key={pIdx} className="leading-relaxed">{para}</p>
                          ))
                        ) : (
                          <div className="space-y-5 pt-2">
                            {study.approach && (
                              <div className="border-l-2 border-[#0D4049] pl-4 py-1">
                                <span className="text-xs uppercase tracking-wider font-bold text-[#0D4049] block mb-1">
                                  02 · The GLS Extraction
                                </span>
                                <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
                                  {study.approach}
                                </p>
                              </div>
                            )}

                            {study.outcome && (
                              <div className="border-l-2 border-[#BDC67A] pl-4 py-1">
                                <span className="text-xs uppercase tracking-wider font-bold text-[#536357] block mb-1">
                                  03 · The Commercial Result
                                </span>
                                <p className="text-[#0D4049] text-sm sm:text-base leading-relaxed font-medium">
                                  {study.outcome}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Expand button below the start of the text box */}
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => toggleExpand(cardId)}
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#0D4049] hover:text-[#536357] cursor-pointer py-1.5 transition-colors select-none group/expand"
                    >
                      <span className="underline underline-offset-4 decoration-[#BDC67A] group-hover/expand:decoration-[#0D4049]">
                        {isExpanded ? 'Collapse case details' : 'Read full case breakdown'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 text-[#0D4049] group-hover/expand:text-[#536357] ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Right side: Video testimonial in vertical rectangular shorts/reels (9:16) ratio */}
                <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
                  <div className="relative rounded-none overflow-hidden bg-black aspect-[9/16] w-full max-w-[270px] sm:max-w-[300px] shadow-md border border-stone-300 group/video">
                    <video
                      src={study.videoSrc || '/videos/Sandra.mp4'}
                      poster={study.videoPoster || '/images/Sandra.png'}
                      controls
                      playsInline
                      muted={isMuted}
                      preload="metadata"
                      className="w-full h-full object-cover rounded-none"
                    >
                      Your browser does not support HTML video.
                    </video>

                    {/* Sound toggle button */}
                    <button
                      type="button"
                      onClick={(e) => toggleMute(cardId, e)}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <div className="absolute bottom-2 left-3 pointer-events-none">
                      <span className="text-[0.68rem] uppercase font-semibold text-white/90 bg-black/50 px-2 py-0.5 rounded-none backdrop-blur-xs">
                        {study.client} · Video Testimonial
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. "Check if this fits your company" button:
                  - Remains visible for expanded and unexpanded views.
                  - Encased in a rounded button in #BDC67A.
                  - Text white, same weight, bigger font size.
                  - On hover: Lengthens button to accommodate arrow, and changes text color to dark green: #536357. */}
              <div className="pt-8 mt-6 border-t border-[#536357]/15 flex items-center justify-start">
                <button
                  type="button"
                  onClick={(e) => handleBooking(e)}
                  className="rounded-full pl-7 pr-7 hover:pr-9 py-3.5 bg-[#BDC67A] hover:bg-[#aeb868] inline-flex items-center gap-2.5 transition-all duration-300 shadow-sm group cursor-pointer active:scale-[0.98]"
                  aria-label={`Check if GLS fits your company based on ${study.client}'s story`}
                >
                  <span className="text-white group-hover:text-[#536357] font-semibold text-base sm:text-lg transition-colors duration-200 whitespace-nowrap">
                    Check if this fits your company
                  </span>
                  <ArrowRight className="w-0 opacity-0 -translate-x-3 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0 text-white group-hover:text-[#536357] transition-all duration-300 shrink-0" />
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Dynamic Sections from Page Builder */}
      {data?.sections && (
        <div className="pb-16">
          <SectionRenderer sections={data.sections} onOpenBooking={() => handleBooking()} />
        </div>
      )}
    </div>
  );
};
