/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        PlayfairDisplay: ['"Playfair Display"', 'serif'],
        SourceSansPro: ['"Source Sans Pro"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
