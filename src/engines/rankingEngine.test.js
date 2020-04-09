import rankingEngine from './rankingEngine';

import { rawSnippet, rawBlogSnippet } from 'fixtures/snippets';

describe('rankingEngine', () => {
  it('provides a ranking between 0 and 1 for a given snippet', () => {
    expect(rankingEngine(rawSnippet)).toBeGreaterThanOrEqual(0);
    expect(rankingEngine(rawSnippet)).toBeLessThanOrEqual(1);
  });

  it('provides a ranking between 0 and 1 for a given blog snippet', () => {
    expect(rankingEngine(rawBlogSnippet)).toBeGreaterThanOrEqual(0);
    expect(rankingEngine(rawBlogSnippet)).toBeLessThanOrEqual(1);
  });
});
