module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'import-helpers'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 'error',

    'no-undef': 'error',
    'no-return-await': 'error',
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '_',
      },
    ],

    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/@nestjs/',
          '/^.*nestjs*/',
          'module',

          '/^.*health/',
          '/^.*resourceStatus/',
          '/^.*auth/',
          '/^.*user-jwt/',

          '/^.*controllers/',
          '/^.*models/',
          '/^.*builders/',
          '/^.*dtos/',
          '/^.*services/',
          '/^.*enumerations/',

          '/^.*logger/',
          '/^.*paginate/',
          '/^.*util/',
          '/^.*config/',

          '/^.*middleware/',

          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};
