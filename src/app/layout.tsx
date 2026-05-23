import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'

import './globals.css'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollIndicator from '@/components/ScrollIndicator'
import CustomCursor from '@/components/CustomCursor'
import NoiseOverlay from '@/components/NoiseOverlay'
import ScrollToTopProvider from '@/components/providers/ScrollToTopProvider'  // ← add this

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
})

export const metadata: Metadata = {
  title: 'Realestate Srinagar',
  description: 'Luxury real estate experience',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} relative min-h-screen bg-white`}
      >
          <ScrollToTopProvider> 
            <Navigation />

            <main>{children}</main>

            <Footer />
            <ScrollIndicator />
            <CustomCursor />
            <NoiseOverlay />
          </ScrollToTopProvider>
      </body>
    </html>
  )
}