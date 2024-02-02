/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      serif: ["Abhaya Libre", "serif"],
      "sans-serif": ["Be Vietnam Pro", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      black: "#1d1d1d",
      white: "#ffffff",
      primary: {
        button: "#E2C7BF",
        main: "#CD8D7A",
        link: "#DCB1A4",
      },
      accent: {
        yellow: {
          300: "#DBCC95",
        },
        green: {
          100: "#B8E3CF",
          200: "#EAECCC",
          300: "#C3E2C2",
        },
      },
    },
  },
  plugins: [],
};
