'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { BookingCtaContent } from '@/types/site'

/**
 * Site navigation with desktop + mobile menu.
 */
interface NavItem {
  label: string
  href: string
}

interface NavbarProps {
  brand: string
  navItems: NavItem[]
  bookingUrl: string
  bookingCta: BookingCtaContent
}

export default function Navbar({
  brand,
  navItems,
  bookingUrl,
  bookingCta,
}: Readonly<NavbarProps>) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center border-b border-[color:var(--color-border)] px-4 py-4 md:px-6">
      <div className="absolute inset-0 -z-10 bg-[color:var(--color-bg)]" />
      
      {/* Left: Brand */}
      <div className="flex flex-1 justify-start">
        <div className="font-display text-2xl uppercase tracking-tight md:text-xl">{brand}</div>
      </div>

      {/* Center: Desktop Nav OR Mobile Button */}
      <div className="flex flex-1 justify-center">
        {/* Desktop Navigation */}
        <div className="hidden gap-8 text-sm uppercase tracking-[0.3em] text-[var(--color-text)] md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-[var(--color-accent)]">
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Booking Button */}
        <a
          href={bookingUrl}
          className="inline-flex rounded-full bg-[var(--color-accent)] px-4 py-2 text-[10px] font-semibold uppercase text-white transition-transform hover:scale-[1.03] md:hidden"
        >
          {bookingCta.ctaLabel}
        </a>
      </div>

      {/* Right: Desktop Button OR Mobile Hamburger */}
      <div className="flex flex-1 items-center justify-end gap-3">
        {/* Desktop Booking Button */}
        <a
          href={bookingUrl}
          className="hidden rounded-full bg-[var(--color-accent)] px-6 py-2 text-xs font-semibold uppercase text-white transition-transform hover:scale-[1.03] md:inline-flex"
        >
          {bookingCta.ctaLabel}
        </a>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-50 flex flex-col gap-1.5 rounded-md border border-[color:var(--color-border)] p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span
            className={cn(
              'h-0.5 w-6 bg-[var(--color-text)] transition-all',
              isOpen ? 'translate-y-2 rotate-45' : ''
            )}
          />
          <span
            className={cn(
              'h-0.5 w-6 bg-[var(--color-text)] transition-all',
              isOpen ? 'opacity-0' : ''
            )}
          />
          <span
            className={cn(
              'h-0.5 w-6 bg-[var(--color-text)] transition-all',
              isOpen ? '-translate-y-2 -rotate-45' : ''
            )}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 text-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl uppercase tracking-[0.2em] transition-colors hover:text-[var(--color-accent)]"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-6 flex flex-col items-center gap-4">
        <a
          href={bookingUrl}
          onClick={() => setIsOpen(false)}
          className="mt-8 inline-flex rounded-full bg-[var(--color-accent)] px-10 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-transform hover:scale-[1.03]"
        >
          {bookingCta.ctaLabel}
        </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
