import { Jimp, mkJGD, hasOwnProp } from '@jimp/test-utils';
import configure from '@jimp/custom';
import blit from '@jimp/plugin-blit';
import resize from '@jimp/plugin-resize';
import scale from '@jimp/plugin-scale';

import contain from '../src';

const jimp = configure({ plugins: [scale, resize, blit, contain] }, Jimp);

describe('All align combinations for contain', () => {
  const verticalJGD = mkJGD(
    '▴▴▴▴▸▸▸▸',
    '▴▴▴▴▸▸▸▸',
    '▴▴▴▴▸▸▸▸',
    '▴▴▴▴▸▸▸▸',
    '▴▴▴▴▸▸▸▸',
    '▴▴▴▴▸▸▸▸',
    '▾▾▾▾◆◆◆◆',
    '▾▾▾▾◆◆◆◆',
    '▾▾▾▾◆◆◆◆',
    '▾▾▾▾◆◆◆◆',
    '▾▾▾▾◆◆◆◆',
    '▾▾▾▾◆◆◆◆'
  );

  const horizontalJGD = mkJGD(
    '▴▴▴▴▴▴▸▸▸▸▸▸',
    '▴▴▴▴▴▴▸▸▸▸▸▸',
    '▴▴▴▴▴▴▸▸▸▸▸▸',
    '▴▴▴▴▴▴▸▸▸▸▸▸',
    '▾▾▾▾▾▾◆◆◆◆◆◆',
    '▾▾▾▾▾▾◆◆◆◆◆◆',
    '▾▾▾▾▾▾◆◆◆◆◆◆',
    '▾▾▾▾▾▾◆◆◆◆◆◆'
  );

  let vertical;
  let horizontal; // stores the Jimp instances of the JGD images above.

  before(done => {
    const img1 = jimp.read(verticalJGD);
    const img2 = jimp.read(horizontalJGD);
    Promise.all([img1, img2])
      .then(images => {
        vertical = images[0];
        horizontal = images[1];
        done();
      })
      .catch(done);
  });

  const tests = {}; // Stores the expected result for each alignment combination.
  tests['LEFT TOP'] = {
    contain: {
      verti: mkJGD('▴▴▸▸  ', '▴▴▸▸  ', '▴▴▸▸  ', '▾▾◆◆  ', '▾▾◆◆  ', '▾▾◆◆  '),
      horiz: mkJGD('▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆', '      ', '      ')
    }
  };
  tests['CENTER TOP'] = {
    contain: {
      verti: mkJGD(' ▴▴▸▸ ', ' ▴▴▸▸ ', ' ▴▴▸▸ ', ' ▾▾◆◆ ', ' ▾▾◆◆ ', ' ▾▾◆◆ '),
      horiz: mkJGD('▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆', '      ', '      ')
    }
  };
  tests['RIGHT TOP'] = {
    contain: {
      verti: mkJGD('  ▴▴▸▸', '  ▴▴▸▸', '  ▴▴▸▸', '  ▾▾◆◆', '  ▾▾◆◆', '  ▾▾◆◆'),
      horiz: mkJGD('▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆', '      ', '      ')
    }
  };

  tests['LEFT MIDDLE'] = {
    contain: {
      verti: mkJGD('▴▴▸▸  ', '▴▴▸▸  ', '▴▴▸▸  ', '▾▾◆◆  ', '▾▾◆◆  ', '▾▾◆◆  '),
      horiz: mkJGD('      ', '▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆', '      ')
    }
  };
  tests['CENTER MIDDLE'] = {
    contain: {
      verti: mkJGD(' ▴▴▸▸ ', ' ▴▴▸▸ ', ' ▴▴▸▸ ', ' ▾▾◆◆ ', ' ▾▾◆◆ ', ' ▾▾◆◆ '),
      horiz: mkJGD('      ', '▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆', '      ')
    }
  };
  tests['RIGHT MIDDLE'] = {
    contain: {
      verti: mkJGD('  ▴▴▸▸', '  ▴▴▸▸', '  ▴▴▸▸', '  ▾▾◆◆', '  ▾▾◆◆', '  ▾▾◆◆'),
      horiz: mkJGD('      ', '▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆', '      ')
    }
  };

  tests['LEFT BOTTOM'] = {
    contain: {
      verti: mkJGD('▴▴▸▸  ', '▴▴▸▸  ', '▴▴▸▸  ', '▾▾◆◆  ', '▾▾◆◆  ', '▾▾◆◆  '),
      horiz: mkJGD('      ', '      ', '▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆')
    }
  };
  tests['CENTER BOTTOM'] = {
    contain: {
      verti: mkJGD(' ▴▴▸▸ ', ' ▴▴▸▸ ', ' ▴▴▸▸ ', ' ▾▾◆◆ ', ' ▾▾◆◆ ', ' ▾▾◆◆ '),
      horiz: mkJGD('      ', '      ', '▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆')
    }
  };
  tests['RIGHT BOTTOM'] = {
    contain: {
      verti: mkJGD('  ▴▴▸▸', '  ▴▴▸▸', '  ▴▴▸▸', '  ▾▾◆◆', '  ▾▾◆◆', '  ▾▾◆◆'),
      horiz: mkJGD('      ', '      ', '▴▴▴▸▸▸', '▴▴▴▸▸▸', '▾▾▾◆◆◆', '▾▾▾◆◆◆')
    }
  };

  function runAlignTest(align) {
    const jgdContainV = tests[align].contain.verti;
    const jgdContainH = tests[align].contain.horiz;
    let a = align.split(' ');
    a = Jimp['HORIZONTAL_ALIGN_' + a[0]] | Jimp['VERTICAL_ALIGN_' + a[1]];
    it('contain aligned to ' + align, () => {
      vertical
        .clone()
        .contain(6, 6, a)
        .getJGDSync()
        .should.be.sameJGD(jgdContainV, 'Vertical image');
      horizontal
        .clone()
        .contain(6, 6, a)
        .getJGDSync()
        .should.be.sameJGD(jgdContainH, 'Horizontal image');
    });
  }

  for (const align in tests) if (hasOwnProp(tests, align)) runAlignTest(align);
});
