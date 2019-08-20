import { Jimp, mkJGD, getTestDir } from '@jimp/test-utils';
import configure from '@jimp/custom';
import types from '@jimp/types';

import color from '../src';

const jimp = configure({ types: [types], plugins: [color] }, Jimp);

describe('Convolution', function() {
  this.timeout(15000);

  const imgs = [
    jimp.read(
      mkJGD(
        '22222222',
        '22222222',
        '22888822',
        '22888822',
        '22888822',
        '22888822',
        '22222222',
        '22222222'
      )
    ),
    jimp.read(
      mkJGD(
        '88222222',
        '88222222',
        '22222222',
        '22222222',
        '22222222',
        '22222222',
        '22222222',
        '22222222'
      )
    )
  ];

  let imgMid;
  let imgTopLeft; // stores the Jimp instances of the JGD images above.

  before(done => {
    Promise.all(imgs)
      .then(imgs => {
        imgMid = imgs[0];
        imgTopLeft = imgs[1];
        done();
      })
      .catch(done);
  });

  const sharpM = [[-1, -1, 0], [-1, 1, 1], [0, 1, 1]];

  it('3x3 sharp matrix on EDGE_EXTEND', done => {
    imgMid
      .clone()
      .convolution(sharpM)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '22222222',
          '28EEE822',
          '2EFFF802',
          '2EF88002',
          '2EF88002',
          '28800002',
          '22000002',
          '22222222'
        ),
        'Mid light block'
      );
    imgTopLeft
      .clone()
      .convolution(sharpM)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '80022222',
          '00022222',
          '00022222',
          '22222222',
          '22222222',
          '22222222',
          '22222222',
          '22222222'
        ),
        'Top left light block'
      );
    done();
  });

  it('3x3 sharp matrix on EDGE_WRAP', done => {
    imgMid
      .clone()
      .convolution(sharpM, jimp.EDGE_WRAP)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '66666666',
          '28EEE822',
          '2EFFF802',
          '2EF88002',
          '2EF88002',
          '28800002',
          '22000002',
          '22222222'
        ),
        'Mid light block'
      );
    imgTopLeft
      .clone()
      .convolution(sharpM, jimp.EDGE_WRAP)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          'FC06666F',
          '80022228',
          '00022222',
          '22222222',
          '22222222',
          '22222222',
          '22222222',
          'E8222228'
        ),
        'Top left light block'
      );
    done();
  });

  it('3x3 sharp matrix on EDGE_CROP', done => {
    imgMid
      .clone()
      .convolution(sharpM, jimp.EDGE_CROP)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '86666662',
          '68EEE820',
          '6EFFF800',
          '6EF88000',
          '6EF88000',
          '68800000',
          '62000000',
          '20000000'
        ),
        'Mid light block'
      );
    imgTopLeft
      .clone()
      .convolution(sharpM, jimp.EDGE_CROP)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          'FC066662',
          'C0022220',
          '00022220',
          '62222220',
          '62222220',
          '62222220',
          '62222220',
          '20000000'
        ),
        'Top left light block'
      );
    done();
  });

  it('new pixel value is greater than 255', async () => {
    const expectedImg = await jimp.read(
      getTestDir(__dirname) + '/images/qr-convoluted.png'
    );
    const image = await jimp.read(getTestDir(__dirname) + '/images/qr.jpg');

    image
      .convolution([
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ])
      .bitmap.data.should.be.deepEqual(expectedImg.bitmap.data);
  });
});
