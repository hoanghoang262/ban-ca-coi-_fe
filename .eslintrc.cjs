// .eslintrc.js
module.exports = {
  root: true, // Prevent ESLint from looking for configurations in parent folders
  env: {
    browser: true, // Enable browser global variables
    node: true,    // Enable Node.js global variables
    es2022: true,  // Enable ECMAScript 2022 features
  },
  parser: '@typescript-eslint/parser', // Use @typescript-eslint/parser for TypeScript
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript standard
    sourceType: 'module', // Enable ES modules
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
  settings: {
    react: {
      version: 'detect', // Auto-detect the React version
    },
  },
  plugins: [
    'react', // React specific linting rules
    '@typescript-eslint', // TypeScript specific linting rules
  ],
  extends: [
    'eslint:recommended', // ESLint recommended rules
    'plugin:react/recommended', // React recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
    'prettier', // Disable ESLint rules that would conflict with Prettier
  ],
  rules: {
    // Customize rules as needed
    'react/react-in-jsx-scope': 'off', // Not required with React 17+
    '@typescript-eslint/no-unused-vars': 'warn', // Warn on unused variables
  },
  ignorePatterns: [
    'node_modules/', // Ignore node_modules
    'dist/', // Ignore build output
    '.eslintrc.js', // Ignore ESLint config file
    'vite.config.ts',
    'postcss.config.js',
    'tailwind.config.js',
  ],
};
