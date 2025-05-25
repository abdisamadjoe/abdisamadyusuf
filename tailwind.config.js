module.exports = {
  purge: ['./src/**/*.{html,js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Custom primary color
        secondary: '#FBBF24', // Custom secondary color
      },
      spacing: {
        '128': '32rem', // Custom spacing
        '144': '36rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}