/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void:    "#0a0a0a",
        surface: "#111111",
        card:    "#161616",
        accent:  "#e8ff8b",
      },
      fontFamily: {
        serif:   ["'Instrument Serif'", "serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
        sans:    ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
