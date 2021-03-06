module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: "airbnb",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "react-hooks"],
  rules: {
    quotes: [2, "double"],
    semi: [2, "never"],
    "no-shadow": 0,
    "linebreak-style": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "react/state-in-constructor": 0,
    "import/no-extraneous-dependencies": 0,
    "no-param-reassign": 0,
    "no-tabs": 0,
    "react/prop-types": 0,
    "react/jsx-indent": [2, "tab"],
    "react/jsx-indent-props": [2, "tab"],
    "comma-dangle": [2, "never"],
    "import/prefer-default-export": 0,
    "import/no-default-export": 2,
    "arrow-parens": 0,
    "eol-last": 0,
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 1,
    "react/jsx-props-no-spreading": 0,
    "jsx-a11y/label-has-for": 0,
    "no-console": 0,
    "import/no-cycle": 0,
    "no-bitwise": 0,
    "template-curly-spacing": 0,
    "no-underscore-dangle": 0,
    indent: 0,
    curly: [2, "all"]
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    }
  }
}
