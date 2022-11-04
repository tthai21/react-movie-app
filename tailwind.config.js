/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
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
