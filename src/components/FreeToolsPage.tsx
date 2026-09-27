import React, { useState, useEffect } from 'react';
import { Download, CheckCircle2, FileText, ArrowRight, Sparkles, X, Copy, Check } from 'lucide-react';
import { Navbar, PageView } from './Navbar';
import { SectionRenderer } from './SectionRenderer';
import { FreeToolDetailPage, FreeToolItem } from './FreeToolDetailPage';

interface FreeToolsPageProps {
  onNavigate?: (page: PageView) => void;
  onOpenBooking?: () => void;
  onOpenHeavyAuditModal?: () => void;
  data?: any;
}

export type ToolItem = FreeToolItem;

const TOOLS: ToolItem[] = [
  {
    id: 'heavy-audit',
    title: 'The "What Feels Heavy?" Diagnostic',
    category: 'Diagnostic Assessment',
    description: 'Diagnose whether your bottleneck is voice drift, internal approval drag, or market indifference in under 2 minutes.',
    deliverable: 'Personalized Diagnostic Breakdown & Strategy Prescription',
    ctaText: 'Launch assessment',
    type: 'audit',
  },
  {
    id: 'signal-extraction',
    title: 'The 45-Minute Oral Extraction Cheatsheet',
    category: 'Framework & Prompts',
    description: 'The exact conversational interview prompts we use to extract 6 weeks of category-defining essays from a single 45-minute founder conversation.',
    deliverable: 'PDF Guide + Notion Interview Template',
    ctaText: 'Download framework (Instant access)',
    type: 'download',
  },
  {
    id: 'positioning-matrix',
    title: 'B2B Founder Differentiation Scorecard',
    category: 'Spreadsheet Calculator',
    description: 'Score your current content against 5 core indicators of authority: lived proof, counter-intuitive insight, tone fidelity, clear positioning, and pipeline velocity.',
    deliverable: 'Google Sheets / Excel Self-Scorecard',
    ctaText: 'Get scorecard template',
    type: 'download',
  },
  {
    id: 'headline-reframing',
    title: 'The "Nobody Cares" Messaging Teardown Guide',
    category: 'Editorial Guide',
    description: 'A side-by-side swipe file of 12 real founder hooks reframed from dry corporate jargon into magnetic enterprise narratives.',
    deliverable: '18-Page Field Guide',
    ctaText: 'Download swipe guide',
    type: 'download',
  },
];

