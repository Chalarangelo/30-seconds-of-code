<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>@jimp/plugin-resize</h1>
  <p>Resize an image.</p>
</div>

Resizes the image to a set width and height using a 2-pass bilinear algorithm/

## Usage

- @param {number} w the width to resize the image to (or Jimp.AUTO)
- @param {number} h the height to resize the image to (or Jimp.AUTO)
- @param {string} mode (optional) a scaling method (e.g. Jimp.RESIZE_BEZIER)
- @param {function(Error, Jimp)} cb (optional) a callback for when complete

```js
import jimp from 'jimp';

async function main() {
  const image = await jimp.read('test/image.png');

  image.resize(150, jimp.AUTO);
}

main();
```

## Auto

`Jimp.AUTO` can be passes to either the height or width and jimp will scale the image accordingly. `Jimp.AUTO` cannot be both height and width.

```js
// resize the height to 250 and scale the width accordingly
image.resize(Jimp.AUTO, 250);
// resize the width to 250 and scale the height accordingly
image.resize(250, Jimp.AUTO);
```

### Resize modes

The default resizing algorithm uses a bilinear method.

Optionally, the following constants can be passed to choose a particular resizing algorithm:

```js
Jimp.RESIZE_NEAREST_NEIGHBOR;
Jimp.RESIZE_BILINEAR;
Jimp.RESIZE_BICUBIC;
Jimp.RESIZE_HERMITE;
Jimp.RESIZE_BEZIER;
```

```js
image.resize(250, 250, Jimp.RESIZE_BEZIER);
```
