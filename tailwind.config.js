module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xs': { 'min': '360px', 'max': '639px' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
