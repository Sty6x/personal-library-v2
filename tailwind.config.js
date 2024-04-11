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
      "btn-hover": "0px 1px 1px 1px rgb(0 0 0 / 0.3)",
      "btn-hover-active": "0px 2px 3px 2px rgb(0 0 0 / 0.2)",
      "book-item-active": "1px 4px 6px 3px rgb(0 0 0 / 0.3)",
      "book-item": "1px 6px 6px 6px rgb(0 0 0 / 0.1)",
      header: "0px 5px 3px -1px rgb(0 0 0 / 0.2)",
      sb: "2px 0px 3px 1px #1d1d1d20",
      "focus-border": "0px 0px 10px 1px #CCD7EC",
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
        main: "#12372A",
      },
      gray: {
        100: "#D3D3D3",
        200: "#838383",
      },
      accent: {
        one: "#FBFADA",
        two: "#ADBC9F",
        three: "#436850",
      },
      pallete: {
        test: "#CCD7EC",
        danger: "#D75F3B",
        orange: "#ECCCCE",
      },
    },
  },
  plugins: [],
};
