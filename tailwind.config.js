/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        darky: '#3b3b3b',
        blacky: '#242424'
      },
      borderWidth: {
        1: '1px'
      }
    },
  },
  plugins: [],
}