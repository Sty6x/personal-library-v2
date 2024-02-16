/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderColor: {
        "note-separator": "#1d1d1d4c0",
      },
    },
    dropShadow: {
      "text-shadow": "2px 3px 1.4px rgb(0 0 0 / 0.3)",
    },
    boxShadow: {
      "btn-hover-active": "0px 1px 2px 1px rgb(0 0 0 / 0.3)",
      "btn-hover": "1px 2px 2px 2px rgb(0 0 0 / 0.2)",
      "book-item-active": "1px 4px 6px 3px rgb(0 0 0 / 0.3)",
      "book-item": "1px 6px 6px 6px rgb(0 0 0 / 0.1)",
      header: "0px 5px 3px -1px rgb(0 0 0 / 0.2)",
    },
    fontFamily: {
      serif: ["Abhaya Libre", "serif"],
      "sans-serif": ["Be Vietnam Pro", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      black: "#1d1d1d",
      white: "#ffffff",
      separator: {
        100: "#d1d1d1",
        200: "#9d9d9d",
        300: "#1d1d1d",
      },
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
        danger: "#D75F3B",
      },
    },
  },
  plugins: [],
};
