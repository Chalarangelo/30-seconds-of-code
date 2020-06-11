import parseConfigs from './parseConfigs';

import glob from 'glob';
import path from 'path';

jest.mock('glob');
jest.mock('path');

glob.sync.mockImplementation(jest.fn(() => ['my-config.json']));
path.resolve.mockImplementation(jest.fn(f => f));

// eslint-disable-next-line no-unused-vars
const myConfigJSON = require('my-config.json');
jest.mock('my-config.json',
  () => ({
    images: {
      name: 'my-images',
      path: 'my-images/',
    },
    dirName: 'my-dir',
    snippetPath: 'my-snippets',
  }),
  { virtual: true }
);

describe('parseConfigs', () => {
  it('returns an array of objects usable by gatsby', () => {
    expect(parseConfigs('my-content-dir')).toEqual([
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'my-images',
          path: 'my-content-dir/sources/my-dir/my-images/',
        },
      },
    ]);
  });
});
