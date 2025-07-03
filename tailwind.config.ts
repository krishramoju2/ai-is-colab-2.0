
// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
        dancing: ['"Dancing Script"', 'cursive'],
        vibes: ['"Great Vibes"', 'cursive'],
        satisfy: ['Satisfy', 'cursive'],
        pacifico: ['Pacifico', 'cursive'],
        lobster: ['Lobster', 'cursive'],
        sacramento: ['Sacramento', 'cursive'],
        shadows: ['"Shadows Into Light"', 'cursive'],
        calligraffitti: ['Calligraffitti', 'cursive'],
      },
    },
  },
  plugins: [],
};
