# hsla-regex

[![Build Status](https://secure.travis-ci.org/regexps/hsla-regex.png?branch=master)](https://travis-ci.org/regexps/hsla-regex)

Regex for matching HSLA colors.

## Installation

```bash
npm install --save hsla-regex
```

## Usage

```javascript
var hslaRegex = require('hsla-regex');

hslaRegex({ exact: true }).test('hsla(123, 45%, 67%, .8)');  // => true
hslaRegex({ exact: true }).test('foo bar');  // => false

hslaRegex({ exact: true }).exec('hsla(1, 1.111%, 1.1111%, .8)');
// => [
//  'hsla(1, 1.111%, 1.1111%, .8)',
//  '1',
//  '1.111%',
//  '1.1111%',
//  '.8'
//  index: 0,
//  input: 'hsla(1, 1.111%, 1.1111%, .8)'
// ]

'hsla(123, 45%, 67%, .8) cats and dogs'.match(hslaRegex());
// = ['hsla(123, 45%, 67%, .8)']
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
