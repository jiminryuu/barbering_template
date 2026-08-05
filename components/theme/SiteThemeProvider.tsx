import type {ReactNode} from 'react'
import {getFontPresetVariables} from '@/lib/theme/fontPresets'
import type {SiteSettings} from '@/types/site'
import ThemeModeProvider from './ThemeModeProvider'

interface SiteThemeProviderProps {
  settings: SiteSettings
  children: ReactNode
}

function themeVariableCss(settings: SiteSettings) {
  const {display, body} = getFontPresetVariables(settings.fontPreset)
  const {light, dark} = settings.theme
  const defaultPalette = settings.theme.defaultMode === 'light' ? light : dark

  return `
    :root {
      --color-bg: ${defaultPalette.background};
      --color-surface: ${defaultPalette.surface};
      --color-text: ${defaultPalette.text};
      --color-muted: ${defaultPalette.muted};
      --color-accent: ${defaultPalette.accent};
      --color-border: ${defaultPalette.border};
      --theme-light-background: ${light.background};
      --theme-light-surface: ${light.surface};
      --theme-light-text: ${light.text};
      --theme-light-muted: ${light.muted};
      --theme-light-accent: ${light.accent};
      --theme-light-border: ${light.border};
      --theme-dark-background: ${dark.background};
      --theme-dark-surface: ${dark.surface};
      --theme-dark-text: ${dark.text};
      --theme-dark-muted: ${dark.muted};
      --theme-dark-accent: ${dark.accent};
      --theme-dark-border: ${dark.border};
      --font-display: ${display};
      --font-body: ${body};
      --icon-filter: invert(0);
    }
    :root[data-theme='light'] {
      --color-bg: var(--theme-light-background);
      --color-surface: var(--theme-light-surface);
      --color-text: var(--theme-light-text);
      --color-muted: var(--theme-light-muted);
      --color-accent: var(--theme-light-accent);
      --color-border: var(--theme-light-border);
      --icon-filter: invert(0);
    }
    :root[data-theme='dark'] {
      --color-bg: var(--theme-dark-background);
      --color-surface: var(--theme-dark-surface);
      --color-text: var(--theme-dark-text);
      --color-muted: var(--theme-dark-muted);
      --color-accent: var(--theme-dark-accent);
      --color-border: var(--theme-dark-border);
      --icon-filter: invert(1);
    }
  `
}

export default function SiteThemeProvider({
  settings,
  children,
}: Readonly<SiteThemeProviderProps>) {
  return (
    <>
      <style id="site-theme-vars" dangerouslySetInnerHTML={{__html: themeVariableCss(settings)}} />
      <ThemeModeProvider defaultMode={settings.theme.defaultMode}>{children}</ThemeModeProvider>
    </>
  )
}
