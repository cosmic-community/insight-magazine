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
            h4: {
              fontWeight: '600',
              color: '#111827',
            },
            p: {
              color: '#374151',
            },
            strong: {
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
              color: '#4b5563',
            },
            code: {
              color: '#111827',
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
            },
            ul: {
              color: '#374151',
            },
            ol: {
              color: '#374151',
            },
            li: {
              color: '#374151',
            },
            hr: {
              borderColor: '#e5e7eb',
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
            h4: {
              color: '#f9fafb',
            },
            p: {
              color: '#d1d5db',
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
            code: {
              color: '#f9fafb',
              backgroundColor: '#374151',
            },
            pre: {
              backgroundColor: '#111827',
              color: '#e5e7eb',
            },
            ul: {
              color: '#d1d5db',
            },
            ol: {
              color: '#d1d5db',
            },
            li: {
              color: '#d1d5db',
            },
            'li::marker': {
              color: '#9ca3af',
            },
            hr: {
              borderColor: '#374151',
            },
            thead: {
              color: '#f9fafb',
              borderBottomColor: '#4b5563',
            },
            'tbody tr': {
              borderBottomColor: '#374151',
            },
            td: {
              color: '#d1d5db',
            },
            th: {
              color: '#f9fafb',
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