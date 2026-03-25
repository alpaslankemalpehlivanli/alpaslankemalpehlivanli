import type { Metadata } from 'next'
import { Bangers, Nunito, JetBrains_Mono, Caveat, Comic_Neue } from 'next/font/google'
import './globals.css'

const bangers = Bangers({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bangers',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-caveat',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const comicNeue = Comic_Neue({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-comic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alpaslan Kemal Pehlivanlı — Game Designer',
  description: 'Interactive comic portfolio of Alpaslan Kemal Pehlivanlı — Game Designer, Co-Founder TigerOne Studios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${nunito.variable} ${caveat.variable} ${jetbrainsMono.variable} ${comicNeue.variable} h-full`}
    >
      <body className="h-full overflow-hidden">
        {children}
      </body>
    </html>
  )
}
