// /** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {}
  },
  darkMode: "class",
  plugins: [nextui({
    prefix: 'sharphway',
    layout: {
      fontSize: {
        medium: '0.875rem'
      }
    },
    themes: {
      dark: {
        colors: {
          background: "#0f172a",
        }
      },
    }
  })]
}
