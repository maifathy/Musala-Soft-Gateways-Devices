module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'airbnb-base/legacy',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    radix: 0,
    'no-console': 0,
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    'no-undef': 0
  }
};
