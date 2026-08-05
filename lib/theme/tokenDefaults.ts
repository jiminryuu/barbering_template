import type {
  AboutContent,
  BookingCtaContent,
  ColorStyle,
  FooterContent,
  HeroContent,
  NavItem,
  SiteSettings,
  SocialLink,
  SocialProofContent,
  ThemeConfig,
  ThemePalette,
} from '@/types/site'

export const DEFAULT_THEME_LIGHT: ThemePalette = {
  background: '#f4f1ea',
  surface: '#ffffff',
  text: '#151515',
  muted: '#5f5b54',
  accent: '#1f6feb',
  border: '#d7d1c6',
}

export const DEFAULT_THEME_DARK: ThemePalette = {
  background: '#050505',
  surface: '#0d0d0d',
  text: '#f5f5f5',
  muted: '#9a9a9a',
  accent: '#3b82f6',
  border: '#1f1f1f',
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  defaultMode: 'dark',
  light: DEFAULT_THEME_LIGHT,
  dark: DEFAULT_THEME_DARK,
}

export const COLOR_STYLE_PRESETS: Record<Exclude<ColorStyle, 'custom'>, ThemeConfig> = {
  professional: {
    defaultMode: 'dark',
    light: {
      background: '#f6f7f8',
      surface: '#ffffff',
      text: '#1f2937',
      muted: '#6b7280',
      accent: '#0a66c2',
      border: '#dce0e5',
    },
    dark: {
      background: '#111827',
      surface: '#1f2937',
      text: '#e5e7eb',
      muted: '#9ca3af',
      accent: '#22c55e',
      border: '#374151',
    },
  },
  beauty: {
    defaultMode: 'light',
    light: {
      background: '#fff1f6',
      surface: '#ffffff',
      text: '#3f2034',
      muted: '#8a5f78',
      accent: '#f43f8f',
      border: '#fbcfe8',
    },
    dark: {
      background: '#2a1022',
      surface: '#3f1734',
      text: '#fde7f3',
      muted: '#f5a9cb',
      accent: '#fb7185',
      border: '#7e3b67',
    },
  },
  coastal: {
    defaultMode: 'light',
    light: {
      background: '#f2fbff',
      surface: '#ffffff',
      text: '#153847',
      muted: '#4f6e7b',
      accent: '#0ea5a5',
      border: '#c2e6ee',
    },
    dark: {
      background: '#07252d',
      surface: '#0c3440',
      text: '#d8f5ff',
      muted: '#8cc6d3',
      accent: '#14b8a6',
      border: '#16596b',
    },
  },
  luxury: {
    defaultMode: 'dark',
    light: {
      background: '#F5F1EB',
      surface: '#FFFFFF',
      text: '#0B0B0B',
      muted: '#706B64',
      accent: '#C6A75E',
      border: '#D8CFC4',
    },
    dark: {
      background: '#0B0B0B',
      surface: '#151515',
      text: '#F5F1EB',
      muted: '#9A948C',
      accent: '#C6A75E',
      border: '#2A2A2A',
    },
  },
  modern: {
    defaultMode: 'light',
    light: {
      background: '#FAF8F5',
      surface: '#FFFFFF',
      text: '#333333',
      muted: '#8C847E',
      accent: '#C8A2A8',
      border: '#E5E0DA',
    },
    dark: {
      background: '#1A1A1A',
      surface: '#262626',
      text: '#FAF8F5',
      muted: '#A69F98',
      accent: '#B47C63',
      border: '#333333',
    },
  },
  clinical: {
    defaultMode: 'light',
    light: {
      background: '#FFFFFF',
      surface: '#F7F9FA',
      text: '#1F2937',
      muted: '#6B7280',
      accent: '#8FAF9D',
      border: '#EAEAEA',
    },
    dark: {
      background: '#121D24',
      surface: '#1B2931',
      text: '#F9FAFB',
      muted: '#9CA3AF',
      accent: '#5F7C8A',
      border: '#2D3E4A',
    },
  },
  creative: {
    defaultMode: 'dark',
    light: {
      background: '#F3EFEA',
      surface: '#FFFFFF',
      text: '#1F1F1F',
      muted: '#6B6B6B',
      accent: '#EC4899',
      border: '#D1D1D1',
    },
    dark: {
      background: '#1F1F1F',
      surface: '#2B1E2F',
      text: '#F3EFEA',
      muted: '#9A9A9A',
      accent: '#06B6D4',
      border: '#3D3D3D',
    },
  },
  rustic: {
    defaultMode: 'light',
    light: {
      background: '#F9F7F2',
      surface: '#FFFFFF',
      text: '#3D2B1F',
      muted: '#7D6B5D',
      accent: '#8C5E3C',
      border: '#E0D6C8',
    },
    dark: {
      background: '#241C15',
      surface: '#33261D',
      text: '#E6D5C3',
      muted: '#A38D7A',
      accent: '#B08968',
      border: '#4D3B2E',
    },
  },
}

