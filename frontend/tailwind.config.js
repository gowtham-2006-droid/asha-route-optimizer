/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
        },
        risk: {
          critical: '#ef4444', // Red
          high: '#f97316',     // Orange
          moderate: '#eab308', // Yellow
          low: '#22c55e',      // Green
        }
      }
    },
  },
  plugins: [],
}
