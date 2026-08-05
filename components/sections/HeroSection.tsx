import Reveal from '@/components/ui/Reveal'
import {optimizedImageUrl} from '@/sanity/lib/image'
import type {Barber} from '@/types/home'
import type {HeroContent, SocialLink} from '@/types/site'

interface HeroSectionProps {
  hero: HeroContent
  barber: Barber | null
  socialLinks: SocialLink[]
  bookingUrl: string
}

export default function HeroSection({
  hero,
  barber,
  socialLinks,
}: Readonly<HeroSectionProps>) {
  const heroImageUrl = hero.image ? optimizedImageUrl(hero.image, 'hero') : null
  const heroDescription = hero.description.replace('{barberName}', barber?.name ?? 'our master barber')

  return (
    <section id="hero" className="relative flex min-h-[100vh] items-end overflow-hidden px-4 pb-16 pt-32 sm:px-6 scroll-mt-8 sm:scroll-mt-16 border-t border-[color:var(--color-border)]">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-[var(--color-bg)]" />

      {heroImageUrl ? (
        <div className="absolute inset-0 scale-100 blur-sm">
          <img
            src={heroImageUrl}
            alt={`${barber?.name ?? 'Barber'} background`}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      ) : null}

      <div className="relative z-20 mx-auto w-full max-w-6xl text-center">
        <Reveal className="mb-4 text-center">
          <span
            className="block text-[14px] font-semibold uppercase text-[var(--color-accent)] text-center"
          >
            {hero.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.08} className="text-center">
          <h1
            className="font-display text-[11vw] font-bold uppercase leading-[0.85] tracking-tight md:text-[8vw] text-center"
          >
            {hero.title}
            <span
              className="mt-2 block border-t border-[color:var(--color-border)] pt-2 whitespace-nowrap text-transparent"
              style={{WebkitTextStroke: '1px var(--color-text)'}}
            >
              {hero.subtitle}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.14} className="mx-auto mt-6 max-w-xl text-center">
          <p className="text-sm uppercase tracking-[0.18em] text-center">{heroDescription}</p>
        </Reveal>
      </div>

      {socialLinks.length > 0 ? (
        <div className="absolute bottom-8 right-4 z-20 hidden md:block">
          <div className="flex gap-4 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            {socialLinks.map((social) =>
              social.href ? (
                <a
                  key={social.label}
                  href={social.href}
                  className="transition-colors hover:text-[var(--color-accent)]"
                >
                  {social.label}
                </a>
              ) : (
                <span key={social.label}>{social.label}</span>
              )
            )}
          </div>
        </div>
      ) : null}
    </section>
  )
}
