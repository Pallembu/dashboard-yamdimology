import { type SchemaTypeDefinition } from 'sanity'
import { heroSection } from './heroSection'
import { featuresSection } from './featuresSection'
import { testimonial } from './testimonial'
import { blogPost } from './blogPost'
import { siteSettings } from './siteSettings'
import servicePackage from './servicePackage'
import contactSubmission from './contactSubmission'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroSection, featuresSection, testimonial, blogPost, siteSettings, servicePackage, contactSubmission],
}
