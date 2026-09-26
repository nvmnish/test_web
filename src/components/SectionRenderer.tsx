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

          case 'metricsSection':
            if (section.metrics && Array.isArray(section.metrics)) {
              return (
                <div key={key} className="bg-[#FFF9F3] py-12 border-y border-[#1F3B36]/10">
                  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {section.metrics.map((m: any, mIdx: number) => (
                      <div key={mIdx} className="space-y-2">
                        <div className="text-4xl sm:text-5xl font-serif text-[#0D4049]">
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
