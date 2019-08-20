<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>@jimp/plugin-contain</h1>
  <p>Contain an image within a height and width.</p>
</div>

Scale the image to the given width and height keeping the aspect ratio. Some parts of the image may be letter boxed.

## Usage

- @param {number} w the width to resize the image to
- @param {number} h the height to resize the image to
- @param {number} alignBits (optional) A bitmask for horizontal and vertical alignment
- @param {string} mode (optional) a scaling method (e.g. Jimp.RESIZE_BEZIER)
- @param {function(Error, Jimp)} cb (optional) a callback for when complete

```js
import jimp from 'jimp';

async function main() {
  const image = await jimp.read('test/image.png');

  image.contain(150, 100);
}

main();
```

### Align modes

The following constants can be passed to `image.contain`:

```js
Jimp.HORIZONTAL_ALIGN_LEFT;
Jimp.HORIZONTAL_ALIGN_CENTER;
Jimp.HORIZONTAL_ALIGN_RIGHT;

Jimp.VERTICAL_ALIGN_TOP;
Jimp.VERTICAL_ALIGN_MIDDLE;
Jimp.VERTICAL_ALIGN_BOTTOM;
```

For example:

```js
image.contain(250, 250, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP);
image.contain(
  250,
  250,
  Jimp.HORIZONTAL_ALIGN_RIGHT | Jimp.VERTICAL_ALIGN_BOTTOM
);
```

Default align mode for `image.contain` is:

```js
Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE;
```
