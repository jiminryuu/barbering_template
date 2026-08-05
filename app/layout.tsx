import type {Metadata} from 'next'
import {
  Abril_Fatface,
  Anton,
  Bebas_Neue,
  Cabin,
  Cinzel,
  Cormorant_Garamond,
  DM_Sans,
  Jost,
  Karla,
  Lato,
  Lora,
  Manrope,
  Montserrat,
  Oswald,
  Playfair_Display,
  Rubik,
  Sora,
  Space_Grotesk,
  Work_Sans,
  Nunito,
} from 'next/font/google'

const displayOswald = Oswald({
  subsets: ['latin'],
  variable: '--font-display-oswald',
})

const displayPlayfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display-playfair',
})

const displayBebas = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-display-bebas',
  weight: '400',
})

const displaySora = Sora({
  subsets: ['latin'],
  variable: '--font-display-sora',
})

const displayCinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-display-cinzel',
})

const displayMontserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-display-montserrat',
})

const displayRubik = Rubik({
  subsets: ['latin'],
  variable: '--font-display-rubik',
})

const displayCormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display-cormorant',
})

const displayAnton = Anton({
  subsets: ['latin'],
  variable: '--font-display-anton',
  weight: '400',
})

const displayAbril = Abril_Fatface({
  subsets: ['latin'],
  variable: '--font-display-abril',
  weight: '400',
})

const bodyManrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body-manrope',
})

const bodyDmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body-dm-sans',
})

const bodySpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body-space-grotesk',
})

const bodyLato = Lato({
  subsets: ['latin'],
  variable: '--font-body-lato',
  weight: ['400', '700'],
})

const bodyLora = Lora({
  subsets: ['latin'],
  variable: '--font-body-lora',
})

const bodyNunito = Nunito({
  subsets: ['latin'],
  variable: '--font-body-nunito',
})

const bodyWorkSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-body-work-sans',
})

const bodyKarla = Karla({
  subsets: ['latin'],
  variable: '--font-body-karla',
})

const bodyJost = Jost({
  subsets: ['latin'],
  variable: '--font-body-jost',
})

const bodyCabin = Cabin({
  subsets: ['latin'],
  variable: '--font-body-cabin',
})

export const metadata: Metadata = {
  title: 'CIMA HAIR SALON',
  description: 'Modern Barber Shop built with Next.js and Sanity',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={[
        displayOswald.variable,
        displayPlayfair.variable,
        displayBebas.variable,
        displaySora.variable,
        displayCinzel.variable,
        displayMontserrat.variable,
        displayRubik.variable,
        displayCormorant.variable,
        displayAnton.variable,
        displayAbril.variable,
        bodyManrope.variable,
        bodyDmSans.variable,
        bodySpaceGrotesk.variable,
        bodyLato.variable,
        bodyLora.variable,
        bodyNunito.variable,
        bodyWorkSans.variable,
        bodyKarla.variable,
        bodyJost.variable,
        bodyCabin.variable,
      ].join(' ')}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
