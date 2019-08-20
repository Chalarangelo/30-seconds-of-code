<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>@jimp/plugin-flip</h1>
  <p>flip an image.</p>
</div>

Flip the image horizontally or vertically. Defaults to horizontal.

Also aliased as `mirror`

## Usage

- @param {boolean} horizontal a Boolean, if true the image will be flipped horizontally
- @param {boolean} vertical a Boolean, if true the image will be flipped vertically
- @param {function(Error, Jimp)} cb (optional) a callback for when complete

```js
import jimp from 'jimp';

async function main() {
  const image = await jimp.read('test/image.png');

  image.flip();
  image.mirror();
  image.flip(false, true);
}

main();
```
