/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#3BA1FF",
        secondary: "#4395F6",
        gray: "#666666",
      },
    },
  },
  plugins: [],
};
