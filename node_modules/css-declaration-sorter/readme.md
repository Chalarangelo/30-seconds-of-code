<img alt='CSS declaration sorter logo' src='https://cdn.rawgit.com/Siilwyn/css-declaration-sorter/master/logo.svg' height='260' align='right'>

# CSS Declaration Sorter
[![Travis Build Status][travis-icon]][travis]
[![npm version][npm-icon]][npm]
[![David Dependencies Status][david-icon]][david]
[![David devDependencies Status][david-dev-icon]][david-dev]

A Node.js module and [PostCSS] plugin to sort CSS declarations based on their property names. Ensuring the CSS is organized, more consistent and in order... Besides, sorted CSS is smaller when gzipped because there will be more similar strings. The intention of this module is to sort the source CSS code of a project in the build process. Check out [the Atom package](https://github.com/Siilwyn/css-declaration-sorter-atom) for individual usage.

## Alphabetical example
Input:
```css
body {
    display: block;
    animation: none;
    color: #C55;
    border: 0;
}
```

Output:
```css
body {
    animation: none;
    border: 0;
    color: #C55;
    display: block;
}
```

## Niceness
- Up-to-date CSS properties fetched from the [MDN Web Platform](https://developer.mozilla.org/).
- Sort using your own defined order.
- Nested rules sorting support.
- Less and SCSS support when combined with either [postcss-scss](https://github.com/postcss/postcss-scss) or [postcss-less](https://github.com/webschik/postcss-less).
- Thought-out sorting orders out of the box, **approved by their authors**.

## Sorting orders
- Alphabetically  
`alphabetically`  
*Default, ordering in a simple alphabetical manner from a - z.*

- [SMACSS](https://smacss.com/book/formatting#grouping)  
`smacss`  
*Ordering from most important, flow affecting properties, to least important properties.*
  - Box
  - Border
  - Background
  - Text
  - Other

- [Concentric CSS](https://github.com/brandon-rhodes/Concentric-CSS)  
`concentric-css`  
*Starts outside the box model, moves inward.*
  - Positioning
  - Visibility
  - Box model
  - Dimensions
  - Text

- Custom order  
*Provide your own order by passing the location of a JSON file containing an array.*

## Usage
`npm install css-declaration-sorter --save-dev`

### CLI
This module does not include its own CLI but works with the official [PostCSS CLI](https://github.com/postcss/postcss-cli). To use the examples below, install `postcss-cli` or prefix with `npx`.

Piping out result from file:  
`postcss input.css --use css-declaration-sorter | cat`

Sorting multiple files by overwriting:  
`postcss *.css --use css-declaration-sorter --replace --no-map`

### Vanilla JS
```js
const fs = require('fs');
const postcss = require('postcss');
const cssDeclarationSorter = require('css-declaration-sorter');

postcss([cssDeclarationSorter({order: 'smacss'})])
  .process(fs.readFileSync('some.css'))
  .then(function (result) {
    fs.writeFileSync('some.css', result.css);
  });
```

### Gulp
```js
const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const cssDeclarationSorter = require('css-declaration-sorter');

gulp.task('css', function () {
  return gulp.src('some.css')
    .pipe(gulpPostcss([cssDeclarationSorter({order: 'smacss'})]))
    .pipe(gulp.dest('./'));
});
```
See [PostCSS] documentation for more examples and other environments.

[PostCSS]: https://github.com/postcss/postcss
[travis]: https://travis-ci.org/Siilwyn/css-declaration-sorter
[travis-icon]: https://img.shields.io/travis/Siilwyn/css-declaration-sorter/master.svg?style=flat-square
[npm]: https://npmjs.com/css-declaration-sorter
[npm-icon]: https://img.shields.io/npm/v/css-declaration-sorter.svg?style=flat-square
[david]: https://david-dm.org/Siilwyn/css-declaration-sorter
[david-icon]: https://img.shields.io/david/Siilwyn/css-declaration-sorter.svg?style=flat-square
[david-dev]: https://david-dm.org/Siilwyn/css-declaration-sorter?type=dev
[david-dev-icon]: https://img.shields.io/david/dev/Siilwyn/css-declaration-sorter.svg?style=flat-square
