'use strict';

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    es6: true,
  },
  globals: {
    exports: true,
    module: true,
    require: true,
    window: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    strict: ['warn', 'global'],
  },
  overrides: [
    {
      files: ['lib/implementedProperties.js', 'lib/properties.js'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
    {
      files: 'scripts/**/*',
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['scripts/**/*', 'tests/**/*'],
      env: {
        node: true,
      },
    },
  ],
};
