/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f3efff',
          100: '#e8e0ff',
          200: '#d3c4ff',
          300: '#b59aff',
          400: '#9468ff',
          500: '#7c3ff5',
          600: '#6c2ee8',  // PRIMARY
          700: '#5b22cc',
          800: '#4b1ca6',
          900: '#3c1784',
          950: '#220d52',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6c2ee8 0%, #9468ff 100%)',
        'brand-gradient-dark': 'linear-gradient(135deg, #3c1784 0%, #6c2ee8 100%)',
      },
    },
  },
  plugins: [],
};
