import React, { useState } from 'react';
import { CheckCircle2, Mail, Sparkles } from 'lucide-react';
import { Navbar, PageView } from './Navbar';

import { SectionRenderer } from './SectionRenderer';

interface NewsletterPageProps {
  onNavigate?: (page: PageView) => void;
  onOpenBooking?: () => void;
  data?: any;
}

export const NewsletterPage: React.FC<NewsletterPageProps> = ({
  onNavigate,
  onOpenBooking,
  data,
}) => {
  const [role, setRole] = useState<'founder' | 'team'>('founder');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F3]/60 text-[#1E2E2A] font-sans antialiased flex flex-col">
      {/* Universal Transparent Navbar */}
      <Navbar
        onOpenBooking={handleBooking}
        onNavigate={onNavigate}
        theme="dark-text"
      />

      {/* Main Container */}
      <section className="py-12 sm:py-20 max-w-3xl mx-auto px-6 sm:px-10 flex-1 w-full">
        <div className="bg-[#FFF9F3] border-2 border-[#0D4049] rounded-none p-8 sm:p-12 lg:p-14 shadow-md relative overflow-hidden">
          {isSubmitted ? (

            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-[#BDC67A]/30 text-[#0D4049] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-[#0D4049]">
                You are on the list, {name || 'friend'}!
              </h2>
              <p className="text-[#536357] text-sm max-w-md mx-auto leading-relaxed font-sans">
                Every other Tuesday, you will receive our single highest-signal essay on B2B positioning, executive narrative, and demand architecture.
              </p>
            </div>
          ) : (
            <div>
              <div className="text-center max-w-xl mx-auto mb-10">
                <span className="text-xs uppercase tracking-widest text-[#536357] font-semibold mb-2 block">
                  {data?.eyebrow || 'Fortnightly Executive Briefing'}
                </span>
                <h1 className="text-4xl sm:text-5xl font-serif italic text-[#0D4049] tracking-tight mb-4">
                  {data?.title || 'The Signal Letter'}
                </h1>
                <p className="text-sm sm:text-base text-[#536357] font-sans leading-relaxed">
                  {data?.subtitle || 'No generic motivational tips. Just 1 field-tested positioning teardown and 2 framework adjustments every other Tuesday morning.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto font-sans">
                {/* Role Switcher */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#536357] mb-2 text-center">
                    I AM A:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('founder')}
                      className={`py-3 px-4 rounded-xl border text-center text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                        role === 'founder'
                          ? 'bg-[#0D4049] text-white border-[#0D4049] shadow-xs'
                          : 'border-[#536357]/20 text-[#536357] hover:border-[#0D4049]/40 bg-white'
                      }`}
                    >
                      FOUNDER / OWNER
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('team')}
                      className={`py-3 px-4 rounded-xl border text-center text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                        role === 'team'
                          ? 'bg-[#0D4049] text-white border-[#0D4049] shadow-xs'
                          : 'border-[#536357]/20 text-[#536357] hover:border-[#0D4049]/40 bg-white'
                      }`}
                    >
                      IN-HOUSE TEAM
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#536357] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl border border-[#536357]/20 bg-white focus:outline-none focus:border-[#0D4049] text-[#0D4049] text-sm shadow-xs"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-[#536357] mb-1.5">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#536357]/20 bg-white focus:outline-none focus:border-[#0D4049] text-[#0D4049] text-sm shadow-xs"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#0D4049] hover:bg-[#08292E] text-white py-4 px-6 rounded-full font-medium text-sm sm:text-base transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    id="newsletter-submit-btn"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Join 1,800+ Leaders on The Signal Letter</span>
                  </button>
                </div>

                <p className="text-[0.75rem] text-center text-[#536357]/80">
                  Strictly 0 spam. Unsubscribe anytime with 1 click.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {data?.sections && (
        <SectionRenderer 
          sections={data.sections} 
          onOpenBooking={handleBooking} 
          onNavigate={onNavigate} 
        />
      )}
    </div>
  );
};
