import {isFontPreset} from '@/lib/theme/fontPresets'
import {normalizeTheme} from '@/lib/theme/normalizeTheme'
import {
  createDefaultSiteSettings,
  DEFAULT_ABOUT_CONTENT,
  DEFAULT_BOOKING_CTA_CONTENT,
  DEFAULT_FOOTER_CONTENT,
  DEFAULT_HERO_CONTENT,
  DEFAULT_NAV_ITEMS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_SOCIAL_PROOF_CONTENT,
  getThemeFromColorStyle,
} from '@/lib/theme/tokenDefaults'
import {dataset, projectId, readToken} from '@/sanity/env'
import {client} from '@/sanity/lib/client'
import {SITE_SETTINGS_QUERY} from '@/sanity/queries/siteSettings'
import type {
  AboutContent,
  BookingCtaContent,
  ColorStyle,
  NavItem,
  SiteSettings,
  SocialLink,
  SocialProofContent,
  ThemeMode,
} from '@/types/site'

interface SiteSettingsQueryResult {
  _id?: string
  brandName?: string
  bookingUrl?: string
  colorStyle?: unknown
  themeMode?: unknown
  fontPreset?: unknown
  hero?: Partial<SiteSettings['hero']> | null
  footer?: Partial<SiteSettings['footer']> | null
  theme?: Partial<SiteSettings['theme']> | null
  navItems?: Array<Partial<NavItem>> | null
  socialLinks?: Array<{label?: string; href?: string | null}> | null
  socialProof?: Partial<SocialProofContent> | null
  about?: Partial<AboutContent> | null
  bookingCta?: Partial<BookingCtaContent> | null
}

export interface SiteSettingsResult {
  settings: SiteSettings
  isFallback: boolean
}

function sanitizeText(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback
}

function sanitizeDocumentId(value: unknown, fallback: string) {
  if (typeof value !== 'string' || value.trim().length === 0) return fallback
  return value.trim().replace(/^drafts\./, '')
}

function sanitizeNumber(value: unknown, fallback: number, min = 0) {
  const numeric = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numeric) && numeric >= min ? numeric : fallback
}

function sanitizeNavItems(items: SiteSettingsQueryResult['navItems']) {
  if (!Array.isArray(items)) return DEFAULT_NAV_ITEMS

  const sanitized = items
    .map((item) => {
      const label = sanitizeText(item?.label, '')
      const href = sanitizeText(item?.href, '')
      return label && href ? {label, href} : null
    })
    .filter((item): item is NavItem => item !== null)

  return sanitized.length > 0 ? sanitized : DEFAULT_NAV_ITEMS
}

function sanitizeSocialLinks(items: SiteSettingsQueryResult['socialLinks']) {
  if (!Array.isArray(items)) return DEFAULT_SOCIAL_LINKS

  const sanitized = items
    .map((item) => {
      const label = sanitizeText(item?.label, '')
      if (!label) return null
      const href = sanitizeText(item?.href, '')
      const link: SocialLink = href ? {label, href} : {label, href: null}
      return link
    })
    .filter((item): item is SocialLink => item !== null)

  return sanitized.length > 0 ? sanitized : DEFAULT_SOCIAL_LINKS
}

function sanitizeColorStyle(value: unknown): ColorStyle {
  const validStyles: ColorStyle[] = [
    'professional',
    'beauty',
    'coastal',
    'luxury',
    'modern',
    'clinical',
    'creative',
    'rustic',
  ]
  return typeof value === 'string' && validStyles.includes(value as ColorStyle)
    ? (value as ColorStyle)
    : 'custom'
}

function sanitizeThemeMode(value: unknown): ThemeMode {
  return value === 'light' ? 'light' : 'dark'
}

function sanitizeSocialProof(input: SiteSettingsQueryResult['socialProof']): SocialProofContent {
  const fallback = DEFAULT_SOCIAL_PROOF_CONTENT

  return {
    eyebrow: sanitizeText(input?.eyebrow, fallback.eyebrow),
    heading: sanitizeText(input?.heading, fallback.heading),
    rating: Math.min(5, sanitizeNumber(input?.rating, fallback.rating, 0)),
    reviewCount: sanitizeNumber(input?.reviewCount, fallback.reviewCount, 0),
    profileUrl: sanitizeText(input?.profileUrl, fallback.profileUrl),
    reviews: fallback.reviews,
  }
}

