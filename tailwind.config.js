/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        skils: "var(--skills-font)",
        jumbo: "var(--jumbo-font)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
