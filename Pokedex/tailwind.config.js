import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "var(--gray-100)",
          900: "var(--gray-900)",
        },
      },
      fontFamily: {
        sans: ["Nunito sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
