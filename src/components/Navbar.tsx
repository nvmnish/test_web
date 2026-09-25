import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type PageView = 'home' | 'blog' | 'case-studies' | 'about' | 'free-tools' | 'newsletter' | 'booking' | 'contact' | 'pricing';

interface NavbarProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: PageView) => void;
  theme?: 'light-text' | 'dark-text';
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavigate, theme = 'light-text' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavClick = (page: PageView) => {
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
      setMobileMenuOpen(false);
      return;
    }
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.href = routeMap[page];
    }
    setMobileMenuOpen(false);
  };

  const handleBookingClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.dispatchEvent(new CustomEvent('open-booking-modal'));
    }
    setMobileMenuOpen(false);
  };

  const isLight = theme === 'light-text';

  return (
    <header className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-8 pb-4 bg-transparent border-none">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-baseline group text-left cursor-pointer"
          id="brand-logo"
        >
          <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-opacity group-hover:opacity-90 ${isLight ? 'text-white' : 'text-[#1F3B36]'}`}>
            GLS
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#E5B54F] ml-0.5"></span>
        </button>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium ${isLight ? 'text-white/90' : 'text-[#281B0C]/85'}`}>
          <button
            onClick={() => handleNavClick('case-studies')}
            className={`transition-colors duration-200 cursor-pointer ${isLight ? 'hover:text-white' : 'hover:text-[#1F3B36]'}`}
            id="nav-proof"
          >
            Proof
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className={`transition-colors duration-200 cursor-pointer ${isLight ? 'hover:text-white' : 'hover:text-[#1F3B36]'}`}
            id="nav-pricing"
          >
            Pricing
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors duration-200 cursor-pointer ${isLight ? 'hover:text-white' : 'hover:text-[#1F3B36]'}`}
            id="nav-about"
          >
            About me
          </button>
          <button
            onClick={() => handleNavClick('blog')}
            className={`transition-colors duration-200 cursor-pointer ${isLight ? 'hover:text-white' : 'hover:text-[#1F3B36]'}`}
            id="nav-blog"
          >
            Blog
          </button>
          <button
            onClick={() => handleNavClick('free-tools')}
            className={`transition-colors duration-200 cursor-pointer ${isLight ? 'hover:text-white' : 'hover:text-[#1F3B36]'}`}
            id="nav-free-tools"
          >
            Free tools
          </button>
          <button
            onClick={() => handleNavClick('newsletter')}
            className={`transition-colors duration-200 cursor-pointer ${isLight ? 'hover:text-white' : 'hover:text-[#1F3B36]'}`}
            id="nav-newsletter"
          >
            Newsletter
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`font-semibold cursor-pointer transition-colors duration-200 border-l pl-6 lg:pl-8 ${
              isLight 
                ? 'text-white hover:text-white/80 border-white/20' 
                : 'text-[#1F3B36] hover:text-[#1F3B36]/70 border-[#281B0C]/20'
            }`}
            id="nav-work-with-me"
          >
            Work with me
          </button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 focus:outline-none ${isLight ? 'text-white' : 'text-[#1F3B36]'}`}
            aria-label="Toggle navigation menu"
            id="mobile-menu-button"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden mt-4 p-5 rounded-2xl bg-[#1D3631]/95 backdrop-blur-md border border-white/10 text-white flex flex-col space-y-4 shadow-xl font-sans"
          id="mobile-nav-menu"
        >
          <button
            onClick={() => handleNavClick('case-studies')}
            className="text-left text-white/90 hover:text-white font-medium py-1"
          >
            Proof (Case Studies)
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className="text-left text-white/90 hover:text-white font-medium py-1"
            id="mobile-nav-pricing"
          >
            Pricing
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="text-left text-white/90 hover:text-white font-medium py-1"
          >
            About me
          </button>
          <button
            onClick={() => handleNavClick('blog')}
            className="text-left text-white/90 hover:text-white font-medium py-1"
          >
            Blog
          </button>
          <button
            onClick={() => handleNavClick('free-tools')}
            className="text-left text-white/90 hover:text-white font-medium py-1"
          >
            Free tools
          </button>
          <button
            onClick={() => handleNavClick('newsletter')}
            className="text-left text-white/90 hover:text-white font-medium py-1"
          >
            Newsletter
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-center bg-white text-[#1D3631] font-semibold py-2.5 rounded-[1px] mt-2 shadow-sm cursor-pointer"
            id="mobile-nav-work-with-me"
          >
            Work with me
          </button>
        </div>
      )}
    </header>
  );
};
