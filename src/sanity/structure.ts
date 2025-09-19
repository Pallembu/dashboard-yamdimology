import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      // Website Content
      S.listItem()
        .title('🏠 Website Content')
        .child(
          S.list()
            .title('Website Content')
            .items([
              S.listItem()
                .title('🦸 Hero Section')
                .child(S.documentTypeList('heroSection').title('Hero Section')),
              S.listItem()
                .title('✨ Features')
                .child(S.documentTypeList('featuresSection').title('Features')),
              S.listItem()
                .title('💬 Testimonials')
                .child(S.documentTypeList('testimonial').title('Testimonials')),
              S.listItem()
                .title('⚙️ Site Settings')
                .child(S.documentTypeList('siteSettings').title('Site Settings')),
            ])
        ),
      
      // Services & Tours
      S.listItem()
        .title('🎯 Services & Tours')
        .child(
          S.list()
            .title('Services & Tours')
            .items([
              S.listItem()
                .title('📦 Service Packages')
                .child(S.documentTypeList('servicePackage').title('Service Packages')),
            ])
        ),
      
      // Gallery & Portfolio
      S.listItem()
        .title('📸 Gallery & Portfolio')
        .child(
          S.list()
            .title('Gallery & Portfolio')
            .items([
              S.listItem()
                .title('🖼️ Galleries')
                .child(S.documentTypeList('gallery').title('All Galleries')),
              S.listItem()
                .title('📂 Gallery Categories')
                .child(S.documentTypeList('galleryCategory').title('Gallery Categories')),
              S.divider(),
              S.listItem()
                .title('⭐ Featured Galleries')
                .child(
                  S.documentTypeList('gallery')
                    .title('Featured Galleries')
                    .filter('_type == "gallery" && isFeatured == true')
                ),
              S.listItem()
                .title('🏛️ Destinations')
                .child(
                  S.documentTypeList('gallery')
                    .title('Destination Galleries')
                    .filter('_type == "gallery" && category == "destinations"')
                ),
              S.listItem()
                .title('🎭 Cultural Tours')
                .child(
                  S.documentTypeList('gallery')
                    .title('Cultural Tour Galleries')
                    .filter('_type == "gallery" && category == "cultural"')
                ),
            ])
        ),
      
      // Blog & Content
      S.listItem()
        .title('📝 Blog & Content')
        .child(
          S.list()
            .title('Blog & Content')
            .items([
              S.listItem()
                .title('📄 Blog Posts')
                .child(S.documentTypeList('blogPost').title('Blog Posts')),
            ])
        ),
      
      // Customer Data
      S.listItem()
        .title('👥 Customer Data')
        .child(
          S.list()
            .title('Customer Data')
            .items([
              S.listItem()
                .title('📧 Contact Submissions')
                .child(S.documentTypeList('contactSubmission').title('Contact Submissions')),
            ])
        ),
      
      S.divider(),
      
      // All Documents (fallback)
      ...S.documentTypeListItems().filter(
        (listItem) => !['heroSection', 'featuresSection', 'testimonial', 'siteSettings', 'servicePackage', 'gallery', 'galleryCategory', 'blogPost', 'contactSubmission'].includes(listItem.getId() || '')
      ),
    ])
