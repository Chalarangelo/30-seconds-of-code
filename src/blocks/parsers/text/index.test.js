import { TextParser } from '.';

jest.mock('fs-extra', () => ({
  readFile: jest.fn((path, format, callback) =>
    callback(
      null,
      '---\ntitle: Snippet\ntags: array,object\n---\n\nThis is some text.\n'
    )
  ),
  readdir: jest.fn((path, callback) => callback(null, ['any.md'])),
}));

jest.mock('child_process', () => ({
  exec: jest.fn((command, callback) => callback(null, 'mocked return')),
}));

describe('TextParser', () => {
  describe('fromPath', () => {
    it('returns a promise', () => {
      expect(
        TextParser.fromPath('content/sources/30code/snippets/any.md') instanceof
          Promise
      ).toBeTruthy();
    });

    it('the resolved object contains the correct keys', () => {
      return TextParser.fromPath('content/sources/30code/snippets/any.md').then(
        data => {
          expect(Object.keys(data).sort()).toEqual(
            ['body', 'fileName', 'tags', 'title'].sort()
          );
        }
      );
    });

    it('the resolved object contains the correct keys and metadata', () => {
      return TextParser.fromPath('content/sources/30code/snippets/any.md', {
        withMetadata: true,
      }).then(data => {
        expect(Object.keys(data).sort()).toEqual(
          [
            'body',
            'fileName',
            'tags',
            'title',
            'firstSeen',
            'lastUpdated',
          ].sort()
        );
      });
    });
  });

  describe('fromDir', () => {
    it('returns a promise', () => {
      expect(
        TextParser.fromDir('content/sources/30code/snippets') instanceof Promise
      ).toBeTruthy();
    });

    it('the resolved object is of the correct type and size', () => {
      return TextParser.fromDir('content/sources/30code/snippets').then(
        data => {
          expect(data instanceof Array).toBeTruthy();
          expect(data.length).not.toBe(0);
        }
      );
    });
  });
});
