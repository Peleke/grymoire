import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        // Falun red + black + cream — inspired by Swedish Falu rödfärg
        falun: {
          50: '#fdf5f4',
          100: '#fce8e5',
          200: '#f9d2cc',
          300: '#f3b0a6',
          400: '#e88072',
          500: '#d4564a',
          600: '#b83a2e',
          700: '#9a2520',   // true Falun red
          800: '#80201c',
          900: '#6e2019',
          950: '#3b0d0a',
        },
        ink: {
          50: '#fafaf9',
          100: '#f0efed',
          200: '#deddda',
          300: '#bfbdb8',
          400: '#9c998f',
          500: '#807d74',
          600: '#6b685e',
          700: '#58564e',
          800: '#4a4843',
          900: '#403f3b',
          950: '#0f0f0e',
        },
        parchment: {
          50: '#fdfcfa',
          100: '#f8f5ef',
          200: '#f0e9dd',
          300: '#e5d9c5',
          400: '#d4c3a5',
          500: '#c4ad88',
          600: '#b69a71',
          700: '#9a7f5c',
          800: '#7d684f',
          900: '#665642',
          950: '#362d21',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
