# archive-type [![Build Status](https://travis-ci.org/kevva/archive-type.svg?branch=master)](https://travis-ci.org/kevva/archive-type)

> Detect the archive type of a Buffer/Uint8Array


## Install

```
$ npm install --save archive-type
```


## Usage

```js
const archiveType = require('archive-type');
const readChunk = require('read-chunk');
const buffer = readChunk.sync('unicorn.zip', 0, 262);

archiveType(buffer);
//=> {ext: 'zip', mime: 'application/zip'}
```


## API

### archiveType(input)

Returns an `Object` with:

- `ext` - One of the [supported file types](#supported-file-types)
- `mime` - The [MIME type](http://en.wikipedia.org/wiki/Internet_media_type)

Or `null` when no match.

#### input

Type: `Buffer` `Uint8Array`

It only needs the first 262 bytes.


## Supported file types

- `7z`
- `bz2`
- `gz`
- `rar`
- `tar`
- `zip`
- `xz`
- `gz`


## Related

- [archive-type-cli](https://github.com/kevva/archive-type-cli) - CLI for this module


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
