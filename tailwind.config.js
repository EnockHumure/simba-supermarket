/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        simba: {
          primary: '#e31b23',
          secondary: '#ffd200',
          orange: '#f28c28',
          purple: '#49266f',
          ink: '#201616',
          muted: '#766c6c',
          bg: '#fafafa',
          line: '#edeaea',
        }
      }
    },
  },
  plugins: [],
}
