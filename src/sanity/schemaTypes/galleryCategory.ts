export default {
  name: 'galleryCategory',
  title: 'Gallery Categories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(3).max(50)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Category Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(200)
    },
    {
      name: 'icon',
      title: 'Category Icon',
      type: 'string',
      options: {
        list: [
          { title: '🏛️ Destinations', value: '🏛️' },
          { title: '🎭 Cultural', value: '🎭' },
          { title: '🏔️ Adventure', value: '🏔️' },
          { title: '🕌 Religious', value: '🕌' },
          { title: '🌿 Nature', value: '🌿' },
          { title: '🍜 Culinary', value: '🍜' },
          { title: '🏨 Accommodation', value: '🏨' },
          { title: '🚐 Transportation', value: '🚐' },
          { title: '🎯 Activities', value: '🎯' },
          { title: '👥 Customers', value: '👥' }
        ]
      },
      initialValue: '🏛️'
    },
    {
      name: 'coverImage',
      title: 'Category Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text'
        }
      ],
      description: '📸 COVER: 800x600px (4:3 ratio) | Max Size: 10MB | Format: JPEG/PNG/WebP'
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first'
    },
    {
      name: 'isActive',
      title: 'Active Category',
      type: 'boolean',
      initialValue: true,
      description: 'Only active categories will be shown'
    }
  ],
  
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }]
    },
    {
      title: 'Category Name',
      name: 'title',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'coverImage',
      icon: 'icon'
    },
    prepare(selection: any) {
      const { title, subtitle, icon } = selection
      return {
        title: `${icon} ${title}`,
        subtitle: subtitle || 'No description'
      }
    }
  }
}