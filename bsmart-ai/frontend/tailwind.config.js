/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0A2540',
          blue: '#1E3A8A',
          lightBlue: '#3B82F6',
          saffron: '#D97706',
          saffronLight: '#FEF3C7',
          green: '#059669',
          greenLight: '#D1FAE5',
          dark: '#0F172A',
          muted: '#64748B',
          bg: '#F8FAFC'
        }
      }
    },
  },
  plugins: [],
}
