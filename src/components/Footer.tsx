import React from 'react';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { PageView } from './Navbar';

interface FooterProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: PageView) => void;
  bgWhite?: boolean;
  bgColor?: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigate, bgWhite = false, bgColor }) => {
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

  const handleNav = (page: PageView) => {
    if (page === 'pricing') {
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
    if (onNavigate) onNavigate(page);
    else window.location.href = routeMap[page];
  };

  const handleBooking = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.dispatchEvent(new CustomEvent('open-booking-modal'));
    }
  };
  return (
    <footer className={`border-t border-stone-200/80 ${bgColor || (bgWhite ? 'bg-white' : 'bg-[#FFF9F3]')} py-14 sm:py-20 text-stone-600 font-sans`}>
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
                GLS
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#E5B54F] ml-0.5"></span>
            </button>
            <p className="text-xs sm:text-sm text-stone-500 max-w-sm">
              Marketing and messaging advisory for leaders too busy doing the work to talk about it.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-stone-600">
            <button
              onClick={() => handleNav('case-studies')}
              className="hover:text-[#1F3B36] transition-colors cursor-pointer"
            >
              Case Studies
            </button>
            <button
              onClick={() => handleNav('pricing')}
              className="hover:text-[#1F3B36] transition-colors cursor-pointer"
              id="footer-pricing"
            >
              Pricing
            </button>
            <button
              onClick={() => handleNav('about')}
              className="hover:text-[#1F3B36] transition-colors cursor-pointer"
            >
              About me
            </button>
            <button
              onClick={() => handleNav('blog')}
              className="hover:text-[#1F3B36] transition-colors cursor-pointer"
            >
              Blog
            </button>
            <button
              onClick={() => handleNav('free-tools')}
              className="hover:text-[#1F3B36] transition-colors cursor-pointer"
            >
              Free tools
            </button>
            <button
              onClick={() => handleNav('newsletter')}
              className="hover:text-[#1F3B36] transition-colors cursor-pointer"
            >
              Newsletter
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="text-[#1F3B36] font-semibold hover:underline cursor-pointer"
              id="footer-work-with-me"
            >
              Work with me
            </button>
          </nav>
        </div>

        {/* Bottom copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} GLS Advisory LLC. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#1F3B36]/70 hover:text-[#1F3B36] transition-colors p-1"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#1F3B36]/70 hover:text-[#1F3B36] transition-colors p-1"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="mailto:sheri@glsadvisory.com"
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
