const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require("tailwindcss/colors")

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1800px',
      '2xl': '1800px',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.green,
        secondary: colors.violet,
        amber: colors.amber,
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['focus'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}