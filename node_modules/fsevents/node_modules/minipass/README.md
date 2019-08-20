# minipass

A _very_ minimal implementation of a [PassThrough
stream](https://nodejs.org/api/stream.html#stream_class_stream_passthrough)

[It's very
fast](https://docs.google.com/spreadsheets/d/1oObKSrVwLX_7Ut4Z6g3fZW-AX1j1-k6w-cDsrkaSbHM/edit#gid=0)
for objects, strings, and buffers.

Supports pipe()ing (including multi-pipe() and backpressure
transmission), buffering data until either a `data` event handler or
`pipe()` is added (so you don't lose the first chunk), and most other
cases where PassThrough is a good idea.

There is a `read()` method, but it's much more efficient to consume
data from this stream via `'data'` events or by calling `pipe()` into
some other stream.  Calling `read()` requires the buffer to be
flattened in some cases, which requires copying memory.

There is also no `unpipe()` method.  Once you start piping, there is
no stopping it!

If you set `objectMode: true` in the options, then whatever is written
will be emitted.  Otherwise, it'll do a minimal amount of Buffer
copying to ensure proper Streams semantics when `read(n)` is called.

This is not a `through` or `through2` stream.  It doesn't transform
the data, it just passes it right through.  If you want to transform
the data, extend the class, and override the `write()` method.  Once
you're done transforming the data however you want, call
`super.write()` with the transform output.

For an example of a stream that extends MiniPass to provide transform
capabilities, check out [minizlib](http://npm.im/minizlib).

## USAGE

```js
const MiniPass = require('minipass')
const mp = new MiniPass(options) // optional: { encoding }
mp.write('foo')
mp.pipe(someOtherStream)
mp.end('bar')
```

### collecting

```js
mp.collect().then(all => {
  // all is an array of all the data emitted
  // encoding is supported in this case, so
  // so the result will be a collection of strings if
  // an encoding is specified, or buffers/objects if not.
  //
  // In an async function, you may do
  // const data = await stream.collect()
})
```

### iteration

You can iterate over streams synchronously or asynchronously in
platforms that support it.

Synchronous iteration will end when the currently available data is
consumed, even if the `end` event has not been reached.  In string and
buffer mode, the data is concatenated, so unless multiple writes are
occurring in the same tick as the `read()`, sync iteration loops will
generally only have a single iteration.

To consume chunks in this way exactly as they have been written, with
no flattening, create the stream with the `{ objectMode: true }`
option.

```js
const mp = new Minipass({ objectMode: true })
mp.write('a')
mp.write('b')
for (let letter of mp) {
  console.log(letter) // a, b
}
mp.write('c')
mp.write('d')
for (let letter of mp) {
  console.log(letter) // c, d
}
mp.write('e')
mp.end()
for (let letter of mp) {
  console.log(letter) // e
}
for (let letter of mp) {
  console.log(letter) // nothing
}
```

Asynchronous iteration will continue until the end event is reached,
consuming all of the data.

```js
const mp = new Minipass({ encoding: 'utf8' })

// some source of some data
let i = 5
const inter = setInterval(() => {
  if (i --> 0)
    mp.write(Buffer.from('foo\n', 'utf8'))
  else {
    mp.end()
    clearInterval(inter)
  }
}, 100)

// consume the data with asynchronous iteration
async function consume () {
  for await (let chunk of mp) {
    console.log(chunk)
  }
  return 'ok'
}

consume().then(res => console.log(res))
// logs `foo\n` 5 times, and then `ok`
```
