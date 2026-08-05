import type {CSSProperties} from 'react'
import type {FontPreset} from '@/types/site'

interface FontPresetVariables {
  display: string
  body: string
}

const FONT_PRESET_VARIABLES: Record<FontPreset, FontPresetVariables> = {
  classic: {
    display: 'var(--font-display-oswald)',
    body: 'var(--font-body-manrope)',
  },
  editorial: {
    display: 'var(--font-display-playfair)',
    body: 'var(--font-body-dm-sans)',
  },
  bold: {
    display: 'var(--font-display-bebas)',
    body: 'var(--font-body-space-grotesk)',
  },
  modern: {
    display: 'var(--font-display-sora)',
    body: 'var(--font-body-lato)',
  },
  refined: {
    display: 'var(--font-display-cinzel)',
    body: 'var(--font-body-lora)',
  },
  friendly: {
    display: 'var(--font-display-montserrat)',
    body: 'var(--font-body-nunito)',
  },
  minimal: {
    display: 'var(--font-display-rubik)',
    body: 'var(--font-body-work-sans)',
  },
  luxury: {
    display: 'var(--font-display-cormorant)',
    body: 'var(--font-body-karla)',
  },
  energetic: {
    display: 'var(--font-display-anton)',
    body: 'var(--font-body-jost)',
  },
  salon: {
    display: 'var(--font-display-abril)',
    body: 'var(--font-body-cabin)',
  },
}

export const FONT_PRESET_KEYS = Object.keys(FONT_PRESET_VARIABLES) as FontPreset[]

export function isFontPreset(value: unknown): value is FontPreset {
  return typeof value === 'string' && FONT_PRESET_KEYS.includes(value as FontPreset)
}

export function getFontPresetVariables(preset?: FontPreset): FontPresetVariables {
  return FONT_PRESET_VARIABLES[preset ?? 'salon'] ?? FONT_PRESET_VARIABLES.salon
}

export function getFontPresetStyle(preset?: FontPreset): CSSProperties {
  const variables = getFontPresetVariables(preset)
  return {
    '--font-display': variables.display,
    '--font-body': variables.body,
  } as CSSProperties
}
