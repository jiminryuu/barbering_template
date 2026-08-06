import Reveal from '@/components/ui/Reveal'
import type {Service} from '@/types/home'

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({services}: Readonly<ServicesSectionProps>) {
  const hasServices = Array.isArray(services) && services.length > 0

  return (
    <section id="services" className="px-4 py-16 sm:py-8 scroll-mt-8 sm:scroll-mt-16 border-t border-[color:var(--color-border)]">
      <div className="mx-auto max-w-7xl">
        <Reveal 
        delay = {0.2}
        className="mb-12 flex flex-col gap-4 sm:mb-20 text-center">
          
          <h2
            className="font-display text-4xl uppercase tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Services + Pricing
          </h2>
        </Reveal>

        {hasServices ? (
          <div className="overflow-hidden border border-[color:var(--color-border)] bg-[var(--color-surface)]">
            {(services ?? []).map((service, index) => (
              <Reveal
                key={service._id}
                delay={0.03 * index}
                className="group border-b border-[color:var(--color-border)] p-6 transition-all last:border-b-0 hover:bg-[var(--color-bg)] sm:px-10 lg:px-12"
              >
                <div className="flex flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span className="hidden font-mono text-xs text-[color:var(--color-muted)] sm:block">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-lg uppercase tracking-tight transition-colors group-hover:text-[var(--color-accent)] sm:text-xl lg:text-2xl">
                        {service.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-end justify-center gap-1 sm:gap-2">
                    <span className="text-lg font-bold text-[var(--color-accent)] sm:text-xl lg:text-2xl">
                      ${service.price}
                    </span>
                    <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                      <span className="hidden h-px w-4 bg-[color:var(--color-border)] sm:block" />
                      {service.duration} Min
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-[color:var(--color-border)] bg-[var(--color-surface)] px-6 py-10 text-center text-sm text-[color:var(--color-muted)]">
            Add service documents in Sanity Studio to populate this section.
          </p>
        )}
      </div>
    </section>
  )
}
