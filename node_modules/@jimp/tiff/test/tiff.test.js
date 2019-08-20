/* eslint-disable no-control-regex */

import { Jimp, getTestDir } from '@jimp/test-utils';
import configure from '@jimp/custom';

import tiff from '../src';

const jimp = configure({ types: [tiff] }, Jimp);

describe('TIFF', () => {
  const imagesDir = getTestDir(__dirname) + '/images';

  it('load TIFF', async () => {
    const image = await jimp.read(imagesDir + '/rgb.tiff');

    image.getPixelColor(10, 10).should.be.equal(0xa4988bff);
    image.getPixelColor(220, 190).should.be.equal(0xe0d7ddff);
    image.getPixelColor(350, 130).should.be.equal(0x565433ff);
  });

  const simpleJGD = {
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
  };

  it('export TIFF', async () => {
    const image = await jimp.read(simpleJGD);
    const buffer = await image.getBufferAsync('image/tiff');

    buffer.toString().should.match(/^MM\u0000*\u0000/);
  });
});
