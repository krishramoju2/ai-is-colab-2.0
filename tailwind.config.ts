// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        calligraphy1: ['"Great Vibes"', 'cursive'],
        calligraphy2: ['"Dancing Script"', 'cursive'],
        calligraphy3: ['"Satisfy"', 'cursive'],
        calligraphy4: ['"Allura"', 'cursive'],
        calligraphy5: ['"Pacifico"', 'cursive'],
        lobster: ['Lobster', 'cursive'],
        sacramento: ['Sacramento', 'cursive'],
        shadows: ['"Shadows Into Light"', 'cursive'],
        calligraffitti: ['Calligraffitti', 'cursive'],
      },
    },
  },
  plugins: [],
};
