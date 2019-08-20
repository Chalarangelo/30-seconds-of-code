import { Jimp, mkJGD } from '@jimp/test-utils';
import configure from '@jimp/custom';
import blit from '@jimp/plugin-blit';
import crop from '@jimp/plugin-crop';
import resize from '@jimp/plugin-resize';

import rotate from '../src';

const jimp = configure({ plugins: [rotate, blit, crop, resize] }, Jimp);

describe('Rotate a image with even size', () => {
  let imgSrc = null;

  before(done => {
    jimp
      .read(
        mkJGD(
          '▰▴▴▴▪▪▪▰',
          '▴▴▴▴▪▪▪▪',
          '▴▴▴▴▪▪▪▪',
          '▴▴▴▴▪▪▪▪',
          '▪▪▪▪▴▴▴▴',
          '▪▪▪▪▴▴▴▴',
          '▪▪▪▪▴▴▴▴',
          '▦▪▪▪▴▴▴▦'
        )
      )
      .then(imgJimp => {
        imgSrc = imgJimp;
        done();
      })
      .catch(done);
  });

  it('1 degrees', () => {
    imgSrc
      .clone()
      .rotate(1, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '▰▴▴▴▪▪▪▰  ',
          '▴▴▴▴▪▪▪▪  ',
          '▴▴▴▴▪▪▪▪  ',
          '▴▴▴▴▪▪▪▪  ',
          '▪▪▪▪▴▴▴▴  ',
          '▪▪▪▪▴▴▴▴  ',
          '▪▪▪▪▴▴▴▴  ',
          '▦▪▪▪▴▴▴▦  ',
          '          ',
          '          '
        )
      );
  });

  it('91 degrees', () => {
    imgSrc
      .clone()
      .rotate(91, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '          ',
          '▰▪▪▪▴▴▴▦  ',
          '▪▪▪▪▴▴▴▴  ',
          '▪▪▪▪▴▴▴▴  ',
          '▪▪▪▪▴▴▴▴  ',
          '▴▴▴▴▪▪▪▪  ',
          '▴▴▴▴▪▪▪▪  ',
          '▴▴▴▴▪▪▪▪  ',
          '▰▴▴▴▪▪▪▦  ',
          '          '
        )
      );
  });

  it('30 degrees', () => {
    imgSrc
      .clone()
      .rotate(30, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '     ▰▰     ',
          '   ▪▪▪▪     ',
          '  ▴▪▪▪▪▪    ',
          '▴▴▴▴▪▪▪▪    ',
          '▴▴▴▴▪▪▴▴▴   ',
          '▴▴▴▴▪▴▴▴▴▴  ',
          ' ▴▴▪▪▴▴▴▴▦  ',
          ' ▪▪▪▪▪▴▴▴   ',
          '  ▪▪▪▪▪     ',
          '   ▪▪▪      ',
          '   ▦        ',
          '            '
        )
      );
  });

  it('45 degrees', () => {
    imgSrc
      .clone()
      .rotate(45, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '              ',
          '     ▰        ',
          '    ▪▪▪       ',
          '   ▪▪▪▪▪      ',
          '  ▴▴▪▪▪▪▴     ',
          ' ▴▴▴▴▪▪▴▴▴    ',
          '▰▰▴▴▴▴▴▴▴▴▦   ',
          ' ▴▴▴▴▪▪▴▴▴    ',
          '  ▴▴▪▪▪▪▴     ',
          '   ▪▪▪▪▪      ',
          '    ▪▪▪       ',
          '     ▦        ',
          '              ',
          '              '
        )
      );
  });

  it('60 degrees', () => {
    imgSrc
      .clone()
      .rotate(60, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '   ▰        ',
          '   ▪▪▪      ',
          '  ▪▪▪▪▪     ',
          ' ▪▪▪▪▪▴▴▴   ',
          ' ▴▴▪▪▴▴▴▴▦  ',
          '▴▴▴▴▪▴▴▴▴▴  ',
          '▴▴▴▴▪▪▴▴▴   ',
          '▴▴▴▴▪▪▪▪    ',
          '  ▴▪▪▪▪▪    ',
          '   ▪▪▪▪     ',
          '     ▦▦     ',
          '            '
        )
      );
  });

  it('90 degrees', () => {
    imgSrc
      .clone()
      .rotate(90, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '          ',
          '▰▪▪▪▴▴▴▦  ',
          '▪▪▪▪▴▴▴▴  ',
          '▪▪▪▪▴▴▴▴  ',
          '▪▪▪▪▴▴▴▴  ',
          '▴▴▴▴▪▪▪▪  ',
          '▴▴▴▴▪▪▪▪  ',
          '▴▴▴▴▪▪▪▪  ',
          '▰▴▴▴▪▪▪▦  ',
          '          '
        )
      );
  });

  it('120 degrees', () => {
    imgSrc
      .clone()
      .rotate(120, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '            ',
          '     ▴▦     ',
          '    ▴▴▴▴    ',
          '  ▪▪▴▴▴▴    ',
          '▰▪▪▪▴▴▴▴▪   ',
          '▰▪▪▪▪▴▴▪▪▪  ',
          ' ▪▪▪▪▪▪▪▪▪  ',
          ' ▪▪▴▴▴▪▪▪▪▦ ',
          '  ▴▴▴▴▴▪▪   ',
          '   ▴▴▴▴▪    ',
          '   ▴▴▴      ',
          '            '
        )
      );
  });

  it('135 degrees', () => {
    imgSrc
      .clone()
      .rotate(135, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '              ',
          '              ',
          '      ▦       ',
          '     ▴▴▴      ',
          '    ▴▴▴▴▴     ',
          '   ▪▪▴▴▴▪▪    ',
          '  ▪▪▪▪▴▪▪▪▪   ',
          ' ▰▪▪▪▪▴▪▪▪▪▦  ',
          '  ▪▪▪▴▴▴▪▪▪   ',
          '   ▪▴▴▴▴▴▪    ',
          '    ▴▴▴▴▴     ',
          '     ▴▰▴      ',
          '      ▰       ',
          '              '
        )
      );
  });

  it('180 degrees', () => {
    imgSrc
      .clone()
      .rotate(180, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '          ',
          ' ▦▴▴▴▪▪▪▦ ',
          ' ▴▴▴▴▪▪▪▪ ',
          ' ▴▴▴▴▪▪▪▪ ',
          ' ▴▴▴▴▪▪▪▪ ',
          ' ▪▪▪▪▴▴▴▴ ',
          ' ▪▪▪▪▴▴▴▴ ',
          ' ▪▪▪▪▴▴▴▴ ',
          ' ▰▪▪▪▴▴▴▰ ',
          '          '
        )
      );
  });

  it('225 degrees', () => {
    imgSrc
      .clone()
      .rotate(225, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '              ',
          '       ▦      ',
          '      ▪▪▪     ',
          '     ▪▪▪▪▪    ',
          '    ▴▪▪▪▪▴▴   ',
          '   ▴▴▴▪▪▴▴▴▴  ',
          '  ▦▴▴▴▴▴▴▴▴▰▰ ',
          '   ▴▴▴▪▪▴▴▴▴  ',
          '    ▴▪▪▪▪▴▴   ',
          '     ▪▪▪▪▪    ',
          '      ▪▪▪     ',
          '       ▰      ',
          '              ',
          '              '
        )
      );
  });

  it('270 degrees', () => {
    imgSrc
      .clone()
      .rotate(270, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          ' ▦▪▪▪▴▴▴▰ ',
          ' ▪▪▪▪▴▴▴▴ ',
          ' ▪▪▪▪▴▴▴▴ ',
          ' ▪▪▪▪▴▴▴▴ ',
          ' ▴▴▴▴▪▪▪▪ ',
          ' ▴▴▴▴▪▪▪▪ ',
          ' ▴▴▴▴▪▪▪▪ ',
          ' ▦▴▴▴▪▪▪▰ ',
          '          ',
          '          '
        )
      );
  });

  it('315 degrees', () => {
    imgSrc
      .clone()
      .rotate(315, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '      ▰       ',
          '     ▴▰▴      ',
          '    ▴▴▴▴▴     ',
          '   ▪▴▴▴▴▴▪    ',
          '  ▪▪▪▴▴▴▪▪▪   ',
          ' ▦▪▪▪▪▴▪▪▪▪▰  ',
          '  ▪▪▪▪▴▪▪▪▪   ',
          '   ▪▪▴▴▴▪▪    ',
          '    ▴▴▴▴▴     ',
          '     ▴▴▴      ',
          '      ▦       ',
          '              ',
          '              ',
          '              '
        )
      );
  });

  it('360 degrees', () => {
    imgSrc
      .clone()
      .rotate(360, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '▰▴▴▴▪▪▪▰  ',
          '▴▴▴▴▪▪▪▪  ',
          '▴▴▴▴▪▪▪▪  ',
          '▴▴▴▴▪▪▪▪  ',
          '▪▪▪▪▴▴▴▴  ',
          '▪▪▪▪▴▴▴▴  ',
          '▪▪▪▪▴▴▴▴  ',
          '▦▪▪▪▴▴▴▦  ',
          '          ',
          '          '
        )
      );
  });
});

