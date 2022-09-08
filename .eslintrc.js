module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb', 'airbnb-typescript'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['.eslintrc.js'], // TODO
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json'
  },
  plugins: ['prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'arrow-body-style': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'class-methods-use-this': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'prettier/prettier': ['off'],
    'function-paren-newline': 'off',
    'no-plusplus': 'off',
    'import/order': 'off',
    'operator-linebreak': 'off',
    'react/jsx-curly-newline': 'off',
    '@typescript-eslint/indent': 'off',
    'react/jsx-indent': 'warn',
    'jsx-quotes': ['error', 'prefer-single'],
    'react/require-default-props': 'off',
    '@typescript-eslint/dot-notation': 'off',
    'react/no-array-index-key': 'warn',
    'react/jsx-wrap-multilines': 'off',
    'jsx-a11y/anchor-is-valid': 'warn',
    '@typescript-eslint/return-await': 'off',

    'import/no-cycle': 'off',
    'import/no-named-as-default': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/quote': 'off'
  }
};