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
          secondary: '#FFB800',
          accent: '#FF4E50',
          dark: '#1E1E1E',
          light: '#ffffff',
          base: '#FFFBF5',
          grayText: '#4B4B4B',
          sand: {
            50: '#FFF8E1',
            100: '#FFECB3',
            200: '#FFE082',
            300: '#FFD54F',
            400: '#FFCA28',
            500: '#FFC107',
            600: '#FFB300',
            700: '#FFA000',
            800: '#FF8F00',
            900: '#FF6F00',
          },
          terracotta: {
            50: '#FBE9E7',
            100: '#FFCCBC',
            200: '#FFAB91',
            300: '#FF8A65',
            400: '#FF7043',
            500: '#FF5722',
            600: '#F4511E',
            700: '#E64A19',
            800: '#D84315',
            900: '#BF360C',
          },
          morocco: {
            amber: '#F59E0B',
            orange: '#F97316',
            terracotta: '#C65F46',
            sand: '#FAF6F1',
            desert: '#D4A76A',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        clash: ['var(--font-clash)', 'sans-serif'],
        cabinet: ['var(--font-cabinet)', 'sans-serif'], 
      },
      boxShadow: {
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
        'soft': '0 4px 14px 0 rgba(0, 0, 0, 0.05)',
        'hover': '0 6px 20px rgba(0, 0, 0, 0.1)',
        'travel': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        'luxury': '0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(255, 122, 0, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'morocco': '0 10px 25px -5px rgba(245, 158, 11, 0.1), 0 8px 10px -6px rgba(245, 158, 11, 0.05)',
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
        'gradient-morocco': 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 