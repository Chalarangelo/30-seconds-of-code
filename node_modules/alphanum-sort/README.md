# alphanum-sort
[![Build Status](https://travis-ci.org/TrySound/alphanum-sort.svg?branch=master)](https://travis-ci.org/TrySound/alphanum-sort)

> Alphanumeric sorting algorithm

## Install

With [npm](https://npmjs.org/package/alphanum-sort) do:

```
npm i alphanum-sort -S
```

## Example

```js
var sort = require('alphanum-sort');

var result = sort(['item20', 'item19', 'item1', 'item10', 'item2']);
// ['item1', 'item2', 'item10', 'item19', 'item20']
```

## API

### alphanumSort(array, options)

#### options

##### insensitive

Type: `Boolean`
Default: `false`

Compares items case insensitively

##### sign

Type: `Boolean`
Default: `false`

Allows `+` and `-` characters before numbers

## License

MIT © [Bogdan Chadkin](https://github.com/trysound)
