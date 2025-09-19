import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/png, image/svg+xml, image/webp',
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Logo description for accessibility'
        }
      ],
      description: '🏢 COMPANY LOGO: 400x200px (2:1) | Max Size: 20MB | Format: PNG/SVG/WebP'
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      description: 'Alternative text for the logo (for accessibility)',
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'Company/Brand name',
      initialValue: 'Mahabbatussholihin Tour & Travel',
    }),
    defineField({
      name: 'siteTitle',
      title: 'Site Title (SEO)',
      type: 'string',
      description: 'Page title for SEO and browser tab',
      initialValue: 'Mahabbatussholihin Tour & Travel - Your Gateway to Unforgettable Adventures',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description (SEO)',
      type: 'text',
      description: 'Meta description for SEO and social sharing',
      initialValue: 'Discover amazing destinations with Mahabbatussholihin Tour & Travel. We offer personalized travel experiences, expert guides, and unforgettable adventures across Indonesia and beyond.',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Physical Address',
          type: 'text',
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp Number',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo',
    },
  },
})