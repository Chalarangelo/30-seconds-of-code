const test = require('tape');
const isTypedArray = require('./isTypedArray.js');

test('Testing isTypedArray', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isTypedArray === 'function', 'isTypedArray is a Function');
  //t.deepEqual(isTypedArray(args..), 'Expected');
  //t.equal(isTypedArray(args..), 'Expected');
  //t.false(isTypedArray(args..), 'Expected');
  //t.throws(isTypedArray(args..), 'Expected');
  t.end();
});