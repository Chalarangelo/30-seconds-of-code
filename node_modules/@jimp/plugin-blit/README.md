<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>@jimp/plugin-blit</h1>
  <p>Blit an image.</p>
</div>

> Blit - a data operation commonly used in computer graphics in which several bitmaps are combined into one using a boolean function.

## Usage

Blits a source image on to this image

- @param {Jimp} src image to blit
- @param {number} x the x position to blit the image
- @param {number} y the y position to blit the image
- @param {number} srcx (optional) the x position from which to crop the source image
- @param {number} srcy (optional) the y position from which to crop the source image
- @param {number} srcw (optional) the width to which to crop the source image
- @param {number} srch (optional) the height to which to crop the source image
- @param {function(Error, Jimp)} cb (optional) a callback for when complete

```js
import jimp from 'jimp';

async function main() {
  const image = await jimp.read('test/image.png');
  const parrot = await jimp.read('test/party-parrot.png');

  image.blit(parrot, x, y);
}

main();
```
