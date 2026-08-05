import Reveal from '@/components/ui/Reveal'
import {optimizedImageUrl} from '@/sanity/lib/image'
import type {Barber} from '@/types/home'
import type {AboutContent} from '@/types/site'

interface AboutSectionProps {
  about: AboutContent
  barber: Barber | null
}

export default function AboutSection({about, barber}: Readonly<AboutSectionProps>) {
  const barberImage = barber?.image ? optimizedImageUrl(barber.image, 'portrait') : null

  return (
    <section id="about" className="px-4 py-16 sm:py-8 scroll-mt-8 sm:scroll-mt-16 border-t border-[color:var(--color-border)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <span className="mb-3 block text-[10px] uppercase text-[var(--color-accent)]">
            {about.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
            {about.heading}
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed">{about.description}</p>
          {barber?.name ? (
            <div className="mt-8 rounded-2xl border border-[color:var(--color-border)] bg-[var(--color-surface)] p-5">
              <p className="text-xs uppercase tracking-widest text-[var(--color-accent)]">Lead Stylist</p>
              <h3 className="mt-2 font-display text-2xl">{barber.name}</h3>
              {barber.bio ? <p className="mt-3 text-sm text-[color:var(--color-muted)]">{barber.bio}</p> : null}
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          {barberImage ? (
            <img
              src={barberImage}
              alt={barber?.name ?? 'Salon Team'}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full max-h-[70vh] rounded-3xl object-cover shadow-xl"
            />
          ) : (
            <div className="flex aspect-[4/5] w-full max-h-[70vh] items-center justify-center rounded-3xl border border-[color:var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-muted)]">
              Add a barber image in Sanity to populate this section.
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
