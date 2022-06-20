module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
    sourceType: "module",
  },
  env: {
    es6: true,
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "@typescript-eslint/no-empty-function": "warn",
    "func-style": ["error", "expression"],
    "react/display-name": "off",
    "react/jsx-key": ["error", { checkFragmentShorthand: false }],
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "require-atomic-updates": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowExpressions: true,
      },
    ],
    "@typescript-eslint/no-use-before-define": "warn",
    "react/prop-types": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-var": "error",
    "arrow-parens": ["error", "always"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: true,
        },
      },
      {
        selector: "typeAlias",
        format: ["PascalCase"],
        custom: {
          regex: "^T[A-Z]",
          match: true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
