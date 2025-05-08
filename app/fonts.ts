import localFont from 'next/font/local'

// Load CabinetGrotesk font for headings
export const cabinetGrotesk = localFont({
  src: [
    {
      path: './fonts/CabinetGrotesk-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/CabinetGrotesk-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/CabinetGrotesk-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/CabinetGrotesk-Medium.otf',
      weight: '500',
      style: 'normal',
    }
  ],
  variable: '--font-cabinet',
  display: 'swap',
})

// Load ClashDisplay font for body text
export const clashDisplay = localFont({
  src: [
    {
      path: './fonts/ClashDisplay-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/ClashDisplay-Medium.otf',
      weight: '500',
      style: 'normal',
    }
  ],
  variable: '--font-clash-display',
})

export const dmSans = localFont({
  src: [
    {
      path: './fonts/DMSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/DMSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/DMSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-dm-sans',
}) 