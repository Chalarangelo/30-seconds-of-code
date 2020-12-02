import { parseRequirables, parseTemplates } from './parseRequirements';

import glob from 'glob';
import path from 'path';

jest.mock('glob');
jest.mock('path');

const templates = [
  {
    name: 'SnippetPage',
    path: 'snippetPage/index.jsx',
  },
  {
    name: 'SearchPage',
    path: 'searchPage/index.jsx',
  },
];

const mockRequirables = {
  stdRequirable: {
    meta: {
      requirables: ['stdRequirableData'],
      isBlog: false,
      slug: 'std',
      dirName: 'stddir',
      snippetPath: 'snippet_data',
      repoUrlPrefix: 'https://github.com/my-repo',
      biasPenaltyMultiplier: 1.05,
      featured: 1,
      theme: {
        backColor: '#fff',
        foreColor: '#000',
        iconName: 'stdicon',
      },
    },
  },
  ltdRequirable: {
    meta: {
      requirables: ['ltdRequirableData'],
      isBlog: true,
      slug: 'ltd',
      dirName: 'ltddir',
      snippetPath: 'snippets',
      repoUrlPrefix: 'https://github/com/ltd-repo',
      theme: {
        backColor: '#fff',
        foreColor: '#000',
        iconName: 'ltdIcon',
      },
      biasPenaltyMultiplier: 1.0,
      featured: 0,
    },
  },
};

glob.sync.mockImplementation(
  jest
    .fn()
    .mockReturnValueOnce(['stdRequirable.json', 'ltdRequirable.json'])
    .mockReturnValueOnce(['stdRequirable.json'])
    .mockReturnValueOnce(['ltdRequirable.json'])
);
path.resolve.mockImplementation(jest.fn(f => f));

// eslint-disable-next-line no-unused-vars
const stdRequirable = require('stdRequirable.json');
jest.mock('stdRequirable.json', () => mockRequirables['stdRequirable'], {
  virtual: true,
});
// eslint-disable-next-line no-unused-vars
const ltdRequirable = require('ltdRequirable.json');
jest.mock('ltdRequirable.json', () => mockRequirables['ltdRequirable'], {
  virtual: true,
});

describe('parseRequirables', () => {
  it('returns the array of the resulting requirables', () => {
    expect(parseRequirables('my-content-dir')).toEqual([
      {
        ...mockRequirables['stdRequirable'],
        context: mockRequirables['stdRequirable'],
      },
      {
        ...mockRequirables['ltdRequirable'],
        context: mockRequirables['ltdRequirable'],
      },
    ]);
  });
});

describe('parseTemplates', () => {
  it('returns an object with the appropriate structure and data', () => {
    expect(parseTemplates(templates, 'my-templates-dir')).toEqual({
      SnippetPage: 'my-templates-dir/snippetPage/index.jsx',
      SearchPage: 'my-templates-dir/searchPage/index.jsx',
    });
  });
});
