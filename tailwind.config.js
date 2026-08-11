/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: { 50:'#f0f4ff', 100:'#dbe4ff', 200:'#bac8ff', 400:'#748ffc', 500:'#4c6ef5', 600:'#3b5bdb', 700:'#364fc7' },
        surface: { 50:'#f8f9fa', 100:'#f1f3f5', 200:'#e9ecef', 300:'#dee2e6', 400:'#adb5bd', 500:'#868e96', 600:'#495057', 700:'#343a40', 800:'#212529' },
        success: '#2f9e44',
        warning: '#e67700',
        danger: '#e03131'
      }
    },
  },
  plugins: [],
}
