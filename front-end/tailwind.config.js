/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#8bc63f',  // Custom text color (you can change the name and value)
        'custom-blue': '#0099d7',   // Another custom color (you can add more colors)
      },
    },
  },
  plugins: [],
}

