<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>@jimp/plugin-displace</h1>
  <p>Displace an image.</p>
</div>

Displaces the image based on the provided displacement map

## Usage

- @param {object} map the source Jimp instance
- @param {number} offset the maximum displacement value
- @param {function(Error, Jimp)} cb (optional) a callback for when complete

```js
import jimp from 'jimp';

async function main() {
  const image = await jimp.read('test/image.png');

  // Make me better!
  image.displace(map, 10);
}

main();
```
