import Reveal from '@/components/ui/Reveal'
import type {BookingCtaContent} from '@/types/site'

interface BookingCTASectionProps {
  bookingUrl: string
  bookingCta: BookingCtaContent
}

export default function BookingCTASection({
  bookingUrl,
  bookingCta,
}: Readonly<BookingCTASectionProps>) {
  return (
    <section id="book" className="px-4 py-16 sm:py-8 scroll-mt-8 sm:scroll-mt-16 border-t border-[color:var(--color-border)]">
      <Reveal className="mx-auto max-w-4xl rounded-3xl border border-[color:var(--color-border)] bg-[var(--color-surface)] p-8 text-center sm:p-12">
        <span className="mb-3 block text-[10px] uppercase text-[var(--color-accent)]">
          {bookingCta.eyebrow}
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
          {bookingCta.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed">
          {bookingCta.description}
        </p>
        <a
          href={bookingUrl}
          className="mt-8 inline-flex rounded-full bg-[var(--color-accent)] px-10 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-transform hover:scale-[1.03]"
        >
          {bookingCta.ctaLabel}
        </a>
      </Reveal>
    </section>
  )
}
