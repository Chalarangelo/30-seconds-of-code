<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>Jimp</h1>
  <p>JavaScript Image Manipulation Program</p>
</div>

The "JavaScript Image Manipulation Program" :-)

An image processing library for Node written entirely in JavaScript, with zero native dependencies.

The default jimp configuration.

Supported types:

- `@jimp/jpeg`
- `@jimp/png`
- `@jimp/bmp`
- `@jimp/tiff`
- `@jimp/gif`

## Installation

`npm install --save jimp`

Example usage (Promise will never resolve if callback is passed):

```js
var Jimp = require('jimp');

// open a file called "lenna.png"
Jimp.read('lenna.png', (err, lenna) => {
  if (err) throw err;
  lenna
    .resize(256, 256) // resize
    .quality(60) // set JPEG quality
    .greyscale() // set greyscale
    .write('lena-small-bw.jpg'); // save
});
```

Using promises:

```js
Jimp.read('lenna.png')
  .then(lenna => {
    return lenna
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write('lena-small-bw.jpg'); // save
  })
  .catch(err => {
    console.error(err);
  });
```

## TypeScript Usage

If you're using this library with TypeScript the method of importing slightly differs from JavaScript. You can import the library with three methods

First of all using [`import = require()`](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require) method to import it as a `commonJS` module:

```ts
import Jimp = require('jimp');
```

Alternatively you can import it with ES6 default import scheme, if you set the `esModuleInterop` compiler flag to `true` in your `tsconfig`

```ts
import Jimp from 'jimp';
```

Lastly you can import it with a synthetic default import. This requires setting the `allowSyntheticDefaultImports` compiler option to `true` in your `tsconfig`

```ts
import * as Jimp from 'jimp';
```

**Note 1**: `esModuleInterop` implicitly sets `allowSyntheticDefaultImports` to `true`

**Note 2**: `allowSyntheticDefaultImports` nor `esModuleInterop` change the runtime behavior of your code at all. They are just flags that tells TypeScript you need the compatibility they offer.

## Module Build

If you're using a web bundles (webpack, rollup, parcel) you can benefit from using the `module` build of jimp. Using the module build will allow your bundler to understand your code better and exclude things you aren't using.

```js
import Jimp from 'jimp/es';
```

### WebPack

If you're using webpack you can set `process.browser` to true and your build of jimp will exclude certain parts, making it load faster.

```js
{
  plugins: [
    new webpack.DefinePlugin({
      'process.browser': 'true'
    }),
    ...
  ],
}
```

## Basic usage

The static `Jimp.read` method takes the path to a file, URL, dimensions, a Jimp instance or a buffer and returns a Promise:

```js
Jimp.read('./path/to/image.jpg')
  .then(image => {
    // Do stuff with the image.
  })
  .catch(err => {
    // Handle an exception.
  });

Jimp.read('http://www.example.com/path/to/lenna.jpg')
  .then(image => {
    // Do stuff with the image.
  })
  .catch(err => {
    // Handle an exception.
  });

Jimp.read(jimpInstance)
  .then(image => {
    // Do stuff with the image.
  })
  .catch(err => {
    // Handle an exception.
  });

Jimp.read(buffer)
  .then(image => {
    // Do stuff with the image.
  })
  .catch(err => {
    // Handle an exception.
  });
```

In some cases, you need to pass additional parameters with an image's URL. You can pass an object to the `Jimp.read` method:

```js
Jimp.read({
  url: 'http://www.example.com/path/to/lenna.jpg', // Required!
  headers: {},
  ...
})
  .then(image => {
    // Do stuff with the image.
  })
  .catch(err => {
    // Handle an exception.
  });
```

