<div align="center">
  <img width="200" height="200"
    src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/crayon.png">
  <h1>@jimp/plugin-print</h1>
  <p>Print text on an image.</p>
</div>

Jimp supports basic typography using BMFont format (.fnt) even ones in different languages! Just find a bitmap font that is suitable [bitmap fonts](https://en.wikipedia.org/wiki/Bitmap_fonts).

Online tools are also available to convert TTF fonts to BMFont format. They can be used to create color font or sprite packs.

:star: [Littera](http://kvazars.com/littera/)

:star: [Hiero](https://github.com/libgdx/libgdx/wiki/Hiero)

## Included Fonts

- `Jimp.FONT_SANS_8_BLACK`
- `Jimp.FONT_SANS_10_BLACK`
- `Jimp.FONT_SANS_12_BLACK`
- `Jimp.FONT_SANS_14_BLACK`
- `Jimp.FONT_SANS_16_BLACK`
- `Jimp.FONT_SANS_32_BLACK`
- `Jimp.FONT_SANS_64_BLACK`
- `Jimp.FONT_SANS_128_BLACK`
- `Jimp.FONT_SANS_8_WHITE`
- `Jimp.FONT_SANS_16_WHITE`
- `Jimp.FONT_SANS_32_WHITE`
- `Jimp.FONT_SANS_64_WHITE`
- `Jimp.FONT_SANS_128_WHITE`

## loadFont

Loads a bitmap font from a file

- @param {string} file the file path of a .fnt file
- @param {function(Error, Jimp)} cb (optional) a function to call when the font is loaded
- @returns {Promise} a promise

```js
import jimp from 'jimp';

async function main() {
  const font = await jimp.read(jimp.FONT_SANS_32_BLACK);
}

main();
```

## print

Draws a text on a image on a given boundary

- @param {Jimp} font a bitmap font loaded from `Jimp.loadFont` command
- @param {number} x the x position to start drawing the text
- @param {number} y the y position to start drawing the text
- @param {string} text the text to draw (string or object with `text`, `alignmentX`, and/or `alignmentY`)
- @param {number} maxWidth (optional) the boundary width to draw in
- @param {number} maxHeight (optional) the boundary height to draw in - @param {function(Error, Jimp)} cb (optional) a function to call when the text is written

```js
import Jimp from 'jimp';

async function main() {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  const image = await Jimp.read(1000, 1000, 0x0000ffff);

  image.print(font, 10, 10, 'Hello World!');
}

main();
```

### Alignment

Alignment modes are supported by replacing the `str` argument with an object containing `text`, `alignmentX` and `alignmentY`. `alignmentX` defaults to `Jimp.HORIZONTAL_ALIGN_LEFT` and `alignmentY` defaults to `Jimp.VERTICAL_ALIGN_TOP`.

You can align text using the following constants.

```js
Jimp.HORIZONTAL_ALIGN_LEFT;
Jimp.HORIZONTAL_ALIGN_CENTER;
Jimp.HORIZONTAL_ALIGN_RIGHT;

Jimp.VERTICAL_ALIGN_TOP;
Jimp.VERTICAL_ALIGN_MIDDLE;
Jimp.VERTICAL_ALIGN_BOTTOM;
```

Default align modes for `image.print` are:

```js
{
    alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
    alignmentY: Jimp.VERTICAL_ALIGN_TOP
}
```

```js
const font = await Jimp.loadFont(pathOrURL);

// prints 'Hello world!' on an image, middle and center-aligned
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
);
```
__Note__: although `maxWidth` and `maxHeight` parameters are optional to `print()`, they are needed to correctly align the text using the requested alignment mode.


#### Staggering Text

If you need to stagger text position along the x or y-axis the print method also returns the final coordinates as an argument to the callback.

```js
const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

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
```

## measureText

Measure how wide a piece of text will be.

```js
import jimp from 'jimp';

async function main() {
  const font = await jimp.read(jimp.FONT_SANS_32_BLACK);
  const image = await jimp.read(1000, 1000, 0x0000ffff);

  image.measureText(font, 'Hello World!');
}

main();
```

## measureTextHeight

Measure how tall a piece of text will be.

```js
import jimp from 'jimp';

async function main() {
  const font = await jimp.read(jimp.FONT_SANS_32_BLACK);
  const image = await jimp.read(1000, 1000, 0x0000ffff);

  image.measureTextHeight(font, 'Hello World!', 100);
}

main();
```
