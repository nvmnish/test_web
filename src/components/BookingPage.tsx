import React, { useState, useEffect } from 'react';
import { Navbar, PageView } from './Navbar';
import { PRICING_TIERS } from '../data/content';
import { Calendar, Clock, CheckCircle2, Check, ShieldCheck, ChevronDown, ChevronUp, ArrowRight, Sparkles, PhoneCall } from 'lucide-react';

interface BookingPageProps {
  onNavigate?: (page: PageView) => void;
  selectedTierId?: string | null;
  onSelectTier?: (tierId: string) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  onNavigate,
  selectedTierId = null,
  onSelectTier,
}) => {
  // Accordion step management: 1 (Contact & Info), 2 (Plan & Inclusions), 3 (On-boarding slot)
  const [activeStep, setActiveStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Step 1 fields
  const [role, setRole] = useState<'founder' | 'marketing'>('founder');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [bottleneck, setBottleneck] = useState('');
  const [topicsToDiscuss, setTopicsToDiscuss] = useState('');

  // Step 2 plan selection: default to passed prop, or default tier for deterministic SSR hydration
  const [currentTierId, setCurrentTierId] = useState<string>(selectedTierId || 'work-with-me-directly');

  useEffect(() => {
    if (selectedTierId) {
      setCurrentTierId(selectedTierId);
    } else if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tierParam = params.get('tier');
      if (tierParam && PRICING_TIERS.some((t) => t.id === tierParam)) {
        setCurrentTierId(tierParam);
      }
    }
  }, [selectedTierId]);

  // Step 3 slot selection & pricing interest
  const [selectedDay, setSelectedDay] = useState('Tuesday');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [pricingInterest, setPricingInterest] = useState<string>('');

  // Final submission state
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Active plan details
  const activePlan = PRICING_TIERS.find((t) => t.id === currentTierId) || PRICING_TIERS[0];

  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    if (!completedSteps.includes(1)) {
      setCompletedSteps((prev) => [...prev, 1]);
    }
    setActiveStep(2);
  };

  const handleStep2Continue = () => {
    if (onSelectTier) {
      onSelectTier(currentTierId);
    }
    if (!completedSteps.includes(2)) {
      setCompletedSteps((prev) => [...prev, 2]);
    }
    setActiveStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completedSteps.includes(3)) {
      setCompletedSteps((prev) => [...prev, 3]);
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleStep = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber) || stepNumber <= Math.max(1, ...completedSteps) + 1) {
      setActiveStep(activeStep === stepNumber ? 0 : stepNumber);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1E2E2A] font-sans antialiased flex flex-col">
      {/* Universal Transparent Navbar */}
      <Navbar onOpenBooking={() => {}} onNavigate={onNavigate} theme="dark-text" />

      {/* Main Checkout Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-16">
        {isSubmitted ? (
          <div className="bg-white border border-stone-200 rounded-[2rem] p-10 sm:p-14 text-center max-w-xl mx-auto shadow-sm animate-fadeIn">
            <div className="w-16 h-16 bg-[#E8F2EC] text-[#24423C] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#1F3B36] mb-3">
              On-Boarding Call Confirmed
            </h2>
            <p className="text-stone-600 text-base leading-relaxed font-sans mb-6">
              Thank you, <strong>{name}</strong>! Your on-boarding strategy reservation for{' '}
              <strong className="text-[#1F3B36]">
                {selectedDay} at {selectedTime}
              </strong>{' '}
              has been reserved and sent to <strong className="text-[#1F3B36]">{email}</strong>.
            </p>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 mb-4 text-left">
              <div className="flex justify-between items-center pb-3 border-b border-stone-200">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">Plan Selected</span>
                <span className="font-bold text-[#1F3B36]">{activePlan.title}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-stone-200">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">Cadence</span>
                <span className="text-sm font-serif font-bold text-[#1F3B36]">{activePlan.price} {activePlan.cadence}</span>
              </div>
              <div className="flex justify-between items-center pt-2.5">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">On-Boarding Call</span>
                <span className="text-xs font-semibold text-[#2E6B56]">Included (45-min kickoff)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Checkout Section Header & Accordion Collapsible Sections */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Page & Checkout Header */}
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-[#24423C] font-semibold block mb-2">
                  Client On-Boarding &amp; Checkout
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-bold text-[#1F3B36] leading-tight">
                  Checkout
                </h1>
                <p className="text-stone-600 text-sm sm:text-base mt-2 font-sans leading-relaxed">
                  Complete your details, confirm your engagement tier inclusions, and pick your kick-off onboarding slot.
                </p>
              </div>

              {/* SECTION 1: Personal & Organization Details (No outer box, no circle on number, no subheading) */}
              <div className="border-b border-stone-200 pb-6 transition-all">
                <button
                  type="button"
                  onClick={() => toggleStep(1)}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xl sm:text-2xl font-serif font-bold ${
                      completedSteps.includes(1) 
                        ? 'text-[#2E6B56]' 
                        : activeStep === 1 
                        ? 'text-[#1F3B36]' 
                        : 'text-stone-300'
                    }`}>
                      {completedSteps.includes(1) && <Check className="w-5 h-5 inline mr-1.5 text-[#2E6B56] stroke-[3]" />}
                      01.
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F3B36] leading-tight">
                      Your Details &amp; Background
                    </h2>
                  </div>
                  <div className="text-stone-400">
                    {activeStep === 1 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {activeStep === 1 && (
                  <form onSubmit={handleStep1Continue} className="pt-2 pb-4 space-y-5 animate-fadeIn font-sans text-sm">
                    {/* Role Switcher */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                        I am a:
                      </label>
                      <div className="grid grid-cols-2 gap-3 max-w-md">
                        <button
                          type="button"
                          onClick={() => setRole('founder')}
                          className={`py-2.5 px-4 rounded-xl border text-center text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                            role === 'founder'
                              ? 'bg-[#24423C] text-white border-[#24423C] shadow-xs'
                              : 'border-stone-200 text-stone-700 hover:bg-stone-50 bg-white'
                          }`}
                        >
                          Founder / Owner
                        </button>
                        <button
                          type="button"
                          onClick={() => setRole('marketing')}
                          className={`py-2.5 px-4 rounded-xl border text-center text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                            role === 'marketing'
                              ? 'bg-[#24423C] text-white border-[#24423C] shadow-xs'
                              : 'border-stone-200 text-stone-700 hover:bg-stone-50 bg-white'
                          }`}
                        >
                          Marketing Lead / Team
                        </button>
                      </div>
                    </div>

                    {/* Name & Email */}
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
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#24423C] text-stone-800 text-sm"
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
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#24423C] text-stone-800 text-sm"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Company or Brand Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Acme Health Technologies"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#24423C] text-stone-800 text-sm"
                      />
                    </div>

                    {/* What feels heavy */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        What is currently the heaviest friction with your messaging or output? (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={bottleneck}
                        onChange={(e) => setBottleneck(e.target.value)}
                        placeholder="e.g. We write good technical docs, but nobody reads our LinkedIn essays..."
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#24423C] text-stone-800 text-sm"
                      />
                    </div>

                    {/* Specific topics to discuss on the call */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Is there anything specific you would like to discuss on the call? (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={topicsToDiscuss}
                        onChange={(e) => setTopicsToDiscuss(e.target.value)}
                        placeholder="e.g. Discussing our founder-led LinkedIn cadence, transitioning away from our current PR agency, or launching our next category message..."
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#24423C] text-stone-800 text-sm"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="bg-[#24423C] hover:bg-[#1A342E] text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm cursor-pointer flex items-center gap-2"
                      >
                        <span>Continue to Plan Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* SECTION 2: Plan Selection & Included Features (No outer box, no circle on number, no subheading, no done with you tag) */}
              <div className="border-b border-stone-200 pb-6 transition-all">
                <button
                  type="button"
                  onClick={() => toggleStep(2)}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xl sm:text-2xl font-serif font-bold ${
                      completedSteps.includes(2) 
                        ? 'text-[#2E6B56]' 
                        : activeStep === 2 
                        ? 'text-[#1F3B36]' 
                        : 'text-stone-300'
                    }`}>
                      {completedSteps.includes(2) && <Check className="w-5 h-5 inline mr-1.5 text-[#2E6B56] stroke-[3]" />}
                      02.
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F3B36] leading-tight">
                      Plan Selection &amp; Inclusions
                    </h2>
                  </div>
                  <div className="text-stone-400">
                    {activeStep === 2 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {activeStep === 2 && (
                  <div className="pt-2 pb-4 space-y-6 animate-fadeIn font-sans text-sm">
                    {/* Plan Options Selector (Removed 'Done with you' tag) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {PRICING_TIERS.map((tier) => {
                        const isSelected = tier.id === currentTierId;
                        return (
                          <div
                            key={tier.id}
                            onClick={() => setCurrentTierId(tier.id)}
                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-[#24423C] bg-[#F5F8ED] shadow-xs'
                                : 'border-stone-200 hover:border-stone-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1 min-h-[24px]">
                              <h3 className="text-lg font-serif font-bold text-[#1F3B36]">{tier.title}</h3>
                              {isSelected && (
                                <span className="w-5 h-5 rounded-full bg-[#24423C] text-white flex items-center justify-center">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </span>
                              )}
                            </div>
                            <div className="mt-2 flex items-baseline gap-1">
                              <span className="text-2xl font-serif font-bold text-[#1F3B36]">{tier.price}</span>
                              <span className="text-xs text-stone-500">{tier.cadence}</span>
                            </div>
                            <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                              {tier.idealFor}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed What's Included Box */}
                    <div className="bg-stone-50/80 border border-stone-200/90 rounded-2xl p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-[#2E6B56]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F3B36]">
                          Everything included in {activePlan.title}:
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activePlan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start text-xs sm:text-sm text-stone-700">
                            <Check className="w-4 h-4 mr-2.5 mt-0.5 text-[#2E6B56] shrink-0 stroke-[2.5]" />
                            <span className="leading-snug">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleStep2Continue}
                        className="bg-[#24423C] hover:bg-[#1A342E] text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm cursor-pointer flex items-center gap-2"
                      >
                        <span>Continue to On-Boarding Slot</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 3: On-Boarding Call Time Slot Selection (No outer box, no circle on number, no subheading) */}
              <div className="pb-6 transition-all">
                <button
                  type="button"
                  onClick={() => toggleStep(3)}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xl sm:text-2xl font-serif font-bold ${
                      completedSteps.includes(3) 
                        ? 'text-[#2E6B56]' 
                        : activeStep === 3 
                        ? 'text-[#1F3B36]' 
                        : 'text-stone-300'
                    }`}>
                      {completedSteps.includes(3) && <Check className="w-5 h-5 inline mr-1.5 text-[#2E6B56] stroke-[3]" />}
                      03.
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F3B36] leading-tight">
                      Select On-Boarding Call Time Slot
                    </h2>
                  </div>
                  <div className="text-stone-400">
                    {activeStep === 3 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {activeStep === 3 && (
                  <form onSubmit={handleFinalSubmit} className="pt-2 pb-4 space-y-6 animate-fadeIn font-sans text-sm">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-2 flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 text-[#24423C]" />
                        Select Preferred Weekday for Kickoff Call:
                      </label>
                      <div className="grid grid-cols-3 gap-2.5 mb-3 max-w-lg">
                        {['Tuesday', 'Wednesday', 'Thursday'].map((day) => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => setSelectedDay(day)}
                            className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm text-center font-medium cursor-pointer transition-all ${
                              selectedDay === day
                                ? 'border-[#24423C] bg-[#24423C]/10 text-[#24423C] font-semibold shadow-xs'
                                : 'border-stone-200 text-stone-600 hover:bg-stone-50 bg-white'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>

                      <label className="block text-xs font-semibold text-stone-700 mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-1.5 text-[#24423C]" />
                        Select Preferred Call Time:
                      </label>
                      <div className="grid grid-cols-3 gap-2.5 max-w-lg">
                        {['10:00 AM', '1:30 PM', '4:00 PM'].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm text-center font-medium cursor-pointer transition-all flex items-center justify-center ${
                              selectedTime === time
                                ? 'border-[#24423C] bg-[#24423C]/10 text-[#24423C] font-semibold shadow-xs'
                                : 'border-stone-200 text-stone-600 hover:bg-stone-50 bg-white'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5 mr-1.5 opacity-75" />
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* QUESTION: Would you like to talk about pricing structure or either of the tiers? */}
                    <div className="bg-stone-50/80 border border-stone-200 rounded-2xl p-5 space-y-2">
                      <label className="block text-xs font-semibold text-[#1F3B36] mb-1">
                        Would you like to talk about pricing structure or either of the tiers you are interested in? (Optional)
                      </label>
                      <p className="text-xs text-stone-500 mb-3 font-sans">
                        Select an option if you have a specific focus in mind, or leave unselected to keep the call focused on general diagnostic gap-checking.
                      </p>
                      <div className="space-y-2">
                        {[
                          { id: 'work-with-me-directly', label: 'Interested in Work with me directly (Starts at $4,000/mo · Two spots open)' },
                          { id: 'the-signal-room', label: 'Interested in The Signal Room ($500/mo · Six months · Eight seats)' },
                          { id: 'pricing-structure', label: 'Yes, let’s discuss the pricing structure & custom scope options' },
                          { id: 'gap-check-only', label: 'Just the 20-minute gap check and messaging diagnosis for now' },
                        ].map((opt) => (
                          <label
                            key={opt.id}
                            onClick={() => setPricingInterest(pricingInterest === opt.label ? '' : opt.label)}
                            className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                              pricingInterest === opt.label
                                ? 'border-[#24423C] bg-[#24423C]/5 text-[#1F3B36] font-medium'
                                : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="page-pricing-discussion-pref"
                              checked={pricingInterest === opt.label}
                              onChange={() => {}}
                              className="mt-0.5 accent-[#24423C]"
                            />
                            <span className="leading-snug">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
                      <PhoneCall className="w-4 h-4 text-[#24423C] shrink-0 mt-0.5" />
                      <span>
                        During this 45-minute on-boarding call with Sheri, we review your current positioning bottleneck, finalize your narrative matrix, and schedule our first bi-weekly oral extraction session.
                      </span>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-[#24423C] hover:bg-[#1A342E] text-white px-8 py-4 rounded-full font-semibold text-sm sm:text-base transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                        id="complete-onboarding-checkout"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Complete On-Boarding Reservation</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>

            {/* Right Column: Dynamic Order Summary (Removed outer box container and removed done with you tag) */}
            <div className="lg:col-span-5 lg:sticky lg:top-8">
              <div className="py-2">
                
                {/* Header (No 'Done with you' tag) */}
                <div className="pb-5 border-b border-stone-200">
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1F3B36]">
                    Order Summary
                  </h3>
                </div>

                {/* Plan Info */}
                <div className="py-5 border-b border-stone-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-sans font-bold text-base text-[#1F3B36]">
                        {activePlan.title}
                      </h4>
                      <p className="text-xs text-stone-500 max-w-[240px]">
                        {activePlan.description.slice(0, 85)}...
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-serif font-bold text-[#1F3B36]">
                        {activePlan.price}
                      </span>
                      <span className="text-[0.7rem] text-stone-500 block">
                        {activePlan.cadence}
                      </span>
                    </div>
                  </div>
                </div>

                {/* What is Included in the Call / Engagement */}
                <div className="py-5 border-b border-stone-200 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    What is Included Every Month:
                  </span>
                  
                  <div className="space-y-2.5 text-xs text-stone-600">
                    {activePlan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#2E6B56] shrink-0 mt-0.5 stroke-[3]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {activePlan.footerNote && (
                      <div className="pt-2 text-[#1F3B36] font-medium border-t border-stone-200/60 mt-2">
                        <span>{activePlan.footerNote}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Client & Slot Details if collected */}
                <div className="py-5 border-b border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span className="font-medium">Client Name:</span>
                    <span className="font-semibold text-[#1F3B36]">{name || 'Not provided yet'}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span className="font-medium">Work Email:</span>
                    <span className="font-semibold text-[#1F3B36] truncate max-w-[170px]">{email || 'Not provided yet'}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span className="font-medium">Selected Slot:</span>
                    <span className="font-semibold text-[#2E6B56]">{selectedDay}, {selectedTime}</span>
                  </div>
                </div>

                {/* Guarantee & Terms */}
                <div className="pt-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <ShieldCheck className="w-4 h-4 text-[#2E6B56] shrink-0" />
                    <span>Month-to-month executive partnership. Zero long-term lock-in.</span>
                  </div>
                  {activeStep !== 3 && !isSubmitted && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="w-full bg-[#1F3B36] hover:bg-[#152B27] text-white py-3 px-4 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-center"
                    >
                      {completedSteps.includes(1) && completedSteps.includes(2)
                        ? 'Proceed to Slot Selection'
                        : 'Review & Pick Time Slot'}
                    </button>
                  )}
                </div>

              </div>
            </div>

          </div>
        )}
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-stone-200/60 py-8 text-center text-xs text-stone-500 bg-white">
        <p>© {new Date().getFullYear()} GLS · All rights reserved.</p>
      </footer>
    </div>
  );
};
