const test = require('tape');
const isArrayBuffer = require('./isArrayBuffer.js');

test('Testing isArrayBuffer', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isArrayBuffer === 'function', 'isArrayBuffer is a Function');
  //t.deepEqual(isArrayBuffer(args..), 'Expected');
  //t.equal(isArrayBuffer(args..), 'Expected');
  //t.false(isArrayBuffer(args..), 'Expected');
  //t.throws(isArrayBuffer(args..), 'Expected');
  t.end();
});