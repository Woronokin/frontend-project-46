import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    ignores: ['node_modules/', 'dist/', 'build/', '*.min.js', 'coverage/'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
        process: 'readonly',
        console: 'writable',
      },
    },
    rules: {
      'constructor-super': 'off',
    },
  },
];