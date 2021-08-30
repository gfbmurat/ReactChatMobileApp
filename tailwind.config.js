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
  plugins: [
    // ...
    require('tailwind-scrollbar-variants')({
      button: {
        display: "none",
        height: "0px",
        width: "0px"
      },
      corner: {
        bgColor: "transparent"
      },
      scrollbar: {
        height: "14px",
        scrollbarWidth: "thin",
        width: "14px"
      },
      thumb: {
        bgOpacity: "0.15",
        borderColor: "transparent",
        borderRadius: "7px",
        borderStyle: "solid",
        borderWidth: "4px",
        height: "auto",
        width: "auto"
      }
    }),
  ],
}
