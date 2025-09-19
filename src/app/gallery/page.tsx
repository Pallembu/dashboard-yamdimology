import { Metadata } from 'next'
import { galleryService } from '@/lib/galleryService'
import GalleryGrid from '@/components/GalleryGrid'
import AnimatedSection from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Galeri Foto - MHS Tour & Travel',
  description: 'Jelajahi koleksi foto-foto menakjubkan dari berbagai destinasi wisata, tur budaya, petualangan, dan pengalaman bersama MHS Tour & Travel.',
  keywords: 'galeri foto, destinasi wisata, tur budaya, petualangan, Indonesia, MHS Tour',
  openGraph: {
    title: 'Galeri Foto - MHS Tour & Travel',
    description: 'Jelajahi koleksi foto-foto menakjubkan dari berbagai destinasi wisata dan pengalaman tur.',
    type: 'website',
    siteName: 'MHS Tour & Travel'
  }
}

export default async function GalleryPage() {
  // Fetch galleries and categories from Sanity
  const [galleries, categories, stats] = await Promise.all([
    galleryService.getAllGalleries(),
    galleryService.getAllCategories(),
    galleryService.getGalleryStats()
  ])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <AnimatedSection className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              📸 Galeri Foto
            </h1>
            <p className="text-xl md:text-2xl text-primary-lighter mb-8 max-w-3xl mx-auto">
              Jelajahi koleksi foto-foto menakjubkan dari berbagai destinasi wisata, 
              tur budaya, petualangan, dan momen berharga bersama MHS Tour & Travel
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">
                  {stats.totalGalleries}
                </div>
                <div className="text-primary-lighter text-sm md:text-base">
                  Total Galeri
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary">
                  {stats.totalImages}
                </div>
                <div className="text-primary-lighter text-sm md:text-base">
                  Total Foto
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">
                  {stats.featuredCount}
                </div>
                <div className="text-primary-lighter text-sm md:text-base">
                  Galeri Unggulan
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary">
                  {Object.keys(stats.categoryCounts).length}
                </div>
                <div className="text-primary-lighter text-sm md:text-base">
                  Kategori
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Gallery Content */}
      <AnimatedSection className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {galleries.length > 0 ? (
            <GalleryGrid
              galleries={galleries}
              categories={categories}
              showFilters={true}
              columns={3}
              onGalleryClick={(gallery) => {
                // Navigate to gallery detail page
                window.location.href = `/gallery/${gallery.slug.current}`
              }}
            />
          ) : (
            // Empty state
            <div className="text-center py-20">
              <div className="text-8xl mb-6">📸</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Galeri Akan Segera Hadir
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Tim kami sedang mempersiapkan koleksi foto-foto menakjubkan dari berbagai 
                destinasi wisata dan pengalaman tur. Nantikan kehadiran galeri kami!
              </p>
              <div className="bg-primary-lighter border border-accent rounded-lg p-6 max-w-md mx-auto">
                <div className="text-primary font-medium mb-2">
                  💡 Sementara itu...
                </div>
                <p className="text-primary-dark text-sm">
                  Jelajahi layanan tur kami dan temukan petualangan yang menanti Anda!
                </p>
                <a
                  href="/services"
                  className="inline-block mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Lihat Layanan Tur →
                </a>
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Featured Galleries Section (if we have featured galleries) */}
      {galleries.some(g => g.isFeatured) && (
        <AnimatedSection className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ⭐ Galeri Unggulan
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Koleksi foto terpilih yang menampilkan keindahan dan pengalaman 
                terbaik dari perjalanan wisata bersama kami
              </p>
            </div>
            
            <GalleryGrid
              galleries={galleries.filter(g => g.isFeatured)}
              showFilters={false}
              columns={4}
              onGalleryClick={(gallery) => {
                window.location.href = `/gallery/${gallery.slug.current}`
              }}
            />
          </div>
        </AnimatedSection>
      )}

      {/* Call to Action */}
      <AnimatedSection className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Menciptakan Momen Indah Bersama Kami?
          </h2>
          <p className="text-xl text-primary-lighter mb-8">
            Bergabunglah dengan ribuan wisatawan yang telah mempercayai kami 
            untuk memberikan pengalaman wisata terbaik di Indonesia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors"
            >
              💬 Konsultasi Gratis
            </a>
            <a
              href="/services"
              className="bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary transition-colors border border-accent"
            >
              🎯 Lihat Paket Tour
            </a>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}