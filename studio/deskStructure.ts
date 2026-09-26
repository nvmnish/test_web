import type { StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('GLS Website Content')
    .items([
      // Navigation Pages
      S.listItem()
        .title('📄 Pages (Navigation)')
        .child(
          S.list()
            .title('Website Pages')
            .items([
              S.listItem()
                .title('🏠 Homepage')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                ),
              S.listItem()
                .title('👤 About Sheri & GLS')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                ),
              S.listItem()
                .title('📈 Proof & Case Studies')
                .child(
                  S.document()
                    .schemaType('caseStudiesPage')
                    .documentId('caseStudiesPage')
                ),
              S.listItem()
                .title('🛠️ Free Tools & Resources')
                .child(
                  S.document()
                    .schemaType('freeToolsPage')
                    .documentId('freeToolsPage')
                ),
              S.listItem()
                .title('✉️ Newsletter')
                .child(
                  S.document()
                    .schemaType('newsletterPage')
                    .documentId('newsletterPage')
                ),
              S.listItem()
                .title('📞 Contact & Booking')
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                ),
              S.listItem()
                .title('✍️ Blog / Field Notes')
                .child(
                  S.document()
                    .schemaType('blogPage')
                    .documentId('blogPage')
                ),
            ])
        ),

      S.divider(),

      // Content Collections
      S.listItem()
        .title('📚 Content Collections')
        .child(
          S.list()
            .title('All Content Collections')
            .items([
              S.documentTypeListItem('blogPost').title('Blog Posts & Essays'),
              S.documentTypeListItem('caseStudy').title('Case Studies & Proof Entries'),
              S.documentTypeListItem('resourceItem').title('Free Tools & Downloads'),
              S.documentTypeListItem('clientStory').title('Client Stories (Featured Cards)'),
              S.documentTypeListItem('faqItem').title('FAQs (Frequently Asked Questions)'),
              S.documentTypeListItem('pricingTier').title('Pricing Tiers'),
            ])
        ),

      S.divider(),

      // Global Settings
      S.listItem()
        .title('⚙️ Global Site Settings & SEO')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.listItem()
        .title('🦶 Global Footer')
        .child(
          S.document()
            .schemaType('footer')
            .documentId('footer')
        ),
    ]);

