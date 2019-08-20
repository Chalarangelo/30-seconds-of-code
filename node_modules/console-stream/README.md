# console-stream

[![build status][1]][2]

[![browser support][3]][4]

A writable stream that writes to the console

Refactored out of [tape][5]

## Example

```js
var ConsoleStream = require("console-stream")

var stream = ConsoleStream()

stream.write("one")
stream.write("two\n")
// console.log('onetwo')
stream.write("three\nfour")
// console.log('three')
stream.end("five")
// console.log('fourfive')
```

## Installation

`npm install console-stream`

## Contributors

 - Raynos

## MIT Licenced


  [1]: https://secure.travis-ci.org/Raynos/console-stream.png
  [2]: http://travis-ci.org/Raynos/console-stream
  [3]: http://ci.testling.com/Raynos/console-stream.png
  [4]: http://ci.testling.com/Raynos/console-stream
  [5]: https://github.com/substack/tape/blob/028e858f85c6916a730dca183c00469ebb869729/lib/default_stream.js
