# num2fraction

[![Build Status](https://travis-ci.org/yisibl/num2fraction.svg)](https://travis-ci.org/yisibl/num2fraction) 
[![NPM Downloads](https://img.shields.io/npm/dm/num2fraction.svg?style=flat)](https://www.npmjs.com/package/num2fraction) 
[![NPM Version](http://img.shields.io/npm/v/num2fraction.svg?style=flat)](https://www.npmjs.com/package/num2fraction) 
[![License](https://img.shields.io/npm/l/num2fraction.svg?style=flat)](http://opensource.org/licenses/MIT) 

> Converting Number to Fraction with Node.js.

## Installation

```console
npm install num2fraction
```

## Usage

```js
var π   = Math.PI
var n2f = require('num2fraction')
  console.log(n2f(0))                // => 0
  console.log(n2f(.2))               // => 1/5
  console.log(n2f(1.1))              // => 11/10
  console.log(n2f(1.2))              // => 6/5
  console.log(n2f(1.3))              // => 13/10
  console.log(n2f(1.4))              // => 7/5
  console.log(n2f(1.5))              // => 3/2
  console.log(n2f(2))                // => 2/1
  console.log(n2f(2.1))              // => 21/10
  console.log(n2f(3))                // => 3/1
  console.log(n2f(2.555))            // => 511/200
  console.log(n2f(8.36))             // => 209/25
  console.log(n2f('3em'))            // => 3/1
  console.log(n2f('1.5px'))          // => 3/2
  console.log(n2f(7 / 9)             // => 7/9
  console.log(n2f(8 / 9)             // => 8/9
  console.log(n2f(512 / 999)         // => 512/999
  console.log(n2f((2 * π / 3) / π)   // => 2/3
  console.log(n2f((8 * 5) / (4 / 2)) // => 20/1
```

## Example

Opera [old versions](http://www.opera.com/docs/specs/presto28/css/o-vendor/) support the non-standard `-o-min-device-pixel-ratio` or `-o-max-device-pixel-ratio` in CSS media queries.

```css
@media
  only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (   min--moz-device-pixel-ratio: 2),
  only screen and (     -o-min-device-pixel-ratio: 2/1), /* Opera */
  only screen and (        min-device-pixel-ratio: 2),
  only screen and (                min-resolution: 192dpi), /* fallback */
  only screen and (                min-resolution: 2dppx) { 

}
```

## Changelog

### v1.2.2

* \+ Remove: Debug log message.

### v1.2.1

* \+ Fix: 0 must be converted to a string.

### v1.2.0

* \+ Fix: Accomodate rounding errors. (by @jamestalmage)
* \+ Fix: The negative sign should be on numerator. (by @jamestalmage)

### v1.1.0

* \+ Use more precise (not fixed) precision factor for the calculation

### v1.0.1

* \- Remove "ci.testling.com"

### V1.0.0

> First release.

## License

[MIT](LICENSE)
