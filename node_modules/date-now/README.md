# date-now

[![build status][1]][2]

[![browser support][3]][4]

A requirable version of Date.now()

Use-case is to be able to mock out Date.now() using require interception.

## Example

```js
var now = require("date-now")

var ts = now()
var ts2 = Date.now()
assert.equal(ts, ts2)
```

## example of seed

```
var now = require("date-now/seed")(timeStampFromServer)

// ts is in "sync" with the seed value from the server
// useful if your users have their local time being a few minutes
// out of your server time.
var ts = now()
```

## Installation

`npm install date-now`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Colingo/date-now.png
  [2]: http://travis-ci.org/Colingo/date-now
  [3]: http://ci.testling.com/Colingo/date-now.png
  [4]: http://ci.testling.com/Colingo/date-now
