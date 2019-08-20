# thunky

Delay the evaluation of a paramless async function and cache the result (see [thunk](http://en.wikipedia.org/wiki/Thunk_%28functional_programming%29)).

```
npm install thunky
```

[![build status](http://img.shields.io/travis/mafintosh/thunky.svg?style=flat)](http://travis-ci.org/mafintosh/thunky)

## Example

Let's make a simple function that returns a random number 1 second after it is called for the first time

``` js
var thunky = require('thunky')

var test = thunky(function (callback) { // the inner function should only accept a callback
  console.log('waiting 1s and returning random number')
  setTimeout(function () {
    callback(Math.random())
  }, 1000)
})

test(function (num) {  // inner function is called the first time we call test
  console.log(num) // prints random number
})

test(function (num) {  // subsequent calls waits for the first call to finish and return the same value
  console.log(num) // prints the same random number as above
})
```

## Lazy evaluation

Thunky makes it easy to implement a lazy evaluation pattern.

``` js
var getDb = thunky(function (callback) {
  db.open(myConnectionString, callback)
})

var queryDb = function (query, callback) {
  getDb(function (err, db) {
    if (err) return callback(err)
    db.query(query, callback)
  })
}

queryDb('some query', function (err, result) { ... } )

queryDb('some other query', function (err, result) { ... } )
```

The first time `getDb` is called it will try do open a connection to the database.
Any subsequent calls will just wait for the first call to complete and then call your callback.

A nice property of this pattern is that it *easily* allows us to pass any error caused by `getDb` to the `queryDb` callback.

## Error → No caching

If the thunk callback is called with an `Error` object as the first argument it will not cache the result

``` js
var fails = thunky(function (callback) {
  console.log('returning an error')
  callback(new Error('bad stuff'))
})

fails(function (err) { // inner function is called
  console.log(err)
});

fails(function (err) { // inner function is called again as it returned an error before
  console.log(err)
})
```

## License

MIT
