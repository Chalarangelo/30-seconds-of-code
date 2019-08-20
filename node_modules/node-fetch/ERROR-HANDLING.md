
Error handling with node-fetch
==============================

Because `window.fetch` isn't designed to transparent about the cause of request errors, we have to come up with our own solutions.

The basics:

- All [operational errors](https://www.joyent.com/node-js/production/design/errors) are rejected as [FetchError](https://github.com/bitinn/node-fetch/blob/master/lib/fetch-error.js), you can handle them all through promise `catch` clause.

- All errors comes with `err.message` detailing the cause of errors.

- All errors originated from `node-fetch` are marked with custom `err.type`.

- All errors originated from Node.js core are marked with `err.type = system`, and contains addition `err.code` and `err.errno` for error handling, they are alias to error codes thrown by Node.js core.

- [Programmer errors](https://www.joyent.com/node-js/production/design/errors) are either thrown as soon as possible, or rejected with default `Error` with `err.message` for ease of troubleshooting.

List of error types:

- Because we maintain 100% coverage, see [test.js](https://github.com/bitinn/node-fetch/blob/master/test/test.js) for a full list of custom `FetchError` types, as well as some of the common errors from Node.js
