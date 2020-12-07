import { Chunk } from '.';
import globalConfig from 'settings/global';

describe('Chunk', () => {
  describe('createIndex', () => {
    it('returns the appropriate data', () => {
      const { template, relRoute, fullRoute, priority } = Chunk.createIndex(
        '/page',
        'SnippetPage',
        0.3
      );
      expect(template).toBe('SnippetPage');
      expect(priority).toBe(0.3);
      expect(relRoute).toBe('/page');
      expect(fullRoute).toBe(`${globalConfig.websiteUrl}/page`);
    });

    it('prefixes the route if necessary', () => {
      const { relRoute } = Chunk.createIndex('page', 'SnippetPage', 0.3);
      expect(relRoute).toBe('/page');
    });

    it('uses the default priority if not provided', () => {
      const { priority } = Chunk.createIndex('page', 'SnippetPage');
      expect(priority).toBe(0.5);
    });

    it('passes any rest arguments to the returned object', () => {
      const { data, meta } = Chunk.createIndex('/page', 'SnippetPage', 0.3, {
        data: 'some data',
        meta: 'some metadata',
      });
      expect(data).toBe('some data');
      expect(meta).toBe('some metadata');
    });
  });

  describe('createStaticPageChunks', () => {
    it('returns the appropriate data', () => {
      const [path, indexChunk, contextChunk] = Chunk.createStaticPageChunks(
        'static',
        '/page',
        'StaticPage',
        0.4
      );
      expect(path).toBe('static/page');
      expect(indexChunk[0]).toBe('index');
      expect(typeof indexChunk[1]).toBe('object');
      expect(contextChunk[0]).toBe('context');
      expect(typeof contextChunk[1]).toBe('object');
    });

    it('passes context to the returned object', () => {
      const [, , contextChunk] = Chunk.createStaticPageChunks(
        'static',
        '/page',
        'StaticPage',
        0.4,
        {
          data: 'some data',
        }
      );
      expect(contextChunk[1].data).toBe('some data');
    });
  });
});
