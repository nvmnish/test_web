import React from 'react';
import { WhoWeServe } from './WhoWeServe';
import { ClientStories } from './ClientStories';
import { VideoCarousel } from './VideoCarousel';
import { Pricing } from './Pricing';
import { ComparisonTable } from './ComparisonTable';
import { FAQSection } from './FAQSection';
import { ClosingCta } from './ClosingCta';
import { Hero } from './Hero';
import { CasinoSpinNumber } from './CasinoCounter';
import { urlForImage } from '../lib/sanity/image';
import { ArrowRight, Download, BookOpen, Clock, Calendar, CheckCircle } from 'lucide-react';
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

  // Filter out hidden sections
  const visibleSections = sections.filter((s) => !s?.hidden);

  return (
    <div className="dynamic-sections-container">
      {visibleSections.map((section, idx) => {
        const key = section._key || `section-${section._type}-${idx}`;

        switch (section._type) {
          case 'heroSection':
            return (
              <Hero
                key={key}
                data={section}
                onOpenBooking={onOpenBooking}
                onOpenHeavyModal={onOpenHeavyModal}
              />
            );

          case 'whoWeServeSection':
            return (
              <WhoWeServe
                key={key}
                data={section}
                onRedirectToCaseStudies={onRedirectToCaseStudies}
              />
            );

          case 'clientStoriesSection':
            return (
              <ClientStories
                key={key}
                data={section}
                onOpenBooking={onOpenBooking}
                onRedirectToCaseStudies={onRedirectToCaseStudies}
                onNavigate={onNavigate}
              />
            );

          case 'videoCarouselSection':
            return <VideoCarousel key={key} data={section} />;

          case 'pricingSection':
            return (
              <Pricing
                key={key}
                title={section.heading || section.title}
                onSelectTier={onSelectTier}
              />
            );

          case 'comparisonSection':
            return <ComparisonTable key={key} data={section} />;

          case 'faqSection':
            return (
              <FAQSection
                key={key}
                data={section}
                title={section.heading || section.title}
                onOpenBooking={onOpenBooking}
              />
            );

          case 'closingCtaSection':
            return (
              <ClosingCta
                key={key}
                data={section}
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

                    {/* Line 2: Metrics 2 with descriptor line */}
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

          case 'blogListingSection': {
            const posts = section.selectedPosts || [];
            return (
              <section key={key} className="py-16 sm:py-24 bg-[#FFF9F3]">
                <div className="max-w-6xl mx-auto px-6 sm:px-10">
                  <div className="max-w-2xl mb-12">
                    {section.eyebrow && (
                      <span className="text-xs uppercase tracking-widest text-[#536357] font-semibold block mb-2">
                        {section.eyebrow}
                      </span>
                    )}
                    <h2 className="text-3xl sm:text-4xl font-serif italic text-[#0D4049] tracking-tight mb-4">
                      {section.title || 'Field Notes & Essays'}
                    </h2>
                    {section.description && (
                      <p className="text-stone-600 font-sans">{section.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post: any, pIdx: number) => {
                      const postImg = post.imageUrl || (post.coverImage ? urlForImage(post.coverImage) : null);
                      return (
                        <a
                          key={pIdx}
                          href={`/blog#${post.slug || post.id}`}
                          className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                        >
                          {postImg && (
                            <div className="aspect-16/10 overflow-hidden bg-stone-100">
                              <img
                                src={postImg}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
                                <span>{post.category || 'Strategy'}</span>
                                {post.readTime && <span>· {post.readTime}</span>}
                              </div>
                              <h3 className="text-lg font-bold text-[#1F3B36] group-hover:text-[#BDC67A] transition-colors leading-snug">
                                {post.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-stone-600 font-sans line-clamp-3">
                                {post.excerpt}
                              </p>
                            </div>
                            <span className="mt-4 text-xs font-semibold text-[#1F3B36] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              Read essay <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }

          case 'caseStudyGridSection': {
            const studies = section.selectedStudies || [];
            return (
              <section key={key} className="py-16 sm:py-24 bg-[#FFF9F3]">
                <div className="max-w-6xl mx-auto px-6 sm:px-10">
                  <div className="max-w-2xl mb-12">
                    {section.eyebrow && (
                      <span className="text-xs uppercase tracking-widest text-[#536357] font-semibold block mb-2">
                        {section.eyebrow}
                      </span>
                    )}
                    <h2 className="text-3xl sm:text-4xl font-serif italic text-[#0D4049] tracking-tight mb-4">
                      {section.title || 'Verified Client Proof'}
                    </h2>
                    {section.description && (
                      <p className="text-stone-600 font-sans">{section.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {studies.map((st: any, sIdx: number) => {
                      const photoUrl = st.clientPhotoUrl || (st.clientPhoto ? urlForImage(st.clientPhoto) : null);
                      return (
                        <div
                          key={sIdx}
                          className="bg-white rounded-2xl border border-stone-200/80 p-8 shadow-xs flex flex-col justify-between"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              {photoUrl && (
                                <img
                                  src={photoUrl}
                                  alt={st.client}
                                  className="w-14 h-14 rounded-full object-cover border border-stone-200"
                                />
                              )}
                              <div>
                                <h3 className="font-bold text-[#1F3B36] text-lg">{st.client}</h3>
                                <p className="text-xs text-stone-500">{st.tagline}</p>
                              </div>
                            </div>
                            <div className="pt-2">
                              <span className="text-3xl sm:text-4xl font-serif italic text-[#0D4049] block mb-1">
                                {st.metric}
                              </span>
                              <p className="text-sm font-semibold text-[#1F3B36]">{st.outcome}</p>
                            </div>
                          </div>
                          <div className="mt-6 pt-4 border-t border-stone-100">
                            <a
                              href="/case-studies"
                              className="text-xs font-semibold text-[#0D4049] hover:underline flex items-center gap-1.5"
                            >
                              View full breakdown <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }

          case 'resourceListingSection': {
            const resources = section.selectedResources || [];
            return (
              <section key={key} className="py-16 sm:py-24 bg-[#FFF9F3]">
                <div className="max-w-6xl mx-auto px-6 sm:px-10">
                  <div className="max-w-2xl mb-12">
                    {section.eyebrow && (
                      <span className="text-xs uppercase tracking-widest text-[#536357] font-semibold block mb-2">
                        {section.eyebrow}
                      </span>
                    )}
                    <h2 className="text-3xl sm:text-4xl font-serif italic text-[#0D4049] tracking-tight mb-4">
                      {section.title || 'Free Tools & Downloads'}
                    </h2>
                    {section.description && (
                      <p className="text-stone-600 font-sans">{section.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {resources.map((item: any, rIdx: number) => {
                      const fileLink = item.downloadFileUrl || item.downloadUrl || '#';
                      return (
                        <div
                          key={rIdx}
                          className="bg-white rounded-2xl border border-stone-200/80 p-8 shadow-xs flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <span className="text-xs uppercase tracking-wider font-semibold text-[#BDC67A] block">
                              {item.tag || 'Artifact'}
                            </span>
                            <h3 className="text-xl font-bold text-[#1F3B36] leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-xs font-medium text-stone-500">
                              Deliverable: {item.deliverable}
                            </p>
                            <p className="text-sm text-stone-600 font-sans leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <div className="mt-6 pt-4 border-t border-stone-100">
                            <a
                              href={fileLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F3B36] text-white text-xs font-semibold hover:bg-[#152824] transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download Artifact</span>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }

          case 'aboutBioSection': {
            const bioImg = section.bioImageUrl || (section.bioImage ? urlForImage(section.bioImage) : null);
            return (
              <section key={key} className="py-16 sm:py-24 bg-[#FFF9F3]">
                <div className="max-w-5xl mx-auto px-6 sm:px-10">
                  <div className="max-w-2xl mb-12">
                    {section.eyebrow && (
                      <span className="text-xs uppercase tracking-widest text-[#536357] font-semibold block mb-2">
                        {section.eyebrow}
                      </span>
                    )}
                    <blockquote className="text-2xl sm:text-3xl font-serif italic text-[#0D4049] leading-snug">
                      {section.headlineQuote || '“I work with people who are great at what they do.”'}
                    </blockquote>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                    {bioImg && (
                      <div className="md:col-span-5">
                        <img
                          src={bioImg}
                          alt="Sheri Otto"
                          className="w-full rounded-2xl shadow-md object-cover aspect-4/5"
                        />
                      </div>
                    )}
                    <div className={`${bioImg ? 'md:col-span-7' : 'md:col-span-12'} space-y-6 text-stone-700 font-sans leading-relaxed`}>
                      {section.bioLead && (
                        <p className="text-lg sm:text-xl font-medium text-[#1F3B36] leading-relaxed">
                          {section.bioLead}
                        </p>
                      )}
                      {section.paragraphs?.map((p: string, pIdx: number) => (
                        <p key={pIdx} className="text-base text-stone-600">
                          {p}
                        </p>
                      ))}

                      {section.principles && section.principles.length > 0 && (
                        <div className="pt-6 border-t border-stone-200/80 space-y-4">
                          <h4 className="font-bold text-[#1F3B36] text-lg font-serif">
                            {section.principlesTitle || 'Three things I believe'}
                          </h4>
                          <div className="space-y-3">
                            {section.principles.map((pr: any, prIdx: number) => (
                              <div key={prIdx} className="p-4 rounded-xl bg-white border border-stone-200/70">
                                <span className="font-bold text-[#0D4049] block mb-1">
                                  {pr.number ? `${pr.number}. ` : ''}{pr.title}
                                </span>
                                <p className="text-xs sm:text-sm text-stone-600">{pr.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {section.ctaText && (
                        <div className="pt-4">
                          <button
                            onClick={onOpenBooking}
                            className="bg-[#0D4049] text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#08292E] transition-all cursor-pointer flex items-center gap-2"
                          >
                            <span>{section.ctaText}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
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
