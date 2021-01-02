import { Path } from '.';
import { Env } from 'blocks/utilities/env';

describe('Path', () => {
  beforeAll(() => {
    Env.setup();
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
