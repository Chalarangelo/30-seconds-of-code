import { Recommender } from '.';
import { Snippet } from 'blocks/entities/snippet';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { ArgsError } from 'blocks/utilities/error';
import { rawConfigs } from 'fixtures/blocks/contentConfigs';
import { rawSnippets } from 'fixtures/blocks/snippets';
import { setupEnv } from 'blocks/utilities/env';

describe('Recommender', () => {
  let configs = {};
  let snippets = [];
  beforeAll(() => {
    setupEnv();
    Object.keys(rawConfigs).forEach(name => {
      configs[name] = new ContentConfig(rawConfigs[name]);
    });
    snippets.push(new Snippet(rawSnippets.normal, configs.react));
    snippets.push(new Snippet(rawSnippets.blog, configs.blog));
    snippets.push(new Snippet(rawSnippets.normal, configs.dart));
    snippets.push(new Snippet(rawSnippets.css, configs.css));
  });

  describe('recommendSnippets', () => {
    it('throws if snippet is not of the correct type', () => {
      expect(() => Recommender.recommendSnippets({})).toThrow(ArgsError);
    });

    it('returns an array of snippets with the correct length', () => {
      snippets.forEach(snippet => {
        const recommendations = Recommender.recommendSnippets(snippet);
        expect(recommendations.length).toBe(3);
      });
    });
  });
});
