import { Requirements } from '.';
import { Env } from 'blocks/utilities/env';
import { JSONParser } from 'blocks/parsers/json';

describe('Requirements', () => {
  const fromChunksFn = jest.fn().mockReturnValueOnce([]);
  beforeAll(() => {
    Env.setup();
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
