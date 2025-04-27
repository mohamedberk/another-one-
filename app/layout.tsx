import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from 'sonner'
import './globals.css'

// Cache busting - add timestamp to force rerender in development
const cacheBuster = process.env.NODE_ENV === 'development' ? `?t=${Date.now()}` : ''

// Use system font fallbacks instead of loading fonts
const dmSans = {
  variable: '--font-dm-sans',
  className: '',
}

// Load Cabinet Grotesk locally for better performance
const cabinetGrotesk = localFont({
  src: [
    {
      path: './fonts/CabinetGrotesk-1.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-cabinet',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Hassan - Transportation Transfer Management Platform',
  description: 'Streamline your transportation agency operations with EasyBookNow. Manage transfers, driver assignments, and partner coordination with our specialized platform.',
  keywords: ['transportation management', 'transfer booking', 'driver assignment', 'hotel coordination', 'riad transfers', 'transportation agency software'],
  authors: [{ name: 'EasyBookNow Team' }],
  creator: 'EasyBookNow',
  publisher: 'EasyBookNow',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#FFFFFF',
  icons: {
    icon: [
      { url: '/logo.png' },
      { url: '/logo.png', type: 'image/png' }
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/logo.png' }
    ]
  },
  openGraph: {
    title: 'EasyBookNow - Transportation Transfer Management Platform',
    description: 'Streamline your transportation agency operations with EasyBookNow. Manage transfers, driver assignments, and partner coordination with our specialized platform.',
    url: 'https://easybooknow.com',
    siteName: 'EasyBookNow',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/logo.png' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyBookNow - Transportation Transfer Management Platform',
    description: 'Streamline your transportation agency operations with EasyBookNow. Manage transfers, driver assignments, and partner coordination with our specialized platform.',
    images: [{ url: '/logo.png' }]
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://easybooknow.com',
  },
  metadataBase: new URL('https://easybooknow.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${cabinetGrotesk.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="manifest" href={`/manifest.json${cacheBuster}`} />
        
        {/* Preload key resources */}
        <link rel="preload" href="/fonts/CabinetGrotesk-1.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        
        {/* Image domains preconnect */}
        <link rel="preconnect" href="https://x8a33q4crv.ufs.sh" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://x8a33q4crv.ufs.sh" />
        
        {/* Faster resource connection - critical domains */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" crossOrigin="anonymous" />
        
        {/* No bandwidth hints - let browser decide which resources to preload */}
        <meta httpEquiv="Accept-CH" content="DPR, Width, Viewport-Width" />
        
        {/* Tell the browser to de-prioritize non-critical animations */}
        <meta name="rendering-content" content="concurrent-without-animation" />
        
        {process.env.NODE_ENV === 'development' && (
          <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        )}
      </head>
      <body 
        className={`selection:bg-primary-50 selection:text-primary-700 bg-white min-h-screen`}
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          overscrollBehavior: 'none',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          backgroundColor: '#FFFFFF',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
        }}
      >
        <div className="content overflow-x-hidden">
          <div className="fixed top-6 right-6 z-50">
          </div>
          {children}
        </div>
        <Toaster 
          position="top-right" 
          richColors 
          closeButton 
          toastOptions={{
            style: {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(233, 233, 233, 0.5)',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.05)',
            },
            duration: 4000,
            className: 'text-sm',
          }}
        />
      </body>
    </html>
  )
}