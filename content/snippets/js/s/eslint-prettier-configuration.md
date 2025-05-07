---
title: ESLint & Prettier configuration
language: javascript
tags: [webdev]
cover: interior-12
excerpt: Instead of reconfiguring ESLint and Prettier every time, I use this configuration to get started quickly.
listed: true
dateModified: 2025-05-28
---

I've been starting a lot of new mini projects lately, and I believe a properly set up linter and formatter are essential for a good development experience. Instead of reconfiguring my environment every time, I use this simple configuration to get started quickly.

> [!WARNING]
>
> This is my **very opinionated configuration**, and you may want to adjust it to your liking.

<code-tabs full-width="true">

```js title="eslint.config.js"
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from './globals.js';

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module',
      globals: { ...globals },
    },
    rules: {
      'no-duplicate-imports': 'error',
      'no-useless-computed-key': 'error',
      'no-console': 'off',
      eqeqeq: ['error', 'smart'],
      curly: 'off',
      'object-shorthand': ['warn', 'always'],
      camelcase: ['warn', { properties: 'always' }],
      'no-extend-native': 'error',
      'no-loop-func': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-label-var': 'error',
      'no-multi-str': 'error',
      'no-script-url': 'error',
      'no-shadow-restricted-names': 'error',
      'no-spaced-func': 'error',
      'no-sparse-arrays': 'warn',
      'no-fallthrough': 'warn',
      'no-caller': 'error',
      'no-eval': 'error',
      'no-negated-in-lhs': 'error',
      'no-new': 'error',
      'no-new-require': 'error',
      'block-scoped-var': 'error',
      'no-use-before-define': 'warn',
      'no-proto': 'error',
      complexity: ['warn', 50],
      'new-parens': 'error',
      yoda: ['error', 'never'],
      'no-useless-assignment': 'error',
    },
  },
];
```

```json title=".prettierrc"
{
  "printWidth": 80,
  "arrowParens": "avoid",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "objectWrap": "collapse"
}
```

</code-tabs>

## Package versions

This setup is optimized for **ESLint & Prettier**, and revised for versions `9.24.0` and `3.5.3` of `eslint` and `prettier`, respectively. I also use `eslint-config-prettier` for compatibility between the two tools.

Finally, you'll notice an imported `globals.js` file. I'm not 100% sure where I got mine, but you can grab one from [this amazing GitHub repository](https://github.com/sindresorhus/globals) or install the package `globals` from npm. This file contains a list of **global variables** that are available in various environments, such as Node.js, browsers, and more. It helps ESLint understand which variables are defined globally in your code.

## ESLint

ESLint has a ton of rules and I can't possibly hope to cover them all myself. The defaults are pretty good, but some tweaks are necessary to make it match my taste and the setup most of the teams I work with use.

> [!NOTE]
>
> As I've recently moved to ESLint `9.x.x`, some of the **stylistic rules** I used to use are now deprecated in favor of [`@stylistic/eslint-plugin-js`](https://eslint.style/packages/js). I will be updating this configuration to use that plugin in the future to leverage its full potential.

### General setup

- `js.configs.recommended`: Use the recommended ESLint configuration.
- `eslintConfigPrettier`: Compatibility with Prettier.
- `languageOptions`:
  - `ecmaVersion`: Set to `2025` to use the latest JavaScript features.
  - `sourceType`: Set to `module` to use ESM.
  - `globals`: Import the globals from the `globals.js` file (see above).

### Rules

- `no-duplicate-imports`: Disallow duplicate imports.
- `no-useless-computed-key`: Disallow unnecessary computed property keys.
- `no-console`: Allow `console` statements (you may want to change this in production).
- `eqeqeq`: Enforce strict equality checks (`===` and `!==`).
- `curly`: Disabled, as I prefer to use `if` statements without braces when possible.
- `object-shorthand`: Warn if object literals are not using shorthand syntax.
- `camelcase`: Warn if camelCase naming convention aren't followed for object properties.
- `no-extend-native`: Disallow extending native objects.
- `no-loop-func`: Disallow function declarations that are nested inside loops.
- `no-implied-eval`: Disallow implied `eval()`.
- `no-iterator`: Disallow the use of `__iterator__` property.
- `no-label-var`: Disallow labels that are also variable names.
- `no-multi-str`: Disallow multiline strings.
- `no-script-url`: Disallow `javascript:` URLs.
- `no-shadow-restricted-names`: Disallow shadowing of restricted names.
- `no-sparse-arrays`: Warn about sparse arrays.
- `no-fallthrough`: Warn on fallthrough cases in switch statements.
- `no-caller`: Disallow the use of `arguments.caller` or `arguments.callee`.
- `no-eval`: Disallow the use of `eval()`.
- `no-negated-in-lhs`: Disallow negation of the left operand in `in` expressions.
- `no-new`: Disallow the use of `new` without assignment.
- `no-new-require`: Disallow `new` for `require()` calls.
- `block-scoped-var`: Enforce block scoping for variables.
- `no-use-before-define`: Warn about using variables before they are defined.
- `no-proto`: Disallow the use of `__proto__`.
- `complexity`: Warn about complex functions.
- `new-parens`: Enforce parentheses for constructor calls.
- `yoda`: Enforce Yoda conditions (e.g., `if (true === condition)`).
- `no-useless-assignment`: Disallow unnecessary assignments.

## Prettier

Prettier's setup is really straightforward:

- `printWidth`: I don't like long lines of code, hence the `80` character limit.
- `arrowParens`: I prefer to avoid parentheses in arrow function if possible.
- `singleQuote`: Single quotes seem less cluttered to me.
- `tabWidth`: Naturally, 2 spaces, for uniformity. Your mileage may vary.
- `useTabs`: Spaces over tabs, always.
- `semi`: Force semicolons at the end of statements. I may change this in the future.
- `trailingComma`: This is probably the most controversial one, but I find that adding trailing commas in multiline objects and arrays is friendlier to version control.
- `bracketSpacing`: Space inside brackets for better readability.
- `objectWrap`: Collapse objects to a single line if possible. It helps with longer files, but I don't feel super strongly about it.

