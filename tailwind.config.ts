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
        // Realm-specific palettes (legacy, still used for realm badges)
        gothic: {
          50: '#faf9f7',
          100: '#f0ede8',
          200: '#e0dbd2',
          300: '#c9c1b3',
          400: '#a89d8a',
          500: '#8f8370',
          600: '#7a6f5d',
          700: '#645a4c',
          800: '#544c42',
          900: '#48423a',
          950: '#28241f',
        },
        ink: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#1a1a1a',
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
        // Jelling Stone palette — gold, indigo, crimson
        gold: {
          50: '#fefdf4',
          100: '#fdf9e1',
          200: '#fbf0b8',
          300: '#f7e385',
          400: '#f0cf4d',
          500: '#e4b820',
          600: '#c99a14',
          700: '#a47614',
          800: '#875e17',
          900: '#6e4d19',
          950: '#40290a',
        },
        indigo: {
          50: '#eef2ff',
          100: '#dfe6ff',
          200: '#c6d0ff',
          300: '#a3b0fe',
          400: '#7e85fb',
          500: '#5f5ef5',
          600: '#4a3de9',
          700: '#3d2fce',
          800: '#3228a6',
          900: '#2c2683',
          950: '#1a164e',
        },
        crimson: {
          50: '#fef2f2',
          100: '#fde3e3',
          200: '#fdcbcb',
          300: '#faa7a7',
          400: '#f47373',
          500: '#ea4545',
          600: '#d62828',
          700: '#b41e1e',
          800: '#951c1c',
          900: '#7c1e1e',
          950: '#430b0b',
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
