# stream-each

Iterate all the data in a stream

```
npm install stream-each
```

[![build status](http://img.shields.io/travis/mafintosh/stream-each.svg?style=flat)](http://travis-ci.org/mafintosh/stream-each)

## Usage

``` js
var each = require('stream-each')

each(stream, function (data, next) {
  console.log('data from stream', data)
  // when ready to consume next chunk
  next()
}, function (err) {
  console.log('no more data')
})
```

## API

#### `each(stream, iterator, cb)`

Iterate the data in the stream by calling the iterator function with `(data, next)`
where data is a data chunk and next is a callback. Call next when you are ready to
consume the next chunk. Optionally you can call next with an error to destroy the stream

When the stream ends/errors the callback is called if provided

## License

MIT

## Related

`stream-each` is part of the [mississippi stream utility collection](https://github.com/maxogden/mississippi) which includes more useful stream modules similar to this one.
