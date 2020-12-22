import { SnippetSerializer } from '.';
import { withRecommendations } from 'blocks/decorations/withRecommendations';
import { Snippet } from 'blocks/entities/snippet';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { ArgsError } from 'blocks/utilities/error';
import { rawConfigs } from 'fixtures/blocks/contentConfigs';
import { rawSnippets } from 'fixtures/blocks/snippets';
import { setupEnv } from 'blocks/utilities/env';
import { JSONSerializer } from 'blocks/serializers/json';

JSONSerializer.serializeToDir = jest.fn(() => new Promise(res => res()));

describe('SnippetSerializer', () => {
  let configs = {};
  let snippet;

  beforeAll(() => {
    setupEnv();
    Object.keys(rawConfigs).forEach(name => {
      configs[name] = new ContentConfig(rawConfigs[name]);
    });
    snippet = new Snippet(rawSnippets.normal, configs.react);
  });

  describe('serializeSnippet', () => {
    it('throws if snippet is not of the correct type', () => {
      expect(() => SnippetSerializer.serializeSnippet({})).toThrow(ArgsError);
    });

    it('returns a promise', () => {
      expect(
        SnippetSerializer.serializeSnippet(snippet) instanceof Promise
      ).toBeTruthy();
    });

    it('calls JSONSerializer with the appropriate arguments', () => {
      return SnippetSerializer.serializeSnippet(
        withRecommendations(snippet)
      ).then(() => {
        const args = JSONSerializer.serializeToDir.mock.calls.slice(-1)[0];
        expect(args.length).toBe(5);
        expect(typeof args[0]).toBe('string');
        expect(args[1][0]).toBe('index');
        expect(args[2][0]).toBe('snippet');
        expect(args[3][0]).toBe('metadata');
        expect(args[4][0]).toBe('recommendations');
      });
    });
  });
});
