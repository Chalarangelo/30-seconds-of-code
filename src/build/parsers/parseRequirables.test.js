import parseRequirables from './parseRequirables';

import glob from 'glob';
import path from 'path';

jest.mock('glob');
jest.mock('path');

const mockRequirables = {
  'stdRequirable': {
    requirables: [ 'stdRequirableData' ],
    reducer: 'es6Reducer',
    resolver: 'jsxResolver',
    isBlog: false,
    slug: 'std',
    dirName: 'stddir',
    snippetPath: 'snippet_data',
    repoUrl: 'https://github.com/my-repo',
    biasPenaltyMultiplier: 1.05,
    featured: 1,
    theme: {
      backColor: '#fff',
      foreColor: '#000',
      iconName: 'stdicon',
    },
  },
  'ltdRequirable': {
    requirables: [ 'ltdRequirableData' ],
    isBlog: true,
    slug: 'ltd',
    dirName: 'ltddir',
    snippetPath: 'snippets',
    repoUrl: 'https://github/com/ltd-repo',
    theme: {
      backColor: '#fff',
      foreColor: '#000',
      iconName: 'ltdIcon',
    },
  },
};

glob.sync
  .mockReturnValueOnce(Object.keys(mockRequirables))
  .mockReturnValueOnce(['mockFile'])
  .mockReturnValueOnce(['mockOther']);
path.resolve.mockImplementation(jest.fn(f => f));

// eslint-disable-next-line no-unused-vars
const stdRequirable = require('stdRequirable');
jest.mock('stdRequirable',
  () => mockRequirables['stdRequirable'], { virtual: true }
);
// eslint-disable-next-line no-unused-vars
const ltdRequirable = require('ltdRequirable');
jest.mock('ltdRequirable',
  () => mockRequirables['ltdRequirable'], { virtual: true }
);
// eslint-disable-next-line no-unused-vars
const mockFile = require('mockFile');
jest.mock('mockFile',
  () => ({ someData: 'fromFile', meta: {} }), { virtual: true }
);
// eslint-disable-next-line no-unused-vars
const mockOther = require('mockOther');
jest.mock('mockOther',
  () => ({ someData: 'fromOther', meta: {} }), { virtual: true }
);

let resultRequirables;

describe('parseRequirables', () => {
  beforeAll(() => {
    resultRequirables = parseRequirables('my-content-dir');
  });

  it('returns an array of the correct length', () => {
    expect(resultRequirables.length).toBe(2);
  });

  it('returns the correct reducer for each requirable', () => {
    expect(resultRequirables[0].meta.reducer).toBe('es6Reducer');
    expect(resultRequirables[1].meta.reducer).toBe('stdReducer');
  });

  it('returns the correct resolver for each requirable', () => {
    expect(resultRequirables[0].meta.resolver).toBe('jsxResolver');
    expect(resultRequirables[1].meta.resolver).toBe('stdResolver');
  });

  it('returns the correct blog flag for each requirable', () => {
    expect(resultRequirables[0].meta.blog).toBe(false);
    expect(resultRequirables[1].meta.blog).toBe(true);
  });

  it('returns the correct slug prefix for each requirable', () => {
    expect(resultRequirables[0].meta.slugPrefix).toBe('std/s');
    expect(resultRequirables[1].meta.slugPrefix).toBe('ltd/s');
  });

  it('returns the correct source directory path for each requirable', () => {
    expect(resultRequirables[0].meta.sourceDir).toBe('stddir/snippet_data');
    expect(resultRequirables[1].meta.sourceDir).toBe('ltddir/snippets');
  });

  it('returns the correct repository URL for each requirable', () => {
    expect(resultRequirables[0].meta.repoUrlPrefix).toBe('https://github.com/my-repo/blob/master/snippet_data');
    expect(resultRequirables[1].meta.repoUrlPrefix).toBe('https://github/com/ltd-repo/blob/master/snippets');
  });

  it('returns the correct bias multiplier for each requirable', () => {
    expect(resultRequirables[0].meta.biasPenaltyMultiplier).toBe(1.05);
    expect(resultRequirables[1].meta.biasPenaltyMultiplier).toBe(1.0);
  });

  it('returns the correct featured rank for each requirable', () => {
    expect(resultRequirables[0].meta.featured).toBe(1);
    expect(resultRequirables[1].meta.featured).toBe(0);
  });

  it('returns the correct them for each requirable', () => {
    expect(resultRequirables[0].meta.theme).toEqual(mockRequirables['stdRequirable'].theme);
    expect(resultRequirables[1].meta.theme).toEqual(mockRequirables['ltdRequirable'].theme);
  });
});
