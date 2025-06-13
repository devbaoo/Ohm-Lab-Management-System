/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6600",
          dark: "#E65C00",
          light: "#FF8533",
        },
        secondary: {
          DEFAULT: "#003399", 
          dark: "#002266",
          light: "#0047CC",
        },
        background: {
          DEFAULT: "#F5F7FA",
          dark: "#1A1A1A",
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      },
    },
  },
  plugins: [],
}
