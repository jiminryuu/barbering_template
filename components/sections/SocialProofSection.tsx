import {Star} from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import type {Review} from '@/types/home'
import type {SocialProofContent} from '@/types/site'

interface SocialProofSectionProps {
  socialProof: SocialProofContent
  reviews: Review[]
}

function RatingStars({rating}: Readonly<{rating: number}>) {
  const fullStars = Math.round(rating)
  return (
    <div className="flex items-center gap-1">
      {Array.from({length: 5}).map((_, index) => (
        <Star
          key={`star-${index}`}
          className={`h-4 w-4 ${
            index < fullStars ? 'fill-[var(--color-accent)] text-[var(--color-accent)]' : 'text-[color:var(--color-accent)]'
          }`}
        />
      ))}
    </div>
  )
}

export default function SocialProofSection({
  socialProof,
  reviews,
}: Readonly<SocialProofSectionProps>) {
  const hasReviews = reviews.length > 0

  return (
    <section id="reviews" className="px-4 py-16 sm:py-8 scroll-mt-8 sm:scroll-mt-16 border-t border-[color:var(--color-border)]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <span
            className="mb-3 block text-[10px] uppercase text-[var(--color-accent)]"
          >
            {socialProof.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
            {socialProof.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[var(--color-surface)] px-5 py-3">
            <div className="flex items-center gap-3">
              <RatingStars rating={socialProof.rating} />
              <span className="font-semibold">{socialProof.rating.toFixed(1)}</span>
              <span className="text-sm text-[color:var(--color-muted)]">
                ({socialProof.reviewCount}+ reviews)
              </span>
            </div>
          </div>
          {socialProof.profileUrl && socialProof.profileUrl !== '#' ? (
            <a
              href={socialProof.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[color:var(--color-border)] px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-colors hover:text-[var(--color-accent)]"
            >
              View on Google
            </a>
          ) : null}
        </Reveal>

        {hasReviews ? (
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {reviews.slice(0, 3).map((review, index) => (
              <Reveal
                key={review._id}
                delay={0.1 + index * 0.06}
                className="rounded-2xl border border-[color:var(--color-border)] bg-[var(--color-surface)] p-6"
              >
                <div className="mb-3">
                  <RatingStars rating={review.rating} />
                </div>
                <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                  {review.author}
                </p>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.1} className="mt-10 text-center text-sm uppercase tracking-widest text-[color:var(--color-muted)]">
            No current reviews
          </Reveal>
        )}
      </div>
    </section>
  )
}
