<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>@jimp/plugin-rotate</h1>
  <p>Rotate an image.</p>
</div>

Rotates the image clockwise by a number of degrees. By default the width and height of the image will be resized appropriately.

## Usage

- @param {number} deg the number of degrees to rotate the image by
- @param {string|boolean} mode (optional) resize mode or a boolean, if false then the width and height of the image will not be changed
- @param {function(Error, Jimp)} cb (optional) a callback for when complete

```js
import jimp from 'jimp';

async function main() {
  const image = await jimp.read('test/image.png');

  image.rotate(90);
}

main();
```