export function getThemeFromColorStyle(style?: ColorStyle): ThemeConfig | null {
  if (!style || style === 'custom') return null
  return COLOR_STYLE_PRESETS[style] ?? null
}

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  {label: 'Reviews', href: '#reviews'},
  {label: 'Services', href: '#services'},
  {label: 'Results', href: '#gallery'},
  {label: 'Lookbook', href: '#lookbook-360'},
  {label: 'Quiz', href: '#quiz'},
  {label: 'About', href: '#about'},
  {label: 'Book', href: '#book'},
]

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {label: 'Instagram'},
  {label: 'Facebook'},
  {label: 'TikTok'},
]

export const DEFAULT_HERO_CONTENT: HeroContent = {
  eyebrow: 'Family-Friendly Hair and Beauty Experience',
  title: 'Cima',
  subtitle: 'Hair Salon',
  description:
    'From kids cuts to full transformations, your style is handled with care by {barberName}.',
}

export const DEFAULT_SOCIAL_PROOF_CONTENT: SocialProofContent = {
  eyebrow: 'Google Reviews',
  heading: 'Trusted by Local Families',
  rating: 4.9,
  reviewCount: 214,
  profileUrl: '#',
  reviews: [
    {
      author: 'Monica A.',
      text: 'My kids love coming here. Friendly team, clean salon, and always consistent cuts.',
    },
    {
      author: 'David R.',
      text: 'Great value and great results. Booking is easy and they always run on time.',
    },
    {
      author: 'Anita L.',
      text: 'I came for color correction and left feeling brand new. Highly recommend.',
    },
  ],
}

export const DEFAULT_ABOUT_CONTENT: AboutContent = {
  eyebrow: 'Our Team',
  heading: 'A Salon Built Around Real People',
  description:
    'We focus on welcoming service, honest recommendations, and quality results for every age.',
}

export const DEFAULT_BOOKING_CTA_CONTENT: BookingCtaContent = {
  eyebrow: 'Ready for Your Appointment?',
  heading: 'Book Your Visit in Under a Minute',
  description:
    'Choose a service, pick a time, and let our team take care of the rest.',
  ctaLabel: 'Book Now',
}

export const DEFAULT_FOOTER_CONTENT: FooterContent = {
  locationLabel: 'Location',
  locationText: '123 Grooming St, Style City',
  copyrightText: '(c) 2026 Barber.Co. Built with Next.js and Sanity.',
}
export function createDefaultSiteSettings(siteName: string): SiteSettings {
  return {
    _id: 'siteSettings',
    brandName: siteName,
    bookingUrl: '#',
    navItems: DEFAULT_NAV_ITEMS,
    hero: DEFAULT_HERO_CONTENT,
    socialLinks: DEFAULT_SOCIAL_LINKS,
    socialProof: DEFAULT_SOCIAL_PROOF_CONTENT,
    about: DEFAULT_ABOUT_CONTENT,
    bookingCta: DEFAULT_BOOKING_CTA_CONTENT,
    footer: DEFAULT_FOOTER_CONTENT,
    colorStyle: 'custom',
    themeMode: 'dark',
    fontPreset: 'salon',
    theme: DEFAULT_THEME_CONFIG,
  }
}
