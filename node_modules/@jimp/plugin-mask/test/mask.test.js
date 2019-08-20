import { Jimp, mkJGD } from '@jimp/test-utils';
import configure from '@jimp/custom';

import mask from '../src';

const jimp = configure({ plugins: [mask] }, Jimp);

describe('Mask', () => {
  let imgSrcOpaq;
  let imgSrcAlpa;
  let maskGrayBig;
  let maskGraySmall;
  let maskColor;

  before(done => {
    Promise.all([
      jimp.read(mkJGD('▴□▾□■□', '■▴■▾■□', '■□▴□▾□', '■□■▴■▾')),
      jimp.read(mkJGD('▴▵▾▿', '▴▵▾▿', '▴▵▾▿')),
      jimp.read(mkJGD('048840', '8CFFC8', '8CFFC8', '048840')),
      jimp.read(mkJGD('0369', '369C', '69CF')),
      jimp.read(mkJGD('▴▴▾▾', '▪▪▰▰', '□□□□'))
    ])
      .then(imgs => {
        imgSrcOpaq = imgs[0];
        imgSrcAlpa = imgs[1];
        maskGrayBig = imgs[2];
        maskGraySmall = imgs[3];
        maskColor = imgs[4];
        done();
      })
      .catch(done);
  });

  it('Affect opaque image with a gray mask with the same size', () => {
    imgSrcOpaq
      .clone()
      .mask(maskGrayBig)
      .getJGDSync()
      .should.be.sameJGD({
        width: 6,
        height: 4,
        data: [
          0xff000000,
          0xffffff44,
          0x0000ff88,
          0xffffff88,
          0x00000044,
          0xffffff00,
          0x00000088,
          0xff0000cc,
          0x000000ff,
          0x0000ffff,
          0x000000cc,
          0xffffff88,
          0x00000088,
          0xffffffcc,
          0xff0000ff,
          0xffffffff,
          0x0000ffcc,
          0xffffff88,
          0x00000000,
          0xffffff44,
          0x00000088,
          0xff000088,
          0x00000044,
          0x0000ff00
        ]
      });
  });

  it('Affect opaque image with a gray mask with the same size, blited', () => {
    imgSrcOpaq
      .clone()
      .mask(maskGrayBig, 1, 1)
      .getJGDSync()
      .should.be.sameJGD({
        width: 6,
        height: 4,
        data: [
          0xff0000ff,
          0xffffffff,
          0x0000ffff,
          0xffffffff,
          0x000000ff,
          0xffffffff,
          0x000000ff,
          0xff000000,
          0x00000044,
          0x0000ff88,
          0x00000088,
          0xffffff44,
          0x000000ff,
          0xffffff88,
          0xff0000cc,
          0xffffffff,
          0x0000ffff,
          0xffffffcc,
          0x000000ff,
          0xffffff88,
          0x000000cc,
          0xff0000ff,
          0x000000ff,
          0x0000ffcc
        ]
      });
  });

  it('Affect opaque image with a gray mask with the same size, blited negative', () => {
    imgSrcOpaq
      .clone()
      .mask(maskGrayBig, -1, -1)
      .getJGDSync()
      .should.be.sameJGD({
        width: 6,
        height: 4,
        data: [
          0xff0000cc,
          0xffffffff,
          0x0000ffff,
          0xffffffcc,
          0x00000088,
          0xffffffff,
          0x000000cc,
          0xff0000ff,
          0x000000ff,
          0x0000ffcc,
          0x00000088,
          0xffffffff,
          0x00000044,
          0xffffff88,
          0xff000088,
          0xffffff44,
          0x0000ff00,
          0xffffffff,
          0x000000ff,
          0xffffffff,
          0x000000ff,
          0xff0000ff,
          0x000000ff,
          0x0000ffff
        ]
      });
  });

  it('Affect opaque image with a smaller gray mask', () => {
    imgSrcOpaq
      .clone()
      .mask(maskGraySmall)
      .getJGDSync()
      .should.be.sameJGD({
        width: 6,
        height: 4,
        data: [
          0xff000000,
          0xffffff33,
          0x0000ff66,
          0xffffff99,
          0x000000ff,
          0xffffffff,
          0x00000033,
          0xff000066,
          0x00000099,
          0x0000ffcc,
          0x000000ff,
          0xffffffff,
          0x00000066,
          0xffffff99,
          0xff0000cc,
          0xffffffff,
          0x0000ffff,
          0xffffffff,
          0x000000ff,
          0xffffffff,
          0x000000ff,
          0xff0000ff,
          0x000000ff,
          0x0000ffff
        ]
      });
  });

  it('Affect opaque image with a smaller gray mask, blited', () => {
    imgSrcOpaq
      .clone()
      .mask(maskGraySmall, 1, 1)
      .getJGDSync()
      .should.be.sameJGD({
        width: 6,
        height: 4,
        data: [
          0xff0000ff,
          0xffffffff,
          0x0000ffff,
          0xffffffff,
          0x000000ff,
          0xffffffff,
          0x000000ff,
          0xff000000,
          0x00000033,
          0x0000ff66,
          0x00000099,
          0xffffffff,
          0x000000ff,
          0xffffff33,
          0xff000066,
          0xffffff99,
          0x0000ffcc,
          0xffffffff,
          0x000000ff,
          0xffffff66,
          0x00000099,
          0xff0000cc,
          0x000000ff,
          0x0000ffff
        ]
      });
  });

  it('Affect alpha image with a bigger gray mask', () => {
    imgSrcAlpa
      .clone()
      .mask(maskGrayBig)
      .getJGDSync()
      .should.be.sameJGD({
        width: 4,
        height: 3,
        data: [
          0xff000000,
          0xff000021,
          0x0000ff88,
          0x0000ff43,
          0xff000088,
          0xff000065,
          0x0000ffff,
          0x0000ff7f,
          0xff000088,
          0xff000065,
          0x0000ffff,
          0x0000ff7f
        ]
      });
  });

  it('Affect alpha image with a bigger gray mask, blited', () => {
    imgSrcAlpa
      .clone()
      .mask(maskGrayBig, -1, -1)
      .getJGDSync()
      .should.be.sameJGD({
        width: 4,
        height: 3,
        data: [
          0xff0000cc,
          0xff00007f,
          0x0000ffff,
          0x0000ff65,
          0xff0000cc,
          0xff00007f,
          0x0000ffff,
          0x0000ff65,
          0xff000044,
          0xff000043,
          0x0000ff88,
          0x0000ff21
        ]
      });
  });

  it('Affect opaque image with a colored mask', () => {
    imgSrcOpaq
      .clone()
      .mask(maskColor, 1, 1)
      .getJGDSync()
      .should.be.sameJGD({
        width: 6,
        height: 4,
        data: [
          0xff0000ff,
          0xffffffff,
          0x0000ffff,
          0xffffffff,
          0x000000ff,
          0xffffffff,
          0x000000ff,
          0xff000055,
          0x00000055,
          0x0000ff55,
          0x00000055,
          0xffffffff,
          0x000000ff,
          0xffffffaa,
          0xff0000aa,
          0xffffffaa,
          0x0000ffaa,
          0xffffffff,
          0x000000ff,
          0xffffffff,
          0x000000ff,
          0xff0000ff,
          0x000000ff,
          0x0000ffff
        ]
      });
  });
});
