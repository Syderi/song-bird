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
    "airbnb-base",
    "airbnb-typescript/base"
  ],
  "ignorePatterns": ["**/*.js"],
  "rules": {
    "import/no-cycle": 'off',
    "no-console": "off",
    "@typescript-eslint/no-explicit-any": "error"
  }
};
