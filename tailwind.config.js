/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f5f0ff',
          100: '#ece2ff',
          200: '#dac7ff',
          300: '#c09dff',
          400: '#a368ff',
          500: '#843af3',
          600: '#7124e2',
          700: '#5e19c4',
          800: '#4e169f',
          900: '#310d66',
        },
        mint: {
          50: '#ebfff9',
          100: '#ccfbee',
          200: '#99f6de',
          300: '#5eeaca',
          400: '#27d7b2',
          500: '#00c896',
          600: '#00a37b',
          700: '#008264',
        },
        navy: {
          800: '#161b29',
          900: '#0f131e',
          950: '#0a0d14',
        },
        surface: {
          50: '#f4f6f9',
          100: '#eaeef4',
          200: '#dbe2ec',
          300: '#c3cedd',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e2433',
          900: '#131722',
          950: '#0c0f17',
        },
        success: '#00c896',
        warning: '#f59e0b',
        danger: '#ef4444'
      },
      boxShadow: {
        'brand': '0 4px 16px 0 rgba(132, 58, 243, 0.28)',
        'brand-dark': '0 6px 22px -2px rgba(132, 58, 243, 0.38)',
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 12px 28px -6px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
}