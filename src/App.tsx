/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhoWeServe } from './components/WhoWeServe';
import { ClientStories } from './components/ClientStories';
import { VideoCarousel } from './components/VideoCarousel';
import { Pricing } from './components/Pricing';
import { ComparisonTable } from './components/ComparisonTable';
import { FAQSection } from './components/FAQSection';
import { ClosingCta } from './components/ClosingCta';
import { Footer } from './components/Footer';
import { HeavyAuditModal } from './components/HeavyAuditModal';
import { BookingModal } from './components/BookingModal';

// Dedicated Pages
import { BlogPage } from './components/BlogPage';
import { CaseStudiesPage } from './components/CaseStudiesPage';
import { AboutPage } from './components/AboutPage';
import { FreeToolsPage } from './components/FreeToolsPage';
import { NewsletterPage } from './components/NewsletterPage';
import { BookingPage } from './components/BookingPage';
import { ContactPage } from './components/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedPricingTier, setSelectedPricingTier] = useState<string | null>(null);
  const [heavyModalOpen, setHeavyModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleNavigate = (page: PageView) => {
    if (page === 'pricing') {
      if (currentPage === 'home') {
        const el = document.getElementById('pricing');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('pricing');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#pricing') {
      setTimeout(() => {
        const el = document.getElementById('pricing');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [currentPage]);

  // When a pricing option is selected, navigate directly to the dedicated Checkout page
  const handleSelectPricingTier = (tierId: string) => {
    setSelectedPricingTier(tierId);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (tierId?: string) => {
    if (tierId) {
      setSelectedPricingTier(tierId);
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F3] text-[#1E2E2A] font-sans antialiased selection:bg-[#B8C87A]/40 selection:text-[#162A26]">
      {/* Dynamic View Routing with Transparent Navbar across all pages */}
      {currentPage === 'blog' && (
        <BlogPage
          onNavigate={handleNavigate}
          onOpenBooking={() => handleOpenBooking()}
        />
      )}

      {currentPage === 'case-studies' && (
        <CaseStudiesPage
          onNavigate={handleNavigate}
          onOpenBooking={() => handleOpenBooking()}
        />
      )}

      {currentPage === 'about' && (
        <AboutPage
          onNavigate={handleNavigate}
          onOpenBooking={() => handleOpenBooking()}
        />
      )}

      {currentPage === 'free-tools' && (
        <FreeToolsPage
          onNavigate={handleNavigate}
          onOpenBooking={() => handleOpenBooking()}
          onOpenHeavyAuditModal={() => setHeavyModalOpen(true)}
        />
      )}

      {currentPage === 'newsletter' && (
        <>
          <NewsletterPage
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
          <Footer
            onOpenBooking={() => handleOpenBooking()}
            onNavigate={handleNavigate}
            bgColor="bg-[#FFF9F3]/60"
          />
        </>
      )}

      {currentPage === 'booking' && (
        <BookingPage
          onNavigate={handleNavigate}
          selectedTierId={selectedPricingTier}
          onSelectTier={(tierId) => setSelectedPricingTier(tierId)}
        />
      )}

      {currentPage === 'contact' && (
        <>
          <ContactPage
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
            onSelectTier={handleSelectPricingTier}
          />
          <Footer
            onOpenBooking={() => handleOpenBooking()}
            onNavigate={handleNavigate}
            bgColor="bg-[#FFF9F3]/60"
          />
        </>
      )}

      {currentPage === 'home' && (
        <>
          {/* Hero Section with overlapping transparent Navbar */}
          <Hero
            onOpenBooking={() => handleOpenBooking()}
            onOpenHeavyModal={() => setHeavyModalOpen(true)}
            onNavigate={handleNavigate}
          />

          {/* Main Content Sections */}
          <main>
            {/* Who We Serve: Marketing Teams & Founders and Owners - Redirects 'See how it works' to case studies */}
            <WhoWeServe onRedirectToCaseStudies={() => handleNavigate('case-studies')} />

            {/* Client Stories: Alternating proof quotes and mint cards */}
            <ClientStories onOpenBooking={() => handleOpenBooking()} />

            {/* Don't take our word for it: Short form video placeholder carousel on autoplay but muted */}
            <VideoCarousel />

            {/* Pricing: Two tiers, clean, ample white space - selecting redirects to dedicated booking page */}
            <Pricing onSelectTier={handleSelectPricingTier} />

            {/* Who we aren't: Data visualization / comparison us vs them table */}
            <ComparisonTable />

            {/* FAQ: Populated expandable accordion questions */}
            <FAQSection onOpenBooking={() => handleOpenBooking()} />

            {/* Closing section */}
            <ClosingCta
              onOpenBooking={() => handleOpenBooking()}
              onOpenHeavyModal={() => setHeavyModalOpen(true)}
            />
          </main>

          {/* Footer */}
          <Footer
            onOpenBooking={() => handleOpenBooking()}
            onNavigate={handleNavigate}
          />
        </>
      )}

      {/* Global Modal for 'What feels heavy' diagnostic */}
      <HeavyAuditModal
        isOpen={heavyModalOpen}
        onClose={() => setHeavyModalOpen(false)}
      />

      {/* Global Modal for 'Booking a call' */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialTierId={selectedPricingTier}
      />
    </div>
  );
}
