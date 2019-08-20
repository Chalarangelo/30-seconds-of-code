import { Jimp, mkJGD, hashForEach } from '@jimp/test-utils';
import configure from '@jimp/custom';

import resize from '../src';

const jimp = configure({ plugins: [resize] }, Jimp);

describe('Resize images', () => {
  const testImages = [
    {
      title: 'max contrast 8x8',
      src: jimp.read(
        mkJGD(
          '■■■■□□□□',
          '■■■■□□□□',
          '■■■■□□□□',
          '■■■■□□□□',
          '□□□□■■■■',
          '□□□□■■■■',
          '□□□□■■■■',
          '□□□□■■■■'
        )
      ),
      results: {
        'default 4x4': mkJGD('■■□□', '■■□□', '□□■■', '□□■■'),
        'NEAREST_NEIGHBOR 4x4': mkJGD('■■□□', '■■□□', '□□■■', '□□■■'),
        'BILINEAR 4x4': mkJGD('■■□□', '■■□□', '□□■■', '□□■■'),
        'BICUBIC 4x4': {
          width: 4,
          height: 4,
          data: [
            0x000000ff,
            0x000000ff,
            0xbfbfbfff,
            0xffffffff,
            0x000000ff,
            0x000000ff,
            0xbfbfbfff,
            0xffffffff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x5f5f5fff,
            0x404040ff,
            0xffffffff,
            0xffffffff,
            0x404040ff,
            0x000000ff
          ]
        },
        'HERMITE 4x4': {
          width: 4,
          height: 4,
          data: [
            0x000000ff,
            0x000000ff,
            0xc0c0c0ff,
            0xffffffff,
            0x000000ff,
            0x000000ff,
            0xc0c0c0ff,
            0xffffffff,
            0xc0c0c0ff,
            0xc0c0c0ff,
            0x606060ff,
            0x404040ff,
            0xffffffff,
            0xffffffff,
            0x404040ff,
            0x000000ff
          ]
        },
        'BEZIER 4x4': {
          width: 4,
          height: 4,
          data: [
            0x000000ff,
            0x000000ff,
            0xc0c0c0ff,
            0xffffffff,
            0x000000ff,
            0x000000ff,
            0xc0c0c0ff,
            0xffffffff,
            0xc0c0c0ff,
            0xc0c0c0ff,
            0x606060ff,
            0x404040ff,
            0xffffffff,
            0xffffffff,
            0x404040ff,
            0x000000ff
          ]
        },
        'default 5x2': mkJGD('■■▦□□', '□□▦■■'),
        'NEAREST_NEIGHBOR 5x2': mkJGD('■■■□□', '□□□■■'),
        'BILINEAR 5x2': mkJGD('■■3□□', '□□C■■'),
        'BICUBIC 5x2': {
          width: 5,
          height: 2,
          data: [
            0x000000ff,
            0x000000ff,
            0x000000ff,
            0xffffffff,
            0xffffffff,
            0xdfdfdfff,
            0xdfdfdfff,
            0xdfdfdfff,
            0x202020ff,
            0x202020ff
          ]
        },
        'HERMITE 5x2': {
          width: 5,
          height: 2,
          data: [
            0x000000ff,
            0x000000ff,
            0x000000ff,
            0xffffffff,
            0xffffffff,
            0xdfdfdfff,
            0xdfdfdfff,
            0xdfdfdfff,
            0x202020ff,
            0x202020ff
          ]
        },
        'BEZIER 5x2': {
          width: 5,
          height: 2,
          data: [
            0x000000ff,
            0x000000ff,
            0x000000ff,
            0xffffffff,
            0xffffffff,
            0xdfdfdfff,
            0xdfdfdfff,
            0xdfdfdfff,
            0x202020ff,
            0x202020ff
          ]
        }
      }
    },
    /**********************************************************************/
    {
      title: 'max contrast 12x12 with dots',
      src: jimp.read(
        mkJGD(
          '■■■■■■□□□□□□',
          '■■■■■■□□□□□□',
          '■■■□■■□□■□□□',
          '■■■■■■□□□□□□',
          '■■■■■■□□□□□□',
          '■■■■■■□□□□□□',
          '□□□□□□■■■■■■',
          '□□□□□□■■■■■■',
          '□□□□□□■■■■■■',
          '□□□■□□■■□■■■',
          '□□□□□□■■■■■■',
          '□□□□□□■■■■■■'
        )
      ),
      results: {
        'default 6x6': mkJGD(
          '■■■□□□',
          '■▩■□▥□',
          '■■■□□□',
          '□□□■■■',
          '□▥□■▩■',
          '□□□■■■'
        ),
        'NEAREST_NEIGHBOR 6x6': mkJGD(
          '■■■□□□',
          '■■■□■□',
          '■■■□□□',
          '□□□■■■',
          '□□□■■■',
          '□□□■■■'
        ),
        'BILINEAR 6x6': mkJGD(
          '■■■□□□',
          '■■■□■□',
          '■■■□□□',
          '□□□■■■',
          '□□□■■■',
          '□□□■■■'
        ),
        'BICUBIC 6x6': {
          width: 6,
          height: 6,
          data: [
            0x000000ff,
            0x000000ff,
            0x000000ff,
            0xbfbfbfff,
            0xffffffff,
            0xffffffff,
            0x000000ff,
            0x474747ff,
            0x202020ff,
            0xbfbfbfff,
            0x979797ff,
            0xffffffff,
            0x000000ff,
            0x000000ff,
            0x000000ff,
            0xbfbfbfff,
            0xffffffff,
            0xffffffff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x5f5f5fff,
            0x404040ff,
            0x404040ff,
            0xffffffff,
            0xeeeeeeff,
            0xf7f7f7ff,
            0x404040ff,
            0x181818ff,
            0x000000ff,
            0xffffffff,
            0xc9c9c9ff,
            0xe6e6e6ff,
            0x404040ff,
            0x4e4e4eff,
            0x000000ff
          ]
        },
        'HERMITE 6x6': {
          width: 6,
          height: 6,
          data: [
            0x000000ff,
            0x000000ff,
            0x000000ff,
            0xc0c0c0ff,
            0xffffffff,
            0xffffffff,
            0x000000ff,
            0x404040ff,
            0x191919ff,
            0xc0c0c0ff,
            0xa6a6a6ff,
            0xffffffff,
            0x000000ff,
            0x000000ff,
            0x000000ff,
            0xc0c0c0ff,
            0xffffffff,
            0xffffffff,
            0xc0c0c0ff,
            0xc0c0c0ff,
            0xc0c0c0ff,
            0x606060ff,
            0x404040ff,
            0x404040ff,
            0xffffffff,
            0xf3f3f3ff,
            0xfafafaff,
            0x404040ff,
            0x111111ff,
            0x000000ff,
            0xffffffff,
            0xcbcbcbff,
            0xebebebff,
            0x404040ff,
            0x484848ff,
            0x000000ff
          ]
        },
        'BEZIER 6x6': {
          width: 6,
          height: 6,
          data: [
            0x000000ff,
            0x000000ff,
            0x000000ff,
            0xc0c0c0ff,
            0xffffffff,
            0xffffffff,
            0x000000ff,
            0x444444ff,
            0x1d1d1dff,
            0xc0c0c0ff,
            0x9f9f9fff,
            0xffffffff,
            0x000000ff,
            0x000000ff,
            0x000000ff,
            0xc0c0c0ff,
            0xffffffff,
            0xffffffff,
            0xc0c0c0ff,
            0xc0c0c0ff,
            0xc0c0c0ff,
            0x606060ff,
            0x404040ff,
            0x404040ff,
            0xffffffff,
            0xf0f0f0ff,
            0xf9f9f9ff,
            0x404040ff,
            0x151515ff,
            0x000000ff,
            0xffffffff,
            0xcacacaff,
            0xe9e9e9ff,
            0x404040ff,
            0x4b4b4bff,
            0x000000ff
          ]
        }
      }
    },
    /**********************************************************************/
    {
      title: 'mutch contrast 4x4',
      src: jimp.read(mkJGD('▩▩▥▥', '▩▩▥▥', '▥▥▩▩', '▥▥▩▩')),
      results: {
        'default 6x6': {
          width: 6,
          height: 6,
          data: [
            0x404040ff,
            0x404040ff,
            0x404040ff,
            0x959595ff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x404040ff,
            0x404040ff,
            0x404040ff,
            0x959595ff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x404040ff,
            0x404040ff,
            0x404040ff,
            0x959595ff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x959595ff,
            0x959595ff,
            0x959595ff,
            0x787878ff,
            0x6a6a6aff,
            0x6a6a6aff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x6a6a6aff,
            0x404040ff,
            0x404040ff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x6a6a6aff,
            0x404040ff,
            0x404040ff
          ]
        },
        'NEAREST_NEIGHBOR 6x6': {
          width: 6,
          height: 6,
          data: [
            0x404040ff,
            0x404040ff,
            0x404040ff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x404040ff,
            0x404040ff,
            0x404040ff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x404040ff,
            0x404040ff,
            0x404040ff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x404040ff,
            0x404040ff,
            0x404040ff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x404040ff,
            0x404040ff,
            0x404040ff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x404040ff,
            0x404040ff,
            0x404040ff
          ]
        },
        'BILINEAR 6x6': {
          width: 6,
          height: 6,
          data: [
            0x404040ff,
            0x404040ff,
            0x6a6a6aff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x404040ff,
            0x404040ff,
            0x6a6a6aff,
            0xbfbfbfff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x6a6a6aff,
            0x6a6a6aff,
            0x787878ff,
            0x959595ff,
            0x959595ff,
            0x959595ff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x959595ff,
            0x404040ff,
            0x404040ff,
            0x404040ff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x959595ff,
            0x404040ff,
            0x404040ff,
            0x404040ff,
            0xbfbfbfff,
            0xbfbfbfff,
            0x959595ff,
            0x404040ff,
            0x404040ff,
            0x404040ff
          ]
        },
        'BICUBIC 6x6': {
          width: 6,
          height: 6,
          data: [
            0x404040ff,
            0x303030ff,
            0x404040ff,
            0x7f7f7fff,
            0xbfbfbfff,
            0xcececeff,
            0x303030ff,
            0x1c1c1cff,
            0x303030ff,
            0x7f7f7fff,
            0xcececeff,
            0xe1e1e1ff,
            0x404040ff,
            0x303030ff,
            0x404040ff,
            0x7f7f7fff,
            0xbfbfbfff,
            0xcececeff,
            0x7f7f7fff,
            0x7f7f7fff,
            0x7f7f7fff,
            0x7f7f7fff,
            0x7f7f7fff,
            0x7f7f7fff,
            0xbfbfbfff,
            0xcececeff,
            0xbfbfbfff,
            0x7f7f7fff,
            0x404040ff,
            0x303030ff,
            0xcececeff,
            0xe1e1e1ff,
            0xcececeff,
            0x7f7f7fff,
            0x303030ff,
            0x1c1c1cff
          ]
        },
        'HERMITE 6x6': {
          width: 6,
          height: 6,
          data: [
            0x404040ff,
            0x383838ff,
            0x404040ff,
            0x808080ff,
            0xbfbfbfff,
            0xc7c7c7ff,
            0x383838ff,
            0x2f2f2fff,
            0x383838ff,
            0x808080ff,
            0xc7c7c7ff,
            0xd0d0d0ff,
            0x404040ff,
            0x383838ff,
            0x404040ff,
            0x808080ff,
            0xbfbfbfff,
            0xc7c7c7ff,
            0x808080ff,
            0x808080ff,
            0x808080ff,
            0x808080ff,
            0x808080ff,
            0x808080ff,
            0xbfbfbfff,
            0xc7c7c7ff,
            0xbfbfbfff,
            0x808080ff,
            0x404040ff,
            0x383838ff,
            0xc7c7c7ff,
            0xd0d0d0ff,
            0xc7c7c7ff,
            0x808080ff,
            0x383838ff,
            0x2f2f2fff
          ]
        },
        'BEZIER 6x6': {
          width: 6,
          height: 6,
          data: [
            0x404040ff,
            0x343434ff,
            0x404040ff,
            0x808080ff,
            0xbfbfbfff,
            0xcbcbcbff,
            0x343434ff,
            0x262626ff,
            0x343434ff,
            0x808080ff,
            0xcbcbcbff,
            0xd9d9d9ff,
            0x404040ff,
            0x343434ff,
            0x404040ff,
            0x808080ff,
            0xbfbfbfff,
            0xcbcbcbff,
            0x808080ff,
            0x808080ff,
            0x808080ff,
            0x808080ff,
            0x808080ff,
            0x808080ff,
            0xbfbfbfff,
            0xcbcbcbff,
            0xbfbfbfff,
            0x808080ff,
            0x404040ff,
            0x343434ff,
            0xcbcbcbff,
            0xd9d9d9ff,
            0xcbcbcbff,
            0x808080ff,
            0x343434ff,
            0x262626ff
          ]
        }
      }
    }
  ];

  before(done => {
    const srcImgs = testImages.map(test => test.src);
    Promise.all(srcImgs)
      .then(imgsJimp => {
        for (let i = 0; i < imgsJimp.length; i++) {
          testImages[i].src = imgsJimp[i];
        }
        done();
      })
      .catch(done);
  });

  function testEach(test) {
    describe(test.title, () => {
      hashForEach(test.results, (expectedTitle, expectedJgd) => {
        const mode = Jimp['RESIZE_' + expectedTitle.split(' ')[0]];
        const size = expectedTitle
          .split(' ')[1]
          .split('x')
          .map(n => parseInt(n, 10));
        it('to ' + expectedTitle, () => {
          test.src
            .clone()
            .resize(size[0], size[1], mode)
            .getJGDSync()
            .should.be.sameJGD(expectedJgd);
        });
      });
    });
  }

  testImages.forEach(testEach);
});
