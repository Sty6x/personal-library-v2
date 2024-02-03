/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    dropShadow: {
      "text-shadow": "1px 3px 1.4px rgb(0 0 0 / 0.2)",
    },
    boxShadow: {
      "btn-hover": "0px 5px 4px 0px rgba(0,0,0,.24);",
    },
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
          100: "#EAECCC",
          200: "#B8E3CF",
          300: "#C3E2C2",
        },
      },
    },
  },
  plugins: [],
};
