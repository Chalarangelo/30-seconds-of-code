/* eslint-disable no-control-regex */

import { Jimp, getTestDir } from '@jimp/test-utils';
import configure from '@jimp/custom';

import bmp from '../src';

const jimp = configure({ types: [bmp] }, Jimp);

describe('BMP', () => {
  const imagesDir = getTestDir(__dirname) + '/images';

  it('load BMP', async () => {
    const image = await jimp.read(imagesDir + '/windows95.bmp');

    image.getPixelColor(10, 10).should.be.equal(0xeff7f7ff);
    image.getPixelColor(150, 80).should.be.equal(0x73add6ff);
    image.getPixelColor(190, 200).should.be.equal(0xf7c300ff);
  });

  it('export BMP', async () => {
    const image = await jimp.read({
      width: 3,
      height: 3,
      data: [
        0xff0000ff,
        0xff0080ff,
        0xff00ffff,
        0xff0080ff,
        0xff00ffff,
        0x8000ffff,
        0xff00ffff,
        0x8000ffff,
        0x0000ffff
      ]
    });
    const buffer = await image.getBufferAsync('image/bmp');

    buffer.toString().should.match(/^BMZ\u0000/);
  });

  it('uses correct colors for BMP', async function() {
    this.timeout(4000);

    const expectedImg = await jimp.read(
      getTestDir(__dirname) + '/images/windows95.png'
    );
    const image = await jimp.read(
      getTestDir(__dirname) + '/images/windows95.bmp'
    );

    image.bitmap.data.should.be.deepEqual(expectedImg.bitmap.data);
  });
});
