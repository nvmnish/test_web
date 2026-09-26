import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';

interface FAQSectionProps {
  onOpenBooking?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']); // First one open by default

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenBooking) {
      onOpenBooking();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-booking-modal'));
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FFF9F3]" id="faq">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Heading - Enlarged with 281B0C */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-serif italic text-[#281B0C] tracking-tight">
            FAQ
          </h2>
        </div>

        {/* Accordion List with pure plus/minus icon (no circle) and Figtree typography in #281B0C */}
        <div className="divide-y divide-[#281B0C]/15 border-t border-b border-[#281B0C]/15">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div key={item.id} className="py-6 sm:py-7 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                  id={`faq-btn-${item.id}`}
                >
                  <span className="text-lg sm:text-xl font-sans font-medium text-[#281B0C] group-hover:text-[#281B0C]/80 transition-colors pr-6 leading-snug">
                    {item.question}
                  </span>
                  <div className="flex items-center justify-center shrink-0 text-[#281B0C] group-hover:text-[#281B0C]/80 transition-colors pl-2">
                    {isOpen ? (
                      <Minus className="w-5 h-5 stroke-[2]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[2]" />
                    )}
                  </div>
                </button>

                {/* Answer Content in Figtree font and #281B0C */}
                {isOpen && (
                  <div className="pt-4 pr-8 sm:pr-12 text-base sm:text-[1.02rem] leading-relaxed text-[#281B0C]/85 font-sans animate-fadeIn">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom subtle note */}
        <div className="mt-12 text-center text-sm sm:text-base text-[#281B0C]/75 font-sans">
          Have a specific question not covered here?{' '}
          <button
            type="button"
            onClick={handleBooking}
            className="text-[#281B0C] underline font-semibold hover:text-[#281B0C]/80 cursor-pointer"
            id="faq-ask-sheri-btn"
          >
            Ask Sheri directly on a gap check call
          </button>
        </div>
      </div>
    </section>
  );
};
