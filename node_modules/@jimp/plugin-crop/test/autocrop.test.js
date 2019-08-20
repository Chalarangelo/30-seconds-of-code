import { Jimp, mkJGD } from '@jimp/test-utils';
import configure from '@jimp/custom';

import crop from '../src';

const jimp = configure({ plugins: [crop] }, Jimp);

describe('Autocrop', () => {
  it('image with transparent surround color', async () => {
    const imgSrc = await jimp.read(
      mkJGD(
        '          ',
        '    ◆◆    ',
        '   ◆▦▦◆   ',
        '  ◆▦▦▦▦◆  ',
        '   ◆▦▦◆   ',
        '    ◆◆    ',
        '          '
      )
    );

    imgSrc
      .autocrop()
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD('  ◆◆  ', ' ◆▦▦◆ ', '◆▦▦▦▦◆', ' ◆▦▦◆ ', '  ◆◆  ')
      );
  });

  it('image with opaque surround color', async () => {
    const imgSrc = await jimp.read(
      mkJGD(
        '▥▥▥▥▥▥▥▥▥▥',
        '▥▥▥▥◆◆▥▥▥▥',
        '▥▥▥◆▦▦◆▥▥▥',
        '▥▥◆▦▦▦▦◆▥▥',
        '▥▥▥◆▦▦◆▥▥▥',
        '▥▥▥▥◆◆▥▥▥▥',
        '▥▥▥▥▥▥▥▥▥▥'
      )
    );

    imgSrc
      .autocrop()
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD('▥▥◆◆▥▥', '▥◆▦▦◆▥', '◆▦▦▦▦◆', '▥◆▦▦◆▥', '▥▥◆◆▥▥')
      );
  });

  it('image with one color border', async () => {
    const imgSrc = await jimp.read(
      mkJGD(
        '▥▥▥▥▥▥▥▥▥▥▥▥',
        '▥▥▥▥▥▥▥▥▥▥▥▥',
        '▥▥   ◆◆   ▥▥',
        '▥▥  ◆▦▦◆  ▥▥',
        '▥▥ ◆▦▦▦▦◆ ▥▥',
        '▥▥  ◆▦▦◆  ▥▥',
        '▥▥   ◆◆   ▥▥',
        '▥▥▥▥▥▥▥▥▥▥▥▥',
        '▥▥▥▥▥▥▥▥▥▥▥▥'
      )
    );

    imgSrc
      .autocrop()
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD('   ◆◆   ', '  ◆▦▦◆  ', ' ◆▦▦▦▦◆ ', '  ◆▦▦◆  ', '   ◆◆   ')
      );
  });

  it('image border with small variation', async () => {
    const imgSrc = await jimp.read(
      mkJGD(
        '323232323232',
        '232323232323',
        '32   ◆◆   32',
        '23  ◆▦▦◆  23',
        '32 ◆▦▦▦▦◆ 32',
        '23  ◆▦▦◆  23',
        '32   ◆◆   32',
        '232323232323',
        '323232323232'
      )
    );
    imgSrc
      .clone()
      .autocrop()
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '323232323232',
          '232323232323',
          '32   ◆◆   32',
          '23  ◆▦▦◆  23',
          '32 ◆▦▦▦▦◆ 32',
          '23  ◆▦▦◆  23',
          '32   ◆◆   32',
          '232323232323',
          '323232323232'
        )
      );
    imgSrc
      .clone()
      .autocrop(0.005)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD('   ◆◆   ', '  ◆▦▦◆  ', ' ◆▦▦▦▦◆ ', '  ◆▦▦◆  ', '   ◆◆   ')
      );
  });

  it('image border with small variation configured by options', async () => {
    const imgSrc = await Jimp.read(
      mkJGD(
        '323232323232',
        '232323232323',
        '32   ◆◆   32',
        '23  ◆▦▦◆  23',
        '32 ◆▦▦▦▦◆ 32',
        '23  ◆▦▦◆  23',
        '32   ◆◆   32',
        '232323232323',
        '323232323232'
      )
    );
    imgSrc
      .clone()
      .autocrop()
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '323232323232',
          '232323232323',
          '32   ◆◆   32',
          '23  ◆▦▦◆  23',
          '32 ◆▦▦▦▦◆ 32',
          '23  ◆▦▦◆  23',
          '32   ◆◆   32',
          '232323232323',
          '323232323232'
        )
      );
    imgSrc
      .clone()
      .autocrop({ tolerance: 0.005 })
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD('   ◆◆   ', '  ◆▦▦◆  ', ' ◆▦▦▦▦◆ ', '  ◆▦▦◆  ', '   ◆◆   ')
      );
  });

  it('image without frame', async () => {
    const imgSrc = await Jimp.read(
      mkJGD(
        '▥▥   ◆◆   ',
        '▥▥  ◆▦▦◆  ',
        '▥▥ ◆▦▦▦▦◆ ',
        '▥▥  ◆▦▦◆  ',
        '▥▥   ◆◆   ',
        '▥▥▥▥▥▥▥▥▥▥',
        '▥▥▥▥▥▥▥▥▥▥'
      )
    );

    imgSrc
      .autocrop(false)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD('   ◆◆   ', '  ◆▦▦◆  ', ' ◆▦▦▦▦◆ ', '  ◆▦▦◆  ', '   ◆◆   ')
      );
  });

  it('image without frame configured by options', async () => {
    const imgSrc = await Jimp.read(
      mkJGD(
        '▥▥   ◆◆   ',
        '▥▥  ◆▦▦◆  ',
        '▥▥ ◆▦▦▦▦◆ ',
        '▥▥  ◆▦▦◆  ',
        '▥▥   ◆◆   ',
        '▥▥▥▥▥▥▥▥▥▥',
        '▥▥▥▥▥▥▥▥▥▥'
      )
    );

    imgSrc
      .autocrop({ cropOnlyFrames: false })
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD('   ◆◆   ', '  ◆▦▦◆  ', ' ◆▦▦▦▦◆ ', '  ◆▦▦◆  ', '   ◆◆   ')
      );
  });

  it('image with symmetric border configured by options', async () => {
    const imgSrc = await Jimp.read(
      mkJGD(
        '▥▥▥▥▥▥▥▥▥▥▥▥▥▥',
        '▥▥   ◆◆   ▥▥▥▥',
        '▥▥  ◆▦▦◆  ▥▥▥▥',
        '▥▥ ◆▦▦▦▦◆ ▥▥▥▥',
        '▥▥  ◆▦▦◆  ▥▥▥▥',
        '▥▥   ◆◆   ▥▥▥▥',
        '▥▥▥▥▥▥▥▥▥▥▥▥▥▥',
        '▥▥▥▥▥▥▥▥▥▥▥▥▥▥'
      )
    );

    imgSrc
      .autocrop({ cropSymmetric: true })
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '   ◆◆   ▥▥',
          '  ◆▦▦◆  ▥▥',
          ' ◆▦▦▦▦◆ ▥▥',
          '  ◆▦▦◆  ▥▥',
          '   ◆◆   ▥▥',
          '▥▥▥▥▥▥▥▥▥▥'
        )
      );
  });

  it('image without frame and with symmetric border configured by options', async () => {
    const imgSrc = await Jimp.read(
      mkJGD(
        '▥▥   ◆◆   ▥▥▥▥',
        '▥▥  ◆▦▦◆  ▥▥▥▥',
        '▥▥ ◆▦▦▦▦◆ ▥▥▥▥',
        '▥▥  ◆▦▦◆  ▥▥▥▥',
        '▥▥   ◆◆   ▥▥▥▥',
        '▥▥▥▥▥▥▥▥▥▥▥▥▥▥',
        '▥▥▥▥▥▥▥▥▥▥▥▥▥▥'
      )
    );
    imgSrc
      .autocrop({ cropSymmetric: true, cropOnlyFrames: false })
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '   ◆◆   ▥▥',
          '  ◆▦▦◆  ▥▥',
          ' ◆▦▦▦▦◆ ▥▥',
          '  ◆▦▦◆  ▥▥',
          '   ◆◆   ▥▥',
          '▥▥▥▥▥▥▥▥▥▥',
          '▥▥▥▥▥▥▥▥▥▥'
        )
      );
  });

  it('image without frame and with with some border left', async () => {
    const imgSrc = await Jimp.read(
      mkJGD(
        '323232323232',
        '232323232323',
        '32   ◆◆   32',
        '23  ◆▦▦◆  23',
        '32 ◆▦▦▦▦◆ 32',
        '23  ◆▦▦◆  23',
        '32   ◆◆   32',
        '232323232323',
        '323232323232'
      )
    );

    imgSrc
      .autocrop({
        tolerance: 0.005,
        leaveBorder: 1
      })
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '3232323232',
          '2   ◆◆   3',
          '3  ◆▦▦◆  2',
          '2 ◆▦▦▦▦◆ 3',
          '3  ◆▦▦◆  2',
          '2   ◆◆   3',
          '3232323232'
        )
      );
  });

  it('image with top and bottom frame and leaveBorder', async () => {
    const imgSrc = await Jimp.read(
      mkJGD(
        '▥▥▥▥▥▥▥▥',
        '▥▥▥▥▥▥▥▥',
        '▥▥▥▥▥▥▥▥',
        '   ◆◆   ',
        '  ◆▦▦◆  ',
        ' ◆▦▦▦▦◆ ',
        '  ◆▦▦◆  ',
        '   ◆◆   ',
        '▥▥▥▥▥▥▥▥',
        '▥▥▥▥▥▥▥▥',
        '▥▥▥▥▥▥▥▥'
      )
    );
    imgSrc
      .autocrop({ cropSymmetric: true, cropOnlyFrames: false, leaveBorder: 2 })
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '▥▥▥▥▥▥▥▥',
          '▥▥▥▥▥▥▥▥',
          '   ◆◆   ',
          '  ◆▦▦◆  ',
          ' ◆▦▦▦▦◆ ',
          '  ◆▦▦◆  ',
          '   ◆◆   ',
          '▥▥▥▥▥▥▥▥',
          '▥▥▥▥▥▥▥▥'
        )
      );
  });
});
