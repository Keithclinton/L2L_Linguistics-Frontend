/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e8f4fb',
          100: '#c5e3f4',
          200: '#9fd0ec',
          300: '#6fb8e3',
          400: '#4aa5da',
          500: '#2793d1',
          600: '#1a7ab8',
          700: '#0F5275',  // main
          800: '#0b3d57',
          900: '#062839',
        },
        emerald: {
          500: '#1CAC78',
          600: '#17936A',
        },
        amber: {
          500: '#D97706',
          400: '#F59E0B',
        },
        slate: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
