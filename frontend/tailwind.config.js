/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mwlightgreen' : '#0796a8',
        'mwdarkgreen': '#067a89',
        'mvcontainergrey' : '#1e1f20'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

