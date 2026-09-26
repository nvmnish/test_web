// Pages (Aligned with Navigation)
import { homePage } from './pages/homePage';
import { aboutPage } from './pages/aboutPage';
import { caseStudiesPage } from './pages/caseStudiesPage';
import { freeToolsPage } from './pages/freeToolsPage';
import { newsletterPage } from './pages/newsletterPage';
import { contactPage } from './pages/contactPage';
import { blogPage } from './pages/blogPage';

// Standalone Content Collections
import { blogPost } from './documents/blogPost';
import { caseStudy } from './documents/caseStudy';
import { resourceItem } from './documents/resourceItem';
import { clientStory } from './documents/clientStory';
import { faqItem } from './documents/faqItem';
import { pricingTier } from './documents/pricingTier';
import { siteSettings } from './documents/siteSettings';

// Modular Reusable Section Blocks (Elementor / Page Builder blocks)
import { heroSection } from './sections/heroSection';
import { whoWeServeSection } from './sections/whoWeServeSection';
import { metricsSection } from './sections/metricsSection';
import { clientStoriesSection } from './sections/clientStoriesSection';
import { videoCarouselSection } from './sections/videoCarouselSection';
import { pricingSection } from './sections/pricingSection';
import { comparisonSection } from './sections/comparisonSection';
import { faqSection } from './sections/faqSection';
import { closingCtaSection } from './sections/closingCtaSection';
import { proofCtaSection } from './sections/proofCtaSection';
import { richTextSection } from './sections/richTextSection';
import { mediaCalloutSection } from './sections/mediaCalloutSection';
import { popupToolSection } from './sections/popupToolSection';
import { footer } from './documents/footer';

export const schemaTypes = [
  // Site & Global
  siteSettings,
  footer,

  // Pages
  homePage,
  aboutPage,
  caseStudiesPage,
  freeToolsPage,
  newsletterPage,
  contactPage,
  blogPage,

  // Collections
  blogPost,
  caseStudy,
  resourceItem,
  clientStory,
  faqItem,
  pricingTier,

  // Reusable Page Builder Blocks
  heroSection,
  whoWeServeSection,
  metricsSection,
  proofCtaSection,
  clientStoriesSection,
  videoCarouselSection,
  pricingSection,
  comparisonSection,
  faqSection,
  closingCtaSection,
  richTextSection,
  mediaCalloutSection,
  popupToolSection,
];

