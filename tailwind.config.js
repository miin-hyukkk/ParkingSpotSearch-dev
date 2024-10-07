/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#3BA1FF",
        secondary: "#4395F6",
        gray: "#666666",
        gray_2: "#D9D9D9",
        filter_yellow: "#FFBC3B",
        filter_green: "#2BE0A9",
        filter_dark_green: "#2F8B6F",
        filter_blue: "#2B9BE0",
      },
    },
  },
  plugins: [],
};
