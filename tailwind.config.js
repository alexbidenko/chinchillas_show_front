module.exports = {
  corePlugins: {
    preflight: false
  },
  content: ['./pages/**/*.vue', './components/**/*.vue', './app.vue', './error.vue'],
  darkMode: ['selector', '[class="p-dark"]'],
  plugins: [require('tailwindcss-primeui')]
};
