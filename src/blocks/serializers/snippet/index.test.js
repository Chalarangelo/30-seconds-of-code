import { SnippetSerializer } from '.';
import { withRecommendations } from 'blocks/decorations/withRecommendations';
import { ArgsError } from 'blocks/utilities/error';
import { JSONSerializer } from 'blocks/serializers/json';
import SnippetFactory from 'test/fixtures/factories/blockSnippet';

JSONSerializer.serializeToDir = jest.fn(() => new Promise(res => res()));

describe('SnippetSerializer', () => {
  let snippet;

  beforeAll(() => {
    snippet = SnippetFactory.create('Snippet', 'react');
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
