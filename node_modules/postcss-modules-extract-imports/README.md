# CSS Modules: Extract Imports

[![Build Status](https://travis-ci.org/css-modules/postcss-modules-extract-imports.svg?branch=master)](https://travis-ci.org/css-modules/postcss-modules-extract-imports)

Transforms:

```css
:local(.continueButton) {
  composes: button from "library/button.css";
  color: green;
}
```

into:

```css
:import("library/button.css") {
  button: __tmp_487387465fczSDGHSABb;
}
:local(.continueButton) {
  composes: __tmp_487387465fczSDGHSABb;
  color: green;
}
```

## Specification

- Only a certain whitelist of properties are inspected. Currently, that whitelist is `['composes']` alone.
- An extend-import has the following format:
```
composes: className [... className] from "path/to/file.css";
```

## Building

```
npm install
npm build
npm test
```

[![Build Status](https://travis-ci.org/css-modules/postcss-modules-extract-imports.svg?branch=master)](https://travis-ci.org/css-modules/postcss-modules-extract-imports)

* Lines: [![Coverage Status](https://coveralls.io/repos/css-modules/postcss-modules-extract-imports/badge.svg?branch=master)](https://coveralls.io/r/css-modules/postcss-modules-extract-imports?branch=master)
* Statements: [![codecov.io](http://codecov.io/github/css-modules/postcss-modules-extract-imports/coverage.svg?branch=master)](http://codecov.io/github/css-modules/postcss-modules-extract-imports?branch=master)

## Development

- `npm watch` will watch `src` for changes and rebuild
- `npm autotest` will watch `src` and `test` for changes and retest

## License

ISC

## With thanks

- Mark Dalgleish
- Tobias Koppers
- Guy Bedford

---
Glen Maddern, 2015.
