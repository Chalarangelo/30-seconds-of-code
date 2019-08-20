/* eslint key-spacing: ["error", { "align": "value" }] */

import { Jimp, getTestDir, hasOwnProp } from '@jimp/test-utils';
import configure from '@jimp/custom';
import blit from '@jimp/plugin-blit';

import print from '../src';

const jimp = configure({ plugins: [print, blit] }, Jimp);

async function createTextImage(
  width,
  height,
  font,
  { x = 0, y = 0, text, maxWidth, maxHeight }
) {
  const loadedFont = await jimp.loadFont(font);
  const image = await Jimp.create(width, height, 0xffffffff);

  return image.print(loadedFont, x, y, text, maxWidth, maxHeight);
}

describe('Write text over image', function() {
  this.timeout(30000);

  const fontDefs = {
    SANS_8_BLACK: { w: 28, h: 28, bg: 0xffffffff },

    SANS_16_BLACK: { w: 54, h: 54, bg: 0xffffffff },
    SANS_32_BLACK: { w: 114, h: 114, bg: 0xffffffff },
    SANS_64_BLACK: { w: 220, h: 220, bg: 0xffffffff },

    SANS_8_WHITE: { w: 28, h: 28, bg: 0x000000ff },

    SANS_16_WHITE: { w: 54, h: 54, bg: 0x000000ff },
    SANS_32_WHITE: { w: 114, h: 114, bg: 0x000000ff },
    SANS_64_WHITE: { w: 220, h: 220, bg: 0x000000ff }
  };

  for (const fontName in fontDefs)
    if (hasOwnProp(fontDefs, fontName))
      ((fontName, conf) => {
        it('Jimp preset ' + fontName + ' bitmap font', async () => {
          const font = await jimp.loadFont(Jimp['FONT_' + fontName]);
          const expected =
            getTestDir(__dirname) + '/images/' + fontName + '.png';

          const expectedImg = await Jimp.read(expected);
          const image = await Jimp.create(conf.w, conf.h, conf.bg);

          image
            .print(font, 0, 0, 'This is only a test.', image.bitmap.width)
            .bitmap.data.should.be.deepEqual(expectedImg.bitmap.data);
        });
      })(fontName, fontDefs[fontName]);

  it('Jimp preset SANS_16_BLACK bitmap font positioned', async () => {
    const font = await jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    const expected =
      getTestDir(__dirname) + '/images/SANS_16_BLACK-positioned.png';
    const expectedImg = await Jimp.read(expected);
    const image = await Jimp.create('300', '100', 0xff8800ff);

    image
      .print(font, 150, 50, 'This is only a test.', 100)
      .bitmap.data.should.be.deepEqual(expectedImg.bitmap.data);
  });

  it('Jimp loads font from URL', async () => {
    const font = await Jimp.loadFont(
      'https://raw.githubusercontent.com/oliver-moran/jimp/master/packages/plugin-print/fonts/open-sans/open-sans-16-black/open-sans-16-black.fnt'
    );
    const expected =
      getTestDir(__dirname) + '/images/SANS_16_BLACK-positioned.png';
    const expectedImg = await Jimp.read(expected);
    const image = await Jimp.create('300', '100', 0xff8800ff);

    image
      .print(font, 150, 50, 'This is only a test.', 100)
      .bitmap.data.should.be.deepEqual(expectedImg.bitmap.data);
  });

  it('Jimp renders ? for unknown characters', async () => {
    const font = await jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

    const expected = getTestDir(__dirname) + '/images/unknown-char-test.png';
    const expectedImg = await Jimp.read(expected);
    const image = await Jimp.read('300', '100', 0xff8800ff);

    image
      .print(font, 0, 0, 'ツ ツ ツ', 100)
      .bitmap.data.should.be.deepEqual(expectedImg.bitmap.data);
  });

  it('Jimp can print numbers too', async () => {
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

    const expected = getTestDir(__dirname) + '/images/print-number.png';
    const expectedImg = await Jimp.read(expected);
    const image = await Jimp.read('300', '100', 0xff8800ff);

    image
      .print(font, 0, 0, 12345678, 100)
      .bitmap.data.should.be.deepEqual(expectedImg.bitmap.data);
  });

  it('left-align text by default', async () => {
    const expectedImage = await Jimp.read(
      getTestDir(__dirname) + '/images/left-aligned.png'
    );
    const textImage = await createTextImage(320, 240, Jimp.FONT_SANS_16_BLACK, {
      text: 'This is only a test.',

      maxWidth: 100
    });

    expectedImage.bitmap.data.should.be.deepEqual(textImage.bitmap.data);
  });

  it('left-align text by default when passing object', async () => {
    const expectedImage = await Jimp.read(
      getTestDir(__dirname) + '/images/left-aligned.png'
    );
    const textImage = await createTextImage(320, 240, Jimp.FONT_SANS_16_BLACK, {
      text: { text: 'This is only a test.' },

      maxWidth: 100
    });

    expectedImage.bitmap.data.should.be.deepEqual(textImage.bitmap.data);
  });

  it('left-align text when passing object with alignmentX', async () => {
    const expectedImage = await Jimp.read(
      getTestDir(__dirname) + '/images/left-aligned.png'
    );
    const textImage = await createTextImage(320, 240, Jimp.FONT_SANS_16_BLACK, {
      text: {
        text: 'This is only a test.',

        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT
      },
      maxWidth: 100
    });

    expectedImage.bitmap.data.should.be.deepEqual(textImage.bitmap.data);
  });

  it('center-align text when passing object with alignmentX', async () => {
    const expectedImage = await Jimp.read(
      getTestDir(__dirname) + '/images/center-aligned.png'
    );
    const textImage = await createTextImage(320, 240, Jimp.FONT_SANS_16_BLACK, {
      text: {
        text: 'This is only a test.',

        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
      },
      maxWidth: 100
    });

    expectedImage.bitmap.data.should.be.deepEqual(textImage.bitmap.data);
  });

  it('right-align text when passing object with alignmentX', async () => {
    const expectedImage = await Jimp.read(
      getTestDir(__dirname) + '/images/right-aligned.png'
    );
    const textImage = await createTextImage(320, 240, Jimp.FONT_SANS_16_BLACK, {
      text: {
        text: 'This is only a test.',

        alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT
      },
      maxWidth: 100
    });

    expectedImage.bitmap.data.should.be.deepEqual(textImage.bitmap.data);
  });

  it('middle-align text when passing object with alignmentY', async () => {
    const expectedImage = await Jimp.read(
      getTestDir(__dirname) + '/images/middle-aligned.png'
    );
    const textImage = await createTextImage(320, 240, Jimp.FONT_SANS_16_BLACK, {
      text: {
        text: 'This is only a test.',

        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      },
      maxWidth: 100,

      maxHeight: 240
    });

    expectedImage.bitmap.data.should.be.deepEqual(textImage.bitmap.data);
  });

  it('middle-align text when passing object with alignmentY can offset y', async () => {
    const expectedImage = await Jimp.read(
      getTestDir(__dirname) + '/images/middle-aligned-y.png'
    );
    const textImage = await createTextImage(320, 240, Jimp.FONT_SANS_16_BLACK, {
      y: 50,

      text: {
        text: 'This is only a test.',

        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      },
      maxWidth: 100,

      maxHeight: 240
    });

    expectedImage.bitmap.data.should.be.deepEqual(textImage.bitmap.data);
  });

  it('bottom-align text when passing object with alignmentY', async () => {
    const expectedImage = await Jimp.read(
      getTestDir(__dirname) + '/images/bottom-aligned.png'
    );
    const textImage = await createTextImage(320, 240, Jimp.FONT_SANS_16_BLACK, {
      text: {
        text: 'This is only a test.',

        alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
      },
      maxWidth: 100,

      maxHeight: 240
    });

    expectedImage.bitmap.data.should.be.deepEqual(textImage.bitmap.data);
  });

  it('bottom-align text when passing object with alignmentY offset y', async () => {
    const expectedImage = await Jimp.read(
      getTestDir(__dirname) + '/images/bottom-aligned-y.png'
    );
    const textImage = await createTextImage(320, 240, Jimp.FONT_SANS_16_BLACK, {
      y: 100,

      text: {
        text: 'This is only a test.',

        alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
      },
      maxWidth: 100,

      maxHeight: 100
    });

    expectedImage.bitmap.data.should.be.deepEqual(textImage.bitmap.data);
  });

  it('exposes print y position in cb', async () => {
    const expectedImage = await Jimp.read(
      getTestDir(__dirname) + '/images/spacing.png'
    );

    const loadedFont = await jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    const image = await Jimp.create(500, 500, 0xffffffff);

    image.print(
      loadedFont,
      0,
      0,
      'One two three four fix six seven eight nine ten eleven twelve',
      250,
      (err, image, { x, y }) => {
        image.print(
          loadedFont,
          x,
          y + 50,
          'thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty',
          250
        );
      }
    );

    expectedImage.bitmap.data.should.be.deepEqual(image.bitmap.data);
  });
});
