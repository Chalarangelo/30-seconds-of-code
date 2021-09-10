import { JSONSerializer } from '.';

jest.mock('fs/promises', () => ({
  writeFile: jest.fn((path, data) => Promise.resolve([path, data])),
}));
jest.mock('fs-extra', () => ({
  ensureDirSync: jest.fn(),
}));

describe('JSONSerializer', () => {
  describe('serializeToFile', () => {
    it('passes the correct arguments', () => {
      return JSONSerializer.serializeToFile('my/path', { a: 1 }).then(data => {
        expect(data).toEqual(['my/path', '{\n  "a": 1\n}']);
      });
    });
  });

  describe('serializeToDir', () => {
    it('returns a promise', () => {
      expect(JSONSerializer.serializeToDir() instanceof Promise).toBeTruthy();
    });

    it('passes the correct arguments', () => {
      return JSONSerializer.serializeToDir('my/path', ['index', { a: 1 }]).then(
        data => {
          expect(data).toEqual([['my/path/index.json', '{\n  "a": 1\n}']]);
        }
      );
    });
  });
});
