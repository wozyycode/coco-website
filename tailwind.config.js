/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Coco marka paleti
        void: {
          DEFAULT: '#0A0A0C',
          soft: '#111114',
          card: '#1C1C21',
          border: '#2A2A31',
        },
        mist: {
          DEFAULT: '#F5F5F7',
          dim: '#A8A8B3',
          faint: '#6B6B76',
        },
        signal: {
          // Discord mavi → mor geçiş — marka rengi
          blue: '#5865F2',
          violet: '#8B5CF6',
        },
        pulse: {
          // "Aktif koruma" yeşili
          DEFAULT: '#3ECF8E',
          soft: '#3ECF8E1A',
        },
        alert: '#F04747',
        // Light mode
        paper: {
          DEFAULT: '#FAFAFA',
          card: '#FFFFFF',
          border: '#E5E5EA',
        },
        ink: {
          DEFAULT: '#0A0A0C',
          dim: '#54545E',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'count-blur': 'count-blur 0.4s ease-out forwards',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'count-blur': {
          '0%': { opacity: '0', filter: 'blur(4px)' },
          '100%': { opacity: '1', filter: 'blur(0px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
