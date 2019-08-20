# prr [![Build Status](https://secure.travis-ci.org/rvagg/prr.png)](http://travis-ci.org/rvagg/prr)

An sensible alternative to `Object.defineProperty()`. Available in npm and Ender as **prr**.

## Usage

Set the property `'foo'` (`obj.foo`) to have the value `'bar'` with default options (`'enumerable'`, `'configurable'` and `'writable'` are all `false`):

```js
prr(obj, 'foo', 'bar')
```

Adjust the default options:

```js
prr(obj, 'foo', 'bar', { enumerable: true, writable: true })
```

Do the same operation for multiple properties:

```js
prr(obj, { one: 'one', two: 'two' })
// or with options:
prr(obj, { one: 'one', two: 'two' }, { enumerable: true, writable: true })
```

### Simplify!

But obviously, having to write out the full options object makes it nearly as bad as the original `Object.defineProperty()` so we can simplify.

As an alternative method we can use an options string where each character represents a option: `'e'=='enumerable'`, `'c'=='configurable'` and `'w'=='writable'`:

```js
prr(obj, 'foo', 'bar', 'ew') // enumerable and writable but not configurable
// muliple properties:
prr(obj, { one: 'one', two: 'two' }, 'ewc') // configurable too
```

## Where can I use it?

Anywhere! For pre-ES5 environments *prr* will simply fall-back to an `object[property] = value` so you can get close to what you want.

*prr* is Ender-compatible so you can include it in your Ender build and `$.prr(...)` or `var prr = require('prr'); prr(...)`.

## Licence

prr is Copyright (c) 2013 Rod Vagg [@rvagg](https://twitter.com/rvagg) and licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE.md file for more details.
