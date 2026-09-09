/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1e2d6b',
          50:  '#eef1fb',
          100: '#d5dcf5',
          200: '#aab9eb',
          300: '#7f96e0',
          400: '#5473d5',
          500: '#3352c5',
          600: '#2a44a8',
          700: '#23388a',
          800: '#1e2d6b',
          900: '#131c47',
          950: '#0b1130',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light:   '#e2c97e',
          dark:    '#a07c28',
          50:  '#fdf8ed',
          100: '#f9efc9',
          200: '#f2db8a',
          300: '#e9c74d',
          400: '#e2b82a',
          500: '#c9a84c',
          600: '#a07c28',
          700: '#7d5e1c',
          800: '#5e4514',
          900: '#3f2e0d',
        },
        offwhite: '#f7f4ef',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':  'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer':  'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
    },
  },
  plugins: [],
}
