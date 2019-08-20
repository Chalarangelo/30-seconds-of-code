# state-toggle

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Enter/exit a state.

## Installation

[npm][]:

```bash
npm install state-toggle
```

## Usage

```javascript
var toggle = require('state-toggle')

var ctx = {on: false}
var enter = toggle('on', ctx.on, ctx)
var exit

// Entering:
exit = enter()
console.log(ctx.on) // => true

// Exiting:
exit()
console.log(ctx.on) // => false
```

## API

### `toggle(key, initial[, ctx])`

Create a toggle, which when entering toggles `key` on `ctx` (or `this`,
if `ctx` is not given) to `!initial`, and when exiting, sets `key` on
the context back to the value it had before entering.

###### Returns

`Function` — [`enter`][enter].

### `enter()`

Enter the state.

###### Context

If no `ctx` was given to `toggle`, the context object (`this`) of `enter()`
is used to toggle.

###### Returns

`Function` — [`exit`][exit].

### `exit()`

Exit the state, reverting `key` to the value it had before entering.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/state-toggle.svg

[build]: https://travis-ci.org/wooorm/state-toggle

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/state-toggle.svg

[coverage]: https://codecov.io/github/wooorm/state-toggle

[downloads-badge]: https://img.shields.io/npm/dm/state-toggle.svg

[downloads]: https://www.npmjs.com/package/state-toggle

[size-badge]: https://img.shields.io/bundlephobia/minzip/state-toggle.svg

[size]: https://bundlephobia.com/result?p=state-toggle

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[enter]: #enter

[exit]: #exit
