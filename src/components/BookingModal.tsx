import React, { useState, useEffect } from 'react';
import { PRICING_TIERS } from '../data/content';
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  Check
} from 'lucide-react';

interface BookingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialTierId?: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen: controlledIsOpen,
  onClose,
  initialTierId = null,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);

  // Form fields
  const [role, setRole] = useState<'founder' | 'marketing'>('founder');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [bottleneck, setBottleneck] = useState('');
  const [topicsToDiscuss, setTopicsToDiscuss] = useState('');

  // Calendar slot
  const [selectedDay, setSelectedDay] = useState('Tuesday');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');

  // Optional plan selection to discuss
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Global event listener for 'open-booking-modal'
  useEffect(() => {
    const handleOpenEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ tier?: string }>;
      if (customEvent.detail?.tier) {
        setSelectedPlanId(customEvent.detail.tier);
      } else {
        setSelectedPlanId(null);
      }
      setInternalOpen(true);
    };

    window.addEventListener('open-booking-modal', handleOpenEvent);
    return () => window.removeEventListener('open-booking-modal', handleOpenEvent);
  }, []);

  useEffect(() => {
    if (initialTierId !== undefined) {
      setSelectedPlanId(initialTierId);
    }
  }, [initialTierId]);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  if (!isOpen) return null;

  const handleClose = () => {
    setInternalOpen(false);
    if (onClose) onClose();
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setCompany('');
    setBottleneck('');
    setTopicsToDiscuss('');
    setSelectedPlanId(null);
    handleClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setIsSubmitted(true);
  };

  const handleTogglePlan = (planId: string) => {
    setSelectedPlanId((prev) => (prev === planId ? null : planId));
  };

  const chosenTier = PRICING_TIERS.find((t) => t.id === selectedPlanId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div
        className="bg-white rounded-xl max-w-2xl w-full shadow-2xl relative border border-stone-200 overflow-hidden my-auto max-h-[94vh] flex flex-col"
        id="booking-modal"
      >
        {/* Modal Header: Clean title without dot or tag */}
        <div className="px-6 sm:px-10 py-5 border-b border-stone-200 flex items-center justify-between bg-[#FFFDF9]">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F3B36]">
            Book a call
          </h2>
          <button
            onClick={handleReset}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10">
          {isSubmitted ? (
            <div className="py-8 text-center max-w-xl mx-auto animate-fadeIn font-sans">
              <div className="w-16 h-16 bg-[#E8F2EC] text-[#24423C] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-[#1F3B36] mb-3">
                Call Confirmed
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                Thank you, <strong>{name}</strong>! Your 20-minute strategy gap check for{' '}
                <strong className="text-[#1F3B36]">
                  {selectedDay} at {selectedTime}
                </strong>{' '}
                has been reserved and sent to <strong className="text-[#1F3B36]">{email}</strong>.
              </p>

              <div className="bg-[#FFF9F3] border border-stone-200 rounded-2xl p-5 mb-6 text-left space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center pb-2.5 border-b border-stone-200">
                  <span className="text-stone-500 font-medium">Session Focus</span>
                  <span className="font-bold text-[#1F3B36]">
                    {chosenTier
                      ? `${chosenTier.title} (${chosenTier.price})`
                      : selectedPlanId === 'pricing-structure'
                      ? 'Custom Pricing & Structure Discussion'
                      : '20-Minute Strategy Gap Check (General)'}
                  </span>
                </div>
                {company && (
                  <div className="flex justify-between items-center pb-2.5 border-b border-stone-200">
                    <span className="text-stone-500 font-medium">Company / Brand</span>
                    <span className="font-semibold text-stone-700">{company}</span>
                  </div>
                )}
                {topicsToDiscuss && (
                  <div className="flex justify-between items-start pb-2.5 border-b border-stone-200">
                    <span className="text-stone-500 font-medium">Topics To Discuss</span>
                    <span className="italic text-stone-700 max-w-[260px] text-right line-clamp-2">
                      "{topicsToDiscuss}"
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-1">
                  <span className="text-stone-500 font-medium">Format</span>
                  <span className="font-semibold text-[#2E6B56]">
                    20-min 1-on-1 with Sheri Otto
                  </span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="bg-[#24423C] hover:bg-[#1A342E] text-white px-8 py-3.5 rounded-full font-medium text-sm cursor-pointer transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-sans text-sm">
                  {/* Part 1: Your Details and Background */}
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#1F3B36] mb-1">
                      Your Details &amp; Background
                    </h3>
                    <p className="text-xs text-stone-500 mb-4">
                      Share a few quick details so we can jump straight into high-leverage strategy on our call.
                    </p>

                    {/* Role Switcher */}
                    <div className="mb-4">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                        I am a:
                      </label>
                      <div className="grid grid-cols-2 gap-3 max-w-sm">
                        <button
                          type="button"
                          onClick={() => setRole('founder')}
                          className={`py-2 px-3 rounded-md border text-center text-xs font-medium cursor-pointer transition-all ${
                            role === 'founder'
                              ? 'bg-[#24423C] text-white border-[#24423C] shadow-xs font-semibold'
                              : 'border-stone-200 text-stone-700 hover:bg-stone-50 bg-white'
                          }`}
                        >
                          Founder / Owner
                        </button>
                        <button
                          type="button"
                          onClick={() => setRole('marketing')}
                          className={`py-2 px-3 rounded-md border text-center text-xs font-medium cursor-pointer transition-all ${
                            role === 'marketing'
                              ? 'bg-[#24423C] text-white border-[#24423C] shadow-xs font-semibold'
                              : 'border-stone-200 text-stone-700 hover:bg-stone-50 bg-white'
                          }`}
                        >
                          Marketing Lead / Team
                        </button>
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-3.5 py-2.5 rounded-md border border-stone-200 bg-white focus:outline-none focus:border-[#24423C] text-stone-800 text-xs sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Work Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 rounded-md border border-stone-200 bg-white focus:outline-none focus:border-[#24423C] text-stone-800 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="mb-3.5">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Company or Brand Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Acme Technologies"
                        className="w-full px-3.5 py-2.5 rounded-md border border-stone-200 bg-white focus:outline-none focus:border-[#24423C] text-stone-800 text-xs sm:text-sm"
                      />
                    </div>

                    {/* Bottleneck / What is currently the heaviest friction */}
                    <div className="mb-3.5">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        What is currently the heaviest friction with your messaging or output? (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={bottleneck}
                        onChange={(e) => setBottleneck(e.target.value)}
                        placeholder="e.g. We write deep technical documentation, but our public essays fall flat..."
                        className="w-full px-3.5 py-2.5 rounded-md border border-stone-200 bg-white focus:outline-none focus:border-[#24423C] text-stone-800 text-xs sm:text-sm resize-none"
                      />
                    </div>

                    {/* Discussion topics */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Is there anything specific you would like to discuss on the call? (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={topicsToDiscuss}
                        onChange={(e) => setTopicsToDiscuss(e.target.value)}
                        placeholder="e.g. Discussing our founder-led LinkedIn cadence, transitioning away from our current agency, or launching our next narrative..."
                        className="w-full px-3.5 py-2.5 rounded-md border border-stone-200 bg-white focus:outline-none focus:border-[#24423C] text-stone-800 text-xs sm:text-sm resize-none"
                      />
                    </div>
                  </div>

                  <div className="border-t border-stone-200 pt-5">
                    <h3 className="text-lg font-serif font-bold text-[#1F3B36] mb-1">
                      Select Preferred Time Slot
                    </h3>
                    <p className="text-xs text-stone-500 mb-3.5">
                      All calls are hosted 1-on-1 via private video link with Sheri Otto.
                    </p>

                    {/* Weekday Selection */}
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-[#24423C]" />
                        Preferred Weekday:
                      </label>
                      <div className="grid grid-cols-3 gap-2 max-w-md">
                        {['Tuesday', 'Wednesday', 'Thursday'].map((day) => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => setSelectedDay(day)}
                            className={`py-2 px-2.5 rounded-md border text-xs text-center font-medium cursor-pointer transition-all ${
                              selectedDay === day
                                ? 'border-[#24423C] bg-[#24423C]/10 text-[#24423C] font-semibold shadow-xs'
                                : 'border-stone-200 text-stone-600 hover:bg-stone-50 bg-white'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#24423C]" />
                        Preferred Call Time:
                      </label>
                      <div className="grid grid-cols-3 gap-2 max-w-md">
                        {['10:00 AM', '1:30 PM', '4:00 PM'].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-2.5 rounded-md border text-xs text-center font-medium cursor-pointer transition-all flex items-center justify-center ${
                              selectedTime === time
                                ? 'border-[#24423C] bg-[#24423C]/10 text-[#24423C] font-semibold shadow-xs'
                                : 'border-stone-200 text-stone-600 hover:bg-stone-50 bg-white'
                            }`}
                          >
                            <Clock className="w-3 h-3 mr-1 opacity-75" />
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Part 3: Option to select a plan to discuss (Optional, not a requirement) */}
                  <div className="border-t border-stone-200 pt-5">
                    <div className="mb-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-serif font-bold text-[#1F3B36]">
                          Select a Plan to Discuss
                        </h3>
                        <span className="text-[0.7rem] bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-full font-medium">
                          Optional
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Would you like to talk about either tier or our pricing structure on this call? Click to select or unselect. Not required.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5">
                      {PRICING_TIERS.map((tier) => {
                        const isSelected = selectedPlanId === tier.id;
                        return (
                          <div
                            key={tier.id}
                            onClick={() => handleTogglePlan(tier.id)}
                            className={`p-3.5 rounded-lg border-2 cursor-pointer transition-all select-none ${
                              isSelected
                                ? 'border-[#24423C] bg-[#F5F8ED] shadow-xs'
                                : 'border-stone-200 hover:border-stone-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1F3B36]">
                                {tier.title}
                              </h4>
                              {isSelected ? (
                                <span className="w-4 h-4 rounded-full bg-[#24423C] text-white flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </span>
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-stone-300 bg-stone-50" />
                              )}
                            </div>
                            <div className="text-xs font-serif font-bold text-[#1F3B36]">
                              {tier.price}{' '}
                              <span className="text-[0.7rem] font-sans font-normal text-stone-500">
                                {tier.cadence}
                              </span>
                            </div>
                            <p className="text-[0.75rem] text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                              {tier.idealFor}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Custom pricing structure option */}
                    <div
                      onClick={() => handleTogglePlan('pricing-structure')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all select-none flex items-center justify-between text-xs ${
                        selectedPlanId === 'pricing-structure'
                          ? 'border-[#24423C] bg-[#F5F8ED] text-[#1F3B36] font-medium'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                      }`}
                    >
                      <span>I'd like to discuss custom advisory scope or general pricing structure</span>
                      {selectedPlanId === 'pricing-structure' ? (
                        <Check className="w-4 h-4 text-[#24423C] stroke-[3]" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-stone-300" />
                      )}
                    </div>
                  </div>

                  {/* Submission Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#24423C] hover:bg-[#1A342E] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Call Booking</span>
                    </button>
                    <p className="text-[0.75rem] text-stone-500 mt-2">
                      Zero commitment. You'll receive a calendar invite and private preparation notes immediately.
                    </p>
                  </div>
                </form>
          )}
        </div>
      </div>
    </div>
  );
};
