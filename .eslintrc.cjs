module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['solid', 'prettier', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:solid/typescript',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: ['./src/**/*.tsx', './src/**/*.ts'],
      env: {
        browser: true,
        es2022: true
      }
    },
    {
      env: {
        node: true
      },
      files: ['.*rc.cjs', '*.config*.js'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {}
}