describe('Rotate a image with odd size', () => {
  let imgSrc = null;
  before(done => {
    jimp
      .read(
        mkJGD(
          '▴▴▴▦▪▪▪',
          '▴▴▴▦▪▪▪',
          '▴▴▴▦▪▪▪',
          '▦▦▦▦▦▦▦',
          '▴▴▴▦▴▴▴',
          '▴▴▴▦▴▴▴',
          '▴▴▴▦▴▴▴'
        )
      )
      .then(imgJimp => {
        imgSrc = imgJimp;
        done();
      })
      .catch(done);
  });

  it('45 degrees', () => {
    imgSrc
      .clone()
      .rotate(45, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '            ',
          '     ▪      ',
          '    ▪▪▪     ',
          '   ▦▪▪▪▦    ',
          '  ▴▴▦▪▦▴▴   ',
          ' ▴▴▴▴▦▴▴▴▴  ',
          '  ▴▴▦▴▦▴▴   ',
          '   ▦▴▴▴▦    ',
          '    ▴▴▴     ',
          '     ▴      ',
          '            ',
          '            '
        )
      );
  });

  it('135 degrees', () => {
    imgSrc
      .clone()
      .rotate(135, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '            ',
          '     ▴      ',
          '    ▴▴▴     ',
          '   ▦▴▴▴▦    ',
          '  ▪▪▦▴▦▴▴   ',
          ' ▪▪▪▪▦▴▴▴▴  ',
          '  ▪▪▦▴▦▴▴   ',
          '   ▦▴▴▴▦    ',
          '    ▴▴▴     ',
          '     ▴      ',
          '            ',
          '            '
        )
      );
  });

  it('225 degrees', () => {
    imgSrc
      .clone()
      .rotate(225, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '            ',
          '     ▴      ',
          '    ▴▴▴     ',
          '   ▦▴▴▴▦    ',
          '  ▴▴▦▴▦▴▴   ',
          ' ▴▴▴▴▦▴▴▴▴  ',
          '  ▴▴▦▪▦▴▴   ',
          '   ▦▪▪▪▦    ',
          '    ▪▪▪     ',
          '     ▪      ',
          '            ',
          '            '
        )
      );
  });

  it('315 degrees', () => {
    imgSrc
      .clone()
      .rotate(315, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '            ',
          '     ▴      ',
          '    ▴▴▴     ',
          '   ▦▴▴▴▦    ',
          '  ▴▴▦▴▦▪▪   ',
          ' ▴▴▴▴▦▪▪▪▪  ',
          '  ▴▴▦▴▦▪▪   ',
          '   ▦▴▴▴▦    ',
          '    ▴▴▴     ',
          '     ▴      ',
          '            ',
          '            '
        )
      );
  });
});

