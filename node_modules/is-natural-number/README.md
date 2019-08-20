# is-natural-number.js

[![NPM version](https://img.shields.io/npm/v/is-natural-number.svg)](https://www.npmjs.com/package/is-natural-number)
[![Bower version](https://img.shields.io/bower/v/is-natural-number.svg)](https://github.com/shinnn/is-natural-number.js/releases)
[![Build Status](https://travis-ci.org/shinnn/is-natural-number.js.svg)](https://travis-ci.org/shinnn/is-natural-number.js)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/is-natural-number.js.svg)](https://coveralls.io/r/shinnn/is-natural-number.js?branch=master)
[![devDependency Status](https://david-dm.org/shinnn/is-natural-number.js/dev-status.svg)](https://david-dm.org/shinnn/is-natural-number.js#info=devDependencies)

Check if a value is a [natural number](https://wikipedia.org/wiki/Natural_number)

## Installation

### Package managers

#### [npm](https://www.npmjs.com/)

```
npm install is-natural-number
```

#### [Bower](http://bower.io/)

```
bower install is-natural-number
```

#### [Duo](http://duojs.org/)

```javascript
var isNaturalNumber = require('shinnn/is-natural-number.js');
```

### Standalone

[Download the script file directly.](https://raw.githubusercontent.com/shinnn/is-natural-number.js/master/is-natural-number.js)

## API

### isNaturalNumber(*number*, *option*)

*number*: `Number`  
*option*: `Object`  
Return: `Boolean`

It returns `true` if the first argument is one of the natural numbers. If not, or the argument is not a number, it returns `false`.

```javascript
isNaturalNumber(10); //=> true

isNaturalNumber(-10); //=> false
isNaturalNumber(10.5); //=> false
isNaturalNumber(Infinity); //=> false
isNaturalNumber('10'); //=> false
```

*Check [the test](./test.js) for more detailed specifications.*

#### option.includeZero

Type: `Boolean`
Default: `false`

By default the number `0` is not regarded as a natural number.

Setting this option `true` makes `0` regarded as a natural number.

```javascript
isNaturalNumber(0); //=> false
isNaturalNumber(0, {includeZero: true}); //=> true
```

## License

Copyright (c) 2014 - 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
