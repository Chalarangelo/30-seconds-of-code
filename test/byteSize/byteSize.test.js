const expect = require('expect');
const Blob = class{
  constructor(s) {
    return {
      size: Buffer.byteLength(s.toString())
    };
  }
};
const byteSize = str => new Blob([str]).size;

  test('byteSize is a Function', () => {
  expect(byteSize).toBeInstanceOf(Function);
});
  t.equal(byteSize('a'), 1, 'Works for a single letter');
  t.equal(byteSize('Hello World'), 11, 'Works for a common string');
  t.equal(byteSize('😀'), 4, 'Works for emoji');
  

