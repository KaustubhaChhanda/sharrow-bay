/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EC',
        forest: '#1C1A16',
        gold: '#A8813A',
        'slate-muted': '#6B6458',
        'parchment-border': '#D9D0BF',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      borderWidth: {
        '0.5': '0.5px',
      },
    },
  },
  plugins: [],
}
