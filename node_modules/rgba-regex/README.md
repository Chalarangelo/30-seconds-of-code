# rgba-regex

[![Build Status](https://secure.travis-ci.org/regexps/rgba-regex.png?branch=master)](https://travis-ci.org/regexps/rgba-regex)

Regex for matching RGBA color strings.

## Installation

```bash
npm install --save rgba-regex
```

## Usage

```javascript
var rgbaRegex = require('rgba-regex');

rgbaRegex({ exact: true }).test('rgba(12, 34, 56, .8)');  // => true
rgbaRegex({ exact: true }).test('unicorns');         // -> false
rgbaRegex({ exact: true }).test('rgba(,,,)');          // => false

rgbaRegex().exec('rgba(12, 34, 56, .8)');
// => [
//  '12',
//  '34',
//  '56',
//  '.8'
//  index: 0,
//  input: 'rgba(12,34,56, .8)'
// ]

'rgba(12, 34, 56, .8) cats and dogs'.match(rgbaRegex());
// = ['rgba(12, 34, 56, .8)']
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
