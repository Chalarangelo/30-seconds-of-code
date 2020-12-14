import { Path } from '.';
import { setupEnv } from 'blocks/utilities/env';

describe('Path', () => {
  beforeAll(() => {
    setupEnv();
  });

  describe('findContentConfigFromRawSnippet', () => {
    it('returns the correct result', () => {
      expect(
        Path.findContentConfigFromRawSnippet(
          'content/sources/30code/snippets/any.md'
        ).name
      ).toBe('30 seconds of code');
    });
  });

  describe('findSlugFromRawSnippet', () => {
    it('returns the correct result', () => {
      expect(
        Path.findSlugFromRawSnippet('content/sources/30code/snippets/any.md')
      ).toBe('/js/s/any');
    });
  });
});
