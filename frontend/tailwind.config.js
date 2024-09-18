/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mwlightgreen' : '#07b2a0',
        'mwdarkgreen': '#067a89'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

