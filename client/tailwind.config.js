/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      colors: {
        // primary: "#1d6d86",
        primary: "#4774a0",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
