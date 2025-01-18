import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest', // Supports the latest ECMAScript features
    sourceType: 'module', // Allows the use of imports
    tsconfigRootDir: __dirname, // Root directory for TypeScript
    project: ['./tsconfig.json'], // Path to the tsconfig file
  },
  env: {
    browser: true, // Enables browser globals like window and document
    es2021: true, // Enables modern ES features
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'prettier'],
  rules: {
    '@typescript-eslint/triple-slash-reference': 'off', // Disables triple-slash reference errors
    'prettier/prettier': 'warn', // Ensures Prettier formatting
    'no-console': 'warn', // Warns about console.log usage
    'no-debugger': 'error', // Disallows debugger statements
  },
  overrides: [],
});
