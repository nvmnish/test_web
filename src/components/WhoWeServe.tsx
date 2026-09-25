import React from 'react';

interface WhoWeServeProps {
  onRedirectToCaseStudies?: () => void;
}

export const WhoWeServe: React.FC<WhoWeServeProps> = ({ onRedirectToCaseStudies }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onRedirectToCaseStudies) {
      e.preventDefault();
      onRedirectToCaseStudies();
    } else {
      window.location.href = '/case-studies';
    }
  };
  return (
    <section className="py-24 sm:py-32 bg-[#FFF9F3]" id="who-we-serve">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Heading - Matched to Pricing: text-5xl sm:text-6xl lg:text-[4.25rem] text-[#281B0C] */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-serif italic text-[#281B0C] tracking-tight">
            Who We Serve
          </h2>
        </div>

        {/* Two Golden/Ochre Cards with around 85% opacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* Card 1: Marketing Teams - All caps light brown-grey color matching subheading */}
          <div className="flex flex-col">
            <span className="uppercase tracking-widest text-[#8F7D6B] font-sans font-medium text-xs sm:text-sm mb-3 px-1">
              MARKETING TEAMS
            </span>
            <div className="bg-[#DC943B]/85 text-white p-8 sm:p-10 lg:p-12 rounded-[2rem] shadow-sm flex flex-col justify-between flex-1 min-h-[380px] transition-transform hover:-translate-y-1 duration-300">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight mb-5 leading-snug">
                  Your team is shipping everything. <br />
                  Nothing is landing.
                </h3>
                <p className="text-white/95 text-sm sm:text-[0.95rem] leading-relaxed mb-4 font-sans">
                  You are in sprint meetings, status updates, and delivery cycles all day. What is due, what is blocked, who owns what. The work goes out on time and the market cannot feel any of it.
                </p>
                <p className="text-white/95 text-sm sm:text-[0.95rem] leading-relaxed font-sans">
                  I find the signal inside what your team already knows, then shape the message around what buyers need to hear before they will trust you and move.
                </p>
              </div>

              <div className="pt-8 mt-auto">
                <a
                  href="/case-studies"
                  onClick={handleClick}
                  className="inline-flex items-center text-sm sm:text-base font-semibold text-white hover:underline cursor-pointer group"
                  id="marketing-teams-how-it-works"
                >
                  <span>See how it works</span>
                  <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Founders and Owners - All caps light brown-grey color matching subheading */}
          <div className="flex flex-col">
            <span className="uppercase tracking-widest text-[#8F7D6B] font-sans font-medium text-xs sm:text-sm mb-3 px-1">
              FOUNDERS AND OWNERS
            </span>
            <div className="bg-[#DC943B]/85 text-white p-8 sm:p-10 lg:p-12 rounded-[2rem] shadow-sm flex flex-col justify-between flex-1 min-h-[380px] transition-transform hover:-translate-y-1 duration-300">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight mb-5 leading-snug">
                  You are the one everybody asks. <br />
                  Nobody outside can tell.
                </h3>
                <p className="text-white/95 text-sm sm:text-[0.95rem] leading-relaxed mb-4 font-sans">
                  You built something. People rely on what you know. You are also the one holding it together, so content stays a thing you think about on the drive home and never do.
                </p>
                <p className="text-white/95 text-sm sm:text-[0.95rem] leading-relaxed font-sans">
                  I pull what is buried in your experience and turn it into something visible and steady, without adding one more thing you have to write yourself.
                </p>
              </div>

              <div className="pt-8 mt-auto">
                <a
                  href="/case-studies"
                  onClick={handleClick}
                  className="inline-flex items-center text-sm sm:text-base font-semibold text-white hover:underline cursor-pointer group"
                  id="founders-how-it-works"
                >
                  <span>See how it works</span>
                  <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
