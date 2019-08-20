# rgb-regex

[![Build Status](https://secure.travis-ci.org/regexps/rgb-regex.png?branch=master)](https://travis-ci.org/regexps/rgb-regex)

Regex for RGB color strings.

## Installation

```bash
npm install --save rgb-regex
```

## Usage

```javascript
var rgbRegex = require('rgb-regex');

rgbRegex({ exact: true }).test('rgb(12, 34, 56)');  // => true
rgbRegex({ exact: true }).test('unicorns');         // -> false
rgbRegex({ exact: true }).test('rgb(,,)');          // => false

rgbRegex().exec('rgb(12, 34, 56)');
// => [
//  '12',
//  '34',
//  '56',
//  index: 0,
//  input: 'rgb(12,34,56)'
// ]

'rgb(12, 34, 56) cats and dogs'.match(rgbRegex());
// = ['rgb(12, 34, 56)']
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
