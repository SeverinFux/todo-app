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
    },
  },
];
