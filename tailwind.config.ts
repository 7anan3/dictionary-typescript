/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pale-purple": "#e8cff9",
        "royal-purple": "#a44de9",
        "midnight-black": "#050505",
        "light-gray": "#f4f4f4",
        "medium-gray": "#bdbdbd",
        white: "#fbfbfb",
        black: "#1f1f1f ",
      },
      boxShadow: {
        "3xl": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        "4xl": "rgba(255, 255, 255, 0.2) 0px 4px 8px 0px",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

