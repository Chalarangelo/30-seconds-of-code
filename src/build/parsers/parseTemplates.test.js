import parseTemplates from './parseTemplates';

import path from 'path';
jest.mock('path');

path.resolve.mockImplementation(jest.fn(f => f));

const templates = [
  {
    'name': 'SnippetPage',
    'path': 'snippetPage/index.jsx',
  },
  {
    'name': 'SearchPage',
    'path': 'searchPage/index.jsx',
  },
];

describe('parseTemplates', () => {
  it('returns an object with the appropriate structure and data', () => {
    expect(parseTemplates(templates, 'my-templates-dir')).toEqual({
      'SnippetPage': 'my-templates-dir/snippetPage/index.jsx',
      'SearchPage': 'my-templates-dir/searchPage/index.jsx',
    });
  });
});
