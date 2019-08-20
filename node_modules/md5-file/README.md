# md5-file [![Build Status](https://travis-ci.org/roryrjb/md5-file.svg?branch=master)](https://travis-ci.org/roryrjb/md5-file) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Get the MD5-sum of a given file, with low memory usage, even on huge files.

## Installation

```sh
npm install --save md5-file
```

## Usage

### As a module
```js
const md5File = require('md5-file')

/* Async usage */
md5File('LICENSE.md', (err, hash) => {
  if (err) throw err

  console.log(`The MD5 sum of LICENSE.md is: ${hash}`)
})

/* Sync usage */
const hash = md5File.sync('LICENSE.md')
console.log(`The MD5 sum of LICENSE.md is: ${hash}`)
```

### As a command line tool
```
$ md5-file LICENSE.md
```

## Promise support

If you require `md5-file/promise` you'll receive an alternative API where all
functions that takes callbacks are replaced by `Promise`-returning functions.

```js
const md5File = require('md5-file/promise')

md5File('LICENSE.md').then(hash => {
  console.log(`The MD5 sum of LICENSE.md is: ${hash}`)
})
```

## API

### `md5File(filepath: string, cb: function)`

Asynchronously get the MD5-sum of the file at `filepath`.

The callback `cb` will be called with `(err: Error, hash: string)`.

### `md5File.sync(filepath: string) => string`

Synchronously get the MD5-sum of the file at `filepath`.

### License

MIT
