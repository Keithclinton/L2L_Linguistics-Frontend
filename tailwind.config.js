/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f1f8f2', 100: '#e0f0e3', 200: '#c4e3c9', 300: '#9ed1a7', 400: '#75bd81',
          500: '#4fa65e', 600: '#3f834a', 700: '#2f6238', 800: '#1f3d24', 900: '#122615',
        },
        emerald: { 500: '#1CAC78', 600: '#17936A' },
        amber: {
          50:  '#fbf7ef', 100: '#f5ecdb', 200: '#eddcbb', 300: '#e1c58e', 400: '#d4ad5e',
          500: '#c69a42', 600: '#997429', 700: '#73571f', 800: '#4d3a14', 900: '#2c210c',
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
