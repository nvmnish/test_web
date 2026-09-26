import React, { useState } from 'react';
import { Navbar, PageView } from './Navbar';
import { ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';

import { SectionRenderer } from './SectionRenderer';

interface ContactPageProps {
  onNavigate?: (page: PageView) => void;
  onOpenBooking?: () => void;
  onSelectTier?: (tierId: string) => void;
  data?: any;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectTier,
  data,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState<'founder' | 'marketing' | 'operator' | 'other'>('founder');
  const [interest, setInterest] = useState('work-with-me-directly');
  const [linkedInOrUrl, setLinkedInOrUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  const handleGoToCheckout = (tierId: string) => {
    if (onSelectTier) {
      onSelectTier(tierId);
    } else if (onNavigate) {
      onNavigate('booking');
    } else {
      window.location.href = `/booking?tier=${tierId}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F3]/60 text-[#1E2E2A] font-sans antialiased flex flex-col selection:bg-[#B8C87A]/40 selection:text-[#162A26]">
      {/* Universal Transparent Navbar */}
      <Navbar onOpenBooking={onOpenBooking} onNavigate={onNavigate} theme="dark-text" />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-16">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#24423C] font-semibold block mb-2">
            {data?.eyebrow || 'Work With Me · Direct Executive Advisory'}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-[#1F3B36] tracking-tight mb-4">
            {data?.headline || 'Start a Conversation'}
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans">
            {data?.subheadline || 'Whether you are evaluating the full Executive Content Engine, an Advisory Sprint, or simply need an objective sounding board on your category messaging, get in touch. Sheri personally reviews all executive inquiries within one business day.'}
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white border border-stone-200 rounded-[2rem] p-10 sm:p-14 text-center max-w-xl mx-auto shadow-sm animate-fadeIn">
            <div className="w-16 h-16 bg-[#E8F2EC] text-[#24423C] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#1F3B36] mb-3">
              Message Received
            </h2>
            <p className="text-stone-600 text-base leading-relaxed font-sans mb-6">
              Thank you, <strong>{name}</strong>! Your inquiry regarding{' '}
              <strong className="text-[#1F3B36]">
                {interest === 'work-with-me-directly'
                  ? 'Work with me directly'
                  : interest === 'the-signal-room'
                  ? 'The Signal Room'
                  : interest === 'speaking'
                  ? 'Speaking / Workshop'
                  : 'General Partnership'}
              </strong>{' '}
              has been routed directly to Sheri. A personal reply will be sent to{' '}
              <strong className="text-[#1F3B36]">{email}</strong> within one business day.
            </p>

            <div className="bg-[#FFF9F3] border border-stone-200 rounded-2xl p-5 mb-6 text-left text-xs text-stone-600 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-stone-500 uppercase tracking-wider">Company</span>
                <span className="font-medium text-[#1F3B36]">{company || 'Independent / Confidential'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-stone-500 uppercase tracking-wider">Follow-Up SLA</span>
                <span className="font-medium text-[#2E6B56]">Within 24 Hours</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('home') : window.location.href = '/'}
                className="bg-[#24423C] hover:bg-[#1A342E] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-xs cursor-pointer"
              >
                Back to Home
              </button>
              <button
                type="button"
                onClick={() => handleGoToCheckout('work-with-me-directly')}
                className="bg-white hover:bg-stone-50 text-[#24423C] border border-stone-300 px-6 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer"
              >
                Explore Checkout &amp; Tiers
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6 font-sans text-sm">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#1F3B36] mb-1">
                  Tell Me About Your Goals
                </h3>
                <p className="text-xs text-stone-500">
                  Fill out the fields below so we can prepare before our first call.
                </p>
              </div>

                {/* Role Switcher */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    I am a:
                  </label>
                  <div className="grid grid-cols-2 gap-2.5 max-w-xs">
                    {[
                      { id: 'founder', label: 'Founder / CEO' },
                      { id: 'marketing', label: 'Marketing Head' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRole(item.id as typeof role)}
                        className={`py-2 px-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                          role === item.id
                            ? 'bg-[#24423C] text-white border-[#24423C] shadow-xs'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50 bg-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rachel Chen"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FFFDF9] focus:outline-none focus:border-[#24423C] text-stone-800 text-sm"
                      id="contact-name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Work Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rachel@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FFFDF9] focus:outline-none focus:border-[#24423C] text-stone-800 text-sm"
                      id="contact-email"
                    />
                  </div>
                </div>

                {/* Company and Website / LinkedIn */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Company or Brand
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Apex Dynamics"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FFFDF9] focus:outline-none focus:border-[#24423C] text-stone-800 text-sm"
                      id="contact-company"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Website or LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={linkedInOrUrl}
                      onChange={(e) => setLinkedInOrUrl(e.target.value)}
                      placeholder="linkedin.com/in/..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FFFDF9] focus:outline-none focus:border-[#24423C] text-stone-800 text-sm"
                      id="contact-url"
                    />
                  </div>
                </div>

                {/* Engagement Interest Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Primary Area of Interest:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: 'work-with-me-directly',
                        title: 'Work with me directly',
                        desc: 'Starts at $4,000/mo · Two spots open · Done For You executive presence',
                      },
                      {
                        id: 'the-signal-room',
                        title: 'The Signal Room',
                        desc: '$500/mo · Six months · Eight seats · Method & group implementation',
                      },
                      {
                        id: 'speaking',
                        title: 'Speaking & Workshops',
                        desc: 'Keynote speaking or in-house executive messaging workshops',
                      },
                      {
                        id: 'general',
                        title: 'General Inquiries & Media',
                        desc: 'Podcast guesting, press commentary, or custom partnership',
                      },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setInterest(opt.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          interest === opt.id
                            ? 'border-[#24423C] bg-[#F5F8ED] shadow-xs'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs sm:text-sm text-[#1F3B36]">{opt.title}</span>
                          <span className={`w-3.5 h-3.5 rounded-full border ${interest === opt.id ? 'bg-[#24423C] border-[#24423C]' : 'border-stone-300'}`} />
                        </div>
                        <p className="text-[0.75rem] text-stone-500 leading-snug">{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    What feels heaviest or what are you aiming to solve? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me a bit about your current content cadence, target audience, or what bottleneck you want to clear..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FFFDF9] focus:outline-none focus:border-[#24423C] text-stone-800 text-sm"
                    id="contact-message"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#24423C] hover:bg-[#1A342E] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                    id="contact-submit-button"
                  >
                    {isSubmitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4" />
                        <span>Send Message to Sheri</span>
                      </>
                    )}
                  </button>
                  <p className="text-[0.7rem] text-stone-500 mt-2">
                    Zero spam or SDR follow-ups. Handled directly by Sheri Otto.
                  </p>
                </div>
              </form>
            </div>
          )}
      </main>

      {data?.sections && (
        <SectionRenderer 
          sections={data.sections} 
          onOpenBooking={onOpenBooking} 
          onNavigate={onNavigate} 
        />
      )}
    </div>
  );
};
