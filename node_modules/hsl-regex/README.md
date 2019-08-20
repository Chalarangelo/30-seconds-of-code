# hsl-regex

[![Build Status](https://secure.travis-ci.org/regexps/hsl-regex.png?branch=master)](https://travis-ci.org/regexps/hsl-regex)

Regex for matching HSL colors.

## Installation

```bash
npm install --save hsl-regex
```

## Usage

```javascript
var hslRegex = require('hsl-regex');

hslRegex({ exact: true }).test('hsl(123, 45%, 67%)');  // => true
hslRegex({ exact: true }).test('foo bar');  // => false

hslRegex({ exact: true }).exec('hsl(1, 1.111%, 1.1111%)');
// => [
//  'hsl(1, 1.111%, 1.1111%)',
//  '1',
//  '1.111%',
//  '1.1111%',
//  index: 0,
//  input: 'hsl(1, 1.111%, 1.1111%)'
// ]

'hsl(123, 45%, 67%) cats and dogs'.match(hslRegex());
// = ['hsl(123, 45%, 67%)']
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
