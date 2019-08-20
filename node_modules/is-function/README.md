# is-function

[![browser support](https://ci.testling.com/grncdr/js-is-function.png)](https://ci.testling.com/grncdr/js-is-function)

Is that thing a function? Use this module to find out.

## API

### module.exports = function isFunction(fn) -> Boolean

Return `true` if `fn` is a function, otherwise `false`.

## Why not typeof fn === 'function'

Because certain old browsers misreport the type of `RegExp` objects as functions.

## Acknowledgements

I stole this from https://github.com/ljharb/object-keys

## License

MIT
