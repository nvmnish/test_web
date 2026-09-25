import React from 'react';
import { PRICING_TIERS } from '../data/content';

interface PricingProps {
  onSelectTier?: (tierId: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectTier }) => {
  const handleTierSelect = (tierId: string) => {
    if (onSelectTier) {
      onSelectTier(tierId);
    } else {
      window.location.href = `/booking?tier=${tierId}`;
    }
  };
  return (
    <section className="py-24 sm:py-32 bg-[#FFF9F3] scroll-mt-10" id="pricing">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-serif italic text-[#281B0C] tracking-tight">
            Pricing
          </h2>
        </div>

        {/* Two Clean Tiers - both sharing warm background #FFF9F3 (dark green removed from second tier) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 max-w-5xl mx-auto items-stretch">
          {PRICING_TIERS.map((tier, index) => {
            const isSecondTier = index === 1;

            return (
              <div
                key={tier.id}
                className={`relative rounded-[1.75rem] p-10 sm:p-12 lg:p-14 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] bg-[#FFF9F3] text-[#281B0C] ${
                  isSecondTier
                    ? 'border-2 border-[#BDC67A]'
                    : 'border border-[#281B0C]/15'
                }`}
                style={{
                  boxShadow: '0 4px 20px -2px rgba(195, 170, 141, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 35px -5px rgba(195, 170, 141, 0.7), 0 8px 16px -4px rgba(195, 170, 141, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(195, 170, 141, 0.25)';
                }}
                id={`pricing-card-${tier.id}`}
              >
                {/* Recommended Badge on second tier */}
                {isSecondTier && (
                  <div className="absolute -top-3.5 left-10 sm:left-12">
                    <span className="bg-[#BDC67A] text-[#162A24] text-xs uppercase tracking-widest font-bold font-sans px-3.5 py-1 rounded-sm shadow-sm inline-block">
                      Recommended
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-[#281B0C]">
                    {tier.title}
                  </h3>

                  {/* Prominent Price Display */}
                  <div className="mt-4 mb-2 flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-serif font-bold tracking-tight text-[#281B0C]">
                      {tier.price}
                    </span>
                    <span className="text-base sm:text-lg font-sans font-medium text-stone-600">
                      {tier.cadence}
                    </span>
                  </div>

                  {/* Subtitle / Commitment Info */}
                  {tier.subtitle && (
                    <p className="text-sm sm:text-base font-sans font-medium text-[#281B0C]/75 mb-6">
                      {tier.subtitle}
                    </p>
                  )}

                  {/* Tagline / Description */}
                  <p className="text-base sm:text-lg leading-relaxed font-sans font-medium text-[#281B0C] mb-6">
                    {tier.description}
                  </p>

                  {/* Feature Header */}
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#281B0C]/70 mb-3">
                    {tier.featureHeader || 'Every month:'}
                  </p>

                  {/* Feature List with arrow (→) */}
                  <div className="space-y-3 pt-1">
                    {tier.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start text-sm sm:text-[0.95rem] font-sans text-[#281B0C]"
                      >
                        <span className="text-[#281B0C] font-semibold mr-2.5 shrink-0 text-base leading-snug">
                          →
                        </span>
                        <span className="leading-snug text-[#281B0C]/90">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Note (e.g. 'You do not write anything.' or '$4,000 vs $500 comparison') */}
                  {tier.footerNote && (
                    <div className="mt-6 pt-5 border-t border-[#281B0C]/10 text-sm font-sans font-medium text-[#281B0C]">
                      {tier.footerNote}
                    </div>
                  )}

                  {/* Best For */}
                  {tier.idealFor && (
                    <div className="mt-4 text-xs sm:text-sm font-sans text-stone-600 leading-relaxed italic">
                      {tier.idealFor}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="pt-12 mt-auto">
                  <button
                    onClick={() => handleTierSelect(tier.id)}
                    className={`w-full py-4 px-6 rounded-md font-sans font-medium text-sm sm:text-base text-center transition-all duration-200 shadow-sm cursor-pointer active:scale-[0.99] ${
                      isSecondTier
                        ? 'bg-[#BDC67A] hover:bg-[#AEC068] text-[#162A24] font-semibold'
                        : 'bg-[#281B0C] hover:bg-[#1A1208] text-white'
                    }`}
                    id={`cta-${tier.id}`}
                  >
                    {tier.ctaText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
