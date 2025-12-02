import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tsEslintPlugin,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^\\u0000'],
            ['^react$', '^react-dom$', '^@?\\w'],
            ['^@features(/.*)?$', '^@entities(/.*)?$'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?!/?$)', '^\\./?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
      'react/react-in-jsx-scope': 'off',
      semi: ['error', 'always'],
      curly: ['error', 'all'],
      'no-console': 'warn',
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
