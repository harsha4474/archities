/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-red': '#8B0000',
        'crimson-red': '#DC143C',
        'charcoal': '#1A1A1A',
        'mid-gray': '#4A4A4A',
        'light-gray': '#F5F5F5',
        'metallic-gold': '#D4AF37',
        'electric-blue': '#00BFFF',
      },
      fontFamily: {
        'sans': ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 40px rgba(220, 20, 60, 0.8)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