Jimp uses [phin](https://github.com/ethanent/phin) as it's HTTP client. Phin uses [`http.request(options[, callback])`](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_request_options_callback) or [`https.request(options[, callback])`](https://nodejs.org/dist/latest-v8.x/docs/api/https.html#https_https_request_options_callback) methods for making HTTP requests. Phin parses a `url` with the `url.parse(...)` method and passes it with all the other parameters as an `options` to the [`http.request(options[, callback])`](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_request_options_callback) or [`https.request(options[, callback])`](https://nodejs.org/dist/latest-v8.x/docs/api/https.html#https_https_request_options_callback) methods.

Briefly speaking, you can pass any options from [`http.request(options[, callback])`](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_request_options_callback), [`https.request(options[, callback])`](https://nodejs.org/dist/latest-v8.x/docs/api/https.html#https_https_request_options_callback) or even [`tls.connect(options[, callback])`](https://nodejs.org/dist/latest-v8.x/docs/api/tls.html#tls_tls_connect_options_callback).

Phin parses a `url` and combines it with any options you want. This behavior can be very useful when you need to pass some additional `headers`. Also, you can pass `rejectUnauthorized: false` if you don't require an SSL certificate to be valid (it helps to prevent `unable to verify the first certificate` error).

The convenience method `Jimp.create` also exists. It is just a wrapper around `Jimp.read`.

### Custom Constructor

You might want to initialize jimp in so custom way. To do this Jimp exposes the static function `appendConstructorOption`. The appended constructor options run after all the defaults.

To define a custom constructor provide a name for it, a function to call to determine if the arguments provided to jimp match your constructor, and a function called where you can construct the image however you want.

```js
Jimp.appendConstructorOption(
  'Name of Option',
  args => arg.hasSomeCustomThing,
  function(resolve, reject, args) {
    this.bitmap = customParser(args);
    resolve();
  }
);
```

If you don't want to handle parsing the bitmap. For example if you want to do some sort of authentication for URL request. Jimp exposes `parseBitmap` so you can fall back to jimp to do the heavy lifting.

Parse bitmap takes the raw image data in a Buffer, a path (optional), and a node style callback.

```js
Jimp.appendConstructorOption('Custom Url', options => options.url, function(
  resolve,
  reject,
  options
) {
  phin(options, (err, res) => {
    if (err) {
      return reject(err);
    }

    this.parseBitmap(res.body, options.url, err => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
});
```

### Methods

Once the promise is fulfilled, the following methods can be called on the image:

```js
/* Resize */
image.contain( w, h[, alignBits || mode, mode] );    // scale the image to the given width and height, some parts of the image may be letter boxed
image.cover( w, h[, alignBits || mode, mode] );      // scale the image to the given width and height, some parts of the image may be clipped
image.resize( w, h[, mode] );     // resize the image. Jimp.AUTO can be passed as one of the values.
image.scale( f[, mode] );         // scale the image by the factor f
image.scaleToFit( w, h[, mode] ); // scale the image to the largest size that fits inside the given width and height

// An optional resize mode can be passed with all resize methods.

/* Crop */
image.autocrop([tolerance, frames]); // automatically crop same-color borders from image (if any), frames must be a Boolean
image.autocrop(options);          // automatically crop same-color borders from image (if any), options may contain tolerance, cropOnlyFrames, cropSymmetric, leaveBorder
image.crop( x, y, w, h );         // crop to the given region

/* Composing */
image.blit( src, x, y, [srcx, srcy, srcw, srch] );
                                  // blit the image with another Jimp image at x, y, optionally cropped.
image.composite( src, x, y, [{ mode, opacitySource, opacityDest }] );     // composites another Jimp image over this image at x, y
image.mask( src, x, y );          // masks the image with another Jimp image at x, y using average pixel value
image.convolute( kernel );        // applies a convolution kernel matrix to the image or a region

/* Flip and rotate */
image.flip( horz, vert );         // flip the image horizontally or vertically
image.mirror( horz, vert );       // an alias for flip
image.rotate( deg[, mode] );      // rotate the image clockwise by a number of degrees. Optionally, a resize mode can be passed. If `false` is passed as the second parameter, the image width and height will not be resized.

/* Colour */
image.brightness( val );          // adjust the brighness by a value -1 to +1
image.contrast( val );            // adjust the contrast by a value -1 to +1
image.dither565();                // ordered dithering of the image and reduce color space to 16-bits (RGB565)
image.greyscale();                // remove colour from the image
image.invert();                   // invert the image colours
image.normalize();                // normalize the channels in an image

/* Alpha channel */
image.hasAlpha();                     // determines if an image contains opaque pixels
image.fade( f );                  // an alternative to opacity, fades the image by a factor 0 - 1. 0 will haven no effect. 1 will turn the image
image.opacity( f );               // multiply the alpha channel by each pixel by the factor f, 0 - 1
image.opaque();                   // set the alpha channel on every pixel to fully opaque
image.background( hex );          // set the default new pixel colour (e.g. 0xFFFFFFFF or 0x00000000) for by some operations (e.g. image.contain and

/* Blurs */
image.gaussian( r );              // Gaussian blur the image by r pixels (VERY slow)
image.blur( r );                  // fast blur the image by r pixels

/* Effects */
image.posterize( n );             // apply a posterization effect with n level
image.sepia();                    // apply a sepia wash to the image
image.pixelate( size[, x, y, w, h ]);  // apply a pixelation effect to the image or a region

/* 3D */
image.displace( map, offset );    // displaces the image pixels based on the provided displacement map. Useful for making stereoscopic 3D images.
```

Some of these methods are irreversible, so it can be useful to perform them on a clone of the original image:

```js
image.clone(); // returns a clone of the image
```

(Contributions of more methods are welcome!)

### Resize modes

The default resizing algorithm uses a bilinear method as follows:

```js
image.resize(250, 250); // resize the image to 250 x 250
image.resize(Jimp.AUTO, 250); // resize the height to 250 and scale the width accordingly
image.resize(250, Jimp.AUTO); // resize the width to 250 and scale the height accordingly
```

Optionally, the following constants can be passed to choose a particular resizing algorithm:

```js
Jimp.RESIZE_NEAREST_NEIGHBOR;
Jimp.RESIZE_BILINEAR;
Jimp.RESIZE_BICUBIC;
Jimp.RESIZE_HERMITE;
Jimp.RESIZE_BEZIER;
```

For example:

```js
image.resize(250, 250, Jimp.RESIZE_BEZIER);
```

### Align modes

The following constants can be passed to the `image.cover`, `image.contain` and `image.print` methods:

```js
Jimp.HORIZONTAL_ALIGN_LEFT;
Jimp.HORIZONTAL_ALIGN_CENTER;
Jimp.HORIZONTAL_ALIGN_RIGHT;

Jimp.VERTICAL_ALIGN_TOP;
Jimp.VERTICAL_ALIGN_MIDDLE;
Jimp.VERTICAL_ALIGN_BOTTOM;
```

Where the align mode changes the position of the associated axis as described in the table below.

Align Mode | Axis Point
--- | ---
`Jimp.HORIZONTAL_ALIGN_LEFT` | Positions the x-axis at the left of the image
`Jimp.HORIZONTAL_ALIGN_CENTER` | Positions the x-axis at the center of the image
`Jimp.HORIZONTAL_ALIGN_RIGHT` | Positions the x-axis at the right of the image
`Jimp.VERTICAL_ALIGN_TOP` | Positions the y-axis at the top of the image
`Jimp.VERTICAL_ALIGN_MIDDLE` | Positions the y-axis at the center of the image
`Jimp.VERTICAL_ALIGN_BOTTOM` | Positions the y-axis at the bottom of the image

For example:

```js
image.contain(250, 250, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP);
```

Default align modes for `image.cover` and `image.contain` are:

```js
Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE;
```

Default align modes for `image.print` are:

```js
{
    alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
    alignmentY: Jimp.VERTICAL_ALIGN_TOP
}
```

### Compositing and blend modes

The following modes can be used for compositing two images together. mode defaults to Jimp.BLEND_SOURCE_OVER.

```js
Jimp.BLEND_SOURCE_OVER;
Jimp.BLEND_DESTINATION_OVER;
Jimp.BLEND_MULTIPLY;
Jimp.BLEND_SCREEN;
Jimp.BLEND_OVERLAY;
Jimp.BLEND_DARKEN;
Jimp.BLEND_LIGHTEN;
Jimp.BLEND_HARDLIGHT;
Jimp.BLEND_DIFFERENCE;
Jimp.BLEND_EXCLUSION;
```

```js
image.composite(srcImage, 100, 0, {
  mode: Jimp.BLEND_MULTIPLY,
  opacitySource: 0.5,
  opacityDest: 0.9
});
```

### Writing text

Jimp supports basic typography using BMFont format (.fnt) even ones in different languages! Just find a bitmap font that is suitable [bitmap fonts](https://en.wikipedia.org/wiki/Bitmap_fonts):

```js
Jimp.loadFont(pathOrURL).then(font => {
  // load font from .fnt file
  image.print(font, x, y, message); // print a message on an image. message can be a any type
  image.print(font, x, y, message, maxWidth); // print a message on an image with text wrapped at maxWidth
});
```

Alignment modes are supported by replacing the `str` argument with an object containing `text`, `alignmentX` and `alignmentY`. `alignmentX` defaults to `Jimp.HORIZONTAL_ALIGN_LEFT` and `alignmentY` defaults to `Jimp.VERTICAL_ALIGN_TOP`.

```js
Jimp.loadFont(pathOrURL).then(font => {
  image.print(
    font,
    x,
    y,
    {
      text: 'Hello world!',
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    },
    maxWidth,
    maxHeight
  ); // prints 'Hello world!' on an image, middle and center-aligned, when x = 0 and y = 0
});
```

```js
Jimp.loadFont(path, cb); // using a callback pattern
```

BMFont fonts are raster based and fixed in size and colour. Jimp comes with a set of fonts that can be used on images:

```js
Jimp.FONT_SANS_8_BLACK; // Open Sans, 8px, black
Jimp.FONT_SANS_10_BLACK; // Open Sans, 10px, black
Jimp.FONT_SANS_12_BLACK; // Open Sans, 12px, black
Jimp.FONT_SANS_14_BLACK; // Open Sans, 14px, black
Jimp.FONT_SANS_16_BLACK; // Open Sans, 16px, black
Jimp.FONT_SANS_32_BLACK; // Open Sans, 32px, black
Jimp.FONT_SANS_64_BLACK; // Open Sans, 64px, black
Jimp.FONT_SANS_128_BLACK; // Open Sans, 128px, black

Jimp.FONT_SANS_8_WHITE; // Open Sans, 8px, white
Jimp.FONT_SANS_16_WHITE; // Open Sans, 16px, white
Jimp.FONT_SANS_32_WHITE; // Open Sans, 32px, white
Jimp.FONT_SANS_64_WHITE; // Open Sans, 64px, white
Jimp.FONT_SANS_128_WHITE; // Open Sans, 128px, white
```

These can be used as follows:

```js
Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
  image.print(font, 10, 10, 'Hello world!');
});
```

#### Measuring text

If you need to do calculations on where to place your text jimp provides two methods that measure how wide and how tall a piece of text will be. You can use these methods to lay out multiple pieces of text in relation to each other

```js
Jimp.measureText(Jimp.FONT_SANS_32_BLACK, 'Some string'); // width of text
Jimp.measureTextHeight(Jimp.FONT_SANS_32_BLACK, 'Some string', 100); // height of text
```

#### Staggering Text

If you need to stagger text position along the x or y-axis the print method also returns the final coordinates as an argument to the callback.

```js
Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
  image.print(
    font,
    10,
    10,
    'Hello world that wraps!',
    50,
    (err, image, { x, y }) => {
      image.print(font, x, y + 20, 'More text on another line', 50);
    }
  );
});
```

Online tools are also available to convert TTF fonts to BMFont format. They can be used to create color font or sprite packs.

:star: [Littera](http://kvazars.com/littera/)

:star: [Hiero](https://github.com/libgdx/libgdx/wiki/Hiero)

## Writing to files and buffers

### Writing to files

The image can be written to disk in PNG, JPEG or BMP format (based on the save path extension or if no extension is provided the original image's MIME type which, if not available, defaults to PNG) using:

```js
image.write(path, cb); // Node-style callback will be fired when write is successful
image.writeAsync(path); // Returns Promise
```

The original extension for an image (or "png") can accessed as using `image.getExtension()`. The following will save an image using its original format:

```js
var file = 'new_name.' + image.getExtension();
//or
var file = 'new_name'; // with no extension
image.write(file);
```

### Writing to Buffers

A PNG, JPEG or BMP binary Buffer of an image (e.g. for storage in a database) can be generated using:

```js
image.getBuffer(mime, cb); // Node-style callback will be fired with result
image.getBufferAsync(mime); // Returns Promise
```

For convenience, supported MIME types are available as static properties:

```js
Jimp.MIME_PNG; // "image/png"
Jimp.MIME_JPEG; // "image/jpeg"
Jimp.MIME_BMP; // "image/bmp"
```

If `Jimp.AUTO` is passed as the MIME type then the original MIME type for the image (or "image/png") will be used. Alternatively, `image.getMIME()` will return the original MIME type of the image (or "image/png").

### Data URI

A Base64 data URI can be generated in the same way as a Buffer, using:

```js
image.getBase64(mime, cb); // Node-style callback will be fired with result
image.getBase64Async(mime); // Returns Promise
```

### PNG and JPEG quality

The quality of JPEGs can be set with:

```js
image.quality(n); // set the quality of saved JPEG, 0 - 100
```

The format of PNGs can be set with:

```js
image.rgba(bool); // set whether PNGs are saved as RGBA (true, default) or RGB (false)
image.filterType(number); // set the filter type for the saved PNG
image.deflateLevel(number); // set the deflate level for the saved PNG
Jimp.deflateStrategy(number); // set the deflate for the saved PNG (0-3)
```

For convenience, supported filter types are available as static properties:

```js
Jimp.PNG_FILTER_AUTO; // -1
Jimp.PNG_FILTER_NONE; //  0
Jimp.PNG_FILTER_SUB; //  1
Jimp.PNG_FILTER_UP; //  2
Jimp.PNG_FILTER_AVERAGE; //  3
Jimp.PNG_FILTER_PATH; //  4
```

## Advanced usage

### Colour manipulation

Jimp supports advanced colour manipulation using a single method as follows:

```js
image.color([
  { apply: 'hue', params: [-90] },
  { apply: 'lighten', params: [50] },
  { apply: 'xor', params: ['#06D'] }
]);
```

The method supports the following modifiers:

| Modifier                | Description                                                                                                                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **lighten** {amount}    | Lighten the color a given amount, from 0 to 100. Providing 100 will always return white (works through [TinyColor](https://github.com/bgrins/TinyColor))                                                         |
| **brighten** {amount}   | Brighten the color a given amount, from 0 to 100 (works through [TinyColor](https://github.com/bgrins/TinyColor))                                                                                                |
| **darken** {amount}     | Darken the color a given amount, from 0 to 100. Providing 100 will always return black (works through [TinyColor](https://github.com/bgrins/TinyColor))                                                          |
| **desaturate** {amount} | Desaturate the color a given amount, from 0 to 100. Providing 100 will is the same as calling greyscale (works through [TinyColor](https://github.com/bgrins/TinyColor))                                         |
| **saturate** {amount}   | Saturate the color a given amount, from 0 to 100 (works through [TinyColor](https://github.com/bgrins/TinyColor))                                                                                                |
| **greyscale** {amount}  | Completely desaturates a color into greyscale (works through [TinyColor](https://github.com/bgrins/TinyColor))                                                                                                   |
| **spin** {degree}       | Spin the hue a given amount, from -360 to 360. Calling with 0, 360, or -360 will do nothing - since it sets the hue back to what it was before. (works through [TinyColor](https://github.com/bgrins/TinyColor)) |
| **hue** {degree}        | Alias for **spin**                                                                                                                                                                                               |
| **mix** {color, amount} | Mixes colors by their RGB component values. Amount is opacity of overlaying color                                                                                                                                |
| **tint** {amount}       | Same as applying **mix** with white color                                                                                                                                                                        |
| **shade** {amount}      | Same as applying **mix** with black color                                                                                                                                                                        |
| **xor** {color}         | Treats the two colors as bitfields and applies an XOR operation to the red, green, and blue components                                                                                                           |
| **red** {amount}        | Modify Red component by a given amount                                                                                                                                                                           |
| **green** {amount}      | Modify Green component by a given amount                                                                                                                                                                         |
| **blue** {amount}       | Modify Blue component by a given amount                                                                                                                                                                          |

### Convolution matrix

Sum neighbor pixels weighted by the kernel matrix. You can find a nice explanation with examples at [GIMP's Convolution Matrix plugin](https://docs.gimp.org/2.6/en/plug-in-convmatrix.html)

Implement emboss effect:

```js
image.convolute([[-2, -1, 0], [-1, 1, 1], [0, 1, 2]]);
```

### Low-level manipulation

Jimp enables low-level manipulation of images in memory through the bitmap property of each Jimp object:

```js
image.bitmap.data; // a Buffer of the raw bitmap data
image.bitmap.width; // the width of the image
image.bitmap.height; // the height of the image
```

This data can be manipulated directly, but remember: garbage in, garbage out.

A helper method is available to scan a region of the bitmap:

```js
image.scan(x, y, w, h, f); // scan a given region of the bitmap and call the function f on every pixel
```

Example usage:

```js
image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
  // x, y is the position of this pixel on the image
  // idx is the position start position of this rgba tuple in the bitmap Buffer
  // this is the image

  var red = this.bitmap.data[idx + 0];
  var green = this.bitmap.data[idx + 1];
  var blue = this.bitmap.data[idx + 2];
  var alpha = this.bitmap.data[idx + 3];

  // rgba values run from 0 - 255
  // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
});
```

If you need to do something with the image at the end of the scan:

```js
image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
  // do your stuff..

  if (x == image.bitmap.width - 1 && y == image.bitmap.height - 1) {
    // image scan finished, do your stuff
  }
});
```

A helper to locate a particular pixel within the raw bitmap buffer:

```js
image.getPixelIndex(x, y); // returns the index within image.bitmap.data
```

One of the following may be optionally passed as a third parameter to indicate a strategy for x, y positions that are outside of boundaries of the image:

```js
Jimp.EDGE_EXTEND = 1;
Jimp.EDGE_WRAP = 2;
Jimp.EDGE_CROP = 3;
```

Alternatively, you can manipulate individual pixels using the following these functions:

```js
image.getPixelColor(x, y); // returns the colour of that pixel e.g. 0xFFFFFFFF
image.setPixelColor(hex, x, y); // sets the colour of that pixel
```

Two static helper functions exist to convert RGBA values into single integer (hex) values:

```js
Jimp.rgbaToInt(r, g, b, a); // e.g. converts 255, 255, 255, 255 to 0xFFFFFFFF
Jimp.intToRGBA(hex); // e.g. converts 0xFFFFFFFF to {r: 255, g: 255, b: 255, a:255}
```

You can convert a css color (Hex, RGB, RGBA, HSL, HSLA, HSV, HSVA, Named) to its hexadecimal equivalent:

```js
Jimp.cssColorToHex(cssColor); // e.g. converts #FF00FF to 0xFF00FFFF
```

### Creating new images

If you want to begin with an empty Jimp image, you can call the Jimp constructor passing the width and height of the image to create and a Node-style callback:

```js
new Jimp(256, 256, (err, image) => {
  // this image is 256 x 256, every pixel is set to 0x00000000
});
```

You can optionally set the pixel colour as follows:

```js
new Jimp(256, 256, 0xff0000ff, (err, image) => {
  // this image is 256 x 256, every pixel is set to 0xFF0000FF
});
```

Or you can use a css color format:

```js
new Jimp(256, 256, '#FF00FF', (err, image) => {
  // this image is 256 x 256, every pixel is set to #FF00FF
});
```

You can also initialize a new Jimp image with a raw image buffer:

```js
new Jimp({ data: buffer, width: 1280, height: 768 }, (err, image) => {
  // this image is 1280 x 768, pixels are loaded from the given buffer.
});
```

This can be useful for interoperating with other image processing libraries. `buffer` is expected to be four-channel (rgba) image data.

## Comparing images

To generate a [perceptual hash](https://en.wikipedia.org/wiki/Perceptual_hashing) of a Jimp image, based on the [pHash](http://phash.org/) algorithm, use:

```js
image.hash(); // aHgG4GgoFjA
```

By default the hash is returned as base 64. The hash can be returned at another base by passing a number from 2 to 64 to the method:

```js
image.hash(2); // 1010101011010000101010000100101010010000011001001001010011100100
```

There are 18,446,744,073,709,551,615 unique hashes. The hamming distance between the binary representation of these hashes can be used to find similar-looking images.

To calculate the hamming distance between two Jimp images based on their perceptual hash use:

```js
Jimp.distance(image1, image2); // returns a number 0-1, where 0 means the two images are perceived to be identical
```

Jimp also allows the diffing of two Jimp images using [PixelMatch](https://github.com/mapbox/pixelmatch) as follows:

```js
var diff = Jimp.diff(image1, image2, threshold); // threshold ranges 0-1 (default: 0.1)
diff.image; // a Jimp image showing differences
diff.percent; // the proportion of different pixels (0-1), where 0 means the images are pixel identical
```

Using a mix of hamming distance and pixel diffing to compare images, the following code has a 99% success rate of detecting the same image from a random sample (with 1% false positives). The test this figure is drawn from attempts to match each image from a sample of 120 PNGs against 120 corresponding JPEGs saved at a quality setting of 60.

```js
var distance = Jimp.distance(png, jpeg); // perceived distance
var diff = Jimp.diff(png, jpeg); // pixel difference

if (distance < 0.15 || diff.percent < 0.15) {
  // images match
} else {
  // not a match
}
```

You can also calculate the raw pHash (no padding or custom base). You can then use this in `distanceFromHash` to calculate the hash distance from a loaded image.

```js
const hash1 = image1.pHash();
const hash2 = image2.pHash();

image2.distanceFromHash(hash1);
Jimp.compareHashes(hash1, hash2); // same result as above
```

## Chaining or callbacks

Most instance methods can be chained together, for example as follows:

```js
Jimp.read('lenna.png').then(image => {
  image
    .greyscale()
    .scale(0.5)
    .write('lena-half-bw.png');
});
```

Alternatively, methods can be passed Node-style callbacks:

```js
Jimp.read('lenna.png').then(image => {
  image.greyscale((err, image) => {
    image.scale(0.5, (err, image) => {
      image.write('lena-half-bw.png');
    });
  });
});
```

The Node-style callback pattern allows Jimp to be used with frameworks that expect or build on the Node-style callback pattern.
