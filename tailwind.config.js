module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/views/**/*.hbs'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
