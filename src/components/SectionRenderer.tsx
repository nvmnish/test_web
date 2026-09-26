import React from 'react';
import { WhoWeServe } from './WhoWeServe';
import { ClientStories } from './ClientStories';
import { VideoCarousel } from './VideoCarousel';
import { Pricing } from './Pricing';
import { ComparisonTable } from './ComparisonTable';
import { FAQSection } from './FAQSection';
import { ClosingCta } from './ClosingCta';
import { CasinoSpinNumber } from './CasinoCounter';
import { urlForImage } from '../lib/sanity/image';
import { ArrowRight } from 'lucide-react';
import { EmailToolPopup } from './EmailToolPopup';

interface SectionRendererProps {
  sections: any[] | null | undefined;
  onOpenBooking?: () => void;
  onOpenHeavyModal?: () => void;
  onSelectTier?: (tierId: string) => void;
  onRedirectToCaseStudies?: () => void;
  onNavigate?: (page: any) => void;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  sections,
  onOpenBooking,
  onOpenHeavyModal,
  onSelectTier,
  onRedirectToCaseStudies,
  onNavigate,
}) => {
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  return (
    <div className="dynamic-sections-container">
      {sections.map((section, idx) => {
        const key = section._key || `section-${section._type}-${idx}`;

        switch (section._type) {
          case 'whoWeServeSection':
            return (
              <WhoWeServe
                key={key}
                onRedirectToCaseStudies={onRedirectToCaseStudies}
              />
            );

          case 'clientStoriesSection':
            return (
              <ClientStories
                key={key}
                onOpenBooking={onOpenBooking}
                onRedirectToCaseStudies={onRedirectToCaseStudies}
                onNavigate={onNavigate}
              />
            );

          case 'videoCarouselSection':
            return <VideoCarousel key={key} />;

          case 'pricingSection':
            return (
              <Pricing
                key={key}
                onSelectTier={onSelectTier}
              />
            );

          case 'comparisonSection':
            return <ComparisonTable key={key} />;

          case 'faqSection':
            return (
              <FAQSection
                key={key}
                onOpenBooking={onOpenBooking}
              />
            );

          case 'closingCtaSection':
            return (
              <ClosingCta
                key={key}
                onOpenBooking={onOpenBooking}
                onOpenHeavyModal={onOpenHeavyModal}
              />
            );

          case 'popupToolSection':
            return (
              <EmailToolPopup
                key={key}
                badgeText={section.badgeText}
                headline={section.headline}
                buttonText={section.buttonText}
              />
            );

          case 'metricsSection': {

            const hasTwoLine = section.metric1 || section.metric2;
            if (hasTwoLine) {
              const m1 = section.metric1 || { metric: '3x', words: 'Commercial Projects Originated' };
              const m2 = section.metric2 || {
                metric: '2x',
                words: 'Campus Enrollment Capacity Doubled',
                descriptorLine: 'Harrisburg campus surged from 28% to 56% without prior advertising history',
              };

              return (
                <div key={key} className="bg-[#FFFDF9] py-14 border-y border-[#1F3B36]/10 shadow-xs my-8">
                  <div className="max-w-5xl mx-auto px-6 sm:px-10 space-y-8">
                    {/* Line 1: Metrics 1 */}
                    <div className="pb-6 border-b border-[#536357]/15 flex flex-wrap items-baseline gap-3">
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-['Figtree',sans-serif] font-normal text-[#0D4049]">
                        {m1.metric}
                      </span>
                      <span className="text-2xl sm:text-3xl font-['Figtree',sans-serif] font-normal text-[#0D4049]">
                        {m1.words}
                      </span>
                      {m1.descriptor && (
                        <span className="text-sm text-[#536357] font-sans ml-2">
                          {m1.descriptor}
                        </span>
                      )}
                    </div>

                    {/* Line 2: Metrics 2 with descriptor line next to the large metric */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="text-4xl sm:text-5xl lg:text-6xl font-['Figtree',sans-serif] font-normal text-[#0D4049]">
                          {m2.metric}
                        </span>
                        <span className="text-2xl sm:text-3xl font-['Figtree',sans-serif] font-normal text-[#0D4049]">
                          {m2.words}
                        </span>
                      </div>
                      {m2.descriptorLine && (
                        <div className="lg:border-l-2 lg:border-[#536357]/25 lg:pl-6 text-sm sm:text-base text-[#536357] font-sans max-w-xl leading-relaxed">
                          {m2.descriptorLine}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            if (section.metrics && Array.isArray(section.metrics)) {
              return (
                <div key={key} className="bg-[#FFF9F3] py-12 border-y border-[#1F3B36]/10">
                  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {section.metrics.map((m: any, mIdx: number) => (
                      <div key={mIdx} className="space-y-2">
                        <div className="text-4xl sm:text-5xl font-['Figtree',sans-serif] font-normal text-[#0D4049]">
                          <CasinoSpinNumber value={Number(m.number) || 0} suffix={m.suffix || ''} />
                        </div>
                        <p className="text-sm text-[#536357] font-sans leading-relaxed">{m.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          }

          case 'proofCtaSection': {
            const headline = section.headline || 'Ready to turn hard-won expertise into inbound pipeline?';
            const points: string[] = section.numberedPoints && section.numberedPoints.length > 0
              ? section.numberedPoints
              : [
                  'We audit your current positioning and identify where you lose high-value buyers in 20 minutes.',
                  'We extract your lived client stories and build your proprietary voice bank without ghostwritten fluff.',
                  'You spend 45 minutes bi-weekly; we ship 6 weeks of compounding authority content.',
                ];
            const buttonText = section.buttonText || 'Book a gap call';

            return (
              <section key={key} className="py-20 sm:py-28 bg-[#FFF9F3]">
                <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-[#0D4049] tracking-tight mb-10 leading-[1.15]">
                    {headline}
                  </h2>

                  {/* Numbered Points Description */}
                  <div className="space-y-4 max-w-2xl mx-auto text-left mb-12 font-sans">
                    {points.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#536357]/15 shadow-xs"
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#BDC67A]/35 text-[#0D4049] font-bold text-sm shrink-0">
                          {pIdx + 1}
                        </span>
                        <p className="text-[#1E2E2A] text-base leading-relaxed font-sans pt-0.5">
                          {pt}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Button Only: Book a gap call */}
                  <div className="flex justify-center">
                    <button
                      onClick={onOpenBooking}
                      className="bg-[#0D4049] hover:bg-[#08292E] text-white px-9 py-4 rounded-full font-medium text-base transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.99] flex items-center gap-2"
                    >
                      <span>{buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </section>
            );
          }

          case 'richTextSection':
            return (
              <section key={key} className="py-16 sm:py-20 bg-[#FFF9F3]">
                <div className={`max-w-4xl mx-auto px-6 sm:px-10 ${section.align === 'center' ? 'text-center' : 'text-left'}`}>
                  {section.eyebrow && (
                    <span className="text-xs uppercase tracking-widest text-[#536357] font-semibold block mb-3">
                      {section.eyebrow}
                    </span>
                  )}
                  {section.heading && (
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[#0D4049] tracking-tight mb-6">
                      {section.heading}
                    </h2>
                  )}
                  {section.body && Array.isArray(section.body) && (
                    <div className="space-y-4 text-base sm:text-lg text-[#536357] font-sans leading-relaxed">
                      {section.body.map((p: string, pIdx: number) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  )}
                  {section.buttonText && (
                    <div className="mt-8">
                      <a
                        href={section.buttonUrl || '#'}
                        className="inline-flex items-center px-6 py-3 bg-[#24423C] text-white rounded font-medium hover:bg-[#1A342E] transition-colors"
                      >
                        {section.buttonText}
                      </a>
                    </div>
                  )}
                </div>
              </section>
            );

          case 'mediaCalloutSection': {
            const imgUrl = section.image ? urlForImage(section.image) : null;
            return (
              <section key={key} className="py-16 sm:py-24 bg-[#FFF9F3]">
                <div className="max-w-5xl mx-auto px-6 sm:px-10">
                  <div className="bg-[#A9D6D4]/80 p-8 sm:p-12 rounded-[2rem] text-[#0D4049] flex flex-col md:flex-row gap-8 items-center">
                    {imgUrl && (
                      <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-sm">
                        <img src={imgUrl} alt={section.title || 'Callout'} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="w-full md:w-1/2 space-y-4">
                      {section.title && <h3 className="text-2xl font-bold font-sans">{section.title}</h3>}
                      {section.quote && (
                        <blockquote className="text-2xl font-serif italic leading-snug">
                          &ldquo;{section.quote}&rdquo;
                        </blockquote>
                      )}
                      {section.quoteAuthor && (
                        <p className="text-sm font-semibold tracking-wide uppercase text-[#0D4049]/80">
                          — {section.quoteAuthor}
                        </p>
                      )}
                      {section.caption && <p className="text-sm opacity-90">{section.caption}</p>}
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
};
