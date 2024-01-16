module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.{js,jsx,ts,tsx}',
      options: {
        singleQuote: true,
        tabWidth: 4,
        printWidth: 88,
      },
    },
  ],
};
