module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    plugins: [
      'unused-imports',
    ],
    rules: {
      'no-unused-vars': 'warn', // Warn about unused variables
      'unused-imports/no-unused-imports': 'error', // Error on unused imports
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
      ], // Warn about unused variables after removing unused imports
    },
  };
  