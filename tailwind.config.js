/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            100: '#E6F7FF',
            200: '#BAE7FF',
            300: '#91D5FF',
            400: '#69C0FF',
            500: '#40A9FF',
            600: '#1890FF',
            700: '#096DD9',
            800: '#0050B3',
            900: '#003A8C',
          },
          teal: {
            100: '#E6FFFA',
            200: '#B2F5EA',
            300: '#81E6D9',
            400: '#4FD1C5',
            500: '#38B2AC',
            600: '#319795',
            700: '#2C7A7B',
            800: '#285E61',
            900: '#234E52',
          },
          gray: {
            100: '#F9FAFB',
            200: '#F4F5F7',
            300: '#E5E7EB',
            400: '#D2D6DC',
            500: '#9FA6B2',
            600: '#6B7280',
            700: '#4B5563',
            800: '#252F3F',
            900: '#161E2E',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
        'soft': '0 4px 14px 0 rgba(0, 0, 0, 0.05)',
        'hover': '0 6px 20px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            strong: {
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 