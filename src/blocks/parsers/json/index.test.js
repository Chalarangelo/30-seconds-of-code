import { JSONParser } from '.';
import { ArgsError } from 'blocks/utilities/error';
import { FileParser } from 'blocks/parsers/file';

FileParser.fromGlob = jest.fn(() => ['test/item/index.json']);

jest.mock('path', () => ({
  resolve: jest.fn(x => x),
}));

jest.mock(
  'test/item/index.json',
  () => ({
    a: 1,
  }),
  { virtual: true }
);

describe('JSONParser', () => {
  describe('fromGlob', () => {
    it('throws if the pattern is invalid', () => {
      expect(() => JSONParser.fromGlob('test/item')).toThrow(ArgsError);
    });

    it('throws if the options are invalid', () => {
      expect(() =>
        JSONParser.fromGlob('test/item/*.json', {
          withNames: true,
          reduced: true,
        })
      ).toThrow(ArgsError);
    });

    it('returns the correct data with default arguments', () => {
      expect(JSONParser.fromGlob('test/item/*.json')).toEqual([{ a: 1 }]);
    });

    it('returns the correct data with names', () => {
      expect(
        JSONParser.fromGlob('test/item/*.json', { withNames: true })
      ).toEqual([['test/item/index.json', { a: 1 }]]);
    });

    it('returns the correct data with reducer', () => {
      expect(
        JSONParser.fromGlob('test/item/*.json', {
          reduced: true,
          initialValue: {},
        })
      ).toEqual({ a: 1 });
    });
  });

  describe('fromFile', () => {
    it('returns the correct data', () => {
      expect(JSONParser.fromFile('test/item/index.json')).toEqual({ a: 1 });
    });
  });

  describe('fromChunks', () => {
    it('returns the correct data', () => {
      expect(JSONParser.fromChunks('test')).toEqual([
        {
          a: 1,
          context: { a: 1 },
        },
      ]);
    });
  });
});
