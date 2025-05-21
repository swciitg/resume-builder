module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      '': '480px',
      ...require('tailwindcss/defaultTheme').screens,
    },
  },
  plugins: [],
  darkMode: 'class',
}
