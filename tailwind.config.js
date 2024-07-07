/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1800px",
      },
      colors: {
        primary: {
          light: "#fff",
          dark: "#0f0f0f",
          gray: "#dbdbdb",
        },
      },
    },
  },
  plugins: [],
};
