module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'google',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-unused-vars': 0, // could be 1 to warn (but lots of ion components throw false positives)
    'prettier/prettier': [
      'error',
      {
        usePrettierrc: true
      }
    ]
  }
};
