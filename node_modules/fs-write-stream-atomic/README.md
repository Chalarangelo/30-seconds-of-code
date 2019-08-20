# fs-write-stream-atomic

Like `fs.createWriteStream(...)`, but atomic.

Writes to a tmp file and does an atomic `fs.rename` to move it into
place when it's done.

First rule of debugging: **It's always a race condition.**

## USAGE

```javascript
var fsWriteStreamAtomic = require('fs-write-stream-atomic')
// options are optional.
var write = fsWriteStreamAtomic('output.txt', options)
var read = fs.createReadStream('input.txt')
read.pipe(write)

// When the write stream emits a 'finish' or 'close' event,
// you can be sure that it is moved into place, and contains
// all the bytes that were written to it, even if something else
// was writing to `output.txt` at the same time.
```

### `fsWriteStreamAtomic(filename, [options])`

* `filename` {String} The file we want to write to
* `options` {Object}
  * `chown` {Object} User and group to set ownership after write
    * `uid` {Number}
    * `gid` {Number}
  * `encoding` {String} default = 'utf8'
  * `mode` {Number} default = `0666`
  * `flags` {String} default = `'w'`

