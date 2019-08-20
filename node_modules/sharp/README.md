# sharp

<img src="https://raw.githubusercontent.com/lovell/sharp/master/docs/image/sharp-logo.svg?sanitize=true" width="160" height="160" alt="sharp logo" align="right">

```sh
npm install sharp
```

The typical use case for this high speed Node.js module
is to convert large images in common formats to
smaller, web-friendly JPEG, PNG and WebP images of varying dimensions.

Resizing an image is typically 4x-5x faster than using the
quickest ImageMagick and GraphicsMagick settings.

Colour spaces, embedded ICC profiles and alpha transparency channels are all handled correctly.
Lanczos resampling ensures quality is not sacrificed for speed.

As well as image resizing, operations such as
rotation, extraction, compositing and gamma correction are available.

Most modern 64-bit OS X, Windows and Linux systems running
Node versions 6, 8, 10, 11 and 12
do not require any additional install or runtime dependencies.

## Examples

```javascript
const sharp = require('sharp');
```

### Callback

```javascript
sharp(inputBuffer)
  .resize(320, 240)
  .toFile('output.webp', (err, info) => { ... });
```

### Promise

```javascript
sharp('input.jpg')
  .rotate()
  .resize(200)
  .toBuffer()
  .then( data => { ... })
  .catch( err => { ... });
```

### Async/await

```javascript
const semiTransparentRedPng = await sharp({
  create: {
    width: 48,
    height: 48,
    channels: 4,
    background: { r: 255, g: 0, b: 0, alpha: 0.5 }
  }
})
  .png()
  .toBuffer();
```

### Stream

```javascript
const roundedCorners = Buffer.from(
  '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);

const roundedCornerResizer =
  sharp()
    .resize(200, 200)
    .composite([{
      input: roundedCorners,
      blend: 'dest-in'
    }])
    .png();

readableStream
  .pipe(roundedCornerResizer)
  .pipe(writableStream);
```

[![Test Coverage](https://coveralls.io/repos/lovell/sharp/badge.svg?branch=master)](https://coveralls.io/r/lovell/sharp?branch=master)

### Documentation

Visit [sharp.pixelplumbing.com](https://sharp.pixelplumbing.com/) for complete
[installation instructions](https://sharp.pixelplumbing.com/page/install),
[API documentation](https://sharp.pixelplumbing.com/page/api),
[benchmark tests](https://sharp.pixelplumbing.com/page/performance) and
[changelog](https://sharp.pixelplumbing.com/page/changelog).

### Contributing

A [guide for contributors](https://github.com/lovell/sharp/blob/master/.github/CONTRIBUTING.md)
covers reporting bugs, requesting features and submitting code changes.

### Licensing

Copyright 2013, 2014, 2015, 2016, 2017, 2018, 2019 Lovell Fuller and contributors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
[https://www.apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
