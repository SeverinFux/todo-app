import jsoncParser from 'jsonc-eslint-parser';
import jsonFormatPlugin from 'eslint-plugin-json-format';

/**
 * ESLint Configuration for Linting Only `package.json` Files
 */
export default [
  {
    files: ["package.json"],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      jsonFormat: jsonFormatPlugin,
    },
    rules: {
      // Enforce consistent indentation
      "json-format/sort-package-json": ["error"],

      // Ensure consistent double quotes in JSON
      "quotes": ["error", "double"],

      // Disallow trailing commas
      "comma-dangle": ["error", "never"],

      // Enforce specific key order in package.json
      "json-format/validate-order": ["error", {
        order: [
          "name",
          "version",
          "description",
          "keywords",
          "homepage",
          "bugs",
          "license",
          "author",
          "contributors",
          "files",
          "main",
          "module",
          "types",
          "scripts",
          "dependencies",
          "devDependencies",
          "peerDependencies",
          "optionalDependencies"
        ]
      }]
    },
  },
];
