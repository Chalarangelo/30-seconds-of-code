# read-chunk [![Build Status](https://travis-ci.org/sindresorhus/read-chunk.svg?branch=master)](https://travis-ci.org/sindresorhus/read-chunk)

> Read a chunk from a file

Because the built-in way requires way too much boilerplate.


## Install

```
$ npm install read-chunk
```


## Usage

```js
const readChunk = require('read-chunk');

// foo.txt => hello

readChunk.sync('foo.txt', 1, 3);
//=> 'ell'
```


## API

### readChunk(filePath, startPosition, length)

Returns a `Promise<Buffer>` with the read chunk.

### readChunk.sync(filePath, startPosition, length)

Returns a `Buffer` with the read chunk.

#### filePath

Type: `string`

#### startPosition

Type: `number`

Position to start reading.

#### length

Type: `number`

Number of bytes to read.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
