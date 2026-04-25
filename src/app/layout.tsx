import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import BackToTop from '@/components/ui/back-to-top'
import Script from 'next/script'

const sans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic', 'normal'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Azzar Budiyanto | Expert Freelance Engineer',
  description: 'Portfolio of Azzar Budiyanto, specializing in IoT, Web Development, and AI solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} font-sans antialiased`}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </div>
        </LanguageProvider>
        
        {/* Azzar AI Live Chat Widget */}
        <Script 
          src="https://live-chat-widget.azzar.workers.dev/widget.js" 
          data-color="light"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}