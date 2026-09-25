import React from 'react';

interface ClientStoriesProps {
  onOpenBooking?: () => void;
}

export const ClientStories: React.FC<ClientStoriesProps> = ({ onOpenBooking }) => {
  const handleBooking = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.dispatchEvent(new CustomEvent('open-booking-modal'));
    }
  };
  return (
    <section className="py-20 sm:py-28 bg-[#FFF9F3]" id="proof">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-24">
        
        {/* Story 1: Shelia */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
          {/* Left: Big Quote Side (no line below quotes) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2 sm:py-4 pr-0 lg:pr-4">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#536357]">
                Client Story
              </span>
              <blockquote className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif italic text-[#0D4049] leading-[1.18] tracking-tight">
                &ldquo;We&apos;ve gone from zero postings. I never post.&rdquo;
              </blockquote>
            </div>
            {/* Removed border-t border-[#1F3B36]/10 */}
            <div className="pt-4 sm:pt-6 mt-4 lg:mt-0">
              <p className="font-sans font-semibold text-sm sm:text-base text-[#0D4049]">
                Shelia
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#536357]">
                Three months into working together
              </p>
            </div>
          </div>

          {/* Right: Soft Mint/Teal Card with #A9D6D4 */}
          <div className="lg:col-span-7 flex">
            <div className="bg-[#A9D6D4]/80 text-[#0D4049] p-8 sm:p-10 lg:p-11 rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg shadow-xs flex flex-col justify-between w-full transition-transform hover:-translate-y-0.5 duration-200">
              <div className="space-y-4 text-sm sm:text-[0.98rem] leading-relaxed font-sans">
                <p className="font-medium text-[#0D4049]">
                  She told me no for two months. Too busy, too nervous, not her thing. We started in June anyway.
                </p>
                <p className="text-[#0D4049]/90">
                  By September, a distant contact&apos;s barber saw her content. That led to a dentist interested in her for three projects: expanding his practice, building a second one from the ground up, and a strip mall he owns across the street. That same week, someone called to have her build a custom home.
                </p>
              </div>

              <div className="pt-8 mt-auto">
                <button
                  type="button"
                  onClick={handleBooking}
                  data-open-booking="true"
                  className="inline-flex items-center text-sm sm:text-base font-semibold text-[#0D4049] hover:text-[#08292E] cursor-pointer group"
                  id="shelia-story-cta"
                >
                  <span className="border-b border-[#0D4049]/40 group-hover:border-[#0D4049]">See how content can compound for you</span>
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Story 2: Roslyn */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
          {/* Left: Soft Mint/Teal Card with #A9D6D4 */}
          <div className="lg:col-span-7 flex order-2 lg:order-1">
            <div className="bg-[#A9D6D4]/80 text-[#0D4049] p-8 sm:p-10 lg:p-11 rounded-tr-[2.25rem] rounded-bl-[2.25rem] rounded-tl-lg rounded-br-lg shadow-xs flex flex-col justify-between w-full transition-transform hover:-translate-y-0.5 duration-200">
              <div className="space-y-4 text-sm sm:text-[0.98rem] leading-relaxed font-sans">
                <p className="font-medium text-[#0D4049]">
                  Her Harrisburg campus has room for 125 children. It sat at 28% full. We started in March.
                </p>
                <p className="text-[#0D4049]/90">
                  By June 30 it was at 56%, and she had never run marketing of any kind before that. She found out on a call with me, because I stopped and asked her for the number.
                </p>
              </div>

              <div className="pt-8 mt-auto">
                <button
                  type="button"
                  onClick={handleBooking}
                  data-open-booking="true"
                  className="inline-flex items-center text-sm sm:text-base font-semibold text-[#0D4049] hover:text-[#08292E] cursor-pointer group"
                  id="roslyn-story-cta"
                >
                  <span className="border-b border-[#0D4049]/40 group-hover:border-[#0D4049]">See what this could look like for you</span>
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Big Quote Side (no line below quotes) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2 sm:py-4 pl-0 lg:pl-4 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#536357]">
                Client Story
              </span>
              <blockquote className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif italic text-[#0D4049] leading-[1.18] tracking-tight">
                &ldquo;I had no idea. <br />
                I&apos;m so excited.&rdquo;
              </blockquote>
            </div>
            {/* Removed border-t border-[#1F3B36]/10 */}
            <div className="pt-4 sm:pt-6 mt-4 lg:mt-0">
              <p className="font-sans font-semibold text-sm sm:text-base text-[#0D4049]">
                Roslyn
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#536357]">
                Hearing her enrollment number out loud
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
