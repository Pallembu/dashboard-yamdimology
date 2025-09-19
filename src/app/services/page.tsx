import { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch, queries } from '@/sanity/lib/client'
import { ServicesGrid, ServicePackage } from '@/components/ServiceCard'
import FeaturesSection from '@/components/FeaturesSection'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Discover our comprehensive range of travel services including tour packages, custom tours, and group travel options.',
}

export default async function ServicesPage() {
  // Fetch services from CMS
  let services: ServicePackage[] = []
  let featuresData = null

  try {
    services = await sanityFetch<ServicePackage[]>({
      query: queries.getServicePackages(),
      tags: ['servicePackage']
    })

    // Also get features for additional content
    featuresData = await sanityFetch<any>({
      query: queries.getFeaturesSection(),
      tags: ['featuresSection']
    })
  } catch (error) {
    console.error('Error fetching services:', error)
  }

  return (
    <div className="min-h-screen bg-secondary-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of travel services designed to meet every traveler's needs, 
            from budget-conscious adventurers to luxury seekers.
          </p>
        </div>
        
        {/* Popular Services Section */}
        {services.filter(s => s.isPopular).length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">Popular Services</h2>
              <p className="text-lg text-gray-600">Our most requested travel experiences</p>
            </div>
            <ServicesGrid 
              services={services.filter(s => s.isPopular)} 
              variant="featured"
              className="mb-8"
            />
          </div>
        )}

        {/* All Services Section */}
        {services.length > 0 ? (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">All Services</h2>
              <p className="text-lg text-gray-600">Complete range of travel solutions</p>
            </div>
            <ServicesGrid services={services} variant="default" />
          </div>
        ) : (
          // Fallback content if no services in CMS
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Services Coming Soon</h2>
            <p className="text-gray-600 mb-8">We're preparing our service offerings. Please check back soon!</p>
          </div>
        )}

        {/* Additional Features Section */}
        <FeaturesSection 
          data={featuresData} 
          variant="compact" 
          maxFeatures={4}
          className="mb-16" 
        />
        
        {/* Call to Action Section */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Plan Your Adventure?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our travel experts are here to help you create the perfect itinerary. 
            Contact us today to start planning your dream vacation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg 
                       hover:bg-primary-dark transition-colors duration-200 shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold text-lg 
                       hover:bg-primary hover:text-white transition-colors duration-200 shadow-lg"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}