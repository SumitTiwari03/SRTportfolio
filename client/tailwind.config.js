/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { 
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'system-ui', 'sans-serif'],
        serif: ['Oxanium', 'system-ui', 'sans-serif'],
        script: ['Share Tech Mono', 'monospace'],
        display: ['Orbitron', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}