/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        '3xl': '1850px',
      },
      fontFamily: {
        body: ["DM Sans", "san-serif"],
      },
      colors:{
        primary: "#F62682",
        secondary: "#6F5CF1",
      }
    },
  },
  plugins: [],
};