describe('Rotate a non-square image', () => {
  let imgSrc = null;
  before(done => {
    jimp
      .read(mkJGD('▴▴▴▴▪▪▪▪', '▴▴▴▴▪▪▪▪', '▦▦▦▦▴▴▴▴', '▦▦▦▦▴▴▴▴'))
      .then(imgJimp => {
        imgSrc = imgJimp;
        done();
      })
      .catch(done);
  });

  it('1 degrees', () => {
    imgSrc
      .clone()
      .rotate(1, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '▴▴▴▴▪▪▪▪  ',
          '▴▴▴▴▪▪▪▪  ',
          '▦▦▦▦▴▴▴▴  ',
          '▦▦▦▦▴▴▴▴  ',
          '          ',
          '          '
        )
      );
  });

  it('10 degrees', () => {
    imgSrc
      .clone()
      .rotate(10, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '       ▪  ',
          ' ▴▴▴▪▪▪▪  ',
          '▴▴▴▴▪▪▪▴  ',
          '▴▴▦▦▴▴▴▴  ',
          '▦▦▦▦▴▴▴   ',
          '▦▦        ',
          '          ',
          '          '
        )
      );
  });

  it('30 degrees', () => {
    imgSrc
      .clone()
      .rotate(30, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '          ',
          '     ▪▪   ',
          '   ▪▪▪▪   ',
          ' ▴▴▪▪▴▴▴  ',
          '▴▴▴▦▴▴▴   ',
          '▴▴▦▦▴▴    ',
          '▦▦▦▦      ',
          ' ▦        ',
          '          ',
          '          '
        )
      );
  });

  it('45 degrees', () => {
    imgSrc
      .clone()
      .rotate(45, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '          ',
          '    ▪▪    ',
          '   ▪▪▪▴   ',
          '  ▴▪▪▴▴▴  ',
          ' ▴▴▴▴▴▴   ',
          '▴▴▴▦▦▴    ',
          '▴▴▦▦▦     ',
          ' ▦▦▦      ',
          '  ▦       ',
          '          '
        )
      );
  });

  it('90 degrees', () => {
    imgSrc
      .clone()
      .rotate(90, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '      ',
          '▪▪▴▴  ',
          '▪▪▴▴  ',
          '▪▪▴▴  ',
          '▪▪▴▴  ',
          '▴▴▦▦  ',
          '▴▴▦▦  ',
          '▴▴▦▦  ',
          '▴▴▦▦  ',
          '      '
        )
      );
  });

  it('135 degrees', () => {
    imgSrc
      .clone()
      .rotate(135, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '          ',
          '   ▴      ',
          '  ▴▴▴     ',
          ' ▪▪▴▴▴    ',
          ' ▪▪▪▴▦▦   ',
          '  ▪▪▴▦▦▦  ',
          '   ▴▴▴▦▦▦ ',
          '    ▴▴▴▦  ',
          '     ▴▴   ',
          '          '
        )
      );
  });

  it('180 degrees', () => {
    imgSrc
      .clone()
      .rotate(180, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '          ',
          ' ▴▴▴▴▦▦▦▦ ',
          ' ▴▴▴▴▦▦▦▦ ',
          ' ▪▪▪▪▴▴▴▴ ',
          ' ▪▪▪▪▴▴▴▴ ',
          '          '
        )
      );
  });

  it('225 degrees', () => {
    imgSrc
      .clone()
      .rotate(225, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '      ▦   ',
          '     ▦▦▦  ',
          '    ▦▦▦▴▴ ',
          '   ▴▦▦▴▴▴ ',
          '  ▴▴▴▴▴▴  ',
          ' ▴▴▴▪▪▴   ',
          '  ▴▪▪▪    ',
          '   ▪▪     ',
          '          ',
          '          '
        )
      );
  });

  it('315 degrees', () => {
    imgSrc
      .clone()
      .rotate(315, true)
      .getJGDSync()
      .should.be.sameJGD(
        mkJGD(
          '  ▴▴      ',
          ' ▦▴▴▴     ',
          '▦▦▦▴▴▴    ',
          ' ▦▦▦▴▪▪   ',
          '  ▦▦▴▪▪▪  ',
          '   ▴▴▴▪▪  ',
          '    ▴▴▴   ',
          '     ▴    ',
          '          ',
          '          '
        )
      );
  });
});
