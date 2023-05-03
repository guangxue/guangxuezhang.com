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
        lora: ['var(--font-lora)'],
        kanit: ['var(--font-kanit)'],
        incon: ['var(--font-inconsolata)'],
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
