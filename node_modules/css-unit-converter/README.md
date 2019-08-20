# css-unit-converter [![Build Status][ci-img]][ci]

Converts CSS values from one unit to another

[PostCSS]: https://github.com/postcss/css-unit-converter
[ci-img]:  https://travis-ci.org/andyjansson/css-unit-converter.svg
[ci]:      https://travis-ci.org/andyjansson/css-unit-converter


## Installation

```js
npm install css-unit-converter
```

## Usage


```js
var convert = require('css-unit-converter');
//convert 1 inch to pc
convert(1, 'in', 'pc'); // 6

//convert 10px to cm with a maximum of 10 decimals
convert(10, 'px', 'cm', 10); // 0.2645833333
```
