import Lookbook360Section from '@/components/Lookbook360Section'
import Reveal from '@/components/ui/Reveal'
import type {LookbookItem} from '@/types/home'

interface LookbookSectionProps {
  items: LookbookItem[]
}

export default function LookbookSection({items}: Readonly<LookbookSectionProps>) {
  return (
    <section id="lookbook-360" className="px-4 py-16 sm:py-8 scroll-mt-8 sm:scroll-mt-16 border-t border-[color:var(--color-border)]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-8 text-center sm:mb-12 md:mb-14">
          <span
            className="mb-3 block text-[10px] uppercase text-[var(--color-accent)]"
          >
            360 Lookbook
          </span>
          <h2
            className="font-display mb-3 text-3xl uppercase tracking-tight sm:text-4xl md:text-5xl lg:text-7xl"
          >
            Explore Styles & Atmosphere
          </h2>
          <p className="mx-auto max-w-xl text-sm">
            Swipe through cards and drag each frame to preview styles from every angle.
          </p>
        </Reveal>

        <Lookbook360Section items={items}/>
      </div>
    </section>
  )
}
