const test = require('tape');
const byteSize = require('./byteSize.js');

test('Testing byteSize', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof byteSize === 'function', 'byteSize is a Function');
  // Works only in browser
  // t.equal(byteSize('Hello World'), 11, "Returns the length of a string in bytes");
  //t.deepEqual(byteSize(args..), 'Expected');
  //t.equal(byteSize(args..), 'Expected');
  //t.false(byteSize(args..), 'Expected');
  //t.throws(byteSize(args..), 'Expected');
  t.end();
});