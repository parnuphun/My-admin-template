/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    theme: {
        // default breakpoint
        screens: {
            // 'sm': '640px',
            // 'md': '768px',
            // 'lg': '1024px',
            // 'xl': '1280px',
            // '2xl': '1536px',
          }
    },
    extend: {
        // add breakpoint
        screens: {
            'less' : '100px',
            'MB' : '200px',
            'TL' : '640px',
            'LT': '1024px',
            'DT' : '1536px',

        }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
