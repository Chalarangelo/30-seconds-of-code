import parseQueries from './parseQueries';

import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';

jest.mock('glob');
jest.mock('path');
jest.mock('fs-extra');

const mockQuery = `query {
  searchIndex: allSnippet(
    sort: {fields: ranking, order: DESC}
  ) {
    edges {
      node {
        slug
      }
    }
  }
}`;

glob.sync.mockImplementation(jest.fn(() => ['my-query.graphql']));
path.resolve.mockImplementation(jest.fn(f => f));
fs.readFileSync.mockImplementation(() => mockQuery);

let resultQuery;

describe('parseQueries', () => {
  beforeAll(() => {
    resultQuery = parseQueries('my-queries-dir');
  });
  it('returns a usable GraphQL query', () => {
    expect(resultQuery.indexOf('query')).not.toBe(-1);
    expect(resultQuery.indexOf('searchIndex')).not.toBe(-1);
    expect(resultQuery.indexOf('edges')).not.toBe(-1);
    expect(resultQuery.indexOf('node')).not.toBe(-1);
    expect(resultQuery.indexOf('slug')).not.toBe(-1);
  });
});
