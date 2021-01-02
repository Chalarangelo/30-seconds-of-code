import { Ranker } from '.';
import { Snippet } from 'blocks/entities/snippet';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { ArgsError } from 'blocks/utilities/error';
import { rawConfigs } from 'fixtures/blocks/contentConfigs';
import { rawSnippets } from 'fixtures/blocks/snippets';
import { Env } from 'blocks/utilities/env';

describe('Ranker', () => {
  let configs = {};
  let snippets = [];
  beforeAll(() => {
    Env.setup();
    Object.keys(rawConfigs).forEach(name => {
      configs[name] = new ContentConfig(rawConfigs[name]);
    });
    snippets.push(new Snippet(rawSnippets.normal, configs.react));
    snippets.push(new Snippet(rawSnippets.blog, configs.blog));
    snippets.push(new Snippet(rawSnippets.normal, configs.dart));
    snippets.push(new Snippet(rawSnippets.css, configs.css));
  });

  describe('rankSnippet', () => {
    it('throws if snippet is not of the correct type', () => {
      expect(() => Ranker.rankSnippet({})).toThrow(ArgsError);
    });

    it('returns a value between 0.0 and 1.0', () => {
      snippets.forEach(snippet => {
        const ranking = Ranker.rankSnippet(snippet);
        expect(ranking).toBeGreaterThanOrEqual(0.0);
        expect(ranking).toBeLessThanOrEqual(1.0);
      });
    });
  });
});
