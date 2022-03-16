import { TextParser } from './textParser';

jest.mock('fs/promises', () => ({
  readFile: jest.fn(() =>
    Promise.resolve(
      '---\ntitle: Snippet\ntags: array,object\nfirstSeen: 2017-12-22T21:54:30+02:00\nlastUpdated: 2017-12-22T21:54:30+02:00\n---\n\nThis is some text.\n'
    )
  ),
  readdir: jest.fn(() => Promise.resolve(['any.md'])),
}));

describe('TextParser', () => {
  describe('fromPath', () => {
    it('the resolved object contains the correct keys and metadata', () => {
      return TextParser.fromPath('content/sources/30code/snippets/any.md').then(
        data => {
          expect(Object.keys(data).sort()).toEqual(
            [
              'body',
              'fileName',
              'tags',
              'title',
              'firstSeen',
              'lastUpdated',
              'author',
            ].sort()
          );
        }
      );
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
