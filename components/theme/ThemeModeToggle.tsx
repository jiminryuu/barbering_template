'use client'

import {Moon, Sun} from 'lucide-react'
import {useThemeMode} from './ThemeModeProvider'
import {cn} from '@/lib/utils/cn'

interface ThemeModeToggleProps {
  className?: string
}

export default function ThemeModeToggle({className}: Readonly<ThemeModeToggleProps>) {
  const {mode, toggleMode} = useThemeMode()
  const isDark = mode === 'dark'

  return (
    <button
      type="button"
      onClick={toggleMode}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)]',
        'bg-[var(--color-surface)] px-3 py-2 text-[10px] uppercase tracking-[0.2em]',
        'text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]',
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
