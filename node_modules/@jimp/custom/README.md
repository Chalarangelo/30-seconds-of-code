<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>@jimp/custom</h1>
  <p>Configure jimp with types and plugins.</p>
</div>

## Useful Defaults

The following wil configure a `jimp` instance with the same functionality as the main `jimp` package.

```js
import configure from '@jimp/custom';
// all of jimp's default types
import types from '@jimp/types';
// all of jimp's default types
import plugins from '@jimp/plugins';

configure({
  types: [types],
  plugins: [plugins]
});
```

## Available Methods

### configure

Takes a Jimp configuration and applies it to `@jimp/core`.

Sample Jimp configuration:

```js
import types from '@jimp/types';

import bmp from '@jimp/bmp';
import jpeg from '@jimp/types';
...

configure({
  types: [types]
})

// or

configure({
  types: [bmp, jpeg, ...]
})
```

#### Extending Jimp Further

You can use configure to add more types and plugins to a jimp multiple times.

```js
let jimp = configure({
  types: [bmp]
});

jimp = configure(
  {
    types: [jpeg]
  },
  jimp
);
```

## Type Definition

To define a new Jimp image type write a function the takes the current Jimp configuration. In this function you can extend Jimp's internal data structures.

This function must return and array whose first element is the mime type and second element is an array of valid file extensions.

```js
const special = require('special-js');

const MIME_TYPE = 'image/special';

export default () => ({
  mime: [MIME_TYPE, ['spec', 'special']],

  constants: {
    MIME_SPECIAL: MIME_TYPE
  },

  decoders: {
    [MIME_TYPE]: data => special.decode(data)
  },

  encoders: {
    [MIME_TYPE]: image => special.encode(image.bitmap)
  }
});
```

### Constants

A jimp image type can expose as many constants as it wants. Each jimp type is required to expose a mime type.

```js
constants: {
  MIME_SPECIAL: MIME_TYPE
},
```

### hasAlpha

A image type can define whether it supports an alpha channel.

```js
hasAlpha: {
  MIME_SPECIAL: true
},
```

### Decoder

A function that when supplied with a buffer should return a bitmap with height and width.

```js
decoders: {
  [MIME_TYPE]: data => special.decode(data)
},
```

### Encoder

A function that when supplied with a Jimp image should return an encoded buffer.

```js
encoders: {
  [MIME_TYPE]: image => special.encode(image.bitmap)
}
```

### Class

Add class properties and function to the Jimp constructor.

```js
class: {
  _quality: 100,
  quality: function(n, cb) {
    if (typeof n !== 'number') {
      return throwError.call(this, 'n must be a number', cb);
    }

    if (n < 0 || n > 100) {
      return throwError.call(this, 'n must be a number 0 - 100', cb);
    }

    this._quality = Math.round(n);

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  }
};
```

## Plugin Definition

Defining a plugin has access to all the same things in the type definition. Mainly plugins use just the `constants` and `class` config options.

Below is the `invert` plugin. If a plugin doesn return an object with `constants` and `class`, all keys are treated as class functions.

```js
import { isNodePattern } from '@jimp/utils';

/**
 * Inverts the image
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
export default () => ({
  invert(cb) {
    this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
      x,
      y,
      idx
    ) {
      this.bitmap.data[idx] = 255 - this.bitmap.data[idx];
      this.bitmap.data[idx + 1] = 255 - this.bitmap.data[idx + 1];
      this.bitmap.data[idx + 2] = 255 - this.bitmap.data[idx + 2];
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  }
});
```
