import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono, Courier_Prime } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import BackToTop from '@/components/ui/back-to-top'
import Script from 'next/script'
import ScrollProgress from '@/components/ui/scroll-progress'
import SEOJsonLd from '@/components/ui/seo-json-ld'

const display = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-display',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const typewriter = Courier_Prime({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-typewriter',
})

const siteUrl = 'https://glassgallery.my.id';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Azzar Budiyanto | IoT & Full-Stack Engineer',
    template: '%s | Azzar Budiyanto'
  },
  description: 'IoT engineer & full-stack developer specializing in embedded systems, Arduino, Python, and web technologies. Available for freelance projects worldwide.',
  keywords: [
    "IoT developer", "full-stack engineer", "Arduino programmer", "Python developer",
    "embedded systems", "React developer", "TypeScript", "freelance engineer",
    "web development", "cloud infrastructure", "DevOps", "Next.js"
  ],
  authors: [{ name: 'Azzar Budiyanto', url: siteUrl }],
  creator: 'Azzar Budiyanto',
  publisher: 'Azzar Budiyanto',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'id-ID': '/id',
    },
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: siteUrl,
    title: 'Azzar Budiyanto | IoT & Full-Stack Engineer',
    description: 'IoT engineer & full-stack developer. Embedded systems, Arduino, Python, web technologies. Available for freelance projects.',
    siteName: 'Azzar Budiyanto Portfolio',
    images: [{
      url: 'https://raw.githubusercontent.com/1999AZZAR/1999AZZAR/readme/resources/azzar.png',
      width: 1200,
      height: 630,
      alt: 'Azzar Budiyanto - Engineer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azzar Budiyanto | IoT & Full-Stack Engineer',
    description: 'IoT engineer & full-stack developer. Embedded systems, Arduino, Python, web technologies.',
    creator: '@siapa_hayosiapa',
    images: ['https://raw.githubusercontent.com/1999AZZAR/1999AZZAR/readme/resources/azzar.png'],
  },
  other: {
    'contact': 'azzar.mr.zs@gmail.com',
    'phone': '+62 82232529804',
    'location': 'Remote - Available Worldwide',
    'availability': 'Available for freelance projects',
  }
}

export const viewport: Viewport = {
  themeColor: '#8B1A1A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://live-chat-widget.azzar.workers.dev" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable} ${typewriter.variable} font-body antialiased`}>
        <ScrollProgress />
        <LanguageProvider>
          <SEOJsonLd />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </div>
        </LanguageProvider>
        
        <Script 
          src="https://live-chat-widget.azzar.workers.dev/widget.js" 
          data-color="dark"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
