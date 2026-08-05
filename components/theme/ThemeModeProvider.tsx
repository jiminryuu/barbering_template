'use client'

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type {ThemeMode} from '@/types/site'

const STORAGE_KEY = 'barber_theme_mode'
const DEFAULT_MODE_KEY = 'barber_default_theme_mode'

interface ThemeModeContextValue {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null)

interface ThemeModeProviderProps {
  defaultMode: ThemeMode
  children: ReactNode
}

function applyThemeToDocument(mode: ThemeMode) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', mode)
}

export default function ThemeModeProvider({
  defaultMode,
  children,
}: Readonly<ThemeModeProviderProps>) {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode)

  useEffect(() => {
    let savedMode: string | null = null
    let savedDefault: string | null = null
    
    try {
      savedMode = globalThis.localStorage.getItem(STORAGE_KEY)
      savedDefault = globalThis.localStorage.getItem(DEFAULT_MODE_KEY)
    } catch {
      // ignore
    }

    // If the default mode from settings has changed since the last time we visited,
    // we override the user's saved preference with the new default.
    let resolvedMode: ThemeMode
    if (savedDefault !== defaultMode) {
      resolvedMode = defaultMode
      try {
        globalThis.localStorage.setItem(DEFAULT_MODE_KEY, defaultMode)
        // We also clear the saved mode to allow the new default to take over
        globalThis.localStorage.removeItem(STORAGE_KEY)
      } catch {
        // ignore
      }
    } else {
      resolvedMode = savedMode === 'light' || savedMode === 'dark' ? savedMode : defaultMode
    }

    setModeState(resolvedMode)
    applyThemeToDocument(resolvedMode)
  }, [defaultMode])

  const setMode = useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode)
    try {
      globalThis.localStorage.setItem(STORAGE_KEY, nextMode)
    } catch {
      // no-op if storage is unavailable
    }
    applyThemeToDocument(nextMode)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }, [mode, setMode])

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode]
  )

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext)
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeModeProvider')
  }
  return context
}
