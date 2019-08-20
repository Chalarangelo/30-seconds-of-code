# vendors

[![Build][build-badge]][build]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

<!--lint disable no-html-->

List of (real<sup>†</sup>) vendor prefixes known to the web platform.
From [Wikipedia][wiki] and the [CSS 2.1 spec][spec].

† — real, as in, `mso-` and `prince-` are not included because they are
not valid.

## Installation

[npm][]:

```bash
npm install vendors
```

## Usage

```javascript
var vendors = require('vendors')

console.log(vendors)
```

Yields:

```js
[ 'ah',
  'apple',
  'atsc',
  'epub',
  'hp',
  'khtml',
  'moz',
  'ms',
  'o',
  'rim',
  'ro',
  'tc',
  'wap',
  'webkit',
  'xv' ]
```

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/vendors.svg

[build]: https://travis-ci.org/wooorm/vendors

[downloads-badge]: https://img.shields.io/npm/dm/vendors.svg

[downloads]: https://www.npmjs.com/package/vendors

[size-badge]: https://img.shields.io/bundlephobia/minzip/vendors.svg

[size]: https://bundlephobia.com/result?p=vendors

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[wiki]: https://en.wikipedia.org/wiki/CSS_hack#Browser_prefixes

[spec]: https://www.w3.org/TR/CSS21/syndata.html#vendor-keyword-history
