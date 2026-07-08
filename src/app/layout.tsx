import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import BackToTop from '@/components/ui/back-to-top'
import Script from 'next/script'
import ScrollProgress from '@/components/ui/scroll-progress'
import SEOJsonLd from '@/components/ui/seo-json-ld'

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

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const siteUrl = 'https://glassgallery.my.id';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Azzar Budiyanto | Expert Freelance Engineer & Full-Stack Developer',
    template: '%s | Azzar Budiyanto'
  },
  description: 'Expert freelance IoT developer & full-stack engineer specializing in Arduino programming, Python, JavaScript, AI/ML, and embedded systems. 5+ years experience. Available for remote projects worldwide.',
  keywords: [
    "freelance IoT developer", "full-stack developer portfolio", "remote engineer", "Arduino programmer", "Python developer",
    "JavaScript engineer", "web development", "embedded systems", "React developer", "Node.js", "API development",
    "software engineer", "TypeScript", "IoT solutions", "electronics engineering", "portfolio website",
    "tech consultant", "open source contributor", "GitHub projects", "problem solver",
    "scalable applications", "backend development", "frontend development",
    "real-time applications", "cloud engineer", "RESTful API", "Next.js"
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
    title: 'Azzar Budiyanto | Expert Freelance Engineer & Full-Stack Developer',
    description: 'Expert freelance IoT developer & full-stack engineer. Specializing in Arduino, Python, JavaScript, AI/ML, embedded systems. 5+ years experience. View portfolio & hire today!',
    siteName: 'Azzar Budiyanto Portfolio',
    images: [{
      url: 'https://raw.githubusercontent.com/1999AZZAR/1999AZZAR/readme/resources/azzar.png',
      width: 1200,
      height: 630,
      alt: 'Azzar Budiyanto - Expert Engineer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azzar Budiyanto | Expert Freelance Engineer & Full-Stack Developer',
    description: 'Expert freelance IoT developer & full-stack engineer. Arduino, Python, JavaScript, AI/ML, embedded systems. 5+ years experience. Starting $35/hr!',
    creator: '@siapa_hayosiapa',
    images: ['https://raw.githubusercontent.com/1999AZZAR/1999AZZAR/readme/resources/azzar.png'],
  },
  other: {
    'contact': 'azzar.mr.zs@gmail.com',
    'phone': '+62 82232529804',
    'location': 'Remote - Available Worldwide',
    'availability': 'Available for freelance projects',
    'experience': '5+ years in software development',
    'geo.region': 'GLOBAL',
    'geo.placename': 'Remote - Worldwide',
    'geo.position': '0;0',
    'ICBM': '0, 0',
  }
}

export const viewport: Viewport = {
  themeColor: '#8B1A1A', // Burgundy
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
        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="https://raw.githubusercontent.com/1999AZZAR/1999AZZAR/readme/resources/logo.png" />
        <link rel="apple-touch-icon" href="https://raw.githubusercontent.com/1999AZZAR/1999AZZAR/readme/resources/logo.png" />
      </head>
      <body className={`${sans.variable} ${serif.variable} ${mono.variable} font-sans antialiased`}>
        <ScrollProgress />
        <LanguageProvider>
          <SEOJsonLd />
          <div className="min-h-screen flex flex-col relative blueprint-grid">
            <div className="blueprint-line left-0" />
            <div className="blueprint-line left-1/4 hidden md:block" />
            <div className="blueprint-line left-1/2 hidden md:block" />
            <div className="blueprint-line left-3/4 hidden md:block" />
            <div className="blueprint-line right-0" />
            
            <Navbar />
            <main className="flex-grow relative z-10">
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
        <script dangerouslySetInnerHTML={{ __html: `
          if('serviceWorker' in navigator){
            navigator.serviceWorker.getRegistrations().then(function(r){
              for(var i=0;i<r.length;i++){r[i].unregister()}
            });
            caches.keys().then(function(k){
              for(var i=0;i<k.length;i++){caches.delete(k[i])}
            });
          }
        `}} />
      </body>
    </html>
  )
}