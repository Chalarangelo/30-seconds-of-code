const test = require('tape');
const initializeNDArray = require('./initializeNDArray.js');

test('Testing initializeNDArray', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof initializeNDArray === 'function', 'initializeNDArray is a Function');
  //t.deepEqual(initializeNDArray(args..), 'Expected');
  //t.equal(initializeNDArray(args..), 'Expected');
  //t.false(initializeNDArray(args..), 'Expected');
  //t.throws(initializeNDArray(args..), 'Expected');
  t.end();
});