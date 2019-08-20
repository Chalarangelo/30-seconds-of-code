# mississippi

a collection of useful stream utility modules. learn how the modules work using this and then pick the ones you want and use them individually

the goal of the modules included in mississippi is to make working with streams easy without sacrificing speed, error handling or composability.

## usage

```js
var miss = require('mississippi')
```

## methods

- [pipe](#pipe)
- [each](#each)
- [pipeline](#pipeline)
- [duplex](#duplex)
- [through](#through)
- [from](#from)
- [to](#to)
- [concat](#concat)
- [finished](#finished)
- [parallel](#parallel)

### pipe

##### `miss.pipe(stream1, stream2, stream3, ..., cb)`

Pipes streams together and destroys all of them if one of them closes. Calls `cb` with `(error)` if there was an error in any of the streams.

When using standard `source.pipe(destination)` the source will _not_ be destroyed if the destination emits close or error. You are also not able to provide a callback to tell when the pipe has finished.

`miss.pipe` does these two things for you, ensuring you handle stream errors 100% of the time (unhandled errors are probably the most common bug in most node streams code)

#### original module

`miss.pipe` is provided by [`require('pump')`](https://www.npmjs.com/package/pump)

#### example

```js
// lets do a simple file copy
var fs = require('fs')

var read = fs.createReadStream('./original.zip')
var write = fs.createWriteStream('./copy.zip')

// use miss.pipe instead of read.pipe(write)
miss.pipe(read, write, function (err) {
  if (err) return console.error('Copy error!', err)
  console.log('Copied successfully')
})
```

### each

##### `miss.each(stream, each, [done])`

Iterate the data in `stream` one chunk at a time. Your `each` function will be called with `(data, next)` where data is a data chunk and next is a callback. Call `next` when you are ready to consume the next chunk.

Optionally you can call `next` with an error to destroy the stream. You can also pass the optional third argument, `done`, which is a function that will be called with `(err)` when the stream ends. The `err` argument will be populated with an error if the stream emitted an error.

#### original module

`miss.each` is provided by [`require('stream-each')`](https://www.npmjs.com/package/stream-each)

#### example

```js
var fs = require('fs')
var split = require('split2')

var newLineSeparatedNumbers = fs.createReadStream('numbers.txt')

var pipeline = miss.pipeline(newLineSeparatedNumbers, split())
miss.each(pipeline, eachLine, done)
var sum = 0

function eachLine (line, next) {
  sum += parseInt(line.toString())
  next()
}

function done (err) {
  if (err) throw err
  console.log('sum is', sum)
}
```

### pipeline

##### `var pipeline = miss.pipeline(stream1, stream2, stream3, ...)`

Builds a pipeline from all the transform streams passed in as arguments by piping them together and returning a single stream object that lets you write to the first stream and read from the last stream.

If you are pumping object streams together use `pipeline = miss.pipeline.obj(s1, s2, ...)`.

If any of the streams in the pipeline emits an error or gets destroyed, or you destroy the stream it returns, all of the streams will be destroyed and cleaned up for you.

#### original module

`miss.pipeline` is provided by [`require('pumpify')`](https://www.npmjs.com/package/pumpify)

#### example

```js
// first create some transform streams (note: these two modules are fictional)
var imageResize = require('image-resizer-stream')({width: 400})
var pngOptimizer = require('png-optimizer-stream')({quality: 60})

// instead of doing a.pipe(b), use pipelin
var resizeAndOptimize = miss.pipeline(imageResize, pngOptimizer)
// `resizeAndOptimize` is a transform stream. when you write to it, it writes
// to `imageResize`. when you read from it, it reads from `pngOptimizer`.
// it handles piping all the streams together for you

// use it like any other transform stream
var fs = require('fs')

var read = fs.createReadStream('./image.png')
var write = fs.createWriteStream('./resized-and-optimized.png')

miss.pipe(read, resizeAndOptimize, write, function (err) {
  if (err) return console.error('Image processing error!', err)
  console.log('Image processed successfully')
})
```

### duplex

##### `var duplex = miss.duplex([writable, readable, opts])`

Take two separate streams, a writable and a readable, and turn them into a single [duplex (readable and writable) stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex).

The returned stream will emit data from the readable. When you write to it it writes to the writable.

You can either choose to supply the writable and the readable at the time you create the stream, or you can do it later using the `.setWritable` and `.setReadable` methods and data written to the stream in the meantime will be buffered for you.

#### original module

`miss.duplex` is provided by [`require('duplexify')`](https://www.npmjs.com/package/duplexify)

#### example

```js
// lets spawn a process and take its stdout and stdin and combine them into 1 stream
var child = require('child_process')

// @- tells it to read from stdin, --data-binary sets 'raw' binary mode
var curl = child.spawn('curl -X POST --data-binary @- http://foo.com')

// duplexCurl will write to stdin and read from stdout
var duplexCurl = miss.duplex(curl.stdin, curl.stdout)
```

### through

##### `var transformer = miss.through([options, transformFunction, flushFunction])`

Make a custom [transform stream](https://nodejs.org/docs/latest/api/stream.html#stream_class_stream_transform).

The `options` object is passed to the internal transform stream and can be used to create an `objectMode` stream (or use the shortcut `miss.through.obj([...])`)

The `transformFunction` is called when data is available for the writable side and has the signature `(chunk, encoding, cb)`. Within the function, add data to the readable side any number of times with `this.push(data)`. Call `cb()` to indicate processing of the `chunk` is complete. Or to easily emit a single error or chunk, call `cb(err, chunk)`

The `flushFunction`, with signature `(cb)`, is called just before the stream is complete and should be used to wrap up stream processing.

#### original module

`miss.through` is provided by [`require('through2')`](https://www.npmjs.com/package/through2)

#### example

```js
var fs = require('fs')

var read = fs.createReadStream('./boring_lowercase.txt')
var write = fs.createWriteStream('./AWESOMECASE.TXT')

// Leaving out the options object
var uppercaser = miss.through(
  function (chunk, enc, cb) {
    cb(null, chunk.toString().toUpperCase())
  },
  function (cb) {
    cb(null, 'ONE LAST BIT OF UPPERCASE')
  }
)

miss.pipe(read, uppercaser, write, function (err) {
  if (err) return console.error('Trouble uppercasing!')
  console.log('Splendid uppercasing!')
})
```

### from

##### `miss.from([opts], read)`

Make a custom [readable stream](https://nodejs.org/docs/latest/api/stream.html#stream_class_stream_readable).

`opts` contains the options to pass on to the ReadableStream constructor e.g. for creating a readable object stream (or use the shortcut `miss.from.obj([...])`).

Returns a readable stream that calls `read(size, next)` when data is requested from the stream.

- `size` is the recommended amount of data (in bytes) to retrieve.
- `next(err, chunk)` should be called when you're ready to emit more data.

#### original module

`miss.from` is provided by [`require('from2')`](https://www.npmjs.com/package/from2)

#### example

```js


function fromString(string) {
  return miss.from(function(size, next) {
    // if there's no more content
    // left in the string, close the stream.
    if (string.length <= 0) return next(null, null)

    // Pull in a new chunk of text,
    // removing it from the string.
    var chunk = string.slice(0, size)
    string = string.slice(size)

    // Emit "chunk" from the stream.
    next(null, chunk)
  })
}

// pipe "hello world" out
// to stdout.
fromString('hello world').pipe(process.stdout)
```

### to

##### `miss.to([options], write, [flush])`

Make a custom [writable stream](https://nodejs.org/docs/latest/api/stream.html#stream_class_stream_writable).

`opts` contains the options to pass on to the WritableStream constructor e.g. for creating a writable object stream (or use the shortcut `miss.to.obj([...])`).

Returns a writable stream that calls `write(data, enc, cb)` when data is written to the stream.

- `data` is the received data to write the destination.
- `enc` encoding of the piece of data received.
- `cb(err, data)` should be called when you're ready to write more data, or encountered an error.

`flush(cb)` is called before `finish` is emitted and allows for cleanup steps to occur.

#### original module

`miss.to` is provided by [`require('flush-write-stream')`](https://www.npmjs.com/package/flush-write-stream)

#### example

```js
var ws = miss.to(write, flush)

ws.on('finish', function () {
  console.log('finished')
})

ws.write('hello')
ws.write('world')
ws.end()

function write (data, enc, cb) {
  // i am your normal ._write method
  console.log('writing', data.toString())
  cb()
}

function flush (cb) {
  // i am called before finish is emitted
  setTimeout(cb, 1000) // wait 1 sec
}
```

If you run the above it will produce the following output

```
writing hello
writing world
(nothing happens for 1 sec)
finished
```

### concat

##### `var concat = miss.concat(cb)`

Returns a writable stream that concatenates all data written to the stream and calls a callback with the single result.

Calling `miss.concat(cb)` returns a writable stream. `cb` is called when the writable stream is finished, e.g. when all data is done being written to it. `cb` is called with a single argument, `(data)`, which will contain the result of concatenating all the data written to the stream.

Note that `miss.concat` will not handle stream errors for you. To handle errors, use `miss.pipe` or handle the `error` event manually.

#### original module

`miss.concat` is provided by [`require('concat-stream')`](https://www.npmjs.com/package/concat-stream)

#### example

```js
var fs = require('fs')

var readStream = fs.createReadStream('cat.png')
var concatStream = miss.concat(gotPicture)

function callback (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

miss.pipe(readStream, concatStream, callback)

function gotPicture(imageBuffer) {
  // imageBuffer is all of `cat.png` as a node.js Buffer
}

function handleError(err) {
  // handle your error appropriately here, e.g.:
  console.error(err) // print the error to STDERR
  process.exit(1) // exit program with non-zero exit code
}
```

### finished

##### `miss.finished(stream, cb)`

Waits for `stream` to finish or error and then calls `cb` with `(err)`. `cb` will only be called once. `err` will be null if the stream finished without error, or else it will be populated with the error from the streams `error` event.

This function is useful for simplifying stream handling code as it lets you handle success or error conditions in a single code path. It's used internally `miss.pipe`.

#### original module

`miss.finished` is provided by [`require('end-of-stream')`](https://www.npmjs.com/package/end-of-stream)

#### example

```js
var copySource = fs.createReadStream('./movie.mp4')
var copyDest = fs.createWriteStream('./movie-copy.mp4')

copySource.pipe(copyDest)

miss.finished(copyDest, function(err) {
  if (err) return console.log('write failed', err)
  console.log('write success')
})
```

### parallel

##### `miss.parallel(concurrency, each)`

This works like `through` except you can process items in parallel, while still preserving the original input order.

This is handy if you wanna take advantage of node's async I/O and process streams of items in batches. With this module you can build your very own streaming parallel job queue.

Note that `miss.parallel` preserves input ordering, if you don't need that then you can use [through2-concurrent](https://github.com/almost/through2-concurrent) instead, which is very similar to this otherwise.

#### original module

`miss.parallel` is provided by [`require('parallel-transform')`](https://npmjs.org/parallel-transform)

#### example

This example fetches the GET HTTP headers for a stream of input URLs 5 at a time in parallel.

```js
function getResponse (item, cb) {
  var r = request(item.url)
  r.on('error', function (err) {
    cb(err)
  })
  r.on('response', function (re) {
    cb(null, {url: item.url, date: new Date(), status: re.statusCode, headers: re.headers})
    r.abort()
  })
}

miss.pipe(
  fs.createReadStream('./urls.txt'), // one url per line
  split(),
  miss.parallel(5, getResponse),
  miss.through(function (row, enc, next) {
    console.log(JSON.stringify(row))
    next()
  })
)
```

## see also

- [substack/stream-handbook](https://github.com/substack/stream-handbook)
- [nodejs.org/api/stream.html](https://nodejs.org/api/stream.html)
- [awesome-nodejs-streams](https://github.com/thejmazz/awesome-nodejs-streams)

## license

Licensed under the BSD 2-clause license.
