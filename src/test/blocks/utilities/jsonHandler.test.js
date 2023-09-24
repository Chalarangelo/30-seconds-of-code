import { JSONHandler } from 'blocks/utilities/jsonHandler';

jest.mock('glob', () => ({
  sync: jest.fn(() => ['test/item/index.json']),
}));

jest.mock('path', () => ({
  resolve: jest.fn(x => x),
  dirname: jest.fn(),
}));

jest.mock('fs-extra', () => ({
  ensureDirSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  writeFile: jest.fn((path, data) => Promise.resolve([path, data])),
}));

jest.mock(
  'test/item/index.json',
  () => ({
    a: 1,
  }),
  { virtual: true }
);

describe('JSONHandler', () => {
  describe('toFile', () => {
    it('passes the correct arguments', () => {
      return JSONHandler.toFile('my/path', { a: 1 }).then(data => {
        expect(data).toEqual(['my/path', '{\n  "a": 1\n}']);
      });
    });
  });

  describe('fromGlob', () => {
    it('throws if the pattern is invalid', () => {
      expect(() => JSONHandler.fromGlob('test/item')).toThrow();
    });

    it('throws if the options are invalid', () => {
      expect(() =>
        JSONHandler.fromGlob('test/item/*.json', {
          withNames: true,
          reduced: true,
        })
      ).toThrow();
    });

    it('returns the correct data with default arguments', () => {
      expect(JSONHandler.fromGlob('test/item/*.json')).toEqual([{ a: 1 }]);
    });

    it('returns the correct data with names', () => {
      expect(
        JSONHandler.fromGlob('test/item/*.json', { withNames: true })
      ).toEqual([['test/item/index.json', { a: 1 }]]);
    });

    it('returns the correct data with reducer', () => {
      expect(
        JSONHandler.fromGlob('test/item/*.json', {
          reduced: true,
          initialValue: {},
        })
      ).toEqual({ a: 1 });
    });
  });

  describe('fromFile', () => {
    it('returns the correct data', () => {
      expect(JSONHandler.fromFile('test/item/index.json')).toEqual({ a: 1 });
    });
  });
});
