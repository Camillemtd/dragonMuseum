/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '120': '24rem',
        '128': '28rem', // 512px if 1rem is 16px
        '144': '32rem',
        '156': '36rem',
        '86':  '20rem' // 576px if 1rem is 16px
        // Add more sizes as needed
      },
      height: {
        '120': '24rem',
        '128': '28rem',
        '129': '30rem',
        '144': '32rem',
        '156': '36rem',
        '160': '38rem'
      }
    },
  },
  plugins: [],
}

