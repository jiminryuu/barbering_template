import Reveal from '@/components/ui/Reveal'
import type {FooterContent, SocialLink} from '@/types/site'

interface FooterSectionProps {
  brand: string
  socialLinks: SocialLink[]
  footer: FooterContent
}

export default function FooterSection({
  brand,
  socialLinks,
  footer,
}: Readonly<FooterSectionProps>) {
  return (
    <footer className="border-t border-[color:var(--color-border)] px-4 py-12 sm:px-6 sm: md:py-20">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex w-full justify-center md:flex-1 md:justify-start md:text-left">
          <div className="font-display text-3xl uppercase tracking-tight">
            {brand}
          </div>
        </div>

        <div className="text-center">
          <p className="mb-2 text-[10px] uppercase">
            {footer.locationLabel}
          </p>
          <p className="text-sm text-[var(--color-text)]">{footer.locationText}</p>
        </div>

        <div className="flex w-full flex-wrap justify-center gap-3 md:flex-1 md:justify-end">
          {socialLinks.map((social) =>
            social.href ? (
              <a
                key={social.label}
                href={social.href}
                className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
              >
                {social.label}
              </a>
            ) : (
              <span
                key={social.label}
                className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]"
              >
                {social.label}
              </span>
            )
          )}
        </div>
      </Reveal>
      <div className="mt-14 text-center text-[10px] uppercase tracking-widest">
        {footer.copyrightText}
      </div>
    </footer>
  )
}