export const FreeToolsPage: React.FC<FreeToolsPageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenHeavyAuditModal,
  data,
}) => {
  const [selectedTool, setSelectedTool] = useState<FreeToolItem | null>(null);

  // Email Transformer state for featured tool card
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [transformedEmail, setTransformedEmail] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTransform = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim()) return;

    setIsTransforming(true);
    setTransformedEmail(null);

    setTimeout(() => {
      setIsTransforming(false);
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

  const handleBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const activeTools: ToolItem[] = data?.tools && data.tools.length > 0 ? data.tools : TOOLS;

  // Sync URL on mount / update
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const toolParam = new URLSearchParams(window.location.search).get('tool');
      if (toolParam) {
        const found = activeTools.find((t) => t.id === toolParam || t._id === toolParam);
        if (found) setSelectedTool(found);
      }
    }
  }, [activeTools]);

  const handleToolClick = (tool: ToolItem) => {
    setSelectedTool(tool);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tool', tool.id || tool._id || 'tool');
      window.history.pushState(null, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // When a tool card is clicked, lead to the new page with headline, image left, list right, and email/name centered below
  if (selectedTool) {
    return (
      <FreeToolDetailPage
        tool={selectedTool}
        onBack={() => {
          setSelectedTool(null);
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.delete('tool');
            window.history.pushState(null, '', url.pathname + (url.search ? url.search : ''));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onNavigate={onNavigate}
        onOpenBooking={handleBooking}
        onOpenHeavyAuditModal={onOpenHeavyAuditModal}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F3] text-[#1E2E2A] font-sans antialiased flex flex-col">
      {/* Universal Transparent Navbar */}
      <Navbar
        onOpenBooking={handleBooking}
        onNavigate={onNavigate}
        theme="dark-text"
      />

      {/* Hero */}
      <section className="py-12 sm:py-20 max-w-5xl mx-auto px-6 sm:px-10 text-center">
        <span className="text-xs uppercase tracking-widest text-[#536357] font-semibold mb-3 block">
          {data?.eyebrow || 'Open Resources & Diagnostic Kits'}
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif italic text-[#0D4049] tracking-tight">
          {data?.headline || 'Executive tools, free to run'}
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[#536357] font-sans max-w-xl mx-auto leading-relaxed">
          {data?.description || 'Zero email gating on our core frameworks. Use our internal diagnostics, interview cheatsheets, and position matrices.'}
        </p>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 pb-24 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card right underneath the header: Width of the two cards */}
          <div className="col-span-1 md:col-span-2 bg-[#FFFDF9] rounded-xl p-8 sm:p-11 border border-[#0D4049]/15 shadow-sm hover:shadow-md transition-shadow">
            <div className="max-w-3xl">
              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#0D4049] bg-[#A9D6D4]/40 px-2.5 py-0.5 rounded-sm inline-block mb-3.5">
                Free Tool
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif italic text-[#0D4049] tracking-tight leading-snug mb-3">
                Transform Your B2B Email in Under 3 Seconds
              </h2>
              <p className="text-base sm:text-lg text-[#536357] font-sans leading-relaxed mb-6 sm:mb-7">
                Give us your email. We&apos;ll make it convert better.
              </p>
              <div>
                <a
                  href="https://fixmyemail.ai/tool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0D4049] hover:bg-[#08292E] text-white py-3.5 px-7 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] group"
                >
                  <Sparkles className="w-4 h-4 text-[#BDC67A] fill-[#BDC67A] transition-transform group-hover:rotate-12" />
                  <span>Fix My Email</span>
                </a>
              </div>
            </div>
          </div>

          {activeTools.map((tool) => {
            const getBadgeClass = (category: string) => {
              switch (category) {
                case 'Diagnostic Matrix':
                case 'Diagnostic Assessment':
                  return 'bg-[#A9D6D4]/40 text-[#0D4049]';
                case 'Audio Extract':
                case 'Framework & Prompts':
                  return 'bg-[#BDC67A]/35 text-[#0D4049]';
                default:
                  return 'bg-[#536357]/20 text-[#536357]';
              }
            };

            const toolKey = tool.id || tool._id || tool.title;

            return (
              <div
                key={toolKey}
                onClick={() => handleToolClick(tool)}
                className="bg-[#FFFDF9] rounded-xl overflow-hidden p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border border-stone-200/60"
              >
                <div>
                  {tool.image && (
                    <div className="mb-6 -mx-8 -mt-8 sm:-mx-10 sm:-mt-10 aspect-[16/9] bg-[#0D4049]/10 relative overflow-hidden">
                      <img
                        src={tool.image}
                        alt={tool.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      {tool.photoTagText && (
                        <span className="absolute bottom-2.5 left-3 text-[0.65rem] font-bold uppercase tracking-wider bg-[#BDC67A] text-[#0D4049] px-2 py-0.5 shadow-xs">
                          {tool.photoTagText}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-sm ${getBadgeClass(tool.category)}`}>
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4049] group-hover:text-[#0D4049]/85 mb-3 leading-snug transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-[#536357] text-sm leading-relaxed font-sans mb-6">
                    {tool.description}
                  </p>

                  <div className="bg-[#FFF9F3] rounded-lg p-3.5 flex items-center gap-3 text-xs text-[#536357] font-sans mb-8">
                    <FileText className="w-4 h-4 text-[#0D4049] shrink-0" />
                    <span>
                      <strong className="text-[#0D4049]">Format:</strong> {tool.deliverable}
                    </span>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToolClick(tool);
                    }}
                    className="w-full bg-[#0D4049] hover:bg-[#08292E] text-white py-3.5 px-6 rounded-full font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] group-hover:shadow-md"
                  >
                    <span>{tool.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive 3-Second Email Transformer Modal */}
      {isEmailModalOpen && (
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
                onClick={() => setIsEmailModalOpen(false)}
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
                  className="text-xs text-[#536357] hover:text-[#0D4049] underline underline-offset-2 cursor-pointer"
                >
                  Load sample fluff email
                </button>
              </div>
            </form>

            {/* Result Area */}
            {isTransforming && (
              <div className="mt-6 p-6 rounded-lg bg-stone-100/70 border border-stone-200 text-center animate-pulse">
                <p className="text-sm font-medium text-[#0D4049]">
                  Stripping generic buzzwords &amp; extracting high-margin executive clarity...
                </p>
              </div>
            )}

            {transformedEmail && (
              <div className="mt-6 p-6 rounded-lg bg-[#F5F8ED] border border-[#BDC67A]/40 animate-fadeIn">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E6B56]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B56]">
                      GLS High-Leverage Framing Applied
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D4049] bg-white px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-50 cursor-pointer shadow-xs transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2E6B56]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs sm:text-sm text-[#1E2E2A] font-sans whitespace-pre-wrap leading-relaxed bg-white/70 p-4 rounded-md border border-stone-200/50">
                  {transformedEmail}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Sections from Page Builder */}
      {data?.sections && (
        <div className="pb-16">
          <SectionRenderer sections={data.sections} onOpenBooking={handleBooking} />
        </div>
      )}
    </div>
  );
};
