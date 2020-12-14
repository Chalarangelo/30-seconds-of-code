import { Requirements } from '.';
import { setupEnv } from 'blocks/utilities/env';
import { JSONParser } from 'blocks/parsers/json';

describe('Requirements', () => {
  const fromChunksFn = jest.fn().mockReturnValueOnce([]);
  beforeAll(() => {
    setupEnv();
    JSONParser.fromChunks = fromChunksFn;
  });

  describe('load', () => {
    it('contains the correct keys', () => {
      expect(Object.keys(Requirements.load())).toEqual([
        'templates',
        'requirables',
      ]);
    });
  });
});
