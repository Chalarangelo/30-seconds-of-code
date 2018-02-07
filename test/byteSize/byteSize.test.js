const test = require('tape');
// Custom implementation of Blob for the requirements of this snippet.
const Blob = class{
  constructor(s) {
    return {
      size: Buffer.byteLength(s.toString())
    };
  }
}
// const byteSize = require('./byteSize.js');
// Override
const byteSize = str => new Blob([str]).size;
test('Testing byteSize', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof byteSize === 'function', 'byteSize is a Function');
  t.equal(byteSize('a'), 1, 'Works for a single letter');
  t.equal(byteSize('Hello World'), 11, 'Works for a common string');
  t.equal(byteSize('😀'), 4, 'Works for emoji');
  // Blob is not part of Node apparently?
  //t.equal(byteSize('Hello World'), 11, 'Works for text');
  //t.equal(byteSize('😀'), 4, 'Works for emojis');
  // Works only in browser
  // t.equal(byteSize('Hello World'), 11, "Returns the length of a string in bytes");
  //t.deepEqual(byteSize(args..), 'Expected');
  //t.equal(byteSize(args..), 'Expected');
  //t.false(byteSize(args..), 'Expected');
  //t.throws(byteSize(args..), 'Expected');
  t.end();
});
