import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  // Disable ESLint formatting rules - let Biome handle formatting
  {
    rules: {
      // Disable stylistic rules that conflict with Biome
      'indent': 'off',
      'quotes': 'off',
      'semi': 'off',
      'comma-dangle': 'off',
      'comma-spacing': 'off',
      'object-curly-spacing': 'off',
      'arrow-parens': 'off',
      'space-before-function-paren': 'off',
      'no-trailing-spaces': 'off',
      'no-multiple-empty-lines': 'off',
      'eol-last': 'off',

      // Keep Next.js and React-specific rules active
      // ESLint handles what Biome doesn't cover yet
    },
  },
]);

export default eslintConfig;
