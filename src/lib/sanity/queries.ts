// Site Settings & SEO
export const siteSettingsQuery = `*[_type == "siteSettings" && _id in ["siteSettings", "globalSiteSettings"]] | order(_updatedAt desc)[0]{
  siteTitle,
  siteDescription,
  contactEmail,
  bookingUrl,
  linkedinUrl,
  footerNote,
  ogImage{
    ...,
    asset->
  },
  "ogImageUrl": ogImage.asset->url
}`;

// Homepage Query
export const homePageQuery = `*[_type == "homePage" && _id in ["homePage", "page-home"]] | order(_updatedAt desc){
  _id,
  title,
  heroHeadline,
  heroSubheadline,
  heroImage{
    ...,
    asset->
  },
  "heroImageUrl": heroImage.asset->url,
  heroBackgroundImage{
    ...,
    asset->
  },
  "heroBackgroundImageUrl": heroBackgroundImage.asset->url,
  heroPrimaryCta,
  heroSecondaryCta,
  quote1ClientName,
  quote1Quote,
  quote1Timeframe,
  quote1Paragraph,
  quote1Photo{
    ...,
    asset->
  },
  "quote1PhotoUrl": quote1Photo.asset->url,
  quote1Tag,
  quote1CtaText,
  quote2ClientName,
  quote2Quote,
  quote2Timeframe,
  quote2Paragraph,
  quote2Photo{
    ...,
    asset->
  },
  "quote2PhotoUrl": quote2Photo.asset->url,
  quote2Tag,
  quote2CtaText,
  popupEnabled,
  popupBadge,
  popupHeadline,
  popupButtonText,
  sections[]{
    ...,
    stories[]{
      ...,
      photo{
        ...,
        asset->
      },
      "photoUrl": photo.asset->url
    }
  },
  seoTitle,
  seoDescription
}`;

// About Page Query
export const aboutPageQuery = `*[_type == "aboutPage" && _id in ["aboutPage", "page-about"]] | order(_updatedAt desc)[0]{
  title,
  eyebrow,
  headlineQuote,
  bioLead,
  bioParagraphs,
  bioImage{
    ...,
    asset->
  },
  "bioImageUrl": bioImage.asset->url,
  principlesTitle,
  principles,
  sections,
  seoTitle,
  seoDescription
}`;

// Proof & Case Studies Page Query
export const caseStudiesPageQuery = `*[_type == "caseStudiesPage" && _id in ["caseStudiesPage", "page-case-studies"]] | order(_updatedAt desc)[0]{
  title,
  eyebrow,
  headline,
  description,
  featuredStudies[]->{
    _id,
    "id": coalesce(slug.current, _id),
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
    clientPhoto{
      ...,
      asset->
    },
    "clientPhotoUrl": clientPhoto.asset->url,
    videoUrl,
    order
  },
  sections,
  seoTitle,
  seoDescription
}`;

// Standalone Case Studies Collection
export const allCaseStudiesQuery = `*[_type == "caseStudy"] | order(order asc, _createdAt desc){
  _id,
  "id": coalesce(slug.current, _id),
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
  clientPhoto{
    ...,
    asset->
  },
  "clientPhotoUrl": clientPhoto.asset->url,
  videoUrl,
  order
}`;

// Free Tools & Resources Page Query
export const freeToolsPageQuery = `*[_type == "freeToolsPage" && _id in ["freeToolsPage", "page-free-tools"]] | order(_updatedAt desc)[0]{
  title,
  eyebrow,
  headline,
  description,
  featuredTools[]->{
    _id,
    "id": coalesce(slug.current, _id),
    title,
    category,
    description,
    deliverable,
    photoTagText,
    ctaText,
    type,
    featureList,
    reviews,
    coverImage{
      ...,
      asset->
    },
    "imageUrl": coverImage.asset->url,
    downloadFile{
      ...,
      asset->
    },
    "downloadFileUrl": downloadFile.asset->url,
    externalUrl,
    order
  },
  sections,
  seoTitle,
  seoDescription
}`;

