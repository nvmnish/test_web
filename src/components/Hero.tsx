import React from 'react';
import { METRICS } from '../data/content';
import { Navbar, PageView } from './Navbar';
import { CasinoSpinNumber } from './CasinoCounter';
import bg from '../assets/images/bg.png';
import pointing_wide_1 from '../assets/images/pointing_wide 1.png';

const resolveImageSrc = (img: unknown, fallback: string): string => {
  if (typeof img === 'string' && img.length > 0) return img;
  if (img && typeof img === 'object' && 'src' in img && typeof (img as { src: unknown }).src === 'string') {
    return (img as { src: string }).src;
  }
  return fallback;
};

const bgSrc = resolveImageSrc(bg, '/assets/images/bg.png');
const pointingWideSrc = resolveImageSrc(pointing_wide_1, '/assets/images/pointing_wide.png');

interface HeroProps {
  onOpenBooking?: () => void;
  onOpenHeavyModal?: () => void;
  onNavigate?: (page: PageView) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenHeavyModal, onNavigate }) => {
  const handleBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const handleHeavy = () => {
    if (onOpenHeavyModal) onOpenHeavyModal();
    else window.dispatchEvent(new CustomEvent('open-heavy-modal'));
  };
  return (
    <>
      {/* Hero Viewing Screen - Cuts off cleanly at the end of the viewing screen */}
      <section className="relative overflow-hidden bg-[#BDC67A] min-h-screen flex flex-col justify-between" id="about">
        {/* Background canvas in #BDC67A */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden bg-[#BDC67A]">
          {/* Background Image: Standard full presentation */}
          <img
            src={bgSrc}
            alt="Hero background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-fill object-center"
          />

          {/* Obvious tactile fine-grain noise layer in darker color */}
          <div 
            className="absolute inset-0 pointer-events-none z-[1] opacity-60 mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='heroNoiseFine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23heroNoiseFine)' opacity='0.9'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '120px 120px',
            }}
            aria-hidden="true"
          />
          {/* Gradient removed completely as requested */}
        </div>

        {/* Navbar overlapping directly on top of the image */}
        <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

        {/* Center Part of the Screen: Hero Text on Left, Photo/Overlap on Right, Shifted higher on the page */}
        <div className="relative z-10 flex-1 flex items-center justify-center max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-2 sm:pt-4 pb-12 sm:pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center w-full max-w-6xl mx-auto">
            
            {/* Left Column: Hero Text in Figtree Medium, Value Proposition & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start order-1 lg:order-1 pr-0 lg:pr-6 xl:pr-10">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.65rem] xl:text-[3.85rem] leading-[1.14] tracking-tight text-white font-sans font-medium">
                Marketing for people <br />
                too busy <span className="italic font-serif font-normal">doing the work</span> <br />
                to talk about it
              </h1>

              <p className="mt-6 sm:mt-7 text-[#F5F8ED] text-base sm:text-[1.05rem] leading-relaxed max-w-xl font-sans font-normal opacity-95">
                I am Sheri Otto. I run content and messaging for founders, operators, and in-house teams. Either I do it for you, or I teach you to run it yourself. You talk. The rest gets handled.
              </p>

              {/* CTA Actions with subtle rounded corners */}
              <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <button
                  onClick={handleBooking}
                  className="bg-[#24423C] hover:bg-[#1A342E] text-white px-7 py-3.5 rounded-[4px] font-medium text-sm sm:text-base tracking-normal transition-all duration-200 shadow-sm text-center cursor-pointer active:scale-[0.99] relative z-20"
                  id="hero-book-gap-check"
                >
                  Book a 20-minute gap check
                </button>
                <button
                  onClick={handleHeavy}
                  className="bg-white hover:bg-stone-50 text-[#24423C] px-7 py-3.5 rounded-[4px] font-medium text-sm sm:text-base tracking-normal transition-all duration-200 shadow-sm border border-white/60 text-center cursor-pointer active:scale-[0.99] relative z-20"
                  id="hero-tell-heavy"
                >
                  Or tell me what feels heavy
                </button>
              </div>
            </div>

            {/* Right Column: Photo and Overlap Element, all corners rounded */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end order-2 lg:order-2 pl-0 lg:pl-4 xl:pl-6">
              <div className="relative w-full max-w-[340px] sm:max-w-[390px] xl:max-w-[420px]">
                {/* Blue/Teal square behind it: shifted, all corners rounded - Color: #A9D6D4 */}
                <div 
                  className="absolute inset-0 translate-x-[24px] sm:translate-x-[32px] translate-y-[32px] sm:translate-y-[42px] bg-[#A9D6D4] rounded-[2.5rem] sm:rounded-[3.25rem] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Foreground Photo Card: Square aspect ratio (1:1), all corners rounded */}
                <div className="relative z-10 w-full aspect-square rounded-[2.5rem] sm:rounded-[3.25rem] overflow-hidden bg-[#A9D6D4] shadow-md">
                  <img
                    src={pointingWideSrc}
                    alt="Sheri Otto presenting"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[32%_center]"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Empty spacer to balance layout if needed */}
        <div className="h-4 pointer-events-none" />
      </section>

      {/* Metrics Section - Styled in the exact style example provided in the image with cream palette */}
      <section className="bg-[#FFF9F3] text-[#1F3B36] py-16 sm:py-20 lg:py-24 relative z-20 border-b border-[#281B0C]/5" id="metrics">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-14 lg:gap-16 xl:gap-24 text-left">
            {METRICS.map((metric, idx) => {
              const fillPercent = metric.barPercentage ?? (typeof metric.number === 'number' ? metric.number : 88);
              return (
                <div key={idx} className="flex flex-col items-start text-left">
                  {/* Number with Superscript % / x / months in upright Serif */}
                  <div className="text-8xl sm:text-[6.5rem] lg:text-[7.25rem] xl:text-[7.75rem] font-serif font-normal text-[#1F3B36] leading-none tracking-tight flex items-start select-none">
                    <CasinoSpinNumber
                      value={metric.number}
                      className="font-serif font-normal text-[#1F3B36] not-italic"
                      containerClassName="inline-flex items-start font-serif font-normal text-[#1F3B36] not-italic tracking-tight select-none overflow-hidden"
                    />
                    {metric.suffix && (
                      <span 
                        className={`${
                          metric.suffix.trim().length <= 2 
                            ? 'text-3xl sm:text-4xl lg:text-5xl -mt-1' 
                            : 'text-2xl sm:text-3xl lg:text-[2.25rem] -mt-0.5 sm:-mt-1'
                        } font-serif font-normal text-[#1F3B36] ml-1 sm:ml-1.5 select-none self-start`}
                      >
                        {metric.suffix.trim()}
                      </span>
                    )}
                  </div>

                  {/* Accent Progress Bar: Orange fill with subtle warm track */}
                  <div className="w-full h-[3px] bg-[#281B0C]/12 mt-7 mb-5 overflow-hidden flex rounded-full">
                    <div 
                      className="h-full bg-[#DC943B] transition-all duration-1000 ease-out rounded-full"
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>

                  {/* Description text in crisp sans-serif, left-aligned, matching example style */}
                  <p className="text-[#24423C]/85 text-sm sm:text-[0.95rem] leading-relaxed font-sans max-w-sm font-normal">
                    {metric.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
