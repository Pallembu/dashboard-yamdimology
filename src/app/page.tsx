import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { urlForHero, urlForProduct } from '@/sanity/lib/image'
import FeaturesSection from '@/components/FeaturesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import AnimatedSection, { PageTransition } from '@/components/AnimatedSection'

// Force dynamic rendering and disable caching for development
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await sanityFetch<any>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })

    return {
      title: siteSettings?.siteTitle || 'Mahabbatussholihin Tour & Travel - Your Gateway to Unforgettable Adventures',
      description: siteSettings?.siteDescription || 'Discover amazing destinations with Mahabbatussholihin Tour & Travel. We offer personalized travel experiences, expert guides, and unforgettable adventures across Indonesia and beyond.',
    }
  } catch (error) {
    console.error('Failed to fetch metadata:', error)
    return {
      title: 'Mahabbatussholihin Tour & Travel - Your Gateway to Unforgettable Adventures',
      description: 'Discover amazing destinations with Mahabbatussholihin Tour & Travel. We offer personalized travel experiences, expert guides, and unforgettable adventures across Indonesia and beyond.',
    }
  }
}

// TypeScript interfaces for CMS data
interface HeroSection {
  _id: string
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  backgroundImage?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt?: string
  }
  isActive: boolean
  language: string
}

interface Feature {
  title: string
  description: string
  icon?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  link?: string
}

interface FeaturesSection {
  _id: string
  sectionTitle: string
  sectionSubtitle?: string
  features: Feature[]
  isActive: boolean
  language: string
}

interface SiteSettings {
  _id: string
  logo?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt?: string
  }
  logoAlt?: string
  siteName: string
  siteTitle: string
  siteDescription: string
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
    whatsapp?: string
  }
  socialMedia?: {
    instagram?: string
    facebook?: string
    youtube?: string
    twitter?: string
  }
}

export default async function Home() {
  // Fetch CMS data with error handling
  let heroData: HeroSection | null = null
  let featuresData: FeaturesSection | null = null
  let siteSettings: SiteSettings | null = null
  let testimonials: any[] = []

  try {
    heroData = await sanityFetch<HeroSection>({
      query: queries.getHeroSection('id'),
      tags: ['heroSection']
    })
  } catch (error) {
    console.error('Failed to fetch hero data:', error)
  }

  try {
    featuresData = await sanityFetch<FeaturesSection>({
      query: queries.getFeaturesSection('id'),
      tags: ['featuresSection']
    })
  } catch (error) {
    console.error('Failed to fetch features data:', error)
  }

  try {
    siteSettings = await sanityFetch<SiteSettings>({
      query: queries.getSiteSettings(),
      tags: ['siteSettings']
    })
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
  }

  try {
    testimonials = await sanityFetch<any[]>({
      query: queries.getTestimonials('id', true), // Get featured testimonials
      tags: ['testimonial']
    })
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
  }

  return (
    <PageTransition className="min-h-screen">
      {/* Hero Section - Fully Dynamic */}
      {heroData ? (
        <section className="relative bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-20 lg:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            {heroData.backgroundImage?.asset ? (
              <Image
                src={urlForHero(heroData.backgroundImage).url()}
                alt={heroData.backgroundImage.alt || 'Hero Background'}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-secondary" />
            )}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {heroData.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-primary-lighter">
                {heroData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={heroData.ctaLink}
                  className="bg-primary-light text-primary-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent transition-colors duration-200 shadow-lg"
                >
                  {heroData.ctaText}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="py-20 bg-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-800">No Hero Data Found</h2>
          <p className="text-gray-600">Please add hero content in Sanity Studio</p>
        </div>
      )}

      {/* Features Section - Reusable Component */}
      <FeaturesSection data={featuresData} variant="default" maxFeatures={3} />

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <TestimonialsSection 
          testimonials={testimonials}
          maxTestimonials={3}
          variant="default"
        />
      )}

      {/* Call to Action Section - Uses Site Settings */}
      <AnimatedSection direction="up" className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-lighter">
            Contact {siteSettings?.siteName || 'us'} today to plan your perfect adventure.
          </p>
          <Link
            href="/contact"
            className="bg-primary-light text-primary-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent transition-colors duration-200 shadow-lg inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </AnimatedSection>
    </PageTransition>
  )
}