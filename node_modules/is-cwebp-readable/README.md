# is-cwebp-readable

[![NPM version](https://img.shields.io/npm/v/is-cwebp-readable.svg)](https://www.npmjs.com/package/is-cwebp-readable)
[![Build Status](https://travis-ci.org/shinnn/is-cwebp-readable.svg?branch=master)](https://travis-ci.org/shinnn/is-cwebp-readable)
[![Build status](https://ci.appveyor.com/api/projects/status/lrfe3hgtupsg45l1?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/is-cwebp-readable)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/is-cwebp-readable.svg)](https://coveralls.io/github/shinnn/is-cwebp-readable)
[![Dependency Status](https://david-dm.org/shinnn/is-cwebp-readable.svg)](https://david-dm.org/shinnn/is-cwebp-readable)
[![devDependency Status](https://david-dm.org/shinnn/is-cwebp-readable/dev-status.svg)](https://david-dm.org/shinnn/is-cwebp-readable#info=devDependencies)

Check if a Buffer/Uint8Array is available for [cwebp](https://developers.google.com/speed/webp/docs/cwebp) image source

```javascript
const fs = require('fs');
const isCwebpReadable = require('is-cwebp-readable');

isCwebpReadable(fs.readFileSync('fixture.png')); //=> true
isCwebpReadable(fs.readFileSync('fixture.bmp')); //=> false
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```sh
npm install is-cwebp-readable
```

## API

```javascript
const isCwebpReadable = require('is-cwebp-readable');
```

### isCwebpReadable(*buf*)

*buf*: [`Buffer`](https://nodejs.org/api/buffer.html#buffer_class_buffer) or [`Uint8Array`](https://www.khronos.org/registry/typedarray/specs/latest/#TYPEDARRAYS)  
Return: `Boolean`

It returns `true` if the data is [PNG](https://wikipedia.org/wiki/Portable_Network_Graphics), [JPEG](https://wikipedia.org/wiki/JPEG), [TIFF](https://wikipedia.org/wiki/Tagged_Image_File_Format), or [WebP](https://wikipedia.org/wiki/WebP), otherwise `false`.

## License

[Creative Commons Zero v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/deed)
