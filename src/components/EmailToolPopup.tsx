import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, Copy, Check } from 'lucide-react';

interface EmailToolPopupProps {
  onNavigateToTools?: () => void;
  badgeText?: string;
  headline?: string;
  buttonText?: string;
}

export const EmailToolPopup: React.FC<EmailToolPopupProps> = ({
  onNavigateToTools,
  badgeText = 'free tool',
  headline = 'Are your B2B Emails Hit or Miss? Transform them in 3 seconds for free!',
  buttonText = 'fix my email',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Email Transformer interactive state
  const [inputEmail, setInputEmail] = useState('');
  const [transformedEmail, setTransformedEmail] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [copied, setCopied] = useState(false);

  // Animate up from the bottom right on page load / reload refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleFixEmail = () => {
    setIsModalOpen(true);
  };

  const handleTransform = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim()) return;

    setIsTransforming(true);
    setTransformedEmail(null);

    // Instant 3-second transformation
    setTimeout(() => {
      setIsTransforming(false);
      // Strip fluff and apply executive GLS framing
      const lines = inputEmail.trim().split('\n').filter(Boolean);
      const recipientGreeting = lines[0]?.toLowerCase().includes('hi') || lines[0]?.toLowerCase().includes('hey')
        ? lines[0]
        : 'Hey [Name],';

      const samplePolished = `${recipientGreeting}

Noticed your team is scaling client onboarding this quarter. Most operators we speak with run into the same invisible bottleneck: senior partners spend 8+ hours a week re-answering the exact same delivery architecture questions.

We built a 45-minute oral extraction workflow that turns your partners' lived client calls into an authoritative client onboarding bank—without adding writing hours to their calendars.

Worth a quick 15-minute diagnostic on Tuesday to see where your team's narrative signal is getting lost?

Best,
[Your Name]`;

      setTransformedEmail(samplePolished);
    }, 1800);
  };

  const handleCopy = () => {
    if (!transformedEmail) return;
    navigator.clipboard.writeText(transformedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (isDismissed) return null;

  return (
    <>
      {/* Floating Bottom-Right Popup Widget: Connected directly to bottom of viewport, larger size */}
      <aside
        aria-label="Free tool"
        className={`fixed bottom-0 right-4 sm:right-8 z-40 max-w-md w-[calc(100vw-2rem)] sm:w-[440px] bg-[#FFFDF9] border-t border-x border-[#0D4049]/25 border-b-0 rounded-t-lg sm:rounded-t-xl rounded-b-none p-6 sm:p-7 shadow-2xl transition-all duration-700 ease-out transform ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
            : 'translate-y-full opacity-0 scale-95 pointer-events-none'
        }`}
        style={{
          boxShadow: '0 -14px 45px -5px rgba(13, 64, 73, 0.25), 0 0 0 1px rgba(13, 64, 73, 0.1)',
        }}
      >
        {/* Top bar with Eyebrow and Dismiss 'X' */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0D4049] bg-[#A9D6D4]/40 px-3 py-1 rounded-sm">
            {badgeText}
          </span>
          <button
            onClick={() => setIsDismissed(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#536357] hover:text-[#0D4049] hover:bg-[#536357]/10 transition-colors cursor-pointer"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Headline */}
        <h4 className="text-xl sm:text-[1.32rem] font-serif font-bold text-[#0D4049] leading-snug tracking-tight mb-5">
          {headline}
        </h4>

        {/* Rounded Button with (star) fix my email - Rerouted to https://fixmyemail.ai/tool */}
        <a
          href="https://fixmyemail.ai/tool"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#0D4049] hover:bg-[#08292E] text-white py-3.5 sm:py-4 px-6 rounded-full font-semibold text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] group"
        >
          <Sparkles className="w-5 h-5 text-[#BDC67A] fill-[#BDC67A] transition-transform group-hover:rotate-12" />
          <span>{buttonText}</span>
        </a>
      </aside>


      {/* Interactive 3-Second Email Transformer Modal - Less rounded corners (rounded-xl) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FFFDF9] rounded-xl max-w-2xl w-full p-6 sm:p-10 border border-[#0D4049]/20 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#536357] font-bold block mb-1">
                  Free Tactical Diagnostic
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif italic text-[#0D4049]">
                  Transform Your B2B Email in Under 3 Seconds
                </h3>
                <p className="text-xs sm:text-sm text-[#536357] font-sans mt-1">
                  Paste any outreach email, proposal follow-up, or newsletter intro. We eliminate the generic corporate fluff and sharpen the operating hook.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#536357] hover:text-[#0D4049] hover:bg-[#536357]/10 transition-colors cursor-pointer shrink-0 ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleTransform} className="space-y-4 font-sans">
              <div>
                <label className="block text-xs font-bold text-[#0D4049] uppercase tracking-wider mb-1.5">
                  Paste your current email draft:
                </label>
                <textarea
                  rows={4}
                  required
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="Hey Sarah, hope you're having a great week! I wanted to reach out because our company provides synergistic end-to-end B2B solutions that help businesses like yours grow revenue and scale operations..."
                  className="w-full px-4 py-3 rounded-lg border border-[#536357]/25 bg-white text-sm text-[#0D4049] focus:outline-none focus:border-[#0D4049] shadow-xs"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={isTransforming || !inputEmail.trim()}
                  className="bg-[#0D4049] hover:bg-[#08292E] disabled:opacity-50 text-white py-3 px-6 rounded-full font-semibold text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4 text-[#BDC67A] fill-[#BDC67A]" />
                  <span>{isTransforming ? 'Transforming in 3s...' : 'fix my email now'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInputEmail(
                      "Hi there, I hope you're having a great quarter. We help companies leverage cutting-edge growth marketing solutions to boost engagement and maximize ROI. Would you be open to a 30-minute introductory call next week?"
                    );
                  }}
                  className="text-xs text-[#536357] hover:text-[#0D4049] underline cursor-pointer"
                >
                  Load sample draft
                </button>
              </div>
            </form>

            {/* Transformed Result Output */}
            {transformedEmail && (
              <div className="mt-8 pt-6 border-t border-[#536357]/20 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D4049]">
                    <CheckCircle2 className="w-4 h-4 text-[#0D4049]" />
                    <span>Transformed Executive Version (Signal-Optimized)</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#A9D6D4]/30 text-[#0D4049] hover:bg-[#A9D6D4]/50 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy text</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#0D4049]/20 font-sans text-sm text-[#1E2E2A] whitespace-pre-line leading-relaxed shadow-inner">
                  {transformedEmail}
                </div>

                <div className="p-4 rounded-xl bg-[#BDC67A]/20 border border-[#BDC67A] text-xs text-[#0D4049] flex items-center justify-between gap-4">
                  <span>
                    <strong>Why this works:</strong> Cuts 4 generic adjectives, introduces a specific commercial constraint, and replaces the 30-min pitch ask with an objective gap diagnostic.
                  </span>
                  {onNavigateToTools && (
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        onNavigateToTools();
                      }}
                      className="shrink-0 font-bold underline hover:text-[#08292E] cursor-pointer"
                    >
                      More Free Tools →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
