<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>@jimp/plugin-mask</h1>
  <p>mask an image with another image.</p>
</div>

Masks a source image on to this image using average pixel colour. A completely black pixel on the mask will turn a pixel in the image completely transparent.

## Usage

- @param {Jimp} src the source Jimp instance
- @param {number} x the horizontal position to blit the image
- @param {number} y the vertical position to blit the image
- @param {function(Error, Jimp)} cb (optional) a callback for when complete

```js
import jimp from 'jimp';

async function main() {
  const image = await jimp.read('test/image.png');
  const mask = await jimp.read('test/mask.png');

  image.mask(mask);
}
```
