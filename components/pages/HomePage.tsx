import Navbar from '@/components/Navbar'
import AboutSection from '@/components/sections/AboutSection'
import BookingCTASection from '@/components/sections/BookingCTASection'
import FooterSection from '@/components/sections/FooterSection'
import GallerySection from '@/components/sections/GallerySection'
import HeroSection from '@/components/sections/HeroSection'
import LookbookSection from '@/components/sections/LookbookSection'
import QuizSection from '@/components/sections/QuizSection'
import ServicesSection from '@/components/sections/ServicesSection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import SiteThemeProvider from '@/components/theme/SiteThemeProvider'
import type {Barber, GalleryItem, LookbookItem, Review, Service, Quiz} from '@/types/home'
import type {SiteSettings} from '@/types/site'

interface HomePageProps {
  siteSettings: SiteSettings
  services: Service[]
  gallery: GalleryItem[]
  lookbook: LookbookItem[]
  reviews: Review[]
  barber: Barber | null
  quiz: Quiz | null
}

export default function HomePage({
  siteSettings,
  services,
  gallery,
  lookbook,
  reviews,
  barber,
  quiz,
}: Readonly<HomePageProps>) {
  return (
    <SiteThemeProvider settings={siteSettings}>
      <main className="bg-[var(--color-bg)] text-[var(--color-text)]">
        <Navbar
          brand={siteSettings.brandName}
          navItems={siteSettings.navItems}
          bookingUrl={siteSettings.bookingUrl}
          bookingCta={siteSettings.bookingCta}
        />

        <HeroSection
          hero={siteSettings.hero}
          barber={barber}
          socialLinks={siteSettings.socialLinks}
          bookingUrl={siteSettings.bookingUrl}
        />

        <SocialProofSection
          socialProof={siteSettings.socialProof}
          reviews={reviews}
        />

        <ServicesSection services={services} />
        <GallerySection gallery={gallery} />
        <LookbookSection items={lookbook} />
        <QuizSection styles={lookbook} quiz={quiz} />

        <AboutSection
          about={siteSettings.about}
          barber={barber}
        />

        <BookingCTASection
          bookingUrl={siteSettings.bookingUrl}
          bookingCta={siteSettings.bookingCta}
        />

        <FooterSection
          brand={siteSettings.brandName}
          socialLinks={siteSettings.socialLinks}
          footer={siteSettings.footer}
        />
      </main>
    </SiteThemeProvider>
  )
}
