import { FileParser } from '.';

jest.mock('fs/promises', () => ({
  readdir: jest.fn(path =>
    Promise.resolve([`${path}/none.md`, `${path}/any.md`, `${path}/every.md`])
  ),
}));

jest.mock('glob', () => ({
  sync: jest.fn(pattern => [`${pattern}/any.md`]),
}));

describe('FileParser', () => {
  describe('fromGlob', () => {
    it('returns the correct result', () => {
      expect(FileParser.fromGlob('pattern')).toEqual(['pattern/any.md']);
    });
  });

  describe('fromDir', () => {
    it('returns the correct result', () => {
      return FileParser.fromDir('path').then(data => {
        expect(data).toEqual(['path/any.md', 'path/every.md', 'path/none.md']);
      });
    });
  });
});
