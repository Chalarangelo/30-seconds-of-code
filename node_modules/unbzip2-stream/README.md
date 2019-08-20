[![npm version](https://badge.fury.io/js/unbzip2-stream.svg)](http://badge.fury.io/js/unbzip2-stream)

unbzip2-stream
===
streaming bzip2 decompressor in pure JS for Node and browserify.

Buffers
---
When browserified, the stream emits instances of [feross/buffer](https://github.com/feross/buffer) instead of raw Uint8Arrays to have a consistant API across browsers and Node.

Usage
---
``` js
var bz2 = require('unbzip2-stream');
var fs = require('fs');

// decompress test.bz2 and output the result
fs.createReadStream('./test.bz2').pipe(bz2()).pipe(process.stdout);
```

Also see [test/browser/download.js](https://github.com/regular/unbzip2-stream/blob/master/test/browser/download.js) for an example of decompressing a file while downloading.

Or, using a <script> tag
---

```
<script src="https://npm-cdn.info/unbzip2-stream/dist/unbzip2-stream.min.js"></script>
<script>
    var myStream = window.unbzip2Stream();
    // now pipe stuff through it (see above)
</script>
```

Tests
---
To run tests in Node:

    npm run test

To run tests in PhantomJS

    npm run browser-test

Additional Tests
----------------
There are two more tests that specifically test decompression of a very large file. Because I don't want to include large binary files in this repository, the files are created by running an npm script.

    npm run prepare-long-test

You can now

    npm run long-test

And to run a test in chrome that downloads and decompresses a large binary file

    npm run download-test

Open the browser's console to see the output.

