module.exports = {
  env: {
    browser: true,
    es2021: true,
    "cypress/globals": true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    "airbnb",
    "airbnb-typescript",
    "plugin:import/typescript",
    "eslint:recommended",
    "plugin:jest/recommended",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: "./tsconfig.app.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', '@typescript-eslint/eslint-plugin'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    "linebreak-style": 0,
    "global-require": 0,
    "eslint linebreak-style": [0, "error", "windows"],
    "no-console": "error",
    "import/no-extraneous-dependencies": 'off',
    'react/function-component-definition': [
     "off"
    ],
    "react/require-default-props": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
  overrides: [
    {
      "files": ["**/*.cy.{js,jsx,ts,tsx}"],
      "extends": ["plugin:cypress/recommended"],
      "rules": {
        "jest/expect-expect": "off",
        "no-undef": "off",
      }
    }
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
