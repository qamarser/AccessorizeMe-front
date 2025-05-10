const tailwindcss = require("@tailwindcss/postcss");

module.exports = {
  plugins: [tailwindcss, require("autoprefixer")],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: ["text-yellow-400", "text-gray-400"],
  theme: {
    extend: {},
  },
  plugins: [],
};
