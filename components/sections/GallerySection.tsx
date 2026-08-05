import BeforeAfter from '@/components/BeforeAfter'
import StackedCarousel from '@/components/StackedCarousel'
import Reveal from '@/components/ui/Reveal'
import type {GalleryItem} from '@/types/home'

interface GallerySectionProps {
  gallery: GalleryItem[]
}

export default function GallerySection({gallery}: Readonly<GallerySectionProps>) {
  const hasGalleryItems = Array.isArray(gallery) && gallery.length > 0

  return (
    <section id="gallery" className="px-4 py-16 sm:py-8 scroll-mt-8 sm:scroll-mt-16 border-t border-[color:var(--color-border)] border-t border-[color:var(--color-border)]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-8 text-center sm:mb-10">
          <span
            className="mb-3 block text-[10px] uppercase text-[var(--color-accent)]"
          >
            Visual Validation
          </span>
          <h2
            className="font-display text-3xl uppercase tracking-tight sm:text-4xl md:text-5xl lg:text-7xl"
          >
            Before & After
          </h2>
        </Reveal>

        <div className="flex flex-col items-center sm:border border-[color:var(--color-border)] rounded-2xl p-8 mb-8">
          {hasGalleryItems ? (
            <>
              <Reveal className="w-full">
                <StackedCarousel>
                  {(gallery ?? []).map((item) => (
                    <BeforeAfter
                      key={item._id}
                      beforeImage={item.beforeImage}
                      afterImage={item.afterImage}
                    />
                  ))}
                </StackedCarousel>
              </Reveal>

              <Reveal className="flex w-full max-w-4xl justify-between px-4 text-xs uppercase tracking-widest text-[color:var(--color-muted)]">
                <span className="flex items-center gap-2">
                  <span className="h-px w-4 bg-[color:var(--color-border)]" />
                  Before
                </span>
                <span className="flex items-center gap-2">
                  After
                  <span className="h-px w-4 bg-[color:var(--color-border)]" />
                </span>
              </Reveal>
            </>
          ) : (
            <p className="rounded-2xl border border-[color:var(--color-border)] bg-[var(--color-surface)] px-6 py-10 text-center text-sm text-[color:var(--color-muted)]">
              Add before and after gallery items in Sanity Studio to see this section.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
