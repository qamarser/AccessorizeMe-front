/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      extend: {
        fontFamily: {
          Source_Serif_Pro: ['"Source Serif Pro"', "serif"],
        },
      },
    },
  },
  plugins: [],
};
