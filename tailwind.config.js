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
        travel: {
          primary: '#FF7A00',
          base: '#FAF9F6',
          dark: '#1E1E1E',
          light: '#ffffff',
          grayText: '#4B4B4B',
          accent: '#FF4E50',
          secondary: '#FFB800',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      boxShadow: {
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
        'soft': '0 4px 14px 0 rgba(0, 0, 0, 0.05)',
        'hover': '0 6px 20px rgba(0, 0, 0, 0.1)',
        'travel': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        'luxury': '0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(255, 122, 0, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'scaleXIn': 'scaleXIn 0.6s ease-out forwards',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
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
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundImage: {
        'travel-pattern': "url('/patterns/travel-pattern.svg')",
        'gradient-luxury': 'linear-gradient(135deg, #FF7A00 0%, #FF4E50 50%, #FFB800 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 