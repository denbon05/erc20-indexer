module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parserOptions: {
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint"],
  root: true,
  rules: {},
};
