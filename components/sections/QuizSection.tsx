import StyleQuiz from '@/components/StyleQuiz'
import Reveal from '@/components/ui/Reveal'
import type {LookbookItem, Quiz} from '@/types/home'

interface QuizSectionProps {
  styles: LookbookItem[]
  quiz: Quiz | null
}

export default function QuizSection({styles, quiz}: Readonly<QuizSectionProps>) {
  return (
    <section id="quiz" className="relative overflow-hidden px-4 py-16 sm:py-8 scroll-mt-8 sm:scroll-mt-16 border-t border-[color:var(--color-border)]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[25vw] font-display uppercase text-[color:var(--color-border)] opacity-20">
        STYLE
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal className="mb-8 text-center">
          <span className="mb-3 block text-[10px] uppercase text-[var(--color-accent)]">
            Find Your Best Fit
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
            Not Sure What to Book?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm">
            Take this quick quiz to match your style with the right service.
          </p>
        </Reveal>
        <StyleQuiz styles={styles ?? []} quiz={quiz} />
      </div>
    </section>
  )
}
