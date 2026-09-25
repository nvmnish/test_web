import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface HeavyAuditModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const HeavyAuditModal: React.FC<HeavyAuditModalProps> = ({ isOpen: controlledIsOpen, onClose }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dealingWith, setDealingWith] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    const handleOpen = () => setInternalOpen(true);
    window.addEventListener('open-heavy-modal', handleOpen);
    return () => window.removeEventListener('open-heavy-modal', handleOpen);
  }, []);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setDealingWith('');
    setDesiredOutcome('');
    setEmail('');
    setName('');
    setInternalOpen(false);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div
        className="bg-white rounded-[2rem] max-w-lg w-full p-7 sm:p-9 shadow-2xl relative border border-stone-200 my-8 max-h-[92vh] overflow-y-auto"
        id="heavy-modal"
      >
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-14 h-14 bg-[#E8F2EC] text-[#24423C] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1F3B36] mb-2">
              Diagnosis Request Received
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed max-w-sm mx-auto font-sans mb-6">
              Thank you{name ? `, ${name}` : ''}. Sheri reads every submission personally and will reply to{' '}
              <strong>{email}</strong> within 24 hours with a thoughtful diagnosis and initial strategic angles.
            </p>
            <button
              onClick={handleReset}
              className="bg-[#24423C] hover:bg-[#1A342E] text-white px-7 py-3 rounded-full font-medium text-sm font-sans cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3B36] mb-2">
              Tell me what feels heavy.
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm font-sans mb-5 leading-relaxed">
              No sales pitch. Share the real friction in your marketing or executive messaging. Sheri will respond directly with an honest, tactical perspective.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  What are you dealing with? *
                </label>
                <textarea
                  required
                  rows={3}
                  value={dealingWith}
                  onChange={(e) => setDealingWith(e.target.value)}
                  placeholder="e.g. 'We build great software, but our message doesn't translate. Our founder spends 10 hours writing posts that fall flat, or our in-house team is spinning their wheels on inconsistent drafts.'"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#24423C] text-stone-800 text-xs sm:text-sm resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 leading-snug">
                  If we mapped out a plan together, what specific outcome would make you feel this call was a success? *
                </label>
                <textarea
                  required
                  rows={3}
                  value={desiredOutcome}
                  onChange={(e) => setDesiredOutcome(e.target.value)}
                  placeholder="e.g. 'Having 3 crystal-clear positioning angles our sales and marketing teams agree on, or knowing exactly how to delegate content without diluting our executive voice.'"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#24423C] text-stone-800 text-xs sm:text-sm resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#24423C] text-stone-800 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Where should Sheri send her thoughts? *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#24423C] text-stone-800 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#24423C] hover:bg-[#1A342E] text-white py-3.5 px-6 rounded-full font-medium text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to Sheri for Diagnosis</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
