/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        basico: "#141314",
        fondo: "#041c34 ",
        botones: " #EA0B4E",
        "botones-hover": " #8c042c ",
        otros: " #0c8ca4 ",
      },
    },
  },
  plugins: [],
};
