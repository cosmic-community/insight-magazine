/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        technology: '#3B82F6',
        business: '#8B5CF6',
        lifestyle: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            color: '#374151',
            h1: {
              fontWeight: '800',
              color: '#111827',
            },
            h2: {
              fontWeight: '700',
              color: '#111827',
            },
            h3: {
              fontWeight: '600',
              color: '#111827',
            },
            a: {
              color: '#0ea5e9',
              '&:hover': {
                color: '#0284c7',
              },
            },
            blockquote: {
              borderLeftColor: '#0ea5e9',
              fontStyle: 'italic',
            },
          },
        },
        invert: {
          css: {
            color: '#d1d5db',
            h1: {
              color: '#f9fafb',
            },
            h2: {
              color: '#f9fafb',
            },
            h3: {
              color: '#f9fafb',
            },
            strong: {
              color: '#f9fafb',
            },
            a: {
              color: '#38bdf8',
              '&:hover': {
                color: '#7dd3fc',
              },
            },
            blockquote: {
              borderLeftColor: '#38bdf8',
              color: '#9ca3af',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}