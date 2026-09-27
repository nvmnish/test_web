import React from 'react';
import Vertical_wideshot_1 from '../assets/images/content_photo.jpg';

const resolveImageSrc = (img: unknown, fallback: string): string => {
  if (typeof img === 'string' && img.length > 0) return img;
  if (img && typeof img === 'object' && 'src' in img && typeof (img as { src: unknown }).src === 'string') {
    return (img as { src: string }).src;
  }
  return fallback;
};

const verticalWideshotSrc = resolveImageSrc(Vertical_wideshot_1, '/assets/images/content_photo.jpg');

import { urlForImage } from '../lib/sanity/image';

interface ClosingCtaProps {
  onOpenBooking?: () => void;
  onOpenHeavyModal?: () => void;
  data?: any;
}

export const ClosingCta: React.FC<ClosingCtaProps> = ({ onOpenBooking, onOpenHeavyModal, data }) => {
  const handleBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const handleHeavy = () => {
    if (onOpenHeavyModal) onOpenHeavyModal();
    else window.dispatchEvent(new CustomEvent('open-heavy-modal'));
  };

  const eyebrow = data?.eyebrow || 'The Working Philosophy';
  const philosophyQuote = data?.quote || '“I work with people who are great at what they do. My job is making sure the right people know it.”';
  const authorName = data?.author || 'Sheri Otto';
  const authorRole = data?.role || 'Founder, GLS';
  const photoSrc = data?.photoUrl || (data?.image ? urlForImage(data.image) : null) || verticalWideshotSrc;

  const punchlineHeadline = data?.punchline || data?.headline || (
    <>
      Your expertise deserves to be{' '}
      <span className="italic font-serif text-[#D48B32]">seen.</span>
    </>
  );
  const punchlineSubheadline = data?.subheadline || (
    <>
      Stop letting what you know stay trapped inside client delivery and team meetings. Let&apos;s turn it into demand.
    </>
  );
  const primaryCtaText = data?.primaryCta || 'Book a 20-minute gap check';
  const secondaryCtaText = data?.secondaryCta || 'Or tell me what feels heavy';

  return (
    <section className="py-14 sm:py-20 bg-[#FFF9F3]" id="closing-cta">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Large Chartreuse/Olive Landscape Card - Edges sharp (rounded-none) */}
        <div className="bg-[#C4D588] rounded-none p-6 sm:p-10 lg:p-14 shadow-sm relative overflow-hidden max-w-6xl mx-auto">
          {/* Subtle noise pattern */}
          <div className="absolute inset-0 bg-noise opacity-50 mix-blend-multiply pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Quote & Context */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center pr-0 md:pr-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#294B43] mb-4">
                {eyebrow}
              </span>
              <p className="text-2xl sm:text-3xl lg:text-[2.35rem] font-serif italic text-[#1F3B36] leading-snug">
                {philosophyQuote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-0.5 bg-[#1F3B36]/30"></div>
                <p className="font-sans text-sm font-semibold text-[#1F3B36]">
                  {authorName} <span className="font-normal text-[#274A42]">· {authorRole}</span>
                </p>
              </div>
            </div>

            {/* Right Column: Photo frame with less rounded corners */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center md:justify-end">
              <div className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px] aspect-[4/3] sm:aspect-[14/10] rounded-sm overflow-hidden shadow-lg bg-[#AFC176] border border-white/25">
                <img
                  src={photoSrc}
                  alt={`${authorName} presenting`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top rounded-sm"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Closing Punchline Heading */}
        <div className="text-center mt-16 sm:mt-24 max-w-3xl mx-auto">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1F3B36] tracking-tight leading-tight">
            {punchlineHeadline}
          </h3>

          <p className="mt-6 text-base sm:text-lg text-stone-600 font-sans max-w-xl mx-auto">
            {punchlineSubheadline}
          </p>

          {/* Action Button Pair - Round buttons (rounded-full) */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={handleBooking}
              className="w-full sm:w-auto bg-[#24423C] hover:bg-[#1A342E] text-white px-8 py-3.5 rounded-full font-medium text-sm sm:text-base tracking-normal transition-all duration-200 shadow-sm cursor-pointer active:scale-[0.99]"
              id="closing-book-call"
            >
              {primaryCtaText}
            </button>
            <button
              onClick={handleHeavy}
              className="w-full sm:w-auto bg-white hover:bg-stone-50 text-[#24423C] px-8 py-3.5 rounded-full font-medium text-sm sm:text-base tracking-normal transition-all duration-200 shadow-sm border border-stone-200 cursor-pointer active:scale-[0.99]"
              id="closing-tell-heavy"
            >
              {secondaryCtaText}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