// Standalone Free Tools Collection
export const allResourcesQuery = `*[_type == "resourceItem"] | order(order asc, _createdAt desc){
  _id,
  "id": coalesce(slug.current, _id),
  title,
  category,
  description,
  deliverable,
  photoTagText,
  ctaText,
  type,
  featureList,
  reviews,
  coverImage{
    ...,
    asset->
  },
  "imageUrl": coverImage.asset->url,
  downloadFile{
    ...,
    asset->
  },
  "downloadFileUrl": downloadFile.asset->url,
  externalUrl,
  order
}`;

// Newsletter Page Query
export const newsletterPageQuery = `*[_type == "newsletterPage" && _id in ["newsletterPage", "page-newsletter"]] | order(_updatedAt desc)[0]{
  title,
  eyebrow,
  titleField,
  headline,
  subtitle,
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
export const contactPageQuery = `*[_type == "contactPage" && _id in ["contactPage", "page-contact"]] | order(_updatedAt desc)[0]{
  title,
  eyebrow,
  headline,
  subheadline,
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
export const blogPageQuery = `*[_type == "blogPage" && _id in ["blogPage", "page-blog"]] | order(_updatedAt desc)[0]{
  title,
  eyebrow,
  headline,
  description,
  featuredPost->{
    _id,
    "id": coalesce(slug.current, _id),
    title,
    "slug": slug.current,
    excerpt,
    category,
    readTime,
    publishedAt,
    dateString,
    featured,
    coverImage{
      ...,
      asset->
    },
    "imageUrl": coverImage.asset->url
  },
  sections,
  seoTitle,
  seoDescription
}`;

// Standalone Blog Posts Collection
export const allBlogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc, _createdAt desc){
  _id,
  "id": coalesce(slug.current, _id),
  title,
  "slug": slug.current,
  excerpt,
  content,
  category,
  readTime,
  publishedAt,
  dateString,
  featured,
  coverImage{
    ...,
    asset->
  },
  "imageUrl": coverImage.asset->url,
  author
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
  photo{
    ...,
    asset->
  },
  "photoUrl": photo.asset->url,
  order
}`;

// Global Footer Query
export const footerQuery = `*[_type == "footer" && _id in ["footer", "globalFooter"]] | order(_updatedAt desc)[0]{
  _id,
  brandName,
  tagline,
  linkGroups[]{
    groupTitle,
    links[]{
      label,
      url,
      isCta,
      isExternal
    }
  },
  navigationLinks[]{
    label,
    url,
    isCta
  },
  copyright,
  legalLinks[]{
    label,
    url
  },
  linkedinUrl,
  instagramUrl,
  emailAddress,
  backgroundColor
}`;

// Custom Landing Pages
export const customPageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  seoTitle,
  seoDescription,
  ogImage{
    ...,
    asset->
  },
  "ogImageUrl": ogImage.asset->url,
  sections[]{
    ...,
    heroImage{
      ...,
      asset->
    },
    "heroImageUrl": heroImage.asset->url,
    stories[]{
      ...,
      photo{
        ...,
        asset->
      },
      "photoUrl": photo.asset->url
    },
    videos[]{
      ...,
      videoPoster{
        ...,
        asset->
      },
      "videoPosterUrl": videoPoster.asset->url
    },
    image{
      ...,
      asset->
    },
    "imageUrl": image.asset->url,
    bioImage{
      ...,
      asset->
    },
    "bioImageUrl": bioImage.asset->url,
    selectedPosts[]->{
      _id,
      "id": coalesce(slug.current, _id),
      title,
      "slug": slug.current,
      excerpt,
      category,
      readTime,
      publishedAt,
      coverImage{ ..., asset-> },
      "imageUrl": coverImage.asset->url
    },
    selectedStudies[]->{
      _id,
      "id": coalesce(slug.current, _id),
      client,
      metric,
      outcome,
      tagline,
      clientPhoto{ ..., asset-> },
      "clientPhotoUrl": clientPhoto.asset->url
    },
    selectedResources[]->{
      _id,
      "id": coalesce(slug.current, _id),
      title,
      tag,
      deliverable,
      description,
      downloadUrl,
      downloadFile{ ..., asset-> },
      "downloadFileUrl": downloadFile.asset->url,
      coverImage{ ..., asset-> },
      "coverImageUrl": coverImage.asset->url
    }
  }
}`;

export const allCustomPagesQuery = `*[_type == "page"]{
  _id,
  title,
  "slug": slug.current
}`;

