module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        errorColor: '#9f3a38'
      },
      backgroundImage: theme => ({
        "mobile": "url('./assets/android_login.png')",
        "desktop": "url('./assets/login_background.png')",
      }),
      screens: {
        'xs': { 'min': '360px', 'max': '639px' },
      },
    },

  },
  variants: {},
  plugins: [
    require('tailwind-scrollbar-variants')
  ],
}
