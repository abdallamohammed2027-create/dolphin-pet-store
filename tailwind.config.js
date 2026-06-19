/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0F5132',
          light: '#1C7A4D',
          dark: '#0A3A24',
        },
        amber: {
          DEFAULT: '#F5A623',
          light: '#FFC25C',
          dark: '#D6890F',
        },
        cream: '#FBF8F2',
        sand: '#F0E9DC',
        charcoal: '#1A1F1B',
        coral: '#FF7A5C',
      },
      fontFamily: {
        display: ['var(--font-fredoka)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'sans-serif'],
      },
      borderRadius: {
        paw: '2.5rem 2.5rem 2.5rem 0.5rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'paw-bounce': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(-6deg)' },
        },
        'wag': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(8deg)' },
          '75%': { transform: 'rotate(-8deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'paw-bounce': 'paw-bounce 2.4s ease-in-out infinite',
        'wag': 'wag 0.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
