/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wealth: {
          emerald: '#10b981',
          gold: '#f59e0b',
          dark: '#1f2937',
          light: '#f9fafb',
        },
      },
      fontWeight: {
        value: '700', // For dollar amounts
      },
    },
  },
  plugins: [],
}
