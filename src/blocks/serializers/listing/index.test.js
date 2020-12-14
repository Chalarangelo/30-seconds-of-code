import { ListingSerializer } from '.';
import { SnippetCollection } from 'blocks/entities/snippetCollection';
import { Snippet } from 'blocks/entities/snippet';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { rawConfigs } from 'fixtures/blocks/contentConfigs';
import { rawSnippets } from 'fixtures/blocks/snippets';
import { setupEnv } from 'blocks/utilities/env';
import { JSONSerializer } from 'blocks/serializers/json';

JSONSerializer.serializeToDir = jest.fn(() => new Promise(res => res()));

describe('ListingSerializer', () => {
  let configs = {};
  let snippets = [];
  let collections = {};
  beforeAll(() => {
    setupEnv();
    Object.keys(rawConfigs).forEach(name => {
      configs[name] = new ContentConfig(rawConfigs[name]);
    });
    snippets.push(new Snippet(rawSnippets.normal, configs.react));
    snippets.push(new Snippet(rawSnippets.blog, configs.blog));
    snippets.push(new Snippet(rawSnippets.normal, configs.dart));
    snippets.push(new Snippet(rawSnippets.css, configs.css));
    collections.main = new SnippetCollection(
      {
        type: 'main',
        slugPrefix: 'main',
      },
      snippets
    );
    collections.blog = new SnippetCollection(
      {
        type: 'blog',
        slugPrefix: 'blog',
        config: configs.blog,
      },
      [snippets[1]]
    );
    collections.language = new SnippetCollection(
      {
        type: 'language',
        slugPrefix: 'dart',
        config: configs.dart,
      },
      [snippets[2]]
    );
    collections.tag = new SnippetCollection(
      {
        type: 'tag',
        slugPrefix: 'dart/t/list',
        config: configs.dart,
        parentCollection: collections.language,
        tag: 'list',
      },
      [snippets[2]]
    );
  });

  describe('serializeListings', () => {
    it('throws if snippetCollection is not of the correct type', done => {
      // This is a little different from other promise function throws, due to
      // it being an async, so we are using a different technique here.
      // The `then()` call should short-circuit into a failure, whereas
      // `catch()` will result in the test passing (i.e. error thrown).
      return ListingSerializer.serializeListings({})
        .then(() => expect(true).toBe(false))
        .catch(() => done());
    });

    it('returns a promise', () => {
      expect(
        ListingSerializer.serializeListings(collections.main) instanceof Promise
      ).toBeTruthy();
    });

    it('calls JSONSerializer with the appropriate arguments', () => {
      return ListingSerializer.serializeListings(collections.language).then(
        () => {
          const args = JSONSerializer.serializeToDir.mock.calls.slice(-1)[0];
          expect(args.length).toBe(4);
          expect(typeof args[0]).toBe('string');
          expect(args[1][0]).toBe('index');
          expect(args[2][0]).toBe('snippetList');
          expect(args[3][0]).toBe('metadata');
        }
      );
    });
  });
});
