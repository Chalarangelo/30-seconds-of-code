<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>@jimp/plugin-gaussian</h1>
  <p>Gaussian blur an image.</p>
</div>

Applies a true Gaussian blur to the image (warning: this is VERY slow)

## Usage

- @param {number} r the pixel radius of the blur
- @param {function(Error, Jimp)} cb (optional) a callback for when complete

```js
import jimp from 'jimp';

async function main() {
  const image = await jimp.read('test/image.png');

  image.resize(150, jimp.AUTO);
}

main();
```
