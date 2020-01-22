module.exports = {
  env: {
    browser: true,
    commonjs: false,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  "ignorePatterns": ["/node_modules/**", "**/*.json"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    // cc: 'readonly', // cocos
  },
  parserOptions: {
    ecmaVersion: 2018,
		sourceType: 'module',
  },
  rules: {
    "no-console": "off",
    "no-underscore-dangle": [ "error", { "allowAfterThis": true, "allowAfterSuper": true, } ],
    "func-names": ["error", "as-needed"],
    "object-shorthand": ["error", "properties", { "avoidQuotes": true }],
    semi: [2, 'never'],
  },
};
