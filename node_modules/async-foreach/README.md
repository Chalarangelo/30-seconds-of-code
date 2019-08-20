# JavaScript Sync/Async forEach

An optionally-asynchronous forEach with an interesting interface.

## Getting Started

This code should work just fine in Node.js:

First, install the module with: `npm install async-foreach`

```javascript
var forEach = require('async-foreach').forEach;
forEach(["a", "b", "c"], function(item, index, arr) {
  console.log("each", item, index, arr);
});
// logs:
// each a 0 ["a", "b", "c"]
// each b 1 ["a", "b", "c"]
// each c 2 ["a", "b", "c"]
```

Or in the browser:

```html
<script src="dist/ba-foreach.min.js"></script>
<script>
forEach(["a", "b", "c"], function(item, index, arr) {
  console.log("each", item, index, arr);
});
// logs:
// each a 0 ["a", "b", "c"]
// each b 1 ["a", "b", "c"]
// each c 2 ["a", "b", "c"]
</script>
```

In the browser, you can attach the forEach method to any object.

```html
<script>
this.exports = Bocoup.utils;
</script>
<script src="dist/ba-foreach.min.js"></script>
<script>
Bocoup.utils.forEach(["a", "b", "c"], function(item, index, arr) {
  console.log("each", item, index, arr);
});
// logs:
// each a 0 ["a", "b", "c"]
// each b 1 ["a", "b", "c"]
// each c 2 ["a", "b", "c"]
</script>
```

## The General Idea (Why I thought this was worth sharing)

The idea is to allow the callback to decide _at runtime_ whether the loop will be synchronous or asynchronous. By using `this` in a creative way (in situations where that value isn't already spoken for), an entire control API can be offered without over-complicating function signatures.

```javascript
forEach(arr, function(item, index) {
  // Synchronous.
});

forEach(arr, function(item, index) {
  // Only when `this.async` is called does iteration becomes asynchronous. The
  // loop won't be continued until the `done` function is executed.
  var done = this.async();
  // Continue in one second.
  setTimeout(done, 1000);
});

forEach(arr, function(item, index) {
  // Break out of synchronous iteration early by returning false.
  return index !== 1;
});

forEach(arr, function(item, index) {
  // Break out of asynchronous iteration early...
  var done = this.async();
  // ...by passing false to the done function.
  setTimeout(function() {
    done(index !== 1);
  });
});
```

## Examples
See the unit tests for more examples.

```javascript
// Generic "done" callback.
function allDone(notAborted, arr) {
  console.log("done", notAborted, arr);
}

// Synchronous.
forEach(["a", "b", "c"], function(item, index, arr) {
  console.log("each", item, index, arr);
}, allDone);
// logs:
// each a 0 ["a", "b", "c"]
// each b 1 ["a", "b", "c"]
// each c 2 ["a", "b", "c"]
// done true ["a", "b", "c"]

// Synchronous with early abort.
forEach(["a", "b", "c"], function(item, index, arr) {
  console.log("each", item, index, arr);
  if (item === "b") { return false; }
}, allDone);
// logs:
// each a 0 ["a", "b", "c"]
// each b 1 ["a", "b", "c"]
// done false ["a", "b", "c"]

// Asynchronous.
forEach(["a", "b", "c"], function(item, index, arr) {
  console.log("each", item, index, arr);
  var done = this.async();
  setTimeout(function() {
    done();
  }, 500);
}, allDone);
// logs:
// each a 0 ["a", "b", "c"]
// each b 1 ["a", "b", "c"]
// each c 2 ["a", "b", "c"]
// done true ["a", "b", "c"]

// Asynchronous with early abort.
forEach(["a", "b", "c"], function(item, index, arr) {
  console.log("each", item, index, arr);
  var done = this.async();
  setTimeout(function() {
    done(item !== "b");
  }, 500);
}, allDone);
// logs:
// each a 0 ["a", "b", "c"]
// each b 1 ["a", "b", "c"]
// done false ["a", "b", "c"]

// Not actually asynchronous.
forEach(["a", "b", "c"], function(item, index, arr) {
  console.log("each", item, index, arr);
  var done = this.async()
  done();
}, allDone);
// logs:
// each a 0 ["a", "b", "c"]
// each b 1 ["a", "b", "c"]
// each c 2 ["a", "b", "c"]
// done true ["a", "b", "c"]

// Not actually asynchronous with early abort.
forEach(["a", "b", "c"], function(item, index, arr) {
  console.log("each", item, index, arr);
  var done = this.async();
  done(item !== "b");
}, allDone);
// logs:
// each a 0 ["a", "b", "c"]
// each b 1 ["a", "b", "c"]
// done false ["a", "b", "c"]
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

## Release History

04/29/2013
v0.1.3
Removed hard Node.js version dependency.

11/17/2011
v0.1.2
Adding sparse array support.
Invalid length properties are now sanitized.
This closes issue #1 (like a boss).

11/11/2011
v0.1.1
Refactored code to be much simpler. Yay for unit tests!

11/11/2011
v0.1.0
Initial Release.

## License
Copyright (c) 2012 "Cowboy" Ben Alman  
Licensed under the MIT license.  
<http://benalman.com/about/license/>
