import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StoryItem {
  eyebrow?: string;
  quote?: string;
  clientName?: string;
  timeframe?: string;
  paragraph?: string;
  photoUrl?: string;
  photoTag?: string;
  ctaText?: string;
  imagePlacement?: 'right' | 'left';
}

interface ClientStoriesProps {
  onOpenBooking?: () => void;
  onRedirectToCaseStudies?: () => void;
  onNavigate?: (page: any) => void;
  data?: any;
}

export const ClientStories: React.FC<ClientStoriesProps> = ({ onOpenBooking, onRedirectToCaseStudies, onNavigate, data }) => {
  const handleGoToProof = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onRedirectToCaseStudies) {
      onRedirectToCaseStudies();
    } else if (onNavigate) {
      onNavigate('case-studies');
    } else {
      window.location.href = '/case-studies';
    }
  };

  const defaultStory1: StoryItem = {
    eyebrow: 'Client Story',
    quote: "“We've gone from zero postings. I never post.”",
    clientName: 'Shelia',
    timeframe: 'Three months into working together',
    paragraph: "She told me no for two months. Too busy, too nervous, not her thing. We started in June anyway. By September, a distant contact's barber saw her content, which immediately led to a dentist contracting her for three commercial projects and a custom home build.",
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    photoTag: 'Commercial Architecture & Building',
    ctaText: 'See how content can compound for you',
    imagePlacement: 'right',
  };

  const defaultStory2: StoryItem = {
    eyebrow: 'Client Story',
    quote: "“I had no idea. I'm so excited.”",
    clientName: 'Roslyn',
    timeframe: 'Hearing her enrollment number out loud',
    paragraph: "Her Harrisburg campus had room for 125 children and sat at 28% full. We started in March. By June 30 it was at 56%, and she had never run marketing of any kind before that. She found out on a call with me, because I stopped and asked her for the number.",
    photoUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=80',
    photoTag: 'Campus Enrollment & Growth',
    ctaText: 'See what this could look like for you',
    imagePlacement: 'left',
  };

  // Determine active stories: custom list, direct quote fields, or defaults
  const activeStories: StoryItem[] = (() => {
    if (data?.stories && Array.isArray(data.stories) && data.stories.length > 0) {
      return data.stories.map((s: any, idx: number) => ({
        eyebrow: s.eyebrow || 'Client Story',
        quote: s.quote || (idx === 0 ? defaultStory1.quote : defaultStory2.quote),
        clientName: s.clientName || (idx === 0 ? defaultStory1.clientName : defaultStory2.clientName),
        timeframe: s.timeframe || (idx === 0 ? defaultStory1.timeframe : defaultStory2.timeframe),
        paragraph: s.paragraph || (idx === 0 ? defaultStory1.paragraph : defaultStory2.paragraph),
        photoUrl: s.photoUrl || s.photo?.asset?.url || (idx === 0 ? defaultStory1.photoUrl : defaultStory2.photoUrl),
        photoTag: s.photoTag || (idx === 0 ? defaultStory1.photoTag : defaultStory2.photoTag),
        ctaText: s.ctaText || (idx === 0 ? defaultStory1.ctaText : defaultStory2.ctaText),
        imagePlacement: s.imagePlacement || (idx % 2 === 0 ? 'right' : 'left'),
      }));
    }

    const s1: StoryItem = {
      eyebrow: 'Client Story',
      quote: data?.quote1?.quote || data?.quote1Quote || defaultStory1.quote,
      clientName: data?.quote1?.clientName || data?.quote1ClientName || defaultStory1.clientName,
      timeframe: data?.quote1?.timeframe || data?.quote1Timeframe || defaultStory1.timeframe,
      paragraph: data?.quote1?.paragraph || data?.quote1Paragraph || defaultStory1.paragraph,
      photoUrl: data?.quote1?.photoUrl || data?.quote1PhotoUrl || defaultStory1.photoUrl,
      photoTag: data?.quote1?.tag || data?.quote1Tag || defaultStory1.photoTag,
      ctaText: data?.quote1?.ctaText || data?.quote1CtaText || defaultStory1.ctaText,
      imagePlacement: 'right',
    };

    const s2: StoryItem = {
      eyebrow: 'Client Story',
      quote: data?.quote2?.quote || data?.quote2Quote || defaultStory2.quote,
      clientName: data?.quote2?.clientName || data?.quote2ClientName || defaultStory2.clientName,
      timeframe: data?.quote2?.timeframe || data?.quote2Timeframe || defaultStory2.timeframe,
      paragraph: data?.quote2?.paragraph || data?.quote2Paragraph || defaultStory2.paragraph,
      photoUrl: data?.quote2?.photoUrl || data?.quote2PhotoUrl || defaultStory2.photoUrl,
      photoTag: data?.quote2?.tag || data?.quote2Tag || defaultStory2.photoTag,
      ctaText: data?.quote2?.ctaText || data?.quote2CtaText || defaultStory2.ctaText,
      imagePlacement: 'left',
    };

    return [s1, s2];
  })();

  return (
    <section className="py-14 sm:py-20 bg-[#FFF9F3]" id="proof">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {activeStories.map((story, index) => {
          const isImageLeft = story.imagePlacement === 'left';

          return (
            <div
              key={index}
              onClick={handleGoToProof}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGoToProof(); }}
              className="group block cursor-pointer transition-all duration-300"
              aria-label={`Read ${story.clientName || 'client'}'s proof and case study`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* Content Block */}
                <div
                  className={`lg:col-span-7 flex flex-col justify-between space-y-6 ${
                    isImageLeft ? 'order-1 lg:order-2' : ''
                  }`}
                >
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#536357]">
                      {story.eyebrow || 'Client Story'}
                    </span>
                    <blockquote className="text-4xl sm:text-5xl lg:text-[3.15rem] font-serif italic text-[#0D4049] leading-[1.12] tracking-tight">
                      {story.quote}
                    </blockquote>
                  </div>

                  {/* Author Info */}
                  <div>
                    <p className="font-sans font-semibold text-base sm:text-lg text-[#0D4049]">
                      {story.clientName}
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-[#536357]">
                      {story.timeframe}
                    </p>
                  </div>

                  {/* Paragraph underneath the quote in Figtree font, grey colour */}
                  {story.paragraph && (
                    <div className="pt-2 font-['Figtree',sans-serif] text-stone-600 text-base sm:text-lg leading-relaxed">
                      <p>{story.paragraph}</p>
                    </div>
                  )}

                  {/* Arrow inside solid theme-light blue (#A9D6D4) */}
                  <div className="pt-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#A9D6D4] text-[#0D4049] flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#94cac8] transition-transform duration-200">
                      <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <span className="text-sm font-semibold text-[#0D4049] opacity-80 group-hover:opacity-100 group-hover:underline">
                      {story.ctaText || 'See how content can compound for you'}
                    </span>
                  </div>
                </div>

                {/* Photo Space */}
                <div
                  className={`lg:col-span-5 w-full ${
                    isImageLeft ? 'order-2 lg:order-1' : ''
                  }`}
                >
                  <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-none overflow-hidden bg-stone-100 border border-stone-200 shadow-sm group-hover:shadow-md transition-shadow">
                    <img
                      src={story.photoUrl}
                      alt={`${story.clientName || 'Client'} - ${story.photoTag || 'Leadership'}`}
                      className="w-full h-full object-cover object-top rounded-none transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    {story.photoTag && (
                      <span className="absolute bottom-3 left-4 text-[0.7rem] uppercase tracking-wider font-semibold text-white/90 bg-black/50 px-2.5 py-1 rounded-none backdrop-blur-xs">
                        {story.photoTag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