function sanitizeAboutContent(input: SiteSettingsQueryResult['about']): AboutContent {
  return {
    eyebrow: sanitizeText(input?.eyebrow, DEFAULT_ABOUT_CONTENT.eyebrow),
    heading: sanitizeText(input?.heading, DEFAULT_ABOUT_CONTENT.heading),
    description: sanitizeText(input?.description, DEFAULT_ABOUT_CONTENT.description),
  }
}

function sanitizeBookingCtaContent(input: SiteSettingsQueryResult['bookingCta']): BookingCtaContent {
  return {
    eyebrow: sanitizeText(input?.eyebrow, DEFAULT_BOOKING_CTA_CONTENT.eyebrow),
    heading: sanitizeText(input?.heading, DEFAULT_BOOKING_CTA_CONTENT.heading),
    description: sanitizeText(input?.description, DEFAULT_BOOKING_CTA_CONTENT.description),
    ctaLabel: sanitizeText(input?.ctaLabel, DEFAULT_BOOKING_CTA_CONTENT.ctaLabel),
  }
}

export async function getSiteSettings(): Promise<SiteSettingsResult> {
  const fallbackSiteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Barber.Co'
  const fallback = createDefaultSiteSettings(fallbackSiteName)
  const previewClient =
    process.env.NODE_ENV !== 'production' && readToken
      ? client.withConfig({token: readToken, perspective: 'previewDrafts'})
      : client

  try {
    const data = await previewClient.fetch<SiteSettingsQueryResult | null>(SITE_SETTINGS_QUERY)
    if (!data) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `No siteSettings document found in ${projectId}/${dataset}. ` +
            'If this doc exists in Studio, publish it (not draft-only), or set SANITY_API_READ_TOKEN for dev draft reads. ' +
            'Using defaults.'
        )
      }
      return {settings: fallback, isFallback: true}
    }

    const colorStyle = sanitizeColorStyle(data.colorStyle)
    const themeMode = sanitizeThemeMode(data.themeMode)
    const styleThemePreset = getThemeFromColorStyle(colorStyle)

    // Merge manual theme overrides if in custom mode, otherwise use the preset
    const themeBase = colorStyle === 'custom' ? data.theme : styleThemePreset ?? fallback.theme
    const theme = normalizeTheme({
      ...themeBase,
      defaultMode: themeMode,
    })

    return {
      settings: {
        _id: sanitizeDocumentId(data._id, fallback._id),
        brandName: sanitizeText(data.brandName, fallback.brandName),
        bookingUrl: sanitizeText(data.bookingUrl, fallback.bookingUrl),
        colorStyle,
        themeMode,
        navItems: sanitizeNavItems(data.navItems),
        hero: {
          eyebrow: sanitizeText(data.hero?.eyebrow, DEFAULT_HERO_CONTENT.eyebrow),
          title: sanitizeText(data.hero?.title, DEFAULT_HERO_CONTENT.title),
          subtitle: sanitizeText(data.hero?.subtitle, DEFAULT_HERO_CONTENT.subtitle),
          description: sanitizeText(data.hero?.description, DEFAULT_HERO_CONTENT.description),
          image: data.hero?.image ?? null,
        },
        socialLinks: sanitizeSocialLinks(data.socialLinks),
        socialProof: sanitizeSocialProof(data.socialProof),
        about: sanitizeAboutContent(data.about),
        bookingCta: sanitizeBookingCtaContent(data.bookingCta),
        footer: {
          locationLabel: sanitizeText(
            data.footer?.locationLabel,
            DEFAULT_FOOTER_CONTENT.locationLabel
          ),
          locationText: sanitizeText(data.footer?.locationText, DEFAULT_FOOTER_CONTENT.locationText),
          copyrightText: sanitizeText(
            data.footer?.copyrightText,
            DEFAULT_FOOTER_CONTENT.copyrightText
          ),
        },
        fontPreset: isFontPreset(data.fontPreset) ? data.fontPreset : fallback.fontPreset,
        theme,
      },
      isFallback: false,
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to fetch siteSettings. Using defaults.', error)
    }
    return {settings: fallback, isFallback: true}
  }
}
