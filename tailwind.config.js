/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'google-blue': '#4285F4',
        'city-dark': '#0F172A',
        'city-darker': '#020617',
        'critical-red': '#EF4444',
        'safe-green': '#10B981',
        'warning-yellow': '#F59E0B',
      }
    },
  },
  plugins: [],
}
