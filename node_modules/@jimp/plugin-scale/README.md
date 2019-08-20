<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>@jimp/plugin-scale</h1>
  <p>Scale an image.</p>
</div>

## scale

Uniformly scales the image by a factor.

- @param {number} f the factor to scale the image by
- @param {string} mode (optional) a scaling method (e.g. Jimp.RESIZE_BEZIER)
- @param {function(Error, Jimp)} cb (optional) a callback for when complete

```js
import jimp from 'jimp';

async function main() {
  const image = await jimp.read('test/image.png');

  image.scale(2);
  image.scale(2, jimp.RESIZE_BEZIER);
}

main();
```

## scaleToFit

Scale the image to the largest size that fits inside the rectangle that has the given width and height.

- @param {number} w the width to resize the image to
- @param {number} h the height to resize the image to
- @param {string} mode (optional) a scaling method (e.g. Jimp.RESIZE_BEZIER)
- @param {function(Error, Jimp)} cb (optional) a callback for when complete

```js
import jimp from 'jimp';

async function main() {
  const image = await jimp.read('test/image.png');

  image.scaleToFit(100, 100);
}

main();
```
