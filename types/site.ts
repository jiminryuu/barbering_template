import type {Image} from 'sanity'

export type ThemeMode = 'light' | 'dark'

export type ColorStyle =
  | 'custom'
  | 'professional'
  | 'beauty'
  | 'coastal'
  | 'luxury'
  | 'modern'
  | 'clinical'
  | 'creative'
  | 'rustic'

export type FontPreset =
  | 'classic'
  | 'editorial'
  | 'bold'
  | 'modern'
  | 'refined'
  | 'friendly'
  | 'minimal'
  | 'luxury'
  | 'energetic'
  | 'salon'

export interface ThemePalette {
  background: string
  surface: string
  text: string
  muted: string
  accent: string
  border: string
}

export interface ThemeConfig {
  defaultMode: ThemeMode
  light: ThemePalette
  dark: ThemePalette
}

export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href?: string | null
}

export interface HeroContent {
  eyebrow: string
  title: string
  subtitle: string
  description: string
  image?: Image | null
}

export interface FooterContent {
  locationLabel: string
  locationText: string
  copyrightText: string
}

export interface ReviewQuote {
  author: string
  text: string
}

export interface SocialProofContent {
  eyebrow: string
  heading: string
  rating: number
  reviewCount: number
  profileUrl: string
  reviews: ReviewQuote[]
}

export interface AboutContent {
  eyebrow: string
  heading: string
  description: string
}

export interface BookingCtaContent {
  eyebrow: string
  heading: string
  description: string
  ctaLabel: string
}

export interface SiteSettings {
  _id: string
  brandName: string
  bookingUrl: string
  navItems: NavItem[]
  hero: HeroContent
  socialLinks: SocialLink[]
  socialProof: SocialProofContent
  about: AboutContent
  bookingCta: BookingCtaContent
  footer: FooterContent
  colorStyle: ColorStyle
  themeMode: ThemeMode
  fontPreset: FontPreset
  theme: ThemeConfig
}
