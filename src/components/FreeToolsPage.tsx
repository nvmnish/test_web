import React, { useState } from 'react';
import { Download, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { Navbar, PageView } from './Navbar';

interface FreeToolsPageProps {
  onNavigate?: (page: PageView) => void;
  onOpenBooking?: () => void;
  onOpenHeavyAuditModal?: () => void;
}

interface ToolItem {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverable: string;
  ctaText: string;
  type: 'audit' | 'download';
}

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
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const handleToolClick = (tool: ToolItem) => {
    if (tool.type === 'audit') {
      if (onOpenHeavyAuditModal) {
        onOpenHeavyAuditModal();
      } else {
        window.dispatchEvent(new CustomEvent('open-heavy-modal'));
      }
    } else {
      setDownloadSuccess(tool.id);
      setTimeout(() => setDownloadSuccess(null), 4000);
    }
  };

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
          Open Resources &amp; Diagnostic Kits
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif italic text-[#0D4049] tracking-tight">
          Executive tools, free to run
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[#536357] font-sans max-w-xl mx-auto leading-relaxed">
          Zero email gating on our core frameworks. Use our internal diagnostics, interview cheatsheets, and position matrices.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 pb-24 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TOOLS.map((tool) => {
            const getBadgeClass = (category: string) => {
              switch (category) {
                case 'Diagnostic Matrix':
                  return 'bg-[#A9D6D4]/40 text-[#0D4049]';
                case 'Audio Extract':
                  return 'bg-[#BDC67A]/35 text-[#0D4049]';
                default:
                  return 'bg-[#536357]/20 text-[#536357]';
              }
            };

            return (
              <div
                key={tool.id}
                className="bg-[#FFFDF9] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-sm ${getBadgeClass(tool.category)}`}>
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4049] mb-3 leading-snug">
                    {tool.title}
                  </h3>

                  <p className="text-[#536357] text-sm leading-relaxed font-sans mb-6">
                    {tool.description}
                  </p>

                  <div className="bg-[#FFF9F3] rounded-xl p-3.5 flex items-center gap-3 text-xs text-[#536357] font-sans mb-8">
                    <FileText className="w-4 h-4 text-[#0D4049] shrink-0" />
                    <span>
                      <strong className="text-[#0D4049]">Format:</strong> {tool.deliverable}
                    </span>
                  </div>
                </div>

                <div>
                  {downloadSuccess === tool.id ? (
                    <div className="bg-[#A9D6D4]/30 text-[#0D4049] font-semibold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Download started successfully!</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleToolClick(tool)}
                      className="w-full bg-[#0D4049] hover:bg-[#08292E] text-white py-3.5 px-6 rounded-full font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <span>{tool.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
