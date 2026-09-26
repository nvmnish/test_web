// Site Settings & SEO
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteTitle,
  siteDescription,
  contactEmail,
  bookingUrl,
  linkedinUrl,
  footerNote,
  ogImage
}`;

// Homepage Query
export const homePageQuery = `*[_type == "homePage"][0]{
  title,
  heroHeadline,
  heroSubheadline,
  heroImage,
  heroBackgroundImage,
  heroPrimaryCta,
  heroSecondaryCta,
  sections,
  seoTitle,
  seoDescription
}`;

// About Page Query
export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  title,
  eyebrow,
  headlineQuote,
  bioLead,
  bioParagraphs,
  bioImage,
  principlesTitle,
  principles,
  sections,
  seoTitle,
  seoDescription
}`;

// Proof & Case Studies Page Query
export const caseStudiesPageQuery = `*[_type == "caseStudiesPage"][0]{
  title,
  eyebrow,
  headline,
  description,
  featuredStudies[]->{
    _id,
    client,
    role,
    industry,
    timeframe,
    headline,
    statNumber,
    statLabel,
    quote,
    challenge,
    approach,
    outcome,
    storyParagraphs,
    quotes,
    clientPhoto
  },
  sections,
  seoTitle,
  seoDescription
}`;

// Standalone Case Studies Collection
export const allCaseStudiesQuery = `*[_type == "caseStudy"] | order(order asc, _createdAt desc){
  _id,
  client,
  role,
  industry,
  timeframe,
  headline,
  statNumber,
  statLabel,
  quote,
  challenge,
  approach,
  outcome,
  storyParagraphs,
  quotes,
  clientPhoto,
  order
}`;

// Free Tools & Resources Page Query
export const freeToolsPageQuery = `*[_type == "freeToolsPage"][0]{
  title,
  eyebrow,
  headline,
  description,
  featuredTools[]->{
    _id,
    title,
    category,
    description,
    deliverable,
    ctaText,
    type,
    externalUrl,
    "downloadFileUrl": downloadFile.asset->url
  },
  sections,
  seoTitle,
  seoDescription
}`;

// Standalone Free Tools Collection
export const allResourcesQuery = `*[_type == "resourceItem"] | order(order asc, _createdAt desc){
  _id,
  title,
  category,
  description,
  deliverable,
  ctaText,
  type,
  externalUrl,
  "downloadFileUrl": downloadFile.asset->url,
  order
}`;

// Newsletter Page Query
export const newsletterPageQuery = `*[_type == "newsletterPage"][0]{
  title,
  eyebrow,
  headline,
  description,
  buttonText,
  disclaimer,
  benefits,
  recentEditions,
  sections,
  seoTitle,
  seoDescription
}`;

// Contact Page Query
export const contactPageQuery = `*[_type == "contactPage"][0]{
  title,
  eyebrow,
  headline,
  description,
  email,
  location,
  bookingCtaText,
  bookingDescription,
  sections,
  seoTitle,
  seoDescription
}`;

// Blog Page Query
export const blogPageQuery = `*[_type == "blogPage"][0]{
  title,
  eyebrow,
  headline,
  description,
  featuredPost->{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    readTime,
    publishedAt,
    dateString,
    featured,
    coverImage
  },
  sections,
  seoTitle,
  seoDescription
}`;

// Standalone Blog Posts Collection
export const allBlogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc, _createdAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  readTime,
  publishedAt,
  dateString,
  featured,
  coverImage
}`;

// Standalone Collections for Homepage fallback / inclusion
export const allFaqsQuery = `*[_type == "faqItem"] | order(order asc, _createdAt asc){
  _id,
  question,
  answer,
  category,
  order
}`;

export const allPricingTiersQuery = `*[_type == "pricingTier"] | order(order asc, _createdAt asc){
  _id,
  id,
  title,
  subtitle,
  price,
  cadence,
  description,
  featureHeader,
  features,
  footerNote,
  idealFor,
  ctaText,
  order
}`;

export const allClientStoriesQuery = `*[_type == "clientStory"] | order(order asc, _createdAt asc){
  _id,
  clientName,
  timeframe,
  quote,
  storyLead,
  storyBody,
  ctaText,
  ctaUrl,
  order
}`;
