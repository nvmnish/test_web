import React from 'react';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { PageView } from './Navbar';

interface FooterLinkItem {
  label: string;
  url: string;
  isCta?: boolean;
  isExternal?: boolean;
}

interface FooterLinkGroup {
  groupTitle: string;
  links: FooterLinkItem[];
}

interface FooterProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: PageView) => void;
  bgWhite?: boolean;
  bgColor?: string;
  data?: any;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigate, bgWhite = false, bgColor, data }) => {
  const brandName = data?.brandName || 'GLS';
  const tagline = data?.tagline || 'Marketing and messaging advisory for leaders too busy doing the work to talk about it.';
  const copyright = data?.copyright || `© ${new Date().getFullYear()} GLS Advisory LLC. All rights reserved.`;
  const linkedinUrl = data?.linkedinUrl || 'https://www.linkedin.com';
  const instagramUrl = data?.instagramUrl || 'https://www.instagram.com';
  const emailAddress = data?.emailAddress || 'sheri@glsadvisory.com';
  const effectiveBg = bgColor || data?.backgroundColor || (bgWhite ? 'bg-white' : 'bg-[#FFF9F3]');

  const routeMap: Record<PageView, string> = {
    'home': '/',
    'case-studies': '/case-studies',
    'pricing': '/#pricing',
    'about': '/about',
    'blog': '/blog',
    'free-tools': '/free-tools',
    'newsletter': '/newsletter',
    'booking': '/booking',
    'contact': '/contact'
  };

  const handleNav = (target: string) => {
    if (target === 'pricing' || target === '/#pricing' || target === '#pricing') {
      if (onNavigate) {
        onNavigate('pricing');
      } else {
        const el = document.getElementById('pricing');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = '/#pricing';
        }
      }
      return;
    }

    if (target in routeMap) {
      if (onNavigate) onNavigate(target as PageView);
      else window.location.href = routeMap[target as PageView];
      return;
    }

    window.location.href = target;
  };

  const linkGroups: FooterLinkGroup[] = Array.isArray(data?.linkGroups) && data.linkGroups.length > 0
    ? data.linkGroups
    : [];

  const defaultLinks: FooterLinkItem[] = [
    { label: 'Case Studies', url: '/case-studies' },
    { label: 'Pricing', url: '/#pricing' },
    { label: 'About me', url: '/about' },
    { label: 'Blog', url: '/blog' },
    { label: 'Free tools', url: '/free-tools' },
    { label: 'Newsletter', url: '/newsletter' },
    { label: 'Work with me', url: '/contact', isCta: true },
  ];

  const flatLinks: FooterLinkItem[] = Array.isArray(data?.navigationLinks) && data.navigationLinks.length > 0
    ? data.navigationLinks
    : defaultLinks;

  const legalLinks: { label: string; url: string }[] = Array.isArray(data?.legalLinks)
    ? data.legalLinks
    : [];

  return (
    <footer className={`border-t border-stone-200/80 ${effectiveBg.startsWith('#') ? '' : effectiveBg} py-14 sm:py-20 text-stone-600 font-sans`} style={effectiveBg.startsWith('#') ? { backgroundColor: effectiveBg } : undefined}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-stone-200/70">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col">
            <button
              onClick={() => handleNav('home')}
              className="flex items-baseline group mb-2 text-left cursor-pointer"
              id="footer-logo"
            >
              <span className="text-2xl font-extrabold tracking-tight text-[#1F3B36]">
                {brandName}
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#E5B54F] ml-0.5"></span>
            </button>
            <p className="text-xs sm:text-sm text-stone-500 max-w-sm">
              {tagline}
            </p>
          </div>

          {/* Grouped or Flat Links */}
          {linkGroups.length > 0 ? (
            <div className="flex flex-wrap gap-8 sm:gap-12">
              {linkGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1F3B36]">
                    {group.groupTitle}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm font-medium text-stone-600">
                    {group.links?.map((link, lIdx) => (
                      <li key={lIdx}>
                        {link.isExternal ? (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${link.isCta ? 'text-[#1F3B36] font-semibold hover:underline' : 'hover:text-[#1F3B36] transition-colors'}`}
                          >
                            {link.label}
                          </a>
                        ) : (
                          <button
                            onClick={() => handleNav(link.url)}
                            className={`${link.isCta ? 'text-[#1F3B36] font-semibold hover:underline' : 'hover:text-[#1F3B36] transition-colors'} cursor-pointer text-left`}
                          >
                            {link.label}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-stone-600">
              {flatLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNav(link.url)}
                  className={`${link.isCta ? 'text-[#1F3B36] font-semibold hover:underline' : 'hover:text-[#1F3B36] transition-colors'} cursor-pointer`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* Bottom copyright, Legal & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <p>{copyright}</p>
            {legalLinks.length > 0 && (
              <div className="flex items-center gap-3 border-l border-stone-300 pl-4">
                {legalLinks.map((leg, lIdx) => (
                  <a
                    key={lIdx}
                    href={leg.url}
                    className="hover:text-[#1F3B36] transition-colors"
                  >
                    {leg.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#1F3B36]/70 hover:text-[#1F3B36] transition-colors p-1"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#1F3B36]/70 hover:text-[#1F3B36] transition-colors p-1"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${emailAddress}`}
              aria-label="Direct Email"
              className="text-[#1F3B36]/70 hover:text-[#1F3B36] transition-colors p-1"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
