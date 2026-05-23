/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#030712", // Very deep slate/blue for premium feel (gray-950)
        surface: "#111827", // Details surface (gray-900)
        "surface-hover": "#1f2937", // (gray-800)
        primary: "#3b82f6", // Blue-500
        "primary-hover": "#60a5fa",
        secondary: "#10b981", // Emerald-500 for status
        muted: "#9ca3af", // gray-400
        border: "rgba(255, 255, 255, 0.08)",
        "border-focus": "rgba(59, 130, 246, 0.3)",
      },
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'Fira Code'", "'JetBrains Mono'", "monospace"], // For backend/code blocks
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
