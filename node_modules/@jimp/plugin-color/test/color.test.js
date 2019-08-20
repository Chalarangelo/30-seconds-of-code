import { Jimp, donutJGD } from '@jimp/test-utils';
import configure from '@jimp/custom';

import color from '../src';

const jimp = configure({ plugins: [color] }, Jimp);

describe('canvas color transformation', () => {
  const redDonutJGD = donutJGD(0x00000000, 0xff000088, 0xff0000ff);

  it('can apply more than one color transformation', async () => {
    const image = await jimp.read(redDonutJGD);
    const newJGD = image
      .color([
        { apply: 'hue', params: [-180] },
        { apply: 'lighten', params: [25] }
      ])
      .getJGDSync();

    newJGD.should.be.sameJGD(donutJGD(0x40404000, 0x80ffff88, 0x80ffffff));
  });

  it('lighten', async () => {
    const image = await jimp.read(redDonutJGD);

    image
      .color([{ apply: 'lighten', params: [25] }])
      .getJGDSync()
      .should.be.sameJGD(donutJGD(0x40404000, 0xff808088, 0xff8080ff));
  });

  it('brighten', async () => {
    const image = await jimp.read(redDonutJGD);

    image
      .color([{ apply: 'brighten', params: [25] }])
      .getJGDSync()
      .should.be.sameJGD(donutJGD(0x40404000, 0xff404088, 0xff4040ff));
  });

  it('spin hue', async () => {
    const image = await jimp.read(redDonutJGD);

    image
      .color([{ apply: 'hue', params: [150] }])
      .getJGDSync()
      .should.be.sameJGD(donutJGD(0x00000000, 0x00ff8088, 0x00ff80ff));
  });
});
