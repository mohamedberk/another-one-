import localFont from 'next/font/local'

// Load ClashDisplay font for headings
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
    },
    {
      path: './fonts/ClashDisplay-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/ClashDisplay-Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-clash',
  display: 'swap',
})

// Load CabinetGrotesk font for display elements
export const cabinetGrotesk = localFont({
  src: [
    {
      path: './fonts/CabinetGrotesk-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/CabinetGrotesk-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/CabinetGrotesk-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/CabinetGrotesk-Black.otf',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-cabinet',
  display: 'swap',
}) 