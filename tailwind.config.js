/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        chess: {
          white: "#FAFAF8", // Warm off-white
          black: "#2C2C2C", // Soft charcoal
          board: {
            light: "#F5F5DC", // Beige
            dark: "#8B7355", // Wood brown
          },
          accent: "#6B5B45", // Muted brown
          gray: {
            50: "#FAFAF9",
            100: "#F5F5F3",
            200: "#EBEBEB",
            300: "#D6D6D6",
            400: "#A8A8A8",
            500: "#737373",
            600: "#5C5C5C",
            700: "#3D3D3D",
            800: "#2C2C2C",
            900: "#1A1A1A",
          },
        },
      },
    },
  },
  plugins: [],
};
