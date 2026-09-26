import React from 'react';
import { ArrowRight } from 'lucide-react';

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

  return (
    <section className="py-14 sm:py-20 bg-[#FFF9F3]" id="proof">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        
        {/* Quote 1: Shelia - Card removed, Quote bigger, Photo square, whole area links to Proof page */}
        <div
          onClick={handleGoToProof}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGoToProof(); }}
          className="group block cursor-pointer transition-all duration-300"
          aria-label="Read Shelia's client proof and case study"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Quote, Author, and Figtree grey paragraph */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#536357]">
                  Client Story
                </span>
                <blockquote className="text-4xl sm:text-5xl lg:text-[3.15rem] font-serif italic text-[#0D4049] leading-[1.12] tracking-tight">
                  &ldquo;We&apos;ve gone from zero postings. I never post.&rdquo;
                </blockquote>
              </div>

              {/* Author Info */}
              <div>
                <p className="font-sans font-semibold text-base sm:text-lg text-[#0D4049]">
                  Shelia
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#536357]">
                  Three months into working together
                </p>
              </div>

              {/* Paragraph underneath the quote in Figtree font, grey colour */}
              <div className="pt-2 font-['Figtree',sans-serif] text-stone-600 text-base sm:text-lg leading-relaxed">
                <p>
                  She told me no for two months. Too busy, too nervous, not her thing. We started in June anyway. By September, a distant contact&apos;s barber saw her content, which immediately led to a dentist contracting her for three commercial projects and a custom home build.
                </p>
              </div>

              {/* Arrow inside solid theme-light blue (#A9D6D4) */}
              <div className="pt-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#A9D6D4] text-[#0D4049] flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#94cac8] transition-transform duration-200">
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
                </div>
                <span className="text-sm font-semibold text-[#0D4049] opacity-80 group-hover:opacity-100 group-hover:underline">
                  See how content can compound for you
                </span>
              </div>
            </div>

            {/* Right: Space for Image for Quote 1 (Square / unrounded) */}
            <div className="lg:col-span-5 w-full">
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-none overflow-hidden bg-stone-100 border border-stone-200 shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                  alt="Shelia - Architectural & Building Leadership"
                  className="w-full h-full object-cover object-top rounded-none transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[0.7rem] uppercase tracking-wider font-semibold text-white/90 bg-black/50 px-2.5 py-1 rounded-none backdrop-blur-xs">
                  Commercial Architecture & Building
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quote 2: Roslyn - Card removed, Image on LEFT (Square / unrounded), Quote bigger, whole area links to Proof page */}
        <div
          onClick={handleGoToProof}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGoToProof(); }}
          className="group block cursor-pointer transition-all duration-300"
          aria-label="Read Roslyn's client proof and case study"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Image placeholder on the left side of the page (Square / unrounded) */}
            <div className="lg:col-span-5 order-2 lg:order-1 w-full">
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-none overflow-hidden bg-stone-100 border border-stone-200 shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=80"
                  alt="Roslyn - Educational Founder & Campus Leadership"
                  className="w-full h-full object-cover object-top rounded-none transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[0.7rem] uppercase tracking-wider font-semibold text-white/90 bg-black/50 px-2.5 py-1 rounded-none backdrop-blur-xs">
                  Campus Enrollment & Growth
                </span>
              </div>
            </div>

            {/* Right: Quote, Author, and Figtree grey paragraph */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#536357]">
                  Client Story
                </span>
                <blockquote className="text-4xl sm:text-5xl lg:text-[3.15rem] font-serif italic text-[#0D4049] leading-[1.12] tracking-tight">
                  &ldquo;I had no idea. <br className="hidden sm:inline" />
                  I&apos;m so excited.&rdquo;
                </blockquote>
              </div>

              {/* Author Info */}
              <div>
                <p className="font-sans font-semibold text-base sm:text-lg text-[#0D4049]">
                  Roslyn
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#536357]">
                  Hearing her enrollment number out loud
                </p>
              </div>

              {/* Paragraph underneath the quote in Figtree font, grey colour */}
              <div className="pt-2 font-['Figtree',sans-serif] text-stone-600 text-base sm:text-lg leading-relaxed">
                <p>
                  Her Harrisburg campus had room for 125 children and sat at 28% full. We started in March. By June 30 it was at 56%, and she had never run marketing of any kind before that. She found out on a call with me, because I stopped and asked her for the number.
                </p>
              </div>

              {/* Arrow inside solid theme-light blue (#A9D6D4) */}
              <div className="pt-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#A9D6D4] text-[#0D4049] flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#94cac8] transition-transform duration-200">
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
                </div>
                <span className="text-sm font-semibold text-[#0D4049] opacity-80 group-hover:opacity-100 group-hover:underline">
                  See what this could look like for you
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
