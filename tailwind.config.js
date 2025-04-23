import PrimeUI from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "background-secondary": "#E4E4E4",
        "main-text": "#202020",
        "description-text": "#292929",
        "selected": "#F6F6F6",
        "unselected": "#616161",
        "primary": "#FFC756",
      }
    },
  },
  plugins: [PrimeUI],
}

