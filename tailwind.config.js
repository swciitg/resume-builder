module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '360px',
      ...require('tailwindcss/defaultTheme').screens,
    },
  },
  plugins: [],
  darkMode: 'class',
}
