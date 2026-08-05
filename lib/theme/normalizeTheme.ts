import type {ThemeConfig, ThemeMode, ThemePalette} from '@/types/site'
import {DEFAULT_THEME_CONFIG} from './tokenDefaults'

const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

function normalizeColor(value: unknown, fallback: string) {
  return typeof value === 'string' && HEX_COLOR_PATTERN.test(value.trim())
    ? value.trim()
    : fallback
}

function normalizePalette(
  palette: Partial<ThemePalette> | undefined,
  fallback: ThemePalette
): ThemePalette {
  return {
    background: normalizeColor(palette?.background, fallback.background),
    surface: normalizeColor(palette?.surface, fallback.surface),
    text: normalizeColor(palette?.text, fallback.text),
    muted: normalizeColor(palette?.muted, fallback.muted),
    accent: normalizeColor(palette?.accent, fallback.accent),
    border: normalizeColor(palette?.border, fallback.border),
  }
}

function normalizeMode(value: unknown): ThemeMode {
  return value === 'light' ? 'light' : 'dark'
}

export function normalizeTheme(
  input?: Partial<ThemeConfig> | null,
  fallbackConfig: ThemeConfig = DEFAULT_THEME_CONFIG
): ThemeConfig {
  return {
    defaultMode:
      input?.defaultMode === 'light' || input?.defaultMode === 'dark'
        ? input.defaultMode
        : normalizeMode(fallbackConfig.defaultMode),
    light: normalizePalette(input?.light, fallbackConfig.light),
    dark: normalizePalette(input?.dark, fallbackConfig.dark),
  }
}
