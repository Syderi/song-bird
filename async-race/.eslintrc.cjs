module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "project": ["./tsconfig.json"]
},
  "plugins": ['@typescript-eslint'],
  "extends": [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:import/recommended",
    "airbnb-typescript/base"
  ],
  "ignorePatterns": ["**/*.js"],
  "rules": {
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-explicit-any": "error"
  }
};